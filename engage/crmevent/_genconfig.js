'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Event",
	autoid: true,
	icon: "icon-crmevents-white.png",

	persistent: {
		'trn_crmevent' : {
			primarykeys: ['crmevent_id'],
			comment: 'CRM Event, suseuatu yang dilakukan untuk mencari calon customer baru',
			data: {
				crmevent_id: {text:'ID', type: dbtype.varchar(14), null:false},

				crmevent_name: {text:'Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Event harus diisi'}},
				crmevent_descr: {text:'Descr', type: dbtype.varchar(255), null:true, suppresslist: true},
				crmevent_dtactive: {text:'Activated Date', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Tanggal mulai harus diisi'}},
				crmevent_dtstart: {text:'Start Date', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Tanggal mulai harus diisi'}},
				crmevent_dtend: {text:'End Date', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Tanggal selesai harus diisi'}},
				crmevent_dtaffected: {text:'Affected Until', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Batas Tanggal efektif harus diisi'}},
				crmevent_message: {text:'Message', type: dbtype.varchar(1000), null:true, suppresslist: true},
				crmevent_invitationmessage: {text:'Invitation Message', type: dbtype.varchar(1000), null:true, suppresslist: true},
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
				
				
				crmevent_targettx: {
					section: section.Begin('Transaction Target'),
					text:'Target Tx', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targettxnew: {text:'Target New Tx', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targetbuyer: {text:'Target Buyer', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targetbuyernew: {text:'Target Buyer New', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targetsales: {text:'Target Sales', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targetsalesnew: {
					section: section.End(),
					text:'Target Sales New', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true},

				crmevent_totalinvited: {
					section: section.Begin('Result'),
					text:'Total Invited', type: dbtype.decimal(8,0), null:false, default:'0',  suppresslist: true, options:{disabled:true}},
				crmevent_totalattendant: {text:'Total Attendant', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totalnewcontact: {text:'Total New Contact', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totaltx: {text:'Total Tx', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totaltxnew: {text:'Total New Tx', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totalbuyer: {text:'Total Buyer', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totalbuyernew: {text:'Total Buyer New', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totalsales: {text:'Total Sales', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				crmevent_totalsalesnew: {
					section: section.End(),
					text:'Total Sales New', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				

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


		'trn_crmeventkol' : {
			primarykeys: ['crmeventkol_id'],
			comment: '',
			data: {
				crmeventkol_id: {text:'ID', type: dbtype.varchar(14), null:false},
				
				kol_id: { 
					text: 'KOL', type: dbtype.varchar(30), null: true, 
					options: { required: true, invalidMessage:'KOL harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih KOL',
						table: 'mst_kol',
						field_value: 'kol_id', field_display: 'kol_name', field_display_name: 'kol_name',
						api: 'crm/engage/kol/list'
					})
				},
				crmeventkol_cost: {text:'Cost', type: dbtype.decimal(12,2), null:false, default:'0',  options:{}},
				crmeventkol_notes : {text:'Notes', type: dbtype.varchar(1000), null:false, suppresslist: true,},
				crmeventkol_file: {text:'File', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: '*' }},
				crmevent_id: {text:'Event', type: dbtype.varchar(14), null:false},
			}
		},

		'trn_crmeventmedia' : {
			primarykeys: ['crmeventmedia_id'],
			comment: '',
			data: {
				crmeventmedia_id: {text:'ID', type: dbtype.varchar(14), null:false},
				
				media_id: { 
					text: 'Media', type: dbtype.varchar(30), null: true,  
					options: { required: true, invalidMessage:'Media harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Media',
						table: 'mst_media',
						field_value: 'media_id', field_display: 'media_name', field_display_name: 'media_name',
						api: 'crm/engage/media/list'
					})
				},

				crmeventmedia_cost: {text:'Cost', type: dbtype.decimal(12,2), null:false, default:'0', options:{}},
				crmeventmedia_notes : {text:'Notes', type: dbtype.varchar(1000), null:false, suppresslist: true,},
				crmeventmedia_file: {text:'File', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: '*' }},
				crmevent_id: {text:'Event', type: dbtype.varchar(14), null:false},
			}
		},

		'trn_crmeventpost' : {
			primarykeys: ['crmeventpost_id'],
			comment: '',
			data: {
				crmeventpost_id: {text:'ID', type: dbtype.varchar(14), null:false},
				crmeventpost_url: {text:'URL', type: dbtype.varchar(500), null:true, lowercase: true},

				crmeventpost_dtpost: {text:'Post Date', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Tanggal mulai harus diisi'}},
				crmeventpost_dtreported: {text:'Reported Date', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Tanggal selesai harus diisi'}},

				mediaposttype_id: { 
					text: 'Post Type', type: dbtype.varchar(10), null: true,  
					options: { required: true, invalidMessage:'Post Type harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Post Type',
						table: 'mst_mediaposttype',
						field_value: 'mediaposttype_id', field_display: 'mediaposttype_name', field_display_name: 'mediaposttype_name',
						api: 'crm/engage/mediaposttype/list'
					})
				},


				kol_id: { 
					text: 'KOL', type: dbtype.varchar(30), null: true,  
					options: { prompt: 'NONE'}, 
					comp: comp.Combo({
						title: 'Pilih KOL',
						table: 'mst_kol',
						field_value: 'kol_id', field_display: 'kol_name', field_display_name: 'kol_name',
						api: 'crm/engage/kol/list'
					})
				},

				media_id: { 
					text: 'Media', type: dbtype.varchar(30), null: true, 
					options: { prompt: 'NONE'}, 
					comp: comp.Combo({
						title: 'Pilih Meida',
						table: 'mst_media',
						field_value: 'media_id', field_display: 'media_name', field_display_name: 'media_name',
						api: 'crm/engage/media/list'
					})
				},

				crmeventpost_impression: {class:'mt-edi mt-fb-post mt-ig-post mt-ig-reel mt-ig-story', text:'Impression', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{}},
				crmeventpost_reach: {class:'mt-edi mt-fb-post mt-ig-post mt-ig-reel mt-ig-story', text:'Reach', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{}},

				/*
				crmeventpost_reach_fl: {text:'Reach (Follower)', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{}},
				crmeventpost_reach_nf: {text:'Reach (Non Follower', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{}},

				crmeventpost_engagement: {text:'Engagement', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{}},
				crmeventpost_stint_shared: {text:'Shared', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{}},
				crmeventpost_stint_reply: {text:'Reply', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{}},
				crmeventpost_stint_likes: {text:'Likes', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{}},
				*/

				crmeventpost_view: {text:'View', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{}},
				crmeventpost_comment: {text:'Comment', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{}},
				crmeventpost_likes: {text:'Likes', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{}},
				crmeventpost_share: {text:'Share', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{}},
				crmeventpost_save: {text:'Saved', type: dbtype.decimal(8,0), null:false, default:'0', suppresslist: true, options:{}},
				crmeventpost_engagementrate: {text:'Rate', type: dbtype.decimal(8,2), null:false, default:'0', suppresslist: false, options:{}},

				mediaposttype_iskol: {text:'IsKOL', type: dbtype.boolean, null:false, default:'0'},
				crmevent_id: {text:'Event', type: dbtype.varchar(14), null:false},
			}
		}

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
			kol : {
				title: 'KOL', table:'trn_crmeventkol', form: true, headerview:'crmevent_name',
				editorHandler: true,
				listHandler: true
			},
			media : {
				title: 'Media', table:'trn_crmeventmedia', form: true, headerview:'crmevent_name',
				editorHandler: true,
				listHandler: true
			},
			post : {
				title: 'Post', table:'trn_crmeventpost', form: true, headerview:'crmevent_name',
				editorHandler: true,
				listHandler: true
			},
			summary : {
				title: 'Summary', table: 'trn_crmevent', form: false, 
				//tabvisible: false,
				overwrite:{mjs:false, phtml:false}
			},


		}
	}
}
