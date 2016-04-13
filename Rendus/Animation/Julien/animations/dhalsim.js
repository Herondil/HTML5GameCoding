document.body.onload = LoadGame;

function LoadGame(){
	//création de la balise canvas
	window.canvas 	= document.createElement("canvas"),
	window.context = canvas.getContext("2d");
	canvas.width = 1280;
	canvas.height = 720;
	//ajout de la balise au body
	document.body.appendChild(canvas);
	LoadImages();
	
	var Dhalsim = {
		//L'étape d'animation en entier
		IdleAnimationStep : 0,
		//en float
		IdleAnimationStepFloat : 0,
		
		//les variables de l'animation
		Steps : [
		[89,904,49,83],
		[101,764,39,83],
		[11,1329,43,83],
		],
		
		Draw : function(){
			context.drawImage(charSheet,this.Steps[this.IdleAnimationStep][0],
			this.Steps[this.IdleAnimationStep][1],this.Steps[this.IdleAnimationStep][2],
			this.Steps[this.IdleAnimationStep][3],150,200,35*8,55*8);
		},
		
		Animate : function(){
			this.IdleAnimationStepFloat += 0.01;
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			console.log(this.IdleAnimationStep);
			if(this.IdleAnimationStep == 3){
				this.IdleAnimationStepFloat = 0;
				this.IdleAnimationStep = 2;
			}
		}
	};
	var Dhalsimfire = {
		// l'étape d'animation en entier
		IdleAnimationStep : 0,
		// en float
		IdleAnimationStepFloat : 0,

		// Les variables de l'animation
		Steps : [
		[1,2764,45,50], 
 		[46,2761,33,40],
		],

		Draw : function(){
			context.scale(-1,1); 
   			context.save();
			context.drawImage(charSheet,this.Steps[this.IdleAnimationStep][0],
			this.Steps[this.IdleAnimationStep][1],this.Steps[this.IdleAnimationStep][2],
			this.Steps[this.IdleAnimationStep][3],400,50,45*8,40*8);
			context.restore();
		},
		Animate : function(){
			this.IdleAnimationStepFloat += 0.01;
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			console.log(this.IdleAnimationStep);
			if(this.IdleAnimationStep == this.Steps.length){
				this.IdleAnimationStepFloat = 0;
				this.IdleAnimationStep = 1;
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
	,Dhalsim, Dhalsimfire];
	
	//Les objets à animation
	window.animables = [
	Dhalsim, Dhalsimfire
	];
	
	//Lancement Initial du jeu
	requestAnimationFrame(GameLoop);
}

function LoadImages(){
	//import image de fond
	window.imgFond = new Image();
	imgFond.src = 'ssf2-01-ryu.jpg';
	
	window.charSheet = new Image();
	charSheet.src = 'chars.png';
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