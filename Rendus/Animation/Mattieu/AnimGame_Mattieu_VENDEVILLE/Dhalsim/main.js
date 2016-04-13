document.body.onload = LoadGame;

function LoadGame(){
	//création de la balise canvas
	window.canvas 	= document.createElement("canvas"),
	window.context = canvas.getContext("2d");
	canvas.width = 1900;
	canvas.height = 720;
    window.direction = '';
    window.fondx = 0;
    window.fondy = 0;
	window.x = 100;
	window.y = 200;
	window.xx = 1500;
	window.yy = 250;
	window.mouvement = false;
	//ajout de la balise au body
	document.body.appendChild(canvas);
	LoadImages();

	window.document.onkeydown = function(e){
		if(e.keyCode == 38){
			direction = 'haut';
			mouvement = false;
		}
		
		if(e.keyCode == 37){
			direction = 'gauche';
			mouvement = false;
		}
		
		if(e.keyCode == 39){
			direction = 'droite';
			mouvement = false;
		}
		 
		 if(e.keyCode == 40){
			direction ='bas';
			mouvement = false;
		}
	};
	
	var Phoenix = {
		//L'étape d'animation en entier
		IdleAnimationStep : 0,
		//en float
		IdleAnimationStepFloat : 0,
		
		//les variables de l'animation
		// Steps : [
		// [89,904,49,83],
		// [101,764,39,83],
		// [11,1329,43,83],
		// ],

		// Steps : [
		// [150,278,150,150],
		// [300,271,150,150],
		// [0,281,150,150],
		// ],
		
		Steps : [
		[300,180,100,100],
		[100,190,100,100],
		[190,180,100,100],
		],


		Draw : function(){
			context.drawImage(charSheet,this.Steps[this.IdleAnimationStep][0],
			this.Steps[this.IdleAnimationStep][1],this.Steps[this.IdleAnimationStep][2],
			this.Steps[this.IdleAnimationStep][3],x,y,15*8,15*8);
		},
		
		Animate : function(){
			if (x <= 1700) {
				x += 2;
				fondx -= 5;
			this.IdleAnimationStepFloat += 0.1;
			} else if (x == 1705) {
				document.getElementById('gg').innerHTML = "VOUS AVEZ GAGNÉ<br />";
				mouvement = true;
			this.IdleAnimationStepFloat += 0;
			}
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			if(this.IdleAnimationStep == 3){
				this.IdleAnimationStepFloat = 0;
				this.IdleAnimationStep = 2;
			}
		}
	};

	var Plane = {
		//L'étape d'animation en entier
		IdleAnimationStep : 0,
		//en float
		IdleAnimationStepFloat : 0,
		
		//les variables de l'animation
		// Steps : [
		// [89,904,49,83],
		// [101,764,39,83],
		// [11,1329,43,83],
		// ],

		// Steps : [
		// [150,278,150,150],
		// [300,271,150,150],
		// [0,281,150,150],
		// ],
		
		Steps : [
		[0,0,600,750],
		[0,0,600,750],
		[0,0,600,750],
		],


		Draw : function(){
			context.drawImage(plane,this.Steps[this.IdleAnimationStep][0],
			this.Steps[this.IdleAnimationStep][1],this.Steps[this.IdleAnimationStep][2],
			this.Steps[this.IdleAnimationStep][3],xx,yy,25*8,40*8);
		},
		
		Animate : function(){
			if (xx >= 0) {
				xx -= 2;
				this.IdleAnimationStepFloat += 1;
			}		
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			if(this.IdleAnimationStep == 3){
				this.IdleAnimationStepFloat = 0;
				this.IdleAnimationStep = 2;
			}
		}
	};
	
	//les objets à dessiner
	window.drawables = [
	//background
	{
		Draw : function(){
			context.drawImage(imgFond,fondx,fondy,7500,720);
		}
	}
	,Phoenix, Plane];
	
	//Les objets à animation
	window.animables = [
	Phoenix, Plane
	];
	
		//Lancement Initial du jeu
		requestAnimationFrame(GameLoop);
}

function LoadImages(){
	//import image de fond
	window.imgFond = new Image();
	imgFond.src = 'scene.jpg';
	
	window.charSheet = new Image();
	charSheet.src = 'phoenix.png';

	window.plane = new Image();
	plane.src = 'plane.png';
}

function GameLoop(){
	Animate();
	Draw();
	Move(direction);

	if (x == xx) {
		console.log('REKT');
		IdleAnimationStepFloat += 0;
	}

	//boucle de la GameLoop
	requestAnimationFrame(GameLoop);
}

function Animate(){
	for(var i = 0; i < animables.length; i++){
		animables[i].Animate();
	}
}

function Draw(){
	context.clearRect(0,0,canvas.width,canvas.height);
	for(var i = 0; i < drawables.length; i++){
		drawables[i].Draw();
	}
}

function Move(input){
	if(input != '')
	{
		switch(input)
		{
			case'haut': 
			{
			if(mouvement == false && y >= 15){
					y = y - 15;
					mouvement = true;
			}
			
				break;
			}

			case'bas': 
			{
			if(mouvement == false && y <= 580){
					y = y + 15;
					mouvement = true;
			}
			
				break;
			}

			case'gauche': 
			{
			if(mouvement == false){
					xx = xx - 15;
					mouvement = true;
			}
			
				break;
			}	
			case'droite':
			{
				if(mouvement == false && x <= 1700){
					xx = xx + 15;
					mouvement = true;
				}				
			 
				break;
			}	
		}
	}

}