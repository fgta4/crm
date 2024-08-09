'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "KOL",
	autoid: true,

	persistent: {
		'mst_kol' : {
			primarykeys: ['kol_id'],
			comment: 'Master KOL',
			data: {
				kol_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true},

				koltype_id: {
					text:'Type', type: dbtype.varchar(10), null:true, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Type KOL harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_koltype', 
						field_value: 'koltype_id', field_display: 'koltype_name', 
						api: 'crm/engage/koltype/list'})				
				},

				kol_name: {text:'Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Karyawan harus diisi'}},
				kol_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},

				kol_picture: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},

				kol_birthplace: {text:'Birth Place', type: dbtype.varchar(30), null:true, suppresslist: true, uppercase: true},
				kol_birthdate: {text:'Birth Date', type: dbtype.date, null:true, suppresslist: true},

				gender_id: {
					text:'Gender', type: dbtype.varchar(1), null:true, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Gender harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_gender', 
						field_value: 'gender_id', field_display: 'gender_name', 
						api: 'ent/general/gender/list'})				
				},

				religion_id: {
					text:'Religion', type: dbtype.varchar(3), null:true, uppercase: true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_religion', 
						field_value: 'religion_id', field_display: 'religion_name', 
						api: 'ent/general/religion/list'})				
				},

				kol_city: {text:'City', type: dbtype.varchar(20), null:true, suppresslist: true, uppercase: true},

				kol_instagram: {text:'Instagram', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},
				kol_facebook: {text:'Facebook', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},
				kol_twitter: {text:'X', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},
				kol_tiktok: {text:'Tiktok', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},
				kol_youtube: {text:'Youtube', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},
				kol_blog: {text:'Blog', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},
				kol_website: {text:'Website', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},

				partner_id: { 
					text: 'Partner Id', type: dbtype.varchar(14), null: true,  suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						title: 'Pilih Kode Partner',
						table: 'mst_partner',
						field_value: 'partner_id', field_display: 'partner_name', field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'
					})
				},

			},

			defaultsearch : ['kol_id', 'kol_name'],
			uniques: {}		
		}
	},

	schema: {
		title: 'KOL',
		header: 'mst_kol',
		detils: {


		}
	}
}

