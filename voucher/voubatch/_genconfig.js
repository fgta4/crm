'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Voucher",
	autoid: true,
	committer: true,


	persistent: {
		'mst_voubatch' : {
			primarykeys: ['voubatch_id'],
			comment: 'Daftar Batch Voucher',
			data: {
				voubatch_id: {text:'ID', type: dbtype.varchar(5), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},

				voutype_id: {
					text: 'Type', type: dbtype.varchar(5), null: true,
					options: { required: true, invalidMessage: 'Type harus diisi'},
					comp: comp.Combo({
						table: 'mst_voutype',
						field_value: 'voutype_id', field_display: 'voutype_name',
						api: 'crm/voucher/voutype/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false	
					})
				},

				brand_id: { 
					text: 'Brand', type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { required: false, prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_brand',
						field_value: 'brand_id', field_display: 'brand_name',
						api: 'ent/affiliation/brand/list'
					})
				},
				
				voubatch_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},
				voubatch_greeting: {text:'Greeting', type: dbtype.varchar(1000), suppresslist: true, options:{multiline:true, height:'143px'}},

				voubatch_qrreq: {text:'QR Request', type: dbtype.varchar(1000), suppresslist: true, options:{multiline:true, height:'143px'}},

				/*
				crmevent_id: { 
					before: `
						<div class="form_row pnl_edit_row">
							<div class="form_label_col"  style="border: 0px solid black; vertical-align: top; margin-top: 7px;"></div>
							<div class="form_input_col voutype-row-before" style="border: 0px solid black">
								:: voucher akan dibuat pada ::
							</div>
						</div>
					`,
					text: 'Event', type: dbtype.varchar(14), null: true,  suppresslist: true,
					options: { required: false, prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'trn_crmevent',
						field_value: 'crmevent_id', field_display: 'crmevent_name',
						api: 'crm/engage/crmevent/list'
					})
				},
				*/

				voubatch_dtstart: {text:'Date Start', type: dbtype.date, null:false, suppresslist: true,},
				voubatch_dtend: {text:'Date End', type: dbtype.date, null:false},
				voubatch_cond: {text:'Condition', type: dbtype.varchar(2000), suppresslist: true},

				voubatch_dtactive: {
					before: `
						<div class="form_row pnl_edit_row">
							<div class="form_label_col"  style="border: 0px solid black; vertical-align: top; margin-top: 7px;"></div>
							<div class="form_input_col voutype-row-before" style="border: 0px solid black">
								:: Periode voucher dapat digunakan ::
							</div>
						</div>
					`,
					text:'Date Active', type: dbtype.date, null:false},
				voubatch_dtexpired: {text:'Date Expired', type: dbtype.date, null:false},


				voubatch_file: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},

				voubatch_isgenimage: { 
					text: 'Generate Voucher Images', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } 
				},

				voubatch_width: {
					text:'Image Width', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options: {required: true}
				},

				voubatch_barpostop: {
					text:'Barcode Left pos', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options: {required: true}
				},

				voubatch_barposleft: {
					text:'Barcode Top pos', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options: {required: true},
					after: `<?php $cp=__DIR__.'/voubatch-edit-imgview.phtml'; if (is_file($cp)) { include $cp; } ?>`,
				},

				
				voumodel_id: {
					text: 'Model', type: dbtype.varchar(10), null: true,
					options: { required: true, invalidMessage: 'Model harus diisi'},
					comp: comp.Combo({
						table: 'mst_voumodel',
						field_value: 'voumodel_id', field_display: 'voumodel_name',
						api: 'crm/voucher/voumodel/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false	
					})
				},

				voubatch_code: {text:'Code', type: dbtype.varchar(3), suppresslist: true, options: { required: true, invalidMessage: 'Code harus diisi'},},

				voubatch_value: { 
					text: 'Value', type: dbtype.decimal(16,2), null: false, default:0, options: {required: true},
					tips: 'Apabila menggunakan %, isikan nilai di bawah 1, misal 0.5 untuk disc 50%.',
					tipstype: 'visible'	
				},
				voubatch_qty: {
					text:'Qty', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options: {required: true},
					tips: 'Jumlah voucher yang akan dibuat.',
					tipstype: 'visible'	
				},
				voubatch_qtymax: {
					text:'Qty Max', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options: {required: true},
					tips: 'Maximal jumlah voucher yang dapat dibuat, pada mode auto',
					tipstype: 'visible'	
				},

				voubatch_isusecodeact: { 
					text: 'Use Activation Code', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } 
				},

				voubatch_isondemand: { 
					text: 'OnDemand voucher generate', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } 
				},

				voubatch_isactive: { 
					text: 'Active', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth:'300px', disabled: true } 
				},

				voubatch_version: {
					section: section.Begin('Status'),
					text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}
				},
				voubatch_iscommit: {
					text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}
				},
				voubatch_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				voubatch_commitdate: {
					text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true
				},	

				voubatch_isgenerate: {
					text:'Generated', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}
				},
				voubatch_generateby: {text:'GenerateBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				voubatch_generatedate: {
					section: section.End(),
					text:'GenerateDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true
				},	
	
			},
		},

		'mst_vou' : {
			primarykeys: ['vou_id'],
			comment: 'Daftar Voucher',
			data: {
				vou_id: {text:'ID', type: dbtype.varchar(30), null:false},
				vou_no: { text:'No', type: dbtype.int(4), null:false, default:'0', suppresslist: true },
				vou_ran: { text:'Rand', type: dbtype.varchar(2), null:false, suppresslist: true },
				vou_parity: { text:'Parity', type: dbtype.varchar(2), null:false, suppresslist: true },
				vou_value: { 
					text: 'Value', type: dbtype.decimal(16,2), null: false, default:0, suppresslist: true, options: {required: true}
				},

				vou_infocode: {text:'InfoCode', type: dbtype.varchar(13), null:false},
				vou_infocoderan: { text:'InfoCode No', type: dbtype.varchar(2), null:false, suppresslist: true },
				vou_infocodeparity: { text:'InfoCode Parity', type: dbtype.varchar(2), null:false, suppresslist: true },


				vou_assigncode: { text:'Assign Code', type: dbtype.varchar(60), null:true, suppresslist: true },
				vou_assignto: { text:'Assign To', type: dbtype.varchar(60), null:true, suppresslist: true },
				vou_assigntoname: { text:'Assign To Name', type: dbtype.varchar(255), null:true, suppresslist: true },
				
				/*
				voumailerque_id: { 
					text: 'Que Sent To', type: dbtype.varchar(14),  null: true, suppresslist: true, 
					reference: {table: 'mst_voumailerque', field_value: 'voumailerque_id', field_display:'voumailerque_nama',  field_display_name:'voumailerque_nama'}, 
					options: {  disabled: true } 
				},
				*/
				
				vou_file: {
					text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' },
					after: `
					<div class="form_row pnl_editvouform_row">
						<div class="form_label_col"></div>
						<div class="form_input_col" style="border: 0px solid black">
							<a id="pnl_editvouform-btn_download" download="" href="">Download</a>
						</div>
					</div>					
					`
				},


				vou_isactive: { 
					text: 'Active', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } 
				},
				vou_dtactive: {text:'Date Active', type: dbtype.date, null:false},
				vou_dtexpired: {text:'Date Expired', type: dbtype.date, null:false},

				vou_isview: { 
					text: 'View', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth:'300px' } 
				},
				vou_viewdate: {
					text:'View Date', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}
				},	

				vou_ismark: { 
					text: 'Marked', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth:'300px' } 
				},

				vou_markregion: { text:'MarkRegion', type: dbtype.varchar(5), null:true, unset:true, suppresslist: true },
				vou_markbranch: { text:'MarkBranch', type: dbtype.varchar(7), null:true, unset:true, suppresslist: true },
				vou_markmachine: { text:'MarkMachine', type: dbtype.varchar(10), null:true, unset:true, suppresslist: true },

				vou_isuse: { 
					text: 'Used', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth:'300px' } 
				},		
				
				vou_useby: {text:'UseBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, lookup:'user'},
				vou_usedate: {
					text:'UseDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}
				},	

				vou_createfrombon: { 
					text:'Create From BonId', type: dbtype.varchar(32), null:true, unset:true, suppresslist: true 
				},
				vou_createfrombonvalue: { 
					text: 'Create From Bon Value', type: dbtype.decimal(16,2), null: false, default:0, unset:true, suppresslist: true
				},

				vou_bon: { text:'BonId', type: dbtype.varchar(32), null:true, unset:true, suppresslist: true },
				vou_useregionbranch: { text:'RegionBranch', type: dbtype.varchar(30), null:true, unset:true, suppresslist: true },
				vou_useregionbranchname: { text:'RegionBranchName', type: dbtype.varchar(90), null:true, unset:true, suppresslist: true },
				vou_usevalue: { text:'Use Value', type: dbtype.decimal(16,2), null:true, unset:true, suppresslist: true },

				vou_isdup: { 
					text: 'Duplication', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth:'300px' } 
				},		


				voubatch_id: {text:'ID', type: dbtype.varchar(5), null:false, hidden: true},
			}

		
		},

		'mst_voutnc' : {
			primarykeys: ['voutnc_id'],
			comment: 'Voucher Terms and Condition',
			data: {
				voutnc_id: {text:'ID', type: dbtype.varchar(14), null:false},
				voutnc_order: { text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options: {required: true} },
				voutnc_descr: {text:'Text', type: dbtype.varchar(255)},
				voubatch_id: {text:'ID', type: dbtype.varchar(5), null:false, hidden: true},
			}
		}
	},

	schema: {
		title: 'Voucher',
		header: 'mst_voubatch',
		detils: {
			'vou' : {title: 'Vouchers', table:'mst_vou', form: true, headerview:'voubatch_descr', editorHandler: true, listHandler: true},
			'tnc' : {title: 'Terms & Condition', table:'mst_voutnc', form: true, headerview:'voubatch_descr', editorHandler: true, listHandler: true},
		}
	}

}



