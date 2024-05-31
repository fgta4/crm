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
 * crm/master/broadcastquota/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header broadcastquota (mst_broadcastquota)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 18/01/2022
 */
$API = new class extends broadcastquotaBase {
	
	public function execute($options) {
		$tablename = 'mst_broadcastquota';
		$primarykey = 'broadcastquota_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\broadcastquota_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new broadcastquota_headerHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"broadcastquota_id" => " broadcastquota_id = :broadcastquota_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_broadcastquota A', [
				'broadcastquota_id', 'broadcasttype_id', 'broadcastquota_name', 'broadcastquota_saldovalue', 'broadcastquota_saldocredit', 'prepaid_accbudget_id', 'prepaid_coa_id', 'broadcastmodel_id', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}



			$result->record = array_merge($record, [
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'broadcasttype_name' => \FGTA4\utils\SqlUtility::Lookup($record['broadcasttype_id'], $this->db, 'mst_broadcasttype', 'broadcasttype_id', 'broadcasttype_name'),
				'prepaid_accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['prepaid_accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
				'prepaid_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['prepaid_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'broadcastmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['broadcastmodel_id'], $this->db, 'mst_broadcastmodel', 'broadcastmodel_id', 'broadcastmodel_name'),


				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataOpen')) {
					$hnd->DataOpen($result->record);
				}
			}


			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};