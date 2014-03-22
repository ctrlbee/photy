function addAlbumHandler(){
	$('.add-album').html('<div class="add-album-container"> <div class="add-close">X</div> <input type="text" name="album-name" class="input-field" placeholder="Album Name"> <input type="button" class="input-field ui-btn" id="new-button" value="Create New Album"> </div> '); 
	$('.add-close').click(function(){
		$('.add-album-container').hide(); 
		$('.blackout').hide(); 
	}); 
	$('.blackout').show(); 
	$('.header-btn').hide(); 
	$('.header').css('background','#000000').css('border-color', '#000000'); 

	$('#new-button').click(function(){
		var albumName = $('input[name=album-name]').val(); 
		param = albumName; 
		console.log(param); 
		$('.photo-grid').html("Add some photos to this album babe."); 
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

