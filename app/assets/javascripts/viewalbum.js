$(document).ready(function(){
	//make call to S3
	$.ajax({
		url:'https://s3.amazonaws.com/photystorage/',
		method: 'GET',
		success: function(data){  
			var photos = parseResponse(data); 
			viewAlbumsBuilder(photos); 
			viewPhotosBuilder(photos); 
		},
		error: function(error){
			console.log("S3 error response: "+error)
		}
	}); 
 });


//parse response
function parseResponse(response){
	var key = $(response).find("Key"); 
	var date = $(response).find("LastModified"); 
	var photoArr = []; 
	
	//create array of objects
	for (var i=0;i<date.length;i++){
		var obj = {
			link: key[i].innerHTML,
			timestamp: date[i].innerHTML
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
 	var queryString = window.location.search.substring(1); 
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

		if(photoPath == pairs["album"]){
			selectedAlbum.push(photoArray[i]); 
		}
	}); 

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


