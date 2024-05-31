<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

if (is_file(__DIR__ .'/voumailer.php-handler.php')) {
	require_once __DIR__ .'/voumailer.php-handler.php';
}

/**
 * crm/voucher/voumailer/voumailer.php
 *
 * ===================================================================
 * Entry point Program Module voumailer
 * ===================================================================
 * Program yang akan pertama kali diakses 
 * oleh semua request untuk menampilkan modul 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/01/2023
 */
$MODULE = new class extends WebModule {

	public function LoadPage() {
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\module\\voumailer_pageHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new voumailer_pageHandler();
			$hnd->caller = &$this;
			$hnd->auth = $this->auth;
			$hnd->userdata = $userdata;
		} else {
			$hnd = new \stdClass;
		}


		try {

			// parameter=parameter yang bisa diakses langsung dari javascript module
			// dengan memanggil variable global.setup.<namavariable>
			$this->setup = (object)array(
				'print_to_new_window' => false,
				'username' => $userdata->username,
			);

			$variancename = $_GET['variancename'];
			switch ($variancename) {
				default:
					break;
			} 

			if (is_object($hnd)) {
				$hnd->setup = &$this->setup;
				if (method_exists(get_class($hnd), 'LoadPage')) {
					$hnd->LoadPage();
				}
			}

		} catch (\Exception $ex) {
			$this->error($ex->getMessage());
		}			
	
	}


};
