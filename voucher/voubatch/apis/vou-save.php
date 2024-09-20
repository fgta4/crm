<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';
//require_once __ROOT_DIR . "/core/sequencer.php";


if (is_file(__DIR__ .'/data-vou-handler.php')) {
	require_once __DIR__ .'/data-vou-handler.php';
}



use \FGTA4\exceptions\WebException;
//use \FGTA4\utils\Sequencer;



/**
 * crm/voucher/voubatch/apis/vou-save.php
 *
 * ==========
 * Detil-Save
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel vou voubatch (mst_vou)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 20/09/2024
 */
$API = new class extends voubatchBase {
	
	public function execute($data, $options, $files) {
		$event = 'on-save';
		$tablename = 'mst_vou';
		$primarykey = 'vou_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\voubatch_vouHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new voubatch_vouHandler($data, $options);
			$hnd->caller = &$this;
			$hnd->db = &$this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {
			
			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}
			
			// data yang akan di update dari table
			$sqlUpdateField  = [
					'vou_id', 'vou_no', 'vou_ran', 'vou_parity',
					'vou_value', 'vou_infocode', 'vou_infocoderan', 'vou_infocodeparity',
					'vou_assigncode', 'vou_assignto', 'vou_assigntoname', 'vou_file',
					'vou_isactive', 'vou_dtactive', 'vou_dtexpired', 'vou_isview',
					'vou_viewdate', 'vou_ismark', 'vou_markregion', 'vou_markbranch',
					'vou_markmachine', 'vou_isuse', 'vou_useby', 'vou_usedate',
					'vou_createfrombon', 'vou_createfrombonvalue', 'vou_bon', 'vou_useregionbranch',
					'vou_useregionbranchname', 'vou_usevalue', 'vou_isdup', 'voubatch_id'
			];
			if (method_exists(get_class($hnd), 'setUpdateField')) {
				// setUpdateField(&$sqlUpdateField, $data, $options)
				$hnd->setUpdateField($sqlUpdateField, $data, $options);
			}



			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($sqlUpdateField as $fieldname) {
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				if (property_exists($data, $fieldname)) {
					$obj->{$fieldname} = $data->{$fieldname};
				}
			}


			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');
			$obj->vou_dtactive = (\DateTime::createFromFormat('d/m/Y',$obj->vou_dtactive))->format('Y-m-d');
			$obj->vou_dtexpired = (\DateTime::createFromFormat('d/m/Y',$obj->vou_dtexpired))->format('Y-m-d');



			if ($obj->vou_assigncode=='') { $obj->vou_assigncode = '--NULL--'; }
			if ($obj->vou_assignto=='') { $obj->vou_assignto = '--NULL--'; }
			if ($obj->vou_assigntoname=='') { $obj->vou_assigntoname = '--NULL--'; }
			if ($obj->vou_markregion=='') { $obj->vou_markregion = '--NULL--'; }
			if ($obj->vou_markbranch=='') { $obj->vou_markbranch = '--NULL--'; }
			if ($obj->vou_markmachine=='') { $obj->vou_markmachine = '--NULL--'; }
			if ($obj->vou_createfrombon=='') { $obj->vou_createfrombon = '--NULL--'; }
			if ($obj->vou_bon=='') { $obj->vou_bon = '--NULL--'; }
			if ($obj->vou_useregionbranch=='') { $obj->vou_useregionbranch = '--NULL--'; }
			if ($obj->vou_useregionbranchname=='') { $obj->vou_useregionbranchname = '--NULL--'; }
			if ($obj->vou_usevalue=='') { $obj->vou_usevalue = '--NULL--'; }



			unset($obj->vou_isview);
			unset($obj->vou_viewdate);
			unset($obj->vou_ismark);
			unset($obj->vou_markregion);
			unset($obj->vou_markbranch);
			unset($obj->vou_markmachine);
			unset($obj->vou_isuse);
			unset($obj->vou_useby);
			unset($obj->vou_usedate);
			unset($obj->vou_createfrombon);
			unset($obj->vou_createfrombonvalue);
			unset($obj->vou_bon);
			unset($obj->vou_useregionbranch);
			unset($obj->vou_useregionbranchname);
			unset($obj->vou_usevalue);
			unset($obj->vou_isdup);



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
				// ** DataSaving(object &$obj, object &$key) : void
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
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}

				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				
				// Update user & timestamp di header
				$header_table = 'mst_voubatch';
				$header_primarykey = 'voubatch_id';
				$detil_primarykey = 'voubatch_id';
				$sqlrec = "update $header_table set _modifyby = :user_id, _modifydate=NOW() where $header_primarykey = :$header_primarykey";
				$stmt = $this->db->prepare($sqlrec);
				$stmt->execute([
					":user_id" => $userdata->username,
					":$header_primarykey" => $obj->{$detil_primarykey}
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);
				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $header_table, $obj->{$detil_primarykey}, $action . "_DETIL", $userdata->username, (object)[]);


				$fieldname = 'vou_file';	
				if (property_exists($files, $fieldname)) {

					$file_id = "$tablename/" .$obj->{$primarykey};
					$doc = $files->{$fieldname};
					$doc->doctype = $tablename;
					$doc->docid = $obj->{$primarykey};
					$file_base64data = $doc->data;
					unset($doc->data);

					$overwrite = true;
					$res = $this->cdb->addAttachment($file_id, $doc, 'filedata', $file_base64data, $overwrite);	
					$rev = $res->asObject()->rev;

					$key->{$primarykey} = "$tablename/" .$obj->{$primarykey};
					
					$objfile = new \stdClass;
					$objfile->{$primarykey} = $key->{$primarykey};
					$objfile->vou_file = $rev;
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $objfile, $key);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
				}				
			
			


				// result
				$options->criteria = [
					"vou_id" => $obj->vou_id
				];

				$criteriaValues = [
					"vou_id" => " vou_id = :vou_id "
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
					'vou_id' => 'A.`vou_id`', 'vou_no' => 'A.`vou_no`', 'vou_ran' => 'A.`vou_ran`', 'vou_parity' => 'A.`vou_parity`',
					'vou_value' => 'A.`vou_value`', 'vou_infocode' => 'A.`vou_infocode`', 'vou_infocoderan' => 'A.`vou_infocoderan`', 'vou_infocodeparity' => 'A.`vou_infocodeparity`',
					'vou_assigncode' => 'A.`vou_assigncode`', 'vou_assignto' => 'A.`vou_assignto`', 'vou_assigntoname' => 'A.`vou_assigntoname`', 'vou_file' => 'A.`vou_file`',
					'vou_isactive' => 'A.`vou_isactive`', 'vou_dtactive' => 'A.`vou_dtactive`', 'vou_dtexpired' => 'A.`vou_dtexpired`', 'vou_isview' => 'A.`vou_isview`',
					'vou_viewdate' => 'A.`vou_viewdate`', 'vou_ismark' => 'A.`vou_ismark`', 'vou_markregion' => 'A.`vou_markregion`', 'vou_markbranch' => 'A.`vou_markbranch`',
					'vou_markmachine' => 'A.`vou_markmachine`', 'vou_isuse' => 'A.`vou_isuse`', 'vou_useby' => 'A.`vou_useby`', 'vou_usedate' => 'A.`vou_usedate`',
					'vou_createfrombon' => 'A.`vou_createfrombon`', 'vou_createfrombonvalue' => 'A.`vou_createfrombonvalue`', 'vou_bon' => 'A.`vou_bon`', 'vou_useregionbranch' => 'A.`vou_useregionbranch`',
					'vou_useregionbranchname' => 'A.`vou_useregionbranchname`', 'vou_usevalue' => 'A.`vou_usevalue`', 'vou_isdup' => 'A.`vou_isdup`', 'voubatch_id' => 'A.`voubatch_id`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "mst_vou A";
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
					'vou_dtactive' => date("d/m/Y", strtotime($row['vou_dtactive'])),
					'vou_dtexpired' => date("d/m/Y", strtotime($row['vou_dtexpired'])),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);
				
				if (method_exists(get_class($hnd), 'DataOpen')) {
					//  DataOpen(array &$record) : void 
					$hnd->DataOpen($dataresponse);
				}


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

	public function NewId($hnd, $obj) {
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