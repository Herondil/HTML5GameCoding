document.body.onload = LoadGame;

function LoadGame(){
	//création de la balise canvas
	window.canvas 	= document.createElement("canvas"),
	window.context = canvas.getContext("2d");
	canvas.width = 1920;
	canvas.height = 1080;
	//ajout de la balise au body
	document.body.appendChild(canvas);
	LoadImages();
  
	var Dhalsim = {
		//L'étape d'animation en entier
		IdleAnimationStep : 0,
		//en float
		IdleAnimationStepFloat : 0,
		
		//les variables de l'animation
		Steps :[
		[89,904,49,83],
		[101,764,39,83],
		[11,1329,43,83], 
		],



		Draw : function(){
			context.drawImage(charSheet,this.Steps[this.IdleAnimationStep][0],
			this.Steps[this.IdleAnimationStep][1],this.Steps[this.IdleAnimationStep][2],
			this.Steps[this.IdleAnimationStep][3],300,650,35*8,55*8);
		},
		
		Animate : function(){
			this.IdleAnimationStepFloat += 0.01;
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			if(this.IdleAnimationStep == 3){
				this.IdleAnimationStepFloat = 0;
				this.IdleAnimationStep = 2;
			}
		}
	};
	var Ken = {
		//L'étape d'animation en entier
		IdleAnimationStep : 0,
		//en float
		IdleAnimationStepFloat	 : 0,

		Steps:[
		[538,806,30,72],
		[432,807,30,72],
		[467,808,30,72],
		[331,828,34,72],
		[461,882,36,67],
		],

	Draw : function(){
			context.save(); 
			context.scale(-1,1);
			context.drawImage(charSheet,this.Steps[this.IdleAnimationStep][0],
			this.Steps[this.IdleAnimationStep][1],this.Steps[this.IdleAnimationStep][2],
			this.Steps[this.IdleAnimationStep][3],-1900,500,30*8,72*8);
			context.restore();
		},

		
	Animate : function(){
			this.IdleAnimationStepFloat += 0.01;
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			if(this.IdleAnimationStep == 5){
				this.IdleAnimationStepFloat = 0;
				this.IdleAnimationStep = 4;
				var y = window.setInterval(animables.push(Hadoken),1000);
				var x = window.setInterval(drawables.push(Hadoken),1000);
 
			}
					clearInterval(y,x); 

		}
					
	};


	var Hadoken = {
		  posxHadoken : -1700, 
		  posyHadoken : 600,
		  vitesse : 10, 
		//L'étape d'animation en entier
		IdleAnimationStep : 0,
		//en float
		IdleAnimationStepFloat: 0,

		Steps:[
		[117,2793,34,23],
		[150,2794,10,21],
		[97,2797,16,17],
		], 	

			Draw : function(){
			context.scale(-1,1); 
			context.save();
			context.drawImage(charSheet,this.Steps[this.IdleAnimationStep][0],
			this.Steps[this.IdleAnimationStep][1],this.Steps[this.IdleAnimationStep][2],
			this.Steps[this.IdleAnimationStep][3],this.posxHadoken,this.posyHadoken,34*8,23*8);
			context.restore();

		},

		
	Animate : function(){
			this.IdleAnimationStepFloat += 0.01;
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			if(this.IdleAnimationStep == this.Steps.length){
				this.IdleAnimationStepFloat =0;
				this.IdleAnimationStep =1;
			}
			this.posxHadoken += this.vitesse; 
		}
	}; 

	//les objets à dessiner
	window.drawables = [
	//background
	{
		Draw : function(){
			context.drawImage(imgFond,0,0,1920,1280);
		}
	}
	,Dhalsim,Ken];
	
	//Les objets  à animation
	window.animables = [
	Dhalsim,Ken
	];
	
	//Lancement Initial du jeu
	requestAnimationFrame(GameLoop);
}



function LoadImages(){
	//import image de fond
	window.imgFond = new Image();
	imgFond.src = 'img/ssf2-01-ryu.jpg';
	
	window.charSheet = new Image();
	charSheet.src = 'img/chars2.png';

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