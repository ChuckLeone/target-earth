//keycodes for web version
/** keycode for button presses
 * original code by Doug McInnes
 */
 KEY_CODES = {
 	32: 'space',
 	37: 'left',
 	38: 'up',
 	39: 'right',
 	40: 'down',
 	13: 'enter',
 	79: 'O',
 	88: 'Y'
 }
// creates the array to hold the KEY_CODES and sets all their values to false
KEY_STATUS = {};
for (code in KEY_CODES) {
	KEY_STATUS[ KEY_CODES[ code ]] = false;
}
// sets up the document to listen for onkeydown events
document.onkeydown = function(e) {
	var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
	if (KEY_CODES[keyCode]) {
		e.preventDefault();
		KEY_STATUS[KEY_CODES[keyCode]] = true;
	}
}

// sets up the document to listen for onkeyup events
document.onkeyup = function(e) {
	var keyCode = (e.keyCode) ? e.keyCode: e.charCode;
	if (KEY_CODES[keyCode]) {
		e.preventDefault();
		KEY_STATUS[KEY_CODES[keyCode]] = false;
	}
}