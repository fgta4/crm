'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Voucher Type",
	autoid: false,
	
	persistent: {
		'mst_voutype' : {
			primarykeys: ['voutype_id'],
			comment: 'Daftar Type Voucher',
			data: {
				voutype_id: {text:'ID', type: dbtype.varchar(5), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				voutype_name: {text:'Type Name', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Type Voucher harus diisi'}},
				voutype_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},

				voutype_randalocstart: {
					before: `
						<div class="form_row pnl_edit_row">
							<div class="form_label_col"  style="border: 0px solid black; vertical-align: top; margin-top: 7px;"></div>
							<div class="form_input_col voutype-row-before" style="border: 0px solid black">
								:: Random Value Allocation ::
							</div>
						</div>`,

					text:'Start', type: dbtype.int(2), null:false, default:'10', suppresslist: true, options: {required: true}
				},

				voutype_randalocend: {
					text:'End', type: dbtype.int(2), null:false, default:'99', suppresslist: true, options: {required: true}
				},

			},

			uniques : {
				'voutype_name': ['voutype_name']
			},
		},
	},

	schema: {
		title: 'Voucher Type',
		header: 'mst_voutype',
		detils: {
		}
	}

}		