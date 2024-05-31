<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';




use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;


$API = new class extends custBase {
	
	public function execute($data) {

		try {

			$userdata = $this->auth->session_get_user();

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();


			$currentdata = null;

			try {

				$sqlcek = "
					select * from mst_custcontact where custcontact_data = :customerdata
				";
				$stmt_cek = $this->db->prepare($sqlcek);

				$i = 0;
				$this->log('uploaded');
				foreach ($data as $row) {
					$i++;
					$number = trim($row->i);
					$name =  trim($row->n);

					if ($number == '+628111023104') {
						$name = utf8_decode(iconv(mb_detect_encoding($name, mb_detect_order(), true), "UTF-8", $name));
					}

					$currentdata = "$i $number [$name]";

					if (\substr($number, 0, 3)=='+62') {
						$number = '0' . \substr($number, 3, (strlen($number)-3));
					}
				
					$stmt_cek->execute([':customerdata'=>$number]);
					$custcontact = $stmt_cek->fetch(\PDO::FETCH_ASSOC);
					if ($custcontact==null) {
						// mst_cust
						$obj = new \stdClass;
						$obj->cust_id = $this->NewId([]);
						$obj->cust_name = $name;
						$obj->cust_mainphonenumber = $number;
						$obj->_createby = $userdata->username;
						$obj->_createdate = date("Y-m-d H:i:s");
						$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_cust", $obj);
						$stmt = $this->db->prepare($cmd->sql);
						$stmt->execute($cmd->params);

						//mst_custcontact
						$objcontact = new \stdClass;
						$objcontact->custcontact_id = \uniqid();
						$objcontact->custcontact_data = $number;
						$objcontact->custcontact_iswhatsapp = 1;
						$objcontact->cust_id = $obj->cust_id;
						$objcontact->_createby = $userdata->username;
						$objcontact->_createdate = date("Y-m-d H:i:s");
						$cmdcontact = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_custcontact", $objcontact);
						$stmtcontact = $this->db->prepare($cmdcontact->sql);
						$stmtcontact->execute($cmdcontact->params);
					}

				}

				$result = (object)[
					'success' => true
				];

				$this->db->commit();
				return $result;
			} catch (\Exception $ex) {
				$this->log($currentdata);
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
		return uniqid();
	}

};