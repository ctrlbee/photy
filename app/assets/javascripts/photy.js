
var photy = {

	//init func - ajax data with callback option and sets list prop with success
	init: function(callback){
		$.ajax({
			url: 'https://s3.amazonaws.com/photystorage/',
			method:'GET',
			cache: 'false', 
			complete: callback,
			success: photy.updateList, 
			error: function(error){
				console.log("S3 error response: "+error)
			}
		}); 
	}, 

	//updateList func - creates link, timestamp AND PATH AND FILE array of objects 
	updateList: function(data){
	
		var keyXML = $(data).find("Key"); 
		var timeXML = $(data).find("LastModified"); 
		var dataArray = []; 
		var dataObj = {}; 
			
		$.each(keyXML, function(i, value){
			dataObj = {
				key: keyXML[i].firstChild.nodeValue,
				time: timeXML[i].firstChild.nodeValue, 
				path: keyXML[i].firstChild.nodeValue.split("/")[0], 
				file: keyXML[i].firstChild.nodeValue.split("/")[1], 
				url: "https://s3.amazonaws.com/photystorage/"+keyXML[i].firstChild.nodeValue
			}
			if (dataObj.file ===""){
				//don't add it
			}
			else{
				dataArray.push(dataObj); 	
			}
		});

		//sort the array decending based on modified date
		dataArray.sort(function(a,b){
			var dateA = new Date(a.time); 
			var dateB = new Date(b.time); 
			//console.log("comparing A: "+dateA +" B: " +dateB); 
			return dateB - dateA; 
		});

		photy.list = dataArray;

	}, 

	//getList func - returns the list set in updateList func
	getList: function(album){

		//create the sub list based on album 
		var subList = []; 
		if (album){
			$.each(photy.list, function(i){
				if (photy.list[i].path === album){
					subList.push(photy.list[i]); 	
				}
			});
			return subList; 
		}
		else {
			return photy.list; 	
		}
	}, 

	getAlbums: function(){
		var photyAlbums = []; 

		$.each(photy.list, function(i){
			if($.inArray(photy.list[i].path, photyAlbums)=== -1){
				photyAlbums.push(photy.list[i].path); 
			}
		}); 

		return photyAlbums; 
	},

	getPhotoUrls: function(album){
		var urls = []; 

		$.each(photy.list, function(i){
			if(album){
				if (photy.list[i].path === album){
					urls.push(photy.list[i].url); 
				}
			}
			else{
				urls.push(photy.list[i].url); 
			}
		}); 

		return urls; 
	}

}; 
