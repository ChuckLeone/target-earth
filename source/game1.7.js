// timer template
// var fadeOut = setTimeout(function(){
// 				do something...
// 			}, 500);

/**
 * initialize game
 */
var highScore = [];
var highWave = [];
var game = new Game();

function init() {
	game.init();
}


/**
 * define images
 */
 
var imageRepository = new function() {
	
	this.background = new Image();
	this.ship = new Image();
	this.bullet = new Image();
	this.enemy = new Image();
	this.enemyBullet = new Image();
	this.explosion = new Image();
	
	var numImages = 6;
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
	this.background.src = "media/bg.png";
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
 * create the background object which is drawn on the background canvas
 */
 
function Background() {
	this.speed = .3  ;
	
	this.draw = function() {
		// pan bg
		this.y += this.speed;
		this.context.drawImage(imageRepository.background, this.x, this.y);
		this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);
		
		if (this.y >= this.canvasHeight) {
			this.y = 0;
		}	
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
	  							bullet.init(0,0, imageRepository.bullet.width, imageRepository.bullet.height);
	  							bullet.collidableWith = "enemy";
	  							bullet.type = "bullet";
	  							pool[i] = bullet;
	  					}
				}
				else if(object == "enemy") {
						for (var i = 0; i < size; i++) {
	 							var enemy = new Enemy();
	 							enemy.init(0,0, imageRepository.enemy.width, imageRepository.enemy.height);
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
								explosion.init(0,0, imageRepository.explosion.width, imageRepository.explosion.height);
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
		this.context.drawImage(imageRepository.ship, this.x, this.y);
	};
	this.move = function() {
			counter++;
			//determine if the action is move action
			if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.down || KEY_STATUS.up) {
					//the ship moved so erase it's current image so it can be redrawn in new location
					//this.context.clearRect(this.x, this.y, 50, 10);
					this.context.clearRect(this.x, this.y, this.width, this.height);
			
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
					game.gameOver();
			}
		
			if ((KEY_STATUS.space || KEY_STATUS.enter) && counter >= fireRate && !this.isColliding) {
					this.fire();
					counter = 0;
			}
	};
	/* 
	 * fires two bullets
	 */
	 this.fire = function() {
	 			this.bulletPool.getTwo(this.x+6, this.y, 3, this.x+33, this.y, 3);
	 			game.laser.get();
	 };
	 // explodes
	
	this.explodes = function() {
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
				ctx.fillStyle= randomColor[0];
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
		//var color = [];
		
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
					var c=document.getElementById("main");
					var ctx=c.getContext("2d");
					x = this.x;
					y = this.y;
					ctx.fillStyle= "orange";
					ctx.fillRect(x, y, 20, 20);
					ctx.fillStyle= "rgb(0, 204, 255)";
					ctx.fillRect(x+1, y-8, 1, 1);
					ctx.fillStyle= "rgb(0, 204, 130)";
					ctx.fillRect(x, y-2, 20, 1);
					ctx.fillStyle= "red";
					ctx.fillRect(x, y-203, 20, 2);
					ctx.fillStyle= randomColor(color);
					ctx.fillRect(x, y-2, 80, 2);
					ctx.fillStyle= "rgb(255, 230, 0)";
					ctx.fillRect(x, y, 35, 35);
					ctx.fillStyle= "rgb(0, 255, 10)";
					ctx.fillRect(x, y-3, 100, 1);
					ctx.fillStyle= randomColor(color);
					ctx.fillRect(x-6, y, 180, 1);
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
					//
					//var randomColor = [color];
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
	this.draw = function() {
	
    }
    this.clear = function() {
    	this.context.clearRect(this.x, this.y, this.width, this.height);
	 	this.x = 0;
	 	this.y = 0;
	 	this.alive = false;
	}
} 

Explosion.prototype = new Drawable(); 
//end explosion
		
/**
 * create the game object
 */
 
function Game() {
	this.init = function() {
		this.enemyWave = 0;
		this.bgCanvas = document.getElementById('background');
		this.shipCanvas = document.getElementById('ship');
		this.mainCanvas = document.getElementById('main');
		
		//test to see if canvas is supported
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
			this.shipContext = this.shipCanvas.getContext('2d');
			this.mainContext = this.mainCanvas.getContext('2d');
			
			// initialize objects to contain their context and canvas info
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;
			
			Ship.prototype.context = this.shipContext;
			Ship.prototype.canvasWidth = this.shipCanvas.width;
			Ship.prototype.canvasHeight = this.shipCanvas.height;
			
			Bullet.prototype.context = this.mainContext;
			Bullet.prototype.canvasWidth = this.mainCanvas.width;
			Bullet.prototype.canvasHeight = this.mainCanvas.height;
			
			Enemy.prototype.context = this.mainContext;
			Enemy.prototype.canvasWidth = this.mainCanvas.width;
			Enemy.prototype.canvasHeight = this.mainCanvas.height;
			
			Explosion.prototype.context = this.mainContext;
			Explosion.prototype.canvasWidth = this.mainCanvas.width;
			Explosion.prototype.canvasHeight = this.mainCanvas.height;
			
			//initialize the background object
			this.background = new Background();
			this.background.init(0,0);
			
			//initialize the ship object
			this.ship = new Ship();
			// Set the ship to start near the bottom middle of the canvas
			this.shipStartX = this.shipCanvas.width/2 - imageRepository.ship.width;
			this.shipStartY = this.shipCanvas.height/4*3 + imageRepository.ship.height*2;
			this.ship.init(this.shipStartX, this.shipStartY, imageRepository.ship.width, imageRepository.ship.height);
			
			//initialize the enemy pool object
			this.enemyPool = new Pool(30);
			this.enemyPool.init("enemy");	
			this.spawnWave();
			//initialize the explosion pool object
			this.explosionPool = new Pool(30);
			this.explosionPool.init("explosion");
			
			//initialize the enemy bullet pool object
			this.enemyBulletPool = new Pool(80);
			this.enemyBulletPool.init("enemyBullet");
			
			// start QuadTree
			this.quadTree = new QuadTree({x:0,y:0,width:this.mainCanvas.width,height:this.mainCanvas.height});
			
			this.playerScore = 0;
			//this.enemyWave = 1;
			
			// audio files
			this.laser = new SoundPool(10);
			this.laser.init("laser");
		
			this.explosion = new SoundPool(20);
			this.explosion.init("explosion");
			
			this.newWave = new SoundPool(20);
			this.newWave.init("newWave");
		
			this.backgroundAudio = new Audio("sounds/level1.mp3");
      		this.backgroundAudio.loop = true;
      		this.backgroundAudio.volume = .3;
      		this.backgroundAudio.load();
      	
      		this.gameOverAudio = new Audio("sounds/game-over.wav");
     		this.gameOverAudio.loop = true;
      		this.gameOverAudio.volume = .25;
      		this.gameOverAudio.load();
		
			this.checkAudio = window.setInterval(function(){checkReadyState()},1000);
		
		}
	};
	// spawn a new wave of enemies
	 this.spawnWave = function() { 
	//set the color
		var randomColor = [color];
		function colorGenerator() {
					for (var n = 0; n < 1; n ++) {
    					var letters = '0123456789ABCDEF'.split('');
   						var color = '#';
    						for (var i = 0; i < 6; i++ ) {
    		    				color += letters[Math.round(Math.random() * 15)];
   							}
				} 
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
				x += width + 25;
				if (i % 6 == 0) {
						x = 100;
						y += spacer
				}
			}
	  }
	//start the animation loop
	this.start = function() {
		this.ship.draw();
		this.backgroundAudio.play();
		animate();
	};
 
// Restart the game
	this.restart = function() {
		this.gameOverAudio.pause();

		document.getElementById('game-over').style.display = "none";
		this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
		this.shipContext.clearRect(0, 0, this.shipCanvas.width, this.shipCanvas.height);
		this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

		this.quadTree.clear();

		this.background.init(0,0);
		this.ship.init(this.shipStartX, this.shipStartY, 
		               imageRepository.ship.width, imageRepository.ship.height);

		this.enemyPool.init("enemy");
		this.spawnWave();
		this.enemyBulletPool.init("enemyBullet");
		this.explosionPool.init("explosion");

		this.playerScore = 0;
		this.enemyWave = 1;

		this.backgroundAudio.currentTime = 0;
		this.backgroundAudio.play();

		this.start();
	};
	
	// Game over
  	this.gameOver = function() {
  		//this.background.draw();
  		this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
  		// var flashBg = function() {
//   	      while (this.gameOver = true) {
//   			this.bgContext.fillStyle = "red";
//   			this.bgContext.fillRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
//   		  };
//   		};
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
    	//this.background.draw();
    	this.mainContext.clearRect(0, 0);
  	};

}

/**
 * Ensure the game sound has loaded before starting the game
 */
function checkReadyState() {
	if (game.gameOverAudio.readyState === 4 && game.backgroundAudio.readyState === 4) {
		window.clearInterval(game.checkAudio);
		document.getElementById('loading').style.display = "none";
		game.start();
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
				laser = new Audio("sounds/laser.wav");
				laser.volume = .12;
				laser.load();
				pool[i] = laser;
			}
		}
		
		else if (object == "newWave") {
			for (var i = 0; i < size; i++){
				var newWave = new Audio("sounds/powerup1.wav");
				newWave.volume = .5;
				newWave.load();
				pool[i] = newWave;
			}
			
		}
		
		// else if (object == "newWave") {
// 			for (var i = 0; i < size; i++){
// 			  function getRandomSound() {
//              	 var soundSet = ['sounds/powerup0.wav', 'sounds/powerup1.wav', 'sounds/powerup2.wav'];
//               	 var n = Math.floor((Math.random()*3));
//               	 return soundSet[n];
//     		  }
//     		  
//               	var newWave = new Audio(getRandomSound());
//               	newWave.volume = .9;
//               	newWave.load();
//               	pool[i] = newWave;
//     		  
// 			}
// 			
// 		}
		
		else if (object == "explosion") {
			for (var i = 0; i < size; i++){
			  function getRandomSound() {
             	 var soundSet = ['sounds/explosion0.wav', 'sounds/explosion1.wav', 'sounds/explosion2.wav', 'sounds/explosion3.wav', 'sounds/explosion4.wav', 'sounds/explosion5.wav'];
              	 var n = Math.floor((Math.random()*6));
              	 return soundSet[n];
    		  }
    		  
              	var explosion = new Audio(getRandomSound());
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
	document.getElementById('wave-number').innerHTML = game.enemyWave;
	
	// Insert objects into quadtree
	game.quadTree.clear();
	game.quadTree.insert(game.ship);
	game.quadTree.insert(game.ship.bulletPool.getPool());
	game.quadTree.insert(game.enemyPool.getPool());
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
		
		game.background.draw();
		game.ship.move();
		game.ship.bulletPool.animate();
		game.enemyPool.animate();
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