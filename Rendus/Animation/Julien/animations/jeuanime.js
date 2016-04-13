var posxImageFond = 0;
var posyImageFond = -1200;
var largImageFond = 1280;
var hautImageFond = 1920;

var posxPerso1 = 740;
var posyPerso1 = 252+5;
var largPerso1 = 610/1.5;
var hautPerso1 = 705/1.5;

var posxPerso2 = 240;
var posyPerso2 = 172+5;
var largPerso2 = 105*4;
var hautPerso2 = 137*4;

var anim1On = false,
	anim2On = false,
	anim3On = false,
	anim4On = false;

var etapeAnim1	= 0; // variables pour animation perso (Animation1)
var vitesseMouv	= 50;
var tempsEtapeAnim1 = [
	100,	// descente
	300,	// immobile
	100,	// montée
	300		// immobile
];

var etapeAnim2	= 0; // variable animation caméra (Animation2)
var tempsEtapeAnim2 = [
	sommeTab(tempsEtapeAnim1)+tempsEtapeAnim1[0]+100, // temps avant lancement d'anim
	8500	// durée de la montée
]

var etapeAnim3	= 0; // variable fondu (Animation3)
var tempsEtapeAnim3 = [
	sommeTab(tempsEtapeAnim2)-2000, // temps avant lancement d'anim
	4000	// durée du fondu
]
var oppaciteFondu	= 1;

var vitesse 	= 50;
//var dateDebut   = Date.now();
//var tempSession = 0

function sommeTab(tableau)
{
	for	(var i = 0, value=0; i<tableau.length; i++) value += tableau[i];
	return(value);
}

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
	imgFond.src = 'fond1.png';
	//import image Perso 1 et 2
	window.perso1 = new Image();
	perso1.src = 'perso1.png';
	window.perso2 = new Image();
	perso2.src = 'perso2.png';
	
}

function GameLoop(){
	AppelAnimation();
	DrawIntro();
	Animate();
	Draw();

	//boucle de la GameLoop
	requestAnimationFrame(GameLoop);
}

window.setTimeout(function(){anim1On=true;},0);
window.setTimeout(function(){anim2On=true;},tempsEtapeAnim2[0]);
window.setTimeout(function(){anim3On=true;},tempsEtapeAnim3[0]);
window.setTimeout(function(){anim4On=true;},sommeTab(tempsEtapeAnim3));

window.setTimeout(function(){anim1On=false;},sommeTab(tempsEtapeAnim1)+tempsEtapeAnim1[0]);
window.setTimeout(function(){anim2On=false;},tempsEtapeAnim2[1]);
window.setTimeout(function(){anim3On=false;},tempsEtapeAnim3[1]);

window.setTimeout(function(){etapeAnim1=1;},tempsEtapeAnim1[0]);
window.setTimeout(function(){etapeAnim1=2;},tempsEtapeAnim1[0]+tempsEtapeAnim1[1]);
window.setTimeout(function(){etapeAnim1=1;},tempsEtapeAnim1[0]+tempsEtapeAnim1[1]+tempsEtapeAnim1[2]);
window.setTimeout(function(){etapeAnim1=0;},tempsEtapeAnim1[0]+tempsEtapeAnim1[1]+tempsEtapeAnim1[2]+tempsEtapeAnim1[3]);

function AppelAnimation(){
	if (anim1On)	Animation1();
	if (anim2On)	Animation2();
	if (anim3On)	Animation3();
}

function Animation1(){
	switch (etapeAnim1)
	{
		case 0: // descente des perso
			posyPerso1+=vitesseMouv/10;
			posyPerso2+=vitesseMouv/10;
		break;
		
		case 1: // perso immobiles
		break;
		
		case 2: // monté des perso
			posyPerso1-=vitesseMouv/10;
			posyPerso2-=vitesseMouv/10;
		break;
	}
}
function Animation2(){
	posyImageFond+=3;
	posyPerso1+=5;
	posyPerso2+=5;
}
function Animation3(){
	oppaciteFondu-=1/150;
	if (oppaciteFondu<0) oppaciteFondu=0;
}
function AfficheTitre(){
		context.globalAlpha=1;
		context.font="60px Georgia";
		context.fillStyle="#FF0033";
		context.fillText("Le Jeu !",canvas.width/2-150,200);

		context.font="40px Georgia";
		context.fillStyle="#FF3365";
		context.fillText("Bonne chance...",canvas.width/2-160,300);
		if (anim4On)
		{
			LoadGame();
		}
}

function DrawIntro(){
	context.fillStyle="#010101";
	context.globalAlpha=1;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.globalAlpha=oppaciteFondu;
	context.drawImage(imgFond,posxImageFond,posyImageFond,largImageFond,hautImageFond);
	context.drawImage(perso1,posxPerso1,posyPerso1,largPerso1,hautPerso1);
	context.drawImage(perso2,posxPerso2,posyPerso2,largPerso2,hautPerso2);
	if (anim4On)
	{
		AfficheTitre();
	}
}
