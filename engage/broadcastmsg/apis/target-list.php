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
 * crm/engage/broadcastmsg/apis/target-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel target broadcastmsg (trn_broadcastmsg)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 20/01/2022
 */
$API = new class extends broadcastmsgBase {

	public function execute($options) {
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

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"id" => " A.broadcastmsg_id = :id"
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_broadcastmsgcust A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];


			// agar semua baris muncul
			// $maxrow = $total;

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.broadcastmsgcust_id, A.broadcastmsgcust_name, A.broadcastmsgcust_data, A.broadcastmsgcust_isnew, A.broadcastmsgcust_isrecvoffer, A.broadcastmsgcust_reasonrejectoffer, A.broadcastmsgcust_var1, A.broadcastmsgcust_var2, A.broadcastmsgcust_var3, A.broadcastmsgcust_var4, A.broadcastmsgcust_var5, A.broadcastmsgcust_isfail, A.broadcastmsgcust_failreason, A.broadcastmsg_id, A._createby, A._createdate, A._modifyby, A._modifydate 
				from trn_broadcastmsgcust A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'

					 
				]));
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