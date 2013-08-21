document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    alert("Character typed: " + String.fromCharCode(charCode));
//     console.log("Character typed: " + String.fromCharCode(charCode));
};
$(document).ready(function() {
	function splashScreen() {
		var counter = 0;
		var c=document.getElementById("main");
		var ctx=c.getContext("2d");
		console.log("splash screen");
		ctx.fillStyle = 'red';
		ctx.fillRect(0, 0, 600, 360);
		ctx.font = '30pt Arial';
		ctx.fillStyle = 'rgb(255, 255, 255)';
 		ctx.fillText("Target Earth", 300, 300)
		//this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);
		ctx.font = '20pt Arial';
		ctx.fillStyle = 'rgb(255, 255, 255)';
 		ctx.fillText("Press 1 to Start", 300, 230)
		listenForKey();
// 		$('#game-over').css({'display': 'block'});
		
		// $('#oKey').keypress(function(){
// 			console.log("key was pressed");
// 			keypress();
// 		});
		// counter++;
// 		function listenForKey() {
// 			for (var i=0; ii++; KEY_STATUS.space || KEY_STATUS.enter ) {
// 					console.log("enter or space pressed");
// // 					this.fire();
// 
// 					counter = 0;
// 			}
// 		}
		
		// .keydown(function(event) {
//   			if (event.which == 70) {
//      			event.preventDefault();
//      			console.log("O was pressed");
//   			 }
// 		});
		 // .keypress(function(e) {
// 			console.log("keypress function running");
//   			if (e.which == '70') {
//     		 	//e.preventDefault();
//     		 	$('#oKey').html("Pressed!");
//      			console.log("O was pressed");
//    			}
//    		});
   		// $('#oKey').keydown(function() {
//  			 alert('Handler for .keydown() called.');
// 		});	


	}

	splashScreen();
});