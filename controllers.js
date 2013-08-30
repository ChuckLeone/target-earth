var _buttonState = [];

function initControllers()
{
	document.addEventListener('gamepad.0.KEYCODE_DPAD_UP.0', function() {controllerPressed(0,'UP');}, false);
	document.addEventListener('gamepad.0.KEYCODE_DPAD_RIGHT.0', function() {controllerPressed(0,'RIGHT'); }, false);
	document.addEventListener('gamepad.0.KEYCODE_DPAD_DOWN.0', function() {controllerPressed(0,'DOWN');}, false);
	document.addEventListener('gamepad.0.KEYCODE_DPAD_LEFT.0', function() {controllerPressed(0,'LEFT');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_Y.0', function() {controllerPressed(0,'Y');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_B.0', function() {controllerPressed(0,'A');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_A.0', function() {controllerPressed(0,'O');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_X.0', function() {controllerPressed(0,'U');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_L1.0', function() {controllerPressed(0,'L1');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_L2.0', function() {controllerPressed(0,'L2');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_R1.0', function() {controllerPressed(0,'R1');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_R2.0', function() {controllerPressed(0,'R2');}, false);
	document.addEventListener('gamepad.0.KEYCODE_MENU.0', function() {controllerPressed(0,'MENU');}, false);
	
	document.addEventListener('gamepad.1.KEYCODE_DPAD_UP.0', function() {controllerPressed(1,'UP');}, false);
	document.addEventListener('gamepad.1.KEYCODE_DPAD_RIGHT.0', function() {controllerPressed(1,'RIGHT'); }, false);
	document.addEventListener('gamepad.1.KEYCODE_DPAD_DOWN.0', function() {controllerPressed(1,'DOWN');}, false);
	document.addEventListener('gamepad.1.KEYCODE_DPAD_LEFT.0', function() {controllerPressed(1,'LEFT');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_Y.0', function() {controllerPressed(1,'Y');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_B.0', function() {controllerPressed(1,'A');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_A.0', function() {controllerPressed(1,'O');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_X.0', function() {controllerPressed(1,'U');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_L1.0', function() {controllerPressed(1,'L1');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_L2.0', function() {controllerPressed(1,'L2');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_R1.0', function() {controllerPressed(1,'R1');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_R2.0', function() {controllerPressed(1,'R2');}, false);
	document.addEventListener('gamepad.1.KEYCODE_MENU.0', function() {controllerPressed(1,'MENU');}, false);
	
	document.addEventListener('gamepad.0.KEYCODE_DPAD_UP.1', function() {controllerReleased(0,'UP');}, false);
	document.addEventListener('gamepad.0.KEYCODE_DPAD_RIGHT.1', function() {controllerReleased(0,'RIGHT'); }, false);
	document.addEventListener('gamepad.0.KEYCODE_DPAD_DOWN.1', function() {controllerReleased(0,'DOWN');}, false);
	document.addEventListener('gamepad.0.KEYCODE_DPAD_LEFT.1', function() {controllerReleased(0,'LEFT');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_Y.1', function() {controllerReleased(0,'Y');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_B.1', function() {controllerReleased(0,'A');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_A.1', function() {controllerReleased(0,'O');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_X.1', function() {controllerReleased(0,'U');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_L1.1', function() {controllerReleased(0,'L1');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_L2.1', function() {controllerReleased(0,'L2');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_R1.1', function() {controllerReleased(0,'R1');}, false);
	document.addEventListener('gamepad.0.KEYCODE_BUTTON_R2.1', function() {controllerReleased(0,'R2');}, false);
	document.addEventListener('gamepad.0.KEYCODE_MENU.1', function() {controllerReleased(0,'MENU');}, false);

	document.addEventListener('gamepad.1.KEYCODE_DPAD_UP.1', function() {controllerReleased(1,'UP');}, false);
	document.addEventListener('gamepad.1.KEYCODE_DPAD_RIGHT.1', function() {controllerReleased(1,'RIGHT'); }, false);
	document.addEventListener('gamepad.1.KEYCODE_DPAD_DOWN.1', function() {controllerReleased(1,'DOWN');}, false);
	document.addEventListener('gamepad.1.KEYCODE_DPAD_LEFT.1', function() {controllerReleased(1,'LEFT');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_Y.1', function() {controllerReleased(1,'Y');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_B.1', function() {controllerReleased(1,'A');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_A.1', function() {controllerReleased(1,'O');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_X.1', function() {controllerReleased(1,'U');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_L1.1', function() {controllerReleased(1,'L1');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_L2.1', function() {controllerReleased(1,'L2');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_R1.1', function() {controllerReleased(1,'R1');}, false);
	document.addEventListener('gamepad.1.KEYCODE_BUTTON_R2.1', function() {controllerReleased(1,'R2');}, false);
	document.addEventListener('gamepad.1.KEYCODE_MENU.1', function() {controllerReleased(1,'MENU');}, false);
	
	var p;
	for (p=0;p<2;p++)
	{
		_buttonState[p] = [];
		_buttonState[p]["UP"] = 0;
		_buttonState[p]["RIGHT"] = 0;
		_buttonState[p]["DOWN"] = 0;
		_buttonState[p]["LEFT"] = 0;
		_buttonState[p]["Y"] = 0;
		_buttonState[p]["B"] = 0
		_buttonState[p]["A"] = 0;
		_buttonState[p]["X"] = 0;
		_buttonState[p]["L1"] = 0;
		_buttonState[p]["L2"] = 0;
		_buttonState[p]["R1"] = 0;
		_buttonState[p]["R2"] = 0;
		_buttonState[p]["MENU"] = 0;
	}

}

function controllerPressed(player, button)
{
	//console.log("qwertyui" + player + "|" + button);
	
	_buttonState[player][button] = 1;
	buttonPressed(player, button);
}

function controllerReleased(player, button)
{
	buttonReleased(player, button);
	_buttonState[player][button] = 0;
}