var env = {

	init: function(callback){

		var qs = decodeURIComponent(window.location.search.substring(1)); 
		var qsh = decodeURIComponent(window.location.hash.substring(1)); 

		if (qsh){
			qs = qsh.split("?")[1]; 
		}
		
		var qsparams = qs.split("&"); 
		var pairs = []; 
		$.each(qsparams, function(i, value){
			var qskey = qsparams[i].split("=")[0]; 
			var qsval = qsparams[i].split("=")[1]; 
			pairs[qskey] = qsval;  
		}); 

		env.params = pairs; 
		
		console.log(pairs);

		if (callback){
			callback(); 	
		}
	},

	getParams: function(keyName){
		if (keyName){
			return env.params[keyName];
		}
		else{
			return env.params; 
		}
	}
};