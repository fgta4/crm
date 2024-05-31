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
 * crm/voucher/voubatch/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header voubatch (mst_voubatch)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 25/10/2023
 */
$API = new class extends voubatchBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\voubatch_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new voubatch_headerHandler($options);
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
				"search" => " A.voubatch_id LIKE CONCAT('%', :search, '%') "
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
					'voutype_name' => \FGTA4\utils\SqlUtility::Lookup($record['voutype_id'], $this->db, 'mst_voutype', 'voutype_id', 'voutype_name'),
					'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
					'crmevent_name' => \FGTA4\utils\SqlUtility::Lookup($record['crmevent_id'], $this->db, 'trn_crmevent', 'crmevent_id', 'crmevent_name'),
					'voumodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['voumodel_id'], $this->db, 'mst_voumodel', 'voumodel_id', 'voumodel_name'),
					'voubatch_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['voubatch_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'voubatch_generateby' => \FGTA4\utils\SqlUtility::Lookup($record['voubatch_generateby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('voutype_name', 'voutype_id', $record, 'mst_voutype', 'voutype_name', 'voutype_id');
				$this->addFields('brand_name', 'brand_id', $record, 'mst_brand', 'brand_name', 'brand_id');
				$this->addFields('crmevent_name', 'crmevent_id', $record, 'trn_crmevent', 'crmevent_name', 'crmevent_id');
				$this->addFields('voumodel_name', 'voumodel_id', $record, 'mst_voumodel', 'voumodel_name', 'voumodel_id');
				$this->addFields('voubatch_commitby', 'voubatch_commitby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('voubatch_generateby', 'voubatch_generateby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
					 


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