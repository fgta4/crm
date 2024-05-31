'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Quota",
	autoid: true,

	persistent: {
		'mst_broadcastquota': {
			comment: 'Daftar Tipe Quota Broadcast',
			primarykeys: ['broadcastquota_id'],
			data: {
				broadcastquota_id: { text: 'ID', type: dbtype.varchar(14), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				broadcasttype_id: {
					text: 'Type', type: dbtype.varchar(14), null: false, 
					options: { required: true, invalidMessage: 'Type harus diisi'},
					comp: comp.Combo({
						table: 'mst_broadcasttype',
						field_value: 'broadcasttype_id', field_display: 'broadcasttype_name', field_display_name: 'broadcasttype_name',
						api: 'crm/master/broadcasttype/list'
					})
				},

				broadcastquota_name: { text: 'Broadcast Quota Name', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Quota harus diisi' } },

				broadcastquota_saldovalue: { text: 'Saldo Value', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options: { disabled: true}},
				broadcastquota_saldocredit: { text: 'Saldo Credit', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true, options: { disabled: true}},

				prepaid_accbudget_id: {
					text:'Prepaid Budget Account', type: dbtype.varchar(20), null:true, suppresslist: true,
					options:{required:true,invalidMessage:'Account Budget harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_accbudget', 
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'prepaid_accbudget_name', 
						api: 'finact/master/accbudget/list'})
				},

				prepaid_coa_id: {
					text: 'Prepaid Account', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Account harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'prepaid_coa_name', 
						api: 'finact/master/coa/list'
					})
				},

				broadcastmodel_id: {
					text: 'Model', type: dbtype.varchar(10), null: false, 
					options: { required: true, invalidMessage: 'Model harus diisi'},
					comp: comp.Combo({
						table: 'mst_broadcastmodel',
						field_value: 'broadcastmodel_id', field_display: 'broadcastmodel_name', field_display_name: 'broadcastmodel_name',
						api: 'crm/master/broadcastmodel/list'
					})
				},

			},

			uniques: {
				'broadcastquota_name': ['broadcastquota_name']
			},


			defaultsearch: ['broadcastquota_id', 'broadcastquota_name']

		},
	},

	schema: {
		title: "Quota",
		header: 'mst_broadcastquota',
		detils: {
		}
	}


}