import $ from 'jquery';

function extractData(data){
	var date = data.date_published;
	var title = data.title;
	var article = data.post;

	if(article.length > 412) {
		var article = article.substring(0,400);
		article += "<a href='www.google.com'>...Read More</a>";
	}

	$(".news-box").append(`<div class ="news-heading">${title}</div>
            <div class="date">${date}</div>
            <div class="news-content">${article}</div>`)
}

function printNews(){
	var request = getNews();
	request.then(extractData);
}
function getNews (){
	 return  $.ajax({
		url:"https://json-data.herokuapp.com/restaurant/news/1",
		
	})
}
export{printNews}