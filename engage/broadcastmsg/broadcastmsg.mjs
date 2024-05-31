import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './broadcastmsg.apis.mjs'
import * as pList from './broadcastmsg-list.mjs'
import * as pEdit from './broadcastmsg-edit.mjs'
import * as pEditUpload from './broadcastmsg-upload.mjs'
import * as pEditTargetgrid from './broadcastmsg-targetgrid.mjs'
import * as pEditTargetform from './broadcastmsg-targetform.mjs'
import * as pEditResultgrid from './broadcastmsg-resultgrid.mjs'
import * as pEditResultform from './broadcastmsg-resultform.mjs'
import * as pEditFilesgrid from './broadcastmsg-filesgrid.mjs'
import * as pEditFilesform from './broadcastmsg-filesform.mjs'
import * as pEditApprovalgrid from './broadcastmsg-approvalgrid.mjs'
import * as pEditApprovalform from './broadcastmsg-approvalform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editupload = $('#pnl_editupload')
const pnl_edittargetgrid = $('#pnl_edittargetgrid')
const pnl_edittargetform = $('#pnl_edittargetform')
const pnl_editresultgrid = $('#pnl_editresultgrid')
const pnl_editresultform = $('#pnl_editresultform')
const pnl_editfilesgrid = $('#pnl_editfilesgrid')
const pnl_editfilesform = $('#pnl_editfilesform')
const pnl_editapprovalgrid = $('#pnl_editapprovalgrid')
const pnl_editapprovalform = $('#pnl_editapprovalform')



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

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_list, handler: pList},
			{panel: pnl_edit, handler: pEdit},
			{panel: pnl_editupload, handler: pEditUpload},
			{panel: pnl_edittargetgrid, handler: pEditTargetgrid},
			{panel: pnl_edittargetform, handler: pEditTargetform},
			{panel: pnl_editresultgrid, handler: pEditResultgrid},
			{panel: pnl_editresultform, handler: pEditResultform},
			{panel: pnl_editfilesgrid, handler: pEditFilesgrid},
			{panel: pnl_editfilesform, handler: pEditFilesform},
			{panel: pnl_editapprovalgrid, handler: pEditApprovalgrid},
			{panel: pnl_editapprovalform, handler: pEditApprovalform}			
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