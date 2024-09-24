DROP PROCEDURE IF EXISTS vou_create;

DELIMITER //



CREATE PROCEDURE `vou_create`(
	in in_temp_vou_id varchar(30),
	in in_voubatch_id varchar(5)
)
begin
	
	declare p_temp_vou_id varchar(30);
	declare p_voubatch_id varchar(5);
	declare p_vou_no int;
	declare p_vou_code varchar(3);

	declare p_voutype_id varchar(5);
	declare p_dtactive date;
	declare p_dtexpired date;
	declare p_vou_value decimal(16,2);
	declare p_rndmin int; 
	declare p_rndmax int;


	set p_temp_vou_id = in_temp_vou_id;
	set p_voubatch_id = in_voubatch_id;

	delete from mst_vou where voubatch_id=p_voubatch_id and vou_id=p_temp_vou_id;

	START TRANSACTION;

	select COALESCE (max(vou_no), 0) + 1
	into p_vou_no
	from mst_vou 
	where voubatch_id = p_voubatch_id;

	
	select 
	voutype_id, voubatch_dtactive, voubatch_dtexpired, voubatch_value, voubatch_code
	into p_voutype_id, p_dtactive, p_dtexpired, p_vou_value, p_vou_code
	from mst_voubatch 
	where voubatch_id = p_voubatch_id;


	insert into mst_vou 
	(vou_id, vou_no, vou_value, vou_ran, vou_parity, vou_infocode, vou_infocoderan, vou_infocodeparity, vou_dtactive, vou_dtexpired, voubatch_id, _createby)
	values 
	(p_temp_vou_id, p_vou_no, p_vou_value, 0, 0, 'TEMP', '00', '00', p_dtactive, p_dtexpired, p_voubatch_id, '62be99e37643a');
	

	select 
	voutype_randalocstart, voutype_randalocend
	into p_rndmin, p_rndmax
	from mst_voutype 
	where voutype_id = p_voutype_id;

	
	
	
	select 
	A.vou_no, A.vou_value, p_voutype_id as voutype_id,
	p_rndmin as rndmin, p_rndmax as rndmax,
	p_vou_code as voubatch_code
	from mst_vou A
	where A.vou_id = p_temp_vou_id;

	COMMIT;
	
end //


DELIMITER ;




