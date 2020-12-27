chrome.runtime.onMessage.addListener( function( request, sender, sendResponse) {
	switch ( request.control ) {
		case 'start':
			chrome.tabs.executeScript( {
				file: 'observer.js',
			});
			sendResponse( { control: true } );
			break;
		case 'stop':
			chrome.tabs.executeScript( {
				code: 'trade.observer.disconnect();',
			});
			sendResponse( { control: false } );
			break;
	}
} );

