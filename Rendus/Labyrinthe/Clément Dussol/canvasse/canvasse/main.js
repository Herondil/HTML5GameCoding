var map = [
	['M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M'],
	['M', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'M'],
	['M', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'M'],
	['M', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'M'],
	['M', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'M'],
	['M', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'M'],
	['M', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'M'],
	['M', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'M'],
	['M', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'M'],
	['M', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'M'],
	['M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'S', 'M', 'M']
];

var gameState = 1;

var keyTable = ['tiles/key1.png', 'tiles/key2.png', 'tiles/key3.png'];
var keyTableFalse = ['tiles/keyFalse1.png', 'tiles/keyFalse2.png', 'tiles/keyFalse3.png', 'tiles/keyFalse4.png', 'tiles/keyFalse5.png'];

var key = function(posx, posy, sprite){
	this.coords = {x:posx, y:posy};
	this.sprite = new Image();
	this.sprite.src = sprite;
	this.draw = function(){
		context.drawImage(this.sprite, this.coords.x*32, this.coords.y*32);
	}
}

var message = {
	messageDiv : {},
	create : function(){
		this.messageDiv = document.createElement('div');
		this.messageDiv.id = 'info';
		document.body.appendChild(this.messageDiv);
	},
	edit : function(mess) {
		this.messageDiv.innerHTML = mess;
	}
}

message.create();
message.edit('Clickez pour commencer <button id="start">Commencer</button>');
document.getElementById('start').onclick = startGame;

function startGame() {

	gameState = 1;

	setInterval(GameLoop, 1000/60);

	falseKey1 = new key(1, Math.round(Math.random()*(map.length-3))+1, keyTableFalse[Math.round(Math.random()*(keyTableFalse.length-1))]);
	falseKey2 = new key(Math.round(Math.random()*(map.length[0]-3))+1, 1,  keyTableFalse[Math.round(Math.random()*(keyTableFalse.length-1))]);
	key1 = new key(1, Math.round(Math.random()*(map.length-3))+1, keyTable[gameState-1]);

	context.drawImage(keyEmptSprite1, 0, map.length*32);
	context.drawImage(keyEmptSprite2, 32, map.length*32);
	context.drawImage(keyEmptSprite3, 64, map.length*32);
}
var Guard = {
	coords : {x:1, y:1},
	direction : 'bottom',
	calculPos : function(){
		switch(this.direction) {
			case 'left' :
				if(map[this.coords.y][this.coords.x-1] != 'M') {
				this.coords.x--;
			}
				break;
			case 'top' :
				if(map[this.coords.y-1][this.coords.x] != 'M') {
				this.coords.y--;
			}
				break;
			case 'right' :
				if(map[this.coords.y][this.coords.x+1] != 'M') {
				this.coords.x++;
			}
				break;
			case 'bottom' :
				if(map[this.coords.y+1][this.coords.x] != 'M') {
				this.coords.y++;
			}
				break;
		}

		if (map[this.coords.y][this.coords.x-1] == 'M' && map[this.coords.y+1][this.coords.x] == 'M') {
			this.direction = 'right';
		} else if (map[this.coords.y][this.coords.x+1] == 'M' && map[this.coords.y+1][this.coords.x] == 'M') {
			this.direction = 'top';
		} else if (map[this.coords.y][this.coords.x+1] == 'M' && map[this.coords.y-1][this.coords.x] == 'M') {
			this.direction = 'left';
		} else if (map[this.coords.y][this.coords.x-1] == 'M' && map[this.coords.y-1][this.coords.x] == 'M') {
			this.direction = 'bottom';
		}
	},
	draw : function(){
		context.drawImage(guardSprite, this.coords.x*32, this.coords.y*32);
	}
}

document.onkeydown = function(e){
	Player.playerMove(e);
};

var Player = {
	coords : {x:3, y:4},
	dead : false,
	draw : function(){
		context.drawImage(playerSprite, this.coords.x*32, this.coords.y*32);
	},
	playerMove : function(input){
		if (!Player.dead) {
			switch(input.keyCode) {
				case 37:
					this.calculPos('gauche');
					break;
				case 38:
					this.calculPos('haut');
					break;
				case 39:
					this.calculPos('droite');
					break;
				case 40:
					this.calculPos('bas');
					break;
			}			
		}
	},
	calculPos : function(input){
		switch(input) {
			case 'gauche':
				if(map[this.coords.y][this.coords.x-1] != 'M') {
					this.coords.x--;
				}
				break;
			case 'droite':
				if(map[this.coords.y][this.coords.x+1] != 'M') {
					this.coords.x++;
				}
				break;
			case 'haut':
				if(map[this.coords.y-1][this.coords.x] != 'M') {
					this.coords.y--;
				}
				break;
			case 'bas':
				if(map[this.coords.y+1][this.coords.x] != 'M') {
					this.coords.y++;
				}
				break;
		}
	}
}

var wallSprite   = new Image(),
	floorSprite  = new Image(),
	playerSprite = new Image(),
	guardSprite  = new Image(),
	doorSprite   = new Image(),
	
	keyEmptSprite1 = new Image(),
	keyEmptSprite2 = new Image(),
	keyEmptSprite3 = new Image();

wallSprite.src   = 'tiles/wall.png';
floorSprite.src  = 'tiles/floor.png';
playerSprite.src = 'tiles/player.png';
guardSprite.src  = 'tiles/guard.png';
doorSprite.src   = 'tiles/door.png';

	keyEmptSprite1.src = 'tiles/keyEmpty1.png';
	keyEmptSprite2.src = 'tiles/keyEmpty2.png';
	keyEmptSprite3.src = 'tiles/keyEmpty3.png';

var canvas  = document.createElement('canvas'),
	context = canvas.getContext("2d"); 

canvas.width = map[0].length*32;
canvas.height = 600;
document.body.appendChild(canvas);

//requestAnimFrame - à checker ! Permet de laisser le navigateur gérer les fps


function GameLoop(input) {
	DrawMap();
	Player.calculPos(input);
	Guard.calculPos();
	checkCollision();
	Guard.draw();
	Player.draw();
	falseKey1.draw();
	falseKey2.draw();
	key1.draw();
}

console.log(document.images)

function checkCollision() {
	if (Player.coords.x == Guard.coords.x && Player.coords.y == Guard.coords.y) {
		Player.dead = true;
		playerSprite.src = 'tiles/playerDead.png';
		//restart();
	};

	if (Player.coords.x == key1.coords.x && Player.coords.y == key1.coords.y) {
		keyEmptSprite1.src = "tiles/key1.png";
		context.drawImage(keyEmptSprite1, (gameState-1)*32, map.length*32);
		nextGameState();
	}
	// if (map[player.coords.y][player.coords.x] == 'S') {
	// 	console.log('Félicitations, vous avez trouvé la sortie !')
	// }
}

function nextGameState() {
	gameState++;
	Player.coords.x = 3;
	Player.coords.y = 4;
	document.getElementById('info').innerHTML='Vous avez récupéré la première clé, laissez la place à un autre joueur qui poursuivra votre quête';
}

function DrawMap() {
	for (var y = 0; y < map.length; y ++) {
		for(var x = 0; x < map[y].length; x ++) {
			switch(map[y][x]) {
				case 'M':
					context.drawImage(wallSprite, x*32, y*32);
					break;
				case ' ':
					context.drawImage(floorSprite, x*32, y*32);
					break;
				case 'S':
					context.drawImage(doorSprite, x*32, y*32);
					break;
			}
		}
	}
}

