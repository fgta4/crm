-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_broadcastquota`;


CREATE TABLE IF NOT EXISTS `mst_broadcastquota` (
	`broadcastquota_id` varchar(14) NOT NULL , 
	`broadcasttype_id` varchar(14) NOT NULL , 
	`broadcastquota_name` varchar(30) NOT NULL , 
	`broadcastquota_saldovalue` decimal(12, 0) NOT NULL DEFAULT 0, 
	`broadcastquota_saldocredit` decimal(12, 0) NOT NULL DEFAULT 0, 
	`prepaid_accbudget_id` varchar(20)  , 
	`prepaid_coa_id` varchar(17)  , 
	`broadcastmodel_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `broadcastquota_name` (`broadcastquota_name`),
	PRIMARY KEY (`broadcastquota_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Quota Broadcast';


ALTER TABLE `mst_broadcastquota` ADD COLUMN IF NOT EXISTS  `broadcasttype_id` varchar(14) NOT NULL  AFTER `broadcastquota_id`;
ALTER TABLE `mst_broadcastquota` ADD COLUMN IF NOT EXISTS  `broadcastquota_name` varchar(30) NOT NULL  AFTER `broadcasttype_id`;
ALTER TABLE `mst_broadcastquota` ADD COLUMN IF NOT EXISTS  `broadcastquota_saldovalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastquota_name`;
ALTER TABLE `mst_broadcastquota` ADD COLUMN IF NOT EXISTS  `broadcastquota_saldocredit` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastquota_saldovalue`;
ALTER TABLE `mst_broadcastquota` ADD COLUMN IF NOT EXISTS  `prepaid_accbudget_id` varchar(20)   AFTER `broadcastquota_saldocredit`;
ALTER TABLE `mst_broadcastquota` ADD COLUMN IF NOT EXISTS  `prepaid_coa_id` varchar(17)   AFTER `prepaid_accbudget_id`;
ALTER TABLE `mst_broadcastquota` ADD COLUMN IF NOT EXISTS  `broadcastmodel_id` varchar(10) NOT NULL  AFTER `prepaid_coa_id`;


ALTER TABLE `mst_broadcastquota` MODIFY COLUMN IF EXISTS  `broadcasttype_id` varchar(14) NOT NULL  AFTER `broadcastquota_id`;
ALTER TABLE `mst_broadcastquota` MODIFY COLUMN IF EXISTS  `broadcastquota_name` varchar(30) NOT NULL  AFTER `broadcasttype_id`;
ALTER TABLE `mst_broadcastquota` MODIFY COLUMN IF EXISTS  `broadcastquota_saldovalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastquota_name`;
ALTER TABLE `mst_broadcastquota` MODIFY COLUMN IF EXISTS  `broadcastquota_saldocredit` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastquota_saldovalue`;
ALTER TABLE `mst_broadcastquota` MODIFY COLUMN IF EXISTS  `prepaid_accbudget_id` varchar(20)   AFTER `broadcastquota_saldocredit`;
ALTER TABLE `mst_broadcastquota` MODIFY COLUMN IF EXISTS  `prepaid_coa_id` varchar(17)   AFTER `prepaid_accbudget_id`;
ALTER TABLE `mst_broadcastquota` MODIFY COLUMN IF EXISTS  `broadcastmodel_id` varchar(10) NOT NULL  AFTER `prepaid_coa_id`;


ALTER TABLE `mst_broadcastquota` ADD CONSTRAINT `broadcastquota_name` UNIQUE IF NOT EXISTS  (`broadcastquota_name`);

ALTER TABLE `mst_broadcastquota` ADD KEY IF NOT EXISTS `broadcasttype_id` (`broadcasttype_id`);
ALTER TABLE `mst_broadcastquota` ADD KEY IF NOT EXISTS `prepaid_accbudget_id` (`prepaid_accbudget_id`);
ALTER TABLE `mst_broadcastquota` ADD KEY IF NOT EXISTS `prepaid_coa_id` (`prepaid_coa_id`);
ALTER TABLE `mst_broadcastquota` ADD KEY IF NOT EXISTS `broadcastmodel_id` (`broadcastmodel_id`);

ALTER TABLE `mst_broadcastquota` ADD CONSTRAINT `fk_mst_broadcastquota_mst_broadcasttype` FOREIGN KEY IF NOT EXISTS  (`broadcasttype_id`) REFERENCES `mst_broadcasttype` (`broadcasttype_id`);
ALTER TABLE `mst_broadcastquota` ADD CONSTRAINT `fk_mst_broadcastquota_mst_accbudget` FOREIGN KEY IF NOT EXISTS  (`prepaid_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_broadcastquota` ADD CONSTRAINT `fk_mst_broadcastquota_mst_coa` FOREIGN KEY IF NOT EXISTS  (`prepaid_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_broadcastquota` ADD CONSTRAINT `fk_mst_broadcastquota_mst_broadcastmodel` FOREIGN KEY IF NOT EXISTS  (`broadcastmodel_id`) REFERENCES `mst_broadcastmodel` (`broadcastmodel_id`);





