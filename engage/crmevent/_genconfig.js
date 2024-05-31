'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Event",
	autoid: true,
	icon: "icon-crmevent-white.png",

	persistent: {
		'trn_crmevent' : {
			primarykeys: ['crmevent_id'],
			comment: 'CRM Event, suseuatu yang dilakukan untuk mencari calon customer baru',
			data: {
				crmevent_id: {text:'ID', type: dbtype.varchar(14), null:false},
				crmevent_name: {text:'Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Event harus diisi'}},
				crmevent_descr: {text:'Descr', type: dbtype.varchar(255), null:true, suppresslist: true},
				crmevent_dtstart: {text:'Start Date', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Tanggal mulai harus diisi'}},
				crmevent_dtend: {text:'End Date', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Tanggal selesai harus diisi'}},
				crmevent_dtaffected: {text:'Affected Until', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Batas Tanggal efektif harus diisi'}},
				crmevent_message: {text:'Message', type: dbtype.varchar(1000), null:true, suppresslist: true},
				crmevent_registeredmessage: {text:'Registered Message', type: dbtype.varchar(1000), null:true, suppresslist: true},

				crmevent_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0'},
				crmevent_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				crmevent_isunlimit: {text:'Unlimit', type: dbtype.boolean, null:false, default:'0'},
				crmevent_isclose: {text:'Close', type: dbtype.boolean, null:false, default:'0'},

				crmevent_targetinvited: {
					text: 'Target Invited', type: dbtype.decimal(8,0), null:true, suppresslist: true,
					tips: 'Target Calon Audience yang <b>akan diundang</b>.<br>Untuk ads misalnya IG,FB atau Google, bisa dikosongi.',
					tipstype: 'visible'			
				},
				
				crmevent_targetattendant: {
					text:'Target Attendant', type: dbtype.decimal(8,0), null:true, suppresslist: true,
					tips: 'Target Audience yang <b>menghadiri</b> event ini.<br>Untuk digital ads, adalah actual audience yang melakukan telah kontak.'			
				},
				
				crmevent_targetnewcontact: {text:'Target New Contact', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targettx: {text:'Target Tx', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targettxnew: {text:'Target New Tx', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targetbuyer: {text:'Target Buyer', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targetbuyernew: {text:'Target Buyer New', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targetsales: {text:'Target Sales', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targetsalesnew: {text:'Target Sales New', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true},

				crmevent_totalinvited: {text:'Total Invited', type: dbtype.decimal(8,0), null:false, default:'0',  suppresslist: true, options:{disabled:true}},
				crmevent_totalattendant: {text:'Total Attendant', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totalnewcontact: {text:'Total New Contact', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totaltx: {text:'Total Tx', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totaltxnew: {text:'Total New Tx', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totalbuyer: {text:'Total Buyer', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totalbuyernew: {text:'Total Buyer New', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totalsales: {text:'Total Sales', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totalsalesnew: {text:'Total Sales New', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				
				crmsource_id: {
					text:'Alokasi Source', type: dbtype.varchar(10), null:true, suppresslist: true,
					options:{prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_crmsource', 
						field_value: 'crmsource_id', field_display: 'crmsource_name', 
						api: 'crm/master/crmsource/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true					
					})				
				},
			},

			defaultsearch : ['crmevent_id', 'crmevent_name'],

			uniques: {
				'crmevent_name' : ['crmevent_name']
			},

			// values: [
			// 	{crmevent_id:'MANUAL', crmevent_name:'MANUAL', crmevent_dtstart:'2020-01-01', crmevent_dtend:'2030-12-31', crmevent_isunlimit:'1'}
			// ],			
		},


		'trn_crmeventinvited' : {
			primarykeys: ['crmeventinvited_id'],
			comment: 'CRM Event Invited, yang diundang di event ini, baik yang sudah ada di contact atau belum. data ini sifatnya bulk.',
			data: {
				crmeventinvited_id: {text:'ID', type: dbtype.varchar(14), null:false},

				crmeventinvited_name : {text:'Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama harus diisi'}},
				crmeventinvited_address : {text:'Adress', type: dbtype.varchar(255), null:true, uppercase: true, suppresslist: true},
				crmeventinvited_city : {text:'City', type: dbtype.varchar(30), null:true, uppercase: true, suppresslist: true},

				crmeventinvited_phone : {
					text:'Phone', type: dbtype.varchar(90), null:true, uppercase: true, options:{required:true,invalidMessage:'nomor telpon harus diisi'},
					tips: 'Nomor telp yang akan di hubungi',
					tipstype: 'visible'					
				},

				crmeventinvited_email : {
					text:'Email', type: dbtype.varchar(90), null:true, lowercase: true,
					tips: 'Email yang akan di hubungi',
					tipstype: 'visible'					
				},

				invitation_id: {text:'Invitation Id', type: dbtype.varchar(30), null:true},
				crmeventinvited_iscontacted: {text:'Contacted', type: dbtype.boolean, null:false, default:'0', options:{readonly: true}},
				crmeventinvited_contactdate: {text:'Contact Date', type: dbtype.date, null:true, suppresslist: true, options:{readonly: true}},

				user_id: {
					text:'PIC', type: dbtype.varchar(14), null:true, uppercase: true, suppresslist: true,
					options:{prompt:'NONE'},
					tips: 'yang bertugas menghubungi kontak ini',
					comp: comp.Combo({
						table: 'fgt_user', 
						field_value: 'user_id', field_display: 'user_fullname', 
						api: 'fgta/framework/fguser/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true					
					})				
				},

				crmevent_id: {text:'Event', type: dbtype.varchar(14), null:false},
			}			
		},

		'trn_crmeventattendant' : {
			primarykeys: ['crmeventattendant_id'],
			comment: 'CRM Event Atendant, yang datang di event ini',
			readonly: true,
			data: {
				crmeventattendant_id: {text:'ID', type: dbtype.varchar(14), null:false},
				invitation_id: {text:'Invitation Id', type: dbtype.varchar(30), null:false},
				crmeventattendant_phone : {text:'Phone', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nomor telpon harus diisi'}},
				crmeventattendant_name : {text:'Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama harus diisi'}},
				crmeventattendant_address : {text:'Name', type: dbtype.varchar(255), null:false, uppercase: true},
				crmeventattendant_city : {text:'City', type: dbtype.varchar(30), null:false, uppercase: true},
				crmeventattendant_date: {text:'Tanggal Hadir', type: dbtype.date, null:true, suppresslist: true},
				crmeventattendant_time: {text:'Jam hadir', type: dbtype.time, null:true, suppresslist: true},
				crmevent_id: {text:'Event', type: dbtype.varchar(14), null:false},
			}			
		},		

	},

	schema: {
		title: 'CRM Event',
		header: 'trn_crmevent',
		detils: {
			invited : {
				title: 'Invited', table:'trn_crmeventinvited', form: true, headerview:'crmevent_name',
				editorHandler: true,
				listHandler: true
			},
			attendant : {
				title: 'Attendant', table:'trn_crmeventattendant', form: true, headerview:'crmevent_name',
				editorHandler: true,
				listHandler: true
			},
		}
	}
}
