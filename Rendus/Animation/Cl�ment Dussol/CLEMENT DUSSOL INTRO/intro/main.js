var canvas = document.createElement('canvas');
canvas.width = 960;
canvas.height = 420;

var introIsFinished = false;
var gameStarted = false;
var keys = [];

var background = {

	image : new Image(),
	
	width  : 1154,
	height : 806,

	scale : 2,
	positionX : -400,
	positionY : -900,
	

	Draw : function(){
		context.drawImage(this.image, this.positionX, this.positionY, this.width*this.scale, this.height*this.scale);
	}
}

background.image.src = 'Assets/fond.png';

var spaceship = {

	image : new Image(),

	width : 16,
	height : 16,

	scale : 2,

	positionY : 200,
	positionX : -50,

	step : 0,

	Draw : function(){
		context.drawImage(this.image, this.width*this.step, 0, this.width, this.height, this.positionX, this.positionY, this.width*this.scale, this.height*this.scale);
	},

	Animate : function(){
		this.step ++;
		if (this.step == 4) {
			this.step = 0;
		}
	}
}

spaceship.image.src = 'Assets/vaisseau.png';

var beam = {

	image : new Image(),

	width : 64,
	height : 48,

	scale : 2,

	positionY : 200,
	positionX : 200,

	step : 0,

	Draw : function(){
		context.drawImage(this.image, this.width*this.step, 0, this.width, this.height, this.positionX, this.positionY, this.width*this.scale, this.height*this.scale);
	},

	Animate : function(){
		this.step ++;
		if (this.step == 4) {
			this.step = 0;
		}
	}
}

beam.image.src = 'Assets/beam.png';

var font = {

	image : new Image(),

	width : 8,
	height : 8,

	positionX : canvas.width/2,
	positionY : 300,

	scale : 2,

	letters : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],

	Draw : function(message) {
		for(i=0; i < message.length; i ++) {
			context.drawImage(this.image,
			this.letters.indexOf(message[i])*this.width, 0,
			this.width, this.height,
			this.positionX-(message.length*(this.width*this.scale)/2)+i*(this.width*this.scale), this.positionY,
			this.width*this.scale, this.height*this.scale);
		}
	}

}

font.image.src = 'Assets/font.png';

var parallax0 = {

	image : new Image(),
	
	width  : 500,
	height : 256,

	scale : 2,
	positionX : 0,
	positionY : -16,
	

	Draw : function(){
		context.drawImage(this.image, this.positionX, this.positionY, this.width*this.scale, this.height*this.scale);
	}
}

parallax0.image.src = 'Assets/playingFond0.png';



var parallax1 = {

	image : new Image(),
	
	width  : 500,
	height : 256,

	speed : 2,

	scale : 2,
	positionX : 0,
	positionY : -32,
	

	Draw : function(){
		context.drawImage(this.image, this.positionX, this.positionY, this.width*this.scale, this.height*this.scale);
		context.drawImage(this.image, this.positionX+this.width*this.scale, this.positionY, this.width*this.scale, this.height*this.scale);
	},

	Move : function(){
		this.positionX -= this.speed;
		if(this.positionX <= -(this.width*this.scale)) {
			this.positionX = 0;
		}
	}
}

parallax1.image.src = 'Assets/playingfond1.png';

var parallax2 = {

	image : new Image(),
	
	width  : 500,
	height : 256,

	speed : 4,

	scale : 2,
	positionX : 0,
	positionY : -32,
	

	Draw : function(){
		context.drawImage(this.image, this.positionX, this.positionY, this.width*this.scale, this.height*this.scale);
		context.drawImage(this.image, this.positionX+this.width*this.scale, this.positionY, this.width*this.scale, this.height*this.scale);
	},

	Move : function(){
		this.positionX -= this.speed;
		if(this.positionX <= -(this.width*this.scale)) {
			this.positionX = 0;
		}
	}
}

parallax2.image.src = 'Assets/playingfond2.png';

var parallax3 = {

	image : new Image(),
	
	width  : 500,
	height : canvas.height/2,

	speed : 8,

	scale : 2,
	positionX : canvas.width,
	positionY : 0,
	

	Draw : function(){
		context.drawImage(this.image, this.positionX, this.positionY, this.width*this.scale, this.height*this.scale);
		context.drawImage(this.image, this.positionX+this.width*this.scale, this.positionY, this.width*this.scale, this.height*this.scale);
	},

	Move : function(){
		this.positionX -= this.speed;
		if(this.positionX <= -(this.width*this.scale)) {
			this.positionX = 0;
		}
	}
}

parallax3.image.src = 'Assets/playingfond3.png';


setInterval(GameLoop, 1000/50);

document.body.appendChild(canvas);
var context = canvas.getContext("2d");
context.mozImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;
context.globalAlpha = 0;
// var backgroundImage = new Image();
// backgroundImage.src = 'Assets/fond.png';

var baseMessage = 'press space to start';
var message = '';
var index = 0;
var globalAlphaIndex = 0;
function GameLoop(){
	
	context.clearRect(0,0,canvas.width,canvas.height);
	Animation();

	
}

window.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
});

window.document.onkeypress = getInput;

function getInput(e) {
	if (introIsFinished && !gameStarted && (e.keyCode == 0 || e.keyCode == 32)) {
		gameStarted = true;
	}
}

function Animation(){

	if (!introIsFinished && !gameStarted) {
		if (context.globalAlpha < 0.98) {
			context.globalAlpha += 0.02;
		} else {
			context.globalAlpha = 1;
			if ( background.scale > 1) {
				background.scale -= 0.0035;
				background.positionY +=2;
				if (background.positionX < 0) {
					background.positionX ++;
				}
			} else {
				if (background.positionY < 0) {
					background.positionY += 2;
				} else if (spaceship.positionX < canvas.width/2 - spaceship.width/2) {
					spaceship.positionX += 4;
				} else {
					introIsFinished = true;
				}
			}
		}		
	}

	if (gameStarted) {
		background.positionX -= 8;
	}

	spaceship.Animate();
	beam.Animate();

		if(gameStarted) {
		
		parallax0.Draw();
		parallax1.Draw();
		parallax1.Move();
		parallax2.Draw();
		parallax2.Move();

	}

	background.Draw();
	spaceship.Draw();

	if(introIsFinished && !gameStarted) {
		font.Draw(message);
		if (index < baseMessage.length) {
			message += baseMessage[index];
			index ++;
		}	
	}

	if (gameStarted) {
		  if (keys[37]) {
		    //velX = -10;
		    spaceship.positionX -= 5;
		    if (beam.scale > 1.5){
		    	beam.scale-=0.1;
		    }
		  } else {
			  	if (beam.scale < 2) {
				beam.scale+=0.1;
				}
		  }

		  if (keys[39]) {
		    //velX = 10;
		    spaceship.positionX += 5;
		    if (beam.scale < 2.5){
		    	beam.scale+=0.1;
		    } 

		  }else {
		    	 if (beam.scale > 2){
					beam.scale-=0.1;
				}
		    }
		  if (keys[40]) {
		    //velY = 10;
		    spaceship.positionY += 5;
		  }
		  if (keys[38]) {
		    //velY = -10;
		    spaceship.positionY -= 5;
		  }		
	} 

	if (gameStarted) {
		beam.positionX = spaceship.positionX - beam.width*beam.scale - 2;
		beam.positionY = spaceship.positionY - (beam.height*beam.scale/2)+(spaceship.height*spaceship.scale/2);
		beam.Draw();
		parallax3.Draw();
		parallax3.Move();
	}

}

function Draw(){
	context.drawImage(backgroundImage, background.positionX, background.positionY, background.width*background.scale);
}