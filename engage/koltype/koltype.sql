-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_koltype`;


CREATE TABLE IF NOT EXISTS `mst_koltype` (
	`koltype_id` varchar(10) NOT NULL , 
	`koltype_name` varchar(50) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `koltype_name` (`koltype_name`),
	PRIMARY KEY (`koltype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Post Media';


ALTER TABLE `mst_koltype` ADD COLUMN IF NOT EXISTS  `koltype_name` varchar(50) NOT NULL  AFTER `koltype_id`;


ALTER TABLE `mst_koltype` MODIFY COLUMN IF EXISTS  `koltype_name` varchar(50) NOT NULL   AFTER `koltype_id`;


ALTER TABLE `mst_koltype` ADD CONSTRAINT `koltype_name` UNIQUE IF NOT EXISTS  (`koltype_name`);




INSERT INTO mst_koltype (`koltype_id`, `koltype_name`, `_createby`, `_createdate`) VALUES ('CEL', 'CELEBRITY', 'root', NOW());
INSERT INTO mst_koltype (`koltype_id`, `koltype_name`, `_createby`, `_createdate`) VALUES ('INF', 'INFLUENCER', 'root', NOW());
INSERT INTO mst_koltype (`koltype_id`, `koltype_name`, `_createby`, `_createdate`) VALUES ('MOD', 'MODEL', 'root', NOW());
INSERT INTO mst_koltype (`koltype_id`, `koltype_name`, `_createby`, `_createdate`) VALUES ('SIN', 'SINGER', 'root', NOW());
INSERT INTO mst_koltype (`koltype_id`, `koltype_name`, `_createby`, `_createdate`) VALUES ('DJO', 'DJ', 'root', NOW());



