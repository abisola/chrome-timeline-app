
$('#pickFile').click(function() {

  var photo = document.getElementById('photo');
  chrome.fileSystem.chooseEntry({

		accepts: [{mimeTypes:['image/*']}]

	}, function (fileEntry) {


  		var context = photo.getContext('2d');

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

                  };
                  reader.readAsDataURL(fff);
               });

	});

});

function getCamera() {
  navigator.webkitGetUserMedia({audio: true, video: true}, function(stream) {
    document.querySelector('video').src = webkitURL.createObjectURL(stream);
    setupPhotoBooth();
  }, function(e) {
    console.error(e);
  });
}

/**
 * Click handler to init the camera grab
 */
$('#buttonEnable').click(function(e) {
  getCamera();
		
});

var saveButton;

function setupPhotoBooth() {
	console.log('setupPhotoBooth');

	$('video').css('display','inline');
	$('#buttonEnable').css('display', 'none');
	$('#smileButton').css('display', 'inline');
	$('#smileButton').click(function(e) {

	  takePhoto();
			
	});
	
}
function takePhoto() {

  var video = document.querySelector('video'),
      photo = document.getElementById('photo');

  var context = photo.getContext('2d');
  context.clearRect ( 0 , 0 , photo.width , photo.height );

  context.drawImage(video, 0, 0, photo.width, photo.height);


  if (!saveButton) {

	  saveButton = document.createElement('button');
	  saveButton.innerText = 'Save Photo';
	  saveButton.addEventListener('click', savePhoto, true);
	  document.body.appendChild(saveButton);

  }
}

function savePhoto() {
	console.log('savePhoto');
	var data = photo.toDataURL("image/png");
	data = data.replace("image/png","image/octet-stream");
	console.log(data);
}
