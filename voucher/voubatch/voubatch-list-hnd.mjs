let grd_list, opt;
var this_page_id;
var this_page_options;

export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	
	fn_callback();
}

export function grd_list_rowrender(row) {
	// {td:td, mapping:td.mapping, text:td.innerHTML}
	// console.log(row.record.voubatch_status)
	if (row.record.voubatch_status=='expired') {
		row.td.classList.add('row-expired')
	} else if (row.record.voubatch_status=='pending') {
		row.td.classList.add('row-pending')
	} else {
	}


	if (row.mapping=='voubatch_icon') {
		if (row.record.voubatch_isondemand==1) {
			row.td.innerHTML = '<div class="wa-icon"></div>'
		} else {
			row.td.innerHTML = '&nbsp;'
		}
	}
}