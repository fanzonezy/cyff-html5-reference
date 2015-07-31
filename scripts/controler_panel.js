/**
 * This function will replace all the illegal characters in a JSON string 
 */
function preprocess(input_string){
		input_string = input_string.trim();  // eliminate white space at the beginning or end of the string
		input_string = input_string.replace(/\"/g, "\\\"").replace(/</g, "&lt;").replace(/>/g, "&gt"); 

		//input_string = input_string.replace(/\\\g, "\\\\");
		//input_string = input_string.replace(/\/\g, "\\\/");
		return input_string;
}

/*
 * This function will create a json string from the input information of a tag
 */
function createJsonString(){
		jsonString = "";

		// add category key-value pair
		jsonString += "\"category\":" + "\"" + preprocess(document.getElementById('add_category').value) + "\",";

		// add definition  
		jsonString += "\"definition\":" + "\"" + preprocess(document.getElementById('add_definition').value) + "\",";

		// add usage
		var lines = document.getElementById('add_usage').value.split("\n");
		var temp = "";
		for (var i = 0; i < lines.length;  i++){
				if (i != lines.length-1){
						temp += "\"" + preprocess(lines[i]) + "\",";
				}else{
						temp += "\"" + preprocess(lines[i]) + "\"";
				}
		}
		jsonString += "\"usage\":[" + temp + "],";

		// add specification of attribute
		var lines = document.getElementById('add_spec_of_attr').value.split("\n");
		var temp = "";

		for (var i = 0; i < lines.length; i++){
				var cells = lines[i].split(";");
				temp += "\""+preprocess(cells[0])+"\":"+"["+"\""+preprocess(cells[1])+"\","+"\""+preprocess(cells[2])+"\""+"]";
				if (i != lines.length-1){
						temp += ",";
				}
		}
		jsonString += "\"specification_of_attributes\":" + "{" + temp + "},";

		// add example
		var lines = document.getElementById('add_example').value.split("\n");
		var temp = "";
		for (var i = 0; i < lines.length;  i++){
				if (i != lines.length-1){
						temp += "\"" + preprocess(lines[i]) + "\",";
				}else{
						temp += "\"" + preprocess(lines[i]) + "\"";
				}
		}
		jsonString += "\"example\":[" + temp + "],";

		// add browser support
		var cells = document.getElementById('add_browser_sup').value.split(";");
		var temp = ""; 
		for (var i = 0; i < cells.length; i++){
				temp += "\"" + preprocess(cells[i]) + "\"";
				if (i != cells.length-1) temp += ",";
		}
		jsonString += "\"browser_support\":[" + temp + "],";

		// add default css
		var lines = document.getElementById('add_default_css').value.split("\n");
		var temp = "";
		for (var i = 0; i < lines.length;  i++){
				if (i != lines.length-1){
						temp += "\"" + preprocess(lines[i]) + "\",";
				}else{
						temp += "\"" + preprocess(lines[i]) + "\"";
				}
		}
		jsonString += "\"default_css\":[" + temp + "]";


		// wrap 
		var tag_name = document.getElementById('add_tag_name').value;
		jsonString =  "{" + jsonString + "}";

		return jsonString; 
}

/*
 * This function upload a tag to firebase server
 */
function addFromInput(pathareaId, inputText){ 

		var inputPath = document.getElementById(pathareaId).value; // get path
		//var inputText = document.getElementById(textareaId).value; // get input json string
		var jsonObj = JSON.parse(inputText);

		alert('json parsing sucessful.');

		if (inputPath.length != 0){				
				alert('add at '+ inputPath);

				if (dataRef){
						if (inputPath == 'data/tag_info/'){
							alert("Please input your tag name.");
							return;
						}
						var addPos = dataRef.child(inputPath);
				}else{
						alert('ERROR: UNINITIALIZED');
				}

				if (addPos){
						onComplete = function(error){
								if (error){
										alert('failed\n' + 'ERROR MESSAGE:' + error);
								}else{
										alert('successful');
								}
						}
						alert('about to add');
						addPos.update(jsonObj, onComplete);
						alert('finished');
				}
				else{
						alert('path does not exist');
				}

		}else{
				alert('add at root');
				dataRef.update(jsonObj);
				alert('finished');
		}
}


/*
 * This function will delete a tag from firebase server
 */
function deleteFromFirebase(tag_name){
		var tagRef = dataRef.child('data/tag_info/' + tag_name.trim());
		if (tagRef){
				alert("INFO: do you want to delete " + tagRef.key());
				tagRef.remove();
				alert('INFO: delete successfully');
		}else{
				alert('ERROR: try to delete an unexisting tag');	
		}
} 

alert('initializing...');			
// bind event listener
document.getElementById('add_submit').addEventListener('click', function() {
				addFromInput("add_path", createJsonString());
				});

document.getElementById('add_create_json').addEventListener('click', function() {
				var json = createJsonString();
				document.getElementById('add_output_json').innerHTML = json; 
				});

document.getElementById('delete_confirm').addEventListener('click', function() {
				var tag_name = document.getElementById('delete_tag_name').value;
				alert(tag_name);
				deleteFromFirebase(tag_name);
				});
alert('initialization finished');
