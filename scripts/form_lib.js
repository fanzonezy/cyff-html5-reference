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

function generateTitleAndNavigationLink (snapshot){
	var category_name = snapshot.child('category').val(); // get category name
	var tag_name = snapshot.key();  // get tag name
	
	document.title = tag_name;

	last_level_link_ele = document.getElementById('last_level_link');
	last_level_link_ele.innerHTML = category_name.replace(/_/g, ' ') + ">>";
	last_level_link_ele.setAttribute('href', './reference_nav.html?category_name=' + category_name);

	curr_level_link_ele = document.getElementById('curr_level_link');
	curr_level_link_ele.innerHTML = tag_name + ">>";

	page_title = document.getElementById('page_title');
	page_title.innerHTML = "&lt;" + tag_name + "&gt;";
}

function generateDefinition (snapshot){
	document.getElementById('def_text').innerHTML = (snapshot.val())['definition'];
}

function generateUsage (snapshot) {
	var usage = snapshot.child('usage');
	var text = '';
	
	//combine usage text 
	usage.forEach (function (line){
		text = text + line.val() + "\n";
	});

	var container = document.getElementById('usage_text')

	if (container){
		container.innerHTML = '<pre>' + text + '<pre>';
	}else{
		alert("RENDER ERROR: can not write \"Usage\"");
	}
}

function generateAttributeList (snapshot) {
	var list_items = snapshot.child('specification_of_attributes');
	var attr_list = document.getElementById('attr_list');
	list_items.forEach (function (list_item){
		// create needed items
		var row        = document.createElement('TR');
		var attr_name  = document.createElement('TD');
		var attr_value = document.createElement('TD');
		var attr_spec  = document.createElement('TD');

		// set classes
		attr_name.className  = 'stext';
		attr_value.className = 'stext';
		attr_spec.className  = 'ltext';
		
		// set text
		attr_name.innerHTML = '<p>' + list_item.key() + '</p>';
		attr_value.innerHTML = '<p>' + (list_item.val())['0'] + '</p>';
		attr_spec.innerHTML  = '<p>' + (list_item.val())['1'] + '</p>';

		// add to list row
		row.appendChild(attr_name);
		row.appendChild(attr_value);
		row.appendChild(attr_spec);

		// add row to list
		attr_list.appendChild(row);
	});
}

function generateExample (snapshot) {
	var example = snapshot.child('example');
    var text = '';
    
    //combine usage text 
    example.forEach (function (line){
        text = text + line.val() + "\n";
    });

    var container = document.getElementById('example_text')

    if (container){
        container.innerHTML = '<pre>' + text + '<pre>';
    }else{
        alert("RENDER ERROR: can not write \"Example\"");
    }
}

function generateBrowserSupportList (snapshot) {
	var browser_support = snapshot.child('browser_support');
	var row = document.createElement('TR');
	var name = document.createElement('TD');
	
	//alert('Hi');
	name.innerHTML = '&lt;' + tag_name + '&gt;'; // tag_name is a global variable
	name.className = 'stext';
	row.appendChild(name);

	//alert('Hi');
	browser_support.forEach (function (sup_or_not){
		var cell = document.createElement('TD');
		cell.innerHTML = sup_or_not.val();
		cell.className = 'stext';
		row.appendChild(cell);
	});

	var browser_support_list = document.getElementById('browser_sup_list');
	browser_support_list.appendChild(row);
}

function generateDefaultCss (snapshot) {
	var importedDataItems = snapshot.child('default_css');
    var text = '';
    
    //combine usage text 
    importedDataItems.forEach (function (line){
        text = text + line.val() + "\n";
    });

    var container = document.getElementById('default_css_text')

    if (container){
        container.innerHTML = '<pre>' + text + '<pre>';
    }else{
        alert("RENDER ERROR: can not write \"Default CSS\"");
    }
}

var tag_name = parseValue('tag_name');
dataRef.child('tag_info/' + tag_name).once('value', function (snapshot) {
	generateTitleAndNavigationLink(snapshot);
	generateDefinition(snapshot);
	generateUsage(snapshot);
	generateAttributeList(snapshot);
	generateExample(snapshot);
	generateBrowserSupportList(snapshot);
	generateDefaultCss(snapshot);
});
