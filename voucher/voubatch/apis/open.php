<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;


/**
 * crm/voucher/voubatch/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header voubatch (mst_voubatch)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 07/08/2024
 */
$API = new class extends voubatchBase {
	
	public function execute($options) {
		$event = 'on-open';
		$tablename = 'mst_voubatch';
		$primarykey = 'voubatch_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\voubatch_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new voubatch_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			if (method_exists(get_class($hnd), 'PreCheckOpen')) {
				// PreCheckOpen($data, &$key, &$options)
				$hnd->PreCheckOpen($data, $key, $options);
			}

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
			

			if (method_exists(get_class($hnd), 'prepareOpenData')) {
				// prepareOpenData(object $options, $criteriaValues) : void
				$hnd->prepareOpenData($options, $criteriaValues);
			}


			$sqlFieldList = [
				'voubatch_id' => 'A.`voubatch_id`', 'voutype_id' => 'A.`voutype_id`', 'brand_id' => 'A.`brand_id`', 'voubatch_descr' => 'A.`voubatch_descr`',
				'crmevent_id' => 'A.`crmevent_id`', 'voubatch_dtstart' => 'A.`voubatch_dtstart`', 'voubatch_dtend' => 'A.`voubatch_dtend`', 'voubatch_cond' => 'A.`voubatch_cond`',
				'voubatch_dtactive' => 'A.`voubatch_dtactive`', 'voubatch_dtexpired' => 'A.`voubatch_dtexpired`', 'voubatch_file' => 'A.`voubatch_file`', 'voubatch_isgenimage' => 'A.`voubatch_isgenimage`',
				'voubatch_width' => 'A.`voubatch_width`', 'voubatch_barpostop' => 'A.`voubatch_barpostop`', 'voubatch_barposleft' => 'A.`voubatch_barposleft`', 'voumodel_id' => 'A.`voumodel_id`',
				'voubatch_code' => 'A.`voubatch_code`', 'voubatch_value' => 'A.`voubatch_value`', 'voubatch_qty' => 'A.`voubatch_qty`', 'voubatch_qtymax' => 'A.`voubatch_qtymax`',
				'voubatch_isondemand' => 'A.`voubatch_isondemand`', 'voubatch_isactive' => 'A.`voubatch_isactive`', 'voubatch_version' => 'A.`voubatch_version`', 'voubatch_iscommit' => 'A.`voubatch_iscommit`',
				'voubatch_commitby' => 'A.`voubatch_commitby`', 'voubatch_commitdate' => 'A.`voubatch_commitdate`', 'voubatch_isgenerate' => 'A.`voubatch_isgenerate`', 'voubatch_generateby' => 'A.`voubatch_generateby`',
				'voubatch_generatedate' => 'A.`voubatch_generatedate`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`',
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



			$result->record = array_merge($record, [
				'voubatch_dtstart' => date("d/m/Y", strtotime($record['voubatch_dtstart'])),
				'voubatch_dtend' => date("d/m/Y", strtotime($record['voubatch_dtend'])),
				'voubatch_dtactive' => date("d/m/Y", strtotime($record['voubatch_dtactive'])),
				'voubatch_dtexpired' => date("d/m/Y", strtotime($record['voubatch_dtexpired'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'voutype_name' => \FGTA4\utils\SqlUtility::Lookup($record['voutype_id'], $this->db, 'mst_voutype', 'voutype_id', 'voutype_name'),
				'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
				'crmevent_name' => \FGTA4\utils\SqlUtility::Lookup($record['crmevent_id'], $this->db, 'trn_crmevent', 'crmevent_id', 'crmevent_name'),
				'voumodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['voumodel_id'], $this->db, 'mst_voumodel', 'voumodel_id', 'voumodel_name'),
				'voubatch_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['voubatch_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'voubatch_generateby' => \FGTA4\utils\SqlUtility::Lookup($record['voubatch_generateby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),


				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);


			$file_id = "$tablename/" . $result->record[$primarykey];
			try { $result->record['voubatch_file_doc'] = $this->cdb->getAttachment($file_id, 'filedata'); } catch (\Exception $ex) {}
			

			if (method_exists(get_class($hnd), 'DataOpen')) {
				//  DataOpen(array &$record) : void 
				$hnd->DataOpen($result->record);
			}

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};