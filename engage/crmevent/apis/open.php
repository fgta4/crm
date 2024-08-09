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
 * crm/engage/crmevent/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header crmevent (trn_crmevent)
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
		$tablename = 'trn_crmevent';
		$primarykey = 'crmevent_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\crmevent_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new crmevent_headerHandler($options);
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
				"crmevent_id" => " crmevent_id = :crmevent_id "
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
				'crmevent_id' => 'A.`crmevent_id`', 'crmevent_name' => 'A.`crmevent_name`', 'crmevent_descr' => 'A.`crmevent_descr`', 'crmevent_dtactive' => 'A.`crmevent_dtactive`',
				'crmevent_dtstart' => 'A.`crmevent_dtstart`', 'crmevent_dtend' => 'A.`crmevent_dtend`', 'crmevent_dtaffected' => 'A.`crmevent_dtaffected`', 'crmevent_message' => 'A.`crmevent_message`',
				'crmevent_invitationmessage' => 'A.`crmevent_invitationmessage`', 'crmevent_registeredmessage' => 'A.`crmevent_registeredmessage`', 'crmevent_iscommit' => 'A.`crmevent_iscommit`', 'crmevent_isdisabled' => 'A.`crmevent_isdisabled`',
				'crmevent_isunlimit' => 'A.`crmevent_isunlimit`', 'crmevent_isclose' => 'A.`crmevent_isclose`', 'crmevent_targetinvited' => 'A.`crmevent_targetinvited`', 'crmevent_targetattendant' => 'A.`crmevent_targetattendant`',
				'crmevent_targetnewcontact' => 'A.`crmevent_targetnewcontact`', 'crmevent_targettx' => 'A.`crmevent_targettx`', 'crmevent_targettxnew' => 'A.`crmevent_targettxnew`', 'crmevent_targetbuyer' => 'A.`crmevent_targetbuyer`',
				'crmevent_targetbuyernew' => 'A.`crmevent_targetbuyernew`', 'crmevent_targetsales' => 'A.`crmevent_targetsales`', 'crmevent_targetsalesnew' => 'A.`crmevent_targetsalesnew`', 'crmevent_totalinvited' => 'A.`crmevent_totalinvited`',
				'crmevent_totalattendant' => 'A.`crmevent_totalattendant`', 'crmevent_totalnewcontact' => 'A.`crmevent_totalnewcontact`', 'crmevent_totaltx' => 'A.`crmevent_totaltx`', 'crmevent_totaltxnew' => 'A.`crmevent_totaltxnew`',
				'crmevent_totalbuyer' => 'A.`crmevent_totalbuyer`', 'crmevent_totalbuyernew' => 'A.`crmevent_totalbuyernew`', 'crmevent_totalsales' => 'A.`crmevent_totalsales`', 'crmevent_totalsalesnew' => 'A.`crmevent_totalsalesnew`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_crmevent A";
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
				'crmevent_dtactive' => date("d/m/Y", strtotime($record['crmevent_dtactive'])),
				'crmevent_dtstart' => date("d/m/Y", strtotime($record['crmevent_dtstart'])),
				'crmevent_dtend' => date("d/m/Y", strtotime($record['crmevent_dtend'])),
				'crmevent_dtaffected' => date("d/m/Y", strtotime($record['crmevent_dtaffected'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				


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