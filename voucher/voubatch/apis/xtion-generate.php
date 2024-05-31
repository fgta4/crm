<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __DIR__ . '/xapi.base.php';
require_once __DIR__ . '/code128barcode.php';  // https://github.com/anigenero/php-barcode-generator/tree/master/src

use \FGTA4\exceptions\WebException;

use \FGTA4\StandartApproval;
use \FGTA4\utils\SqlUtility;



/**
 * crm/voucher/voubatch/apis/xtion-commit.php
 *
 * =======
 * Commit
 * =======
 * Commit dokumen, menandakan dokumen yang selesai dsunting
 * dan telah siap untuk diproses lebih lanjut
 * Pada status tercommit, dokumen akan menjadi readonly. 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 29/09/2022
 */
$API = new class extends voubatchBase {

	public function execute($id, $param) {
		$tablename = 'mst_voubatch';
		$primarykey = 'voubatch_id';
		$userdata = $this->auth->session_get_user();

		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			
			if ($currentdata->header->voubatch_iscommit==0) {
				throw new \Exception("Batch $id belum dicommit, tidak bisa digenerate");
			}

			if ($currentdata->header->voubatch_isgenerate==1) {
				throw new \Exception("Batch $id sudah digenerate, tidak bisa digenerate ulang");
			}
			

			$currentdata->voutype = $this->getVoucherType($currentdata->header->voutype_id);

			//$this->pre_action_check($currentdata, 'generate');


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {
	
				$this->generate_voucher($id, $currentdata);
				if ($currentdata->header->voubatch_isgenimage==1) {
					$this->generate_images($id, $currentdata);
				}

				$this->save_and_set_generate_flag($id, $currentdata);

				// export ke FGTA
				$this->export_to_FGTA($id, $currentdata);



				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'voutype_name' => \FGTA4\utils\SqlUtility::Lookup($record['voutype_id'], $this->db, 'mst_voutype', 'voutype_id', 'voutype_name'),
					'voubatch_dtstart' => date("d/m/Y", strtotime($record['voubatch_dtstart'])),
					'voubatch_dtend' => date("d/m/Y", strtotime($record['voubatch_dtend'])),
					'voubatch_dtactive' => date("d/m/Y", strtotime($record['voubatch_dtactive'])),
					'voubatch_dtexpired' => date("d/m/Y", strtotime($record['voubatch_dtexpired'])),
					'voubatch_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['voubatch_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'GENERATE', $userdata->username, (object)[]);

				$this->db->commit();
				return (object)[
					'success' => true,
					'version' => $currentdata->header->{$this->main_field_version},
					'dataresponse' => $dataresponse
				];

				
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}


		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function export_to_FGTA($id, $currentdata) {
		try {
			
			// konek ke FGTA
			$FGTACONFNAME = $GLOBALS['FGTADB'];
			$DB_CONFIG = DB_CONFIG[$FGTACONFNAME];
			$DB_CONFIG['param'] = DB_CONFIG_PARAM['firebird'];
			$this->db_fgta = new \PDO(
						$DB_CONFIG['DSN'], 
						$DB_CONFIG['user'], 
						$DB_CONFIG['pass'], 
						$DB_CONFIG['param']
			);


			// test, cleanup data voucher lama
			$this->db_fgta->query("delete from MST_VOU where VOUBATCH_ID = '$id'");
			$this->db_fgta->query("delete from MST_VOUBATCH where VOUBATCH_ID = '$id'");

			$VOUBATCH_ID = $id;
			$VOUBATCH_YEAR = '20' . substr($VOUBATCH_ID, 0, 2);
			$VOUBATCH_NO = (int)substr($VOUBATCH_ID, 2, 3);
			$VOUBATCH_TYPE = 'KALISTA';
			$VOUBATCH_VOUQTY = $currentdata->header->voubatch_qty;
			$VOUBATCH_VOUVALUE = $currentdata->header->voubatch_value;
			$VOUBATCH_DESCR = $currentdata->header->voubatch_descr;

			// masukkan data header
			$sql = "
				insert into MST_VOUBATCH
				(VOUBATCH_ID, VOUBATCH_YEAR, VOUBATCH_TYPE, VOUBATCH_NO, VOUBATCH_VOUQTY, VOUBATCH_VOUVALUE, VOUBATCH_DESCR)
				VALUES
				('$VOUBATCH_ID', '$VOUBATCH_YEAR', '$VOUBATCH_TYPE', '$VOUBATCH_NO', '$VOUBATCH_VOUQTY', '$VOUBATCH_VOUVALUE', '$VOUBATCH_DESCR')
			";
			$this->db_fgta->query($sql);


			$sql = "select * from mst_vou where voubatch_id = :id ";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':id'=>$id]);
			$rows = $stmt->fetchall();
			foreach ($rows as $row) {
				$VOU_ID = $row['vou_id'];
				$VOU_NO = $row['vou_no'];
				$VOU_RAN = $row['vou_ran'];
				$VOU_PARITY = $row['vou_parity'];
				$VOU_VALUE = $row['vou_value'];
				$VOU_ISACTIVE = 1;
				$VOU_ACTIVEDATE = $currentdata->header->voubatch_dtactive;
				$VOU_EXPIREDATE = $currentdata->header->voubatch_dtexpired;
				$SOURCE = 'KALISTA';

				$sql = "
					INSERT INTO MST_VOU
					(VOU_ID, VOUBATCH_ID, VOU_NO, VOU_RAN, VOU_PARITY, VOU_VALUE, VOU_ISACTIVE, VOU_ACTIVEDATE, VOU_EXPIREDATE, SOURCE)
					VALUES
					('$VOU_ID', '$VOUBATCH_ID', '$VOU_NO', '$VOU_RAN', '$VOU_PARITY', '$VOU_VALUE', '$VOU_ISACTIVE', '$VOU_ACTIVEDATE', '$VOU_EXPIREDATE', '$SOURCE')
				";
				$this->db_fgta->query($sql);
			}



		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function save_and_set_generate_flag($id, $currentdata) {
		$userdata = $currentdata->user;
		
		try {
			$sql = " 
				update mst_voubatch
				set 
				voubatch_isgenerate=1,
				voubatch_generateby=:username,
				voubatch_generatedate = :date
				where
				voubatch_id=:id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":id" => $id,
				":username" => $currentdata->user->username,
				":date" => date("Y-m-d H:i:s")
			]);

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}	

	public function getVoucherType(string $voutype_id) : object {
		try {
			$sql = "select * from mst_voutype where voutype_id = :voutype_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':voutype_id'=>$voutype_id]);
			$row = $stmt->fetch();

			if ($row==null) {
				throw new \Execption("Type voucher $voutype_id tidak ditemukan");
			}

			$obj = new \stdClass;
			$obj->rndmin = $row['voutype_randalocstart'];
			$obj->rndmax = $row['voutype_randalocend'];

			return $obj;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	public function generate_voucher($id, $currentdata) {
		try {
			$userdata = $currentdata->user;
			$header = $currentdata->header;
			$voutype = $currentdata->voutype;
			

			$batch_id = $header->voubatch_id;
			$qty = $header->voubatch_qty;
			$value = $header->voubatch_value;
			$isactive = $header->voubatch_isactive;
			$dtactive = $header->voubatch_dtactive;
			$dtexpired = $header->voubatch_dtexpired;

			if ($qty>9000) {
				throw new \Exception('maksimal julah voucher 9999');
			}


			$sqlCek = "select * from mst_vou where vou_no = :vou_no and voubatch_id = :voubatch_id";
			$stmtCek = $this->db->prepare($sqlCek);


			$tablename = "mst_vou";
			$primarykey = "vou_id";
			$header_primarykey = "voubatch_id";
			$action = 'GENERATED';


			for ($i=1; $i<=$qty; $i++) {
				
				// $vou_nopad = str_pad($i, 4, '0', STR_PAD_LEFT);
				// $vou_ran = rand(10, 99);
				$vou_no = $i;
				$stmtCek->execute([
					':vou_no' => $vou_no,
					':voubatch_id' => $batch_id
				]);
				$rows = $stmtCek->fetchall();
				if (count($rows)>0) {
					continue;
				}

	
				$voudata = $this->CreateVoucher($batch_id, $vou_no, $voutype);
				$obj = (object)[
					'vou_id' => $voudata['voucher_id'],
					'vou_no' => $vou_no,
					'vou_ran' => $voudata['ran'],
					'vou_parity' => $voudata['parity'],
					'vou_infocode' => '',
					'vou_infocoderan' => '',
					'vou_infocodeparity' => '',
					'vou_value' => $value,
					'vou_isactive' => 1,
					'vou_dtactive' => $dtactive,
					'vou_dtexpired' => $dtexpired,
					'voubatch_id' => $batch_id,
					'_createby' => $userdata->username,
					'_createdate' =>  date("Y-m-d H:i:s")
				];

				if ($header->voubatch_isgenimage==1) {
					$obj->vou_file = $obj->vou_id . "jpg";
				}


				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);
				// \FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $header_table, $obj->{$header_primarykey}, $action . "_DETIL", $userdata->username, (object)[]);

				// $this->log($obj);

			}


		} catch (\Exception $ex) {
			throw $ex;
		}	
	}
	
	public function CreateVoucher(string $batch_id, int $vou_no, object $voutype) : array {
		try {
			if ($vou_no>9000) {
				throw new \Exception('maksimal voucher 9999');
			}

			$batch = (int)$batch_id;
			$nopad = str_pad($vou_no, 4, '0', STR_PAD_LEFT);

			$rndmin = $voutype->rndmin;
			$rndmax = $voutype->rndmax;
			$ran = rand($rndmin, $rndmax);

			$t = (float) $vou_no + $batch;
			$b = (float) $ran;
			$n = floor($t / $b);
			$p = $n%$ran;
			$parstr = "00$p";
			$parity = substr($parstr, -2);
			
			$data = [
				'voucher_id' => $batch_id . $nopad . $ran . $parity,
				'vou_no' => $vou_no,
				'ran' => $ran,
				'parity' => $parity
			];

			return $data;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function generate_images($id, $currentdata) {
		$header = $currentdata->header;

		$voubatch_id = $header->voubatch_id;
		$voubatch_width = $header->voubatch_width;
		$voubatch_barpostop = $header->voubatch_barpostop;
		$voubatch_barposleft = $header->voubatch_barposleft;

		$sqlVoucher = "select vou_id from mst_vou where voubatch_id = :voubatch_id ";
		$stmtVoucher = $this->db->prepare($sqlVoucher);
		$stmtVoucher->execute([':voubatch_id'=>$voubatch_id]);
		$rowsVoucher = $stmtVoucher->fetchall(\PDO::FETCH_ASSOC);

		try {
			$voucherimages = [];
			$template_file = $this->create_template($voubatch_id);
			foreach ($rowsVoucher as $row) {
				$vou_id = $row['vou_id'];
				$data = $this->create_voucher_image($template_file, $vou_id, $voubatch_width, $voubatch_barpostop, $voubatch_barposleft);
				$voucherimages[] = [
					'vou_id' => $vou_id, 
					'path' => $data['path'],
					'name' => basename($data['path']),
					'size' => $data['size'],
					'type' => $data['type'],
					'width' => $data['width'],
					'height' => $data['height'],
				];
			}

			unlink($template_file);
			$this->upload_voucher_images($voubatch_id, $voucherimages);

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function create_template($voubatch_id) {
		$dir = __TEMP_DIR . "/voucher";
		if (!is_dir($dir)) {
			mkdir($dir);
		}

		try {
			try { 
				$id = "mst_voubatch/$voubatch_id";
				$doc = $this->cdb->getAttachment($id, 'filedata'); 
			} catch (\Exception $ex) {
				$doc = null;
			}


			if ($doc!=null) {
				$output_file = "$dir/_tpl_$voubatch_id.jpg";
				
				$base64_attachmentdata = $doc->attachmentdata;
				$type = $doc->type;
				$ifp = fopen( $output_file, 'wb'); 
				$attachmentdata = explode( ',', $base64_attachmentdata);
				$filedata = base64_decode($attachmentdata[1]);
				fwrite( $ifp, $filedata);
				fclose($ifp);
	
				return $output_file;
			}


		} catch (\Exception $ex) {
			throw $ex;
		}	
	}

	function create_voucher_image($template_file, $vou_id, $vou_width, $top, $left) {
		$dir = __TEMP_DIR . "/voucher";

		try {
			$output_file = "$dir/_bar_$vou_id.jpg";
			$barcode_data = Code128Barcode::generate($vou_id);	
			imagejpeg($barcode_data['image'], $output_file);

			// merge image
			list($width, $height) = getimagesize($template_file);
			$tpl = imagecreatefromjpeg($template_file);
			$new_width = $vou_width;
			$new_height = floor(($height/$width)*$new_width);

			$dest = imagecreatetruecolor($new_width, $new_height);
			imagecopyresampled($dest, $tpl, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

			$src = imagecreatefromjpeg($output_file);
			imagecopymerge($dest, $src, $top, $left, 0, 0, $barcode_data['width'], $barcode_data['height'], 100);

			$voucher_file = "$dir/$vou_id.jpg";
			imagejpeg($dest, $voucher_file);

			unlink($output_file);

			$size = filesize($voucher_file);
			$data = [
				'path' => $voucher_file,
				'type' => "image/jpeg",
				'width' => $new_width,
				'height' => $new_height,
				'size' => $size,
			];

			return $data;
		} catch (\Exception $ex) {
			throw $ex;
		}	
	}


	function upload_voucher_images($voubatch_id, $voucherimages) {
		$voudir = implode('/', [__LOCALDB_DIR, 'voucher']);
		if (is_dir($voudir)) {
			$outputdir = implode('/', [$voudir, $voubatch_id]);
			if (!is_dir($outputdir)) {
				mkdir($outputdir);
			}
		}

		
		try {
			foreach ($voucherimages as $img) {
				$vou_id = $img['vou_id'];

				$file_id = "mst_vou/$vou_id";
				$doc = [
					'name' => $img['name'],
					'size' => $img['size'],
					'type' => $img['type'],
					'width' => $img['width'],
					'height' => $img['height'],
					'doctype' => 'mst_vou',
					'docid' => $vou_id	
				];
				$filedata = file_get_contents($img['path']);
				$file_base64data = 'data:image/' . $img['type'] . ';base64,' . base64_encode($filedata);

				$this->log($doc);

				$overwrite = true;
				$res = $this->cdb->addAttachment($file_id, $doc, 'filedata', $file_base64data, $overwrite);	
				$rev = $res->asObject()->rev;

				$targetfile = implode('/', [$outputdir, $doc['name']]);
				copy($img['path'], $targetfile);

				chmod($targetfile, 0666);
				unlink($img['path']);

			}
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};


