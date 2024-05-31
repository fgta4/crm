var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './broadcastmsg-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			

const btn_approve = $('#pnl_edit-btn_approve')
const btn_decline = $('#pnl_edit-btn_decline')			
				


const fl_broadcastmsg_file_img = $('#pnl_edit-fl_broadcastmsg_file_img');
const fl_broadcastmsg_file_lnk = $('#pnl_edit-fl_broadcastmsg_file_link');				
				

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_broadcastmsg_id: $('#pnl_edit-txt_broadcastmsg_id'),
	cbo_broadcasttype_id: $('#pnl_edit-cbo_broadcasttype_id'),
	dt_broadcastmsg_dtstart: $('#pnl_edit-dt_broadcastmsg_dtstart'),
	txt_broadcastmsg_descr: $('#pnl_edit-txt_broadcastmsg_descr'),
	txt_broadcastmsg_template: $('#pnl_edit-txt_broadcastmsg_template'),
	fl_broadcastmsg_file: $('#pnl_edit-fl_broadcastmsg_file'),
	cbo_user_dept_id: $('#pnl_edit-cbo_user_dept_id'),
	cbo_unit_id: $('#pnl_edit-cbo_unit_id'),
	cbo_project_id: $('#pnl_edit-cbo_project_id'),
	cbo_projecttask_id: $('#pnl_edit-cbo_projecttask_id'),
	cbo_projbudget_id: $('#pnl_edit-cbo_projbudget_id'),
	cbo_projbudgettask_id: $('#pnl_edit-cbo_projbudgettask_id'),
	chk_broadcastmsg_isunbudgetted: $('#pnl_edit-chk_broadcastmsg_isunbudgetted'),
	txt_broadcasttype_costpermessage: $('#pnl_edit-txt_broadcasttype_costpermessage'),
	txt_broadcasttype_creditpermessage: $('#pnl_edit-txt_broadcasttype_creditpermessage'),
	txt_broadcastmsg_custcount: $('#pnl_edit-txt_broadcastmsg_custcount'),
	txt_broadcastmsg_rejectcount: $('#pnl_edit-txt_broadcastmsg_rejectcount'),
	txt_broadcastmsg_sendcount: $('#pnl_edit-txt_broadcastmsg_sendcount'),
	txt_broadcastmsg_totalcost: $('#pnl_edit-txt_broadcastmsg_totalcost'),
	txt_broadcastmsg_totalcredit: $('#pnl_edit-txt_broadcastmsg_totalcredit'),
	cbo_broadcastquota_id: $('#pnl_edit-cbo_broadcastquota_id'),
	cbo_partner_id: $('#pnl_edit-cbo_partner_id'),
	cbo_empl_id: $('#pnl_edit-cbo_empl_id'),
	txt_broadcastmsg_custcountdelv: $('#pnl_edit-txt_broadcastmsg_custcountdelv'),
	txt_broadcastmsg_delvpercent: $('#pnl_edit-txt_broadcastmsg_delvpercent'),
	cbo_cost_accbudget_id: $('#pnl_edit-cbo_cost_accbudget_id'),
	cbo_cost_coa_id: $('#pnl_edit-cbo_cost_coa_id'),
	cbo_prepaid_accbudget_id: $('#pnl_edit-cbo_prepaid_accbudget_id'),
	cbo_prepaid_coa_id: $('#pnl_edit-cbo_prepaid_coa_id'),
	cbo_broadcastmodel_id: $('#pnl_edit-cbo_broadcastmodel_id'),
	cbo_process_dept_id: $('#pnl_edit-cbo_process_dept_id'),
	cbo_doc_id: $('#pnl_edit-cbo_doc_id'),
	txt_broadcastmsg_version: $('#pnl_edit-txt_broadcastmsg_version'),
	chk_broadcastmsg_iscommit: $('#pnl_edit-chk_broadcastmsg_iscommit'),
	txt_broadcastmsg_commitby: $('#pnl_edit-txt_broadcastmsg_commitby'),
	txt_broadcastmsg_commitdate: $('#pnl_edit-txt_broadcastmsg_commitdate'),
	chk_broadcastmsg_isapprovalprogress: $('#pnl_edit-chk_broadcastmsg_isapprovalprogress'),
	chk_broadcastmsg_isapproved: $('#pnl_edit-chk_broadcastmsg_isapproved'),
	txt_broadcastmsg_approveby: $('#pnl_edit-txt_broadcastmsg_approveby'),
	txt_broadcastmsg_approvedate: $('#pnl_edit-txt_broadcastmsg_approvedate'),
	chk_broadcastmsg_isdeclined: $('#pnl_edit-chk_broadcastmsg_isdeclined'),
	txt_broadcastmsg_declineby: $('#pnl_edit-txt_broadcastmsg_declineby'),
	txt_broadcastmsg_declinedate: $('#pnl_edit-txt_broadcastmsg_declinedate'),
	chk_broadcastmsg_isexecute: $('#pnl_edit-chk_broadcastmsg_isexecute'),
	txt_broadcastmsg_executeby: $('#pnl_edit-txt_broadcastmsg_executeby'),
	txt_broadcastmsg_executedate: $('#pnl_edit-txt_broadcastmsg_executedate')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		
const rec_approveby = $('#pnl_edit_record-approveby');
const rec_approvedate = $('#pnl_edit_record-approvedate');			
const rec_declineby = $('#pnl_edit_record-declineby');
const rec_declinedate = $('#pnl_edit_record-declinedate');			
			


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
		primary: obj.txt_broadcastmsg_id,
		autoid: true,
		logview: 'trn_broadcastmsg',
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
			
		$('#pnl_edit_record_custom').detach().appendTo("#pnl_edit_record");
		$('#pnl_edit_record_custom').show();		
					
		}		
	});
	form.getHeaderData = () => {
		return getHeaderData();
	}


	btn_print.linkbutton({ onClick: () => { btn_print_click(); } });	
	

	btn_commit.linkbutton({ onClick: () => { btn_action_click({ action: 'commit' }); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_action_click({ action: 'uncommit' }); } });			
			

	btn_approve.linkbutton({ onClick: () => { btn_action_click({ action: 'approve' }); } });
	btn_decline.linkbutton({ onClick: () => {
		var id = 'pnl_edit-reason_' + Date.now().toString();
		$ui.ShowMessage(`
			<div style="display: block;  margin-bottom: 10px">
				<div style="font-weight: bold; margin-bottom: 10px">Reason</div>
				<div">
					<input id="${id}" class="easyui-textbox" style="width: 300px; height: 60px;" data-options="multiline: true">
				</div>
			</div>
		`, {
			'Decline': () => {
				var reason = $(`#${id}`).textbox('getValue');
				btn_action_click({ action: 'decline', reason: reason }); 
			},
			'Cancel': () => {
			} 
		}, ()=>{
			var obj_reason = $(`#${id}`);
			var txt = obj_reason.textbox('textbox');
			txt[0].maxLength = 255;
			txt[0].classList.add('declinereasonbox');
			txt[0].addEventListener('keyup', (ev)=>{
				if (ev.key=='Enter') {
					ev.stopPropagation();
				}
			});
			txt.css('text-align', 'center');
			txt.focus();
		})
	}});				
				




	obj.fl_broadcastmsg_file.filebox({
		onChange: function(value) {
			var files = obj.fl_broadcastmsg_file.filebox('files');
			var f = files[0];
			var reader = new FileReader();
			reader.onload = (function(loaded) {
				return function(e) {
					if (loaded.type.startsWith('image')) {
						var image = new Image();
						image.src = e.target.result;
						image.onload = function() {
							fl_broadcastmsg_file_img.attr('src', e.target.result);
							fl_broadcastmsg_file_img.show();
							fl_broadcastmsg_file_lnk.hide();
						}
					} else {
						fl_broadcastmsg_file_img.hide();
						fl_broadcastmsg_file_lnk.hide();
					}
				}
			})(f);
			if (f!==undefined) { reader.readAsDataURL(f) }
		}
	})				
				


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
				
	new fgta4slideselect(obj.cbo_user_dept_id, {
		title: 'Pilih user_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_user_dept_id,
		fieldValue: 'user_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_user_dept_id_dataloading === 'function') {
				hnd.cbo_user_dept_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_user_dept_id_dataloaded === 'function') {
				hnd.cbo_user_dept_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_user_dept_id_selected === 'function') {
					hnd.cbo_user_dept_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_unit_id, {
		title: 'Pilih unit_id',
		returnpage: this_page_id,
		api: $ui.apis.load_unit_id,
		fieldValue: 'unit_id',
		fieldValueMap: 'unit_id',
		fieldDisplay: 'unit_name',
		fields: [
			{mapping: 'unit_id', text: 'unit_id'},
			{mapping: 'unit_name', text: 'unit_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_unit_id_dataloading === 'function') {
				hnd.cbo_unit_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({unit_id:'--NULL--', unit_name:'NONE'});	
			if (typeof hnd.cbo_unit_id_dataloaded === 'function') {
				hnd.cbo_unit_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_unit_id_selected === 'function') {
					hnd.cbo_unit_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_project_id, {
		title: 'Pilih project_id',
		returnpage: this_page_id,
		api: $ui.apis.load_project_id,
		fieldValue: 'project_id',
		fieldValueMap: 'project_id',
		fieldDisplay: 'project_name',
		fields: [
			{mapping: 'project_id', text: 'project_id'},
			{mapping: 'project_name', text: 'project_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_project_id_dataloading === 'function') {
				hnd.cbo_project_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({project_id:'--NULL--', project_name:'NONE'});	
			if (typeof hnd.cbo_project_id_dataloaded === 'function') {
				hnd.cbo_project_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_project_id_selected === 'function') {
					hnd.cbo_project_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_projecttask_id, {
		title: 'Pilih projecttask_id',
		returnpage: this_page_id,
		api: $ui.apis.load_projecttask_id,
		fieldValue: 'projecttask_id',
		fieldValueMap: 'projecttask_id',
		fieldDisplay: 'projecttask_name',
		fields: [
			{mapping: 'projecttask_id', text: 'projecttask_id'},
			{mapping: 'projecttask_name', text: 'projecttask_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_projecttask_id_dataloading === 'function') {
				hnd.cbo_projecttask_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({projecttask_id:'--NULL--', projecttask_name:'NONE'});	
			if (typeof hnd.cbo_projecttask_id_dataloaded === 'function') {
				hnd.cbo_projecttask_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_projecttask_id_selected === 'function') {
					hnd.cbo_projecttask_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_projbudget_id, {
		title: 'Pilih projbudget_id',
		returnpage: this_page_id,
		api: $ui.apis.load_projbudget_id,
		fieldValue: 'projbudget_id',
		fieldValueMap: 'projbudget_id',
		fieldDisplay: 'projbudget_name',
		fields: [
			{mapping: 'projbudget_id', text: 'projbudget_id'},
			{mapping: 'projbudget_name', text: 'projbudget_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_projbudget_id_dataloading === 'function') {
				hnd.cbo_projbudget_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({projbudget_id:'--NULL--', projbudget_name:'NONE'});	
			if (typeof hnd.cbo_projbudget_id_dataloaded === 'function') {
				hnd.cbo_projbudget_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_projbudget_id_selected === 'function') {
					hnd.cbo_projbudget_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_projbudgettask_id, {
		title: 'Pilih projbudgettask_id',
		returnpage: this_page_id,
		api: $ui.apis.load_projbudgettask_id,
		fieldValue: 'projbudgettask_id',
		fieldValueMap: 'projbudgettask_id',
		fieldDisplay: 'projecttask_notes',
		fields: [
			{mapping: 'projbudgettask_id', text: 'projbudgettask_id'},
			{mapping: 'projecttask_notes', text: 'projecttask_notes'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_projbudgettask_id_dataloading === 'function') {
				hnd.cbo_projbudgettask_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({projbudgettask_id:'--NULL--', projecttask_notes:'NONE'});	
			if (typeof hnd.cbo_projbudgettask_id_dataloaded === 'function') {
				hnd.cbo_projbudgettask_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_projbudgettask_id_selected === 'function') {
					hnd.cbo_projbudgettask_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_broadcastquota_id, {
		title: 'Pilih broadcastquota_id',
		returnpage: this_page_id,
		api: $ui.apis.load_broadcastquota_id,
		fieldValue: 'broadcastquota_id',
		fieldValueMap: 'broadcastquota_id',
		fieldDisplay: 'broadcastquota_name',
		fields: [
			{mapping: 'broadcastquota_id', text: 'broadcastquota_id'},
			{mapping: 'broadcastquota_name', text: 'broadcastquota_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_broadcastquota_id_dataloading === 'function') {
				hnd.cbo_broadcastquota_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({broadcastquota_id:'--NULL--', broadcastquota_name:'NONE'});	
			if (typeof hnd.cbo_broadcastquota_id_dataloaded === 'function') {
				hnd.cbo_broadcastquota_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_broadcastquota_id_selected === 'function') {
					hnd.cbo_broadcastquota_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_partner_id, {
		title: 'Pilih partner_id',
		returnpage: this_page_id,
		api: $ui.apis.load_partner_id,
		fieldValue: 'partner_id',
		fieldValueMap: 'partner_id',
		fieldDisplay: 'partner_name',
		fields: [
			{mapping: 'partner_id', text: 'partner_id'},
			{mapping: 'partner_name', text: 'partner_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_partner_id_dataloading === 'function') {
				hnd.cbo_partner_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({partner_id:'--NULL--', partner_name:'NONE'});	
			if (typeof hnd.cbo_partner_id_dataloaded === 'function') {
				hnd.cbo_partner_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_partner_id_selected === 'function') {
					hnd.cbo_partner_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_empl_id, {
		title: 'Pilih empl_id',
		returnpage: this_page_id,
		api: $ui.apis.load_empl_id,
		fieldValue: 'empl_id',
		fieldValueMap: 'empl_id',
		fieldDisplay: 'empl_name',
		fields: [
			{mapping: 'empl_id', text: 'empl_id'},
			{mapping: 'empl_name', text: 'empl_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_empl_id_dataloading === 'function') {
				hnd.cbo_empl_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({empl_id:'--NULL--', empl_name:'NONE'});	
			if (typeof hnd.cbo_empl_id_dataloaded === 'function') {
				hnd.cbo_empl_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_empl_id_selected === 'function') {
					hnd.cbo_empl_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_cost_accbudget_id, {
		title: 'Pilih cost_accbudget_id',
		returnpage: this_page_id,
		api: $ui.apis.load_cost_accbudget_id,
		fieldValue: 'cost_accbudget_id',
		fieldValueMap: 'accbudget_id',
		fieldDisplay: 'accbudget_name',
		fields: [
			{mapping: 'accbudget_id', text: 'accbudget_id'},
			{mapping: 'accbudget_name', text: 'accbudget_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_cost_accbudget_id_dataloading === 'function') {
				hnd.cbo_cost_accbudget_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({accbudget_id:'--NULL--', accbudget_name:'NONE'});	
			if (typeof hnd.cbo_cost_accbudget_id_dataloaded === 'function') {
				hnd.cbo_cost_accbudget_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_cost_accbudget_id_selected === 'function') {
					hnd.cbo_cost_accbudget_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_cost_coa_id, {
		title: 'Pilih cost_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_cost_coa_id,
		fieldValue: 'cost_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_cost_coa_id_dataloading === 'function') {
				hnd.cbo_cost_coa_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
			if (typeof hnd.cbo_cost_coa_id_dataloaded === 'function') {
				hnd.cbo_cost_coa_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_cost_coa_id_selected === 'function') {
					hnd.cbo_cost_coa_id_selected(value, display, record, args);
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
			result.records.unshift({accbudget_id:'--NULL--', accbudget_name:'NONE'});	
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
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
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
				
	new fgta4slideselect(obj.cbo_process_dept_id, {
		title: 'Pilih process_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_process_dept_id,
		fieldValue: 'process_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_process_dept_id_dataloading === 'function') {
				hnd.cbo_process_dept_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_process_dept_id_dataloaded === 'function') {
				hnd.cbo_process_dept_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_process_dept_id_selected === 'function') {
					hnd.cbo_process_dept_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_doc_id, {
		title: 'Pilih doc_id',
		returnpage: this_page_id,
		api: $ui.apis.load_doc_id,
		fieldValue: 'doc_id',
		fieldValueMap: 'doc_id',
		fieldDisplay: 'doc_name',
		fields: [
			{mapping: 'doc_id', text: 'doc_id'},
			{mapping: 'doc_name', text: 'doc_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_doc_id_dataloading === 'function') {
				hnd.cbo_doc_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_doc_id_dataloaded === 'function') {
				hnd.cbo_doc_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_doc_id_selected === 'function') {
					hnd.cbo_doc_id_selected(value, display, record, args);
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
		if (result.record.unit_id==null) { result.record.unit_id='--NULL--'; result.record.unit_name='NONE'; }
		if (result.record.project_id==null) { result.record.project_id='--NULL--'; result.record.project_name='NONE'; }
		if (result.record.projecttask_id==null) { result.record.projecttask_id='--NULL--'; result.record.projecttask_name='NONE'; }
		if (result.record.projbudget_id==null) { result.record.projbudget_id='--NULL--'; result.record.projbudget_name='NONE'; }
		if (result.record.projbudgettask_id==null) { result.record.projbudgettask_id='--NULL--'; result.record.projbudgettask_name='NONE'; }
		if (result.record.broadcastquota_id==null) { result.record.broadcastquota_id='--NULL--'; result.record.broadcastquota_name='NONE'; }
		if (result.record.partner_id==null) { result.record.partner_id='--NULL--'; result.record.partner_name='NONE'; }
		if (result.record.empl_id==null) { result.record.empl_id='--NULL--'; result.record.empl_name='NONE'; }
		if (result.record.cost_accbudget_id==null) { result.record.cost_accbudget_id='--NULL--'; result.record.cost_accbudget_name='NONE'; }
		if (result.record.cost_coa_id==null) { result.record.cost_coa_id='--NULL--'; result.record.cost_coa_name='NONE'; }
		if (result.record.prepaid_accbudget_id==null) { result.record.prepaid_accbudget_id='--NULL--'; result.record.prepaid_accbudget_name='NONE'; }
		if (result.record.prepaid_coa_id==null) { result.record.prepaid_coa_id='--NULL--'; result.record.prepaid_coa_name='NONE'; }

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
			.setValue(obj.cbo_user_dept_id, record.user_dept_id, record.user_dept_name)
			.setValue(obj.cbo_unit_id, record.unit_id, record.unit_name)
			.setValue(obj.cbo_project_id, record.project_id, record.project_name)
			.setValue(obj.cbo_projecttask_id, record.projecttask_id, record.projecttask_name)
			.setValue(obj.cbo_projbudget_id, record.projbudget_id, record.projbudget_name)
			.setValue(obj.cbo_projbudgettask_id, record.projbudgettask_id, record.projbudgettask_name)
			.setValue(obj.cbo_broadcastquota_id, record.broadcastquota_id, record.broadcastquota_name)
			.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
			.setValue(obj.cbo_empl_id, record.empl_id, record.empl_name)
			.setValue(obj.cbo_cost_accbudget_id, record.cost_accbudget_id, record.cost_accbudget_name)
			.setValue(obj.cbo_cost_coa_id, record.cost_coa_id, record.cost_coa_name)
			.setValue(obj.cbo_prepaid_accbudget_id, record.prepaid_accbudget_id, record.prepaid_accbudget_name)
			.setValue(obj.cbo_prepaid_coa_id, record.prepaid_coa_id, record.prepaid_coa_name)
			.setValue(obj.cbo_broadcastmodel_id, record.broadcastmodel_id, record.broadcastmodel_name)
			.setValue(obj.cbo_process_dept_id, record.process_dept_id, record.process_dept_name)
			.setValue(obj.cbo_doc_id, record.doc_id, record.doc_name)
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
		data.broadcastmsg_dtstart = global.now()
		data.broadcastmsg_isunbudgetted = '0'
		data.broadcasttype_costpermessage = 0
		data.broadcasttype_creditpermessage = 0
		data.broadcastmsg_custcount = 0
		data.broadcastmsg_rejectcount = 0
		data.broadcastmsg_sendcount = 0
		data.broadcastmsg_totalcost = 0
		data.broadcastmsg_totalcredit = 0
		data.broadcastmsg_custcountdelv = 0
		data.broadcastmsg_delvpercent = 0
		data.broadcastmsg_version = 0
		data.broadcastmsg_iscommit = '0'
		data.broadcastmsg_isapprovalprogress = '0'
		data.broadcastmsg_isapproved = '0'
		data.broadcastmsg_isdeclined = '0'
		data.broadcastmsg_isexecute = '0'

		data.broadcasttype_id = '0'
		data.broadcasttype_name = '-- PILIH --'
		data.user_dept_id = global.setup.dept_id
		data.user_dept_name = global.setup.dept_name
		data.unit_id = '--NULL--'
		data.unit_name = 'NONE'
		data.project_id = '--NULL--'
		data.project_name = 'NONE'
		data.projecttask_id = '--NULL--'
		data.projecttask_name = 'NONE'
		data.projbudget_id = '--NULL--'
		data.projbudget_name = 'NONE'
		data.projbudgettask_id = '--NULL--'
		data.projbudgettask_name = 'NONE'
		data.broadcastquota_id = '--NULL--'
		data.broadcastquota_name = 'NONE'
		data.partner_id = '--NULL--'
		data.partner_name = 'NONE'
		data.empl_id = '--NULL--'
		data.empl_name = 'NONE'
		data.cost_accbudget_id = '--NULL--'
		data.cost_accbudget_name = 'NONE'
		data.cost_coa_id = '--NULL--'
		data.cost_coa_name = 'NONE'
		data.prepaid_accbudget_id = '--NULL--'
		data.prepaid_accbudget_name = 'NONE'
		data.prepaid_coa_id = '--NULL--'
		data.prepaid_coa_name = 'NONE'
		data.broadcastmodel_id = '0'
		data.broadcastmodel_name = '-- PILIH --'
		data.process_dept_id = '0'
		data.process_dept_name = '-- PILIH --'
		data.doc_id = global.setup.doc_id
		data.doc_name = global.setup.doc_id

		if (typeof hnd.form_newdata == 'function') {
			hnd.form_newdata(data, options);
		}

		rec_commitby.html('');
		rec_commitdate.html('');
		
		rec_approveby.html('');
		rec_approvedate.html('');
		rec_declineby.html('');
		rec_declinedate.html('');
		

		fl_broadcastmsg_file_img.hide();
		fl_broadcastmsg_file_lnk.hide();	
		obj.fl_broadcastmsg_file.filebox('clear');		
				

		var button_commit_on = true;
		var button_uncommit_on = false;
		var button_approve_on = false;
		var button_decline_on = false;
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		btn_approve.linkbutton(button_approve_on ? 'enable' : 'disable');
		btn_decline.linkbutton(button_decline_on ? 'enable' : 'disable');
			

		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_edittargetgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editresultgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editfilesgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editapprovalgrid'].handler.createnew(data, options)


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

		obj.fl_broadcastmsg_file.filebox('clear');			
		if (record.broadcastmsg_file_doc!=undefined) {
			if (record.broadcastmsg_file_doc.type.startsWith('image')) {
				fl_broadcastmsg_file_lnk.hide();
				fl_broadcastmsg_file_img.show();
				fl_broadcastmsg_file_img.attr('src', record.broadcastmsg_file_doc.attachmentdata);
			} else {
				fl_broadcastmsg_file_img.hide();
				fl_broadcastmsg_file_lnk.show();
				fl_broadcastmsg_file_lnk[0].onclick = () => {
					fl_broadcastmsg_file_lnk.attr('download', record.broadcastmsg_file_doc.name);
					fl_broadcastmsg_file_lnk.attr('href', record.broadcastmsg_file_doc.attachmentdata);
				}
			}	
		} else {
			fl_broadcastmsg_file_img.hide();
			fl_broadcastmsg_file_lnk.hide();			
		}				
				
}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

		rec_commitby.html(record.broadcastmsg_commitby);
		rec_commitdate.html(record.broadcastmsg_commitdate);
		
		rec_approveby.html(record.broadcastmsg_approveby);
		rec_approvedate.html(record.broadcastmsg_approvedate);
		rec_declineby.html(record.broadcastmsg_declineby);
		rec_declinedate.html(record.broadcastmsg_declinedate);
			
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;
		var button_approve_on = false;
		var button_decline_on = false;

		
		if (record.broadcastmsg_isfirm=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = false;
			form.lock(true);	
		} else if (record.broadcastmsg_isdeclined=="1" || record.broadcastmsg_isuseralreadydeclined=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			button_approve_on = true;
			button_decline_on = false;
			form.lock(true);	
		} else if (record.broadcastmsg_isapproved=="1" || record.broadcastmsg_isuseralreadyapproved=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = true;	
			form.lock(true);	
		} else if (record.broadcastmsg_isapprovalprogress=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = true;
			button_decline_on = true;
			form.lock(true);	
		} else if (record.broadcastmsg_iscommit=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			button_approve_on = true;
			button_decline_on = true;
			form.lock(true);		
		} else {
			button_commit_on = true;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = false;
			form.lock(false);
		} 
	
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		btn_approve.linkbutton(button_approve_on ? 'enable' : 'disable');
		btn_decline.linkbutton(button_decline_on ? 'enable' : 'disable');		
				
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini



	var updategriddata = {}

	var col_commit = 'broadcastmsg_iscommit';
	updategriddata[col_commit] = record.broadcastmsg_iscommit;	
	
	var col_approveprogress = 'broadcastmsg_isapprovalprogress';
	var col_approve = 'broadcastmsg_isapprove'
	var col_decline = "broadcastmsg_isdeclined"
	updategriddata[col_approveprogress] = record.broadcastmsg_isapprovalprogress;
	updategriddata[col_approve] = record.broadcastmsg_isapproved;
	updategriddata[col_decline] = record.broadcastmsg_isdeclined;				
			
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_broadcastmsg_id
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
	// options.skipmappingresponse = ['unit_id', 'project_id', 'projecttask_id', 'projbudget_id', 'projbudgettask_id', 'broadcastquota_id', 'partner_id', 'empl_id', 'cost_accbudget_id', 'cost_coa_id', 'prepaid_accbudget_id', 'prepaid_coa_id', ];
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
	form.setValue(obj.cbo_unit_id, result.dataresponse.unit_name!=='--NULL--' ? result.dataresponse.unit_id : '--NULL--', result.dataresponse.unit_name!=='--NULL--'?result.dataresponse.unit_name:'NONE')
	form.setValue(obj.cbo_project_id, result.dataresponse.project_name!=='--NULL--' ? result.dataresponse.project_id : '--NULL--', result.dataresponse.project_name!=='--NULL--'?result.dataresponse.project_name:'NONE')
	form.setValue(obj.cbo_projecttask_id, result.dataresponse.projecttask_name!=='--NULL--' ? result.dataresponse.projecttask_id : '--NULL--', result.dataresponse.projecttask_name!=='--NULL--'?result.dataresponse.projecttask_name:'NONE')
	form.setValue(obj.cbo_projbudget_id, result.dataresponse.projbudget_name!=='--NULL--' ? result.dataresponse.projbudget_id : '--NULL--', result.dataresponse.projbudget_name!=='--NULL--'?result.dataresponse.projbudget_name:'NONE')
	form.setValue(obj.cbo_projbudgettask_id, result.dataresponse.projbudgettask_name!=='--NULL--' ? result.dataresponse.projbudgettask_id : '--NULL--', result.dataresponse.projbudgettask_name!=='--NULL--'?result.dataresponse.projbudgettask_name:'NONE')
	form.setValue(obj.cbo_broadcastquota_id, result.dataresponse.broadcastquota_name!=='--NULL--' ? result.dataresponse.broadcastquota_id : '--NULL--', result.dataresponse.broadcastquota_name!=='--NULL--'?result.dataresponse.broadcastquota_name:'NONE')
	form.setValue(obj.cbo_partner_id, result.dataresponse.partner_name!=='--NULL--' ? result.dataresponse.partner_id : '--NULL--', result.dataresponse.partner_name!=='--NULL--'?result.dataresponse.partner_name:'NONE')
	form.setValue(obj.cbo_empl_id, result.dataresponse.empl_name!=='--NULL--' ? result.dataresponse.empl_id : '--NULL--', result.dataresponse.empl_name!=='--NULL--'?result.dataresponse.empl_name:'NONE')
	form.setValue(obj.cbo_cost_accbudget_id, result.dataresponse.cost_accbudget_name!=='--NULL--' ? result.dataresponse.cost_accbudget_id : '--NULL--', result.dataresponse.cost_accbudget_name!=='--NULL--'?result.dataresponse.cost_accbudget_name:'NONE')
	form.setValue(obj.cbo_cost_coa_id, result.dataresponse.cost_coa_name!=='--NULL--' ? result.dataresponse.cost_coa_id : '--NULL--', result.dataresponse.cost_coa_name!=='--NULL--'?result.dataresponse.cost_coa_name:'NONE')
	form.setValue(obj.cbo_prepaid_accbudget_id, result.dataresponse.prepaid_accbudget_name!=='--NULL--' ? result.dataresponse.prepaid_accbudget_id : '--NULL--', result.dataresponse.prepaid_accbudget_name!=='--NULL--'?result.dataresponse.prepaid_accbudget_name:'NONE')
	form.setValue(obj.cbo_prepaid_coa_id, result.dataresponse.prepaid_coa_name!=='--NULL--' ? result.dataresponse.prepaid_coa_id : '--NULL--', result.dataresponse.prepaid_coa_name!=='--NULL--'?result.dataresponse.prepaid_coa_name:'NONE')

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



function btn_print_click() {

	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.');
		return;
	}

	var id = obj.txt_broadcastmsg_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/broadcastmsg.xprint?id=' + id;

	var print_to_new_window = global.setup.print_to_new_window;
	var debug = false;
	var debug = false;
	if (debug || print_to_new_window) {
		var w = window.open(printurl);
		w.onload = () => {
			window.onreadytoprint(() => {
				iframe.contentWindow.print();
			});
		}
	} else {
		$ui.mask('wait...');
		var iframe_id = 'fgta_printelement';
		var iframe = document.getElementById(iframe_id);
		if (iframe) {
			iframe.parentNode.removeChild(iframe);
			iframe = null;
		}

		if (!iframe) {
			iframe = document.createElement('iframe');
			iframe.id = iframe_id;
			iframe.style.visibility = 'hidden';
			iframe.style.height = '10px';
			iframe.style.widows = '10px';
			document.body.appendChild(iframe);

			iframe.onload = () => {
				$ui.unmask();
				iframe.contentWindow.OnPrintCommand(() => {
					console.log('start print');
					iframe.contentWindow.print();
				});
				iframe.contentWindow.preparemodule();
			}
		}
		iframe.src = printurl + '&iframe=1';

	}

}	






async function btn_action_click(args) {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}


	var docname = 'Broadcast Type'
	var txt_version = obj.txt_broadcastmsg_version;
	var chk_iscommit = obj.chk_broadcastmsg_iscommit;
	
	var chk_isapprovalprogress = obj.chk_broadcastmsg_isapprovalprogress;	
	var chk_isapprove = obj.chk_broadcastmsg_isapproved;
	var chk_isdeclined = obj.chk_broadcastmsg_isdeclined;
		
	
	var id = form.getCurrentId();

	Object.assign(args, {
		id: id,
		act_url: null,
		act_msg_quest: null,
		act_msg_result: null,
		act_do: null,
		use_otp: false,
		otp_message: `Berikut adalah code yang harus anda masukkan untuk melakukan ${args.action} ${docname} dengan no id ${id}`,
	});

	switch (args.action) {
		case 'commit' :
			args.act_url = `${global.modulefullname}/xtion-commit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				
			chk_isapprove.checkbox('uncheck');
		
				form.commit();
			}
			break;

		case 'uncommit' :
			args.act_url = `${global.modulefullname}/xtion-uncommit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('uncheck');
				
			chk_isapprove.checkbox('uncheck');
			chk_isdeclined.checkbox('uncheck');
		
				form.setValue(txt_version, result.version);
				form.commit();
			}
			break;

		
		case 'approve' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.use_otp = true;
			args.otp_title = 'Approval Code';
			args.param = {
				approve: true,
				approval_note: ''
			}
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				chk_isapprovalprogress.checkbox('check');
				chk_isapprove.checkbox(result.isfinalapproval ? "check" : "uncheck");
				chk_isdeclined.checkbox('uncheck');
				form.commit();
			}
			break;

		case 'decline' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = '', //`Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.use_otp = true;
			args.otp_title = 'Decline Code';
			args.param = {
				approve: false,
				approval_note: args.reason
			}
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				chk_isapprove.checkbox('uncheck');
				chk_isdeclined.checkbox('check');
				form.commit();
			}
			break;		
		

	
		

	}


	try {
		$ui.mask('wait..');
		var { doAction } = await import('../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4xtion.mjs');
		await doAction(args, (err, result) => {
			if (err) {
				$ui.ShowMessage('[WARNING]' + err.message);	
			} else {
				if (result.dataresponse!=undefined) { updaterecordstatus(result.dataresponse) };
				args.act_do(result);

				if (result.dataresponse!=undefined) {
					updatebuttonstate(result.dataresponse);
					updategridstate(result.dataresponse);
				}
				if (args.act_msg_result!=='') $ui.ShowMessage('[INFO]' + args.act_msg_result);	
			}
		});
	} catch (err) {
		console.error(err);
		$ui.ShowMessage('[ERROR]' + err.message);
	} finally {
		$ui.unmask();
	}
}	
	
	