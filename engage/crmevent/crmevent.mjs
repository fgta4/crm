import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as settings from './crmevent.settings.mjs'
import * as apis from './crmevent.apis.mjs'
import * as pList from './crmevent-list.mjs'
import * as pEdit from './crmevent-edit.mjs'
import * as pEditInvitedgrid from './crmevent-invitedgrid.mjs'
import * as pEditInvitedform from './crmevent-invitedform.mjs'
import * as pEditAttendantgrid from './crmevent-attendantgrid.mjs'
import * as pEditAttendantform from './crmevent-attendantform.mjs'
import * as pEditKolgrid from './crmevent-kolgrid.mjs'
import * as pEditKolform from './crmevent-kolform.mjs'
import * as pEditMediagrid from './crmevent-mediagrid.mjs'
import * as pEditMediaform from './crmevent-mediaform.mjs'
import * as pEditPostgrid from './crmevent-postgrid.mjs'
import * as pEditPostform from './crmevent-postform.mjs'
import * as pEditSummary from './crmevent-summary.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editinvitedgrid = $('#pnl_editinvitedgrid')
const pnl_editinvitedform = $('#pnl_editinvitedform')
const pnl_editattendantgrid = $('#pnl_editattendantgrid')
const pnl_editattendantform = $('#pnl_editattendantform')
const pnl_editkolgrid = $('#pnl_editkolgrid')
const pnl_editkolform = $('#pnl_editkolform')
const pnl_editmediagrid = $('#pnl_editmediagrid')
const pnl_editmediaform = $('#pnl_editmediaform')
const pnl_editpostgrid = $('#pnl_editpostgrid')
const pnl_editpostform = $('#pnl_editpostform')
const pnl_editsummary = $('#pnl_editsummary')



var pages = fgta4pages;
var slider = fgta4pageslider;


export const SIZE = {width:0, height:0}


export async function init(opt) {
	// $ui.grd_list = new fgta4grid()
	// $ui.grd_edit = new fgta4grid()

	global.fgta4grid = fgta4grid
	global.fgta4form = fgta4form



	$ui.apis = apis
	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'

	opt.variancedata = global.setup.variancedata;
	settings.setup(opt);

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_list, handler: pList},
			{panel: pnl_edit, handler: pEdit},
			{panel: pnl_editinvitedgrid, handler: pEditInvitedgrid},
			{panel: pnl_editinvitedform, handler: pEditInvitedform},
			{panel: pnl_editattendantgrid, handler: pEditAttendantgrid},
			{panel: pnl_editattendantform, handler: pEditAttendantform},
			{panel: pnl_editkolgrid, handler: pEditKolgrid},
			{panel: pnl_editkolform, handler: pEditKolform},
			{panel: pnl_editmediagrid, handler: pEditMediagrid},
			{panel: pnl_editmediaform, handler: pEditMediaform},
			{panel: pnl_editpostgrid, handler: pEditPostgrid},
			{panel: pnl_editpostform, handler: pEditPostform},
			{panel: pnl_editsummary, handler: pEditSummary}			
		], opt)

	$ui.setPages(pages)


	document.addEventListener('OnButtonHome', (ev) => {
		if (ev.detail.cancel) {
			return
		}

		ev.detail.cancel = true;
		ExitModule();
	})
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	



	await PreloadData()

}


export function OnSizeRecalculated(width, height) {
	SIZE.width = width
	SIZE.height = height
}

export async function ExitModule() {
	$ui.home();
}



async function PreloadData() {
	
}