-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_kol`;


CREATE TABLE IF NOT EXISTS `mst_kol` (
	`kol_id` varchar(30) NOT NULL , 
	`koltype_id` varchar(10)  , 
	`kol_name` varchar(60) NOT NULL , 
	`kol_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`kol_picture` varchar(90)  , 
	`kol_birthplace` varchar(30)  , 
	`kol_birthdate` date  , 
	`gender_id` varchar(1)  , 
	`religion_id` varchar(3)  , 
	`kol_city` varchar(20)  , 
	`kol_instagram` varchar(255)  , 
	`kol_facebook` varchar(255)  , 
	`kol_twitter` varchar(255)  , 
	`kol_tiktok` varchar(255)  , 
	`kol_youtube` varchar(255)  , 
	`kol_blog` varchar(255)  , 
	`kol_website` varchar(255)  , 
	`partner_id` varchar(14)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`kol_id`)
) 
ENGINE=InnoDB
COMMENT='Master KOL';


ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `koltype_id` varchar(10)   AFTER `kol_id`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `kol_name` varchar(60) NOT NULL  AFTER `koltype_id`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `kol_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `kol_name`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `kol_picture` varchar(90)   AFTER `kol_isdisabled`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `kol_birthplace` varchar(30)   AFTER `kol_picture`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `kol_birthdate` date   AFTER `kol_birthplace`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `gender_id` varchar(1)   AFTER `kol_birthdate`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `religion_id` varchar(3)   AFTER `gender_id`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `kol_city` varchar(20)   AFTER `religion_id`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `kol_instagram` varchar(255)   AFTER `kol_city`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `kol_facebook` varchar(255)   AFTER `kol_instagram`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `kol_twitter` varchar(255)   AFTER `kol_facebook`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `kol_tiktok` varchar(255)   AFTER `kol_twitter`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `kol_youtube` varchar(255)   AFTER `kol_tiktok`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `kol_blog` varchar(255)   AFTER `kol_youtube`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `kol_website` varchar(255)   AFTER `kol_blog`;
ALTER TABLE `mst_kol` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(14)   AFTER `kol_website`;


ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `koltype_id` varchar(10)    AFTER `kol_id`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `kol_name` varchar(60) NOT NULL   AFTER `koltype_id`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `kol_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `kol_name`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `kol_picture` varchar(90)    AFTER `kol_isdisabled`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `kol_birthplace` varchar(30)    AFTER `kol_picture`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `kol_birthdate` date    AFTER `kol_birthplace`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `gender_id` varchar(1)    AFTER `kol_birthdate`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `religion_id` varchar(3)    AFTER `gender_id`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `kol_city` varchar(20)    AFTER `religion_id`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `kol_instagram` varchar(255)    AFTER `kol_city`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `kol_facebook` varchar(255)    AFTER `kol_instagram`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `kol_twitter` varchar(255)    AFTER `kol_facebook`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `kol_tiktok` varchar(255)    AFTER `kol_twitter`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `kol_youtube` varchar(255)    AFTER `kol_tiktok`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `kol_blog` varchar(255)    AFTER `kol_youtube`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `kol_website` varchar(255)    AFTER `kol_blog`;
ALTER TABLE `mst_kol` MODIFY COLUMN IF EXISTS  `partner_id` varchar(14)    AFTER `kol_website`;



ALTER TABLE `mst_kol` ADD KEY IF NOT EXISTS `koltype_id` (`koltype_id`);
ALTER TABLE `mst_kol` ADD KEY IF NOT EXISTS `gender_id` (`gender_id`);
ALTER TABLE `mst_kol` ADD KEY IF NOT EXISTS `religion_id` (`religion_id`);
ALTER TABLE `mst_kol` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);

ALTER TABLE `mst_kol` ADD CONSTRAINT `fk_mst_kol_mst_koltype` FOREIGN KEY IF NOT EXISTS  (`koltype_id`) REFERENCES `mst_koltype` (`koltype_id`);
ALTER TABLE `mst_kol` ADD CONSTRAINT `fk_mst_kol_mst_gender` FOREIGN KEY IF NOT EXISTS  (`gender_id`) REFERENCES `mst_gender` (`gender_id`);
ALTER TABLE `mst_kol` ADD CONSTRAINT `fk_mst_kol_mst_religion` FOREIGN KEY IF NOT EXISTS  (`religion_id`) REFERENCES `mst_religion` (`religion_id`);
ALTER TABLE `mst_kol` ADD CONSTRAINT `fk_mst_kol_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);





