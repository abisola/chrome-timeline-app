var userFirstName;

$(document).ready(function(){

	console.log("this is it!! I'm ready to rock and roll now");

	chrome.storage.sync.get(function(items){
		if (items['person_name']) {
			//display the timeline
			userFirstName = items['person_name'];
			$('#content').removeClass("hidden");
		} else {
			//request a login
			$('#login').removeClass("hidden");
		}
	});


	$('#login button').click(function(e){
		//TODO if the form is filled
		var _person_name = $("#person_name").val();
		if(_person_name.length > 0 ) {
			console.log('we are young');
			chrome.storage.sync.set({'person_name': _person_name});
		}
		
	});

	$("button.add").click(function(){
		//show the text entry field
		EntryManager.showEntryChrome();
	});

	$(".entrywindow button.imgBtn").click(function(){
		EntryManager.showImagePicker();
	});

	$(".entrywindow button.cancelBtn").click(function(){

		EntryManager.hideEntryChrome();
	});

	$(".entrywindow button.saveBtn").click(function(){
		var entry = $(".entrywindow textarea").val();
		console.log('will be saving the entry to the socket : '+entry);
		EntryManager.saveEntry(entry);
	});

});

var EntryManager = {

	saveEntry: function(entryText) {
		//
		var html = '<div class="entry">';
		html += '<span class="person"><em>'+userFirstName+'</em> says:</span>';
		html += '<span class="message">'+entryText+'</span>';
		html += '</div>';

		$("#content .event").after(html);
		EntryManager.hideEntryChrome();
	},

	saveImage: function(data){
		var html = '<div class="entry">';
		html += '<span class="person"><em>'+userFirstName+'</em> uploaded:</span>';
		html += '<img src="'+data+'" />';
		html += '</div>';

		$("#content .event").after(html);
		EntryManager.hideEntryChrome();
	},

	showImagePicker: function(){
		$(".imageSelector").removeClass("hidden");
	},

	showEntryChrome: function(){
		$(".entrywindow").removeClass("hidden");
		$(".entrywindow textarea").val('');
		$("button.add").addClass("hidden");
	},

	hideEntryChrome: function(){
		$(".entrywindow").addClass("hidden");
		$(".imageSelector").addClass("hidden");
		$("button.add").removeClass("hidden");
	}

}