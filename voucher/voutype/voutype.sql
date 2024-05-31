-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_voutype`;


CREATE TABLE IF NOT EXISTS `mst_voutype` (
	`voutype_id` varchar(5) NOT NULL , 
	`voutype_name` varchar(10) NOT NULL , 
	`voutype_descr` varchar(255)  , 
	`voutype_randalocstart` int(2) NOT NULL DEFAULT 10, 
	`voutype_randalocend` int(2) NOT NULL DEFAULT 99, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `voutype_name` (`voutype_name`),
	PRIMARY KEY (`voutype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Type Voucher';


ALTER TABLE `mst_voutype` ADD COLUMN IF NOT EXISTS  `voutype_name` varchar(10) NOT NULL  AFTER `voutype_id`;
ALTER TABLE `mst_voutype` ADD COLUMN IF NOT EXISTS  `voutype_descr` varchar(255)   AFTER `voutype_name`;
ALTER TABLE `mst_voutype` ADD COLUMN IF NOT EXISTS  `voutype_randalocstart` int(2) NOT NULL DEFAULT 10 AFTER `voutype_descr`;
ALTER TABLE `mst_voutype` ADD COLUMN IF NOT EXISTS  `voutype_randalocend` int(2) NOT NULL DEFAULT 99 AFTER `voutype_randalocstart`;


ALTER TABLE `mst_voutype` MODIFY COLUMN IF EXISTS  `voutype_name` varchar(10) NOT NULL  AFTER `voutype_id`;
ALTER TABLE `mst_voutype` MODIFY COLUMN IF EXISTS  `voutype_descr` varchar(255)   AFTER `voutype_name`;
ALTER TABLE `mst_voutype` MODIFY COLUMN IF EXISTS  `voutype_randalocstart` int(2) NOT NULL DEFAULT 10 AFTER `voutype_descr`;
ALTER TABLE `mst_voutype` MODIFY COLUMN IF EXISTS  `voutype_randalocend` int(2) NOT NULL DEFAULT 99 AFTER `voutype_randalocstart`;


ALTER TABLE `mst_voutype` ADD CONSTRAINT `voutype_name` UNIQUE IF NOT EXISTS  (`voutype_name`);







