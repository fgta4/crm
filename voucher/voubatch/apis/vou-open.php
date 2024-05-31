<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-vou-handler.php')) {
	require_once __DIR__ .'/data-vou-handler.php';
}


use \FGTA4\exceptions\WebException;



/**
 * crm/voucher/voubatch/apis/vou-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel vou voubatch (mst_vou)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 25/10/2023
 */
$API = new class extends voubatchBase {

	public function execute($options) {
		$event = 'on-open';
		$tablename = 'mst_vou';
		$primarykey = 'vou_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\voubatch_vouHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new voubatch_vouHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
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

			$result = new \stdClass; 

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
				'vou_assignto' => 'A.`vou_assignto`', 'vou_assigntoname' => 'A.`vou_assigntoname`', 'voumailerque_id' => 'A.`voumailerque_id`', 'vou_file' => 'A.`vou_file`',
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

			$result->record = array_merge($record, [
				'vou_dtactive' => date("d/m/Y", strtotime($record['vou_dtactive'])),
				'vou_dtexpired' => date("d/m/Y", strtotime($record['vou_dtexpired'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				

/*{__LOOKUPUSERMERGE__}*/
				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);


			$file_id = "$tablename/" . $result->record[$primarykey];
			try { $result->record['vou_file_doc'] = $this->cdb->getAttachment($file_id, 'filedata'); } catch (\Exception $ex) {}
	


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