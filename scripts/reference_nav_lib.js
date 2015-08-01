function parseValue(key){
	var start = document.URL.search(key);

    start = start + key.length + 1; 
    var end = start;
   	for ( ; end < document.URL.length; end ++ )
    {
    	if (document.URL[end] == '&') break;
    } 
   	return document.URL.slice(start, end);
}

function generateTitleAndNavigationLink(category){
	var listTitle = document.getElementById('list_title');
	var navigationLink = document.getElementById('current_link');
	switch(category){
		case 'structure_tags': 
			listTitle.innerHTML = "Structure Tags";
			document.title = "Structure Tags";
			navigationLink.innerHTML = "structure tags>>"; 
			break; 
		case 'meta_information_tags':
			listTitle.innerHTML = "Meta Information Tags";
			document.title = "Meta Information Tags";
			navigationLink.innerHTML = "meta information tags>>"; 
			break;
		case 'text_tags':
			listTitle.innerHTML = "Text Tags"; 
			document.title = "Text Tags";
			navigationLink.innerHTML = "text tags>>"; 
			break;
		case 'links':
			listTitle.innerHTML = "Links"; 
			document.title = "Links";
			navigationLink.innerHTML = "links>>"; 
			break;
		case 'image_and_object_tags':
			listTitle.innerHTML = "Image and Object Tags";
			document.title = "Image and Object Tags"; 
			navigationLink.innerHTML = "image and object tags>>"; 
			break;
		case 'list_table_and_form_tags':
			listTitle.innerHTML = "List, table and Form Tags";
			document.title = "List, table and Form Tags";
			navigationLink.innerHTML = "list, table and form tags>>";  
			break;
		case 'scripts':
			listTitle.innerHTML = "Scripts"; 
			document.title = "Scripts";
			navigationLink.innerHTML = "scripts>>"; 
			break;
		default: break;
	}
}


var category = parseValue('category_name');

generateTitleAndNavigationLink(category);
dataRef.child('nav_info/' + category).on('value', function(snapshot){
	var parentList = document.getElementById('tag_list');
    snapshot.forEach(function (item){

		//alert(item.val());
        var listItem = document.createElement('TR'); // create a new list row
        var tagName = document.createElement('TD');  // first entry: tag name
        var tagName_a = document.createElement('A'); // first entry > link: hyper-referece
        var tagDef = document.createElement('TD');   // second entry: tag definition
		
        tagName.className = 'stext';
        tagName_a.setAttribute('href', './form.html?' + 'category_name=' + category + '&' + 'tag_name=' + item.key()); // create a link url with sufficient information
        tagName_a.innerHTML = "&lt;" + item.key() + '&gt;'; // set the text of the link
    
        tagDef.innerHTML = item.val(); 
        tagDef.className = 'ltext';
        
        tagName.appendChild(tagName_a);
        listItem.appendChild(tagName);
        listItem.appendChild(tagDef);
        //alert('Hi');
        parentList.appendChild(listItem);
    })
});
