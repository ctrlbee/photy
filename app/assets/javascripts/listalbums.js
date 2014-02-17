
 //Build out the DOM for the albums links 
function viewAlbumsBuilder(photoArray){
	//build array of unique folders 
	var folders = []; 
	var html = ""; 
	$.each(photoArray, function(i, value){
		var file = value.link; 
		var path = file.split("/"); 
		var folder = path[0]; 

		if($.inArray(folder, folders) === -1){
			folders.push(folder); 
		}
	}); 

	for(i=0;i<folders.length;i++){
		html += ('<div class="btn-div"><a href="/viewalbum?album='+folders[i]+'" class="ui-btn albums-btn"><span class="btn-text">'+folders[i]+'</span></a></div>'); 	
	}

	$('.album-list').html(html); 

}
