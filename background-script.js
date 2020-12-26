chrome.runtime.onMessage.addListener( function( request, sender, sendResponse) {
	  if (request.greeting == "hello")
		sendResponse({farewell: "goodbye"});

		// chrome.tabs.executeScript({
		// 	code: 'document.body.style.backgroundColor="orange"',
		// });

		chrome.tabs.executeScript({
			file: 'observer.js',
		});
	}
);
