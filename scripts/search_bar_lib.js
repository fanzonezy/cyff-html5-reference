//Write the term that user want to search to the url
function updateSearchTerm(){

	var currentURL = document.URL;
	var questionMark = currentURL.search("\\?");
	var newURL = currentURL.substring(0,questionMark);
	var sTerm = document.getElementById('nav_search_box').value;
	console.log("this is "+sTerm);
	newURL = "./search_result.html"+"?search_term="+sTerm;
	window.location = newURL;  
}