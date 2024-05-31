-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_voumailer`;
-- drop table if exists `mst_voumaileritem`;
-- drop table if exists `mst_voumaileremail`;
-- drop table if exists `mst_voumailerque`;


CREATE TABLE IF NOT EXISTS `mst_voumailer` (
	`voumailer_id` varchar(14) NOT NULL , 
	`voumailer_dt` date NOT NULL , 
	`voumailer_descr` varchar(255)  , 
	`voumailer_subject` varchar(60)  , 
	`voumailer_body` varchar(2600)  , 
	`voumailer_isprepared` tinyint(1) NOT NULL DEFAULT 0, 
	`voumailer_ismailed` tinyint(1) NOT NULL DEFAULT 0, 
	`voumailer_version` int(4) NOT NULL DEFAULT 0, 
	`voumailer_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`voumailer_commitby` varchar(14)  , 
	`voumailer_commitdate` datetime  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`voumailer_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Batch Voucher';


ALTER TABLE `mst_voumailer` ADD COLUMN IF NOT EXISTS  `voumailer_dt` date NOT NULL  AFTER `voumailer_id`;
ALTER TABLE `mst_voumailer` ADD COLUMN IF NOT EXISTS  `voumailer_descr` varchar(255)   AFTER `voumailer_dt`;
ALTER TABLE `mst_voumailer` ADD COLUMN IF NOT EXISTS  `voumailer_subject` varchar(60)   AFTER `voumailer_descr`;
ALTER TABLE `mst_voumailer` ADD COLUMN IF NOT EXISTS  `voumailer_body` varchar(2600)   AFTER `voumailer_subject`;
ALTER TABLE `mst_voumailer` ADD COLUMN IF NOT EXISTS  `voumailer_isprepared` tinyint(1) NOT NULL DEFAULT 0 AFTER `voumailer_body`;
ALTER TABLE `mst_voumailer` ADD COLUMN IF NOT EXISTS  `voumailer_ismailed` tinyint(1) NOT NULL DEFAULT 0 AFTER `voumailer_isprepared`;
ALTER TABLE `mst_voumailer` ADD COLUMN IF NOT EXISTS  `voumailer_version` int(4) NOT NULL DEFAULT 0 AFTER `voumailer_ismailed`;
ALTER TABLE `mst_voumailer` ADD COLUMN IF NOT EXISTS  `voumailer_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `voumailer_version`;
ALTER TABLE `mst_voumailer` ADD COLUMN IF NOT EXISTS  `voumailer_commitby` varchar(14)   AFTER `voumailer_iscommit`;
ALTER TABLE `mst_voumailer` ADD COLUMN IF NOT EXISTS  `voumailer_commitdate` datetime   AFTER `voumailer_commitby`;


ALTER TABLE `mst_voumailer` MODIFY COLUMN IF EXISTS  `voumailer_dt` date NOT NULL  AFTER `voumailer_id`;
ALTER TABLE `mst_voumailer` MODIFY COLUMN IF EXISTS  `voumailer_descr` varchar(255)   AFTER `voumailer_dt`;
ALTER TABLE `mst_voumailer` MODIFY COLUMN IF EXISTS  `voumailer_subject` varchar(60)   AFTER `voumailer_descr`;
ALTER TABLE `mst_voumailer` MODIFY COLUMN IF EXISTS  `voumailer_body` varchar(2600)   AFTER `voumailer_subject`;
ALTER TABLE `mst_voumailer` MODIFY COLUMN IF EXISTS  `voumailer_isprepared` tinyint(1) NOT NULL DEFAULT 0 AFTER `voumailer_body`;
ALTER TABLE `mst_voumailer` MODIFY COLUMN IF EXISTS  `voumailer_ismailed` tinyint(1) NOT NULL DEFAULT 0 AFTER `voumailer_isprepared`;
ALTER TABLE `mst_voumailer` MODIFY COLUMN IF EXISTS  `voumailer_version` int(4) NOT NULL DEFAULT 0 AFTER `voumailer_ismailed`;
ALTER TABLE `mst_voumailer` MODIFY COLUMN IF EXISTS  `voumailer_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `voumailer_version`;
ALTER TABLE `mst_voumailer` MODIFY COLUMN IF EXISTS  `voumailer_commitby` varchar(14)   AFTER `voumailer_iscommit`;
ALTER TABLE `mst_voumailer` MODIFY COLUMN IF EXISTS  `voumailer_commitdate` datetime   AFTER `voumailer_commitby`;









CREATE TABLE IF NOT EXISTS `mst_voumaileritem` (
	`voumaileritem_id` varchar(14) NOT NULL , 
	`voumailer_subject` varchar(60)  , 
	`voumailer_body` varchar(2600)  , 
	`voubatch_id` varchar(5)  , 
	`voumaileritem_qty` int(4) NOT NULL DEFAULT 0, 
	`voumailer_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`voumaileritem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Voucher';


ALTER TABLE `mst_voumaileritem` ADD COLUMN IF NOT EXISTS  `voumailer_subject` varchar(60)   AFTER `voumaileritem_id`;
ALTER TABLE `mst_voumaileritem` ADD COLUMN IF NOT EXISTS  `voumailer_body` varchar(2600)   AFTER `voumailer_subject`;
ALTER TABLE `mst_voumaileritem` ADD COLUMN IF NOT EXISTS  `voubatch_id` varchar(5)   AFTER `voumailer_body`;
ALTER TABLE `mst_voumaileritem` ADD COLUMN IF NOT EXISTS  `voumaileritem_qty` int(4) NOT NULL DEFAULT 0 AFTER `voubatch_id`;
ALTER TABLE `mst_voumaileritem` ADD COLUMN IF NOT EXISTS  `voumailer_id` varchar(14) NOT NULL  AFTER `voumaileritem_qty`;


ALTER TABLE `mst_voumaileritem` MODIFY COLUMN IF EXISTS  `voumailer_subject` varchar(60)   AFTER `voumaileritem_id`;
ALTER TABLE `mst_voumaileritem` MODIFY COLUMN IF EXISTS  `voumailer_body` varchar(2600)   AFTER `voumailer_subject`;
ALTER TABLE `mst_voumaileritem` MODIFY COLUMN IF EXISTS  `voubatch_id` varchar(5)   AFTER `voumailer_body`;
ALTER TABLE `mst_voumaileritem` MODIFY COLUMN IF EXISTS  `voumaileritem_qty` int(4) NOT NULL DEFAULT 0 AFTER `voubatch_id`;
ALTER TABLE `mst_voumaileritem` MODIFY COLUMN IF EXISTS  `voumailer_id` varchar(14) NOT NULL  AFTER `voumaileritem_qty`;



ALTER TABLE `mst_voumaileritem` ADD KEY IF NOT EXISTS `voubatch_id` (`voubatch_id`);
ALTER TABLE `mst_voumaileritem` ADD KEY IF NOT EXISTS `voumailer_id` (`voumailer_id`);

ALTER TABLE `mst_voumaileritem` ADD CONSTRAINT `fk_mst_voumaileritem_mst_voubatch` FOREIGN KEY IF NOT EXISTS  (`voubatch_id`) REFERENCES `mst_voubatch` (`voubatch_id`);
ALTER TABLE `mst_voumaileritem` ADD CONSTRAINT `fk_mst_voumaileritem_mst_voumailer` FOREIGN KEY IF NOT EXISTS (`voumailer_id`) REFERENCES `mst_voumailer` (`voumailer_id`);





CREATE TABLE IF NOT EXISTS `mst_voumaileremail` (
	`voumaileremail_id` varchar(14) NOT NULL , 
	`voumaileremail_email` varchar(60)  , 
	`voumaileremail_nama` varchar(60)  , 
	`voumailer_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `voumaileremail_email` (`voumailer_id`, `voumaileremail_email`),
	PRIMARY KEY (`voumaileremail_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Voucher';


ALTER TABLE `mst_voumaileremail` ADD COLUMN IF NOT EXISTS  `voumaileremail_email` varchar(60)   AFTER `voumaileremail_id`;
ALTER TABLE `mst_voumaileremail` ADD COLUMN IF NOT EXISTS  `voumaileremail_nama` varchar(60)   AFTER `voumaileremail_email`;
ALTER TABLE `mst_voumaileremail` ADD COLUMN IF NOT EXISTS  `voumailer_id` varchar(14) NOT NULL  AFTER `voumaileremail_nama`;


ALTER TABLE `mst_voumaileremail` MODIFY COLUMN IF EXISTS  `voumaileremail_email` varchar(60)   AFTER `voumaileremail_id`;
ALTER TABLE `mst_voumaileremail` MODIFY COLUMN IF EXISTS  `voumaileremail_nama` varchar(60)   AFTER `voumaileremail_email`;
ALTER TABLE `mst_voumaileremail` MODIFY COLUMN IF EXISTS  `voumailer_id` varchar(14) NOT NULL  AFTER `voumaileremail_nama`;


ALTER TABLE `mst_voumaileremail` ADD CONSTRAINT `voumaileremail_email` UNIQUE IF NOT EXISTS  (`voumailer_id`, `voumaileremail_email`);

ALTER TABLE `mst_voumaileremail` ADD KEY IF NOT EXISTS `voumailer_id` (`voumailer_id`);

ALTER TABLE `mst_voumaileremail` ADD CONSTRAINT `fk_mst_voumaileremail_mst_voumailer` FOREIGN KEY IF NOT EXISTS (`voumailer_id`) REFERENCES `mst_voumailer` (`voumailer_id`);





CREATE TABLE IF NOT EXISTS `mst_voumailerque` (
	`voumailerque_id` varchar(14) NOT NULL , 
	`voumailerque_email` varchar(60)  , 
	`voumailerque_nama` varchar(60)  , 
	`voubatch_id` varchar(5) NOT NULL , 
	`vou_id` varchar(14) NOT NULL , 
	`msg_id` varchar(14)  , 
	`voumailerque_issend` tinyint(1) NOT NULL DEFAULT 0, 
	`voumailerque_sendby` varchar(14)  , 
	`voumailerque_senddate` datetime  , 
	`voumailer_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `voumaileremail_email` (`voumailer_id`, `voumailerque_email`, `voubatch_id`),
	UNIQUE KEY `voumaileremail_vou` (`vou_id`),
	PRIMARY KEY (`voumailerque_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Voucher';


ALTER TABLE `mst_voumailerque` ADD COLUMN IF NOT EXISTS  `voumailerque_email` varchar(60)   AFTER `voumailerque_id`;
ALTER TABLE `mst_voumailerque` ADD COLUMN IF NOT EXISTS  `voumailerque_nama` varchar(60)   AFTER `voumailerque_email`;
ALTER TABLE `mst_voumailerque` ADD COLUMN IF NOT EXISTS  `voubatch_id` varchar(5) NOT NULL  AFTER `voumailerque_nama`;
ALTER TABLE `mst_voumailerque` ADD COLUMN IF NOT EXISTS  `vou_id` varchar(14) NOT NULL  AFTER `voubatch_id`;
ALTER TABLE `mst_voumailerque` ADD COLUMN IF NOT EXISTS  `msg_id` varchar(14)   AFTER `vou_id`;
ALTER TABLE `mst_voumailerque` ADD COLUMN IF NOT EXISTS  `voumailerque_issend` tinyint(1) NOT NULL DEFAULT 0 AFTER `msg_id`;
ALTER TABLE `mst_voumailerque` ADD COLUMN IF NOT EXISTS  `voumailerque_sendby` varchar(14)   AFTER `voumailerque_issend`;
ALTER TABLE `mst_voumailerque` ADD COLUMN IF NOT EXISTS  `voumailerque_senddate` datetime   AFTER `voumailerque_sendby`;
ALTER TABLE `mst_voumailerque` ADD COLUMN IF NOT EXISTS  `voumailer_id` varchar(14) NOT NULL  AFTER `voumailerque_senddate`;


ALTER TABLE `mst_voumailerque` MODIFY COLUMN IF EXISTS  `voumailerque_email` varchar(60)   AFTER `voumailerque_id`;
ALTER TABLE `mst_voumailerque` MODIFY COLUMN IF EXISTS  `voumailerque_nama` varchar(60)   AFTER `voumailerque_email`;
ALTER TABLE `mst_voumailerque` MODIFY COLUMN IF EXISTS  `voubatch_id` varchar(5) NOT NULL  AFTER `voumailerque_nama`;
ALTER TABLE `mst_voumailerque` MODIFY COLUMN IF EXISTS  `vou_id` varchar(14) NOT NULL  AFTER `voubatch_id`;
ALTER TABLE `mst_voumailerque` MODIFY COLUMN IF EXISTS  `msg_id` varchar(14)   AFTER `vou_id`;
ALTER TABLE `mst_voumailerque` MODIFY COLUMN IF EXISTS  `voumailerque_issend` tinyint(1) NOT NULL DEFAULT 0 AFTER `msg_id`;
ALTER TABLE `mst_voumailerque` MODIFY COLUMN IF EXISTS  `voumailerque_sendby` varchar(14)   AFTER `voumailerque_issend`;
ALTER TABLE `mst_voumailerque` MODIFY COLUMN IF EXISTS  `voumailerque_senddate` datetime   AFTER `voumailerque_sendby`;
ALTER TABLE `mst_voumailerque` MODIFY COLUMN IF EXISTS  `voumailer_id` varchar(14) NOT NULL  AFTER `voumailerque_senddate`;


ALTER TABLE `mst_voumailerque` ADD CONSTRAINT `voumaileremail_email` UNIQUE IF NOT EXISTS  (`voumailer_id`, `voumailerque_email`, `voubatch_id`);
ALTER TABLE `mst_voumailerque` ADD CONSTRAINT `voumaileremail_vou` UNIQUE IF NOT EXISTS  (`vou_id`);

ALTER TABLE `mst_voumailerque` ADD KEY IF NOT EXISTS  `voubatch_id` (`voubatch_id`);
ALTER TABLE `mst_voumailerque` ADD KEY IF NOT EXISTS  `vou_id` (`vou_id`);
ALTER TABLE `mst_voumailerque` ADD KEY IF NOT EXISTS `voumailer_id` (`voumailer_id`);

ALTER TABLE `mst_voumailerque` ADD CONSTRAINT `fk_mst_voumailerque_mst_voubatch` FOREIGN KEY IF NOT EXISTS (`voubatch_id`) REFERENCES `mst_voubatch` (`voubatch_id`);
ALTER TABLE `mst_voumailerque` ADD CONSTRAINT `fk_mst_voumailerque_mst_vou` FOREIGN KEY IF NOT EXISTS (`vou_id`) REFERENCES `mst_vou` (`vou_id`);
ALTER TABLE `mst_voumailerque` ADD CONSTRAINT `fk_mst_voumailerque_mst_voumailer` FOREIGN KEY IF NOT EXISTS (`voumailer_id`) REFERENCES `mst_voumailer` (`voumailer_id`);





