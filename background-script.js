chrome.runtime.onMessage.addListener( function( request, sender, sendResponse) {
	switch ( request.control ) {
		case 'start':
			chrome.tabs.executeScript( {
				file: 'observer.js',
			} );
			sendResponse( { control: true } );
			break;

		case 'stop':
			break;

		default:
			break;
	}
	//   if (request.greeting == "hello")
	// 	sendResponse({farewell: "goodbye"});

		// chrome.tabs.executeScript({
		// 	code: 'document.body.style.backgroundColor="orange"',
		// });

		// chrome.tabs.executeScript({
		// 	file: 'observer.js',
		// });
	}
);
