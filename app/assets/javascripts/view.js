
var param; 

var viewSetup = function(){

	console.log("doc ready fired"); 
	
	$('.album-wrapper').hide(); 
	$('.header-title').hide(); 
	$('.loading-div').hide(); 
	
	//call init, pass in call back func that creates JQM DOM 
	photy.init(function(){
		albumListBuilder();
	});

	photyupload.init(); 

	//click handlers for upload btn
	$('.add-btn').click(function(){
		$('.input-file').trigger('click'); 
	}); 

	$('.input-file').on('change', function(){
		$('.loading-div').show(); 
		var fileToUpload = $('.input-file').get(0).files[0]; 
		if(fileToUpload){
			photyupload.upload(fileToUpload, callbackFunc); 		
		}
	}); 

	//click handler for add album button
	$('.header-add').click(function(){
		addAlbumHandler(); 
	}); 

	$('.back-btn').click(function(){
		albumListBuilder(); 
		$('.album-list-wrapper').show(); 
		$('.album-wrapper').hide(); 
		$('.header-add').show(); 
		$('.header-btn').show(); 
		$('.header-title').hide(); 
	}); 
}

function callbackFunc(){
	photy.init(function(){
		albumBuilder(); 	
	}); 
}

function showAlbum(albumID){
	param = albumID; 
	console.log(param); 
	albumBuilder();  
	$('.header-title').html(decodeURIComponent(param)); 
	$('.album-list-wrapper').hide(); 
	$('.album-wrapper').show(); 
	$('.header-add').hide(); 
	$('.header-title').show(); 
}


function albumListBuilder(){
	console.log("album list builder fired"); 
	try {
		var album = ""; 
		var albums = photy.getAlbums(); 
		var albumshtml = "";  
		for(i=0;i<albums.length;i++){
			var albumName = "'"+decodeURIComponent(albums[i])+"'";
			albumshtml += '<div class="btn-div"><button onclick="showAlbum('+albumName+')" class="ui-btn albums-btn"><span class="btn-text">'+decodeURIComponent(albums[i])+'</span></button></div>'; 	
		}
		
		$('.album-list').html(albumshtml); 
	}
	catch(e) {
		$('.album-list').html("network error"); 
	}
}

function albumBuilder(){
	console.log("album builder fired"); 
	$('.loading-div').show(); 
	try{
		var photolist = photy.getPhotoUrls(param); 
		console.log("photo list "+ photolist); 
		var photoshtml = ""; 
		var gridLetter = ['a','b','c','d']; 
		var j = 0; 

		for(x=0;x<photolist.length;x++){
			if(x === photolist.length-1){
				photoshtml += '<div class="ui-block-'+gridLetter[j]+'"><div class="img-wrap"><img class="img-block img-last" src="'+photolist[x]+'"></div></div>'; 	
			}
			else{
				photoshtml += '<div class="ui-block-'+gridLetter[j]+'"><div class="img-wrap"><img class="img-block" src="'+photolist[x]+'"></div></div>'; 	
			}		

			if(j==3){
				j=0; 
			}
			else{
				j++; 
			}
		}
	 	$('.photo-grid').html(photoshtml); 
	 	$('.img-last').load(function(){
			console.log("load fired"); 
			$('.loading-div').hide(); 
		}); 
	 }
	 catch(e){
	 	$('.photo-grid').html("network error"); 
	 }
}

$(document).ready(viewSetup); 



