-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_voureq`;


CREATE TABLE IF NOT EXISTS `mst_voureq` (
	`voureq_id` varchar(14)  , 
	`voureq_room` varchar(30)  , 
	`voureq_phone` varchar(30)  , 
	`voureq_message` varchar(2000)  , 
	`voureq_isvougenerate` tinyint(1) NOT NULL DEFAULT 0, 
	`voureq_result` varchar(255)  , 
	`vou_id` varchar(30)  , 
	`site_id` varchar(30)  , 
	`voureq_info` varchar(2000)  , 
	`voureq_isresend` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`voureq_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Request Voucher';


ALTER TABLE `mst_voureq` ADD COLUMN IF NOT EXISTS  `voureq_room` varchar(30)   AFTER `voureq_id`;
ALTER TABLE `mst_voureq` ADD COLUMN IF NOT EXISTS  `voureq_phone` varchar(30)   AFTER `voureq_room`;
ALTER TABLE `mst_voureq` ADD COLUMN IF NOT EXISTS  `voureq_message` varchar(2000)   AFTER `voureq_phone`;
ALTER TABLE `mst_voureq` ADD COLUMN IF NOT EXISTS  `voureq_isvougenerate` tinyint(1) NOT NULL DEFAULT 0 AFTER `voureq_message`;
ALTER TABLE `mst_voureq` ADD COLUMN IF NOT EXISTS  `voureq_result` varchar(255)   AFTER `voureq_isvougenerate`;
ALTER TABLE `mst_voureq` ADD COLUMN IF NOT EXISTS  `vou_id` varchar(30)   AFTER `voureq_result`;
ALTER TABLE `mst_voureq` ADD COLUMN IF NOT EXISTS  `site_id` varchar(30)   AFTER `vou_id`;
ALTER TABLE `mst_voureq` ADD COLUMN IF NOT EXISTS  `voureq_info` varchar(2000)   AFTER `site_id`;
ALTER TABLE `mst_voureq` ADD COLUMN IF NOT EXISTS  `voureq_isresend` tinyint(1) NOT NULL DEFAULT 0 AFTER `voureq_info`;


ALTER TABLE `mst_voureq` MODIFY COLUMN IF EXISTS  `voureq_room` varchar(30)    AFTER `voureq_id`;
ALTER TABLE `mst_voureq` MODIFY COLUMN IF EXISTS  `voureq_phone` varchar(30)    AFTER `voureq_room`;
ALTER TABLE `mst_voureq` MODIFY COLUMN IF EXISTS  `voureq_message` varchar(2000)    AFTER `voureq_phone`;
ALTER TABLE `mst_voureq` MODIFY COLUMN IF EXISTS  `voureq_isvougenerate` tinyint(1) NOT NULL DEFAULT 0  AFTER `voureq_message`;
ALTER TABLE `mst_voureq` MODIFY COLUMN IF EXISTS  `voureq_result` varchar(255)    AFTER `voureq_isvougenerate`;
ALTER TABLE `mst_voureq` MODIFY COLUMN IF EXISTS  `vou_id` varchar(30)    AFTER `voureq_result`;
ALTER TABLE `mst_voureq` MODIFY COLUMN IF EXISTS  `site_id` varchar(30)    AFTER `vou_id`;
ALTER TABLE `mst_voureq` MODIFY COLUMN IF EXISTS  `voureq_info` varchar(2000)    AFTER `site_id`;
ALTER TABLE `mst_voureq` MODIFY COLUMN IF EXISTS  `voureq_isresend` tinyint(1) NOT NULL DEFAULT 0  AFTER `voureq_info`;









