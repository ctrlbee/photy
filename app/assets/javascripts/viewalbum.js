//web works fine
//on mobile safari - uploads seem to create new folder 
//on mobile chrome - new pics take forever 


$(document).ready(function(){
	
	setUpHandlers();
	
	//get data - would like to do this in separate funciton, but only seems to work in document ready
	$.ajax({
		url:'https://s3.amazonaws.com/photystorage/',
		method: 'GET',
		success: function(s3data){  
			var dataResponse = parseData(s3data); 
			viewAlbumsBuilder(dataResponse); 
			viewPhotosBuilder(dataResponse); 
		},
		error: function(error){
			console.log("S3 error response: "+error)
		}
	}); 

 });

$(window).on('hashchange', function(e){
	//console.log(window.location.pathname); 
	setUpHandlers(); 

	$.ajax({
		url:'https://s3.amazonaws.com/photystorage/',
		method: 'GET',
		success: function(s3data){  
			var dataResponse = parseData(s3data); 
			viewAlbumsBuilder(dataResponse); 
			viewPhotosBuilder(dataResponse); 
		},
		error: function(error){
			console.log("S3 error response: "+error)
		}
	}); 

}); 


function setUpHandlers(){
	$('.add-btn').click(function(){
		$('.input-file').trigger('click'); 
	}); 

	$('.input-file').on('change', function(){
		$('.submit-file').trigger('click'); 
	}); 
}



//parse response
function parseData(photos){

	var key = $(photos).find("Key"); 
	var date = $(photos).find("LastModified"); 
	var photoArr = []; 
	
	//create array of objects
	for (var i=0;i<date.length;i++){
		var obj = {
			link: key[i].firstChild.nodeValue, 
			timestamp: date[i].firstChild.nodeValue
		}; 
		photoArr.push(obj); 
	}

	//sort the array
	photoArr.sort(function(a,b) {
		if(a.timestamp < b.timestamp) {return -1};
		if(a.timestamp > b.timestamp) {return 1}; 
		return 0; 
	});

	//remove the 1st blank object (not sure why S3 gives this back)
	photoArr.splice(0, 1); 

	//reverse for decending order
	photoArr.reverse(); 
	
	console.log(photoArr); 
	return photoArr; 

  }; 



 //build out the DOM
 function viewPhotosBuilder(photoArray){

 	//pull params from query string 
 	var queryString = decodeURIComponent(window.location.search.substring(1)); 
 	var qsparams = queryString.split("&");
 	var pairs = []; 

 	for (var k=0;k<qsparams.length;k++){
 		var value = qsparams[k]; 
 		var values = value.split("=");
 		pairs[values[0]] = values[1]; 

	}

 	//create new array with just the photos for the given album 
 	var selectedAlbum = []; 
	$.each(photoArray, function(i, value){
		var file = value.link; 
		var path = file.split("/"); 
		var photoPath = path[0]; 

		if(pairs["key"]){
			var keyPair = (pairs["key"]); 
			var key = keyPair.split("/"); 
		}
		if(photoPath == pairs["album"] || pairs["key"] && photoPath == key[0]){
			selectedAlbum.push(photoArray[i]); 
		}

	}); 

	console.log(selectedAlbum);

	//Build the DOM
	var gridLetter = ['a','b','c','d']; 
	var j = 0; 
	
	$.each(selectedAlbum, function(i, value){
	
		//add class that shrinks the portrait images	
		var img = new Image(); 
		img.src = "https://s3.amazonaws.com/photystorage/"+value.link; 
		img.onload = function() {
			//console.log(img.height, img.width)
			if (img.height >= img.width){
				buildDOM(" img-adj"); 
			} 
			else{ 
				buildDOM("");
			}
		}; 

		//build jQuery mobile DOM
		function buildDOM(adj){
			$('.photo-grid').append('<div class="ui-block-'+gridLetter[j]+'"><div class="img-wrap'+adj+'"><img class="img-block" src="https://s3.amazonaws.com/photystorage/'+value.link+'"></div></div>'); 	
			if(j==3){
				j=0; 
			}
			else{
				j++; 
			}
		};

	});

};


