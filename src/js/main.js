
import _ from 'lodash';
import $ from 'jquery';
import {printNews} from "./news"
import {openContent} from "./tabs"
import {requestPhotos} from "./foodphoto"

function extractSpecial(data){
	var menuArray=[];
	var sides = data.sides;
	var appetizers = data.appetizers;
	var entrees = data.entrees;
	menuArray	=_.concat(sides,appetizers,entrees);

	var specialRequest = getSpecials();
	specialRequest.then(function(specialData) {
		var specialId = specialData.menu_item_id;
		var special = menuArray.filter(function(menuItem) {
				if(menuItem.id==specialId){
					return true;	
				}
	 		return false;
		});	
		var splTitle = special[0].item;
		var splPrice =special[0].price;
		var splDescription= special[0].description;
		$(".spl-box").append(`<div class="spl-title">${splTitle}</div>
					          <div class="spl-price">${splPrice}</div>
					          <div class="spl-decription">${splDescription}</div>`)	
	});
}


function processSides(sides){
	var price = sides.price;
	var title = sides.item;
	$(".sides").append(`<div class="divTable">
		<div class="divTableBody">
		<div class="divTableRow">
		<div class="divTableCell mtitle">${title}</div>
		<div class="divTableCell" style="text-align: right;">${price}</div>
		</div>
		</div>`);		
	
}
function processEntrees(entrees){
	var price = entrees.price;
	var title = entrees.item;
	var description =entrees.description;
	$(".entrees").append(`<div class="divTable">
		<div class="divTableBody">
		<div class="divTableRow">
		<div class="divTableCell mtitle">${title}</div>
		<div class="divTableCell" style="text-align: right;">${price}</div>
		</div>
		<div class="divTableRow">
		<div class="divTableCell mdescrip">${description}</div>
		<div class="divTableCell" style="width: 130px; border-left: 1px solid black;">
			<span class="icons"><i class="material-icons" onmouseover="document.getElementById('hoverDivEntrees${entrees.id}').style.display='block';" onmouseout="document.getElementById('hoverDivEntrees${entrees.id}').style.display='none';">announcement</i><div class="hoverDivContainer"><div id="hoverDivEntrees${entrees.id}" class="hoverDiv" style="display: none;">Lorem ipsum</div></div><i class="material-icons" style="width:25px;">star_rate</i><i class="material-icons">keyboard_arrow_down</i>
		<i class="material-icons">whatshot</i>
		</div>
		</div>
		</div>`);		
}

function processAppetizers(appetizers){
	var price = appetizers.price;
	var title = appetizers.item;
	var description =appetizers.description;
	$(".appetizers").append(`<div class="divTable">
		<div class="divTableBody">
		<div class="divTableRow">
		<div class="divTableCell mtitle">${title}</div>
		<div class="divTableCell" style="text-align: right;">${price}</div>
		</div>
		<div class="divTableRow">
		<div class="divTableCell mdescrip">${description}</div>
		<div class="divTableCell" style="width: 130px; border-left: 1px solid black;"><span class="icons"><i class="material-icons">announcement</i><i class="material-icons" style="width:25px;">star_rate</i><i class="material-icons">keyboard_arrow_down</i><i class="material-icons">whatshot</i></span></div>
		</div>
		</div>
		</div>`);		
}

function getMenu(data){
	var i;
	var sides = data.sides;
	var appetizers = data.appetizers;
	var entrees = data.entrees;
	appetizers.forEach(processAppetizers);
	entrees.forEach(processEntrees);
	sides.forEach(processSides);
	
}

	
function checkMenu (){
	var menu = requestMenu();
	console.log(menu);
	menu.then(getMenu);
	menu.then(extractSpecial);
}

function requestMenu (){
	return $.ajax({
		url:"https://json-data.herokuapp.com/restaurant/menu/1",
	})
}

function getSpecials (){
	 return  $.ajax({
		url:"https://json-data.herokuapp.com/restaurant/special/1",
		
	})
}

function initTabs() {
	$(".tablinks").click(function() {
		openContent();
	});
}

checkMenu();
printNews();
initTabs();
requestPhotos(); 
