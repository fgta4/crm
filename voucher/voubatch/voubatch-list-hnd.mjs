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

	var color = 'white';
	if (row.record.voubatch_isgenerate==1) {
		if (row.record.voubatch_status=='expired') {
			// generated and expired: grey
			color = 'grey';
		} else if (row.record.voubatch_status=='pending') {
			// generated and not yet started: yellow
			color = 'yellow';
		} else {
			// generated and started: green
			color = 'green';
		}
	} else {
		// not yet generated: red
		color = 'red';
	}

	if (row.record.voubatch_status=='expired') {
		row.td.classList.add('row-expired')
	} else if (row.record.voubatch_status=='pending') {
		row.td.classList.add('row-pending')
	} else {
	}


	if (row.mapping=='voubatch_icon_wa') {
		if (row.record.voubatch_isondemand==1) {
			row.td.innerHTML = '<div class="wa-icon"></div>'
		} else {
			row.td.innerHTML = '&nbsp;'
		}
	} else if (row.mapping=='voubatch_icon_mul') { 
		if (row.record.voubatch_isusecodeact==1) {
			row.td.innerHTML = '<div class="mul-icon"></div>'
		} else {
			row.td.innerHTML = '&nbsp;'
		}
	} else if (row.mapping=='voubatch_icon_sta') {
			row.td.innerHTML = `<div class="circle" style="background-color: ${color}"></div>`
	}


}