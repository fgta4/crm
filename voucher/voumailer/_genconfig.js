'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Voucher Mailer",
	autoid: true,
	committer: true,


	persistent: {
		'mst_voumailer' : {
			primarykeys: ['voumailer_id'],
			comment: 'Daftar Batch Voucher',
			data: {
				voumailer_id: {text:'ID', type: dbtype.varchar(14), null:false},
				voumailer_dt: {text:'Date', type: dbtype.date, null:false},
				voumailer_descr: {text:'Descr', type: dbtype.varchar(255)},
				voumailer_subject: {text:'Subject', type: dbtype.varchar(60), suppresslist: true},
				voumailer_body: {text:'Body', type: dbtype.varchar(2600), suppresslist: true},

				voumailer_isprepared: { 
					text: 'Prepared', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } 
				},

				voumailer_ismailed: { 
					text: 'Mailed', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } 
				},
				voumailer_version: {
					section: section.Begin('Status'),
					text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}
				},
				voumailer_iscommit: {
					text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}
				},
				voumailer_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				voumailer_commitdate: {
					section: section.End(),
					text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true
				},	
	
			},
		},

		'mst_voumaileritem' : {
			primarykeys: ['voumaileritem_id'],
			comment: 'Daftar Voucher',
			data: {
				voumaileritem_id: {text:'ID', type: dbtype.varchar(14), null:false},
				voumailer_subject: {text:'Subject', type: dbtype.varchar(60), suppresslist: true},
				voumailer_body: {text:'Body', type: dbtype.varchar(2600), suppresslist: true},
				voubatch_id: {
					text: 'Batch', type: dbtype.varchar(5), null: true,
					options: { required: true, invalidMessage: 'Batch harus diisi'},
					comp: comp.Combo({
						table: 'mst_voubatch',
						field_value: 'voubatch_id', field_display: 'voubatch_descr',
						api: 'crm/voucher/voubatch/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false	
					})
				},
				
				voumaileritem_qty: {
					text:'Qty', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options: {required: true}
				},

				voumailer_id: {text:'Mailer', type: dbtype.varchar(14), null:false, hidden: true},
			}

		
		},


		'mst_voumaileremail' : {
			primarykeys: ['voumaileremail_id'],
			comment: 'Daftar Voucher',
			data: {
				voumaileremail_id: {text:'ID', type: dbtype.varchar(14), null:false},
				voumaileremail_email: {text:'Email', type: dbtype.varchar(60)},
				voumaileremail_nama: {text:'Nama', type: dbtype.varchar(60)},
				voumailer_id: {text:'Mailer', type: dbtype.varchar(14), null:false, hidden: true},
			},
			uniques: {
				'voumaileremail_email': ['voumailer_id', 'voumaileremail_email']
			},
		},

		'mst_voumailerque' : {
			primarykeys: ['voumailerque_id'],
			comment: 'Daftar Voucher',
			data: {
				voumailerque_id: {text:'ID', type: dbtype.varchar(14), null:false},
				voumailerque_email: {text:'Email', type: dbtype.varchar(60)},
				voumailerque_nama: {text:'Nama', type: dbtype.varchar(60)},
				// voumailerque_subject: {text:'Subject', type: dbtype.varchar(60), suppresslist: true},
				// voumailerque_body: {text:'Body', type: dbtype.varchar(2600), suppresslist: true},
				voubatch_id: { 
					text: 'Vou Batch', type: dbtype.varchar(5),  null: false, suppresslist: true, 
					reference: {table: 'mst_voubatch', field_value: 'voubatch_id', field_display:'voubatch_descr',  field_display_name:'voubatch_descr'}, 
					options: { required: true, invalidMessage: 'Vou Batch harus diisi', disabled: true } 
				},

				vou_id: { 
					text: 'Voucher', type: dbtype.varchar(14),  null: false, suppresslist: true, 
					reference: {table: 'mst_vou', field_value: 'vou_id', field_display:'vou_no',  field_display_name:'vou_no'}, 
					options: { required: true, invalidMessage: 'Voucher harus diisi', disabled: true } 
				},

				msg_id: { text: 'Messaging ID', type: dbtype.varchar(14), null: true },
				
				voumailerque_issend: {
					text:'Send', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}
				},
				voumailerque_sendby: {text:'SendBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, lookup:'user'},
				voumailerque_senddate: {
					text:'SendDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true},
				},	

				voumailer_id: {text:'Mailer', type: dbtype.varchar(14), null:false, hidden: true},
			},
			uniques: {
				'voumaileremail_email': ['voumailer_id', 'voumailerque_email', 'voubatch_id'],
				'voumaileremail_vou': ['vou_id'],
			},
		}

	},

	schema: {
		title: 'Voucher Mailer',
		header: 'mst_voumailer',
		detils: {
			'items' : {title: 'Vouchers', table:'mst_voumaileritem', form: true, headerview:'voumailer_descr', editorHandler: true, listHandler: true},
			'email' : {title: 'Email', table:'mst_voumaileremail', form: true, headerview:'voumailer_descr', editorHandler: true, listHandler: true},
			'que' : {title: 'Que', table:'mst_voumailerque', form: true, headerview:'voumailer_descr', editorHandler: true, listHandler: true},

		}
	}

}



