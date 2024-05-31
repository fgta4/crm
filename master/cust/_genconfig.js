'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Customer",
	autoid: true,

	persistent: {
		'mst_cust' : {
			primarykeys: ['cust_id'],
			comment: 'Daftar Customer',
			data: {
				cust_id: {text:'ID', type: dbtype.varchar(14), null:false},
				cust_name: {text:'Name', type: dbtype.varchar(60), null:false, options:{required:true,invalidMessage:'Name harus diisi'}},
				cust_mainphonenumber: {text:'Phone Number', type: dbtype.varchar(60), null:true},
				cust_mainemail: {text:'Email', type: dbtype.varchar(60), null:true},
				cust_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				cust_birthplace: {text:'Birth Place', type: dbtype.varchar(30), null:true, suppresslist: true},
				cust_ishasbirthinfo: {
					text:'Has Birth Information', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {labelWidth:'300px'},
					handlers: {
						onChange: {
							params: 'checked',
							functionname: 'cust_ishasbirthinfo_changed'
						}
					}
				},
				cust_birthdate: {text:'Birth Date', type: dbtype.date, null:true, suppresslist: true, options:{required:true,invalidMessage:'Tanggal lahir harus diisi'}},
				cust_isrecvoffer: {caption:'Offer', text:'Allow Receive Offer', type: dbtype.boolean, null:false, default:'1', suppresslist: true, options: {labelWidth:'300px'}},
				cust_reasonrejectoffer: {text:'Reject Reason', type: dbtype.varchar(255), null:true, suppresslist: true},
			},

			defaultsearch : ['cust_id', 'cust_name']

		},

		'mst_custcontact' : {
			primarykeys: ['custcontact_id'],
			comment: 'Daftar Contact Customer',
			data: {
				custcontact_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true},
				custcontact_data: {text:'Data', type: dbtype.varchar(60), null:false, uppercase: true},
				custcontact_isemail: {caption:'Contact Type', text:'Email', type: dbtype.boolean, null:false, default:'0'},
				custcontact_isphone: { text:'Phone Number', type: dbtype.boolean, null:false, default:'0'},
				custcontact_iswhatsapp: { text:'Whatsapp', type: dbtype.boolean, null:false, default:'0'},
				cust_id: {text:'Customer', type: dbtype.varchar(14), null:false, hidden: true},
			},
			uniques: {
				'custcontact_data' : ['custcontact_data']
			}			
		},		

		'mst_custaddress' : {
			primarykeys: ['custaddress_id'],
			comment: 'Daftar Address Customer',
			data: {
				custaddress_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true},
				custaddress_line1: {text:'Address', type: dbtype.varchar(255), null:true},
				custaddress_line2: {text:'', type: dbtype.varchar(255), null:true, suppresslist: true},
				custaddress_line3: {text:'', type: dbtype.varchar(255), null:true, suppresslist: true},
				custaddress_city: {text:'City', type: dbtype.varchar(60), null:true},
				custaddress_prov: {text:'Prov', type: dbtype.varchar(60), null:true},
				custaddress_postcode: {text:'PostCode', type: dbtype.varchar(20), null:true},
				cust_id: {text:'Customer', type: dbtype.varchar(14), null:false, hidden: true},
			}
		},

	},

	schema: {
		title: 'Customer',
		header: 'mst_cust',
		detils: {
			'upload' : {
				title: 'Upload', table:'mst_custaddress', form: false, tabvisible: false, 
				overwrite : {
					mjs_list: false, // tidak akan digenerate ulang
					phtml_list: false, // tidak akan digenerate ulang
				}
			},
			'contact' : {title: 'Contact', table:'mst_custcontact', form: true, headerview:'cust_name', editorHandler: true, listHandler: true},
			'address' : {title: 'Address', table:'mst_custaddress', form: true, headerview:'cust_name', editorHandler: true, listHandler: true},
		}
	}
}
