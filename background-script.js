chrome.runtime.onMessage.addListener( function( request, sender, sendResponse) {
	switch ( request.control ) {
		case 'start':
			chrome.tabs.executeScript( {
				file: 'observer.js',
			});
			chrome.storage.sync.set( { startObserve: true }, function() {
				sendResponse( { control: true } );
			} );
			break;
		case 'stop':
			chrome.tabs.executeScript( {
				code: 'trade.observer.disconnect();',
			});
			chrome.storage.sync.set( { startObserve: false }, function() {
				sendResponse( { control: false } );
			} );
			break;
	}
} );

