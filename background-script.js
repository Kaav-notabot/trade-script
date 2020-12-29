chrome.runtime.onMessage.addListener( function( request, sender, sendResponse) {
	switch ( request.control ) {
		case 'start':
			chrome.tabs.executeScript( {
				file: 'observer.js',
			});
			chrome.storage.sync.set( { startObserve: true }, function() {
				sendResponse( { control: true } );
			} );
			// chrome.storage.sync.set({key: value}, function() {
			// 	console.log('Value is set to ' + value);
			// });
			// chrome.storage.sync.get(['key'], function(result) {
			// 	console.log('Value currently is ' + result.key);
			// });
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

