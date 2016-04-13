document.body.onload = LoadGame;
window.document.onkeydown = function(e){
		if(e.keyCode == 38){
			direction = 'haut';
		}
		
		if(e.keyCode == 37){
			direction = 'gauche';
		}
		
		if(e.keyCode == 39){
			direction = 'droite';
		}
		 
		 if(e.keyCode == 40){
			direction ='bas';
		}
	};

function LoadGame(){
	//création de la balise canvas
	window.canvas 	= document.createElement("canvas"),
	window.context = canvas.getContext("2d");
	canvas.width = 1280;
	canvas.height = 720;
	//ajout de la balise au body
	document.body.appendChild(canvas);
	LoadImages();
	
	var Cloud = {
		//L'étape d'animation en entier
		IdleAnimationStep : 0,
		//en float
		IdleAnimationStepFloat : 0,
		//test
		dessinCote : true,
		
		dessinHaut : true,

		animHaut : true,
		//les variables de l'animation
		Steps : [
		[20,204,84,108],
		[110,204,84,108],
		[205,204,84,108],
		[300,204,84,108],
		],
		
		IdleAnimationStephaut : 0,

		IdleAnimationStepFloathaut : 0,

		Stepshaut : [
		[20,304,84,108],
		[100,304,84,108],
		[200,304,84,108],
		[300,304,84,108],
		],
		positionx : - 100,

		positiony : 450,
		Draw : function(){
			if (this.dessinCote == true) {
				context.drawImage(charSheet,this.Steps[this.IdleAnimationStep][0],
				this.Steps[this.IdleAnimationStep][1],this.Steps[this.IdleAnimationStep][2],
				this.Steps[this.IdleAnimationStep][3],this.positionx,this.positiony,25*8,35*8);
			}else if(this.dessinHaut == true){
				context.drawImage(charSheet,this.Stepshaut[this.IdleAnimationStephaut][0],
				this.Stepshaut[this.IdleAnimationStephaut][1],this.Stepshaut[this.IdleAnimationStephaut][2],
				this.Stepshaut[this.IdleAnimationStephaut][3],this.positionx,this.positiony,25*8,35*8);
			}
			
		},
		
		Animate : function(){
			if (this.positionx <= 750) {
				this.positionx += 3.5
			}else if (this.positionx >= 750 && this.positiony >= 350) {
				this.dessinCote = false;
				this.positiony -= 3.5
				console.log(this.positiony);

			} else if (this.positiony >= 348.5) {
				this.IdleAnimationStepFloathaut += 0;
				this.animHaut = false;
			};

			this.IdleAnimationStepFloat += 0.15;
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			if(this.IdleAnimationStep == 4){
				this.IdleAnimationStepFloat = 1;
				this.IdleAnimationStep = 3;
			}
			if (this.animHaut == true){
				this.IdleAnimationStepFloathaut += 0.10;
			}
			this.IdleAnimationStephaut = Math.floor(this.IdleAnimationStepFloathaut);
			if(this.IdleAnimationStephaut == 4){
				this.IdleAnimationStepFloathaut = 1;
				this.IdleAnimationStephaut = 3;
			}
		}
	};
	
	//les objets à dessiner
	window.drawables = [
	//background
	{
		Draw : function(){
			context.drawImage(imgFond,0,0,1280,720);
		}
	}
	,Cloud];
	
	//Les objets à animation
	window.animables = [
	Cloud
	];
	
	//Lancement Initial du jeu
	requestAnimationFrame(GameLoop);
}

function LoadImages(){
	//import image de fond
	window.imgFond = new Image();
	imgFond.src = 'seaearth.gif';
	
	window.charSheet = new Image();
	charSheet.src = 'pnj1.png';
}

function GameLoop(){
	Animate();
	Draw();

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