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
 * crm/voucher/voubatch/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header voubatch (mst_voubatch)
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
		$tablename = 'mst_voubatch';
		$primarykey = 'voubatch_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\voubatch_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new voubatch_headerHandler($options);
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
			$obj->voubatch_dtstart = (\DateTime::createFromFormat('d/m/Y',$obj->voubatch_dtstart))->format('Y-m-d');
			$obj->voubatch_dtend = (\DateTime::createFromFormat('d/m/Y',$obj->voubatch_dtend))->format('Y-m-d');
			$obj->voubatch_dtactive = (\DateTime::createFromFormat('d/m/Y',$obj->voubatch_dtactive))->format('Y-m-d');
			$obj->voubatch_dtexpired = (\DateTime::createFromFormat('d/m/Y',$obj->voubatch_dtexpired))->format('Y-m-d');

			$obj->voubatch_id = strtoupper($obj->voubatch_id);




			unset($obj->voubatch_isactive);
			unset($obj->voubatch_iscommit);
			unset($obj->voubatch_commitby);
			unset($obj->voubatch_commitdate);
			unset($obj->voubatch_isgenerate);
			unset($obj->voubatch_generateby);
			unset($obj->voubatch_generatedate);


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


				$fieldname = 'voubatch_file';	
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
					$objfile->voubatch_file = $rev;
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $objfile, $key);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
				}				
				
				


				// result
				$options->criteria = [
					"voubatch_id" => $obj->voubatch_id
				];

				$criteriaValues = [
					"voubatch_id" => " voubatch_id = :voubatch_id "
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
					'voubatch_id' => 'A.`voubatch_id`', 'voutype_id' => 'A.`voutype_id`', 'brand_id' => 'A.`brand_id`', 'voubatch_descr' => 'A.`voubatch_descr`',
					'voubatch_greeting' => 'A.`voubatch_greeting`', 'voubatch_qrreq' => 'A.`voubatch_qrreq`', 'voubatch_dtstart' => 'A.`voubatch_dtstart`', 'voubatch_dtend' => 'A.`voubatch_dtend`',
					'voubatch_cond' => 'A.`voubatch_cond`', 'voubatch_dtactive' => 'A.`voubatch_dtactive`', 'voubatch_dtexpired' => 'A.`voubatch_dtexpired`', 'voubatch_file' => 'A.`voubatch_file`',
					'voubatch_isgenimage' => 'A.`voubatch_isgenimage`', 'voubatch_width' => 'A.`voubatch_width`', 'voubatch_barpostop' => 'A.`voubatch_barpostop`', 'voubatch_barposleft' => 'A.`voubatch_barposleft`',
					'voumodel_id' => 'A.`voumodel_id`', 'voubatch_code' => 'A.`voubatch_code`', 'voubatch_value' => 'A.`voubatch_value`', 'voubatch_qty' => 'A.`voubatch_qty`',
					'voubatch_qtymax' => 'A.`voubatch_qtymax`', 'voubatch_isusecodeact' => 'A.`voubatch_isusecodeact`', 'voubatch_isondemand' => 'A.`voubatch_isondemand`', 'voubatch_isactive' => 'A.`voubatch_isactive`',
					'voubatch_version' => 'A.`voubatch_version`', 'voubatch_iscommit' => 'A.`voubatch_iscommit`', 'voubatch_commitby' => 'A.`voubatch_commitby`', 'voubatch_commitdate' => 'A.`voubatch_commitdate`',
					'voubatch_isgenerate' => 'A.`voubatch_isgenerate`', 'voubatch_generateby' => 'A.`voubatch_generateby`', 'voubatch_generatedate' => 'A.`voubatch_generatedate`', '_createby' => 'A.`_createby`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "mst_voubatch A";
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
					'voutype_name' => \FGTA4\utils\SqlUtility::Lookup($record['voutype_id'], $this->db, 'mst_voutype', 'voutype_id', 'voutype_name'),
					'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
					'voubatch_dtstart' => date("d/m/Y", strtotime($row['voubatch_dtstart'])),
					'voubatch_dtend' => date("d/m/Y", strtotime($row['voubatch_dtend'])),
					'voubatch_dtactive' => date("d/m/Y", strtotime($row['voubatch_dtactive'])),
					'voubatch_dtexpired' => date("d/m/Y", strtotime($row['voubatch_dtexpired'])),
					'voumodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['voumodel_id'], $this->db, 'mst_voumodel', 'voumodel_id', 'voumodel_name'),
					'voubatch_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['voubatch_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'voubatch_generateby' => \FGTA4\utils\SqlUtility::Lookup($record['voubatch_generateby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

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