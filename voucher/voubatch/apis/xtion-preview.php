<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __DIR__ . '/xapi.base.php';
require_once __DIR__ . '/code128barcode.php';  // https://github.com/anigenero/php-barcode-generator/tree/master/src

use \FGTA4\exceptions\WebException;

use \FGTA4\StandartApproval;




/**
 * crm/voucher/voubatch/apis/xtion-preview.php
 *
 * =======
 * PReview
 * =======
 * Menampilkan bentuk gambar setelah ditambahkan barcode
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 29/09/2022
 */
$API = new class extends voubatchBase {

	public function download($id) {
		$tablename = 'mst_voubatch';
		$primarykey = 'voubatch_id';
		$userdata = $this->auth->session_get_user();

		$dir = __TEMP_DIR . "/voucher";
		if (!is_dir($dir)) {
			mkdir($dir);
		}

		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];


			$header = $currentdata->header;
			$voubatch_width = $header->voubatch_width;
			$voubatch_barpostop = $header->voubatch_barpostop;
			$voubatch_barposleft = $header->voubatch_barposleft;

			$templatedata = $this->get_template_data($id);
			$img_template_ori = imagecreatefromstring($templatedata);
			$tpl_width_ori  = imagesx($img_template_ori);
			$tpl_height_ori = imagesy($img_template_ori);
			$tpl_width = $voubatch_width;
			$tpl_height = floor(($tpl_height_ori/$tpl_width_ori)*$tpl_width);

			// resize template to target size
			$img_template = imagecreatetruecolor($tpl_width, $tpl_height);
			imagecopyresampled($img_template, $img_template_ori, 0, 0, 0, 0, $tpl_width, $tpl_height, $tpl_width_ori, $tpl_height_ori);

			$barcode_data = Code128Barcode::generate("8888888888888");	
			$img_barcode = $barcode_data['image'];
			$img_barcode_width = $barcode_data['width'];
			$img_barcode_height = $barcode_data['height'];


			// merge image
			$tmpname = uniqid();
			$tmppath = "$dir/tmp_" . $tmpname . ".jpg";
			imagecopymerge($img_template, $img_barcode, $voubatch_barpostop, $voubatch_barposleft, 0, 0, $img_barcode_width, $img_barcode_height, 100);
			imagejpeg($img_template, $tmppath);
			$fp = fopen($tmppath, "r");
			$contents = fread($fp, filesize($tmppath));
			$img_data = base64_encode($contents);
			fclose($fp);

			unlink($tmppath);

			header('Content-Type: text/html; charset=UTF-8');
			header('Content-Disposition: inline; filename="oreview.html"');
			$img  = "<img src=\"data:image/jpeg;base64,$img_data\" width=\"$tpl_width\" height=\"$tpl_height\">";
			$img .= '';

			$html = "<!DOCTYPE html>
			<html>
				<head>
					<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no\">
					<style>
						html, body {
							padding: 0px;
								margin: 0px;
						}
					</style>
				</head>
				<body>
					<div style=\"text-align: center; margin-top: 5px\">
						<div style=\"display: inline-block; box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
						-webkit-box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
						-moz-box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);\">
						$img
						</div>
					</div>	
					<div style=\"text-align: center; padding-top: 30px;\"><a href=\"javascript:window.close()\">Close</a></div>
				</body>
			</html>";

			return $html;
	
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	function get_template_data($voubatch_id) {
		try {
			try { 
				$id = "mst_voubatch/$voubatch_id";
				$doc = $this->cdb->getAttachment($id, 'filedata'); 
			} catch (\Exception $ex) {
				$doc = null;
			}


			if ($doc!=null) {
				$base64_attachmentdata = $doc->attachmentdata;
				$attachmentdata = explode( ',', $base64_attachmentdata);
				$filedata = base64_decode($attachmentdata[1]);
				return $filedata;
			}			
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	function create_barcode_image($text) {
		try {
			$barcode_data = Code128Barcode::generate($vou_id);	
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};


