// timer template
// var fadeOut = setTimeout(function(){
// 				do something...
// 			}, 500);

// circle template
// ctx.beginPath();
// ctx.arc(x, y, 15, 0, 2 * Math.PI, false);
// ctx.fillStyle = 'rgb(255, 230, 0)';
// ctx.fill();

/**
 * initialize game
 */
var highScore = [];
var highWave = [];
var game = new Game();

function init() {
	   //Splashscreen.init();
// 	   game.init();
	   game.splash();
}
/**
 * define images
 */
 
var imageRepository = new function() {
	
	this.background = new Image();
	this.splashscreen = new Image();
	this.loadingscreen = new Image();
	this.ship = new Image();
	this.bullet = new Image();
	this.enemy = new Image();
	this.enemyBullet = new Image();
	this.explosion = new Image();
	
	var numImages = 8;
	var numLoaded = 0;
	function imageLoaded() {
		numLoaded++;
		if (numLoaded == numImages) {
			window.init();
		}
	}
	
	this.background.onload = function() {
		imageLoaded();
	}
	this.splashscreen.onload = function() {
		imageLoaded();
	}
	this.loadingscreen.onload = function() {
		imageLoaded();
	}
	this.ship.onload = function() {
		imageLoaded();
	}
	this.bullet.onload = function() {
		imageLoaded();
	}
	this.enemy.onload = function() {
		imageLoaded();
	}
	this.enemyBullet.onload = function() {
		imageLoaded();
	}
	this.explosion.onload = function() {
		imageLoaded();
	}
	this.background.src = "media/bg-ED.png";
	this.splashscreen.src = "media/splash-screen.png";
	this.loadingscreen.src = "media/loading-screen.png";
	this.ship.src = "media/ship.png";
	this.bullet.src = "media/bullet.png";
	this.enemy.src = "media/enemy.png";
	this.enemyBullet.src = "media/bullet_enemy.png";
	this.explosion.src = "media/boom.png";
}

/**
 * create drawable object
 */

function Drawable() {
		this.init = function(x, y, width, height) {
				// default variables
				this.x = x;
				this.y = y;
				this.width = width;
				this.height = height;
		}
	
		this.speed = 0;
		this.canvasWidth = 0;
		this.canvasHeight = 0;
		this.collidableWith = "";
		this.isColliding = false;
		this.type = "";
	
		this.draw = function() {};
	
		this.move = function() {};
	
		this.isCollidableWith = function (object){
			return (this.collidableWith === object.type);
		};

}

/** 
 * create the splash screen object which is drawn on the main canvas
 */
 
function Splashscreen() {
	var splash = this;
	var counter = 0;
	var n = KEY_STATUS;
	document.getElementById('game-over').style.display = "none";
	document.getElementById('start').style.display = "block";
    //
	this.init = function(x, y, width, height) {
				// default variables
				this.x = x;
				this.y = y;
				this.width = width;
				this.height = height;
				console.log("splash screen init...");
				
				
		}

	this.draw = function() {	
		this.context.drawImage(imageRepository.splashscreen, this.x, this.y);
		this.mainCanvas = document.getElementById('main');
		
		(this.mainCanvas.startKey = function(){ document.onkeypress = function(evt) {
   			evt = evt || window.event;
    		var charCode = evt.which || evt.keyCode;
    		evt.preventDefault();
    		var n = 1;
    		console.log("Character typed: " + String.fromCharCode(charCode))
    		if (String.fromCharCode(charCode) == n) {
    			game.init();
    		}
    	 };
    	})();

	}	
	
}
Splashscreen.prototype = new Drawable();

/** 
 * create the loading screen object which is drawn on the main canvas
 */
 
function Loadingscreen() {
	this.init = function(x, y, width, height) {
				// default variables
				this.x = x;
				this.y = y;
				this.width = width;
				this.height = height;
				console.log("loading screen init...");
		}

	this.draw = function() {	
		this.context.drawImage(imageRepository.loadingscreen, this.x, this.y);
    	};	
	
}
Loadingscreen.prototype = new Drawable();


/** 
 * create the background object which is drawn on the background canvas
 */
 
function Background() {
	//this.speed = 0 ;
	
	this.draw = function() {
		this.context.drawImage(imageRepository.background, this.x, this.y);
		// if (this.y >= this.canvasHeight) {
// 			this.y = 0;
// 		}	
	};	
}
// set background to inherit properties from drawable

Background.prototype = new Drawable();

/**
 * create the bullet object
 */
 
function Bullet(object) {
		var bullet = this;
		this.alive = false; // is true if bullet is currently in use
		var self = object;
	
		/*
		 * sets the bullet value
		 */
	 
		this.spawn = function(x, y, speed) {
				this.x = x;
				this.y = y;
				this.speed = speed;
				this.alive = true;
		};
	
		/*
		 * use a "dirty rectangle" to erase the bullet and move it
		 */ 
		this.draw = function() {
	  			this.context.clearRect(this.x-1, this.y-1, this.width+2, this.height+1);
	  			this.y -= this.speed;
	  
	  			if (this.isColliding) {
	  				return true;
	 			}
	  
	  			else if (self === "bullet" && this.y <= 0 - this.height) {
	  					return true;
	  			} 
	  			else if (self === "enemyBullet" && this.y >= this.canvasHeight){
	  					return true;
	 			} 
	  			else { 
	  					if (self === "bullet") {
	  							//this.context.drawImage(imageRepository.bullet, this.x, this.y);
	  							var c=document.getElementById("main");
								var ctx=c.getContext("2d");
								x = this.x;
								y = this.y;
								//ctx.fillStyle = "rgb(255, 5, 255)";
								//ctx.fillRect(x, y, 1, 10)
								ctx.fillStyle = "rgb(255, 5, 255)";
								ctx.fillRect(x, y-15, 1, 10)
								ctx.fillStyle = "rgb(195, 5, 195)";
								ctx.fillRect(x, y-5, 1, 5)
								ctx.fillStyle = "rgb(100, 5, 100)";
								ctx.fillRect(x, y, 1, 10)
								ctx.fillStyle = "rgb(55, 5, 55)";
								ctx.fillRect(x, y+5, 1, 10)
	  								
	 	 				}
	 	 				else if (self === "enemyBullet") {
	 	 						var enemyBullet = this;
	 	 						var c=document.getElementById("main");
								var ctx=c.getContext("2d");
								x = this.x;
								y = this.y;
								ctx.fillStyle = "rgb(0, 255, 0)";
								ctx.fillRect(x, y+40, 1, 10)
								ctx.fillStyle = "rgb(0, 155, 0)";
								ctx.fillRect(x, y+20, 1, 20)
								ctx.fillStyle = "rgb(0, 125, 0)";
								ctx.fillRect(x, y+5, 1, 20)
								ctx.fillStyle = "rgb(0, 100, 0)";
								ctx.fillRect(x, y+1, 1, 10)
								ctx.fillStyle = "rgb(0, 85, 0)";
								ctx.fillRect(x, y, 1, 20)
								
	 	 				}
	  	 				return false;
	  			}
		};
		/* 
	 	 * resets the bullet
	 	 */
	 	this.clear = function() {
	 			this.context.clearRect(this.x-1, this.y-1, this.width+1, this.height+1);
	 			this.x = 0;
	 			this.y = 0;
	 			this.speed = 0;
	 			this.alive = false;
	 			this.isColliding = false;
	 	};
}
Bullet.prototype = new Drawable();

/*
 * QuadTree Object
 */
function QuadTree(boundBox, lvl) {
		var maxObjects = 10;
		this.bounds = boundBox || {
				x: 0,
				y: 0,
				width: 0,
				height: 0
		};
		var objects = [];
		this.nodes = [];
		var level = lvl || 0;
		var maxLevels = 5;
		
		// clears the quadTree
		this.clear = function() {
				objects = [];
				
				for (var i = 0; i < this.nodes.length; i++) {
						this.nodes[i].clear();
				}
				
				this.nodes = [];
		};
		
		// get all objects in the quadTree
		
		this.getAllObjects = function(returnedObjects) {
				for (var i = 0; i < this.nodes.length; i++) {
					this.nodes[i].getAllObjects(returnedObjects);
				}
				
				for (var i = 0, len = objects.length; i < len; i++) {
					returnedObjects.push(objects[i]);
				};
				
				return returnedObjects;
		};
		
		/*
		 * Return all objects that the object could collide with
		 */
		 
		 this.findObjects = function(returnedObjects, obj) {
		 		if (typeof obj === "undefined") {
		 				console.log("UNDEFINED OBJECT");
		 				return;
		 		}
		 		
		 		var index = this.getIndex(obj);
		 		if (index != - 1 && this.nodes.length) {
		 				this.nodes[index].findObjects(returnedObjects, obj);
		 		}
		 		
		 		for (var i = 0, len = objects.length; i < len; i++) {
		 			returnedObjects.push(objects[i]);
		 		}
		 		
		 		return returnedObjects;
		 };
		 
		 /*
		  * insert the objects into the quadTree
		  */
		  
		 this.insert = function(obj) {
		 		if (typeof obj === "undefined") {
		 				return;
		 		}
		 	
		 		if (obj instanceof Array) {
		 			for (var i = 0, len = obj.length; i < len; i++){
		 				this.insert(obj[i]);
		 			}
		 		
		 			return;
		 		}
		 	
		 		if (this.nodes.length){
		 				var index = this.getIndex(obj);
		 				// only add the object to a subnode if it can fit completely
		 				// within one
		 			
		 				if (index != -1) {
		 					this.nodes[index].insert(obj);
		 				
		 					return;
		 				}
		 		}
		 	
		 		objects.push(obj);
		 	
		 		// prevent infinite splitting
		 		if (objects.length > maxObjects && level < maxLevels) {
		 				if(this.nodes[0] == null) {
		 						this.split();
		 				}
		 			
		 				var i = 0;
		 				while (i < objects.length){
		 			
		 						var index = this.getIndex(objects[i]);
		 						if(index != -1) {
		 								this.nodes[index].insert((objects.splice(i, 1))[0]);
		 						}
		 						else {
		 								i++;
		 						}
		 				}
		 		}
		};
		 	
		// determine which node the object belongs to. -1 means
		// object cannot completely fit within a node and is part
		// of the current node
		 	
		this.getIndex = function(obj) {
		 	
		 		var index = -1;
		 		var verticalMidpoint = this.bounds.x + this.bounds.width / 2;
		 		var horizontalMidpoint = this.bounds.y + this.bounds.height / 2;
		 			
		 		// object can fit completely within the top quadrant
		 		var topQuadrant = (obj. y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint);
		 			
		 		// object can fit completely within the bottom quadrant
		 		var bottomQuadrant = (obj.y > horizontalMidpoint);
		 			
		 		// object can fit completely within the left quadrants
		 		if (obj.x < verticalMidpoint &&
		 						 obj.x + obj.width < verticalMidpoint) {
		 				if (topQuadrant) {
		 						index = 1;
		 				}
		 				else if (bottomQuadrant) {
		 						index = 2;
		 				}
		 			
		 		}
		 		// object can fix completely within the right quadrants
		 		 else if (obj.x > verticalMidpoint) {
		 				if (topQuadrant) {
		 					index = 0;
		 				}
		 				else if (bottomQuadrant) {
		 					index = 3;
		 				}
		 		}
		 			 
		 		return index;
		};
		 	
		/* 
		 * Splits the node into 4 subnodes
		 */
		this.split = function() {
    			// Bitwise or [html5rocks]
    			var subWidth = (this.bounds.width / 2) | 0;
    			var subHeight = (this.bounds.height / 2) | 0;
     
    	this.nodes[0] = new QuadTree({
      			x: this.bounds.x + subWidth,
      			y: this.bounds.y,
      			width: subWidth,
      			height: subHeight
    	}, level+1);
    	this.nodes[1] = new QuadTree({
      			x: this.bounds.x,
      			y: this.bounds.y,
      			width: subWidth,
      			height: subHeight
    	}, level+1);
    	this.nodes[2] = new QuadTree({
      			x: this.bounds.x,
      			y: this.bounds.y + subHeight,
      			width: subWidth,
      			height: subHeight
    	}, level+1);
    	this.nodes[3] = new QuadTree({
      			x: this.bounds.x + subWidth,
      			y: this.bounds.y + subHeight,
      			width: subWidth,
      			height: subHeight
    	}, level+1);
  	};
}

/**
 * create the object pool
 */
 
function Pool(maxSize) {
		var size = maxSize; //max bullets allowed
		var pool = [];
	
		this.getPool = function() {
			var obj = [];
			for (var i = 0; i < size; i++) {
				if (pool[i].alive) {
						obj.push(pool[i]);
				}
			}
			return obj;
		}
	
		// Populates the pool array with the given object
	 
		this.init = function(object) {
	 			if (object == "bullet") {
						for (var i = 0; i < size; i++) {
	  							//initialize the bullet object
	  							var bullet = new Bullet("bullet");
	  							bullet.init(0, 0, imageRepository.bullet.width, imageRepository.bullet.height);
	  							bullet.collidableWith = "enemy" && "specialEnemy";
	  							bullet.type = "bullet";
	  							pool[i] = bullet;
	  					}
				}
				
				else if(object == "specialEnemy") {
						for (var i = 0; i < size; i++) {
	 							var specialEnemy = new SpecialEnemy();
	 							specialEnemy.init(0, 0, 30, 30);
	 							pool[i] = specialEnemy;
	 					}
				}
				
				else if(object == "enemy") {
						for (var i = 0; i < size; i++) {
	 							var enemy = new Enemy();
	 							enemy.init(0, 0, 30, 30);
	 							pool[i] = enemy;
	 					}
				}
				else if (object == "enemyBullet") {
						for (var i = 0; i < size; i++) {
								var bullet = new Bullet("enemyBullet");
								bullet.init(0, 0, imageRepository.enemyBullet.width, imageRepository.enemyBullet.height);
								bullet.collidableWith = "ship";
								bullet.type = "enemyBullet";
								pool[i] = bullet;
						}
				}
				else if (object == "explosion") {
						for (var i = 0; i < size; i++) {
								var explosion = new Explosion();
								explosion.init(0, 0, 30, 30);
								pool[i] = explosion;
						}
				}
				
		};

		/*
 		 * Grabs the last item in the list and initializes it and
  		 * pushes it to the front of the array.
 		 */
	 
		this.get = function(x, y, speed) {
			if (!pool[size - 1].alive){
					pool[size - 1].spawn(x, y, speed);
					pool.unshift(pool.pop());
			}
		};
	
		/*
 		 * Used for the ship to be able to get two bullets at once. If
 		 * only the get() function is used twice, the ship is able to
 		 * fire and only have 1 bullet spawn instead of 2.
 		 */
		this.getTwo = function(x1, y1, speed1, x2, y2, speed2) {
			if(!pool[size - 1].alive && !pool[size - 2].alive) {
					this.get(x1, y1, speed1);
					this.get(x2, y2, speed2);
			}
		};

		/*
 		 * Draws any in use Bullets. If a bullet goes off the screen,
 		 * clears it and pushes it to the front of the array.
 		 */
	
		this.animate = function() {
				for (var i = 0; i < size; i++) {
						//draw only until we find a bullet that is not alive
		  				if (pool[i].alive) {
			  					if(pool[i].draw()) {
										pool[i].clear();
										pool.push((pool.splice(i,1))[0]);
			    				}
		  				}
		  				else
		  						break;
	 			}
 		};

}

/** 
 * draw the ship object
 */

function Ship() {
	this.speed = 3;
	this.bulletPool = new Pool(30);
	var fireRate = 15;
	var counter = 0;
	this.collidableWith = "enemyBullet";
	this.collidableWith = "specialEnemy";
	this.type = "ship";
	
	this.init = function(x, y, width, height) {
		// Defualt variables
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.alive = true;
		this.isColliding = false;
		this.bulletPool.init("bullet");
	}
	
	this.draw = function() {
		x = this.x;
		y = this.y;
// 		this.context.drawImage(imageRepository.ship, this.x, this.y);
		var canvas = document.getElementById("main");
		var context = canvas.getContext("2d");
		context.strokeStyle = 'rgb(255, 255, 255)';
		context.beginPath();
		context.moveTo(x+10, y);
		context.lineTo(x+19, y+19);
		context.lineTo(x+10, y+9);
		context.moveTo(x+9, y+9);
		context.lineTo(x, y+19);
		context.lineTo(x+9, y);
		
		context.stroke();
		context.closePath();
	};
	this.move = function() {	
			counter++;
			//determine if the action is move action
			if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.down || KEY_STATUS.up ) {
					//the ship moved so erase it's current image so it can be redrawn in new location
					this.context.clearRect(this.x-1, this.y, this.width, this.height);
			
					//update x a y according to the direction to move
					//change else if's to if statements to have diag movement
					if (KEY_STATUS.left) { 
							this.x -= this.speed
							if (this.x <= 0)// keep player within the screen
									this.x = 0;
					} else if(KEY_STATUS.right){
							this.x += this.speed
							if (this.x >= this.canvasWidth - this.width)
							this.x = this.canvasWidth - this.width;
					} else if(KEY_STATUS.up) {
							this.y -= this.speed
							if (this.y <= this.canvasHeight/4*3)
									this.y = this.canvasHeight/4*3;
					} else if(KEY_STATUS.down) {
							this.y += this.speed
							if (this.y >= this.canvasHeight - this.height)
				   					this.y = this.canvasHeight - this.height;
					} 		
			}
			
			// redraw the ship
			if (!this.isColliding) {
					this.draw();
			}
			else {
					this.alive = false;
					this.explodes();
						if (game.playerLives == 0){
							this.context.clearRect(this.x, this.y, this.width, this.height);
          					game.gameOver();
          					//
          					//
          				} else {
						  game.playerLives--;
						  game.playerDied.get();
						  // Set the ship to start near the bottom middle of the canvas
						  game.shipStartX = game.shipCanvas.width/2 - imageRepository.ship.width;
						  game.shipStartY = game.shipCanvas.height/4*3 + imageRepository.ship.height*2;
						  game.ship.init(game.shipStartX, game.shipStartY, imageRepository.ship.width, imageRepository.ship.height);
					}
				
			}
		
			if ((KEY_STATUS.space) && counter >= fireRate && !this.isColliding) {
					this.fire();
					//alert("fire!");
					counter = 0;
			}
	};
	/* 
	 * fires two bullets
	 */
	 this.fire = function() {
	 			this.bulletPool.getTwo(this.x+6, this.y, 3, this.x+22, this.y, 3);
	 			game.laser.get();
	 };
	 // explodes
	
	this.explodes = function() {
		this.context.clearRect(this.x, this.y, this.width, this.height);
		game.explosionPool.get(this.x, this.y);
		game.explosion.get();
	}
}
Ship.prototype = new Drawable();

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
		this.x = x + 50;
		this.y = y + 50;
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
				//ctx.fillStyle= randomColor(color);
				ctx.fillStyle= randomColor[0];
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
				ctx.fillStyle='red';
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
			alert();
			this.explodes();
			return true;
		}
		
	};
	/*
	 * fires a bullet
	 */
	this.fire = function() {
		game.enemyBulletPool.get(this.x+this.width/2, this.y+this.height, -2.5);
	}
	
	this.explodes = function() {
		game.explosionPool.get(this.x, this.y);
		game.explosion.get();
	}
	/**
	 * resets enemy values
	 */
	this.clear = function() {
		this.context.clearRect(this.x, this.y, this.width, this.height);
		alert();
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

/**
 * create the special enemy 
 */
function SpecialEnemy() {
	var specialEnemy = this;
	var c=document.getElementById("main");
	var ctx=c.getContext("2d");
	var percentFire = 0;
	var xStart = Math.floor((Math.random()*500)+1);
	this.alive = false;
	this.collidableWith = "bullet";
	this.collidableWith = "ship";
	this.type = "specialEnemy";
	this.id = "specialEnemy";
	//var wave = game.enemyWave;
	/*
	 * sets special enemy values
	 */
	this.spawn = function(x, y, speed) {
	//console.log("kommen sie here!");
		this.x = xStart;
		this.y = y + 50;
		this.speed = speed;
		this.speedX = speed;
		this.speedY = speed;
		this.alive = true;
		this.leftEdge = this.x - 10;
		this.rightEdge = this.x + 10;
		this.bottomEdge = this.y + 10;
	};
	
	/*
	 * move the special enemy
	 */
	this.draw = function() {
		this.context.clearRect(this.x-6, this.y-25, 35, 35);
		this.x += this.speedX;
		this.y += this.speedY+3;
		if (this.x <= this.leftEdge) {
			this.speedX = this.speed;
		}
		else if (this.x >= this.rightEdge + this.width){
			this.speedX = -this.speed;
		}
		else if (this.y >= this.bottomEdge) {
			this.speed = 1.5;
			this.speedY = 4;
			this.y -= 5;
			this.speedX = -this.speed;
		}
		
		if (!this.isColliding) {
				x = this.x;
				y = this.y;
				//ctx.fillStyle= randomColor[0];
				ctx.fillStyle= 'red';
				// enemy body
				ctx.fillRect(x, y, 20, 10);
				// enemy arms
				ctx.fillRect(x+10, y+2, 6, 4);
				ctx.fillRect(x-6, y+2, 6, 4);
				ctx.fillRect(x+22, y+4, 4, 10);
				ctx.fillRect(x-6, y+4, 4, 10);
	
				// enemy legs
				ctx.fillRect(x+2, y-5, 4, 4);
				ctx.fillRect(x+15, y-5, 4, 4);
				//
				ctx.fillRect(x+2, y+2, 14, 4)
				//
				// enemy eye - use for easier modes
				ctx.clearRect(x+2, y+2, 14, 4);
				ctx.fillStyle='rgb(0, 255,0)';
				ctx.fillRect(x+3, y+2, 4, 4);
				ctx.fillRect(x+9, y+2, 4, 4);
				
				// enemy has a chance to shoot every movement
				// chance = Math.floor(Math.random()*101);
// 				if (chance/100 < percentFire) {
// 					this.fire();
// 				}
				return false;
		}
		else {
			game.playerScore += 1000;
			//alert();
			this.explodes();
			return true;
		}
		
	};
	
	this.explodes = function() {
		game.explosionPool.get(this.x, this.y);
		game.explosion.get();
		(function specialAlert(){
				var c = document.getElementById('main');
				var ctx = c.getContext('2d');
				ctx.font = '15px Arial';
				ctx.fillStyle = 'rgb(255, 0, 0)';
				ctx.fillText("+1000", this.x, this.y);
				var fadeOut = setTimeout(function(){
				},1000);
		}()); 
	}
	/**
	 * resets special enemy values
	 */
	this.clear = function() {
		this.context.clearRect(this.x, this.y, this.width, this.height);
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.alive = false;
		this.isColliding = false;
	};
}
SpecialEnemy.prototype = new Drawable(); 

function alert() {
	var a = document.getElementById('player-alert');
	var c = document.getElementById('main');
	var ctx = c.getContext('2d');
		if (game.playerScore == 2000 || game.playerScore == 4000 || game.playerScore == 8000 || game.playerScore == 12000) {
			game.playerAlert.get();
			a.innerHTML = "NICE!";
			a.style.display = "block";
				var fadeOut = setTimeout(function(){
					a.style.display = "none";
				},800);
		} 
		
		else if (game.playerScore == 1000 || game.playerScore == 2000 || game.playerScore == 3000) {
			game.playerAlert.get();
			a.innerHTML = "INSANE!";
			a.style.display = "block";
				var fadeOut = setTimeout(function(){
					a.style.display = "none";
				},800);
		} 
		
		else if (game.playerScore == 15000 || game.playerScore == 25000 || game.playerScore == 50000 || game.playerScore == 750000 || game.playerScore == 100000) {
			game.playerBonus.get();
			game.playerLives++;
			a.innerHTML = "BONUS LIFE!";
			a.style.display = "block";
				var fadeOut = setTimeout(function(){
					a.style.display = "none";
				},800);
		}
		
		else if (game.enemyWave == 10 || game.enemyWave == 20 || game.enemyWave == 30 || game.enemyWave == 40) {
			game.playerBonus.get();
			game.playerScore+500;
			a.innerHTML = "BONUS ROUND!";
			a.style.display = "block";
				var fadeOut = setTimeout(function(){
					a.style.display = "none";
				},800);
		}
		
		else if (game.playerScore % 45 === 0) {
			game.playerBonus.get();
			a.innerHTML = "WATCH IT!";
			a.style.display = "block";
				var fadeOut = setTimeout(function(){
					a.style.display = "none";
				},800);
			game.spawnSpecial();
		}
		
		else {
		// display value of each kill
		ctx.font = '8px Arial';
		ctx.fillStyle = 'rgb(0, 180, 255)';
		ctx.fillText("+100!", this.x+40, this.y+40);
		}
}


/**
 * explosion animation
 */
function Explosion() {
	var explode = this;
 	this.spawn = function(x,y) {
 					this.alive = true;
					this.x = x;
					this.y = y;
					//this.context.drawImage(imageRepository.explosion, x, y);
					var c=document.getElementById('main');
					var ctx=c.getContext('2d');
					x = this.x;
					y = this.y;
					
					ctx.fillStyle= 'orange';
					ctx.fillRect(x, y, 20, 20);
					ctx.fillStyle= 'rgb(0, 204, 255)';
					ctx.fillRect(x+1, y-8, 1, 1);
					ctx.fillStyle= 'rgb(0, 204, 130)';
					ctx.fillRect(x, y-2, 20, 1);
					ctx.fillStyle= 'red';
					ctx.fillRect(x, y-203, 20, 2);
					ctx.fillStyle= randomColor(color);
					ctx.fillRect(x, y-2, 80, 2);
					//large explosion element
					ctx.fillStyle= "rgb(255, 230, 0)";
					ctx.fillRect(x, y, 35, 35);
					
					ctx.fillStyle= 'rgb(0, 255, 10)';
					ctx.fillRect(x, y-3, 100, 1);
					ctx.fillStyle= randomColor(color);
					ctx.fillRect(x-6, y, 180, 1);
					var fadeOut = setTimeout(function(){
						explode.clear();
					}, 800);
					ctx.fillStyle= "rgb(255, 0, 100)";
					ctx.fillRect(x, y-5, 66, 1);
					ctx.fillStyle= "orange";
					ctx.fillRect(x-20, y-3, 19, 1);
					ctx.fillStyle= "yellow";
					ctx.fillRect(x-4, y+20, 60, 1);
					//
					var fadeOut = setTimeout(function(){
						explode.clear();
					}, 100);
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
    this.clear = function() {
    	this.context.clearRect(this.x, this.y, this.width*200, this.height*200);
		this.x = 0;
		this.y = 0;
	 	this.alive = false;
	}
};

Explosion.prototype = new Drawable(); 

/**
 * create the game object
 */
 
function Game() {

	this.splash = function() {
		
		document.getElementById('game-over').style.display = "none";
		
		document.getElementById('main').style.border = "3px solid rgb(255, 153, 50)";
	
		this.titleAudio = new Audio("sounds/title.mp3");
      	this.titleAudio.loop = true;
      	this.titleAudio.volume = .5;
      	this.titleAudio.load();
      		
		this.titleAudio.play();
		console.log("running game splash function");
		this.mainCanvas = document.getElementById('main');
		
		this.splashContext = this.mainCanvas.getContext('2d');
		this.mainContext = this.mainCanvas.getContext('2d');
		
		Splashscreen.prototype.context = this.splashContext;;
		Splashscreen.prototype.canvasWidth = this.mainCanvas.width;
		Splashscreen.prototype.canvasHeight = this.mainCanvas.height;
		
		console.log("initialize new splash screen");
		this.splashscreen = new Splashscreen();
		this.splashscreen.init(0,0);
		
		this.splashscreen.draw();
	}
	
	this.loading = function() {
		console.log("running game loading screen function");
		this.mainCanvas = document.getElementById('main');
		
		this.loadingContext = this.mainCanvas.getContext('2d');
		this.mainContext = this.mainCanvas.getContext('2d');
		
		Loadingscreen.prototype.context = this.splashContext;
		Loadingscreen.prototype.canvasWidth = this.mainCanvas.width;
		Loadingscreen.prototype.canvasHeight = this.mainCanvas.height;
		
		console.log("initialize loading screen");
		this.loadingscreen = new Loadingscreen();
		this.loadingscreen.init(0,0);
		
		this.loadingscreen.draw();
	}

	this.init = function() {
		document.getElementById('start').style.display = "none";
		this.enemyWave = 0;
		
		this.mainCanvas = document.getElementById('main');
		this.shipCanvas = document.getElementById('main');
		
		//test to see if canvas is supported
		if (this.mainCanvas.getContext) {		
			this.bgContext = this.mainCanvas.getContext('2d');
			this.shipContext = this.mainCanvas.getContext('2d');
			this.mainContext = this.mainCanvas.getContext('2d');
			
			// change the canvas border color 255, 153, 50
			document.getElementById('main').style.border = "3px solid rgb(0, 0, 200)";
			console.log("change border to blue");
			this.loading();
			
			// initialize objects to contain their context and canvas info
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.mainCanvas.width;
			Background.prototype.canvasHeight = this.mainCanvas.height;
			
			Ship.prototype.context = this.shipContext;
			Ship.prototype.canvasWidth = this.mainCanvas.width;
			Ship.prototype.canvasHeight = this.mainCanvas.height;
			
			Bullet.prototype.context = this.mainContext;
			Bullet.prototype.canvasWidth = this.mainCanvas.width;
			Bullet.prototype.canvasHeight = this.mainCanvas.height;
			
			Enemy.prototype.context = this.mainContext;
			Enemy.prototype.canvasWidth = this.mainCanvas.width;
			Enemy.prototype.canvasHeight = this.mainCanvas.height;
			
			SpecialEnemy.prototype.context = this.mainContext;
			SpecialEnemy.prototype.canvasWidth = this.mainCanvas.width;
			SpecialEnemy.prototype.canvasHeight = this.mainCanvas.height;
			
			Explosion.prototype.context = this.mainContext;
			Explosion.prototype.canvasWidth = this.mainCanvas.width;
			Explosion.prototype.canvasHeight = this.mainCanvas.height;
			
			//initialize the background object
			this.background = new Background();
			this.background.init(0,0);
			
			//initialize the ship object
			this.ship = new Ship();
			// Set the ship to start near the bottom middle of the canvas
			this.shipStartX = this.mainCanvas.width/2 - imageRepository.ship.width;
			this.shipStartY = this.mainCanvas.height/4*3 + imageRepository.ship.height*2;
			this.ship.init(this.shipStartX, this.shipStartY, imageRepository.ship.width, imageRepository.ship.height);
			
			//initialize the enemy pool object
			this.enemyPool = new Pool(30);
			this.enemyPool.init("enemy");	
			this.spawnWave();
			
			//initialize the special enemy pool object
			this.specialEnemyPool = new Pool(50);
			this.specialEnemyPool.init("specialEnemy");	
			//this.spawnSpecial();
			
			//initialize the explosion pool object
			this.explosionPool = new Pool(30);
			this.explosionPool.init("explosion");
			
			//initialize the enemy bullet pool object
			this.enemyBulletPool = new Pool(80);
			this.enemyBulletPool.init("enemyBullet");
			
			// start QuadTree
			this.quadTree = new QuadTree({x:0,y:0,width:this.mainCanvas.width,height:this.mainCanvas.height});
			
			this.playerScore = 0;
			this.playerLives = 3;
			
			// audio files
			this.laser = new SoundPool(1);
			this.laser.init("laser");
		
			this.explosion = new SoundPool(1);
			this.explosion.init("explosion");
			
			this.newWave = new SoundPool(1);
			this.newWave.init("newWave");
			
			this.special = new SoundPool(1);
			this.special.init("special");
			
			this.playerAlert = new SoundPool(1);
			this.playerAlert.init("playerAlert");
			
			this.playerBonus = new SoundPool(1);
			this.playerBonus.init("playerBonus");
			
			this.playerDied = new SoundPool(1);
			this.playerDied.init("playerDied");
		
			this.backgroundAudio = new Audio("sounds/level1.mp3");
      		this.backgroundAudio.loop = true;
      		this.backgroundAudio.volume = .5;
      		this.backgroundAudio.load();
      	
      		this.gameOverAudio = new Audio("sounds/game-over.mp3");
     		this.gameOverAudio.loop = true;
      		this.gameOverAudio.volume = .25;
      		this.gameOverAudio.load();
		
			this.checkAudio = window.setInterval(function(){checkReadyState()},1000);
			this.background.draw();
		}
	};
	//this.context.drawImage(imageRepository.background, this.x, this.y);
	// spawn a new wave of enemies
	 this.spawnWave = function() { 
	//set the color
		randomColor = [];
		colorGenerator();
		console.log("color = " + randomColor[0]);
		function colorGenerator() {
					for (var n = 0; n < 1; n ++) {
    					var letters = '0123456789ABCDEF'.split('');
   						var color = '#';
    						for (var i = 0; i < 6; i++ ) {
    		    				color += letters[Math.round(Math.random() * 15)];
   							}
				} 
				randomColor.push(color);
				return color;
		};
	//
	 this.enemyWave = game.enemyWave + 1;
	 console.log("wave " + game.enemyWave);
	 var height = imageRepository.enemy.height;
	 var width = imageRepository.enemy.width;
	 var x = 100;
	 var y = -height;
	 var spacer = y * 1.5;
		for (var i = 1; i <= 18; i++){
				game.enemyPool.get(x, y, 2);
				x += width + 35;
				if (i % 6 == 0) {
						x = 100;
						y += spacer
				}
		}
	  }
	// spawn special enemy
	this.spawnSpecial = function() { 
	   		var wave = this.enemyWave;
	   		var height = 30;
	   		var width = 30;
	   		this.special.get();
	   		//var height = imageRepository.enemy.height;
	   		//var width = imageRepository.enemy.width;
	   		var x = 100;
	   		var y = -height;
	       	console.log("spawn special enemy");
	 		 		for (var i = 1; i <= 1; i++){
 						game.specialEnemyPool.get(x, y-80, 2);
 						x += width + 25;
					}
	  }
	  //
	  
	//start the animation loop
	this.start = function() {
		//console.log("start game");
		this.ship.draw();
		this.titleAudio.pause();
		this.backgroundAudio.play();
		animate();
	};
 
// Restart the game
	this.restart = function() {
		document.getElementById('game-over').style.display = "none";
		console.log("restart game");
		this.titleAudio.pause();
		this.gameOverAudio.pause();
		
		this.bgContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
		this.shipContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
		this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

		this.quadTree.clear();

// 		this.background.init(0,0);
		this.ship.init(this.shipStartX, this.shipStartY, 
		               imageRepository.ship.width, imageRepository.ship.height);

		this.enemyPool.init("enemy");
		this.spawnWave();
		this.specialEnemyPool.init("spcialEnemy");
		//this.spawnSpecial();
		this.enemyBulletPool.init("enemyBullet");
		this.explosionPool.init("explosion");

		this.playerScore = 0;
		this.playerLives = 3;
		this.enemyWave = 1;

		this.backgroundAudio.currentTime = 0;
		this.backgroundAudio.play();

		this.start();
	};
	
	// Game over
  	this.gameOver = function() {
  	playerScore = highScore.push();
  		//document.getElementById('game-over').style.display = "block";
  		var counter = 0;
  		var background = this.bgContext;
  		var canvas = this.mainCanvas;
  		var c = document.getElementById('main');
		var ctx = c.getContext('2d');

  		var flashBg = function() {
  	  		if (this.gameOver = true) {
  				background.fillStyle = "green";
  				background.fillRect(0, 0, canvas.width, canvas.height);
  		  	};
  		};
  		flashBg();
    	this.backgroundAudio.pause();
    	this.gameOverAudio.currentTime = 0;
    	this.gameOverAudio.play();
    	document.getElementById('game-over').style.display = "block";
    	if (highScore[0] >= game.playerScore) {
    		return highScore[0];
    	} else {
    		highScore[0] = game.playerScore;
    	};
    	console.log("score= " + game.playerScore );
    	document.getElementById('highScore').innerHTML = highScore[0];
    	if (highWave[0] >= game.enemyWave) {
    		return highWave[0];
    	} else {
    		highWave[0] = game.enemyWave;
    	};
    	document.getElementById('highWave').innerHTML = highWave[0];
    	this.mainContext.clearRect(0, 0, 725, 380);
    	
    	// event listener
    	(this.mainCanvas.startKey = function(){ document.onkeypress = function(evt) {
   			evt = evt || window.event;
    		var charCode = evt.which || evt.keyCode;
    		evt.preventDefault();
    		var n = 1;
    		var q = 2;
    		console.log("Character typed: " + String.fromCharCode(charCode))
    		if (String.fromCharCode(charCode) == n) {
    			game.restart();
    			document.getElementById('game-over').style.display = "none";
    		} else if (String.fromCharCode(charCode) == q) {
    			game.splash();
    			document.getElementById('game-over').style.display = "none";
    			game.gameOverAudio.pause()
    		}
    	 };
    	})();
    	// end event listener
		
  	};

}

/**
 * Ensure the game sound has loaded before starting the game
 */
function checkReadyState() {
	if (game.gameOverAudio.readyState === 4 && game.backgroundAudio.readyState === 4) {
		window.clearInterval(game.checkAudio);
		//document.getElementById('loading').style.display = "none";
		 //game.loadingScreen();
		 game.start(); 
		 //console.log("start game");
		//splashScreen(); // enable for splash screen
	}
}

/**
 * sound pool
 */
function SoundPool(maxSize) {
	var size = maxSize;
	var pool = [];
	this.pool = pool;
	var currSound = 0;
	
	// populates the pool with the given sound
	this.init = function(object) {
		if (object == "laser") {
			for (var i = 0; i < size; i++) {
				//initialize the sound
//				laser = new Audio("sounds/noise01.wav");
				laser = new Audio("sounds/laser.wav");
				laser.volume = .12;
				laser.load();
				pool[i] = laser;
			}
		}
		
		else if (object == "playerAlert") {
			for (var i = 0; i < size; i++){
				var playerAlert = new Audio("sounds/powerup8.wav");
				playerAlert.volume = .5;
				playerAlert.load();
				pool[i] = playerAlert;
			}
			
		}
		
		else if (object == "special") {
			for (var i = 0; i < size; i++){
				var special = new Audio("sounds/ufo.wav");
				special.volume = .3;
				special.load();
				pool[i] = special;
			}
			
		}
		
		else if (object == "playerBonus") {
			for (var i = 0; i < size; i++){
				var playerBonus = new Audio("sounds/powerup2.wav");
				playerBonus.volume = .5;
				playerBonus.load();
				pool[i] = playerBonus;
			}
			
		}
		
		else if (object == "playerDied") {
			for (var i = 0; i < size; i++){
				playerDied = new Audio("sounds/powerup3.wav");
				playerDied.volume = .5;
				playerDied.load();
				pool[i] = playerDied;
			}
			
		}
		
		else if (object == "newWave") {
			for (var i = 0; i < size; i++){
				newWave = new Audio("sounds/spawnwave3.wav");
				newWave.volume = .5;
				newWave.load();
				pool[i] = newWave;
			}
			
		}
		
		else if (object == "explosion") {
			for (var i = 0; i < size; i++){
			  function getRandomSound2() {
             	 soundSet = ['sounds/explosion0.wav', 'sounds/explosion1.wav', 'sounds/explosion2.wav', 'sounds/explosion3.wav', 'sounds/explosion4.wav', 'sounds/explosion5.wav'];
              	 n = Math.floor((Math.random()*6));
              	 return soundSet[n];
    		  }
    		  
              	var explosion = new Audio(getRandomSound2());
              	explosion.volume = .3;
              	explosion.load();
              	pool[i] = explosion;
    		  
			}
			
		}
		//
		
		//
	};
	
	// plays a sound
	this.get = function() {
		if(pool[currSound].currentTime == 0 || pool[currSound].ended) {
			pool[currSound].play();
		}
		currSound = (currSound + 1) % size;
	};
}

/**
 * the animation loop
 */ 
function animate() {
	document.getElementById('score').innerHTML = game.playerScore;
	document.getElementById('lives').innerHTML = game.playerLives;
	document.getElementById('wave-number').innerHTML = game.enemyWave;
	
	// Insert objects into quadtree
	game.quadTree.clear();
	game.quadTree.insert(game.ship);
	game.quadTree.insert(game.ship.bulletPool.getPool());
	game.quadTree.insert(game.enemyPool.getPool());
	game.quadTree.insert(game.specialEnemyPool.getPool());
	game.quadTree.insert(game.explosionPool.getPool());
	game.quadTree.insert(game.enemyBulletPool.getPool());

	detectCollision();
	
	// no more enemies
	if (game.enemyPool.getPool().length === 0) {
		//while (waveTimeout = setTimeout(function(){}, 5000)) {
			game.newWave.get();
			game.spawnWave();
		//}
	}
	
	// Animate game objects
	if (game.ship.alive) {
		requestAnimFrame( animate );
		
		//Splashscreen.draw(); // enable for splash screen
		//game.background.draw();
		game.ship.move();
		game.ship.bulletPool.animate();
		game.enemyPool.animate();
		game.specialEnemyPool.animate();
		game.explosionPool.animate();
		game.enemyBulletPool.animate();
	}
}

/*
 * detect collision
 */
function detectCollision() {
	var objects = [];
	game.quadTree.getAllObjects(objects);

	for (var x = 0, len = objects.length; x < len; x++) {		
		game.quadTree.findObjects(obj = [], objects[x]);

		for (y = 0, length = obj.length; y < length; y++) {

			// DETECT COLLISION ALGORITHM
			if (objects[x].collidableWith === obj[y].type &&
				(objects[x].x < obj[y].x + obj[y].width &&
			     objects[x].x + objects[x].width > obj[y].x &&
				 objects[x].y < obj[y].y + obj[y].height &&
				 objects[x].y + objects[y].height > obj[y].y)) {
				objects[x].isColliding = true;
				obj[y].isColliding = true;
			}
		}
	}
};


/**
 * requestAnim shim by Paul Irish
 */
 window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 60);
      };
})();