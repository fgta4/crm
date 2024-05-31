let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;
	
}

	
export function cbo_broadcasttype_id_selected(value, display, record, args) {
	console.log(record);

	form.setValue(obj.cbo_broadcastmodel_id, record.broadcastmodel_id, record.broadcastmodel_name);
	form.setValue(obj.cbo_process_dept_id, record.process_dept_id, record.process_dept_name);
	form.setValue(obj.cbo_doc_id, record.doc_id, record.doc_name);

	form.setValue(obj.cbo_cost_accbudget_id, record.cost_accbudget_id, record.cost_accbudget_name);
	form.setValue(obj.cbo_cost_coa_id, record.cost_coa_id, record.cost_coa_name);
	
	form.setValue(obj.txt_broadcasttype_costpermessage, record.broadcasttype_costpermessage);
	form.setValue(obj.txt_broadcasttype_creditpermessage, record.broadcasttype_creditpermessage);
	

	
}	