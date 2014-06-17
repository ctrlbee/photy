var param; 
var storedPw; 
var userPw; 
var pwobj; 

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

function showAlbum(albumID){
	param = albumID; 
	albumBuilder(true);  
}


function albumBuilder(bool){
	
	if(bool === true){
		userPw = window.prompt("Enter The Password",""); 
		
		photy.getPassword(param, function(){
			pwobj = $.parseJSON(storedPw); 
			var pw = window.atob(pwobj.pw); 
			if(userPw===pw){
				albumDOMBuilder(pwobj.pw); 	
			}
			else{
				return; 
			}
		}); 
	}
	else {
		albumDOMBuilder(); 
	}
}

function albumDOMBuilder(){

	$('.loading-div').show(); 
	try{
		var photolist = photy.getPhotoUrls(param); 
		console.log("photo list "+ photolist); 
		var photoshtml = ""; 
		var gridLetter = ['a','b','c','d']; 
		var j = 0; 

		for(x=0;x<photolist.length;x++){
			if(x === photolist.length-1){
				photoshtml += '<div class="ui-block-'+gridLetter[j]+'"><div class="img-wrap"><a href="'+photolist[x]+'" data-lightbox="photy"> <img class="img-block img-last" src="'+photolist[x]+'"> </a></div></div>'; 	
			}
			else{
				photoshtml += '<div class="ui-block-'+gridLetter[j]+'"><div class="img-wrap"><a href="'+photolist[x]+'" data-lightbox="photy"><img class="img-block" src="'+photolist[x]+'"> </a></div></div>'; 	
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

	$('.header-title').html(decodeURIComponent(param)); 
	$('.album-list-wrapper').hide(); 
	$('.album-wrapper').show(); 
	$('.header-add').hide(); 
	$('.header-title').show(); 

}; 

$(document).ready(viewSetup); 



