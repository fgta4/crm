<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/couchdbclient.php';
// /* Enable Debugging */
// require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\exceptions\WebException;
// use \FGTA4\debug;
use \FGTA4\CouchDbClient;



/**
 * crm/engage/broadcastmsg/apis/xapi.base.php
 *
 * broadcastmsgBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul broadcastmsg
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 20/01/2022
 */
class broadcastmsgBase extends WebAPI {

	protected $main_tablename = "trn_broadcastmsg";
	protected $main_primarykey = "broadcastmsg_id";
	protected $main_field_version = "broadcastmsg_version";	
	
	protected $field_iscommit = "broadcastmsg_iscommit";
	protected $field_commitby = "broadcastmsg_commitby";
	protected $field_commitdate = "broadcastmsg_commitdate";		
			
	
	protected $fields_isapprovalprogress = "broadcastmsg_isapprovalprogress";			
	protected $field_isapprove = "broadcastmsg_isapproved";
	protected $field_approveby = "broadcastmsg_approveby";
	protected $field_approvedate = "broadcastmsg_approvedate";
	protected $field_isdecline = "broadcastmsg_isdeclined";
	protected $field_declineby = "broadcastmsg_declineby";
	protected $field_declinedate = "broadcastmsg_declinedate";

	protected $approval_tablename = "trn_broadcastmsgappr";
	protected $approval_primarykey = "broadcastmsgappr_id";
	protected $approval_field_approve = "broadcastmsgappr_isapproved";
	protected $approval_field_approveby = "broadcastmsgappr_by";
	protected $approval_field_approvedate = "broadcastmsgappr_date";
	protected $approval_field_decline = "broadcastmsgappr_isdeclined";
	protected $approval_field_declineby = "broadcastmsgappr_declinedby";
	protected $approval_field_declinedate = "broadcastmsgappr_declineddate";
	protected $approval_field_notes = "broadcastmsgappr_notes";
	protected $approval_field_version = "broadcastmsg_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*broadcastmsg*/.txt";
		// debug::disable();
		// debug::start($logfilepath, "w");

		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];		
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);

		$this->cdb = new CouchDbClient((object)DB_CONFIG['FGTAFS']);
	}

	function pre_action_check($data, $action) {
		try {
			return true;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function get_header_row($id) {
		try {
			$sql = "
				select 
				A.*
				from 
				$this->main_tablename A 
				where 
				A.$this->main_primarykey = :id 
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":id" => $id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			if (!count($rows)) { throw new \Exception("Data '$id' tidak ditemukan"); }
			return (object)$rows[0];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}