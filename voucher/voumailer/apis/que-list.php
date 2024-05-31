<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-que-handler.php')) {
	require_once __DIR__ .'/data-que-handler.php';
}

use \FGTA4\exceptions\WebException;


/**
 * crm/voucher/voumailer/apis/que-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel que voumailer (mst_voumailerque)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/01/2023
 */
$API = new class extends voumailerBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		$handlerclassname = "\\FGTA4\\apis\\voumailer_queHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new voumailer_queHandler($options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			$criteriaValues = [
				"id" => " A.voumailer_id = :id"
			];
			if (is_object($hnd)) {
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
			}

			$where = \FGTA4\utils\SqlUtility::BuildCriteria($options->criteria, $criteriaValues);
			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			/* prepare DbLayer Temporay Data Helper if needed */
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'prepareListData')) {
					// ** prepareListData(object $options, array $criteriaValues) : void
					//    misalnya perlu mebuat temporary table,
					//    untuk membuat query komplex dapat dibuat disini	
					$hnd->prepareListData($options, $criteriaValues);
				}
			}
			
			/* Data Query Configuration */
			$sqlFieldList = [
				'voumailerque_id' => 'A.`voumailerque_id`', 'voumailerque_email' => 'A.`voumailerque_email`', 'voumailerque_nama' => 'A.`voumailerque_nama`', 'voubatch_id' => 'A.`voubatch_id`',
				'vou_id' => 'A.`vou_id`', 'msg_id' => 'A.`msg_id`', 'voumailerque_issend' => 'A.`voumailerque_issend`', 'voumailerque_sendby' => 'A.`voumailerque_sendby`',
				'voumailerque_senddate' => 'A.`voumailerque_senddate`', 'voumailer_id' => 'A.`voumailer_id`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "mst_voumailerque A";
			$sqlWhere = $where->sql;
			$sqlLimit = "LIMIT $maxrow OFFSET $offset";

			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'SqlQueryListBuilder')) {
					// ** SqlQueryListBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void
					//    menambah atau memodifikasi field-field yang akan ditampilkan
					//    apabila akan memodifikasi join table
					//    apabila akan memodifikasi nilai parameter
					$hnd->SqlQueryListBuilder($sqlFieldList, $sqlFromTable, $sqlWhere, $where->params);
				}
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
				$options->sortData = [];
			}
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'sortListOrder')) {
					// ** sortListOrder(array &$sortData) : void
					//    jika ada keperluan mengurutkan data
					//    $sortData['fieldname'] = 'ASC/DESC';
					$hnd->sortListOrder($options->sortData);
				}
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
					'voubatch_descr' => \FGTA4\utils\SqlUtility::Lookup($record['voubatch_id'], $this->db, 'mst_voubatch', 'voubatch_id', 'voubatch_descr'),
					'vou_no' => \FGTA4\utils\SqlUtility::Lookup($record['vou_id'], $this->db, 'mst_vou', 'vou_id', 'vou_no'),
				'voumailerque_sendby' => \FGTA4\utils\SqlUtility::Lookup($record['voumailerque_sendby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('voubatch_descr', 'voubatch_id', $record, 'mst_voubatch', 'voubatch_descr', 'voubatch_id');
				$this->addFields('vou_no', 'vou_id', $record, 'mst_vou', 'vou_no', 'vou_id');
				$this->addFields('vou_no', 'voumailerque_sendby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
					 


				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataListLooping')) {
						// ** DataListLooping(array &$record) : void
						//    apabila akan menambahkan field di record
						$hnd->DataListLooping($record);
					}
				}

				array_push($records, $record);
			}

			/* modify and finalize records */
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataListFinal')) {
					// ** DataListFinal(array &$records) : void
					//    finalisasi data list
					$hnd->DataListFinal($records);
				}
			}


			// kembalikan hasilnya
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