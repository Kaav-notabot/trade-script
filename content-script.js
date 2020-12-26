const startbtn = document.getElementById( 'start' );

startbtn.addEventListener( 'click', function() {
	chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
		startbtn.textContent = 'started...';
	});
} );
