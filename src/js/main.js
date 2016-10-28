 	
import _ from 'lodash';
import $ from 'jquery';
import {printNews} from "./news"

function extractSpecial(data){
	var menuArray=[];
	var sides = data.sides;
	var appetizers = data.appetizers;
	var entrees = data.entrees;
	menuArray	=_.concat(sides,appetizers,entrees);

	
	console.log(menuArray);

	var specialRequest = getSpecials();
	specialRequest.then(function(specialData) {
		var specialId = specialData.menu_item_id;
		var special = menuArray.filter(function(menuItem) {
			console.log(menuItem);
				if(menuItem.id==specialId){
					return true;	
				}
	 		return false;
		});	
		console.log(special);
	});

	
	console.log(menuArray);
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
	console.log(data);
	var i;
	var sides = data.sides;
	var appetizers = data.appetizers;
	var entrees = data.entrees;
	console.log(sides);
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