var trade = ( function() {
	const nodes = document.querySelectorAll( 'h2 + div > span:first-child' );
	const targetNode = nodes[0];

	var config = { attributes: true, childList: true, subtree: true, characterData: true };
	var callback = function( mutationsList, observer ) {
		for ( var mutation of mutationsList ) {
			if ( mutation.type === 'characterData' ) {
				const cmp = Number( mutation.target.textContent );
				const lessThan = storage['less-than'];
				const moreThan = storage['more-than'];

				if ( cmp < lessThan ) {
					console.log( 'BUY !!!' );
				}

				if ( cmp >= moreThan ) {
					console.log( 'SELL !!!' );
				}
			}
		}
	};

	var observer = new MutationObserver( callback );
	observer.observe( targetNode, config );
	return { observer:observer };
})();
