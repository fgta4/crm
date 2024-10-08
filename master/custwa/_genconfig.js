'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Customer Whatsapp",
	autoid: true,

	persistent: {
		'mst_custwa' : {
			primarykeys: ['custwa_id'],
			comment: 'Daftar Customer Whatsapp',
			data: {
				custwa_id: {text:'ID', type: dbtype.varchar(16), null:false},
				custwa_name: {text:'Name', type: dbtype.varchar(60), null:false, options:{required:true,invalidMessage:'Name harus diisi'}},
				custwa_gender: {text:'Gender', type: dbtype.varchar(1), null:true},
			},

			defaultsearch : ['custwa_id', 'custwa_name']

		},

		'mst_custwalinkreq' : {
			primarykeys: ['custwalinkreq_id'],
			comment: 'Daftar Contact Customer',
			data: {
				custwalinkreq_id: {text:'ID', type: dbtype.varchar(32), null:false},
				ref: {text:'Ref', type: dbtype.varchar(32)},
				intent: {text:'Intent', type: dbtype.varchar(128), null:false},
				room_id: {text:'Room', type: dbtype.varchar(32), null:false},
				message: {text:'Message', type: dbtype.varchar(1024), null:false},
				voubatch_id: {text:'VouBatch', type: dbtype.varchar(32)},
				vou_id: {text:'Voucher', type: dbtype.varchar(32)},
				crmevent_id: {text:'Event', type: dbtype.varchar(32)},
				code: {text:'Code', type: dbtype.varchar(32)},
				slpart: {text:'SL part', type: dbtype.varchar(32)},
				data: {text:'Data', type: dbtype.varchar(2048)},
				result: {text:'Result', type: dbtype.varchar(2048)},
				status: {text:'Status', type: dbtype.varchar(3)},
				custwa_id: {text:'Customer', type: dbtype.varchar(14), null:false, hidden: true},
			}
		}
	},

	schema: {
		title: 'Customer WA',
		header: 'mst_custwa',
		detils: {
			'link' : {title: 'Link', table:'mst_custwalinkreq', form: true, headerview:'custwa_name', editorHandler: true, listHandler: true},
		}
	}
}
