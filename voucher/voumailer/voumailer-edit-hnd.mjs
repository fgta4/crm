let editor, form, obj, opt;

const btn_prepare = $('#pnl_edit-btn_prepare');
const btn_uncommit = $('#pnl_edit-btn_uncommit')

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;

	btn_prepare.linkbutton({ onClick: () => { btn_prepare_click({ action: 'prepare' }); } });


	
}

export function form_updatebuttonstate(record) {
	console.log(record);
	if (record.voumailer_iscommit==0) {
		btn_prepare.linkbutton('disable');
	} else {
		btn_prepare.linkbutton('enable');
	}

	if (record.voumailer_isprepared==1) {
		btn_uncommit.linkbutton('disable');
		btn_prepare.linkbutton('disable');
	} 
}


async function btn_prepare_click(args) {
	// if (form.isDataChanged() || !form.isInViewMode()) {
	// 	$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
	// 	return;
	// }

	var id = form.getCurrentId();
	Object.assign(args, {
		id: id,
		use_otp: false
	});

	args.act_url = `${global.modulefullname}/xtion-prepare`;
	args.act_msg_quest = `Apakah anda yakin akan <b>Prepare</b> batch mailer no ${id} ?`;

	try {
		$ui.mask('wait..');
		var { doAction } = await import('../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4xtion.mjs');
		await doAction(args, (err, result) => {
			if (err) {
				$ui.ShowMessage('[WARNING]' + err.message);	
			} else {
				obj.chk_voumailer_isprepared.checkbox('check');
				form.commit();
				$ui.ShowMessage('[INFO]' + `batch mailer no ${id} telah di prepare.`);	
			}
		});
	} catch (err) {
		console.error(err);
		$ui.ShowMessage('[ERROR]' + err.message);
	} finally {
		$ui.unmask();
	}	
}

	
	