-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_cust`;
-- drop table if exists `mst_custcontact`;
-- drop table if exists `mst_custaddress`;


CREATE TABLE IF NOT EXISTS `mst_cust` (
	`cust_id` varchar(14) NOT NULL , 
	`cust_name` varchar(60) NOT NULL , 
	`cust_mainphonenumber` varchar(60)  , 
	`cust_mainemail` varchar(60)  , 
	`cust_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`cust_birthplace` varchar(30)  , 
	`cust_ishasbirthinfo` tinyint(1) NOT NULL DEFAULT 0, 
	`cust_birthdate` date  , 
	`cust_isrecvoffer` tinyint(1) NOT NULL DEFAULT 1, 
	`cust_reasonrejectoffer` varchar(255)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`cust_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Customer';


ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_name` varchar(60) NOT NULL  AFTER `cust_id`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_mainphonenumber` varchar(60)   AFTER `cust_name`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_mainemail` varchar(60)   AFTER `cust_mainphonenumber`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `cust_mainemail`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_birthplace` varchar(30)   AFTER `cust_isdisabled`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_ishasbirthinfo` tinyint(1) NOT NULL DEFAULT 0 AFTER `cust_birthplace`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_birthdate` date   AFTER `cust_ishasbirthinfo`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_isrecvoffer` tinyint(1) NOT NULL DEFAULT 1 AFTER `cust_birthdate`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_reasonrejectoffer` varchar(255)   AFTER `cust_isrecvoffer`;


ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_name` varchar(60) NOT NULL  AFTER `cust_id`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_mainphonenumber` varchar(60)   AFTER `cust_name`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_mainemail` varchar(60)   AFTER `cust_mainphonenumber`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `cust_mainemail`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_birthplace` varchar(30)   AFTER `cust_isdisabled`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_ishasbirthinfo` tinyint(1) NOT NULL DEFAULT 0 AFTER `cust_birthplace`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_birthdate` date   AFTER `cust_ishasbirthinfo`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_isrecvoffer` tinyint(1) NOT NULL DEFAULT 1 AFTER `cust_birthdate`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_reasonrejectoffer` varchar(255)   AFTER `cust_isrecvoffer`;









CREATE TABLE IF NOT EXISTS `mst_custcontact` (
	`custcontact_id` varchar(14) NOT NULL , 
	`custcontact_data` varchar(60) NOT NULL , 
	`custcontact_isemail` tinyint(1) NOT NULL DEFAULT 0, 
	`custcontact_isphone` tinyint(1) NOT NULL DEFAULT 0, 
	`custcontact_iswhatsapp` tinyint(1) NOT NULL DEFAULT 0, 
	`cust_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `custcontact_data` (`custcontact_data`),
	PRIMARY KEY (`custcontact_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Contact Customer';


ALTER TABLE `mst_custcontact` ADD COLUMN IF NOT EXISTS  `custcontact_data` varchar(60) NOT NULL  AFTER `custcontact_id`;
ALTER TABLE `mst_custcontact` ADD COLUMN IF NOT EXISTS  `custcontact_isemail` tinyint(1) NOT NULL DEFAULT 0 AFTER `custcontact_data`;
ALTER TABLE `mst_custcontact` ADD COLUMN IF NOT EXISTS  `custcontact_isphone` tinyint(1) NOT NULL DEFAULT 0 AFTER `custcontact_isemail`;
ALTER TABLE `mst_custcontact` ADD COLUMN IF NOT EXISTS  `custcontact_iswhatsapp` tinyint(1) NOT NULL DEFAULT 0 AFTER `custcontact_isphone`;
ALTER TABLE `mst_custcontact` ADD COLUMN IF NOT EXISTS  `cust_id` varchar(14) NOT NULL  AFTER `custcontact_iswhatsapp`;


ALTER TABLE `mst_custcontact` MODIFY COLUMN IF EXISTS  `custcontact_data` varchar(60) NOT NULL  AFTER `custcontact_id`;
ALTER TABLE `mst_custcontact` MODIFY COLUMN IF EXISTS  `custcontact_isemail` tinyint(1) NOT NULL DEFAULT 0 AFTER `custcontact_data`;
ALTER TABLE `mst_custcontact` MODIFY COLUMN IF EXISTS  `custcontact_isphone` tinyint(1) NOT NULL DEFAULT 0 AFTER `custcontact_isemail`;
ALTER TABLE `mst_custcontact` MODIFY COLUMN IF EXISTS  `custcontact_iswhatsapp` tinyint(1) NOT NULL DEFAULT 0 AFTER `custcontact_isphone`;
ALTER TABLE `mst_custcontact` MODIFY COLUMN IF EXISTS  `cust_id` varchar(14) NOT NULL  AFTER `custcontact_iswhatsapp`;


ALTER TABLE `mst_custcontact` ADD CONSTRAINT `custcontact_data` UNIQUE IF NOT EXISTS  (`custcontact_data`);

ALTER TABLE `mst_custcontact` ADD KEY IF NOT EXISTS `cust_id` (`cust_id`);

ALTER TABLE `mst_custcontact` ADD CONSTRAINT `fk_mst_custcontact_mst_cust` FOREIGN KEY IF NOT EXISTS (`cust_id`) REFERENCES `mst_cust` (`cust_id`);





CREATE TABLE IF NOT EXISTS `mst_custaddress` (
	`custaddress_id` varchar(14) NOT NULL , 
	`custaddress_line1` varchar(255)  , 
	`custaddress_line2` varchar(255)  , 
	`custaddress_line3` varchar(255)  , 
	`custaddress_city` varchar(60)  , 
	`custaddress_prov` varchar(60)  , 
	`custaddress_postcode` varchar(20)  , 
	`cust_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`custaddress_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Address Customer';


ALTER TABLE `mst_custaddress` ADD COLUMN IF NOT EXISTS  `custaddress_line1` varchar(255)   AFTER `custaddress_id`;
ALTER TABLE `mst_custaddress` ADD COLUMN IF NOT EXISTS  `custaddress_line2` varchar(255)   AFTER `custaddress_line1`;
ALTER TABLE `mst_custaddress` ADD COLUMN IF NOT EXISTS  `custaddress_line3` varchar(255)   AFTER `custaddress_line2`;
ALTER TABLE `mst_custaddress` ADD COLUMN IF NOT EXISTS  `custaddress_city` varchar(60)   AFTER `custaddress_line3`;
ALTER TABLE `mst_custaddress` ADD COLUMN IF NOT EXISTS  `custaddress_prov` varchar(60)   AFTER `custaddress_city`;
ALTER TABLE `mst_custaddress` ADD COLUMN IF NOT EXISTS  `custaddress_postcode` varchar(20)   AFTER `custaddress_prov`;
ALTER TABLE `mst_custaddress` ADD COLUMN IF NOT EXISTS  `cust_id` varchar(14) NOT NULL  AFTER `custaddress_postcode`;


ALTER TABLE `mst_custaddress` MODIFY COLUMN IF EXISTS  `custaddress_line1` varchar(255)   AFTER `custaddress_id`;
ALTER TABLE `mst_custaddress` MODIFY COLUMN IF EXISTS  `custaddress_line2` varchar(255)   AFTER `custaddress_line1`;
ALTER TABLE `mst_custaddress` MODIFY COLUMN IF EXISTS  `custaddress_line3` varchar(255)   AFTER `custaddress_line2`;
ALTER TABLE `mst_custaddress` MODIFY COLUMN IF EXISTS  `custaddress_city` varchar(60)   AFTER `custaddress_line3`;
ALTER TABLE `mst_custaddress` MODIFY COLUMN IF EXISTS  `custaddress_prov` varchar(60)   AFTER `custaddress_city`;
ALTER TABLE `mst_custaddress` MODIFY COLUMN IF EXISTS  `custaddress_postcode` varchar(20)   AFTER `custaddress_prov`;
ALTER TABLE `mst_custaddress` MODIFY COLUMN IF EXISTS  `cust_id` varchar(14) NOT NULL  AFTER `custaddress_postcode`;



ALTER TABLE `mst_custaddress` ADD KEY IF NOT EXISTS `cust_id` (`cust_id`);

ALTER TABLE `mst_custaddress` ADD CONSTRAINT `fk_mst_custaddress_mst_cust` FOREIGN KEY IF NOT EXISTS (`cust_id`) REFERENCES `mst_cust` (`cust_id`);





