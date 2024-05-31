-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_broadcasttype`;


CREATE TABLE IF NOT EXISTS `mst_broadcasttype` (
	`broadcasttype_id` varchar(14) NOT NULL , 
	`broadcasttype_name` varchar(30) NOT NULL , 
	`broadcastmodel_id` varchar(10) NOT NULL , 
	`partner_id` varchar(30)  , 
	`broadcasttype_costpermessage` decimal(12, 0) NOT NULL DEFAULT 0, 
	`broadcasttype_creditpermessage` decimal(12, 0) NOT NULL DEFAULT 0, 
	`cost_accbudget_id` varchar(20)  , 
	`cost_coa_id` varchar(17)  , 
	`process_dept_id` varchar(30) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `broadcasttype_name` (`broadcasttype_name`),
	PRIMARY KEY (`broadcasttype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Broadcast';


ALTER TABLE `mst_broadcasttype` ADD COLUMN IF NOT EXISTS  `broadcasttype_name` varchar(30) NOT NULL  AFTER `broadcasttype_id`;
ALTER TABLE `mst_broadcasttype` ADD COLUMN IF NOT EXISTS  `broadcastmodel_id` varchar(10) NOT NULL  AFTER `broadcasttype_name`;
ALTER TABLE `mst_broadcasttype` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(30)   AFTER `broadcastmodel_id`;
ALTER TABLE `mst_broadcasttype` ADD COLUMN IF NOT EXISTS  `broadcasttype_costpermessage` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `partner_id`;
ALTER TABLE `mst_broadcasttype` ADD COLUMN IF NOT EXISTS  `broadcasttype_creditpermessage` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcasttype_costpermessage`;
ALTER TABLE `mst_broadcasttype` ADD COLUMN IF NOT EXISTS  `cost_accbudget_id` varchar(20)   AFTER `broadcasttype_creditpermessage`;
ALTER TABLE `mst_broadcasttype` ADD COLUMN IF NOT EXISTS  `cost_coa_id` varchar(17)   AFTER `cost_accbudget_id`;
ALTER TABLE `mst_broadcasttype` ADD COLUMN IF NOT EXISTS  `process_dept_id` varchar(30) NOT NULL  AFTER `cost_coa_id`;
ALTER TABLE `mst_broadcasttype` ADD COLUMN IF NOT EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `process_dept_id`;


ALTER TABLE `mst_broadcasttype` MODIFY COLUMN IF EXISTS  `broadcasttype_name` varchar(30) NOT NULL  AFTER `broadcasttype_id`;
ALTER TABLE `mst_broadcasttype` MODIFY COLUMN IF EXISTS  `broadcastmodel_id` varchar(10) NOT NULL  AFTER `broadcasttype_name`;
ALTER TABLE `mst_broadcasttype` MODIFY COLUMN IF EXISTS  `partner_id` varchar(30)   AFTER `broadcastmodel_id`;
ALTER TABLE `mst_broadcasttype` MODIFY COLUMN IF EXISTS  `broadcasttype_costpermessage` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `partner_id`;
ALTER TABLE `mst_broadcasttype` MODIFY COLUMN IF EXISTS  `broadcasttype_creditpermessage` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcasttype_costpermessage`;
ALTER TABLE `mst_broadcasttype` MODIFY COLUMN IF EXISTS  `cost_accbudget_id` varchar(20)   AFTER `broadcasttype_creditpermessage`;
ALTER TABLE `mst_broadcasttype` MODIFY COLUMN IF EXISTS  `cost_coa_id` varchar(17)   AFTER `cost_accbudget_id`;
ALTER TABLE `mst_broadcasttype` MODIFY COLUMN IF EXISTS  `process_dept_id` varchar(30) NOT NULL  AFTER `cost_coa_id`;
ALTER TABLE `mst_broadcasttype` MODIFY COLUMN IF EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `process_dept_id`;


ALTER TABLE `mst_broadcasttype` ADD CONSTRAINT `broadcasttype_name` UNIQUE IF NOT EXISTS  (`broadcasttype_name`);

ALTER TABLE `mst_broadcasttype` ADD KEY IF NOT EXISTS `broadcastmodel_id` (`broadcastmodel_id`);
ALTER TABLE `mst_broadcasttype` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `mst_broadcasttype` ADD KEY IF NOT EXISTS `cost_accbudget_id` (`cost_accbudget_id`);
ALTER TABLE `mst_broadcasttype` ADD KEY IF NOT EXISTS `cost_coa_id` (`cost_coa_id`);
ALTER TABLE `mst_broadcasttype` ADD KEY IF NOT EXISTS `process_dept_id` (`process_dept_id`);
ALTER TABLE `mst_broadcasttype` ADD KEY IF NOT EXISTS `doc_id` (`doc_id`);

ALTER TABLE `mst_broadcasttype` ADD CONSTRAINT `fk_mst_broadcasttype_mst_broadcastmodel` FOREIGN KEY IF NOT EXISTS  (`broadcastmodel_id`) REFERENCES `mst_broadcastmodel` (`broadcastmodel_id`);
ALTER TABLE `mst_broadcasttype` ADD CONSTRAINT `fk_mst_broadcasttype_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `mst_broadcasttype` ADD CONSTRAINT `fk_mst_broadcasttype_mst_accbudget` FOREIGN KEY IF NOT EXISTS  (`cost_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_broadcasttype` ADD CONSTRAINT `fk_mst_broadcasttype_mst_coa` FOREIGN KEY IF NOT EXISTS  (`cost_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_broadcasttype` ADD CONSTRAINT `fk_mst_broadcasttype_mst_dept` FOREIGN KEY IF NOT EXISTS  (`process_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_broadcasttype` ADD CONSTRAINT `fk_mst_broadcasttype_mst_doc` FOREIGN KEY IF NOT EXISTS  (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





