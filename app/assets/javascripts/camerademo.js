$(document).ready(function() {

    $('#take-picture').on("change", showPic); 

}); 

    function showPic (event) {

            var files = event.target.files,
                file;
            if (files && files.length > 0) {
                file = files[0];
                try {
                    // Get window.URL object
                    var URL = window.URL || window.webkitURL;
 
                    // Create ObjectURL
                    var imgURL = URL.createObjectURL(file);
 
                    // Set img src to ObjectURL
                    $('#show-picture').attr("src", imgURL);
 
                    // Revoke ObjectURL
                    URL.revokeObjectURL(imgURL);

                    alert(imgURL); 
                }
                catch (e) {
                    try {
                        // Fallback if createObjectURL is not supported
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            showPicture.src = event.target.result;
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        //
                        var error = document.querySelector("#error");
                        if (error) {
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    }
                }
            }
    }
