-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_custwa`;
-- drop table if exists `mst_custwalinkreq`;


CREATE TABLE IF NOT EXISTS `mst_custwa` (
	`custwa_id` varchar(16) NOT NULL , 
	`custwa_name` varchar(60) NOT NULL , 
	`custwa_gender` varchar(1)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`custwa_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Customer Whatsapp';


ALTER TABLE `mst_custwa` ADD COLUMN IF NOT EXISTS  `custwa_name` varchar(60) NOT NULL  AFTER `custwa_id`;
ALTER TABLE `mst_custwa` ADD COLUMN IF NOT EXISTS  `custwa_gender` varchar(1)   AFTER `custwa_name`;


ALTER TABLE `mst_custwa` MODIFY COLUMN IF EXISTS  `custwa_name` varchar(60) NOT NULL   AFTER `custwa_id`;
ALTER TABLE `mst_custwa` MODIFY COLUMN IF EXISTS  `custwa_gender` varchar(1)    AFTER `custwa_name`;









CREATE TABLE IF NOT EXISTS `mst_custwalinkreq` (
	`custwalinkreq_id` varchar(32) NOT NULL , 
	`intent` varchar(128) NOT NULL , 
	`room_id` varchar(32) NOT NULL , 
	`message` varchar(1024) NOT NULL , 
	`data` varchar(2048) NOT NULL , 
	`custwa_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`custwalinkreq_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Contact Customer';


ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `intent` varchar(128) NOT NULL  AFTER `custwalinkreq_id`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `room_id` varchar(32) NOT NULL  AFTER `intent`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `message` varchar(1024) NOT NULL  AFTER `room_id`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `data` varchar(2048) NOT NULL  AFTER `message`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `custwa_id` varchar(14) NOT NULL  AFTER `data`;


ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `intent` varchar(128) NOT NULL   AFTER `custwalinkreq_id`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `room_id` varchar(32) NOT NULL   AFTER `intent`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `message` varchar(1024) NOT NULL   AFTER `room_id`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `data` varchar(2048) NOT NULL   AFTER `message`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `custwa_id` varchar(14) NOT NULL   AFTER `data`;



ALTER TABLE `mst_custwalinkreq` ADD KEY IF NOT EXISTS `custwa_id` (`custwa_id`);

ALTER TABLE `mst_custwalinkreq` ADD CONSTRAINT `fk_mst_custwalinkreq_mst_custwa` FOREIGN KEY IF NOT EXISTS (`custwa_id`) REFERENCES `mst_custwa` (`custwa_id`);





