'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Request Voucher",
	autoid: true,
	
	persistent: {
		'mst_voureq' : {
			primarykeys: ['voureq_id'],
			comment: 'Daftar Request Voucher',
			data: {
				voureq_id: {text:'ID', type: dbtype.varchar(14)},
				voureq_room: {text:'Phone', type: dbtype.varchar(30), suppresslist: true},
				voureq_phone: {text:'Phone', type: dbtype.varchar(30), suppresslist: true},
				voureq_message: {text:'Message', type: dbtype.varchar(2000), suppresslist: true},
				voureq_isvougenerate: { 
					text: 'Generated', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth:'300px' } 
				},
				voureq_result: {text:'Result', type: dbtype.varchar(255), suppresslist: true},
				vou_id: {text:'Voucher', type: dbtype.varchar(30), suppresslist: true},
				site_id: {text:'Voucher', type: dbtype.varchar(30), suppresslist: true},
				voureq_info: {text:'Info', type: dbtype.varchar(2000), suppresslist: true},
				voureq_isresend: { 
					text: 'resend', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth:'300px' } 
				},
			}
		},
	},

	schema: {
		title: 'Request Voucher',
		header: 'mst_voureq',
		detils: {
		}
	}

}		