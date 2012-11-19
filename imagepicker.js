
$('document').ready(function() {

	var photo = document.getElementById('photo');
	var context = photo.getContext('2d');

	showEnable();

	$('#pickFile').click(function() {

		stopStream();

		removeSmile();

		hideSave();

		hideEnable();
	
		 context.clearRect ( 0 , 0 , photo.width , photo.height );

		chrome.fileSystem.chooseEntry({

			accepts: [{mimeTypes:['image/*']}]

		}, function (fileEntry) {



	 		fileEntry.file(function(fff) {
	                  var reader = new FileReader();

	                  reader.onloadend = function(e) {
	                  	console.log(this.result);
	                     //image_element.src = this.result;
						var img = new Image;
						img.onload = function(){

						  context.clearRect ( 0 , 0 , photo.width , photo.height );

	  						context.drawImage(img, 0, 0, photo.width, photo.height);
						}
						img.src = this.result;

						showSave(false);

	                  };
	                  reader.readAsDataURL(fff);
	               });

		});

	});

	function getCamera() {

	hideSave();
	
	 context.clearRect ( 0 , 0 , photo.width , photo.height );

	  navigator.webkitGetUserMedia({audio: true, video: true}, function(stream) {
	    document.querySelector('video').src = webkitURL.createObjectURL(stream);
	    setupPhotoBooth();
	  }, function(e) {
	    console.error(e);
	  });
	}

	var saveButton;

	function removeSmile() {

		$('#smileButton').unbind();
		$('#smileButton').css('display', 'none');

	}

	function setupPhotoBooth() {
		console.log('setupPhotoBooth');

		$('video').css('display','inline');

		hideEnable();

		$('#smileButton').css('display', 'inline');
		$('#smileButton').click(function(e) {

		  takePhoto();
				
		});
		
	}
	function takePhoto() {

	  var video = document.querySelector('video');

	  context.clearRect ( 0 , 0 , photo.width , photo.height );

	  context.drawImage(video, 0, 0, photo.width, photo.height);

	  showSave(true);
	}

	function showSave(isCamera) {

		$('#saveButton').unbind();

		$('#saveButton').css('display', 'inline');
		$('#saveButton').click(function(e) {

		  savePhoto(isCamera);
				
		});
	}
	function hideSave() {

		$('#saveButton').unbind();
		$('#saveButton').css('display', 'none');

	}

	function showEnable () {

		/**
		 * Click handler to init the camera grab
		 */
		$('#buttonEnable').css('display', 'inline');
		$('#buttonEnable').click(function(e) {
		  getCamera();
				
		});

	}

	function hideEnable() {
		$('#buttonEnable').unbind();
		$('#buttonEnable').css('display', 'none');
	}

	function savePhoto(isCamera) {

		console.log('savePhoto');

		var data = photo.toDataURL("image/png");
		data = data.replace("image/png","image/octet-stream");
		
		console.log(data);

		Entry.saveImage(data);

		showEnable();

		removeSmile();
		hideSave();

		context.clearRect ( 0 , 0 , 320 , photo.height );

		if (isCamera) {
			stopStream();
		}

	}

	function stopStream() {

	 navigator.webkitGetUserMedia({audio: true, video: true}, 
	    	function(stream) 
	    		{
			        var video = document.querySelector('video');	
			        video.src = window.webkitURL.createObjectURL(null);
					$('video').css('display','none');
		    	}
	    );


	}

})