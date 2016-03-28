// Rendu Canvas 
var canvas = document.createElement('canvas');
var width = 800;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function() {
 document.body.appendChild(canvas);
 setInterval(step,1000/60);
};

var step = function() {
  update();
  render();

};

var update = function() {
  player.update();
  player2.update(ball);
  ball.update(player.paddle, player2.paddle);
};


var render = function() {
  context.fillStyle = "#101010";
  context.fillRect(0, 0, width, height);
  player.render();
  player2.render();
  ball.render();
};


// Affichage de planches et balle 
function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Paddle.prototype.render = function() {
  context.fillStyle = "#0000FF";
  context.fillRect(this.x, this.y, this.width, this.height);
};
function Player() {
   this.paddle = new Paddle(375, 580, 50, 10);
}

function Player2() {
  this.paddle = new Paddle(375, 10, 50, 10);
}
Player.prototype.render = function() {
  this.paddle.render();
};

Player2.prototype.render = function() {
  this.paddle.render();
};
// Personnalisation de la balle 

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 6;
  this.radius = 6;
}
var couleurbal = "#ffffff";
Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = couleurbal
  context.fill();
};

var player = new Player();
var player2 = new Player2();
var ball = new Ball(400, 300);


Ball.prototype.update = function() {
  this.x += this.x_speed;
  this.y += this.y_speed;
};

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  // Interactions avec les murs
 var scoreJ1 = 0;
var scoreJ2 = 0; 
 // touche le coté gauche
  if(this.x - 5 < 0) { 
    this.x = 3;
    this.x_speed = -this.x_speed;
    couleurbal = "#fefefe";
  } // touche le coté droit
  else if(this.x + 5 > 800) { 
    this.x = 780;
    this.x_speed = -this.x_speed;
    couleurbal = "#fefefe";
  }
 // un point est marqué
  if(this.y < 0 || this.y > 800) { 
    this.x_speed = 0;
    if(0.5 >= Math.random()) {
    	this.y_speed = 3;
    	}else {
    		this.y_speed = -3;
    	}
    	if(this.y < 0){
    	scoreJ1 = scoreJ1 + 1;
    	alert("Votre score est de "+ scoreJ1)
    } else if(this.y > 800){
    	scoreJ2 = scoreJ2 + 1;
    	alert("Votre score est de "+ scoreJ2)
    }
    this.x = 400;
    this.y = 300;
    
    couleurbal = "#fefefe";
  }

  if(top_y > 300) {
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
    // Touche la planche du joueur 1
      this.y_speed = -3;
      this.x_speed += (paddle1.x_speed / 2);
      this.y += this.y_speed;
      couleurbal = "#41E815";
    }
  } else {
    if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
   // Touche la planche du joueur 2
      this.y_speed = 3;
      this.x_speed += (paddle2.x_speed / 2);
      this.y += this.y_speed;
      couleurbal = "#FF2A11"
    }
  }
};

// Mouvement clavier 
var keysDown = {};

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});

// Mouvement joueur 1
Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 37) { // fleche gauche
      this.paddle.move(-10, 0);
    } else if (value == 39) { // fleche droite
      this.paddle.move(10, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

// Mouvement Joueur 2 
Player2.prototype.update = function(ball) {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 49) { // fleche gauche
      this.paddle.move(-10, 0);
    } else if (value == 50) { // fleche droite
      this.paddle.move(10, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.x < 0) { // Coté gauche 
    this.x = 0;
    this.x_speed = 0;
  } else if (this.x + this.width > 800) { // Coté droit
    this.x = 800 - this.width;
    this.x_speed = 0;
  }
}
// Affichage du score
var scoreJ1 = 0;
var scoreJ2 = 0;



// Map
var map = [
	["M","M","M","M","M","M","M","M","M"],
	["M","_","_","-","-","-","_","_","M"],
	["M","_","_","_","_","_","_","_","M"],
	["M","_","_","_","_","_","_","_","M"],
	["M","_","_","_","_","_","_","_","M"],
	["M","_","_","_","P","_","_","_","M"],
	["M","_","_","_","_","_","_","_","M"],
	["M","_","_","_","_","_","_","_","M"],
	["M","_","_","_","_","_","_","_","M"],
	["M","_","_","-","-","-","_","_","M"],
	["M","M","M","M","M","M","M","M","M"],
	]
	var taillemurs = 2,
		block 	= "%c",
		pos_x = 3,
		pos_y = 3, 
		direction = '', 
		couleurmurs 	= "#000",
		couleursols 	= "#000",
		couleurplanche 	= "#2911FF",
		couleurballe	= "fffffff";
	for(var i = 0; !(i == taillemurs); i++){
		block += " ";
	}
function DrawMap(){
	console.log("Bienvenue sur The Pongtcher."+
				"\nLe principe est simple, le"+
				"\npremier à 5 points l'emporte."+
				"\nPour jouer, fermez la console"+
				"\net choisissez une des raquettes"+
				"\nle J1 a pour toucher flèche gauche"+
				"\net flèche droite, et le J2 a pour touche"+
				"\n& et é(1 et 2 des caractères spéciaux).")
	var	tablcss = [],
		ligne = "",
		casecourante = 0,
		lignecourante = 0;
		
	while(true){
		casecourante = 0;
		//ligne = "";
		//tablcss = [];
		
		while(true){
			ligne += block;
			if(map[lignecourante][casecourante]=="M"){
				tablcss.push("background : " + couleurmurs);
			}
			if(map[lignecourante][casecourante]=="_"){
				tablcss.push("background : " + couleursols);
			}
			if(map[lignecourante][casecourante]=="-"){
				tablcss.push("background : " + couleurplanche);
			}
			if(map[lignecourante][casecourante]=="P"){
				tablcss.push("background : " + couleurballe);
			}
			casecourante++;
			if(casecourante == map[lignecourante].length){
				break;
			}
		}
		
		
		lignecourante++;
		ligne += "\n";
		
		if(lignecourante == map.length){	
			break;
		}
	}
	
	console.log(ligne, ...tablcss);
}
