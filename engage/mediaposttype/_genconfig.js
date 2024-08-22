'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Media Post Type",
	autoid: false,

	persistent: {
		'mst_mediaposttype': {
			comment: 'Daftar Tipe Post Media',
			primarykeys: ['mediaposttype_id'],
			data: {
				mediaposttype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				mediaposttype_name: { text: 'Tipe Post', type: dbtype.varchar(50), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Model harus diisi' } },
				mediaposttype_iskol: {text:'IsKOL', type: dbtype.boolean, null:false, default:'0'},
			},

			uniques: {
				'mediaposttype_name': ['mediaposttype_name']
			},
			defaultsearch: ['mediaposttype_id', 'mediaposttype_name'],

			values: [
				{mediaposttype_id:'IGP', mediaposttype_name:'INSTAGRAM-POST', mediaposttype_iskol:1},
				{mediaposttype_id:'IGR', mediaposttype_name:'INSTAGRAM-REELS', mediaposttype_iskol:1},
				{mediaposttype_id:'IGS', mediaposttype_name:'INSTAGRAM-STORY', mediaposttype_iskol:1},
				{mediaposttype_id:'FBP', mediaposttype_name:'FACEBOOK-POST', mediaposttype_iskol:1},
				{mediaposttype_id:'EDI', mediaposttype_name:'EDITORIAL', mediaposttype_iskol:0},

			]
		},
	},

	schema: {
		title: "Media Post Type",
		header: 'mst_mediaposttype',
		detils: {
		}
	}


}