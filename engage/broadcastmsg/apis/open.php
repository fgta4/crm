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
 * crm/engage/broadcastmsg/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header broadcastmsg (trn_broadcastmsg)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 20/01/2022
 */
$API = new class extends broadcastmsgBase {
	
	public function execute($options) {
		$tablename = 'trn_broadcastmsg';
		$primarykey = 'broadcastmsg_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\broadcastmsg_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new broadcastmsg_headerHandler($data, $options);
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
					"broadcastmsg_id" => " broadcastmsg_id = :broadcastmsg_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_broadcastmsg A', [
				'broadcastmsg_id', 'broadcasttype_id', 'broadcastmsg_dtstart', 'broadcastmsg_descr', 'broadcastmsg_template', 'broadcastmsg_file', 'user_dept_id', 'unit_id', 'project_id', 'projecttask_id', 'projbudget_id', 'projbudgettask_id', 'broadcastmsg_isunbudgetted', 'broadcasttype_costpermessage', 'broadcasttype_creditpermessage', 'broadcastmsg_custcount', 'broadcastmsg_rejectcount', 'broadcastmsg_sendcount', 'broadcastmsg_totalcost', 'broadcastmsg_totalcredit', 'broadcastquota_id', 'partner_id', 'empl_id', 'broadcastmsg_custcountdelv', 'broadcastmsg_delvpercent', 'cost_accbudget_id', 'cost_coa_id', 'prepaid_accbudget_id', 'prepaid_coa_id', 'broadcastmodel_id', 'process_dept_id', 'doc_id', 'broadcastmsg_version', 'broadcastmsg_iscommit', 'broadcastmsg_commitby', 'broadcastmsg_commitdate', 'broadcastmsg_isapprovalprogress', 'broadcastmsg_isapproved', 'broadcastmsg_approveby', 'broadcastmsg_approvedate', 'broadcastmsg_isdeclined', 'broadcastmsg_declineby', 'broadcastmsg_declinedate', 'broadcastmsg_isexecute', 'broadcastmsg_executeby', 'broadcastmsg_executedate', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}


			$approverow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_approveby"=>$userdata->username, "$this->approval_field_approve"=>'1'], $this->db, $this->approval_tablename);
			$declinerow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_declineby"=>$userdata->username, "$this->approval_field_decline"=>'1'], $this->db, "$this->approval_tablename");
			

			$result->record = array_merge($record, [
				'broadcastmsg_dtstart' => date("d/m/Y", strtotime($record['broadcastmsg_dtstart'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'broadcasttype_name' => \FGTA4\utils\SqlUtility::Lookup($record['broadcasttype_id'], $this->db, 'mst_broadcasttype', 'broadcasttype_id', 'broadcasttype_name'),
				'user_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
				'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
				'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projecttask_id'], $this->db, 'mst_projecttask', 'projecttask_id', 'projecttask_name'),
				'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
				'projbudgettask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgettask_id'], $this->db, 'mst_projbudgettask', 'projbudgettask_id', 'projecttask_notes'),
				'broadcastquota_name' => \FGTA4\utils\SqlUtility::Lookup($record['broadcastquota_id'], $this->db, 'mst_broadcastquota', 'broadcastquota_id', 'broadcastquota_name'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				'cost_accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['cost_accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
				'cost_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['cost_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'prepaid_accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['prepaid_accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
				'prepaid_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['prepaid_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'broadcastmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['broadcastmodel_id'], $this->db, 'mst_broadcastmodel', 'broadcastmodel_id', 'broadcastmodel_name'),
				'process_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['process_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'broadcastmsg_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['broadcastmsg_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'broadcastmsg_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['broadcastmsg_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'broadcastmsg_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['broadcastmsg_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'broadcastmsg_executeby' => \FGTA4\utils\SqlUtility::Lookup($record['broadcastmsg_executeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),


				'pros_isuseralreadyapproved' => $approverow!=null ? '1' : '0',
				'pros_isuseralreadydeclined' => $declinerow!=null ? '1' : '0',
			
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

				try { $result->record['broadcastmsg_file_doc'] = $this->cdb->getAttachment($result->record[$primarykey], 'filedata'); } catch (\Exception $ex) {}
			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};