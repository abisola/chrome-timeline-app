chrome.app.runtime.onLaunched.addListener(function(){
	chrome.app.window.create('window.html', {
		'width': 400,
		'height': 500,
		'minHeight': 600,
		type: 'shell'
	});
});