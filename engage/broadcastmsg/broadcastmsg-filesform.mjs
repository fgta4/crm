var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './broadcastmsg-filesform-hnd.mjs'

const reload_header_modified = true;


const txt_title = $('#pnl_editfilesform-title')
const btn_edit = $('#pnl_editfilesform-btn_edit')
const btn_save = $('#pnl_editfilesform-btn_save')
const btn_delete = $('#pnl_editfilesform-btn_delete')
const btn_prev = $('#pnl_editfilesform-btn_prev')
const btn_next = $('#pnl_editfilesform-btn_next')
const btn_addnew = $('#pnl_editfilesform-btn_addnew')
const chk_autoadd = $('#pnl_editfilesform-autoadd')

const fl_broadcastmsgfiles_file_img = $('#pnl_editfilesform-fl_broadcastmsgfiles_file_img');
const fl_broadcastmsgfiles_file_lnk = $('#pnl_editfilesform-fl_broadcastmsgfiles_file_link');				
			

const pnl_form = $('#pnl_editfilesform-form')
const obj = {
	txt_broadcastmsgfiles_id: $('#pnl_editfilesform-txt_broadcastmsgfiles_id'),
	cbo_doctype_id: $('#pnl_editfilesform-cbo_doctype_id'),
	txt_broadcastmsgfiles_descr: $('#pnl_editfilesform-txt_broadcastmsgfiles_descr'),
	txt_broadcastmsgfiles_order: $('#pnl_editfilesform-txt_broadcastmsgfiles_order'),
	fl_broadcastmsgfiles_file: $('#pnl_editfilesform-fl_broadcastmsgfiles_file'),
	txt_broadcastmsg_id: $('#pnl_editfilesform-txt_broadcastmsg_id')
}


let form;
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_broadcastmsgfiles_id,
		autoid: true,
		logview: 'trn_broadcastmsgfiles',
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) }
	});
	form.getHeaderData = () => {
		return header_data;
	}	

	form.AllowAddRecord = true
	form.AllowRemoveRecord = true
	form.AllowEditRecord = true
	form.CreateRecordStatusPage(this_page_id)
	form.CreateLogPage(this_page_id)


	obj.fl_broadcastmsgfiles_file.filebox({
		onChange: function(value) {
			var files = obj.fl_broadcastmsgfiles_file.filebox('files');
			var f = files[0];
			var reader = new FileReader();
			reader.onload = (function(loaded) {
				return function(e) {
					if (loaded.type.startsWith('image')) {
						var image = new Image();
						image.src = e.target.result;
						image.onload = function() {
							fl_broadcastmsgfiles_file_img.attr('src', e.target.result);
							fl_broadcastmsgfiles_file_img.show();
							fl_broadcastmsgfiles_file_lnk.hide();
						}
					} else {
						fl_broadcastmsgfiles_file_img.hide();
						fl_broadcastmsgfiles_file_lnk.hide();
					}
				}
			})(f);
			if (f!==undefined) { reader.readAsDataURL(f) }
		}
	})				
			



	obj.cbo_doctype_id.name = 'pnl_editfilesform-cbo_doctype_id'		
	new fgta4slideselect(obj.cbo_doctype_id, {
		title: 'Pilih doctype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_doctype_id,
		fieldValue: 'doctype_id',
		fieldValueMap: 'doctype_id',
		fieldDisplay: 'doctype_name',
		fields: [
			{mapping: 'doctype_id', text: 'doctype_id'},
			{mapping: 'doctype_name', text: 'doctype_name'},
		],
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd!=='undefined') { 
				if (typeof hnd.cbo_doctype_id_dataloading === 'function') {
					hnd.cbo_doctype_id_dataloading(criteria, options);
				}
			}
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd!=='undefined') { 
				if (typeof hnd.cbo_doctype_id_dataloaded === 'function') {
					hnd.cbo_doctype_id_dataloaded(result, options);
				}
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd!=='undefined') {  
					if (typeof hnd.cbo_doctype_id_selected === 'function') {
						hnd.cbo_doctype_id_selected(value, display, record, args);
					}
				}
			}			
		}
	})				
			


	btn_addnew.linkbutton({ onClick: () => { btn_addnew_click() }  })
	btn_prev.linkbutton({ onClick: () => { btn_prev_click() } })
	btn_next.linkbutton({ onClick: () => { btn_next_click() } })

	document.addEventListener('keydown', (ev)=>{
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (ev.code=='KeyS' && ev.ctrlKey==true) {
				if (!form.isInViewMode()) {
					form.btn_save_click();
				}
				ev.stopPropagation()
				ev.preventDefault()
			}
		}
	}, true)
	
	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_editfilesgrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_editfilesgrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_editfilesgrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_editfilesgrid'].handler.scrolllast()
				})
			}
		
		}		
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})
	
	
	document.addEventListener('OnViewModeChanged', (ev) => {
		if (ev.detail.viewmode===true) {
			form.lock(true)
			btn_addnew.allow = false
			btn_addnew.linkbutton('disable')
			chk_autoadd.attr("disabled", true);	
			chk_autoadd.prop("checked", false);			
		} else {
			form.lock(false)
			btn_addnew.allow = true
			btn_addnew.linkbutton('enable')
			chk_autoadd.removeAttr("disabled");
			chk_autoadd.prop("checked", false);
		}
	})

	if (typeof hnd.init==='function') {
		hnd.init({
			form: form,
			obj: obj,
			opt: opt
		})
	}

}


export function OnSizeRecalculated(width, height) {
}


export function getForm() {
	return form
}

export function open(data, rowid, hdata) {
	// console.log(header_data)
	txt_title.html(hdata.broadcastmsg_descr)
	header_data = hdata

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/files-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(result.record);
/*

*/
		for (var objid in obj) {
			let o = obj[objid]
			if (o.isCombo() && !o.isRequired()) {
				var value =  result.record[o.getFieldValueName()];
				if (value==null ) {
					record[o.getFieldValueName()] = pOpt.value;
					record[o.getFieldDisplayName()] = pOpt.text;
				}
			}
		}
		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_doctype_id, record.doctype_id, record.doctype_name)
			.setViewMode()
			.rowid = rowid



		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/ 
		if (typeof hnd.form_dataopened == 'function') {
			hnd.form_dataopened(result, options);
		}


		form.commit()
		form.SuspendEvent(false);


		// Editable
		if (form.AllowEditRecord!=true) {
			btn_edit.hide();
			btn_save.hide();
			btn_delete.hide();
		}
		

		// tambah baris
		if (form.AllowAddRecord) {
			btn_addnew.show()
		} else {
			btn_addnew.hide()
		}	

		// hapus baris
		if (form.AllowRemoveRecord) {
			btn_delete.show()
		} else {
			btn_delete.hide()
		}

		var prevnode = $(`#${rowid}`).prev()
		if (prevnode.length>0) {
			btn_prev.linkbutton('enable')
		} else {
			btn_prev.linkbutton('disable')
		}

		var nextode = $(`#${rowid}`).next()
		if (nextode.length>0) {
			btn_next.linkbutton('enable')
		} else {
			btn_next.linkbutton('disable')
		}		
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)	
}

export function createnew(hdata) {
	header_data = hdata

	txt_title.html('Create New Row')
	form.createnew(async (data, options)=>{
		data.broadcastmsg_id= hdata.broadcastmsg_id
		data.files_value = 0

		data.broadcastmsgfiles_order = 0

		data.doctype_id = '0'
		data.doctype_name = '-- PILIH --'

		if (typeof hnd.form_newdata == 'function') {
			hnd.form_newdata(data, options);
		}

		fl_broadcastmsgfiles_file_img.hide();
		fl_broadcastmsgfiles_file_lnk.hide();	
		obj.fl_broadcastmsgfiles_file.filebox('clear');		
			

		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editfilesgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/files-save`

	// options.skipmappingresponse = [];
	options.skipmappingresponse = [];
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var id = o.getFieldValueName()
			options.skipmappingresponse.push(id)
			console.log(id)
		}
	}

	if (typeof hnd.form_datasaving == 'function') {
		hnd.form_datasaving(data, options);
	}	
}

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	/*

	*/

	var pOpt = form.getDefaultPrompt(false)
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var value =  result.dataresponse[o.getFieldValueName()];
			var text = result.dataresponse[o.getFieldDisplayName()];
			if (value==null ) {
				value = pOpt.value;
				text = pOpt.text;
			}
			form.setValue(o, value, text);
		}
	}
	form.rowid = $ui.getPages().ITEMS['pnl_editfilesgrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
			$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
		});	
	}

	if (typeof hnd.form_datasaved == 'function') {
		hnd.form_datasaved(result, rowdata, options);
	}

}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/files-delete`
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data);
	}
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editfilesgrid', ()=>{
		$ui.getPages().ITEMS['pnl_editfilesgrid'].handler.removerow(form.rowid)
	});

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
			$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
		});	
	}

	if (typeof hnd.form_deleted == 'function') {
		hnd.form_deleted(result, options);
	}
	
}

function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

	obj.fl_broadcastmsgfiles_file.filebox('clear');			
	if (record.broadcastmsgfiles_file_doc!=undefined) {
		if (record.broadcastmsgfiles_file_doc.type.startsWith('image')) {
			fl_broadcastmsgfiles_file_lnk.hide();
			fl_broadcastmsgfiles_file_img.show();
			fl_broadcastmsgfiles_file_img.attr('src', record.broadcastmsgfiles_file_doc.attachmentdata);
		} else {
			fl_broadcastmsgfiles_file_img.hide();
			fl_broadcastmsgfiles_file_lnk.show();
			fl_broadcastmsgfiles_file_lnk[0].onclick = () => {
				fl_broadcastmsgfiles_file_lnk.attr('download', record.broadcastmsgfiles_file_doc.name);
				fl_broadcastmsgfiles_file_lnk.attr('href', record.broadcastmsgfiles_file_doc.attachmentdata);
			}
		}	
	} else {
		fl_broadcastmsgfiles_file_img.hide();
		fl_broadcastmsgfiles_file_lnk.hide();			
	}				
			
}

function form_viewmodechanged(viewonly) {
	if (viewonly) {
		btn_prev.linkbutton('enable')
		btn_next.linkbutton('enable')
		if (btn_addnew.allow) {
			btn_addnew.linkbutton('enable')
		} else {
			btn_addnew.linkbutton('disable')
		}
	} else {
		btn_prev.linkbutton('disable')
		btn_next.linkbutton('disable')
		btn_addnew.linkbutton('disable')
	}
}


function form_idsetup(options) {
	var objid = obj.txt_broadcastmsgfiles_id
	switch (options.action) {
		case 'fill' :
			objid.textbox('disable') 
			break;

		case 'createnew' :
			// console.log('new')
			if (form.autoid) {
				objid.textbox('disable') 
				objid.textbox('setText', '[AUTO]') 
			} else {
				objid.textbox('enable') 
			}
			break;
			
		case 'save' :
			objid.textbox('disable') 
			break;	
	}
}

function btn_addnew_click() {
	createnew(header_data)
}


function btn_prev_click() {
	var prevode = $(`#${form.rowid}`).prev()
	if (prevode.length==0) {
		return
	} 
	
	var trid = prevode.attr('id')
	var dataid = prevode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editfilesgrid'].handler.getGrid().DATA[dataid]

	if (form.isDataChanged()) {
		var datachangemessage = form.getDataChangeMessage();
		$ui.ShowMessage(datachangemessage, {
			"Ya" : () => {
				open(record, trid, header_data);
			},
			"Tidak" : () => {}
		})
	} else {
		open(record, trid, header_data);
	}
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editfilesgrid'].handler.getGrid().DATA[dataid]

	if (form.isDataChanged()) {
		var datachangemessage = form.getDataChangeMessage();
		$ui.ShowMessage(datachangemessage, {
			"Ya" : () => {
				open(record, trid, header_data);
			},
			"Tidak" : () => {}
		})
	} else {
		open(record, trid, header_data);
	}
}