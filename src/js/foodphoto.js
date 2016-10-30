import _ from 'lodash';
import $ from 'jquery';

function extractPhoto(object){
	var images = object.data.images;
	var imageArray = images.map(function(object){
		var imgSrc = object.link;
		return imgSrc;
		
	})

	_.shuffle(imageArray);
	var selectImages = _.drop(imageArray, imageArray.length - 5);
	var i;
	for(i=0;i<selectImages.length;i++){
		$(".photos").append(`<div class="foodImg" style="background-image: url('${selectImages[i]}')"></div>`);
	}
}

function requestPhotos(){
	var photoRequest = photo();
	photoRequest.then(extractPhoto);
}

function photo(){
return	$.ajax({
		url:"https://api.imgur.com/3/gallery/album/sgfGW",
		headers:{
			Authorization:"Client-ID 22a658e1147d94b",
		}
	})
}
export{requestPhotos}