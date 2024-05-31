<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';




use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;


$API = new class extends broadcastmsgBase {
	
	public function execute($id, $data) {

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


				// cek ke mst_cust
				$sqlcek = "
					select 
					B.cust_isdisabled, B.cust_isrecvoffer, B.cust_reasonrejectoffer
					from mst_custcontact A inner join mst_cust B on B.cust_id=A.cust_id
					where
					A.custcontact_data = :custcontact_data
				";
				$stmt_cek = $this->db->prepare($sqlcek);



				$i = 0;
				$this->log('uploaded');
				foreach ($data as $row) {
					$this->log($row);
					$custcontact_data = $row->i;
					$custcontact_name = $row->n;
					

					$obj = new \stdClass;
					$obj->broadcastmsgcust_id = \uniqid();
					$obj->broadcastmsgcust_name = $custcontact_name;
					$obj->broadcastmsgcust_data = $custcontact_data;
					$obj->broadcastmsgcust_isrecvoffer = 1;
					$obj->broadcastmsg_id = $id;
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");


					$number_to_check = $custcontact_data;
					if (\substr($custcontact_data, 0, 3)=='+62') {
						$number_to_check = '0' . \substr($number_to_check, 3, (strlen($number_to_check)-3));
					}

					$stmt_cek->execute([':custcontact_data'=>$number_to_check]);
					$row  = $stmt_cek->fetch(\PDO::FETCH_ASSOC);	
					if ($row!=null) {
						$obj->broadcastmsgcust_isnew = 0;
						if ($row['cust_isrecvoffer']=='0') {
							$obj->broadcastmsgcust_isrecvoffer = 0;
							$obj->broadcastmsgcust_reasonrejectoffer = $row['cust_reasonrejectoffer'];
						} else if ($row['cust_isdisabled']=='1') {
							$obj->broadcastmsgcust_isrecvoffer = 0;
							$obj->broadcastmsgcust_reasonrejectoffer = 'inactive/disabled';		
						}
					} else {
						$obj->broadcastmsgcust_isnew = 1;
					}

					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_broadcastmsgcust', $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);

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