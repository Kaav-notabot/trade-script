var targetNode = document.getElementById( "count" );
setInterval( function() {
	targetNode.textContent = Math.random();
}, 1000 );

var targetNode = $0;
var config = { attributes: true, childList: true, subtree: true, characterData: true };

var callback = function(mutationsList, observer) {
	for(var mutation of mutationsList) {
		if (mutation.type === 'childList') {
			console.log(mutation.target.textContent);
		}
	}
};


var observer = new MutationObserver(callback);
observer.observe(targetNode, config);
