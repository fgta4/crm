<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . "/core/sequencer.php";

use \FGTA4\utils\Sequencer;


class voubatch_headerHandler extends WebAPI  {


	public function CreateNewId(object $obj) : string {
		$seqname = "VOUBATCH";

		$dt = new \DateTime();	
		$ye = $dt->format("y");
		$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['seqgroup', 'ye', 'mo']);
		$raw = $seq->getraw(['seqgroup'=>'voubatch', 'ye'=>$ye, 'mo'=>0]);
		$id = $raw['ye'] . str_pad($raw['lastnum'], 3, '0', STR_PAD_LEFT);
		return $id;		

	}


	public function sortListOrder(array &$sortData) : void {
		$sortData['voubatch_id'] = 'DESC';
	}


	public function DataListLooping(array &$record) : void {
		
		$voubatch_dtactive = $record['voubatch_dtactive'];
		$voubatch_dtexpired = $record['voubatch_dtexpired'];

		$dtactive = strtotime($voubatch_dtactive);
		$dtexpired = strtotime($voubatch_dtexpired);

		$now = strtotime(date('Y-m-d'));
		if ($now >= $dtactive && $now <= $dtexpired) {
			$record['voubatch_status'] = 'active';
		} else if ($now > $dtexpired) {
			$record['voubatch_status'] = 'expired';
		} else {
			$record['voubatch_status'] = 'pending';
		}

	}


}		
		
		
		