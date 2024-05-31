let grd_list, opt;
var this_page_id;
var this_page_options;

const btn_upload = $(`<a id="pnl_edittargetgrid-upload" href="javascript:void(0)" style="margin-left: 5px" class="easyui-linkbutton c8">Upload</a>`).insertAfter('#pnl_edittargetgrid-addrow');


let header_data;


export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	btn_upload.linkbutton({ onClick: () => { btn_upload_click() } });

	
	fn_callback();
}


export function OpenDetil(data, result, options) {
	header_data = data;

}
	
async function btn_upload_click() {
	$ui.getPages().show('pnl_editupload', ()=>{
		$ui.getPages().ITEMS['pnl_editupload'].handler.OpenDetil(header_data)
	})	
}