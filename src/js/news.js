import $ from 'jquery';

function extractData(data){
	console.log(data);
	var date = data.date_published;
	var title = data.title;
	var article = data.post;
	console.log(date);
	console.log(title);
	console.log(article);

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