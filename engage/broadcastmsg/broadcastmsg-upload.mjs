var this_page_id;

const obj_pastebox = $('#pnl_editupload-obj_pastebox');
const obj_pastewait = $('#pnl_editupload-obj_pastewait');


let header_data;

export async function init(opt) {
	this_page_id = opt.id
	



	obj_pastebox[0].addEventListener('paste', (e) => {
		obj_pastebox.hide();
		obj_pastewait.show();

		var clipboardData = e.clipboardData || window.clipboardData;
		var pastedData = clipboardData.getData('Text');
		$ui.ShowMessage("[QUESTION]Apakah anda yakin akan <b>upload</b> data ?", {
			"OK": async () => {
				obj_pastebox.hide();
				obj_pastebox.html('');
				var hdata = get_header_data();
				if (hdata.broadcastmsg_isexecute) {
					obj_pastebox_paste_result(pastedData, (err)=>{
						obj_pastebox.show();
						obj_pastewait.hide();
	
					});
				} else {
					obj_pastebox_paste_target(pastedData, (err)=>{
						obj_pastebox.show();
						obj_pastewait.hide();

						$ui.getPages().show('pnl_edittargetgrid', ()=>{
							$ui.getPages().ITEMS['pnl_edittargetgrid'].handler.OpenDetil(header_data)
						})
					});
				}

			},
			"Cancel": () => {
				obj_pastebox.html('');
				obj_pastebox.show();
				obj_pastewait.hide();
			}
		})

	});



	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_list')
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	
}


function get_header_data() {
	return header_data;
}

export function OnSizeRecalculated(width, height) {
}



export function OpenDetil(data) {
	header_data = data;
	if (header_data.broadcastmsg_isexecute) {
		$('#pnl_editupload .fgta-page-title').html('Upload Result')
	} else {
		$('#pnl_editupload .fgta-page-title').html('Upload Target Customer')
	}
}



async function obj_pastebox_paste_target(pastedData, fn_finish) {
	var colspattern = "CUSTOMER ID $ NAME";
	var rows = pastedData.split("\n");

	var data = [];
	try {
		var i = 0;
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
				data.push({
					i:cells[0],
					n:cells[1]
				});
			}
			i++;
		}

		$ui.mask('uploading...');

		var apiurl = `${global.modulefullname}/xtion-upload-target`
		var args = {
			id: header_data.broadcastmsg_id,
			data: data
		}
	
		try {
			var result = await $ui.apicall(apiurl, args)
			$ui.unmask();

			if (result.success===true) {
				fn_finish();
			}
			
		} catch (err) {
			throw err;			
		}
		
	} catch (err) {
		$ui.unmask();
		console.error(err);
		$ui.ShowMessage('[ERROR]Error on processing data', {
			'Ok': ()=>{
				fn_finish(err);
			}
		})
	} 

}
