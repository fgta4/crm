<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/core/couchdbclient.php';
require_once __DIR__ . '/xapi.base.php';
require_once __DIR__ . '/code128barcode.php';  // https://github.com/anigenero/php-barcode-generator/tree/master/src


use \FGTA4\exceptions\WebException;
use \FGTA4\CouchDbClient;
use \FGTA4\StandartApproval;




/**
 * crm/voucher/voumailer/apis/xtion-commit.php
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
$API = new class extends voumailerBase {

	public function execute($id, $param) {
		$tablename = 'mst_voumailer';
		$primarykey = 'voumailer_id';
		$userdata = $this->auth->session_get_user();

		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			$this->pre_action_check($currentdata, 'commit');


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

	
				$this->prepare($id, $currentdata);

				
				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'voumailer_commitdt' => date("d/m/Y", strtotime($record['voumailer_commitdate'])),
					'voumailer_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['voumailer_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'PREPARE', $userdata->username, (object)[]);

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



	public function prepare($id, $currentdata) {
		$userdata = $currentdata->user;
		

		$dtactive = date_create();
		date_add($dtactive, date_interval_create_from_date_string("2 hours"));
		$dtactive = date_format($dtactive,"Y-m-d H:i:s");
	

		try {
		
			$sqlInsertQue = "
				insert into que_msg
				( msg_id,  msg_module,  msg_batch,  msg_descr,  msgtype_id,  msg_email,  msg_nama,  msg_subject,  msg_body,  msg_isactive,  msg_activedate,  msg_cbtable,  msg_cbfieldkey,  msg_cbfieldvalue,  msg_cbfieldstatus,  _createby,  _createdate)
				values
				(:msg_id, :msg_module, :msg_batch, :msg_descr, :msgtype_id, :msg_email, :msg_nama, :msg_subject, :msg_body, :msg_isactive, :msg_activedate, :msg_cbtable, :msg_cbfieldkey, :msg_cbfieldvalue, :msg_cbfieldstatus, :_createby, :_createdate)
			"; 	
			$stmtInsertQue = $this->db->prepare($sqlInsertQue);

			$sqlInsertQueAttach = "
				insert into que_msgatch
				( msgatch_id,  attachment_id,  msg_id,  _createby,  _createdate)
				values
				(:msgatch_id, :attachment_id, :msg_id, :_createby, :_createdate)
			";
			$stmtInsertQueAttach = $this->db->prepare($sqlInsertQueAttach);
			

			$sqlUpdateQue = "
				update que_msg
				set 
				msg_subject = :subject, msg_body = :body
				where
				msg_id = :msg_id
			";
			$stmtUpdateQue = $this->db->prepare($sqlUpdateQue);


			$sqlEmail = "select voumaileremail_email, voumaileremail_nama from mst_voumaileremail where voumailer_id = :voumailer_id ";
			$stmtEmail = $this->db->prepare($sqlEmail);
			$stmtEmail->execute([':voumailer_id' => $id]);
			$rowsEmail = $stmtEmail->fetchall();
			$countEmail = count($rowsEmail);
			
			$sqlVouCheck = "select voumailerque_id from mst_voumailerque where voumailer_id = :voumailer_id and voumailerque_email = :voumailerque_email and voubatch_id = :voubatch_id";
			$stmtVouCheck = $this->db->prepare($sqlVouCheck);

			$sqlVoucher = "select vou_id from mst_vou where voubatch_id = :voubatch_id and vou_assignto is null limit $countEmail";
			$stmtVoucher = $this->db->prepare($sqlVoucher);

			$sqlAssignVoucher = "update mst_vou set vou_assignto = :email, voumailerque_id = :voumailerque_id where vou_id = :vou_id";
			$stmtAssignVoucher = $this->db->prepare($sqlAssignVoucher);

			// $sqlUpdateMail = "update mst_voumailerque set voumailerque_subject=:subject, voumailerque_body=:body where voumailerque_id = :voumailerque_id ";
			// $stmtUpdateMail = $this->db->prepare($sqlUpdateMail);

			$sqlVoubatch = "select voubatch_id, voumailer_subject, voumailer_body, voumaileritem_qty from mst_voumaileritem where voumailer_id = :voumailer_id ";
			$stmtVoubatch = $this->db->prepare($sqlVoubatch);
			$stmtVoubatch->execute([':voumailer_id' => $id]);
			$rowsVoubatch = $stmtVoubatch->fetchall();
			foreach ($rowsVoubatch as $row) {
				// $this->log($row);
				$voubatch_id = $row->voubatch_id;
				$stmtVoucher->execute([':voubatch_id' => $voubatch_id]); 
				$rowsVoucher = $stmtVoucher->fetchall();
				$countVoucher = count($rowsVoucher);
				$subject = $row->voumailer_subject;
				$body = $row->voumailer_body;

				// $this->log($rowsVoucher);
				if ($countVoucher!=$countEmail) {
					throw new \Exception("Tidak dapat create queue untuk $voubatch_id, voucher yg tersisa kurang (butuh $countEmail voucher, tersisa $countVoucher)");
				}

				$vouchers = [];
				foreach ($rowsVoucher as $vou) {
					$vouchers[] = $vou->vou_id;
				}

				$i = 0;
				foreach ($rowsEmail as $em) {
					$email = $em->voumaileremail_email;
					$nama = $em->voumaileremail_nama;
					$vou_id = $vouchers[$i];
					$voumailerque_id = uniqid();
					$msg_id = $voumailerque_id;

					$obj = (object)[
						'voumailerque_id' => $voumailerque_id,
						'voumailerque_email' => $email,
						'voumailerque_nama' => $nama,
						'voubatch_id' => $voubatch_id,
						'msg_id' => $msg_id,
						'vou_id' => $vou_id,
						'voumailer_id' => $id,
						'_createby' => $userdata->username,
						'_createdate' =>  date("Y-m-d H:i:s")
					];

					
					$stmtVouCheck->execute([
						':voumailer_id' => $id,
						':voumailerque_email' => $email,
						':voubatch_id' => $voubatch_id,
					]);
					$rowsVouCheck = $stmtVouCheck->fetchall();
					if (count($rowsVouCheck)!=0) {
						// update subject & body
						// $voumailerque_id = $rowsVouCheck[0]->voumailerque_id;
						// $stmtUpdateMail->execute([
						// 	':voumailerque_id' => $voumailerque_id,
						// 	':subject' => $subject,
						// 	':body' => $body
						// ]);

					} else {

						$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_voumailerque", $obj);
						$stmt = $this->db->prepare($cmd->sql);
						$stmt->execute($cmd->params);
						$i++;
	
	
						// add to mail queue
						$stmtInsertQue->execute([
							':msg_id' => $msg_id, 
							':msg_module' => 'voumailer', 
							':msg_batch' => $id, 
							':msg_descr' => $currentdata->header->voumailer_descr, 
							':msgtype_id' => 'EML', 
							':msg_email' => $email, 
							':msg_nama' => $nama, 
							':msg_subject' => $subject, 
							':msg_body' => $body, 
							':msg_isactive' => 1, 
							':msg_activedate' => $dtactive, 
							':msg_cbtable' => 'mst_voumailerque', 
							':msg_cbfieldkey' => 'voumailerque_id', 
							':msg_cbfieldvalue' => $voumailerque_id, 
							':msg_cbfieldstatus' => 'voumailerque_issend',
							':_createby' => $userdata->username,
							':_createdate' =>  date("Y-m-d H:i:s")
						]);
						
						$stmtInsertQueAttach->execute([
							':msgatch_id' => uniqid(), 
							':attachment_id' => 'mst_vou/' . $vou_id, 
							':msg_id' =>  $msg_id, 
							':_createby' => $userdata->username,
							':_createdate' =>  date("Y-m-d H:i:s")
						]);  

						// assign voucher to email
						$stmtAssignVoucher->execute([
							':vou_id' => $vou_id,
							':email' => $email,
							':voumailerque_id' => $voumailerque_id
						]);

					}


				}


				// set as prepared
				$sql = "update mst_voumailer set voumailer_isprepared=1 where voumailer_id = :voumailer_id";
				$stmt = $this->db->prepare($sql);
				$stmt->execute([':voumailer_id'=>$id]);

			}

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}	


	function ComposeVoucher($template_file, $vou_id, $top, $left) {
		$dir = __LOCALDB_DIR . "/voucher";

		try { 
			$output_file = "$dir/_bar_$vou_id.jpg";
			$barcode_data = Code128Barcode::generate($vou_id);	
			imagejpeg($barcode_data['image'], $output_file);


			// merge image
			list($width, $height) = getimagesize($template_file);
			$tpl = imagecreatefromjpeg($template_file);
			$new_width = 800;
			$new_height = floor(($height/$width)*$new_width);

			$dest = imagecreatetruecolor($new_width, $new_height);
			imagecopyresampled($dest, $tpl, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

			$src = imagecreatefromjpeg($output_file);
			imagecopymerge($dest, $src, $top, $left, 0, 0, $barcode_data['width'], $barcode_data['height'], 100);

			$voucher_file = "$dir/$vou_id.jpg";
			imagejpeg($dest, $voucher_file);

			unlink($output_file);

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}



	function getVoucherTemplate($voubatch_id, $voubatch_file) {
		$dir = __LOCALDB_DIR . "/voucher";

		try { 
			$cdb = new CouchDbClient((object)DB_CONFIG['FGTAFS']);
			$doc = $cdb->getAttachment($voubatch_id, 'filedata'); 
		} catch (\Exception $ex) {
			$doc = null;
		}
			
		// get file from $
		// $this->log($doc);
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


	}

	function removeVoucherTemplate($template_file) {
		unlink($template_file);
	}


};


