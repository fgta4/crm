-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_broadcastmodel`;


CREATE TABLE IF NOT EXISTS `mst_broadcastmodel` (
	`broadcastmodel_id` varchar(10) NOT NULL , 
	`broadcastmodel_name` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `broadcastmodel_name` (`broadcastmodel_name`),
	PRIMARY KEY (`broadcastmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Broadcast';


ALTER TABLE `mst_broadcastmodel` ADD COLUMN IF NOT EXISTS  `broadcastmodel_name` varchar(30) NOT NULL  AFTER `broadcastmodel_id`;


ALTER TABLE `mst_broadcastmodel` MODIFY COLUMN IF EXISTS  `broadcastmodel_name` varchar(30) NOT NULL  AFTER `broadcastmodel_id`;


ALTER TABLE `mst_broadcastmodel` ADD CONSTRAINT `broadcastmodel_name` UNIQUE IF NOT EXISTS  (`broadcastmodel_name`);




INSERT INTO mst_broadcastmodel (`broadcastmodel_id`, `broadcastmodel_name`, `_createby`, `_createdate`) VALUES ('WA', 'WHATSAPP', 'root', NOW());
INSERT INTO mst_broadcastmodel (`broadcastmodel_id`, `broadcastmodel_name`, `_createby`, `_createdate`) VALUES ('EM', 'EMAIL', 'root', NOW());
INSERT INTO mst_broadcastmodel (`broadcastmodel_id`, `broadcastmodel_name`, `_createby`, `_createdate`) VALUES ('SM', 'SMS', 'root', NOW());



