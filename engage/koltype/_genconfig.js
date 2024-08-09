'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "KOL Type",
	autoid: false,

	persistent: {
		'mst_koltype': {
			comment: 'Daftar Tipe Post Media',
			primarykeys: ['koltype_id'],
			data: {
				koltype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				koltype_name: { text: 'Tipe KOL', type: dbtype.varchar(50), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Model harus diisi' } },
			},

			uniques: {
				'koltype_name': ['koltype_name']
			},
			defaultsearch: ['koltype_id', 'koltype_name'],

			values: [
				{koltype_id:'CEL', koltype_name:'CELEBRITY'},
				{koltype_id:'INF', koltype_name:'INFLUENCER'},
				{koltype_id:'MOD', koltype_name:'MODEL'},
				{koltype_id:'SIN', koltype_name:'SINGER'},
				{koltype_id:'DJO', koltype_name:'DJ'},
			]
		},
	},

	schema: {
		title: "KOL Type",
		header: 'mst_koltype',
		detils: {
		}
	}


}