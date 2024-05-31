'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Broadcast Type",
	autoid: true,

	persistent: {
		'mst_broadcasttype': {
			comment: 'Daftar Tipe Broadcast',
			primarykeys: ['broadcasttype_id'],
			data: {
				broadcasttype_id: { text: 'ID', type: dbtype.varchar(14), null: false},
				broadcasttype_name: { text: 'Broadcast Type', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Tipe harus diisi' } },
				broadcastmodel_id: {
					text: 'Model', type: dbtype.varchar(10), null: false, 
					options: { required: true, invalidMessage: 'Model harus diisi'},
					comp: comp.Combo({
						table: 'mst_broadcastmodel',
						field_value: 'broadcastmodel_id', field_display: 'broadcastmodel_name', field_display_name: 'broadcastmodel_name',
						api: 'crm/master/broadcastmodel/list'
					})
				},

				partner_id: {
					text:'Partner/Operator', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{required:true,invalidMessage:'Partner/Operator harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list-approved'})
				},

				broadcasttype_costpermessage: { text: 'Cost per Message', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true},
				broadcasttype_creditpermessage: { text: 'Credit per Message', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true},

				cost_accbudget_id: {
					text:'Cost Budget Account', type: dbtype.varchar(20), null:true, suppresslist: true,
					options:{required:true,invalidMessage:'Account Budget harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_accbudget', 
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'cost_accbudget_name', 
						api: 'finact/master/accbudget/list'})
				},

				cost_coa_id: {
					text: 'Cost Account', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Account harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'cost_coa_name', 
						api: 'finact/master/coa/list'
					})
				},

				process_dept_id: {
					text: 'Process Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen User harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'process_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

			},

			uniques: {
				'broadcasttype_name': ['broadcasttype_name']
			},
			defaultsearch: ['broadcasttype_id', 'broadcasttype_name']
		},
	},

	schema: {
		title: "Broadcast Type",
		header: 'mst_broadcasttype',
		detils: {
		}
	}


}