-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_broadcastmsg`;
-- drop table if exists `trn_broadcastmsgcust`;
-- drop table if exists `trn_broadcastmsgresult`;
-- drop table if exists `trn_broadcastmsgfiles`;
-- drop table if exists `trn_broadcastmsgappr`;


CREATE TABLE IF NOT EXISTS `trn_broadcastmsg` (
	`broadcastmsg_id` varchar(14) NOT NULL , 
	`broadcasttype_id` varchar(14) NOT NULL , 
	`broadcastmsg_dtstart` date NOT NULL , 
	`broadcastmsg_descr` varchar(255)  , 
	`broadcastmsg_template` varchar(1000)  , 
	`broadcastmsg_file` varchar(90)  , 
	`user_dept_id` varchar(30) NOT NULL , 
	`unit_id` varchar(30)  , 
	`project_id` varchar(30)  , 
	`projecttask_id` varchar(14)  , 
	`projbudget_id` varchar(30)  , 
	`projbudgettask_id` varchar(14)  , 
	`broadcastmsg_isunbudgetted` tinyint(1) NOT NULL DEFAULT 0, 
	`broadcasttype_costpermessage` decimal(12, 0) NOT NULL DEFAULT 0, 
	`broadcasttype_creditpermessage` decimal(12, 0) NOT NULL DEFAULT 0, 
	`broadcastmsg_custcount` decimal(12, 0) NOT NULL DEFAULT 0, 
	`broadcastmsg_rejectcount` decimal(12, 0) NOT NULL DEFAULT 0, 
	`broadcastmsg_sendcount` decimal(12, 0) NOT NULL DEFAULT 0, 
	`broadcastmsg_totalcost` decimal(12, 0) NOT NULL DEFAULT 0, 
	`broadcastmsg_totalcredit` decimal(12, 0) NOT NULL DEFAULT 0, 
	`broadcastquota_id` varchar(14)  , 
	`partner_id` varchar(30)  , 
	`empl_id` varchar(30)  , 
	`broadcastmsg_custcountdelv` decimal(12, 0) NOT NULL DEFAULT 0, 
	`broadcastmsg_delvpercent` decimal(12, 0) NOT NULL DEFAULT 0, 
	`cost_accbudget_id` varchar(20)  , 
	`cost_coa_id` varchar(17)  , 
	`prepaid_accbudget_id` varchar(20)  , 
	`prepaid_coa_id` varchar(17)  , 
	`broadcastmodel_id` varchar(10) NOT NULL , 
	`process_dept_id` varchar(30) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`broadcastmsg_version` int(4) NOT NULL DEFAULT 0, 
	`broadcastmsg_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`broadcastmsg_commitby` varchar(14)  , 
	`broadcastmsg_commitdate` datetime  , 
	`broadcastmsg_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`broadcastmsg_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`broadcastmsg_approveby` varchar(14)  , 
	`broadcastmsg_approvedate` datetime  , 
	`broadcastmsg_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`broadcastmsg_declineby` varchar(14)  , 
	`broadcastmsg_declinedate` datetime  , 
	`broadcastmsg_isexecute` tinyint(1) NOT NULL DEFAULT 0, 
	`broadcastmsg_executeby` varchar(14)  , 
	`broadcastmsg_executedate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`broadcastmsg_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Broadcast';


ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcasttype_id` varchar(14) NOT NULL  AFTER `broadcastmsg_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_dtstart` date NOT NULL  AFTER `broadcasttype_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_descr` varchar(255)   AFTER `broadcastmsg_dtstart`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_template` varchar(1000)   AFTER `broadcastmsg_descr`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_file` varchar(90)   AFTER `broadcastmsg_template`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `user_dept_id` varchar(30) NOT NULL  AFTER `broadcastmsg_file`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(30)   AFTER `user_dept_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `project_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `projecttask_id` varchar(14)   AFTER `project_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `projbudget_id` varchar(30)   AFTER `projecttask_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `projbudgettask_id` varchar(14)   AFTER `projbudget_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_isunbudgetted` tinyint(1) NOT NULL DEFAULT 0 AFTER `projbudgettask_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcasttype_costpermessage` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastmsg_isunbudgetted`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcasttype_creditpermessage` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcasttype_costpermessage`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_custcount` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcasttype_creditpermessage`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_rejectcount` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastmsg_custcount`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_sendcount` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastmsg_rejectcount`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_totalcost` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastmsg_sendcount`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_totalcredit` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastmsg_totalcost`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastquota_id` varchar(14)   AFTER `broadcastmsg_totalcredit`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(30)   AFTER `broadcastquota_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `empl_id` varchar(30)   AFTER `partner_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_custcountdelv` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `empl_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_delvpercent` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastmsg_custcountdelv`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `cost_accbudget_id` varchar(20)   AFTER `broadcastmsg_delvpercent`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `cost_coa_id` varchar(17)   AFTER `cost_accbudget_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `prepaid_accbudget_id` varchar(20)   AFTER `cost_coa_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `prepaid_coa_id` varchar(17)   AFTER `prepaid_accbudget_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmodel_id` varchar(10) NOT NULL  AFTER `prepaid_coa_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `process_dept_id` varchar(30) NOT NULL  AFTER `broadcastmodel_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `process_dept_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_version` int(4) NOT NULL DEFAULT 0 AFTER `doc_id`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsg_version`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_commitby` varchar(14)   AFTER `broadcastmsg_iscommit`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_commitdate` datetime   AFTER `broadcastmsg_commitby`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsg_commitdate`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsg_isapprovalprogress`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_approveby` varchar(14)   AFTER `broadcastmsg_isapproved`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_approvedate` datetime   AFTER `broadcastmsg_approveby`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsg_approvedate`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_declineby` varchar(14)   AFTER `broadcastmsg_isdeclined`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_declinedate` datetime   AFTER `broadcastmsg_declineby`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_isexecute` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsg_declinedate`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_executeby` varchar(14)   AFTER `broadcastmsg_isexecute`;
ALTER TABLE `trn_broadcastmsg` ADD COLUMN IF NOT EXISTS  `broadcastmsg_executedate` datetime   AFTER `broadcastmsg_executeby`;


ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcasttype_id` varchar(14) NOT NULL  AFTER `broadcastmsg_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_dtstart` date NOT NULL  AFTER `broadcasttype_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_descr` varchar(255)   AFTER `broadcastmsg_dtstart`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_template` varchar(1000)   AFTER `broadcastmsg_descr`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_file` varchar(90)   AFTER `broadcastmsg_template`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `user_dept_id` varchar(30) NOT NULL  AFTER `broadcastmsg_file`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `unit_id` varchar(30)   AFTER `user_dept_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `project_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `projecttask_id` varchar(14)   AFTER `project_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `projbudget_id` varchar(30)   AFTER `projecttask_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `projbudgettask_id` varchar(14)   AFTER `projbudget_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_isunbudgetted` tinyint(1) NOT NULL DEFAULT 0 AFTER `projbudgettask_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcasttype_costpermessage` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastmsg_isunbudgetted`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcasttype_creditpermessage` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcasttype_costpermessage`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_custcount` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcasttype_creditpermessage`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_rejectcount` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastmsg_custcount`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_sendcount` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastmsg_rejectcount`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_totalcost` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastmsg_sendcount`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_totalcredit` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastmsg_totalcost`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastquota_id` varchar(14)   AFTER `broadcastmsg_totalcredit`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `partner_id` varchar(30)   AFTER `broadcastquota_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `empl_id` varchar(30)   AFTER `partner_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_custcountdelv` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `empl_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_delvpercent` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `broadcastmsg_custcountdelv`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `cost_accbudget_id` varchar(20)   AFTER `broadcastmsg_delvpercent`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `cost_coa_id` varchar(17)   AFTER `cost_accbudget_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `prepaid_accbudget_id` varchar(20)   AFTER `cost_coa_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `prepaid_coa_id` varchar(17)   AFTER `prepaid_accbudget_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmodel_id` varchar(10) NOT NULL  AFTER `prepaid_coa_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `process_dept_id` varchar(30) NOT NULL  AFTER `broadcastmodel_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `process_dept_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_version` int(4) NOT NULL DEFAULT 0 AFTER `doc_id`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsg_version`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_commitby` varchar(14)   AFTER `broadcastmsg_iscommit`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_commitdate` datetime   AFTER `broadcastmsg_commitby`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsg_commitdate`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsg_isapprovalprogress`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_approveby` varchar(14)   AFTER `broadcastmsg_isapproved`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_approvedate` datetime   AFTER `broadcastmsg_approveby`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsg_approvedate`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_declineby` varchar(14)   AFTER `broadcastmsg_isdeclined`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_declinedate` datetime   AFTER `broadcastmsg_declineby`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_isexecute` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsg_declinedate`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_executeby` varchar(14)   AFTER `broadcastmsg_isexecute`;
ALTER TABLE `trn_broadcastmsg` MODIFY COLUMN IF EXISTS  `broadcastmsg_executedate` datetime   AFTER `broadcastmsg_executeby`;



ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `broadcasttype_id` (`broadcasttype_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `user_dept_id` (`user_dept_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `project_id` (`project_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `projecttask_id` (`projecttask_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `projbudget_id` (`projbudget_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `projbudgettask_id` (`projbudgettask_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `broadcastquota_id` (`broadcastquota_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `empl_id` (`empl_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `cost_accbudget_id` (`cost_accbudget_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `cost_coa_id` (`cost_coa_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `prepaid_accbudget_id` (`prepaid_accbudget_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `prepaid_coa_id` (`prepaid_coa_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `broadcastmodel_id` (`broadcastmodel_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `process_dept_id` (`process_dept_id`);
ALTER TABLE `trn_broadcastmsg` ADD KEY IF NOT EXISTS `doc_id` (`doc_id`);

ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_broadcasttype` FOREIGN KEY IF NOT EXISTS  (`broadcasttype_id`) REFERENCES `mst_broadcasttype` (`broadcasttype_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_dept` FOREIGN KEY IF NOT EXISTS  (`user_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_project` FOREIGN KEY IF NOT EXISTS  (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_projecttask` FOREIGN KEY IF NOT EXISTS  (`projecttask_id`) REFERENCES `mst_projecttask` (`projecttask_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_projbudget` FOREIGN KEY IF NOT EXISTS  (`projbudget_id`) REFERENCES `mst_projbudget` (`projbudget_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_projbudgettask` FOREIGN KEY IF NOT EXISTS  (`projbudgettask_id`) REFERENCES `mst_projbudgettask` (`projbudgettask_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_broadcastquota` FOREIGN KEY IF NOT EXISTS  (`broadcastquota_id`) REFERENCES `mst_broadcastquota` (`broadcastquota_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_empl` FOREIGN KEY IF NOT EXISTS  (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_accbudget` FOREIGN KEY IF NOT EXISTS  (`cost_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_coa` FOREIGN KEY IF NOT EXISTS  (`cost_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_accbudget_2` FOREIGN KEY IF NOT EXISTS  (`prepaid_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_coa_2` FOREIGN KEY IF NOT EXISTS  (`prepaid_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_broadcastmodel` FOREIGN KEY IF NOT EXISTS  (`broadcastmodel_id`) REFERENCES `mst_broadcastmodel` (`broadcastmodel_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`process_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_broadcastmsg` ADD CONSTRAINT `fk_trn_broadcastmsg_mst_doc` FOREIGN KEY IF NOT EXISTS  (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE IF NOT EXISTS `trn_broadcastmsgcust` (
	`broadcastmsgcust_id` varchar(14) NOT NULL , 
	`broadcastmsgcust_name` varchar(60) NOT NULL , 
	`broadcastmsgcust_data` varchar(60) NOT NULL , 
	`broadcastmsgcust_isnew` tinyint(1) NOT NULL DEFAULT 0, 
	`broadcastmsgcust_isrecvoffer` tinyint(1) NOT NULL DEFAULT 0, 
	`broadcastmsgcust_reasonrejectoffer` varchar(255)  , 
	`broadcastmsgcust_var1` varchar(255)  , 
	`broadcastmsgcust_var2` varchar(255)  , 
	`broadcastmsgcust_var3` varchar(255)  , 
	`broadcastmsgcust_var4` varchar(255)  , 
	`broadcastmsgcust_var5` varchar(255)  , 
	`broadcastmsgcust_isfail` tinyint(1) NOT NULL DEFAULT 0, 
	`broadcastmsgcust_failreason` varchar(255)  , 
	`broadcastmsg_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`broadcastmsgcust_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Customer yang diBroadcast';


ALTER TABLE `trn_broadcastmsgcust` ADD COLUMN IF NOT EXISTS  `broadcastmsgcust_name` varchar(60) NOT NULL  AFTER `broadcastmsgcust_id`;
ALTER TABLE `trn_broadcastmsgcust` ADD COLUMN IF NOT EXISTS  `broadcastmsgcust_data` varchar(60) NOT NULL  AFTER `broadcastmsgcust_name`;
ALTER TABLE `trn_broadcastmsgcust` ADD COLUMN IF NOT EXISTS  `broadcastmsgcust_isnew` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsgcust_data`;
ALTER TABLE `trn_broadcastmsgcust` ADD COLUMN IF NOT EXISTS  `broadcastmsgcust_isrecvoffer` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsgcust_isnew`;
ALTER TABLE `trn_broadcastmsgcust` ADD COLUMN IF NOT EXISTS  `broadcastmsgcust_reasonrejectoffer` varchar(255)   AFTER `broadcastmsgcust_isrecvoffer`;
ALTER TABLE `trn_broadcastmsgcust` ADD COLUMN IF NOT EXISTS  `broadcastmsgcust_var1` varchar(255)   AFTER `broadcastmsgcust_reasonrejectoffer`;
ALTER TABLE `trn_broadcastmsgcust` ADD COLUMN IF NOT EXISTS  `broadcastmsgcust_var2` varchar(255)   AFTER `broadcastmsgcust_var1`;
ALTER TABLE `trn_broadcastmsgcust` ADD COLUMN IF NOT EXISTS  `broadcastmsgcust_var3` varchar(255)   AFTER `broadcastmsgcust_var2`;
ALTER TABLE `trn_broadcastmsgcust` ADD COLUMN IF NOT EXISTS  `broadcastmsgcust_var4` varchar(255)   AFTER `broadcastmsgcust_var3`;
ALTER TABLE `trn_broadcastmsgcust` ADD COLUMN IF NOT EXISTS  `broadcastmsgcust_var5` varchar(255)   AFTER `broadcastmsgcust_var4`;
ALTER TABLE `trn_broadcastmsgcust` ADD COLUMN IF NOT EXISTS  `broadcastmsgcust_isfail` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsgcust_var5`;
ALTER TABLE `trn_broadcastmsgcust` ADD COLUMN IF NOT EXISTS  `broadcastmsgcust_failreason` varchar(255)   AFTER `broadcastmsgcust_isfail`;
ALTER TABLE `trn_broadcastmsgcust` ADD COLUMN IF NOT EXISTS  `broadcastmsg_id` varchar(14) NOT NULL  AFTER `broadcastmsgcust_failreason`;


ALTER TABLE `trn_broadcastmsgcust` MODIFY COLUMN IF EXISTS  `broadcastmsgcust_name` varchar(60) NOT NULL  AFTER `broadcastmsgcust_id`;
ALTER TABLE `trn_broadcastmsgcust` MODIFY COLUMN IF EXISTS  `broadcastmsgcust_data` varchar(60) NOT NULL  AFTER `broadcastmsgcust_name`;
ALTER TABLE `trn_broadcastmsgcust` MODIFY COLUMN IF EXISTS  `broadcastmsgcust_isnew` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsgcust_data`;
ALTER TABLE `trn_broadcastmsgcust` MODIFY COLUMN IF EXISTS  `broadcastmsgcust_isrecvoffer` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsgcust_isnew`;
ALTER TABLE `trn_broadcastmsgcust` MODIFY COLUMN IF EXISTS  `broadcastmsgcust_reasonrejectoffer` varchar(255)   AFTER `broadcastmsgcust_isrecvoffer`;
ALTER TABLE `trn_broadcastmsgcust` MODIFY COLUMN IF EXISTS  `broadcastmsgcust_var1` varchar(255)   AFTER `broadcastmsgcust_reasonrejectoffer`;
ALTER TABLE `trn_broadcastmsgcust` MODIFY COLUMN IF EXISTS  `broadcastmsgcust_var2` varchar(255)   AFTER `broadcastmsgcust_var1`;
ALTER TABLE `trn_broadcastmsgcust` MODIFY COLUMN IF EXISTS  `broadcastmsgcust_var3` varchar(255)   AFTER `broadcastmsgcust_var2`;
ALTER TABLE `trn_broadcastmsgcust` MODIFY COLUMN IF EXISTS  `broadcastmsgcust_var4` varchar(255)   AFTER `broadcastmsgcust_var3`;
ALTER TABLE `trn_broadcastmsgcust` MODIFY COLUMN IF EXISTS  `broadcastmsgcust_var5` varchar(255)   AFTER `broadcastmsgcust_var4`;
ALTER TABLE `trn_broadcastmsgcust` MODIFY COLUMN IF EXISTS  `broadcastmsgcust_isfail` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsgcust_var5`;
ALTER TABLE `trn_broadcastmsgcust` MODIFY COLUMN IF EXISTS  `broadcastmsgcust_failreason` varchar(255)   AFTER `broadcastmsgcust_isfail`;
ALTER TABLE `trn_broadcastmsgcust` MODIFY COLUMN IF EXISTS  `broadcastmsg_id` varchar(14) NOT NULL  AFTER `broadcastmsgcust_failreason`;



ALTER TABLE `trn_broadcastmsgcust` ADD KEY IF NOT EXISTS `broadcastmsg_id` (`broadcastmsg_id`);

ALTER TABLE `trn_broadcastmsgcust` ADD CONSTRAINT `fk_trn_broadcastmsgcust_trn_broadcastmsg` FOREIGN KEY IF NOT EXISTS (`broadcastmsg_id`) REFERENCES `trn_broadcastmsg` (`broadcastmsg_id`);





CREATE TABLE IF NOT EXISTS `trn_broadcastmsgresult` (
	`broadcastmsgresult_id` varchar(14) NOT NULL , 
	`broadcastmsgresult_name` varchar(60) NOT NULL , 
	`broadcastmsgresult_data` varchar(60) NOT NULL , 
	`broadcastmsgresult_status` varchar(30)  , 
	`broadcastmsgresult_notes` varchar(255)  , 
	`broadcastmsg_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`broadcastmsgresult_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar FIle Broadcast Message';


ALTER TABLE `trn_broadcastmsgresult` ADD COLUMN IF NOT EXISTS  `broadcastmsgresult_name` varchar(60) NOT NULL  AFTER `broadcastmsgresult_id`;
ALTER TABLE `trn_broadcastmsgresult` ADD COLUMN IF NOT EXISTS  `broadcastmsgresult_data` varchar(60) NOT NULL  AFTER `broadcastmsgresult_name`;
ALTER TABLE `trn_broadcastmsgresult` ADD COLUMN IF NOT EXISTS  `broadcastmsgresult_status` varchar(30)   AFTER `broadcastmsgresult_data`;
ALTER TABLE `trn_broadcastmsgresult` ADD COLUMN IF NOT EXISTS  `broadcastmsgresult_notes` varchar(255)   AFTER `broadcastmsgresult_status`;
ALTER TABLE `trn_broadcastmsgresult` ADD COLUMN IF NOT EXISTS  `broadcastmsg_id` varchar(14) NOT NULL  AFTER `broadcastmsgresult_notes`;


ALTER TABLE `trn_broadcastmsgresult` MODIFY COLUMN IF EXISTS  `broadcastmsgresult_name` varchar(60) NOT NULL  AFTER `broadcastmsgresult_id`;
ALTER TABLE `trn_broadcastmsgresult` MODIFY COLUMN IF EXISTS  `broadcastmsgresult_data` varchar(60) NOT NULL  AFTER `broadcastmsgresult_name`;
ALTER TABLE `trn_broadcastmsgresult` MODIFY COLUMN IF EXISTS  `broadcastmsgresult_status` varchar(30)   AFTER `broadcastmsgresult_data`;
ALTER TABLE `trn_broadcastmsgresult` MODIFY COLUMN IF EXISTS  `broadcastmsgresult_notes` varchar(255)   AFTER `broadcastmsgresult_status`;
ALTER TABLE `trn_broadcastmsgresult` MODIFY COLUMN IF EXISTS  `broadcastmsg_id` varchar(14) NOT NULL  AFTER `broadcastmsgresult_notes`;



ALTER TABLE `trn_broadcastmsgresult` ADD KEY IF NOT EXISTS `broadcastmsg_id` (`broadcastmsg_id`);

ALTER TABLE `trn_broadcastmsgresult` ADD CONSTRAINT `fk_trn_broadcastmsgresult_trn_broadcastmsg` FOREIGN KEY IF NOT EXISTS (`broadcastmsg_id`) REFERENCES `trn_broadcastmsg` (`broadcastmsg_id`);





CREATE TABLE IF NOT EXISTS `trn_broadcastmsgfiles` (
	`broadcastmsgfiles_id` varchar(14) NOT NULL , 
	`doctype_id` varchar(10) NOT NULL , 
	`broadcastmsgfiles_descr` varchar(90) NOT NULL , 
	`broadcastmsgfiles_order` int(4) NOT NULL DEFAULT 0, 
	`broadcastmsgfiles_file` varchar(90)  , 
	`broadcastmsg_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`broadcastmsgfiles_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar FIle Broadcast Message';


ALTER TABLE `trn_broadcastmsgfiles` ADD COLUMN IF NOT EXISTS  `doctype_id` varchar(10) NOT NULL  AFTER `broadcastmsgfiles_id`;
ALTER TABLE `trn_broadcastmsgfiles` ADD COLUMN IF NOT EXISTS  `broadcastmsgfiles_descr` varchar(90) NOT NULL  AFTER `doctype_id`;
ALTER TABLE `trn_broadcastmsgfiles` ADD COLUMN IF NOT EXISTS  `broadcastmsgfiles_order` int(4) NOT NULL DEFAULT 0 AFTER `broadcastmsgfiles_descr`;
ALTER TABLE `trn_broadcastmsgfiles` ADD COLUMN IF NOT EXISTS  `broadcastmsgfiles_file` varchar(90)   AFTER `broadcastmsgfiles_order`;
ALTER TABLE `trn_broadcastmsgfiles` ADD COLUMN IF NOT EXISTS  `broadcastmsg_id` varchar(14) NOT NULL  AFTER `broadcastmsgfiles_file`;


ALTER TABLE `trn_broadcastmsgfiles` MODIFY COLUMN IF EXISTS  `doctype_id` varchar(10) NOT NULL  AFTER `broadcastmsgfiles_id`;
ALTER TABLE `trn_broadcastmsgfiles` MODIFY COLUMN IF EXISTS  `broadcastmsgfiles_descr` varchar(90) NOT NULL  AFTER `doctype_id`;
ALTER TABLE `trn_broadcastmsgfiles` MODIFY COLUMN IF EXISTS  `broadcastmsgfiles_order` int(4) NOT NULL DEFAULT 0 AFTER `broadcastmsgfiles_descr`;
ALTER TABLE `trn_broadcastmsgfiles` MODIFY COLUMN IF EXISTS  `broadcastmsgfiles_file` varchar(90)   AFTER `broadcastmsgfiles_order`;
ALTER TABLE `trn_broadcastmsgfiles` MODIFY COLUMN IF EXISTS  `broadcastmsg_id` varchar(14) NOT NULL  AFTER `broadcastmsgfiles_file`;



ALTER TABLE `trn_broadcastmsgfiles` ADD KEY IF NOT EXISTS `doctype_id` (`doctype_id`);
ALTER TABLE `trn_broadcastmsgfiles` ADD KEY IF NOT EXISTS `broadcastmsg_id` (`broadcastmsg_id`);

ALTER TABLE `trn_broadcastmsgfiles` ADD CONSTRAINT `fk_trn_broadcastmsgfiles_mst_doctype` FOREIGN KEY IF NOT EXISTS  (`doctype_id`) REFERENCES `mst_doctype` (`doctype_id`);
ALTER TABLE `trn_broadcastmsgfiles` ADD CONSTRAINT `fk_trn_broadcastmsgfiles_trn_broadcastmsg` FOREIGN KEY IF NOT EXISTS (`broadcastmsg_id`) REFERENCES `trn_broadcastmsg` (`broadcastmsg_id`);





CREATE TABLE IF NOT EXISTS `trn_broadcastmsgappr` (
	`broadcastmsgappr_id` varchar(14) NOT NULL , 
	`broadcastmsgappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`broadcastmsgappr_by` varchar(14)  , 
	`broadcastmsgappr_date` datetime  , 
	`broadcastmsg_version` int(4) NOT NULL DEFAULT 0, 
	`broadcastmsgappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`broadcastmsgappr_declinedby` varchar(14)  , 
	`broadcastmsgappr_declineddate` datetime  , 
	`broadcastmsgappr_notes` varchar(255)  , 
	`broadcastmsg_id` varchar(30) NOT NULL , 
	`docauth_descr` varchar(90)  , 
	`docauth_order` int(4) NOT NULL DEFAULT 0, 
	`docauth_value` int(4) NOT NULL DEFAULT 100, 
	`docauth_min` int(4) NOT NULL DEFAULT 0, 
	`authlevel_id` varchar(10) NOT NULL , 
	`authlevel_name` varchar(60) NOT NULL , 
	`auth_id` varchar(10)  , 
	`auth_name` varchar(60) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `broadcastmsg_auth_id` (`broadcastmsg_id`, `auth_id`),
	PRIMARY KEY (`broadcastmsgappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval Broadcast Type';


ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `broadcastmsgappr_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsgappr_id`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `broadcastmsgappr_by` varchar(14)   AFTER `broadcastmsgappr_isapproved`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `broadcastmsgappr_date` datetime   AFTER `broadcastmsgappr_by`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `broadcastmsg_version` int(4) NOT NULL DEFAULT 0 AFTER `broadcastmsgappr_date`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `broadcastmsgappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsg_version`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `broadcastmsgappr_declinedby` varchar(14)   AFTER `broadcastmsgappr_isdeclined`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `broadcastmsgappr_declineddate` datetime   AFTER `broadcastmsgappr_declinedby`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `broadcastmsgappr_notes` varchar(255)   AFTER `broadcastmsgappr_declineddate`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `broadcastmsg_id` varchar(30) NOT NULL  AFTER `broadcastmsgappr_notes`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `docauth_descr` varchar(90)   AFTER `broadcastmsg_id`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `docauth_order` int(4) NOT NULL DEFAULT 0 AFTER `docauth_descr`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `docauth_value` int(4) NOT NULL DEFAULT 100 AFTER `docauth_order`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `docauth_min` int(4) NOT NULL DEFAULT 0 AFTER `docauth_value`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `authlevel_id` varchar(10) NOT NULL  AFTER `docauth_min`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `authlevel_name` varchar(60) NOT NULL  AFTER `authlevel_id`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `auth_id` varchar(10)   AFTER `authlevel_name`;
ALTER TABLE `trn_broadcastmsgappr` ADD COLUMN IF NOT EXISTS  `auth_name` varchar(60) NOT NULL  AFTER `auth_id`;


ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `broadcastmsgappr_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsgappr_id`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `broadcastmsgappr_by` varchar(14)   AFTER `broadcastmsgappr_isapproved`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `broadcastmsgappr_date` datetime   AFTER `broadcastmsgappr_by`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `broadcastmsg_version` int(4) NOT NULL DEFAULT 0 AFTER `broadcastmsgappr_date`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `broadcastmsgappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `broadcastmsg_version`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `broadcastmsgappr_declinedby` varchar(14)   AFTER `broadcastmsgappr_isdeclined`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `broadcastmsgappr_declineddate` datetime   AFTER `broadcastmsgappr_declinedby`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `broadcastmsgappr_notes` varchar(255)   AFTER `broadcastmsgappr_declineddate`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `broadcastmsg_id` varchar(30) NOT NULL  AFTER `broadcastmsgappr_notes`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `docauth_descr` varchar(90)   AFTER `broadcastmsg_id`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `docauth_order` int(4) NOT NULL DEFAULT 0 AFTER `docauth_descr`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `docauth_value` int(4) NOT NULL DEFAULT 100 AFTER `docauth_order`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `docauth_min` int(4) NOT NULL DEFAULT 0 AFTER `docauth_value`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `authlevel_id` varchar(10) NOT NULL  AFTER `docauth_min`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `authlevel_name` varchar(60) NOT NULL  AFTER `authlevel_id`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `auth_id` varchar(10)   AFTER `authlevel_name`;
ALTER TABLE `trn_broadcastmsgappr` MODIFY COLUMN IF EXISTS  `auth_name` varchar(60) NOT NULL  AFTER `auth_id`;


ALTER TABLE `trn_broadcastmsgappr` ADD CONSTRAINT `broadcastmsg_auth_id` UNIQUE IF NOT EXISTS  (`broadcastmsg_id`, `auth_id`);

ALTER TABLE `trn_broadcastmsgappr` ADD KEY IF NOT EXISTS `broadcastmsg_id` (`broadcastmsg_id`);

ALTER TABLE `trn_broadcastmsgappr` ADD CONSTRAINT `fk_trn_broadcastmsgappr_trn_broadcastmsg` FOREIGN KEY IF NOT EXISTS (`broadcastmsg_id`) REFERENCES `trn_broadcastmsg` (`broadcastmsg_id`);





