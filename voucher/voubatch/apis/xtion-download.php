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
 * retail/sales/promoab/apis/xtion-download.php
 *
 * ========
 * Download
 * ========
 * Download data setting promo.dat yang akan di copy ke POS
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * dibuat tanggal 23/12/2022
 */
$API = new class extends voubatchBase {



	public function download($id) {

		$userdata = $this->auth->session_get_user();

		try {
			$downloadfilename = "voucher-$id.txt";
			$session_id = session_id();

			$tempfile = __TEMP_DIR . "/$session_id-$downloadfilename.txt";
			$this->CreateVoucherFileData($id, $tempfile);
			//$fp = fopen($tempfile, "w");
			//fputs($fp, "satu dua tiga empat");
			//fclose($fp);


			//application/dat .dat
			header('Content-Description: File Transfer');
			header('Content-Type: application/dat');
			header('Content-Disposition: attachment; filename="'.$downloadfilename.'"');
			header('Content-Transfer-Encoding: binary');
			header('Expires: 0');
			header('Cache-Control: must-revalidate');
			header('Pragma: public');
			header('Content-Length: ' . filesize($tempfile));
			
			
			//debug::log("write tempfile to output");
			$fp = fopen($tempfile, "r");
			$output = fread($fp, filesize($tempfile));

			//debug::log("removing temp file.");
			unlink($tempfile);
			return $output;

		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function CreateVoucherFileData(string $id, string $tempfile) : void {
		try {
			$fp = fopen($tempfile, "w");
			$sql = "select vou_id from mst_vou where voubatch_id = :id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':id'=>$id]);
			$rows = $stmt->fetchall();
			foreach ($rows as $row) {
				$voubatch_id = $id;
				$voucher_id = urlencode(base64_encode($row['vou_id']));
				$rowdata = [
					$row['vou_id'],
					$id,
					$voucher_id,
					"https://voucher.transfashionindonesia.com/?id=$voucher_id&batch=$voubatch_id",
				];
				$rowline = implode(',', $rowdata);
				fputs($fp, $rowline."\r\n");
			}
			fclose($fp);
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};


