 	
import _ from 'lodash';
import $ from 'jquery';
import {printNews} from "./news"
import {initMap} from "./location"

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
	
}
function processEntrees(entrees){
	var price = entrees.price;
	var title = entrees.item;
		
}
function processAppetizers(appetizers){
	var price = appetizers.price;
	var title = appetizers.item;
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

checkMenu();
printNews();
initMap();
