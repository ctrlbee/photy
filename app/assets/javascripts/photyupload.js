var photyupload = {

	//set up keys for upload
	init: function(callback){
		
		if (callback){
			callback(); 	
		}
	},

	//will create and make the post request 
	upload: function(file, uploadCallback){

		var fd = new FormData(); 
		var key = env.getParams('album') + '/' + (new Date).getTime() + '-' + file.name; 		

		fd.append('key', key);
		fd.append('AWSAccessKeyId', 'AKIAJSQYINU6WTAXABZQ'); 
		fd.append('acl', 'public-read');
		fd.append('success_action_redirect', 'http://radiant-savannah-8843.herokuapp.com'); 
		fd.append('policy', pol);
		fd.append('signature', sig);
		fd.append('Content-Type', file.type);
		fd.append('file', file); 

		console.log(sig, pol, file, fd, key); 

		var xhr = new XMLHttpRequest();
   		
   		xhr.onreadystatechange = function()
	    {
	        if (xhr.readyState == 4)
	        {
	           	console.log("upload callback fired");
	            uploadCallback(); 
	        }
	    };  
   		xhr.open('POST', 'https://s3.amazonaws.com/photystorage/', true); 
   
   		xhr.send(fd);
	}

};
