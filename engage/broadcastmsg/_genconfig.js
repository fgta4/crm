'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Broadcast Message",
	autoid: true,
	icon : "icon-order-white.svg",
	backcolor : "#348183",
	idprefix: 'BR', 
	printing: true,	
	committer: true,
	approval: true,
	dept_id_field: 'user_dept_id',
	doc_id: 'BROADCASTMSG',

	persistent: {
		'trn_broadcastmsg': {
			comment: 'Daftar Broadcast',
			primarykeys: ['broadcastmsg_id'],
			data: {
				broadcastmsg_id: { text: 'ID', type: dbtype.varchar(14), null: false},

				broadcasttype_id: {
					text: 'Type', type: dbtype.varchar(14), null: false, 
					options: { required: true, invalidMessage: 'Type harus diisi'},
					comp: comp.Combo({
						table: 'mst_broadcasttype',
						field_value: 'broadcasttype_id', field_display: 'broadcasttype_name', field_display_name: 'broadcasttype_name',
						api: 'crm/master/broadcasttype/list'
					})
				},

				broadcastmsg_dtstart: {text:'Date Start', type: dbtype.date, null:false},
				broadcastmsg_descr: { text: 'Descr', type: dbtype.varchar(255), null: true, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				broadcastmsg_template: { 
					text: 'Template', type: dbtype.varchar(1000), null: true, suppresslist: true, 
					options: { required: true, invalidMessage: 'Template harus diisi', multiline: true, height:'200px' } 
				},
				broadcastmsg_file: {text:'Image', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},

				user_dept_id: {
					autobylogin: 'dept',
					text: 'User Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen User harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'user_dept_name',
						api: 'ent/organisation/dept/list-byuser'
					})
				},

				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list'
					})
				},



				project_id: {
					section: section.Begin('Budget'),  // , 'defbottomborder'
					text: 'Project', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_project',
						field_value: 'project_id', field_display: 'project_name',
						api: 'finact/master/project/list'
					})
				},

				projecttask_id: {
					text: 'Project Task', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_projecttask',
						field_value: 'projecttask_id', field_display: 'projecttask_name',
						api: 'finact/master/projecttask/list-byproject'
					})
				},

				projbudget_id: {
					text: 'Budget', type: dbtype.varchar(30), null:true,  suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_projbudget',
						field_value: 'projbudget_id', field_display: 'projbudget_name',
						api: 'finact/budget/projbudget/list'
					})
				},

				projbudgettask_id: {
					text: 'Budget Task', type: dbtype.varchar(14), null:true,  suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_projbudgettask',
						field_value: 'projbudgettask_id', field_display: 'projecttask_notes', field_display_name:'projbudgettask_name',
						api: 'finact/budget/projbudget/task-list'
					})
				},

				broadcastmsg_isunbudgetted: { 
					section: section.End(),
					text: 'UnBudgetted', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} },


				broadcasttype_costpermessage: {
					section: section.Begin('Cost'),  // , 'defbottomborder'
					text: 'Cost per Message', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options:{disabled: true}},
				broadcasttype_creditpermessage: { text: 'Credit per Message', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options:{disabled: true}},
				broadcastmsg_custcount: { text: 'Cust Count', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options:{disabled: true}},
				broadcastmsg_rejectcount: { text: 'Rejected', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options:{disabled: true}},
				broadcastmsg_sendcount: { text: 'To be Send', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options:{disabled: true}},

				broadcastmsg_totalcost: { text: 'Total Cost', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options:{disabled: true}},
				broadcastmsg_totalcredit: { 
					section: section.End(),
					text: 'Total Credit', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true,
					options:{disabled: true},
				},


				broadcastquota_id: {
					section: section.Begin('Execution'),  // , 'defbottomborder'
					text: 'Quota Used', type: dbtype.varchar(14), null: true, suppresslist: true,
					options:{prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_broadcastquota',
						field_value: 'broadcastquota_id', field_display: 'broadcastquota_name', field_display_name: 'broadcastquota_name',
						api: 'crm/master/broadcastquota/list'
					})
				},

				partner_id: {
					text:'Partner/Operator', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list-approved'})
				},

				empl_id: {
					text:'Process By', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'empl_name',
						api: 'hrms/master/empl/list'})
				},

				broadcastmsg_custcountdelv: { 
					text: 'Total Delivered', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true,
					options:{disabled: true},
				},
				broadcastmsg_delvpercent: { 
					section: section.End(),
					text: '% Delivered', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true,
					options:{disabled: true},
				},


				cost_accbudget_id: {
					section: section.Begin('Accounts'),  // , 'defbottomborder'
					text:'Cost Budget Account', type: dbtype.varchar(20), null:true, suppresslist: true,
					options:{prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_accbudget', 
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'cost_accbudget_name', 
						api: 'finact/master/accbudget/list'})
				},

				cost_coa_id: {
					text: 'Cost Account', type: dbtype.varchar(17), null: true, suppresslist: true,
					options:{prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'cost_coa_name', 
						api: 'finact/master/coa/list'
					})
				},

				
				prepaid_accbudget_id: {
					text:'Prepaid Budget Account', type: dbtype.varchar(20), null:true, suppresslist: true,
					options:{prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_accbudget', 
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'prepaid_accbudget_name', 
						api: 'finact/master/accbudget/list'})
				},

				prepaid_coa_id: {
					section: section.End(),
					text: 'Prepaid Account', type: dbtype.varchar(17), null: true, suppresslist: true,
					options:{prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'prepaid_coa_name', 
						api: 'finact/master/coa/list'
					})
				},


				broadcastmodel_id: {
					section: section.Begin('Other Information'),  // , 'defbottomborder'
					text: 'Model', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Model harus diisi', disabled: true},
					comp: comp.Combo({
						table: 'mst_broadcastmodel',
						field_value: 'broadcastmodel_id', field_display: 'broadcastmodel_name', field_display_name: 'broadcastmodel_name',
						api: 'crm/master/broadcastmodel/list'
					})
				},

				process_dept_id: {
					text: 'Process Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen User harus diisi', disabled: true},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'process_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				doc_id: {
					section: section.End(),
					text:'Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi' , disabled: true},
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},


				broadcastmsg_version: {
					section: section.Begin('Status'),  // , 'defbottomborder'
					text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				broadcastmsg_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				broadcastmsg_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				broadcastmsg_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				broadcastmsg_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}, hidden: true},
				broadcastmsg_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				broadcastmsg_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				broadcastmsg_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				broadcastmsg_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				broadcastmsg_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				broadcastmsg_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				broadcastmsg_isexecute: { text: 'Executed', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				broadcastmsg_executeby: { text: 'Executed By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				broadcastmsg_executedate: { 
					section: section.End(),
					text: 'Executed Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				
			},

			defaultsearch: ['broadcastmsg_id', 'broadcastmsg_descr']
		},


		'trn_broadcastmsgcust' : {
			primarykeys: ['broadcastmsgcust_id'],
			comment: 'Daftar Customer yang diBroadcast',
			data: {
				broadcastmsgcust_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				broadcastmsgcust_name: {text:'Name', type: dbtype.varchar(60), null:false, options:{required:true,invalidMessage:'Name harus diisi'}},
				broadcastmsgcust_data: {text:'Data', type: dbtype.varchar(60), null:false, options:{required:true,invalidMessage:'Data harus diisi'}},
				broadcastmsgcust_isnew: {caption:'Status', text:'New Customer', type: dbtype.boolean, null:false, default:'0', options: {labelWidth:'300px'}},
				broadcastmsgcust_isrecvoffer: {caption:'Offer', text:'Allow Receive Offer', type: dbtype.boolean, null:false, suppresslist: true, default:'0', options: {labelWidth:'300px'}},
				broadcastmsgcust_reasonrejectoffer: {text:'Reject Reason', type: dbtype.varchar(255), null:true, suppresslist: true},
				broadcastmsgcust_var1: {
					section: section.Begin('Variable'),  // , 'defbottomborder'
					text:'Variable 1', type: dbtype.varchar(255), suppresslist: true},
				broadcastmsgcust_var2: {text:'Variable 2', type: dbtype.varchar(255), suppresslist: true},
				broadcastmsgcust_var3: {text:'Variable 3', type: dbtype.varchar(255), suppresslist: true},
				broadcastmsgcust_var4: {text:'Variable 4', type: dbtype.varchar(255), suppresslist: true},
				broadcastmsgcust_var5: {
					section: section.End(),
					text:'Variable 5', type: dbtype.varchar(255), suppresslist: true},

				broadcastmsgcust_isfail: { 
					section: section.Begin('Result'),  // , 'defbottomborder'
					text: 'Fail', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				broadcastmsgcust_failreason: {
					section: section.End(),
					text:'Reason', type: dbtype.varchar(255), suppresslist: true},


				broadcastmsg_id: {text:'ID', type: dbtype.varchar(14), null:false, hidden: true},		
			},
			defaultsearch: ['broadcastmsgcust_data']
		},


		'trn_broadcastmsgresult' : {
			primarykeys: ['broadcastmsgresult_id'],
			comment: 'Daftar FIle Broadcast Message',
			data: {
				broadcastmsgresult_id: {text:'ID', type: dbtype.varchar(14), null:false},
				broadcastmsgresult_name: {text:'Name', type: dbtype.varchar(60), null:false, options:{required:true,invalidMessage:'Name harus diisi'}},
				broadcastmsgresult_data: {text:'Data', type: dbtype.varchar(60), null:false, options:{required:true,invalidMessage:'Data harus diisi'}},
				broadcastmsgresult_status: {text:'Status', type: dbtype.varchar(30)},
				broadcastmsgresult_notes: {text:'Notes', type: dbtype.varchar(255)},
				broadcastmsg_id: {text:'ID', type: dbtype.varchar(14), null:false, hidden: true},	
			},
			defaultsearch: ['broadcastmsgresult_name']
		},


		'trn_broadcastmsgfiles' : {
			primarykeys: ['broadcastmsgfiles_id'],
			comment: 'Daftar FIle Broadcast Message',
			data: {
				broadcastmsgfiles_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				doctype_id: {
					text:'Document Type', type: dbtype.varchar(10), null:false, 
					options: { required: true, invalidMessage: 'Tipe dokumen harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_doctype', 
						field_value: 'doctype_id', field_display: 'doctype_name', 
						api: 'ent/general/doctype/list'})
				},
				broadcastmsgfiles_descr: {text:'Descr', type: dbtype.varchar(90), null:false},	
				broadcastmsgfiles_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				broadcastmsgfiles_file: {text:'File', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				broadcastmsg_id: {text:'Orderout', type: dbtype.varchar(14), null:false},		
			},
			defaultsearch: ['broadcastmsgfiles_descr']
		},

	},

	schema: {
		title: "Broadcast Type",
		header: 'trn_broadcastmsg',
		detils: {
			'upload' : {
				title: 'Upload', table:'trn_broadcastmsgresult', form: false, tabvisible: false, 
				overwrite : {
					mjs_list: false, // tidak akan digenerate ulang
					phtml_list: false, // tidak akan digenerate ulang
				}
			},
			'target': {title: 'Target Customer', table: 'trn_broadcastmsgcust', form: true, headerview: 'broadcastmsg_descr', editorHandler: true, listHandler: true },
			'result': {title: 'Result', table: 'trn_broadcastmsgresult', form: true, headerview: 'broadcastmsg_descr', editorHandler: true, listHandler: true },
			'files': {title: 'Files', table: 'trn_broadcastmsgfiles', form: true, headerview: 'broadcastmsg_descr', editorHandler: true, listHandler: true }
		}
	}


}