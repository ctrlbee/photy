function addAlbumHandler(){
	$('.add-album').html('<div class="add-album-container"> <div class="add-close">X</div> <input type="text" name="album-name" class="input-field" placeholder="Album Name"> <input type="button" class="input-field ui-btn" id="new-button" value="Create New Album"> </div> '); 
	$('.add-close').click(function(){
		$('.add-album-container').hide(); 
		$('.blackout').hide(); 
	}); 
	$('.blackout').show(); 

	$('#new-button').click(function(){
		var albumName = $('input[name=album-name]').val(); 
		window.location = '/viewalbum?album='+albumName; 
	}); 

};

