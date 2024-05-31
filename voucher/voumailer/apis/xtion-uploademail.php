<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;

use \FGTA4\StandartApproval;




/**
 * crm/voucher/voumailer/apis/xtion-commit.php
 *
 * =======
 * Commit
 * =======
 * Commit dokumen, menandakan dokumen yang selesai dsunting
 * dan telah siap untuk diproses lebih lanjut
 * Pada status tercommit, dokumen akan menjadi readonly. 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 29/09/2022
 */
$API = new class extends voumailerBase {

	public function execute($id, $param) {
		$tablename = 'mst_voumailer';
		$primarykey = 'voumailer_id';
		$userdata = $this->auth->session_get_user();

		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			$this->pre_action_check($currentdata, 'commit');


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				
				$dataemail = $param->dataemail;
				$this->uploademail($id, $currentdata, $dataemail);

				
				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'voumailer_dt' => date("d/m/Y", strtotime($record['voumailer_dt'])),
					'voumailer_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['voumailer_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'PREPARE', $userdata->username, (object)[]);

				$this->db->commit();
				return (object)[
					'success' => true,
					'version' => $currentdata->header->{$this->main_field_version},
					'dataresponse' => $dataresponse
				];

				
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}


		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	public function uploademail($id, $currentdata, $dataemail) {
		try {
			// mst_voumailerque
			// voumailer_id
			// voumailerque_email
			$userdata = $currentdata->user;

			$sqlcek = "select * from mst_voumaileremail where voumailer_id = :voumailer_id and voumaileremail_email = :voumaileremail_email";
			$stmtcek = $this->db->prepare($sqlcek);

			$tablename = "mst_voumaileremail";

			// $this->log($dataemail);
			foreach ($dataemail as $data) {
				$email = $data->email;
				$nama = $data->nama;

				$stmtcek->execute([':voumailer_id'=>$id, ':voumaileremail_email'=>$email]);
				$rows = $stmtcek->fetchall();
				if (count($rows)>0) {
					continue;
				}	

				$obj = (object)[
					'voumaileremail_id' => uniqid(),
					'voumaileremail_email' => $email ,
					'voumaileremail_nama' => $nama ,
					'voumailer_id' => $id,
					'_createby' => $userdata->username,
					'_createdate' =>  date("Y-m-d H:i:s")
				];

				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

			}


		} catch (\Exception $ex) {
			throw $ex;
		}	
	}	
};


