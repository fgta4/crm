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
 * crm/engage/broadcastmsg/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header broadcastmsg (trn_broadcastmsg)
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
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.broadcastmsg_id LIKE CONCAT('%', :search, '%') OR A.broadcastmsg_descr LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_broadcastmsg A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.broadcastmsg_id, A.broadcasttype_id, A.broadcastmsg_dtstart, A.broadcastmsg_descr, A.broadcastmsg_template, A.broadcastmsg_file, A.user_dept_id, A.unit_id, A.project_id, A.projecttask_id, A.projbudget_id, A.projbudgettask_id, A.broadcastmsg_isunbudgetted, A.broadcasttype_costpermessage, A.broadcasttype_creditpermessage, A.broadcastmsg_custcount, A.broadcastmsg_rejectcount, A.broadcastmsg_sendcount, A.broadcastmsg_totalcost, A.broadcastmsg_totalcredit, A.broadcastquota_id, A.partner_id, A.empl_id, A.broadcastmsg_custcountdelv, A.broadcastmsg_delvpercent, A.cost_accbudget_id, A.cost_coa_id, A.prepaid_accbudget_id, A.prepaid_coa_id, A.broadcastmodel_id, A.process_dept_id, A.doc_id, A.broadcastmsg_version, A.broadcastmsg_iscommit, A.broadcastmsg_commitby, A.broadcastmsg_commitdate, A.broadcastmsg_isapprovalprogress, A.broadcastmsg_isapproved, A.broadcastmsg_approveby, A.broadcastmsg_approvedate, A.broadcastmsg_isdeclined, A.broadcastmsg_declineby, A.broadcastmsg_declinedate, A.broadcastmsg_isexecute, A.broadcastmsg_executeby, A.broadcastmsg_executedate, A._createby, A._createdate, A._modifyby, A._modifydate 
				from trn_broadcastmsg A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$beforeloopdata = new \stdClass;
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataListBeforeLoop')) {
					$beforeloopdata = $hnd->DataListBeforeLoop((object[]));
				}
			}

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataListLooping')) {
						$hnd->DataListLooping($record, $beforeloopdata);
					}
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
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