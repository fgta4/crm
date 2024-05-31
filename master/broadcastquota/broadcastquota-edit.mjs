var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './broadcastquota-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')






const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_broadcastquota_id: $('#pnl_edit-txt_broadcastquota_id'),
	cbo_broadcasttype_id: $('#pnl_edit-cbo_broadcasttype_id'),
	txt_broadcastquota_name: $('#pnl_edit-txt_broadcastquota_name'),
	txt_broadcastquota_saldovalue: $('#pnl_edit-txt_broadcastquota_saldovalue'),
	txt_broadcastquota_saldocredit: $('#pnl_edit-txt_broadcastquota_saldocredit'),
	cbo_prepaid_accbudget_id: $('#pnl_edit-cbo_prepaid_accbudget_id'),
	cbo_prepaid_coa_id: $('#pnl_edit-cbo_prepaid_coa_id'),
	cbo_broadcastmodel_id: $('#pnl_edit-cbo_broadcastmodel_id')
}




let form;
let rowdata;

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	var disableedit = false;
	// switch (this_page_options.variancename) {
	// 	case 'commit' :
	//		disableedit = true;
	//		btn_edit.linkbutton('disable');
	//		btn_save.linkbutton('disable');
	//		btn_delete.linkbutton('disable');
	//		break;
	// }


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_broadcastquota_id,
		autoid: true,
		logview: 'mst_broadcastquota',
		btn_edit: disableedit==true? $('<a>edit</a>') : btn_edit,
		btn_save: disableedit==true? $('<a>save</a>') : btn_save,
		btn_delete: disableedit==true? $('<a>delete</a>') : btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaveError: async (data, options) => { await form_datasaveerror(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) },
		OnRecordStatusCreated: () => {
			undefined			
		}		
	});
	form.getHeaderData = () => {
		return getHeaderData();
	}










	new fgta4slideselect(obj.cbo_broadcasttype_id, {
		title: 'Pilih broadcasttype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_broadcasttype_id,
		fieldValue: 'broadcasttype_id',
		fieldValueMap: 'broadcasttype_id',
		fieldDisplay: 'broadcasttype_name',
		fields: [
			{mapping: 'broadcasttype_id', text: 'broadcasttype_id'},
			{mapping: 'broadcasttype_name', text: 'broadcasttype_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_broadcasttype_id_dataloading === 'function') {
				hnd.cbo_broadcasttype_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_broadcasttype_id_dataloaded === 'function') {
				hnd.cbo_broadcasttype_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_broadcasttype_id_selected === 'function') {
					hnd.cbo_broadcasttype_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_prepaid_accbudget_id, {
		title: 'Pilih prepaid_accbudget_id',
		returnpage: this_page_id,
		api: $ui.apis.load_prepaid_accbudget_id,
		fieldValue: 'prepaid_accbudget_id',
		fieldValueMap: 'accbudget_id',
		fieldDisplay: 'accbudget_name',
		fields: [
			{mapping: 'accbudget_id', text: 'accbudget_id'},
			{mapping: 'accbudget_name', text: 'accbudget_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_prepaid_accbudget_id_dataloading === 'function') {
				hnd.cbo_prepaid_accbudget_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_prepaid_accbudget_id_dataloaded === 'function') {
				hnd.cbo_prepaid_accbudget_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_prepaid_accbudget_id_selected === 'function') {
					hnd.cbo_prepaid_accbudget_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_prepaid_coa_id, {
		title: 'Pilih prepaid_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_prepaid_coa_id,
		fieldValue: 'prepaid_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_prepaid_coa_id_dataloading === 'function') {
				hnd.cbo_prepaid_coa_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_prepaid_coa_id_dataloaded === 'function') {
				hnd.cbo_prepaid_coa_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_prepaid_coa_id_selected === 'function') {
					hnd.cbo_prepaid_coa_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_broadcastmodel_id, {
		title: 'Pilih broadcastmodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_broadcastmodel_id,
		fieldValue: 'broadcastmodel_id',
		fieldValueMap: 'broadcastmodel_id',
		fieldDisplay: 'broadcastmodel_name',
		fields: [
			{mapping: 'broadcastmodel_id', text: 'broadcastmodel_id'},
			{mapping: 'broadcastmodel_name', text: 'broadcastmodel_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_broadcastmodel_id_dataloading === 'function') {
				hnd.cbo_broadcastmodel_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_broadcastmodel_id_dataloaded === 'function') {
				hnd.cbo_broadcastmodel_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_broadcastmodel_id_selected === 'function') {
					hnd.cbo_broadcastmodel_id_selected(value, display, record, args);
				}
			}
		}
	})				
				




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
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_list', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
					})
				})
			} else {
				$ui.getPages().show('pnl_list', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
				})
			}
		
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (form.isDataChanged()) {
				ev.detail.cancel = true;
				$ui.ShowMessage('Anda masih dalam mode edit dengan pending data, silakan matikan mode edit untuk kembali ke halaman utama.')
			}
		}
	})

	//button state
	if (typeof hnd.init==='function') {
		hnd.init({
			form: form,
			obj: obj,
			opt: opt,
		})
	}

}

export function OnSizeRecalculated(width, height) {
}

export function getForm() {
	return form
}

export function getCurrentRowdata() {
	return rowdata;
}

export function open(data, rowid, viewmode=true, fn_callback) {

	rowdata = {
		data: data,
		rowid: rowid
	}

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(record);

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
  		updaterecordstatus(record)

		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_broadcasttype_id, record.broadcasttype_id, record.broadcasttype_name)
			.setValue(obj.cbo_prepaid_accbudget_id, record.prepaid_accbudget_id, record.prepaid_accbudget_name)
			.setValue(obj.cbo_prepaid_coa_id, record.prepaid_coa_id, record.prepaid_coa_name)
			.setValue(obj.cbo_broadcastmodel_id, record.broadcastmodel_id, record.broadcastmodel_name)
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid


		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/   
		if (typeof hnd.form_dataopened == 'function') {
			hnd.form_dataopened(result, options);
		}


		/* commit form */
		form.commit()
		form.SuspendEvent(false); 
		updatebuttonstate(record)


		/* update rowdata */
		for (var nv in rowdata.data) {
			if (record[nv]!=undefined) {
				rowdata.data[nv] = record[nv];
			}
		}

		// tampilkan form untuk data editor
		if (typeof fn_callback==='function') {
			fn_callback(null, rowdata.data);
		}
		
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.broadcastquota_saldovalue = 0
		data.broadcastquota_saldocredit = 0

		data.broadcasttype_id = '0'
		data.broadcasttype_name = '-- PILIH --'
		data.prepaid_accbudget_id = '0'
		data.prepaid_accbudget_name = '-- PILIH --'
		data.prepaid_coa_id = '0'
		data.prepaid_coa_name = '-- PILIH --'
		data.broadcastmodel_id = '0'
		data.broadcastmodel_name = '-- PILIH --'

		if (typeof hnd.form_newdata == 'function') {
			hnd.form_newdata(data, options);
		}




		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}



	})
}


export function getHeaderData() {
	var header_data = form.getData();
	if (typeof hnd.form_getHeaderData == 'function') {
		hnd.form_getHeaderData(header_data);
	}
	return header_data;
}

export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	let header_data = getHeaderData();
	if (typeof hnd.form_detil_opening == 'function') {
		hnd.form_detil_opening(pnlname, (cancel)=>{
			if (cancel===true) {
				return;
			}
			$ui.getPages().show(pnlname, () => {
				$ui.getPages().ITEMS[pnlname].handler.OpenDetil(header_data)
			})
		});
	} else {
		$ui.getPages().show(pnlname, () => {
			$ui.getPages().ITEMS[pnlname].handler.OpenDetil(header_data)
		})
	}

	
}


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini
	
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini
	
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_broadcastquota_id
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


async function form_datasaving(data, options) {
	// cek dulu data yang akan disimpan,
	// apabila belum sesuai dengan yang diharuskan, batalkan penyimpanan
	//    options.cancel = true

	// Modifikasi object data, apabila ingin menambahkan variabel yang akan dikirim ke server
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

async function form_datasaveerror(err, options) {
	// apabila mau olah error messagenya
	// $ui.ShowMessage(err.errormessage)
	console.log(err)
}


async function form_datasaved(result, options) {
	// Apabila tidak mau munculkan dialog
	// options.suppressdialog = true

	// Apabila ingin mengganti message Data Tersimpan
	// options.savedmessage = 'Data sudah disimpan cuy!'

	// if (form.isNewData()) {
	// 	console.log('masukan ke grid')
	// 	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(form.getData())
	// } else {
	// 	console.log('update grid')
	// }


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
	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
	rowdata = {
		data: data,
		rowid: form.rowid
	}

	if (typeof hnd.form_datasaved == 'function') {
		hnd.form_datasaved(result, rowdata, options);
	}
}



async function form_deleting(data) {
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data);
	}
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

	if (typeof hnd.form_deleted == 'function') {
		hnd.form_deleted(result, options);
	}
}




