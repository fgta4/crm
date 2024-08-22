-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_crmevent`;
-- drop table if exists `trn_crmeventinvited`;
-- drop table if exists `trn_crmeventattendant`;
-- drop table if exists `trn_crmeventkol`;
-- drop table if exists `trn_crmeventmedia`;
-- drop table if exists `trn_crmeventpost`;


CREATE TABLE IF NOT EXISTS `trn_crmevent` (
	`crmevent_id` varchar(14) NOT NULL , 
	`crmevent_name` varchar(90) NOT NULL , 
	`crmevent_descr` varchar(255)  , 
	`crmevent_dtactive` date NOT NULL , 
	`crmevent_dtstart` date NOT NULL , 
	`crmevent_dtend` date NOT NULL , 
	`crmevent_dtaffected` date NOT NULL , 
	`crmevent_message` varchar(1000)  , 
	`crmevent_invitationmessage` varchar(1000)  , 
	`crmevent_registeredmessage` varchar(1000)  , 
	`crmevent_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`crmevent_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`crmevent_isunlimit` tinyint(1) NOT NULL DEFAULT 0, 
	`crmevent_isclose` tinyint(1) NOT NULL DEFAULT 0, 
	`crmevent_targetinvited` decimal(8, 0)  , 
	`crmevent_targetattendant` decimal(8, 0)  , 
	`crmevent_targetnewcontact` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targettx` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targettxnew` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targetbuyer` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targetbuyernew` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targetsales` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targetsalesnew` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalinvited` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalattendant` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalnewcontact` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totaltx` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totaltxnew` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalbuyer` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalbuyernew` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalsales` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalsalesnew` decimal(8, 0) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `crmevent_name` (`crmevent_name`),
	PRIMARY KEY (`crmevent_id`)
) 
ENGINE=InnoDB
COMMENT='CRM Event, suseuatu yang dilakukan untuk mencari calon customer baru';


ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_name` varchar(90) NOT NULL  AFTER `crmevent_id`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_descr` varchar(255)   AFTER `crmevent_name`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_dtactive` date NOT NULL  AFTER `crmevent_descr`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_dtstart` date NOT NULL  AFTER `crmevent_dtactive`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_dtend` date NOT NULL  AFTER `crmevent_dtstart`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_dtaffected` date NOT NULL  AFTER `crmevent_dtend`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_message` varchar(1000)   AFTER `crmevent_dtaffected`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_invitationmessage` varchar(1000)   AFTER `crmevent_message`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_registeredmessage` varchar(1000)   AFTER `crmevent_invitationmessage`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `crmevent_registeredmessage`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `crmevent_iscommit`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_isunlimit` tinyint(1) NOT NULL DEFAULT 0 AFTER `crmevent_isdisabled`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_isclose` tinyint(1) NOT NULL DEFAULT 0 AFTER `crmevent_isunlimit`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_targetinvited` decimal(8, 0)   AFTER `crmevent_isclose`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_targetattendant` decimal(8, 0)   AFTER `crmevent_targetinvited`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_targetnewcontact` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_targetattendant`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_targettx` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_targetnewcontact`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_targettxnew` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_targettx`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_targetbuyer` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_targettxnew`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_targetbuyernew` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_targetbuyer`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_targetsales` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_targetbuyernew`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_targetsalesnew` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_targetsales`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_totalinvited` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_targetsalesnew`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_totalattendant` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_totalinvited`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_totalnewcontact` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_totalattendant`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_totaltx` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_totalnewcontact`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_totaltxnew` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_totaltx`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_totalbuyer` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_totaltxnew`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_totalbuyernew` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_totalbuyer`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_totalsales` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_totalbuyernew`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_totalsalesnew` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmevent_totalsales`;


ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_name` varchar(90) NOT NULL   AFTER `crmevent_id`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_descr` varchar(255)    AFTER `crmevent_name`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_dtactive` date NOT NULL   AFTER `crmevent_descr`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_dtstart` date NOT NULL   AFTER `crmevent_dtactive`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_dtend` date NOT NULL   AFTER `crmevent_dtstart`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_dtaffected` date NOT NULL   AFTER `crmevent_dtend`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_message` varchar(1000)    AFTER `crmevent_dtaffected`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_invitationmessage` varchar(1000)    AFTER `crmevent_message`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_registeredmessage` varchar(1000)    AFTER `crmevent_invitationmessage`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `crmevent_registeredmessage`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `crmevent_iscommit`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_isunlimit` tinyint(1) NOT NULL DEFAULT 0  AFTER `crmevent_isdisabled`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_isclose` tinyint(1) NOT NULL DEFAULT 0  AFTER `crmevent_isunlimit`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_targetinvited` decimal(8, 0)    AFTER `crmevent_isclose`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_targetattendant` decimal(8, 0)    AFTER `crmevent_targetinvited`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_targetnewcontact` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_targetattendant`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_targettx` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_targetnewcontact`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_targettxnew` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_targettx`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_targetbuyer` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_targettxnew`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_targetbuyernew` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_targetbuyer`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_targetsales` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_targetbuyernew`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_targetsalesnew` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_targetsales`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_totalinvited` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_targetsalesnew`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_totalattendant` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_totalinvited`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_totalnewcontact` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_totalattendant`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_totaltx` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_totalnewcontact`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_totaltxnew` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_totaltx`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_totalbuyer` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_totaltxnew`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_totalbuyernew` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_totalbuyer`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_totalsales` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_totalbuyernew`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_totalsalesnew` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmevent_totalsales`;


ALTER TABLE `trn_crmevent` ADD CONSTRAINT `crmevent_name` UNIQUE IF NOT EXISTS  (`crmevent_name`);







CREATE TABLE IF NOT EXISTS `trn_crmeventinvited` (
	`crmeventinvited_id` varchar(14) NOT NULL , 
	`crmeventinvited_name` varchar(90) NOT NULL , 
	`crmeventinvited_address` varchar(255)  , 
	`crmeventinvited_city` varchar(30)  , 
	`crmeventinvited_phone` varchar(90)  , 
	`crmeventinvited_email` varchar(90)  , 
	`invitation_id` varchar(30)  , 
	`crmeventinvited_iscontacted` tinyint(1) NOT NULL DEFAULT 0, 
	`crmeventinvited_contactdate` date  , 
	`user_id` varchar(14)  , 
	`crmevent_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`crmeventinvited_id`)
) 
ENGINE=InnoDB
COMMENT='CRM Event Invited, yang diundang di event ini, baik yang sudah ada di contact atau belum. data ini sifatnya bulk.';


ALTER TABLE `trn_crmeventinvited` ADD COLUMN IF NOT EXISTS  `crmeventinvited_name` varchar(90) NOT NULL  AFTER `crmeventinvited_id`;
ALTER TABLE `trn_crmeventinvited` ADD COLUMN IF NOT EXISTS  `crmeventinvited_address` varchar(255)   AFTER `crmeventinvited_name`;
ALTER TABLE `trn_crmeventinvited` ADD COLUMN IF NOT EXISTS  `crmeventinvited_city` varchar(30)   AFTER `crmeventinvited_address`;
ALTER TABLE `trn_crmeventinvited` ADD COLUMN IF NOT EXISTS  `crmeventinvited_phone` varchar(90)   AFTER `crmeventinvited_city`;
ALTER TABLE `trn_crmeventinvited` ADD COLUMN IF NOT EXISTS  `crmeventinvited_email` varchar(90)   AFTER `crmeventinvited_phone`;
ALTER TABLE `trn_crmeventinvited` ADD COLUMN IF NOT EXISTS  `invitation_id` varchar(30)   AFTER `crmeventinvited_email`;
ALTER TABLE `trn_crmeventinvited` ADD COLUMN IF NOT EXISTS  `crmeventinvited_iscontacted` tinyint(1) NOT NULL DEFAULT 0 AFTER `invitation_id`;
ALTER TABLE `trn_crmeventinvited` ADD COLUMN IF NOT EXISTS  `crmeventinvited_contactdate` date   AFTER `crmeventinvited_iscontacted`;
ALTER TABLE `trn_crmeventinvited` ADD COLUMN IF NOT EXISTS  `user_id` varchar(14)   AFTER `crmeventinvited_contactdate`;
ALTER TABLE `trn_crmeventinvited` ADD COLUMN IF NOT EXISTS  `crmevent_id` varchar(14) NOT NULL  AFTER `user_id`;


ALTER TABLE `trn_crmeventinvited` MODIFY COLUMN IF EXISTS  `crmeventinvited_name` varchar(90) NOT NULL   AFTER `crmeventinvited_id`;
ALTER TABLE `trn_crmeventinvited` MODIFY COLUMN IF EXISTS  `crmeventinvited_address` varchar(255)    AFTER `crmeventinvited_name`;
ALTER TABLE `trn_crmeventinvited` MODIFY COLUMN IF EXISTS  `crmeventinvited_city` varchar(30)    AFTER `crmeventinvited_address`;
ALTER TABLE `trn_crmeventinvited` MODIFY COLUMN IF EXISTS  `crmeventinvited_phone` varchar(90)    AFTER `crmeventinvited_city`;
ALTER TABLE `trn_crmeventinvited` MODIFY COLUMN IF EXISTS  `crmeventinvited_email` varchar(90)    AFTER `crmeventinvited_phone`;
ALTER TABLE `trn_crmeventinvited` MODIFY COLUMN IF EXISTS  `invitation_id` varchar(30)    AFTER `crmeventinvited_email`;
ALTER TABLE `trn_crmeventinvited` MODIFY COLUMN IF EXISTS  `crmeventinvited_iscontacted` tinyint(1) NOT NULL DEFAULT 0  AFTER `invitation_id`;
ALTER TABLE `trn_crmeventinvited` MODIFY COLUMN IF EXISTS  `crmeventinvited_contactdate` date    AFTER `crmeventinvited_iscontacted`;
ALTER TABLE `trn_crmeventinvited` MODIFY COLUMN IF EXISTS  `user_id` varchar(14)    AFTER `crmeventinvited_contactdate`;
ALTER TABLE `trn_crmeventinvited` MODIFY COLUMN IF EXISTS  `crmevent_id` varchar(14) NOT NULL   AFTER `user_id`;



ALTER TABLE `trn_crmeventinvited` ADD KEY IF NOT EXISTS `user_id` (`user_id`);
ALTER TABLE `trn_crmeventinvited` ADD KEY IF NOT EXISTS `crmevent_id` (`crmevent_id`);

ALTER TABLE `trn_crmeventinvited` ADD CONSTRAINT `fk_trn_crmeventinvited_fgt_user` FOREIGN KEY IF NOT EXISTS  (`user_id`) REFERENCES `fgt_user` (`user_id`);
ALTER TABLE `trn_crmeventinvited` ADD CONSTRAINT `fk_trn_crmeventinvited_trn_crmevent` FOREIGN KEY IF NOT EXISTS (`crmevent_id`) REFERENCES `trn_crmevent` (`crmevent_id`);





CREATE TABLE IF NOT EXISTS `trn_crmeventattendant` (
	`crmeventattendant_id` varchar(14) NOT NULL , 
	`invitation_id` varchar(30) NOT NULL , 
	`crmeventattendant_phone` varchar(90) NOT NULL , 
	`crmeventattendant_name` varchar(90) NOT NULL , 
	`crmeventattendant_address` varchar(255) NOT NULL , 
	`crmeventattendant_city` varchar(30) NOT NULL , 
	`crmeventattendant_date` date  , 
	`crmeventattendant_time` time  , 
	`crmevent_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`crmeventattendant_id`)
) 
ENGINE=InnoDB
COMMENT='CRM Event Atendant, yang datang di event ini';


ALTER TABLE `trn_crmeventattendant` ADD COLUMN IF NOT EXISTS  `invitation_id` varchar(30) NOT NULL  AFTER `crmeventattendant_id`;
ALTER TABLE `trn_crmeventattendant` ADD COLUMN IF NOT EXISTS  `crmeventattendant_phone` varchar(90) NOT NULL  AFTER `invitation_id`;
ALTER TABLE `trn_crmeventattendant` ADD COLUMN IF NOT EXISTS  `crmeventattendant_name` varchar(90) NOT NULL  AFTER `crmeventattendant_phone`;
ALTER TABLE `trn_crmeventattendant` ADD COLUMN IF NOT EXISTS  `crmeventattendant_address` varchar(255) NOT NULL  AFTER `crmeventattendant_name`;
ALTER TABLE `trn_crmeventattendant` ADD COLUMN IF NOT EXISTS  `crmeventattendant_city` varchar(30) NOT NULL  AFTER `crmeventattendant_address`;
ALTER TABLE `trn_crmeventattendant` ADD COLUMN IF NOT EXISTS  `crmeventattendant_date` date   AFTER `crmeventattendant_city`;
ALTER TABLE `trn_crmeventattendant` ADD COLUMN IF NOT EXISTS  `crmeventattendant_time` time   AFTER `crmeventattendant_date`;
ALTER TABLE `trn_crmeventattendant` ADD COLUMN IF NOT EXISTS  `crmevent_id` varchar(14) NOT NULL  AFTER `crmeventattendant_time`;


ALTER TABLE `trn_crmeventattendant` MODIFY COLUMN IF EXISTS  `invitation_id` varchar(30) NOT NULL   AFTER `crmeventattendant_id`;
ALTER TABLE `trn_crmeventattendant` MODIFY COLUMN IF EXISTS  `crmeventattendant_phone` varchar(90) NOT NULL   AFTER `invitation_id`;
ALTER TABLE `trn_crmeventattendant` MODIFY COLUMN IF EXISTS  `crmeventattendant_name` varchar(90) NOT NULL   AFTER `crmeventattendant_phone`;
ALTER TABLE `trn_crmeventattendant` MODIFY COLUMN IF EXISTS  `crmeventattendant_address` varchar(255) NOT NULL   AFTER `crmeventattendant_name`;
ALTER TABLE `trn_crmeventattendant` MODIFY COLUMN IF EXISTS  `crmeventattendant_city` varchar(30) NOT NULL   AFTER `crmeventattendant_address`;
ALTER TABLE `trn_crmeventattendant` MODIFY COLUMN IF EXISTS  `crmeventattendant_date` date    AFTER `crmeventattendant_city`;
ALTER TABLE `trn_crmeventattendant` MODIFY COLUMN IF EXISTS  `crmeventattendant_time` time    AFTER `crmeventattendant_date`;
ALTER TABLE `trn_crmeventattendant` MODIFY COLUMN IF EXISTS  `crmevent_id` varchar(14) NOT NULL   AFTER `crmeventattendant_time`;



ALTER TABLE `trn_crmeventattendant` ADD KEY IF NOT EXISTS `crmevent_id` (`crmevent_id`);

ALTER TABLE `trn_crmeventattendant` ADD CONSTRAINT `fk_trn_crmeventattendant_trn_crmevent` FOREIGN KEY IF NOT EXISTS (`crmevent_id`) REFERENCES `trn_crmevent` (`crmevent_id`);





CREATE TABLE IF NOT EXISTS `trn_crmeventkol` (
	`crmeventkol_id` varchar(14) NOT NULL , 
	`kol_id` varchar(30)  , 
	`crmeventkol_cost` decimal(12, 2) NOT NULL DEFAULT 0, 
	`crmeventkol_notes` varchar(1000) NOT NULL , 
	`crmeventkol_file` varchar(90)  , 
	`crmevent_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`crmeventkol_id`)
) 
ENGINE=InnoDB
COMMENT='';


ALTER TABLE `trn_crmeventkol` ADD COLUMN IF NOT EXISTS  `kol_id` varchar(30)   AFTER `crmeventkol_id`;
ALTER TABLE `trn_crmeventkol` ADD COLUMN IF NOT EXISTS  `crmeventkol_cost` decimal(12, 2) NOT NULL DEFAULT 0 AFTER `kol_id`;
ALTER TABLE `trn_crmeventkol` ADD COLUMN IF NOT EXISTS  `crmeventkol_notes` varchar(1000) NOT NULL  AFTER `crmeventkol_cost`;
ALTER TABLE `trn_crmeventkol` ADD COLUMN IF NOT EXISTS  `crmeventkol_file` varchar(90)   AFTER `crmeventkol_notes`;
ALTER TABLE `trn_crmeventkol` ADD COLUMN IF NOT EXISTS  `crmevent_id` varchar(14) NOT NULL  AFTER `crmeventkol_file`;


ALTER TABLE `trn_crmeventkol` MODIFY COLUMN IF EXISTS  `kol_id` varchar(30)    AFTER `crmeventkol_id`;
ALTER TABLE `trn_crmeventkol` MODIFY COLUMN IF EXISTS  `crmeventkol_cost` decimal(12, 2) NOT NULL DEFAULT 0  AFTER `kol_id`;
ALTER TABLE `trn_crmeventkol` MODIFY COLUMN IF EXISTS  `crmeventkol_notes` varchar(1000) NOT NULL   AFTER `crmeventkol_cost`;
ALTER TABLE `trn_crmeventkol` MODIFY COLUMN IF EXISTS  `crmeventkol_file` varchar(90)    AFTER `crmeventkol_notes`;
ALTER TABLE `trn_crmeventkol` MODIFY COLUMN IF EXISTS  `crmevent_id` varchar(14) NOT NULL   AFTER `crmeventkol_file`;



ALTER TABLE `trn_crmeventkol` ADD KEY IF NOT EXISTS `kol_id` (`kol_id`);
ALTER TABLE `trn_crmeventkol` ADD KEY IF NOT EXISTS `crmevent_id` (`crmevent_id`);

ALTER TABLE `trn_crmeventkol` ADD CONSTRAINT `fk_trn_crmeventkol_mst_kol` FOREIGN KEY IF NOT EXISTS  (`kol_id`) REFERENCES `mst_kol` (`kol_id`);
ALTER TABLE `trn_crmeventkol` ADD CONSTRAINT `fk_trn_crmeventkol_trn_crmevent` FOREIGN KEY IF NOT EXISTS (`crmevent_id`) REFERENCES `trn_crmevent` (`crmevent_id`);





CREATE TABLE IF NOT EXISTS `trn_crmeventmedia` (
	`crmeventmedia_id` varchar(14) NOT NULL , 
	`media_id` varchar(30)  , 
	`crmeventmedia_cost` decimal(12, 2) NOT NULL DEFAULT 0, 
	`crmeventmedia_notes` varchar(1000) NOT NULL , 
	`crmeventmedia_file` varchar(90)  , 
	`crmevent_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`crmeventmedia_id`)
) 
ENGINE=InnoDB
COMMENT='';


ALTER TABLE `trn_crmeventmedia` ADD COLUMN IF NOT EXISTS  `media_id` varchar(30)   AFTER `crmeventmedia_id`;
ALTER TABLE `trn_crmeventmedia` ADD COLUMN IF NOT EXISTS  `crmeventmedia_cost` decimal(12, 2) NOT NULL DEFAULT 0 AFTER `media_id`;
ALTER TABLE `trn_crmeventmedia` ADD COLUMN IF NOT EXISTS  `crmeventmedia_notes` varchar(1000) NOT NULL  AFTER `crmeventmedia_cost`;
ALTER TABLE `trn_crmeventmedia` ADD COLUMN IF NOT EXISTS  `crmeventmedia_file` varchar(90)   AFTER `crmeventmedia_notes`;
ALTER TABLE `trn_crmeventmedia` ADD COLUMN IF NOT EXISTS  `crmevent_id` varchar(14) NOT NULL  AFTER `crmeventmedia_file`;


ALTER TABLE `trn_crmeventmedia` MODIFY COLUMN IF EXISTS  `media_id` varchar(30)    AFTER `crmeventmedia_id`;
ALTER TABLE `trn_crmeventmedia` MODIFY COLUMN IF EXISTS  `crmeventmedia_cost` decimal(12, 2) NOT NULL DEFAULT 0  AFTER `media_id`;
ALTER TABLE `trn_crmeventmedia` MODIFY COLUMN IF EXISTS  `crmeventmedia_notes` varchar(1000) NOT NULL   AFTER `crmeventmedia_cost`;
ALTER TABLE `trn_crmeventmedia` MODIFY COLUMN IF EXISTS  `crmeventmedia_file` varchar(90)    AFTER `crmeventmedia_notes`;
ALTER TABLE `trn_crmeventmedia` MODIFY COLUMN IF EXISTS  `crmevent_id` varchar(14) NOT NULL   AFTER `crmeventmedia_file`;



ALTER TABLE `trn_crmeventmedia` ADD KEY IF NOT EXISTS `media_id` (`media_id`);
ALTER TABLE `trn_crmeventmedia` ADD KEY IF NOT EXISTS `crmevent_id` (`crmevent_id`);

ALTER TABLE `trn_crmeventmedia` ADD CONSTRAINT `fk_trn_crmeventmedia_mst_media` FOREIGN KEY IF NOT EXISTS  (`media_id`) REFERENCES `mst_media` (`media_id`);
ALTER TABLE `trn_crmeventmedia` ADD CONSTRAINT `fk_trn_crmeventmedia_trn_crmevent` FOREIGN KEY IF NOT EXISTS (`crmevent_id`) REFERENCES `trn_crmevent` (`crmevent_id`);





CREATE TABLE IF NOT EXISTS `trn_crmeventpost` (
	`crmeventpost_id` varchar(14) NOT NULL , 
	`crmeventpost_url` varchar(500)  , 
	`crmeventpost_dtpost` date NOT NULL , 
	`crmeventpost_dtreported` date NOT NULL , 
	`mediaposttype_id` varchar(10)  , 
	`kol_id` varchar(30)  , 
	`media_id` varchar(30)  , 
	`crmeventpost_impression` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmeventpost_reach` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmeventpost_view` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmeventpost_comment` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmeventpost_likes` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmeventpost_share` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmeventpost_save` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmeventpost_engagementrate` decimal(8, 2) NOT NULL DEFAULT 0, 
	`mediaposttype_iskol` tinyint(1) NOT NULL DEFAULT 0, 
	`crmevent_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`crmeventpost_id`)
) 
ENGINE=InnoDB
COMMENT='';


ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `crmeventpost_url` varchar(500)   AFTER `crmeventpost_id`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `crmeventpost_dtpost` date NOT NULL  AFTER `crmeventpost_url`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `crmeventpost_dtreported` date NOT NULL  AFTER `crmeventpost_dtpost`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `mediaposttype_id` varchar(10)   AFTER `crmeventpost_dtreported`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `kol_id` varchar(30)   AFTER `mediaposttype_id`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `media_id` varchar(30)   AFTER `kol_id`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `crmeventpost_impression` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `media_id`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `crmeventpost_reach` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmeventpost_impression`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `crmeventpost_view` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmeventpost_reach`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `crmeventpost_comment` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmeventpost_view`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `crmeventpost_likes` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmeventpost_comment`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `crmeventpost_share` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmeventpost_likes`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `crmeventpost_save` decimal(8, 0) NOT NULL DEFAULT 0 AFTER `crmeventpost_share`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `crmeventpost_engagementrate` decimal(8, 2) NOT NULL DEFAULT 0 AFTER `crmeventpost_save`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `mediaposttype_iskol` tinyint(1) NOT NULL DEFAULT 0 AFTER `crmeventpost_engagementrate`;
ALTER TABLE `trn_crmeventpost` ADD COLUMN IF NOT EXISTS  `crmevent_id` varchar(14) NOT NULL  AFTER `mediaposttype_iskol`;


ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `crmeventpost_url` varchar(500)    AFTER `crmeventpost_id`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `crmeventpost_dtpost` date NOT NULL   AFTER `crmeventpost_url`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `crmeventpost_dtreported` date NOT NULL   AFTER `crmeventpost_dtpost`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `mediaposttype_id` varchar(10)    AFTER `crmeventpost_dtreported`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `kol_id` varchar(30)    AFTER `mediaposttype_id`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `media_id` varchar(30)    AFTER `kol_id`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `crmeventpost_impression` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `media_id`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `crmeventpost_reach` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmeventpost_impression`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `crmeventpost_view` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmeventpost_reach`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `crmeventpost_comment` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmeventpost_view`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `crmeventpost_likes` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmeventpost_comment`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `crmeventpost_share` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmeventpost_likes`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `crmeventpost_save` decimal(8, 0) NOT NULL DEFAULT 0  AFTER `crmeventpost_share`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `crmeventpost_engagementrate` decimal(8, 2) NOT NULL DEFAULT 0  AFTER `crmeventpost_save`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `mediaposttype_iskol` tinyint(1) NOT NULL DEFAULT 0  AFTER `crmeventpost_engagementrate`;
ALTER TABLE `trn_crmeventpost` MODIFY COLUMN IF EXISTS  `crmevent_id` varchar(14) NOT NULL   AFTER `mediaposttype_iskol`;



ALTER TABLE `trn_crmeventpost` ADD KEY IF NOT EXISTS `mediaposttype_id` (`mediaposttype_id`);
ALTER TABLE `trn_crmeventpost` ADD KEY IF NOT EXISTS `kol_id` (`kol_id`);
ALTER TABLE `trn_crmeventpost` ADD KEY IF NOT EXISTS `media_id` (`media_id`);
ALTER TABLE `trn_crmeventpost` ADD KEY IF NOT EXISTS `crmevent_id` (`crmevent_id`);

ALTER TABLE `trn_crmeventpost` ADD CONSTRAINT `fk_trn_crmeventpost_mst_mediaposttype` FOREIGN KEY IF NOT EXISTS  (`mediaposttype_id`) REFERENCES `mst_mediaposttype` (`mediaposttype_id`);
ALTER TABLE `trn_crmeventpost` ADD CONSTRAINT `fk_trn_crmeventpost_mst_kol` FOREIGN KEY IF NOT EXISTS  (`kol_id`) REFERENCES `mst_kol` (`kol_id`);
ALTER TABLE `trn_crmeventpost` ADD CONSTRAINT `fk_trn_crmeventpost_mst_media` FOREIGN KEY IF NOT EXISTS  (`media_id`) REFERENCES `mst_media` (`media_id`);
ALTER TABLE `trn_crmeventpost` ADD CONSTRAINT `fk_trn_crmeventpost_trn_crmevent` FOREIGN KEY IF NOT EXISTS (`crmevent_id`) REFERENCES `trn_crmevent` (`crmevent_id`);





