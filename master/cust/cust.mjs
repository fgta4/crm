import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './cust.apis.mjs'
import * as pList from './cust-list.mjs'
import * as pEdit from './cust-edit.mjs'
import * as pEditUpload from './cust-upload.mjs'
import * as pEditContactgrid from './cust-contactgrid.mjs'
import * as pEditContactform from './cust-contactform.mjs'
import * as pEditAddressgrid from './cust-addressgrid.mjs'
import * as pEditAddressform from './cust-addressform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editupload = $('#pnl_editupload')
const pnl_editcontactgrid = $('#pnl_editcontactgrid')
const pnl_editcontactform = $('#pnl_editcontactform')
const pnl_editaddressgrid = $('#pnl_editaddressgrid')
const pnl_editaddressform = $('#pnl_editaddressform')



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
			{panel: pnl_editcontactgrid, handler: pEditContactgrid},
			{panel: pnl_editcontactform, handler: pEditContactform},
			{panel: pnl_editaddressgrid, handler: pEditAddressgrid},
			{panel: pnl_editaddressform, handler: pEditAddressform}			
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