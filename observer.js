var trade = ( function() {
	const nodes = document.querySelectorAll( 'h2 + div > span:first-child' );
	const targetNode = nodes[0];
	const buySound = new Audio( chrome.runtime.getURL( "src/sounds/buy.mp3" ) );
	const sellSound = new Audio( chrome.runtime.getURL( "src/sounds/sell.mp3" ) );

	buySound.volume = 0.3;
	buySound.loop = true;

	sellSound.volume = 0.3;
	sellSound.loop = true;

	let isBuySoundPlaying = false;
	let isSellSoundPlaying = false;

	buySound.addEventListener( 'pause', function() {
		isBuySoundPlaying = false;
	} );

	buySound.addEventListener( 'play', function() {
		isBuySoundPlaying = true;
	} );

	sellSound.addEventListener( 'pause', function() {
		isSellSoundPlaying = false;
	} );

	sellSound.addEventListener( 'play', function() {
		isSellSoundPlaying = true;
	} );


	var config = { attributes: true, childList: true, subtree: true, characterData: true };
	var callback = function( mutationsList, observer ) {
		for ( var mutation of mutationsList ) {
			if ( mutation.type === 'characterData' ) {
				const cmp = Number( mutation.target.textContent );
				const lessThan = storage['less-than'];
				const moreThan = storage['more-than'];

				console.log( storage )

				if ( cmp > lessThan && cmp < moreThan ) {
					buySound.pause();
					sellSound.pause();
				}

				if ( cmp < lessThan ) {
					if ( isSellSoundPlaying ) {
						sellSound.pause();
					}
					buySound.play();
				}

				if ( cmp >= moreThan ) {
					if ( isBuySoundPlaying ) {
						buySound.pause();
					}
					sellSound.play();
				}
			}
		}
	};

	var observer = new MutationObserver( callback );
	observer.observe( targetNode, config );
	return { observer:observer };
})();
