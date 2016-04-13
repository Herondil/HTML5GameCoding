document.body.onload = LoadGame;
function LoadGame(){
	window.visibleyImageFond = 290,
		posxRun = 300,
		posyRun = 90,
		visiblexImageFondJeu = 0,
		visibleyImageFondJeu = 290,
		largvisiblexImageFondJeu = 649,
		hautvisiblexImageFondJeu = 200,
		posxImageFondJeu = 0,
		posyImageFondJeu = 0,
		largImageFondJeu = 649,
		hautImageFondJeu = 290;

		window.StadeDeJeu = 'Intro';
	//création de la balise
	window.canvas 	= document.createElement("canvas"),
	window.context = canvas.getContext("2d");
	canvas.width = 649;
	canvas.height = 290;
	//ajout de la balise au body
	document.body.appendChild(canvas);

	// Création d'image utilisable
	window.imgFond = new Image();
	imgFond.src = 'Oasis.jpg';

	window.Run = new Image();
	Run.src = 'RunInverse.png';

	window.imgFondJeu = new Image();
	imgFondJeu.src = 'FondJeu.jpg';

	window.Perso = new Image();
	Perso.src = 'Run.png';

	// Tableau pour choisir les images de course
	window.ImgRun = [27,120,219,324,426,520,613,714];
	window.ImgRunAffiche = 7;

	window.oppaciteFondu = 1;
	window.oppaciteTitre = 0;

	window.AnimRun = 	false;
	window.AnimFond = 	false;
	window.AnimFondu = 	false;
	window.AnimTitre = 	false;

	//requestAnimFrame
	setInterval(GameLoop,1000/60);
	setInterval(ImageRun,100);
	pos_x = 10,
	pos_y = 11, 
	direction = ''
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
		if(e.keyCode == 13){
			direction ='entrer';
		}
};

}
function GameLoop(){
	if (StadeDeJeu == 'Intro' || StadeDeJeu == 'Titre') {
		Animation();
		DrawIntro();		
	}
	else if (StadeDeJeu == 'Jeu') {
		DrawGame();
	};
	direction = '';
}

window.setTimeout(function(){AnimRun=true;},10);
window.setTimeout(function(){AnimFond=true;},600);
window.setTimeout(function(){AnimFondu=true;},3500);
window.setTimeout(function(){AnimTitre=true;},5300);

function ImageRun(){
	if (ImgRunAffiche==0) {
		ImgRunAffiche = 7;
	};
	ImgRunAffiche--;
}

function Animation(){
	if (AnimRun)	posxRun-=2;;
	if (AnimFond)	AnimationFond();
	if (AnimFondu) 	AnimationFondu();
	if (AnimTitre == true && oppaciteTitre < 0.99)	oppaciteTitre+=0.01;
}

function AnimationFond(){
	if (visibleyImageFond == 0) {
		return;
	};
	visibleyImageFond-=1;
	posyRun+=1;
}

function AnimationFondu(){
	oppaciteFondu-=1/150;
	if (oppaciteFondu<0) oppaciteFondu=0;
}

function AfficheTitre(){
		context.globalAlpha=oppaciteTitre;
		context.font="40px Georgia";
		context.fillStyle="#C71585";
		context.fillText("Sex Simulator !",canvas.width/2-133,canvas.height/2-50);

		context.font="20px Georgia";
		context.fillStyle="#C71585";
		context.fillText("Appuyez sur Entrer pour draguer",canvas.width/2-150,canvas.height/2+50);
}

function DrawIntro(){	
	context.fillStyle="#FFFFFF"
	context.globalAlpha=1;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.globalAlpha=oppaciteFondu;

	if (direction != 'entrer' && StadeDeJeu != 'Titre') {
		context.drawImage(imgFond,0,visibleyImageFond,649,200,0,0,canvas.width,canvas.height);
		context.drawImage(Run,ImgRun[ImgRunAffiche],16,80,110,posxRun,posyRun,80*1.5,110*1.5);
	};
	if (direction == 'entrer') {
		if (AnimTitre == false) {
			AnimFondu=true;
			AnimTitre=true;
			StadeDeJeu = 'Titre';
		}
		else if (AnimTitre == true) {
			StadeDeJeu='Jeu';
			canvas.width = 1000;
			canvas.height = 720;
		};
	};
	if (AnimTitre) AfficheTitre();
};

function DrawGame(){
	context.fillStyle="#000000"
	context.globalAlpha=1;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.drawImage(imgFondJeu,visiblexImageFondJeu,0,1000,317,0,0,621*4,240*4);
}
		// visiblexImageFondJeu = 0,
		// visibleyImageFondJeu = 290,
		// largvisiblexImageFondJeu = 649,
		// hautvisiblexImageFondJeu = 200,
		// posxImageFondJeu = 0,
		// posyImageFondJeu = 0,
		// largImageFondJeu = 649,
		// hautImageFondJeu = 290;
