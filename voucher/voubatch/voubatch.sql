-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_voubatch`;
-- drop table if exists `mst_vou`;
-- drop table if exists `mst_voutnc`;


CREATE TABLE IF NOT EXISTS `mst_voubatch` (
	`voubatch_id` varchar(5) NOT NULL , 
	`voutype_id` varchar(5)  , 
	`brand_id` varchar(10)  , 
	`voubatch_descr` varchar(255)  , 
	`crmevent_id` varchar(14)  , 
	`voubatch_dtstart` date NOT NULL , 
	`voubatch_dtend` date NOT NULL , 
	`voubatch_cond` varchar(2000)  , 
	`voubatch_dtactive` date NOT NULL , 
	`voubatch_dtexpired` date NOT NULL , 
	`voubatch_file` varchar(90)  , 
	`voubatch_isgenimage` tinyint(1) NOT NULL DEFAULT 0, 
	`voubatch_width` int(4) NOT NULL DEFAULT 0, 
	`voubatch_barpostop` int(4) NOT NULL DEFAULT 0, 
	`voubatch_barposleft` int(4) NOT NULL DEFAULT 0, 
	`voumodel_id` varchar(10)  , 
	`voubatch_code` varchar(3)  , 
	`voubatch_value` decimal(16, 2) NOT NULL DEFAULT 0, 
	`voubatch_qty` int(4) NOT NULL DEFAULT 0, 
	`voubatch_qtymax` int(4) NOT NULL DEFAULT 0, 
	`voubatch_isondemand` tinyint(1) NOT NULL DEFAULT 0, 
	`voubatch_isactive` tinyint(1) NOT NULL DEFAULT 0, 
	`voubatch_version` int(4) NOT NULL DEFAULT 0, 
	`voubatch_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`voubatch_commitby` varchar(14)  , 
	`voubatch_commitdate` datetime  , 
	`voubatch_isgenerate` tinyint(1) NOT NULL DEFAULT 0, 
	`voubatch_generateby` varchar(14)  , 
	`voubatch_generatedate` datetime  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`voubatch_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Batch Voucher';


ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voutype_id` varchar(5)   AFTER `voubatch_id`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(10)   AFTER `voutype_id`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_descr` varchar(255)   AFTER `brand_id`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `crmevent_id` varchar(14)   AFTER `voubatch_descr`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_dtstart` date NOT NULL  AFTER `crmevent_id`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_dtend` date NOT NULL  AFTER `voubatch_dtstart`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_cond` varchar(2000)   AFTER `voubatch_dtend`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_dtactive` date NOT NULL  AFTER `voubatch_cond`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_dtexpired` date NOT NULL  AFTER `voubatch_dtactive`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_file` varchar(90)   AFTER `voubatch_dtexpired`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_isgenimage` tinyint(1) NOT NULL DEFAULT 0 AFTER `voubatch_file`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_width` int(4) NOT NULL DEFAULT 0 AFTER `voubatch_isgenimage`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_barpostop` int(4) NOT NULL DEFAULT 0 AFTER `voubatch_width`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_barposleft` int(4) NOT NULL DEFAULT 0 AFTER `voubatch_barpostop`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voumodel_id` varchar(10)   AFTER `voubatch_barposleft`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_code` varchar(3)   AFTER `voumodel_id`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_value` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `voubatch_code`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_qty` int(4) NOT NULL DEFAULT 0 AFTER `voubatch_value`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_qtymax` int(4) NOT NULL DEFAULT 0 AFTER `voubatch_qty`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_isondemand` tinyint(1) NOT NULL DEFAULT 0 AFTER `voubatch_qtymax`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_isactive` tinyint(1) NOT NULL DEFAULT 0 AFTER `voubatch_isondemand`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_version` int(4) NOT NULL DEFAULT 0 AFTER `voubatch_isactive`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `voubatch_version`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_commitby` varchar(14)   AFTER `voubatch_iscommit`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_commitdate` datetime   AFTER `voubatch_commitby`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_isgenerate` tinyint(1) NOT NULL DEFAULT 0 AFTER `voubatch_commitdate`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_generateby` varchar(14)   AFTER `voubatch_isgenerate`;
ALTER TABLE `mst_voubatch` ADD COLUMN IF NOT EXISTS  `voubatch_generatedate` datetime   AFTER `voubatch_generateby`;


ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voutype_id` varchar(5)    AFTER `voubatch_id`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `brand_id` varchar(10)    AFTER `voutype_id`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_descr` varchar(255)    AFTER `brand_id`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `crmevent_id` varchar(14)    AFTER `voubatch_descr`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_dtstart` date NOT NULL   AFTER `crmevent_id`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_dtend` date NOT NULL   AFTER `voubatch_dtstart`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_cond` varchar(2000)    AFTER `voubatch_dtend`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_dtactive` date NOT NULL   AFTER `voubatch_cond`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_dtexpired` date NOT NULL   AFTER `voubatch_dtactive`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_file` varchar(90)    AFTER `voubatch_dtexpired`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_isgenimage` tinyint(1) NOT NULL DEFAULT 0  AFTER `voubatch_file`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_width` int(4) NOT NULL DEFAULT 0  AFTER `voubatch_isgenimage`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_barpostop` int(4) NOT NULL DEFAULT 0  AFTER `voubatch_width`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_barposleft` int(4) NOT NULL DEFAULT 0  AFTER `voubatch_barpostop`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voumodel_id` varchar(10)    AFTER `voubatch_barposleft`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_code` varchar(3)    AFTER `voumodel_id`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_value` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `voubatch_code`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_qty` int(4) NOT NULL DEFAULT 0  AFTER `voubatch_value`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_qtymax` int(4) NOT NULL DEFAULT 0  AFTER `voubatch_qty`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_isondemand` tinyint(1) NOT NULL DEFAULT 0  AFTER `voubatch_qtymax`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_isactive` tinyint(1) NOT NULL DEFAULT 0  AFTER `voubatch_isondemand`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_version` int(4) NOT NULL DEFAULT 0  AFTER `voubatch_isactive`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `voubatch_version`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_commitby` varchar(14)    AFTER `voubatch_iscommit`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_commitdate` datetime    AFTER `voubatch_commitby`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_isgenerate` tinyint(1) NOT NULL DEFAULT 0  AFTER `voubatch_commitdate`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_generateby` varchar(14)    AFTER `voubatch_isgenerate`;
ALTER TABLE `mst_voubatch` MODIFY COLUMN IF EXISTS  `voubatch_generatedate` datetime    AFTER `voubatch_generateby`;



ALTER TABLE `mst_voubatch` ADD KEY IF NOT EXISTS `voutype_id` (`voutype_id`);
ALTER TABLE `mst_voubatch` ADD KEY IF NOT EXISTS `brand_id` (`brand_id`);
ALTER TABLE `mst_voubatch` ADD KEY IF NOT EXISTS `crmevent_id` (`crmevent_id`);
ALTER TABLE `mst_voubatch` ADD KEY IF NOT EXISTS `voumodel_id` (`voumodel_id`);

ALTER TABLE `mst_voubatch` ADD CONSTRAINT `fk_mst_voubatch_mst_voutype` FOREIGN KEY IF NOT EXISTS  (`voutype_id`) REFERENCES `mst_voutype` (`voutype_id`);
ALTER TABLE `mst_voubatch` ADD CONSTRAINT `fk_mst_voubatch_mst_brand` FOREIGN KEY IF NOT EXISTS  (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `mst_voubatch` ADD CONSTRAINT `fk_mst_voubatch_trn_crmevent` FOREIGN KEY IF NOT EXISTS  (`crmevent_id`) REFERENCES `trn_crmevent` (`crmevent_id`);
ALTER TABLE `mst_voubatch` ADD CONSTRAINT `fk_mst_voubatch_mst_voumodel` FOREIGN KEY IF NOT EXISTS  (`voumodel_id`) REFERENCES `mst_voumodel` (`voumodel_id`);





CREATE TABLE IF NOT EXISTS `mst_vou` (
	`vou_id` varchar(30) NOT NULL , 
	`vou_no` int(4) NOT NULL DEFAULT 0, 
	`vou_ran` varchar(2) NOT NULL , 
	`vou_parity` varchar(2) NOT NULL , 
	`vou_value` decimal(16, 2) NOT NULL DEFAULT 0, 
	`vou_infocode` varchar(13) NOT NULL , 
	`vou_infocoderan` varchar(2) NOT NULL , 
	`vou_infocodeparity` varchar(2) NOT NULL , 
	`vou_assigncode` varchar(60)  , 
	`vou_assignto` varchar(60)  , 
	`vou_assigntoname` varchar(255)  , 
	`voumailerque_id` varchar(14)  , 
	`vou_file` varchar(90)  , 
	`vou_isactive` tinyint(1) NOT NULL DEFAULT 0, 
	`vou_dtactive` date NOT NULL , 
	`vou_dtexpired` date NOT NULL , 
	`vou_isview` tinyint(1) NOT NULL DEFAULT 0, 
	`vou_viewdate` datetime  , 
	`vou_ismark` tinyint(1) NOT NULL DEFAULT 0, 
	`vou_markregion` varchar(5)  , 
	`vou_markbranch` varchar(7)  , 
	`vou_markmachine` varchar(10)  , 
	`vou_isuse` tinyint(1) NOT NULL DEFAULT 0, 
	`vou_useby` varchar(14)  , 
	`vou_usedate` datetime  , 
	`vou_createfrombon` varchar(32)  , 
	`vou_createfrombonvalue` decimal(16, 2) NOT NULL DEFAULT 0, 
	`vou_bon` varchar(32)  , 
	`vou_useregionbranch` varchar(30)  , 
	`vou_useregionbranchname` varchar(90)  , 
	`vou_usevalue` decimal(16, 2)  , 
	`vou_isdup` tinyint(1) NOT NULL DEFAULT 0, 
	`voubatch_id` varchar(5) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`vou_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Voucher';


ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_no` int(4) NOT NULL DEFAULT 0 AFTER `vou_id`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_ran` varchar(2) NOT NULL  AFTER `vou_no`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_parity` varchar(2) NOT NULL  AFTER `vou_ran`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_value` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `vou_parity`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_infocode` varchar(13) NOT NULL  AFTER `vou_value`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_infocoderan` varchar(2) NOT NULL  AFTER `vou_infocode`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_infocodeparity` varchar(2) NOT NULL  AFTER `vou_infocoderan`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_assigncode` varchar(60)   AFTER `vou_infocodeparity`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_assignto` varchar(60)   AFTER `vou_assigncode`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_assigntoname` varchar(255)   AFTER `vou_assignto`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `voumailerque_id` varchar(14)   AFTER `vou_assigntoname`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_file` varchar(90)   AFTER `voumailerque_id`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_isactive` tinyint(1) NOT NULL DEFAULT 0 AFTER `vou_file`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_dtactive` date NOT NULL  AFTER `vou_isactive`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_dtexpired` date NOT NULL  AFTER `vou_dtactive`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_isview` tinyint(1) NOT NULL DEFAULT 0 AFTER `vou_dtexpired`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_viewdate` datetime   AFTER `vou_isview`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_ismark` tinyint(1) NOT NULL DEFAULT 0 AFTER `vou_viewdate`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_markregion` varchar(5)   AFTER `vou_ismark`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_markbranch` varchar(7)   AFTER `vou_markregion`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_markmachine` varchar(10)   AFTER `vou_markbranch`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_isuse` tinyint(1) NOT NULL DEFAULT 0 AFTER `vou_markmachine`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_useby` varchar(14)   AFTER `vou_isuse`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_usedate` datetime   AFTER `vou_useby`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_createfrombon` varchar(32)   AFTER `vou_usedate`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_createfrombonvalue` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `vou_createfrombon`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_bon` varchar(32)   AFTER `vou_createfrombonvalue`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_useregionbranch` varchar(30)   AFTER `vou_bon`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_useregionbranchname` varchar(90)   AFTER `vou_useregionbranch`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_usevalue` decimal(16, 2)   AFTER `vou_useregionbranchname`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `vou_isdup` tinyint(1) NOT NULL DEFAULT 0 AFTER `vou_usevalue`;
ALTER TABLE `mst_vou` ADD COLUMN IF NOT EXISTS  `voubatch_id` varchar(5) NOT NULL  AFTER `vou_isdup`;


ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_no` int(4) NOT NULL DEFAULT 0  AFTER `vou_id`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_ran` varchar(2) NOT NULL   AFTER `vou_no`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_parity` varchar(2) NOT NULL   AFTER `vou_ran`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_value` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `vou_parity`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_infocode` varchar(13) NOT NULL   AFTER `vou_value`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_infocoderan` varchar(2) NOT NULL   AFTER `vou_infocode`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_infocodeparity` varchar(2) NOT NULL   AFTER `vou_infocoderan`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_assigncode` varchar(60)    AFTER `vou_infocodeparity`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_assignto` varchar(60)    AFTER `vou_assigncode`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_assigntoname` varchar(255)    AFTER `vou_assignto`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `voumailerque_id` varchar(14)    AFTER `vou_assigntoname`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_file` varchar(90)    AFTER `voumailerque_id`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_isactive` tinyint(1) NOT NULL DEFAULT 0  AFTER `vou_file`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_dtactive` date NOT NULL   AFTER `vou_isactive`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_dtexpired` date NOT NULL   AFTER `vou_dtactive`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_isview` tinyint(1) NOT NULL DEFAULT 0  AFTER `vou_dtexpired`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_viewdate` datetime    AFTER `vou_isview`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_ismark` tinyint(1) NOT NULL DEFAULT 0  AFTER `vou_viewdate`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_markregion` varchar(5)    AFTER `vou_ismark`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_markbranch` varchar(7)    AFTER `vou_markregion`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_markmachine` varchar(10)    AFTER `vou_markbranch`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_isuse` tinyint(1) NOT NULL DEFAULT 0  AFTER `vou_markmachine`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_useby` varchar(14)    AFTER `vou_isuse`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_usedate` datetime    AFTER `vou_useby`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_createfrombon` varchar(32)    AFTER `vou_usedate`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_createfrombonvalue` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `vou_createfrombon`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_bon` varchar(32)    AFTER `vou_createfrombonvalue`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_useregionbranch` varchar(30)    AFTER `vou_bon`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_useregionbranchname` varchar(90)    AFTER `vou_useregionbranch`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_usevalue` decimal(16, 2)    AFTER `vou_useregionbranchname`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `vou_isdup` tinyint(1) NOT NULL DEFAULT 0  AFTER `vou_usevalue`;
ALTER TABLE `mst_vou` MODIFY COLUMN IF EXISTS  `voubatch_id` varchar(5) NOT NULL   AFTER `vou_isdup`;



ALTER TABLE `mst_vou` ADD KEY IF NOT EXISTS  `voumailerque_id` (`voumailerque_id`);
ALTER TABLE `mst_vou` ADD KEY IF NOT EXISTS `voubatch_id` (`voubatch_id`);

ALTER TABLE `mst_vou` ADD CONSTRAINT `fk_mst_vou_mst_voumailerque` FOREIGN KEY IF NOT EXISTS (`voumailerque_id`) REFERENCES `mst_voumailerque` (`voumailerque_id`);
ALTER TABLE `mst_vou` ADD CONSTRAINT `fk_mst_vou_mst_voubatch` FOREIGN KEY IF NOT EXISTS (`voubatch_id`) REFERENCES `mst_voubatch` (`voubatch_id`);





CREATE TABLE IF NOT EXISTS `mst_voutnc` (
	`voutnc_id` varchar(14) NOT NULL , 
	`voutnc_order` int(4) NOT NULL DEFAULT 0, 
	`voutnc_descr` varchar(255)  , 
	`voubatch_id` varchar(5) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`voutnc_id`)
) 
ENGINE=InnoDB
COMMENT='Voucher Terms and Condition';


ALTER TABLE `mst_voutnc` ADD COLUMN IF NOT EXISTS  `voutnc_order` int(4) NOT NULL DEFAULT 0 AFTER `voutnc_id`;
ALTER TABLE `mst_voutnc` ADD COLUMN IF NOT EXISTS  `voutnc_descr` varchar(255)   AFTER `voutnc_order`;
ALTER TABLE `mst_voutnc` ADD COLUMN IF NOT EXISTS  `voubatch_id` varchar(5) NOT NULL  AFTER `voutnc_descr`;


ALTER TABLE `mst_voutnc` MODIFY COLUMN IF EXISTS  `voutnc_order` int(4) NOT NULL DEFAULT 0  AFTER `voutnc_id`;
ALTER TABLE `mst_voutnc` MODIFY COLUMN IF EXISTS  `voutnc_descr` varchar(255)    AFTER `voutnc_order`;
ALTER TABLE `mst_voutnc` MODIFY COLUMN IF EXISTS  `voubatch_id` varchar(5) NOT NULL   AFTER `voutnc_descr`;



ALTER TABLE `mst_voutnc` ADD KEY IF NOT EXISTS `voubatch_id` (`voubatch_id`);

ALTER TABLE `mst_voutnc` ADD CONSTRAINT `fk_mst_voutnc_mst_voubatch` FOREIGN KEY IF NOT EXISTS (`voubatch_id`) REFERENCES `mst_voubatch` (`voubatch_id`);





