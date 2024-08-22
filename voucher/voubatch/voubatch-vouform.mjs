var this_page_id;
var this_page_options;


import * as hnd from  './voubatch-vouform-hnd.mjs'

const reload_header_modified = true;

const txt_caption = $('#pnl_editvouform-caption')
const txt_title = $('#pnl_editvouform-title')
const btn_edit = $('#pnl_editvouform-btn_edit')
const btn_save = $('#pnl_editvouform-btn_save')
const btn_delete = $('#pnl_editvouform-btn_delete')
const btn_prev = $('#pnl_editvouform-btn_prev')
const btn_next = $('#pnl_editvouform-btn_next')
const btn_addnew = $('#pnl_editvouform-btn_addnew')
const chk_autoadd = $('#pnl_editvouform-autoadd')

const fl_vou_file_img = $('#pnl_editvouform-fl_vou_file_img');
const fl_vou_file_lnk = $('#pnl_editvouform-fl_vou_file_link');				
			

const pnl_form = $('#pnl_editvouform-form')
const obj = {
	txt_vou_id: $('#pnl_editvouform-txt_vou_id'),
	txt_vou_no: $('#pnl_editvouform-txt_vou_no'),
	txt_vou_ran: $('#pnl_editvouform-txt_vou_ran'),
	txt_vou_parity: $('#pnl_editvouform-txt_vou_parity'),
	txt_vou_value: $('#pnl_editvouform-txt_vou_value'),
	txt_vou_infocode: $('#pnl_editvouform-txt_vou_infocode'),
	txt_vou_infocoderan: $('#pnl_editvouform-txt_vou_infocoderan'),
	txt_vou_infocodeparity: $('#pnl_editvouform-txt_vou_infocodeparity'),
	txt_vou_assigncode: $('#pnl_editvouform-txt_vou_assigncode'),
	txt_vou_assignto: $('#pnl_editvouform-txt_vou_assignto'),
	txt_vou_assigntoname: $('#pnl_editvouform-txt_vou_assigntoname'),
	txt_voumailerque_id: $('#pnl_editvouform-txt_voumailerque_id'),
	fl_vou_file: $('#pnl_editvouform-fl_vou_file'),
	chk_vou_isactive: $('#pnl_editvouform-chk_vou_isactive'),
	dt_vou_dtactive: $('#pnl_editvouform-dt_vou_dtactive'),
	dt_vou_dtexpired: $('#pnl_editvouform-dt_vou_dtexpired'),
	chk_vou_isview: $('#pnl_editvouform-chk_vou_isview'),
	txt_vou_viewdate: $('#pnl_editvouform-txt_vou_viewdate'),
	chk_vou_ismark: $('#pnl_editvouform-chk_vou_ismark'),
	txt_vou_markregion: $('#pnl_editvouform-txt_vou_markregion'),
	txt_vou_markbranch: $('#pnl_editvouform-txt_vou_markbranch'),
	txt_vou_markmachine: $('#pnl_editvouform-txt_vou_markmachine'),
	chk_vou_isuse: $('#pnl_editvouform-chk_vou_isuse'),
	txt_vou_useby: $('#pnl_editvouform-txt_vou_useby'),
	txt_vou_usedate: $('#pnl_editvouform-txt_vou_usedate'),
	txt_vou_createfrombon: $('#pnl_editvouform-txt_vou_createfrombon'),
	txt_vou_createfrombonvalue: $('#pnl_editvouform-txt_vou_createfrombonvalue'),
	txt_vou_bon: $('#pnl_editvouform-txt_vou_bon'),
	txt_vou_useregionbranch: $('#pnl_editvouform-txt_vou_useregionbranch'),
	txt_vou_useregionbranchname: $('#pnl_editvouform-txt_vou_useregionbranchname'),
	txt_vou_usevalue: $('#pnl_editvouform-txt_vou_usevalue'),
	chk_vou_isdup: $('#pnl_editvouform-chk_vou_isdup'),
	txt_voubatch_id: $('#pnl_editvouform-txt_voubatch_id')
}


let form;
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	txt_caption.template = txt_caption.html();

	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_vou_id,
		autoid: true,
		logview: 'mst_vou',
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaveError: async (data, options) => { await form_datasaveerror(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) },
		OnGettingData: (data) => { form_gettingdata(data) },

	});
	form.getHeaderData = () => {
		return header_data;
	}	

	form.AllowAddRecord = true
	form.AllowRemoveRecord = true
	form.AllowEditRecord = true
	form.CreateRecordStatusPage(this_page_id)
	form.CreateLogPage(this_page_id)


	obj.fl_vou_file.filebox({
		onChange: function(value) {
			var files = obj.fl_vou_file.filebox('files');
			var f = files[0];
			var reader = new FileReader();
			reader.onload = (function(loaded) {
				return function(e) {
					if (loaded.type.startsWith('image')) {
						var image = new Image();
						image.src = e.target.result;
						image.onload = function() {
							fl_vou_file_img.attr('src', e.target.result);
							fl_vou_file_img.show();
							fl_vou_file_lnk.hide();
						}
					} else {
						fl_vou_file_img.hide();
						fl_vou_file_lnk.hide();
					}
				}
			})(f);
			if (f!==undefined) { reader.readAsDataURL(f) }
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
		var element = document.activeElement;
		element.blur();
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_editvougrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_editvougrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_editvougrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_editvougrid'].handler.scrolllast()
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
	header_data = hdata

	var caption = txt_caption.template;
	caption = caption.replace('{{STATE_BEG}}', '');
	caption = caption.replace('{{STATE_END}}', ' View');
	txt_caption.html(caption);

	txt_title.html(header_data.voubatch_descr)
	if (typeof hnd!=='undefined') { 
		if (typeof hnd.setupTitle === 'function') {
			hnd.setupTitle(txt_title, header_data, 'open');
		}
	}

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/vou-open`
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

		/* handle data saat opening data */   
		if (typeof hnd.form_dataopening == 'function') {
			hnd.form_dataopening(result, options);
		}


		form.SuspendEvent(true);
		form
			.fill(record)
			.setViewMode()
			.rowid = rowid



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


		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/ 
		if (typeof hnd.form_dataopened == 'function') {
			hnd.form_dataopened(result, options);
		}


		form.commit()
		form.SuspendEvent(false);



	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)	
}

export function createnew(hdata) {
	header_data = hdata

	var caption = txt_caption.template;
	caption = caption.replace('{{STATE_BEG}}', 'Create New ');
	caption = caption.replace('{{STATE_END}}', '');
	txt_caption.html(caption);

	txt_title.html(header_data.voubatch_descr)
	if (typeof hnd!=='undefined') { 
		if (typeof hnd.setupTitle === 'function') {
			hnd.setupTitle(txt_title, header_data, 'new');
		}
	}

	form.createnew(async (data, options)=>{
		data.voubatch_id = hdata.voubatch_id
		data.vou_value = 0

		data.vou_no = 0
		data.vou_value = 0
		data.vou_dtactive = global.now()
		data.vou_dtexpired = global.now()
		data.vou_createfrombonvalue = 0
		data.vou_usevalue = 0


		if (typeof hnd.form_newdata == 'function') {
			hnd.form_newdata(data, options);
		}

		fl_vou_file_img.hide();
		fl_vou_file_lnk.hide();	
		obj.fl_vou_file.filebox('clear');		
			

		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editvougrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/vou-save`

	// options.skipmappingresponse = [];
	options.skipmappingresponse = [];
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var id = o.getFieldValueName()
			options.skipmappingresponse.push(id)
			// console.log(id)
		}
	}

	if (typeof hnd.form_datasaving == 'function') {
		hnd.form_datasaving(data, options);
	}	
}


async function form_datasaveerror(err, options) {
	// apabila mau olah error messagenya
	// $ui.ShowMessage(err.errormessage)
	console.error(err)
	if (typeof hnd.form_datasaveerror == 'function') {
		hnd.form_datasaveerror(err, options);
	}
	if (options.supress_error_dialog!=true) {
		$ui.ShowMessage('[ERROR]'+err.message);
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
	form.rowid = $ui.getPages().ITEMS['pnl_editvougrid'].handler.updategrid(data, form.rowid)
	var rowdata = {
		data: data,
		rowid: form.rowid
	}

	
	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		if (currentRowdata!=null) {
			$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
			});	
		}
	}

	if (typeof hnd.form_datasaved == 'function') {
		hnd.form_datasaved(result, rowdata, options);
	}

}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/vou-delete`
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data);
	}
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editvougrid', ()=>{
		$ui.getPages().ITEMS['pnl_editvougrid'].handler.removerow(form.rowid)
	});

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		if (currentRowdata!=null) {
			$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
			});	
		}

	}

	if (typeof hnd.form_deleted == 'function') {
		hnd.form_deleted(result, options);
	}
	
}

function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

	obj.fl_vou_file.filebox('clear');			
	if (record.vou_file_doc!=undefined) {
		if (record.vou_file_doc.type.startsWith('image')) {
			fl_vou_file_lnk.hide();
			fl_vou_file_img.show();
			fl_vou_file_img.attr('src', record.vou_file_doc.attachmentdata);
		} else {
			fl_vou_file_img.hide();
			fl_vou_file_lnk.show();
			fl_vou_file_lnk[0].onclick = () => {
				fl_vou_file_lnk.attr('download', record.vou_file_doc.name);
				fl_vou_file_lnk.attr('href', record.vou_file_doc.attachmentdata);
			}
		}	
	} else {
		fl_vou_file_img.hide();
		fl_vou_file_lnk.hide();			
	}				
			
}


function form_gettingdata(data) {
	if (hnd!=null) {
		if (typeof hnd.form_gettingdata == 'function') {
			hnd.form_gettingdata(data);
		}
	}
}

function form_viewmodechanged(viewonly) {

	console.log('View Mode changed');
	var caption = txt_caption.template;

	if (viewonly) {
		caption = caption.replace('{{STATE_BEG}}', '');
		caption = caption.replace('{{STATE_END}}', ' View');
		txt_caption.html(caption);

		btn_prev.linkbutton('enable')
		btn_next.linkbutton('enable')
		if (btn_addnew.allow) {
			btn_addnew.linkbutton('enable')
		} else {
			btn_addnew.linkbutton('disable')
		}
	} else {
		var currcaption = txt_caption.html();
		if (currcaption.substring(0,10)!='Create New') {
			caption = caption.replace('{{STATE_BEG}}', '');
			caption = caption.replace('{{STATE_END}}', ' Edit');
			txt_caption.html(caption);
		} 

		btn_prev.linkbutton('disable')
		btn_next.linkbutton('disable')
		btn_addnew.linkbutton('disable')
	}
	


	if (typeof hnd.form_viewmodechanged == 'function') {
		hnd.form_viewmodechanged(viewonly);
	}
}


function form_idsetup(options) {
	var objid = obj.txt_vou_id
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
	var record = $ui.getPages().ITEMS['pnl_editvougrid'].handler.getGrid().DATA[dataid]

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
	var record = $ui.getPages().ITEMS['pnl_editvougrid'].handler.getGrid().DATA[dataid]

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