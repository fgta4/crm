let grd_list, opt;
var this_page_id;
var this_page_options;

export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	
	// tambah tombol upload 
	$('#pnl_list-pnl_head .list-buttonbaru').prepend(`<a href="javascript:void(0)" id="pnl_list-btn_upload" class="easyui-linkbutton c8" style="width: 60px">Upload</a>`);
	$('#pnl_list-btn_upload').linkbutton({
		onClick: () => { btn_upload_click() }
	})

	fn_callback();
}

function btn_upload_click() {
	// $ui.getPages().ITEMS['pnl_editupload'].handler.open(record, trid, viewmode, (err)=> {
	// 	if (err) {
	// 		console.log(err)
	// 	} else {
			
	// 	}
	// })

	$ui.getPages().show('pnl_editupload', ()=>{
		console.log('test');
	})	
}	