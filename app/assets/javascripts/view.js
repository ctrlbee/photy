
$(document).ready(function(){
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

}); 

//should turn this into a proper routhing handler
$(window).on('hashchange', function(){
	console.log("hashchange fired"); 
	
	//call init, pass in call back func that creates JQM DOM 
	photy.init(function(){
		albumListBuilder(); 

		//view album 
		env.init(function(){
			albumBuilder(); 	
		}); 
	}); 

	//need to have click handlers wire up


}); 

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
	var albums = photy.getAlbums(); 
	var albumshtml = "";  
	for(i=0;i<albums.length;i++){
		albumshtml += '<div class="btn-div"><a href="/viewalbum?album='+albums[i]+'" class="ui-btn albums-btn"><span class="btn-text">'+albums[i]+'</span></a></div>'; 	
	}
	
	$('.album-list').html(albumshtml); 
}

function albumBuilder(){
	console.log("album list builder 2 fired"); 
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



