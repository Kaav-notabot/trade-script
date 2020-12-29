const startbtn = document.querySelector( '.row--controls__button--start' );
const stopbtn = document.querySelector( '.row--controls__button--stop' );

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

window.onload = function() {
	chrome.storage.sync.get( ['startObserve'], function( result ) {
		if ( ! result.startObserve ) {
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
};
