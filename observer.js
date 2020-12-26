const nodes = document.querySelectorAll( 'h2 + div > span:first-child' );
const targetNode = nodes[0];

var config = { attributes: true, childList: true, subtree: true, characterData: true };
var callback = function( mutationsList, observer ) {
	for( var mutation of mutationsList ) {
		if ( mutation.type === 'characterData' ) {
			console.log( mutation.target.textContent );
		}
	}
};

var observer = new MutationObserver( callback );
observer.observe( targetNode, config );
