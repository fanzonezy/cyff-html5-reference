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


function retrieveTerm(){
	var currentURL  = document.URL;
	var equalMark = currentURL.search("search_term");
	var sTerm = currentURL.substring(equalMark+12, currentURL.length);
	return sTerm.toLowerCase();
}

function clearPage(){
	var x = document.getElementById("main_content");	
	if(x.hasChildNodes())
		x.removeChild(x.childNodes[0]);
}

//Search
function searchTag() {
	//clear the search page
	clearPage();

    var refSearch = new Firebase('https://html5-cyff.firebaseio.com/data/tag_info');
    var refRetrieve = new Firebase('https://html5-cyff.firebaseio.com/data/search_term');   	

	 	var sTerm = retrieveTerm();

    //Retrieve search term and then do search
    refRetrieve.once("value", function(snapshot) {

     	sTerm = retrieveTerm();

	    //Search tags of sTerm name
	    refSearch.on("value", function(snapshot) {
	    	if(snapshot.val()[sTerm]){
	    		generateSearchResult(sTerm, snapshot);
	      	}
	      	else{ 
	      	}	  
	    }, function (errorObject) {
	      console.log("The read failed: " + errorObject.code);
	    });

        //Search tags of sTerm attribute
        refSearch.once("value", function(snapshot) {
         	function check() {
              	var tagName = snapshot.val();
              	var key;
              	var txt = "";
              	var found;
              	for(key in tagName){
                	txt = key;

                	if(tagName[key].specification_of_attributes[sTerm]){
                		generateSearchResult(txt, snapshot);
                  		//$('pre2').text(txt + " tag has attribute: " + sTerm, null, 2);
                  		//console.log(txt + " has attribute: " + sTerm);
                	}  
              	}
          	}
          	check();
        });
    });

};

//generate search result in the desired area
function generateSearchResult (tagName, snapshot, result) {

	//erase "No Result"
	document.getElementById("default").innerHTML = "";

	//reate a new <section> element
    var newSection1 = document.createElement("section");// C
    newSection1.setAttribute("id","search_result");
    var empty = document.createTextNode("");
    newSection1.appendChild(empty);
	document.getElementById("main_content").appendChild(newSection1); 

	//create the title of the matched element, and make the element to be a link
    var newH2 = document.createElement("H2");
    var newLink = document.createElement("a");
    var t1 = document.createTextNode(tagName);
    newLink.appendChild(t1);
    newLink.href = 'https://html5-cyff.firebaseapp.com/form.html?' + 'tag_name=' + tagName;
	//create a link url with sufficient information
    newLink.style.color = "#3366FF";
    newLink.style.textDecoration = "none";
    newH2.appendChild(newLink);
    document.getElementById("search_result").appendChild(newH2);

    //display link
    var newDiv1 = document.createElement("div");
    newDiv1.setAttribute("class","text_block_2");
    newDiv1.style.margin = "-20px 0px 0px 0px";
    var newDiv2 = document.createElement("div");
    var tLink = document.createTextNode(newLink.href);
    newDiv2.style.color = "green";
    newDiv2.style.fontSize = "13px";
    newDiv2.style.margin = "0px 0px 10px 0px";
    newDiv2.appendChild(tLink);
    newDiv1.appendChild(newDiv2);

    //dislay definition
    var newSpan = document.createElement("span");
    var t2 = document.createTextNode((snapshot.val())[tagName]["definition"]);
    document.getElementById("search_result").appendChild(newDiv1);
    newSpan.style.color = "#4D4D4D";	    
    newSpan.appendChild(t2);
    newDiv1.appendChild(newSpan);
}

//Run searchTag() function once search result page is done loading
window.onload = searchTag();
