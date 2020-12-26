const startbtn = document.querySelector( '.row--controls__button--start' );
const stopbtn = document.querySelector( '.row--controls__button--stop' );
const start = document.getElementById( 'start' );

startbtn.addEventListener( 'click', function() {
	chrome.runtime.sendMessage( { control: 'start' }, function( response ) {
		start.textContent = response.control;
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
