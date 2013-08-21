/**
 * create the enemy 
 */
function Enemy() {
	var enemy = this;
	var c=document.getElementById("main");
	var ctx=c.getContext("2d");
	var percentFire = .01;
	var chance = 0;
	this.alive = false;
	this.collidableWith = "bullet";
	this.type = "enemy";
	this.id = "enemy";
	var wave = game.enemyWave;
	/*
	 * sets enemy values
	 */
	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y + 10;
		this.speed = speed;
		this.speedX = speed;
		this.speedY = speed;
		this.alive = true;
		this.leftEdge = this.x - 90;
		this.rightEdge = this.x + 90;
		this.bottomEdge = this.y + 140;
	};
	
	/*
	 * move the enemy
	 */
	this.draw = function() {
		//this.context.clearRect(this.x-1, this.y, this.width+1, this.height);
		this.context.clearRect(this.x-70, this.y, this.width+70, this.height);
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.x <= this.leftEdge) {
			this.speedX = this.speed;
		}
		else if (this.x >= this.rightEdge + this.width){
			this.speedX = -this.speed;
		}
		else if (this.y >= this.bottomEdge) {
			this.speed = 1.5;
			this.speedY = 0;
			this.y -= 5;
			this.speedX = -this.speed;
		}
		
		if (!this.isColliding) {
				//this.context.drawImage(imageRepository.enemy, this.x, this.y);
				// var c=document.getElementById("main");
// 				var ctx=c.getContext("2d");
				x = this.x;
				y = this.y;
				ctx.fillStyle= randomColor(color);
				// enemy body
				ctx.fillRect(x, y, 20, 20);
				// enemy arms
				ctx.fillRect(x+20, y+2, 6, 4);
				ctx.fillRect(x-6, y+2, 6, 4);
				ctx.fillRect(x+22, y+4, 4, 10);
				ctx.fillRect(x-6, y+4, 4, 10);
	
				// enemy legs
				ctx.fillRect(x+2, y+15, 4, 15);
				ctx.fillRect(x+15, y+15, 4, 15);
				//
				ctx.fillRect(x+2, y+2, 14, 4)
				//
				// enemy eye - use for easier modes
				ctx.clearRect(x+2, y+2, 14, 4);
				ctx.fillStyle= randomColor(color);
				ctx.fillRect(x+6, y+2, 6, 4);
				
				// enemy has a chance to shoot every movement
				chance = Math.floor(Math.random()*101);
				if (chance/100 < percentFire) {
					this.fire();
				}
				return false;
		}
		else {
			game.playerScore += 100;
			this.explodes();
			this.alert();
			return true;
		}
		// choose random color
		var randomColor = [color];
		var color = randomColor();
		function randomColor() {
					for (var n = 0; n < 1; n ++) {
    					var letters = '0123456789ABCDEF'.split('');
   						var color = '#';
    						for (var i = 0; i < 6; i++ ) {
    		    				color += letters[Math.round(Math.random() * 15)];
   							}
				} 
				return color;
		}
	};
	/*
	 * fires a bullet
	 */
	this.fire = function() {
		game.enemyBulletPool.get(this.x+this.width/2, this.y+this.height, -2.5);
	}

	this.alert = function() {
		console.log("player score = " + game.playerScore);
		if (game.playerScore == 1000) {
			console.log("nice!");
			// display value of kill
			ctx.font = '16pt Arial';
			ctx.fillStyle = 'red';
			ctx.fillText("Nice!", 300, 130)
			// var fadeOut = setTimeout(function(){
// 				enemy.clear();
// 			}, 500);
		} else {
		// display value of kill
		ctx.font = '8pt Arial';
		ctx.fillStyle = 'yellow';
		ctx.fillText("+100!", this.x, this.y)
		}
	}
	
	this.explodes = function() {
		game.explosionPool.get(this.x, this.y);
		game.explosion.get();
		// display value of kill
			ctx.font = '8pt Arial';
			ctx.fillStyle = 'yellow';
			ctx.fillText("+100!", this.x, this.y)
			var fadeOut = setTimeout(function(){
				enemy.clear();
			}, 500);
	}
	/**
	 * resets enemy values
	 */
	this.clear = function() {
		//this.context.clearRect(this.x, this.y, this.width, this.height);
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.alive = false;
		this.isColliding = false;
	};
}
Enemy.prototype = new Drawable(); 
