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
 * crm/voucher/voubatch/apis/vou-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel vou voubatch (mst_vou)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 19/09/2024
 */
$API = new class extends voubatchBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		$handlerclassname = "\\FGTA4\\apis\\voubatch_vouHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new voubatch_vouHandler($options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			$criteriaValues = [
				"id" => " A.voubatch_id = :id"
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
				'vou_useby' => \FGTA4\utils\SqlUtility::Lookup($record['vou_useby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('undefined', 'vou_useby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
					 


				if ($handleloop) {
					// ** DataListLooping(array &$record) : void
					//    apabila akan menambahkan field di record
					$hnd->DataListLooping($record);
				}

				array_push($records, $record);
			}




			// kembalikan hasilnya
			$result = new \stdClass; 
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;


			/* modify and finalize records */
			if (method_exists(get_class($hnd), 'DataListFinal')) {
				// ** DataListFinal(array &$records, object &$result) : void
				//    finalisasi data list
				$hnd->DataListFinal($records, $result);
			}

			$result->records = $records;

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};