function addAlbumHandler(){
	$('.add-album').html('<div class="add-album-container"> <div class="add-close">X</div> <input type="text" name="album-name" class="input-field" placeholder="Album Name"> <input type="password" autocomplete="off" name="pw-name" class="input-field" placeholder="Enter Password"> <input type="button" class="input-field ui-btn" id="create-button" value="Create New Album"> </div> '); 
	$('.add-close').click(function(){
		$('.add-album-container').hide(); 
		$('.blackout').hide(); 
	}); 
	$('.blackout').show(); 
	$('.header-btn').hide(); 
	$('.header').css('background','#000000').css('border-color', '#000000'); 

	$('#create-button').click(function(){
		var albumName = $('input[name=album-name]').val(); 
		var pwName = $('input[name=pw-name]').val(); 
		param = albumName; 
		password.createPassword(pwName); 
		console.log(param); 
		$('.photo-grid').html("Add photos to create this album."); 
		$('.add-album-container').hide(); 
		$('.blackout').hide();
		$('.album-list-wrapper').hide(); 
		$('.album-wrapper').show(); 
		$('.header').css('background','#e9e9e9').css('border-color', '#ddd'); 
		$('.header-add').hide(); 
		$('.header-title').show(); 
		$('.header-title').html(param); 
	}); 

	$('.add-close').click(function(){
		$('.header').css('background','#e9e9e9').css('border-color', '#ddd'); 
		$('.header-btn').show(); 
	})

};

var password = {

	createPassword: function (pw){

		var guid = (Math.round(Math.random()*1000000)) + (Math.round(Math.random()*1000000)); 
		var pwEnc = window.btoa(pw); 

		$.ajax({
			url: 'https://s3.amazonaws.com/photystoragepw/'+param+'.json', 
			method: 'PUT',
			dataType: 'json',
			async:'false',
			data: JSON.stringify({'pw': pwEnc})
		}); 
	}
}; 



