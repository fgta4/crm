let editor, form, obj, opt;

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
const btn_generate = $('#pnl_edit-btn_generate');
const btn_download = $('#pnl_edit-btn_download');

const btn_preview = $('#pnl_edit-btn_preview');

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;


	btn_download.linkbutton({ onClick: () => { btn_download_click(); } });	
	btn_generate.linkbutton({ onClick: () => { btn_generate_click(); } });	
	btn_preview.linkbutton({ onClick: () => { btn_preview_click({ action: 'preview' }); } });

}


export function form_dataopened(result, options) {
	form.setDisable(obj.cbo_voutype_id, true);
}

export function form_newdata(data, options) {
	form.setDisable(obj.cbo_voutype_id, false);
	btn_generate.linkbutton('disable');
	btn_download.linkbutton('disable');
}

export function form_datasaved(result, rowdata, options) {
	form.setDisable(obj.cbo_voutype_id, true);
}

export function form_updatebuttonstate(record) {
	console.log(record);

	var button_commit_on = false;	
	var button_uncommit_on = false;	
	var button_generate_on = false;	
	var button_download_on = false;	

	if (record.voubatch_isgenerate=="1") {
		// semua tombol mati
		form.lock(true);
		button_download_on = true;
	} else {
		button_download_on = false;
		if (record.voubatch_iscommit==1) {
			button_commit_on = false;
			button_uncommit_on = true;
			button_generate_on = true;
		} else {
			button_commit_on = true;
			button_uncommit_on = false;
			button_generate_on = false;
		}
	}

	btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');		
	btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');		
	btn_generate.linkbutton(button_generate_on ? 'enable' : 'disable');		
	btn_download.linkbutton(button_download_on ? 'enable' : 'disable');		
	
}

async function btn_generate_click() {
	editor.btn_action_click({ action: 'generate', cancel: false, param: {}});
}

async function btn_download_click() {
	editor.btn_action_click({ action: 'download', cancel: false, param: {}});
}

export function do_other_action(args) {
	switch (args.action) {
		case 'generate' :
			args.act_url = `${global.modulefullname}/xtion-generate`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> batch voucher no ${args.id} ?`;
			args.act_msg_result = `batch voucher no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {				
				form.commit();
			}
			break;

		case 'download' :
			args.cancel = true;
			do_download(args)
			break;	
	}
}


async function btn_preview_click() {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}
	var id = form.getCurrentId();
	var args = {
		id: id
	};
	$ui.download('crm/voucher/voubatch/xtion-preview', args, async (res)=>{
		// var html = await res.data.text();
		var html = res.data;
		var win = window.open("about:blank", "_blank");
		win.document.write(html);
	});
}


function do_download(args) {	
	var param = {
		id: args.id
	}
	var mask = $ui.mask('wait..');
	$ui.download(global.modulefullname + '/xtion-download', param, (response, err)=>{
		if (err!=null) {
			$ui.unmask(mask);
			return;
		}
		
		
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(response.data));
		element.setAttribute('download', response.filename);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
		$ui.unmask(mask);
		

		// console.log(response.data);

		/*
		var s2ab = (s) => {
			var buf = new ArrayBuffer(s.length);
			var view = new Uint8Array(buf);
			for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
			return buf;
		}

		var blob = new Blob([s2ab(atob(response.data))], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		});

		var element = document.createElement('a');
		element.setAttribute('href', window.URL.createObjectURL(blob));
		element.setAttribute('download', response.filename);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
		$ui.unmask(mask);
		*/
	});
}
