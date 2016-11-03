
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
	var allergies = entrees.allergies;
	var fav = entrees.favorite;
	var vegan = entrees.vegan;
	var spicy = entrees.spicy;
	var allergiesClass = "";
	var allergyText ="NO ALLERGIES";
	if(allergies == 1) {
		allergiesClass = "active";
		allergyText= "ALLERGIES";
	}
	var favClass = "";
	var favText ="LIKE";
	if(fav == 1) {
		favClass = "active";
		favText= "FAVORITE";
	}
	var veganClass = "";
	var veganText ="NOT VEGAN";
	if(vegan == 1) {
		veganClass = "active";
		veganText= "VEGAN";
	}
	var spicyClass = "";
	var spicyText ="NOT SPICY";
	if(spicy == 1) {
		spicyClass = "active";
		spicyText= "SPICY";
	}
	
	$(".entrees").append(`<div class="divTable">
		<div class="divTableBody">
		<div class="divTableRow">
		<div class="divTableCell mtitle">${title}</div>
		<div class="divTableCell" style="text-align: right;">${price}</div>
		</div>
		<div class="divTableRow">
		<div class="divTableCell mdescrip">${description}</div>
		<div class="divTableCelli" style="width: 130px; border-left: 1px solid black;">
			<span class="icons"><i class="material-icons toolTip ${allergiesClass}">announcement<span class="toolTipText">${allergyText}</span></i>
			<i class="material-icons toolTip ${favClass}" style="width:25px;">star_rate<span class="toolTipText">${favText}</span></i>
			<i class="material-icons toolTip ${veganClass}">keyboard_arrow_down<span class="toolTipText">${veganText}</span></i>
			<i class="material-icons toolTip ${spicyClass}">whatshot<span class="toolTipText">${spicyText}</span></i>
		</div>
		</div>
		</div>`);		
}

function processAppetizers(appetizers){
	var price = appetizers.price;
	var title = appetizers.item;
	var description =appetizers.description;
	var allergies = appetizers.allergies;
	var fav = appetizers.favorite;
	var vegan = appetizers.vegan;
	var spicy = appetizers.spicy;
	var allergiesClass = "";
	var allergyText ="NO ALLERGIES";
	if(allergies == 1) {
		allergiesClass = "active";
		allergyText= "ALLERGIES";
	}
	var favClass = "";
	var favText ="LIKE";
	if(fav == 1) {
		favClass = "active";
		favText= "FAVORITE";
	}
	var veganClass = "";
	var veganText ="NOT VEGAN";
	if(vegan == 1) {
		veganClass = "active";
		veganText= "VEGAN";
	}
	var spicyClass = "";
	var spicyText ="NOT SPICY";
	if(spicy == 1) {
		spicyClass = "active";
		spicyText= "SPICY";
	}
	

	$(".appetizers").append(`<div class="divTable">
		<div class="divTableBody">
		<div class="divTableRow">
		<div class="divTableCell mtitle">${title}</div>
		<div class="divTableCell" style="text-align: right;">${price}</div>
		</div>
		<div class="divTableRow">
		<div class="divTableCell mdescrip">${description}</div>
		<div class="divTableCelli" style="width: 130px; border-left: 1px solid black;">
		<span class="icons"><i class="material-icons toolTip ${allergiesClass}">announcement<span class="toolTipText">${allergyText}</span></i>
		<i class="material-icons toolTip ${favClass}" style="width:25px;">star_rate<span class="toolTipText">${favText}</span></i>
		<i class="material-icons toolTip ${veganClass}">keyboard_arrow_down<span class="toolTipText">${veganText}</span></i>
		<i class="material-icons toolTip ${spicyClass}">whatshot<span class="toolTipText">${spicyText}</span></i>
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
