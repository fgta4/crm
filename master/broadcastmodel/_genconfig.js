'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Broadcast Model",
	autoid: false,

	persistent: {
		'mst_broadcastmodel': {
			comment: 'Daftar Tipe Broadcast',
			primarykeys: ['broadcastmodel_id'],
			data: {
				broadcastmodel_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				broadcastmodel_name: { text: 'Broadcast Model', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Model harus diisi' } },
			},

			uniques: {
				'broadcastmodel_name': ['broadcastmodel_name']
			},
			defaultsearch: ['broadcastmodel_id', 'broadcastmodel_name'],

			values: [
				{broadcastmodel_id:'WA', broadcastmodel_name:'WHATSAPP'},
				{broadcastmodel_id:'EM', broadcastmodel_name:'EMAIL'},
				{broadcastmodel_id:'SM', broadcastmodel_name:'SMS'},
			]
		},
	},

	schema: {
		title: "Broadcast Model",
		header: 'mst_broadcastmodel',
		detils: {
		}
	}


}