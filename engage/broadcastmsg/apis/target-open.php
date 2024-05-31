<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-target-handler.php')) {
	require_once __DIR__ .'/data-target-handler.php';
}


use \FGTA4\exceptions\WebException;



/**
 * crm/engage/broadcastmsg/apis/target-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel target} broadcastmsg (trn_broadcastmsg)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 20/01/2022
 */
$API = new class extends broadcastmsgBase {

	public function execute($options) {
		$tablename = 'trn_broadcastmsgcust';
		$primarykey = 'broadcastmsgcust_id';
		$userdata = $this->auth->session_get_user();
		

		$handlerclassname = "\\FGTA4\\apis\\broadcastmsg_targetHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new broadcastmsg_targetHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}

		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"broadcastmsgcust_id" => " broadcastmsgcust_id = :broadcastmsgcust_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_broadcastmsgcust A', [
				'broadcastmsgcust_id', 'broadcastmsgcust_name', 'broadcastmsgcust_data', 'broadcastmsgcust_isnew', 'broadcastmsgcust_isrecvoffer', 'broadcastmsgcust_reasonrejectoffer', 'broadcastmsgcust_var1', 'broadcastmsgcust_var2', 'broadcastmsgcust_var3', 'broadcastmsgcust_var4', 'broadcastmsgcust_var5', 'broadcastmsgcust_isfail', 'broadcastmsgcust_failreason', 'broadcastmsg_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
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