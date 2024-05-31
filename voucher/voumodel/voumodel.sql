-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_voumodel`;


CREATE TABLE IF NOT EXISTS `mst_voumodel` (
	`voumodel_id` varchar(10) NOT NULL , 
	`voumodel_name` varchar(30) NOT NULL , 
	`voumodel_descr` varchar(255)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `voumodel_name` (`voumodel_name`),
	PRIMARY KEY (`voumodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Voucher';


ALTER TABLE `mst_voumodel` ADD COLUMN IF NOT EXISTS  `voumodel_name` varchar(30) NOT NULL  AFTER `voumodel_id`;
ALTER TABLE `mst_voumodel` ADD COLUMN IF NOT EXISTS  `voumodel_descr` varchar(255)   AFTER `voumodel_name`;


ALTER TABLE `mst_voumodel` MODIFY COLUMN IF EXISTS  `voumodel_name` varchar(30) NOT NULL  AFTER `voumodel_id`;
ALTER TABLE `mst_voumodel` MODIFY COLUMN IF EXISTS  `voumodel_descr` varchar(255)   AFTER `voumodel_name`;


ALTER TABLE `mst_voumodel` ADD CONSTRAINT `voumodel_name` UNIQUE IF NOT EXISTS  (`voumodel_name`);







