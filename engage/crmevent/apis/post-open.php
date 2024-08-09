<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-post-handler.php')) {
	require_once __DIR__ .'/data-post-handler.php';
}


use \FGTA4\exceptions\WebException;



/**
 * crm/engage/crmevent/apis/post-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel post crmevent (trn_crmeventpost)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/11/2023
 */
$API = new class extends crmeventBase {

	public function execute($options) {
		$event = 'on-open';
		$tablename = 'trn_crmeventpost';
		$primarykey = 'crmeventpost_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\crmevent_postHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new crmevent_postHandler($options);
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
				"crmeventpost_id" => " crmeventpost_id = :crmeventpost_id "
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
				'crmeventpost_id' => 'A.`crmeventpost_id`', 'crmeventpost_url' => 'A.`crmeventpost_url`', 'crmeventpost_dtpost' => 'A.`crmeventpost_dtpost`', 'crmeventpost_dtreported' => 'A.`crmeventpost_dtreported`',
				'mediaposttype_id' => 'A.`mediaposttype_id`', 'kol_id' => 'A.`kol_id`', 'media_id' => 'A.`media_id`', 'crmeventpost_impression' => 'A.`crmeventpost_impression`',
				'crmeventpost_reach' => 'A.`crmeventpost_reach`', 'crmeventpost_view' => 'A.`crmeventpost_view`', 'crmeventpost_comment' => 'A.`crmeventpost_comment`', 'crmeventpost_likes' => 'A.`crmeventpost_likes`',
				'crmeventpost_share' => 'A.`crmeventpost_share`', 'crmeventpost_save' => 'A.`crmeventpost_save`', 'crmeventpost_engagementrate' => 'A.`crmeventpost_engagementrate`', 'mediaposttype_iskol' => 'A.`mediaposttype_iskol`',
				'crmevent_id' => 'A.`crmevent_id`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_crmeventpost A";
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
				'crmeventpost_dtpost' => date("d/m/Y", strtotime($record['crmeventpost_dtpost'])),
				'crmeventpost_dtreported' => date("d/m/Y", strtotime($record['crmeventpost_dtreported'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'mediaposttype_name' => \FGTA4\utils\SqlUtility::Lookup($record['mediaposttype_id'], $this->db, 'mst_mediaposttype', 'mediaposttype_id', 'mediaposttype_name'),
				'kol_name' => \FGTA4\utils\SqlUtility::Lookup($record['kol_id'], $this->db, 'mst_kol', 'kol_id', 'kol_name'),
				'media_name' => \FGTA4\utils\SqlUtility::Lookup($record['media_id'], $this->db, 'mst_media', 'media_id', 'media_name'),

/*{__LOOKUPUSERMERGE__}*/
				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);


	


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