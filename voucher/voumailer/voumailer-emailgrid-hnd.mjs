let grd_list, opt;
var this_page_id;
var this_page_options;


const obj_pastebox = $('#pnl_list-obj_pastebox');


export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	console.log(param);


	obj_pastebox[0].addEventListener('paste', (e) => {
		var clipboardData = e.clipboardData || window.clipboardData;
		var pastedData = clipboardData.getData('Text');
		// var selected_month = cbo_month.combo('getValue');
		// if (selected_month=='') return;

		obj_pastebox.hide();
		obj_pastebox.html('');
		obj_pastebox_paste(pastedData, (err)=>{
			obj_pastebox.show();

		});

		// $ui.ShowMessage("[QUESTION]Apakah anda yakin akan <b>upload</b> data ?", {
		// 	"OK": async () => {
		// 		obj_pastebox.hide();
		// 		obj_pastebox.html('');
		// 		obj_pastebox_paste(pastedData, (err)=>{
		// 			obj_pastebox.show();
		// 		});
		// 	},
		// 	"Cancel": () => {
		// 	}
		// })

	});

	fn_callback();
}

	

async function obj_pastebox_paste(pastedData, fn_finish) {
	var colspattern = "email $ nama";
	var rows = pastedData.split("\n");

	try {
		var i = 0;
		var data = [];
		for (var row of rows) {
			if (row === "") continue;
			var cells = row.split("\t");

			if (i==0) {
				var headpatt = cells.join(' $ ').trim();
				if (headpatt.toUpperCase()!=colspattern.toUpperCase()) {
					console.log(headpatt.toUpperCase());
					console.log(colspattern.toUpperCase());
					throw new Error('Format data tidak sesuai');
				}
			} else {
				var email = cells[0];
				var nama = cells[1];
				data.push({
					nama: nama,
					email: email
				});
			}
			i++;
		}

		// kirim data ke server
		await saveEmailData(data);
		
		setTimeout(()=>{
			fn_finish();
		}, 1000);


	} catch (err) {
		console.error(err);
	}


}

async function saveEmailData(data) {
	var header_data = grd_list.getHeaderData();
	var id = header_data.voumailer_id;
	console.log(header_data);

	var args = {
		action: 'uploademail',
		id: id,
		use_otp: false
	}

	args.act_url = `${global.modulefullname}/xtion-uploademail`;
	args.act_msg_quest = `Apakah anda yakin akan <b>Upload</b> data batch mailer no ${id} ?`;
	args.param = {
		dataemail: data
	}

	try {
		$ui.mask('wait..');
		var { doAction } = await import('../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4xtion.mjs');
		await doAction(args, (err, result) => {
			if (err) {
				$ui.ShowMessage('[WARNING]' + err.message);	
			} else {
				$ui.ShowMessage('[INFO]' + `batch mailer no ${id} telah di prepare.`, {
					'Ok': () => {
						grd_list.doLoad();
					}
				});	
			}
		});
	} catch (err) {
		console.error(err);
		$ui.ShowMessage('[ERROR]' + err.message);
	} finally {
		$ui.unmask();
	}	
}