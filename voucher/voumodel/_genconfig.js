'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Model Voucher",
	autoid: false,
	
	persistent: {
		'mst_voumodel' : {
			primarykeys: ['voumodel_id'],
			comment: 'Daftar Model Voucher',
			data: {
				voumodel_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				voumodel_name: {text:'Model Name', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Type Voucher harus diisi'}},
				voumodel_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true}
			},
			uniques : {
				'voumodel_name': ['voumodel_name']
			},

		},
	},

	schema: {
		title: 'Model Voucher',
		header: 'mst_voumodel',
		detils: {
		}
	}

}		