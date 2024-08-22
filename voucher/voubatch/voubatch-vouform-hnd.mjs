let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}



export function form_dataopened(result, options) {
	console.log(result);

	var imgvou = document.getElementById('pnl_editvouform-fl_vou_file_img');
	var btndownload = document.getElementById('pnl_editvouform-btn_download');

	btndownload.download = result.record.vou_file;
	btndownload.href = imgvou.src;

	//console.log(imgvou.src);
}
	
	