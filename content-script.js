const startbtn = document.querySelector( '.row--controls__button--start' );
const stopbtn = document.querySelector( '.row--controls__button--stop' );
const lessThanIp = document.querySelector( 'input[name="less-than"]' );
const moreThanIp = document.querySelector( 'input[name="more-than"]' );

startbtn.addEventListener( 'click', function() {
	chrome.runtime.sendMessage( { control: 'start' }, function( response ) {
		startbtn.classList = [ 'row--controls__button row--controls__button--start' ];
		startbtn.classList.add( 'row--controls__button--hide' );
		
		stopbtn.classList = [ 'row--controls__button row--controls__button--stop' ];
		stopbtn.classList.add( 'row--controls__button--show' );
	});
} );

stopbtn.addEventListener( 'click', function() {
	chrome.runtime.sendMessage( { control: 'stop' }, function( response ) {
		stopbtn.classList = [ 'row--controls__button row--controls__button--stop' ];
		stopbtn.classList.add( 'row--controls__button--hide' );
		
		startbtn.classList = [ 'row--controls__button row--controls__button--start' ];
		startbtn.classList.add( 'row--controls__button--show' );
	});
} );

document.addEventListener( 'input', function( e ) {
	chrome.tabs.getSelected( null, function( tabs ) {
		const tabId = tabs.id.toString();

		chrome.storage.sync.get( [ tabId ], function( result ) {
			const storage = result[ tabId ] || {};
			storage[ e.target.name ] = e.target.value;
			console.log( storage )
			chrome.storage.sync.set( { [ tabId ]: storage } );

			chrome.runtime.sendMessage( { control: 'inputChanged' }, function( response ) {} )
		} );
	} );
} );

window.onload = function() {
	chrome.tabs.getSelected( null, function( tabs ) {
		const tabId = tabs.id.toString();

		chrome.storage.sync.get( [ tabId ], function( result ) {
			const storage = result[ tabId ];

			if ( ! storage || ! storage.startObserve ) {
				stopbtn.classList = [ 'row--controls__button row--controls__button--stop' ];
				stopbtn.classList.add( 'row--controls__button--hide' );
				startbtn.classList = [ 'row--controls__button row--controls__button--start' ];
				startbtn.classList.add( 'row--controls__button--show' );
			} else {
				startbtn.classList = [ 'row--controls__button row--controls__button--start' ];
				startbtn.classList.add( 'row--controls__button--hide' );
				stopbtn.classList = [ 'row--controls__button row--controls__button--stop' ];
				stopbtn.classList.add( 'row--controls__button--show' );
			}
		} );
	
		chrome.storage.sync.get( [ tabId ], function( result ) {
			const storage = result[ tabId ] || {};

			if ( ! storage['less-than'] ) {
				storage['less-than'] = 0.00;
				chrome.storage.sync.set( { [ tabId ]: storage } );
			} else {
				lessThanIp.value = Number( storage['less-than'] );
			}

			if ( ! storage['more-than'] ) {
				storage['more-than'] = 1.00;
				chrome.storage.sync.set( { [ tabId ]: storage } );
			} else {
				moreThanIp.value = Number( storage['more-than'] );
			}
		} )
	} );
};
