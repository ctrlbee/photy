
 //Build out the DOM for the albums links 
function viewAlbumsBuilder(photoArray){
	//build array of unique folders 
	var folders = []; 
	$.each(photoArray, function(i, value){
		var file = value.link; 
		var path = file.split("/"); 
		var folder = path[0]; 

		if($.inArray(folder, folders) === -1){
			folders.push(folder); 
		}
	}); 

	for(i=0;i<folders.length;i++){
		$('.album-list').append('<a href="/viewalbum?album='+folders[i]+'" class="ui-btn albums-btn">'+folders[i]+'</a>'); 	
	}

	
	//add click handler for albums buttons
	$('.albums-btn').click(function(){
		$.ajax({
			url:'https://s3.amazonaws.com/photystorage/',
			method: 'GET',
			success: function(data){  
				var photos = parseResponse(data); 
				viewPhotosBuilder(photos); 
			},
			error: function(error){
				console.log("S3 error response: "+error)
			}
		}); 
	});

}
