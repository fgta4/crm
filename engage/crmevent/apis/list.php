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
 * crm/engage/crmevent/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header crmevent (trn_crmevent)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 26/10/2023
 */
$API = new class extends crmeventBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\crmevent_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new crmevent_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			$criteriaValues = [
				"search" => " A.crmevent_id LIKE CONCAT('%', :search, '%') OR A.crmevent_name LIKE CONCAT('%', :search, '%') "
			];

			if (method_exists(get_class($hnd), 'buildListCriteriaValues')) {
				// ** buildListCriteriaValues(object &$options, array &$criteriaValues) : void
				//    apabila akan modifikasi parameter2 untuk query
				//    $criteriaValues['fieldname'] = " A.fieldname = :fieldname";  <-- menambahkan field pada where dan memberi parameter value
				//    $criteriaValues['fieldname'] = "--";                         <-- memberi parameter value tanpa menambahkan pada where
				//    $criteriaValues['fieldname'] = null                          <-- tidak memberi efek pada query secara langsung, parameter digunakan untuk keperluan lain 
				//
				//    untuk memberikan nilai default apabila paramter tidak dikirim
				//    // \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
				$hnd->buildListCriteriaValues($options, $criteriaValues);
			}

			$where = \FGTA4\utils\SqlUtility::BuildCriteria($options->criteria, $criteriaValues);
			
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			/* prepare DbLayer Temporay Data Helper if needed */
			if (method_exists(get_class($hnd), 'prepareListData')) {
				// ** prepareListData(object $options, array $criteriaValues) : void
				//    misalnya perlu mebuat temporary table,
				//    untuk membuat query komplex dapat dibuat disini	
				$hnd->prepareListData($options, $criteriaValues);
			}


			/* Data Query Configuration */
			$sqlFieldList = [
				'crmevent_id' => 'A.`crmevent_id`', 'crmevent_name' => 'A.`crmevent_name`', 'crmevent_descr' => 'A.`crmevent_descr`', 'crmevent_dtstart' => 'A.`crmevent_dtstart`',
				'crmevent_dtend' => 'A.`crmevent_dtend`', 'crmevent_dtaffected' => 'A.`crmevent_dtaffected`', 'crmevent_message' => 'A.`crmevent_message`', 'crmevent_registeredmessage' => 'A.`crmevent_registeredmessage`',
				'crmevent_iscommit' => 'A.`crmevent_iscommit`', 'crmevent_isdisabled' => 'A.`crmevent_isdisabled`', 'crmevent_isunlimit' => 'A.`crmevent_isunlimit`', 'crmevent_isclose' => 'A.`crmevent_isclose`',
				'crmevent_targetinvited' => 'A.`crmevent_targetinvited`', 'crmevent_targetattendant' => 'A.`crmevent_targetattendant`', 'crmevent_targetnewcontact' => 'A.`crmevent_targetnewcontact`', 'crmevent_targettx' => 'A.`crmevent_targettx`',
				'crmevent_targettxnew' => 'A.`crmevent_targettxnew`', 'crmevent_targetbuyer' => 'A.`crmevent_targetbuyer`', 'crmevent_targetbuyernew' => 'A.`crmevent_targetbuyernew`', 'crmevent_targetsales' => 'A.`crmevent_targetsales`',
				'crmevent_targetsalesnew' => 'A.`crmevent_targetsalesnew`', 'crmevent_totalinvited' => 'A.`crmevent_totalinvited`', 'crmevent_totalattendant' => 'A.`crmevent_totalattendant`', 'crmevent_totalnewcontact' => 'A.`crmevent_totalnewcontact`',
				'crmevent_totaltx' => 'A.`crmevent_totaltx`', 'crmevent_totaltxnew' => 'A.`crmevent_totaltxnew`', 'crmevent_totalbuyer' => 'A.`crmevent_totalbuyer`', 'crmevent_totalbuyernew' => 'A.`crmevent_totalbuyernew`',
				'crmevent_totalsales' => 'A.`crmevent_totalsales`', 'crmevent_totalsalesnew' => 'A.`crmevent_totalsalesnew`', 'crmsource_id' => 'A.`crmsource_id`', '_createby' => 'A.`_createby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_crmevent A";
			$sqlWhere = $where->sql;
			$sqlLimit = "LIMIT $maxrow OFFSET $offset";

			if (method_exists(get_class($hnd), 'SqlQueryListBuilder')) {
				// ** SqlQueryListBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void
				//    menambah atau memodifikasi field-field yang akan ditampilkan
				//    apabila akan memodifikasi join table
				//    apabila akan memodifikasi nilai parameter
				$hnd->SqlQueryListBuilder($sqlFieldList, $sqlFromTable, $sqlWhere, $where->params);
			}
			
			// filter select columns
			if (!property_exists($options, 'selectFields')) {
				$options->selectFields = [];
			}
			$columsSelected = $this->SelectColumns($sqlFieldList, $options->selectFields);
			$sqlFields = \FGTA4\utils\SqlUtility::generateSqlSelectFieldList($columsSelected);


			/* Sort Configuration */
			if (!property_exists($options, 'sortData')) {
				$options->sortData = [];
			}
			if (!is_array($options->sortData)) {
				if (is_object($options->sortData)) {
					$options->sortData = (array)$options->sortData;
				} else {
					$options->sortData = [];
				}
			}

		


			if (method_exists(get_class($hnd), 'sortListOrder')) {
				// ** sortListOrder(array &$sortData) : void
				//    jika ada keperluan mengurutkan data
				//    $sortData['fieldname'] = 'ASC/DESC';
				$hnd->sortListOrder($options->sortData);
			}
			$sqlOrders = \FGTA4\utils\SqlUtility::generateSqlSelectSort($options->sortData);


			/* Compose SQL Query */
			$sqlCount = "select count(*) as n from $sqlFromTable $sqlWhere";
			$sqlData = "
				select 
				$sqlFields 
				from 
				$sqlFromTable 
				$sqlWhere 
				$sqlOrders 
				$sqlLimit
			";

			/* Execute Query: Count */
			$stmt = $this->db->prepare($sqlCount );
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			/* Execute Query: Retrieve Data */
			$stmt = $this->db->prepare($sqlData);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);


			$handleloop = false;
			if (method_exists(get_class($hnd), 'DataListLooping')) {
				$handleloop = true;
			}

			/* Proces result */
			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}


				/*
				$record = array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'crmsource_name' => \FGTA4\utils\SqlUtility::Lookup($record['crmsource_id'], $this->db, 'mst_crmsource', 'crmsource_id', 'crmsource_name'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('crmsource_name', 'crmsource_id', $record, 'mst_crmsource', 'crmsource_name', 'crmsource_id');
					 


				if ($handleloop) {
					// ** DataListLooping(array &$record) : void
					//    apabila akan menambahkan field di record
					$hnd->DataListLooping($record);
				}

				array_push($records, $record);
			}

			/* modify and finalize records */
			if (method_exists(get_class($hnd), 'DataListFinal')) {
				// ** DataListFinal(array &$records) : void
				//    finalisasi data list
				$hnd->DataListFinal($records);
			}

			// kembalikan hasilnya
			$result = new \stdClass; 
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};