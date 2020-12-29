chrome.runtime.onMessage.addListener( function( request, sender, sendResponse) {
	chrome.tabs.getSelected( null, function( tabs ) {
		const tabId = tabs.id.toString();

		chrome.storage.sync.get( [ tabId ], function( result ) {
			const storage = result[ tabId ] || {};

			switch ( request.control ) {
				case 'start':
					storage.startObserve = true;
					chrome.storage.sync.set( { [ tabId ]: storage }, function() {
						sendResponse( { control: true } );
					} );

					chrome.tabs.executeScript( {
						code: `var storage = ${ JSON.stringify( storage ) }`,
					}, function() {
						chrome.tabs.executeScript( {
							file: 'observer.js',
						});
					} );
					break;
				case 'stop':
					chrome.tabs.executeScript( {
						code: 'trade.observer.disconnect();',
					});
					storage.startObserve = false;
					chrome.storage.sync.set( { [ tabId ]: storage }, function() {
						sendResponse( { control: false } );
					} );
					break;
				case 'inputChanged':
					chrome.tabs.executeScript( {
						code: `var storage = ${ JSON.stringify( storage ) }`,
					});
					break;
			}
		} );
	} );
} );

