-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_crmevent`;
-- drop table if exists `trn_crmeventinvited`;
-- drop table if exists `trn_crmeventattendant`;


CREATE TABLE IF NOT EXISTS `trn_crmevent` (
	`crmevent_id` varchar(14) NOT NULL , 
	`crmevent_name` varchar(90) NOT NULL , 
	`crmevent_descr` varchar(255)  , 
	`crmevent_dtstart` date NOT NULL , 
	`crmevent_dtend` date NOT NULL , 
	`crmevent_dtaffected` date NOT NULL , 
	`crmevent_message` varchar(1000)  , 
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
	`crmsource_id` varchar(10)  , 
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
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_dtstart` date NOT NULL  AFTER `crmevent_descr`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_dtend` date NOT NULL  AFTER `crmevent_dtstart`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_dtaffected` date NOT NULL  AFTER `crmevent_dtend`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_message` varchar(1000)   AFTER `crmevent_dtaffected`;
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmevent_registeredmessage` varchar(1000)   AFTER `crmevent_message`;
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
ALTER TABLE `trn_crmevent` ADD COLUMN IF NOT EXISTS  `crmsource_id` varchar(10)   AFTER `crmevent_totalsalesnew`;


ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_name` varchar(90) NOT NULL   AFTER `crmevent_id`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_descr` varchar(255)    AFTER `crmevent_name`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_dtstart` date NOT NULL   AFTER `crmevent_descr`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_dtend` date NOT NULL   AFTER `crmevent_dtstart`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_dtaffected` date NOT NULL   AFTER `crmevent_dtend`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_message` varchar(1000)    AFTER `crmevent_dtaffected`;
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmevent_registeredmessage` varchar(1000)    AFTER `crmevent_message`;
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
ALTER TABLE `trn_crmevent` MODIFY COLUMN IF EXISTS  `crmsource_id` varchar(10)    AFTER `crmevent_totalsalesnew`;


ALTER TABLE `trn_crmevent` ADD CONSTRAINT `crmevent_name` UNIQUE IF NOT EXISTS  (`crmevent_name`);

ALTER TABLE `trn_crmevent` ADD KEY IF NOT EXISTS `crmsource_id` (`crmsource_id`);

ALTER TABLE `trn_crmevent` ADD CONSTRAINT `fk_trn_crmevent_mst_crmsource` FOREIGN KEY IF NOT EXISTS  (`crmsource_id`) REFERENCES `mst_crmsource` (`crmsource_id`);





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





