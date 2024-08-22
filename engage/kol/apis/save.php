<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;



/**
 * crm/engage/kol/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header kol (mst_kol)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/11/2023
 */
$API = new class extends kolBase {
	
	public function execute($data, $options, $files) {
		$event = 'on-save';
		$tablename = 'mst_kol';
		$primarykey = 'kol_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\kol_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new kol_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = &$this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				$obj->{$fieldname} = $value;
			}

			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');
			$obj->kol_birthdate = (\DateTime::createFromFormat('d/m/Y',$obj->kol_birthdate))->format('Y-m-d');

			$obj->kol_id = strtoupper($obj->kol_id);
			$obj->koltype_id = strtoupper($obj->koltype_id);
			$obj->kol_name = strtoupper($obj->kol_name);
			$obj->kol_birthplace = strtoupper($obj->kol_birthplace);
			$obj->gender_id = strtoupper($obj->gender_id);
			$obj->religion_id = strtoupper($obj->religion_id);
			$obj->kol_city = strtoupper($obj->kol_city);
			$obj->kol_instagram = strtolower($obj->kol_instagram);
			$obj->kol_facebook = strtolower($obj->kol_facebook);
			$obj->kol_twitter = strtolower($obj->kol_twitter);
			$obj->kol_tiktok = strtolower($obj->kol_tiktok);
			$obj->kol_youtube = strtolower($obj->kol_youtube);
			$obj->kol_blog = strtolower($obj->kol_blog);
			$obj->kol_website = strtolower($obj->kol_website);


			if ($obj->kol_birthplace=='') { $obj->kol_birthplace = '--NULL--'; }
			if ($obj->kol_birthdate=='') { $obj->kol_birthdate = '--NULL--'; }
			if ($obj->kol_city=='') { $obj->kol_city = '--NULL--'; }
			if ($obj->kol_instagram=='') { $obj->kol_instagram = '--NULL--'; }
			if ($obj->kol_facebook=='') { $obj->kol_facebook = '--NULL--'; }
			if ($obj->kol_twitter=='') { $obj->kol_twitter = '--NULL--'; }
			if ($obj->kol_tiktok=='') { $obj->kol_tiktok = '--NULL--'; }
			if ($obj->kol_youtube=='') { $obj->kol_youtube = '--NULL--'; }
			if ($obj->kol_blog=='') { $obj->kol_blog = '--NULL--'; }
			if ($obj->kol_website=='') { $obj->kol_website = '--NULL--'; }




			// current user & timestamp	
			if ($datastate=='NEW') {
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");

				if (method_exists(get_class($hnd), 'PreCheckInsert')) {
					// PreCheckInsert($data, &$obj, &$options)
					$hnd->PreCheckInsert($data, $obj, $options);
				}
			} else {
				$obj->_modifyby = $userdata->username;
				$obj->_modifydate = date("Y-m-d H:i:s");	
		
				if (method_exists(get_class($hnd), 'PreCheckUpdate')) {
					// PreCheckUpdate($data, &$obj, &$key, &$options)
					$hnd->PreCheckUpdate($data, $obj, $key, $options);
				}
			}

			//handle data sebelum sebelum save
			if (method_exists(get_class($hnd), 'DataSaving')) {
				// ** DataSaving(object &$obj, object &$key)
				$hnd->DataSaving($obj, $key);
			}

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId($hnd, $obj);
					}
					
					// handle data sebelum pada saat pembuatan SQL Insert
					if (method_exists(get_class($hnd), 'RowInserting')) {
						// ** RowInserting(object &$obj)
						$hnd->RowInserting($obj);
					}
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';

					// handle data sebelum pada saat pembuatan SQL Update
					if (method_exists(get_class($hnd), 'RowUpdating')) {
						// ** RowUpdating(object &$obj, object &$key))
						$hnd->RowUpdating($obj, $key);
					}
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);


				$fieldname = 'kol_picture';	
				if (property_exists($files, $fieldname)) {

					$file_id = "$tablename/" . $obj->{$primarykey};
					$doc = $files->{$fieldname};
					$doc->doctype = $tablename;
					$doc->docid = $obj->{$primarykey};
					$file_base64data = $doc->data;
					unset($doc->data);

					$overwrite = true;
					$res = $this->cdb->addAttachment($file_id, $doc, 'filedata', $file_base64data, $overwrite);	
					$rev = $res->asObject()->rev;

					$key->{$primarykey} = "$tablename/" . $obj->{$primarykey};
					
					$objfile = new \stdClass;
					$objfile->{$primarykey} = $key->{$primarykey};
					$objfile->kol_picture = $rev;
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $objfile, $key);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
				}				
				
				


				// result
				$options->criteria = [
					"kol_id" => $obj->kol_id
				];

				$criteriaValues = [
					"kol_id" => " kol_id = :kol_id "
				];
				if (method_exists(get_class($hnd), 'buildOpenCriteriaValues')) {
					// buildOpenCriteriaValues(object $options, array &$criteriaValues) : void
					$hnd->buildOpenCriteriaValues($options, $criteriaValues);
				}

				$where = \FGTA4\utils\SqlUtility::BuildCriteria($options->criteria, $criteriaValues);
				$result = new \stdClass; 
	
				if (method_exists(get_class($hnd), 'prepareOpenData')) {
					// prepareOpenData(object $options, $criteriaValues) : void
					$hnd->prepareOpenData($options, $criteriaValues);
				}

				$sqlFieldList = [
					'kol_id' => 'A.`kol_id`', 'koltype_id' => 'A.`koltype_id`', 'kol_name' => 'A.`kol_name`', 'kol_isdisabled' => 'A.`kol_isdisabled`',
					'kol_picture' => 'A.`kol_picture`', 'kol_birthplace' => 'A.`kol_birthplace`', 'kol_birthdate' => 'A.`kol_birthdate`', 'gender_id' => 'A.`gender_id`',
					'religion_id' => 'A.`religion_id`', 'kol_city' => 'A.`kol_city`', 'kol_instagram' => 'A.`kol_instagram`', 'kol_facebook' => 'A.`kol_facebook`',
					'kol_twitter' => 'A.`kol_twitter`', 'kol_tiktok' => 'A.`kol_tiktok`', 'kol_youtube' => 'A.`kol_youtube`', 'kol_blog' => 'A.`kol_blog`',
					'kol_website' => 'A.`kol_website`', 'partner_id' => 'A.`partner_id`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "mst_kol A";
				$sqlWhere = $where->sql;
					
				if (method_exists(get_class($hnd), 'SqlQueryOpenBuilder')) {
					// SqlQueryOpenBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void
					$hnd->SqlQueryOpenBuilder($sqlFieldList, $sqlFromTable, $sqlWhere, $where->params);
				}
				$sqlFields = \FGTA4\utils\SqlUtility::generateSqlSelectFieldList($sqlFieldList);
	
			
				$sqlData = "
					select 
					$sqlFields 
					from 
					$sqlFromTable 
					$sqlWhere 
				";
	
				$stmt = $this->db->prepare($sqlData);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
	
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				$dataresponse = array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'koltype_name' => \FGTA4\utils\SqlUtility::Lookup($record['koltype_id'], $this->db, 'mst_koltype', 'koltype_id', 'koltype_name'),
					'kol_birthdate' => date("d/m/Y", strtotime($row['kol_birthdate'])),
					'gender_name' => \FGTA4\utils\SqlUtility::Lookup($record['gender_id'], $this->db, 'mst_gender', 'gender_id', 'gender_name'),
					'religion_name' => \FGTA4\utils\SqlUtility::Lookup($record['religion_id'], $this->db, 'mst_religion', 'religion_id', 'religion_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);
				
				if (method_exists(get_class($hnd), 'DataOpen')) {
					//  DataOpen(array &$record) : void 
					$hnd->DataOpen($dataresponse);
				}

				$result->username = $userdata->username;
				$result->dataresponse = (object) $dataresponse;
				if (method_exists(get_class($hnd), 'DataSavedSuccess')) {
					// DataSavedSuccess(object &$result) : void
					$hnd->DataSavedSuccess($result);
				}

				$this->db->commit();
				return $result;

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

	public function NewId(object $hnd, object $obj) : string {
		// dipanggil hanya saat $autoid == true;

		$id = null;
		$handled = false;
		if (method_exists(get_class($hnd), 'CreateNewId')) {
			// CreateNewId(object $obj) : string 
			$id = $hnd->CreateNewId($obj);
			$handled = true;
		}

		if (!$handled) {
			$id = uniqid();
		}

		return $id;
	}

};