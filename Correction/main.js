var posxImageFond = 0;
var posyImageFond = -1200;
var largImageFond = 1280;
var hautImageFond = 1920;

var posxPerso1 = 740;
var posyPerso1 = 252;
var largPerso1 = 610/1.5;
var hautPerso1 = 705/1.5;

var posxPerso2 = 240;
var posyPerso2 = 172;
var largPerso2 = 105*4;
var hautPerso2 = 137*4;

var vitesse 	= 50;
//var dateDebut   = Date.now();
//var tempSession = 0

document.body.onload = function(){		
	//création de la balise canvas
	window.canvas 	= document.createElement("canvas"),
	window.context = canvas.getContext("2d");
	canvas.width = 1280;
	canvas.height = 720;
	//ajout de la balise au body
	document.body.appendChild(canvas);
	//requestAnimFrame cool mais pas supporté partout
	setInterval(GameLoop,1000/vitesse);
	//import image de fond
	window.imgFond = new Image();
	imgFond.src = 'dojo.jpg';
	//import image Perso 1 et 2
	window.perso1 = new Image();
	perso1.src = 'perso1.png';
	window.perso2 = new Image();
	perso2.src = 'perso2.png';
}

function GameLoop(){
	Animation();
	DrawIntro();
}

function Animation(){
	//if(timeSession==)
	if(posyImageFond<0)
	{
		posyImageFond+=3;
	}
	posyPerso1+=5;
	posyPerso2+=5;
}

function DrawIntro(){
	context.drawImage(imgFond,posxImageFond,posyImageFond,largImageFond,hautImageFond);
	context.drawImage(perso1,posxPerso1,posyPerso1,largPerso1,hautPerso1);
	context.drawImage(perso2,posxPerso2,posyPerso2,largPerso2,hautPerso2);
}