-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_mediaposttype`;


CREATE TABLE IF NOT EXISTS `mst_mediaposttype` (
	`mediaposttype_id` varchar(10) NOT NULL , 
	`mediaposttype_name` varchar(50) NOT NULL , 
	`mediaposttype_iskol` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `mediaposttype_name` (`mediaposttype_name`),
	PRIMARY KEY (`mediaposttype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Post Media';


ALTER TABLE `mst_mediaposttype` ADD COLUMN IF NOT EXISTS  `mediaposttype_name` varchar(50) NOT NULL  AFTER `mediaposttype_id`;
ALTER TABLE `mst_mediaposttype` ADD COLUMN IF NOT EXISTS  `mediaposttype_iskol` tinyint(1) NOT NULL DEFAULT 0 AFTER `mediaposttype_name`;


ALTER TABLE `mst_mediaposttype` MODIFY COLUMN IF EXISTS  `mediaposttype_name` varchar(50) NOT NULL   AFTER `mediaposttype_id`;
ALTER TABLE `mst_mediaposttype` MODIFY COLUMN IF EXISTS  `mediaposttype_iskol` tinyint(1) NOT NULL DEFAULT 0  AFTER `mediaposttype_name`;


ALTER TABLE `mst_mediaposttype` ADD CONSTRAINT `mediaposttype_name` UNIQUE IF NOT EXISTS  (`mediaposttype_name`);




INSERT INTO mst_mediaposttype (`mediaposttype_id`, `mediaposttype_name`, `mediaposttype_iskol`, `_createby`, `_createdate`) VALUES ('IGP', 'INSTAGRAM-POST', '1', 'root', NOW());
INSERT INTO mst_mediaposttype (`mediaposttype_id`, `mediaposttype_name`, `mediaposttype_iskol`, `_createby`, `_createdate`) VALUES ('IGR', 'INSTAGRAM-REELS', '1', 'root', NOW());
INSERT INTO mst_mediaposttype (`mediaposttype_id`, `mediaposttype_name`, `mediaposttype_iskol`, `_createby`, `_createdate`) VALUES ('IGS', 'INSTAGRAM-STORY', '1', 'root', NOW());
INSERT INTO mst_mediaposttype (`mediaposttype_id`, `mediaposttype_name`, `mediaposttype_iskol`, `_createby`, `_createdate`) VALUES ('FBP', 'FACEBOOK-POST', '1', 'root', NOW());
INSERT INTO mst_mediaposttype (`mediaposttype_id`, `mediaposttype_name`, `mediaposttype_iskol`, `_createby`, `_createdate`) VALUES ('EDI', 'EDITORIAL', '0', 'root', NOW());



