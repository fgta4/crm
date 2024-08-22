-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_media`;


CREATE TABLE IF NOT EXISTS `mst_media` (
	`media_id` varchar(30) NOT NULL , 
	`media_name` varchar(60) NOT NULL , 
	`media_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`media_city` varchar(20)  , 
	`media_instagram` varchar(255)  , 
	`media_facebook` varchar(255)  , 
	`media_twitter` varchar(255)  , 
	`media_tiktok` varchar(255)  , 
	`media_youtube` varchar(255)  , 
	`media_blog` varchar(255)  , 
	`media_website` varchar(255)  , 
	`partner_id` varchar(14)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`media_id`)
) 
ENGINE=InnoDB
COMMENT='Master Media';


ALTER TABLE `mst_media` ADD COLUMN IF NOT EXISTS  `media_name` varchar(60) NOT NULL  AFTER `media_id`;
ALTER TABLE `mst_media` ADD COLUMN IF NOT EXISTS  `media_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `media_name`;
ALTER TABLE `mst_media` ADD COLUMN IF NOT EXISTS  `media_city` varchar(20)   AFTER `media_isdisabled`;
ALTER TABLE `mst_media` ADD COLUMN IF NOT EXISTS  `media_instagram` varchar(255)   AFTER `media_city`;
ALTER TABLE `mst_media` ADD COLUMN IF NOT EXISTS  `media_facebook` varchar(255)   AFTER `media_instagram`;
ALTER TABLE `mst_media` ADD COLUMN IF NOT EXISTS  `media_twitter` varchar(255)   AFTER `media_facebook`;
ALTER TABLE `mst_media` ADD COLUMN IF NOT EXISTS  `media_tiktok` varchar(255)   AFTER `media_twitter`;
ALTER TABLE `mst_media` ADD COLUMN IF NOT EXISTS  `media_youtube` varchar(255)   AFTER `media_tiktok`;
ALTER TABLE `mst_media` ADD COLUMN IF NOT EXISTS  `media_blog` varchar(255)   AFTER `media_youtube`;
ALTER TABLE `mst_media` ADD COLUMN IF NOT EXISTS  `media_website` varchar(255)   AFTER `media_blog`;
ALTER TABLE `mst_media` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(14)   AFTER `media_website`;


ALTER TABLE `mst_media` MODIFY COLUMN IF EXISTS  `media_name` varchar(60) NOT NULL   AFTER `media_id`;
ALTER TABLE `mst_media` MODIFY COLUMN IF EXISTS  `media_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `media_name`;
ALTER TABLE `mst_media` MODIFY COLUMN IF EXISTS  `media_city` varchar(20)    AFTER `media_isdisabled`;
ALTER TABLE `mst_media` MODIFY COLUMN IF EXISTS  `media_instagram` varchar(255)    AFTER `media_city`;
ALTER TABLE `mst_media` MODIFY COLUMN IF EXISTS  `media_facebook` varchar(255)    AFTER `media_instagram`;
ALTER TABLE `mst_media` MODIFY COLUMN IF EXISTS  `media_twitter` varchar(255)    AFTER `media_facebook`;
ALTER TABLE `mst_media` MODIFY COLUMN IF EXISTS  `media_tiktok` varchar(255)    AFTER `media_twitter`;
ALTER TABLE `mst_media` MODIFY COLUMN IF EXISTS  `media_youtube` varchar(255)    AFTER `media_tiktok`;
ALTER TABLE `mst_media` MODIFY COLUMN IF EXISTS  `media_blog` varchar(255)    AFTER `media_youtube`;
ALTER TABLE `mst_media` MODIFY COLUMN IF EXISTS  `media_website` varchar(255)    AFTER `media_blog`;
ALTER TABLE `mst_media` MODIFY COLUMN IF EXISTS  `partner_id` varchar(14)    AFTER `media_website`;



ALTER TABLE `mst_media` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);

ALTER TABLE `mst_media` ADD CONSTRAINT `fk_mst_media_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);





