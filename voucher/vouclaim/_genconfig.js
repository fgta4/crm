'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Voucher Claim",
	autoid: true,
	committer: true,


	persistent: {
		'mst_vouclaim' : {
			primarykeys: ['vouclaim_id'],
			comment: 'Daftar Claim Voucher',
			data: {
			}			
		},

		'mst_vouclaimitem' : {
			primarykeys: ['vouclaim_id'],
			comment: 'Daftar Claim Voucher',
			data: {
			}
		}
	},

	schema: {
		title: 'Voucher Claim',
		header: 'mst_vouclaim',
		detils: {
			'vou' : {title: 'Vouchers', table:'mst_vouclaimitem', form: true, headerview:'vouclaim_code', editorHandler: true, listHandler: true},
		}
	}

}	