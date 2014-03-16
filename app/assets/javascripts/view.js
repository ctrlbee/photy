
var viewSetup; 
viewSetup = function(){

	console.log("doc ready fired"); 
	
	//call init, pass in call back func that creates JQM DOM 
	photy.init(function(){
		albumListBuilder(); 

		//view album 
		env.init(function(){
			albumBuilder(); 	
		}); 
	});

	photyupload.init(); 

	//click handlers for upload btn
	$('.add-btn').click(function(){
		$('.input-file').trigger('click'); 
	}); 

	$('.input-file').on('change', function(){
		var fileToUpload = $('.input-file').get(0).files[0]; 
		photyupload.upload(fileToUpload, callbackFunc); 	
	}); 

	//click handler for add album button
	$('.header-add').click(function(){
		addAlbumHandler(); 
	}); 
}

function callbackFunc(){

	photy.init(function(){
		albumListBuilder(); 

		//view album 
		env.init(function(){
			albumBuilder(); 	
		}); 
	});
		
}

function albumListBuilder(){
	console.log("album list builder fired"); 
	try {
		var albums = photy.getAlbums(); 
		var albumshtml = "";  
		for(i=0;i<albums.length;i++){
			albumshtml += '<div class="btn-div"><a href="/viewalbum?album='+albums[i]+'" class="ui-btn albums-btn"><span class="btn-text">'+albums[i]+'</span></a></div>'; 	
		}
		
		$('.album-list').html(albumshtml); 
	}
	catch(e) {
		$('.album-list').html("network error"); 
	}
}

function albumBuilder(){
	console.log("album builder fired"); 
	try{
		var param = env.getParams("album"); 
		var photolist = photy.getPhotoUrls(param); 
		console.log(photolist); 
		var photoshtml = ""; 
		var gridLetter = ['a','b','c','d']; 
		var j = 0; 

		for(x=0;x<photolist.length;x++){
			photoshtml += '<div class="ui-block-'+gridLetter[j]+'"><div class="img-wrap"><img class="img-block" src="'+photolist[x]+'"></div></div>'; 	
			if(j==3){
				j=0; 
			}
			else{
				j++; 
			}
		}	
	 	
	 	$('.photo-grid').html(photoshtml); 
	 }
	 catch(e){
	 	$('.photo-grid').html("network error"); 
	 }

}

$(document).ready(viewSetup); 
//$(document).on('ready page:load', viewSetup);


