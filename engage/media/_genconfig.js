'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Media",
	autoid: true,

	persistent: {
		'mst_media' : {
			primarykeys: ['media_id'],
			comment: 'Master Media',
			data: {
				media_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true},
				media_name: {text:'Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Karyawan harus diisi'}},
				media_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				media_city: {text:'City', type: dbtype.varchar(20), null:true, suppresslist: true, uppercase: true},

				media_instagram: {text:'Instagram', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},
				media_facebook: {text:'Facebook', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},
				media_twitter: {text:'X', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},
				media_tiktok: {text:'Tiktok', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},
				media_youtube: {text:'Youtube', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},
				media_blog: {text:'Blog', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},
				media_website: {text:'Website', type: dbtype.varchar(255), null:true, suppresslist: true, lowercase: true},

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

			defaultsearch : ['media_id', 'media_name'],
			uniques: {}		
		}
	},

	schema: {
		title: 'Media',
		header: 'mst_media',
		detils: {


		}
	}
}

