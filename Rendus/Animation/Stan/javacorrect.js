var tempsEtapeAnim1 = [
		670,
		670,
		770,
		630,
		670,

		630,
		370,
		830,
		800,
		500,

		400,
		1000,
		2000
];
var tempsEtapeAnim2 = [
		1000,
		1000,
		1000,
		1000		
]
var image_sprite2 = "ombre1";
var image_sprite = "";
var image_sprite3 = "herorealr";
var image_allie = "allie";
var image_boss = "squellete";
var image_sort = "sort";
var image_move = "droite1";
var etapeanim1 = 0;
var etapeanim2 = 0;
var fonduact= false;
var	fonduact2=false;
var compteuranim1 = 0;
	var oppaciteFondu = 0;
	var canvas 	= document.createElement("canvas");
	context = canvas.getContext("2d");
 	canvas.width = 1200;
	canvas.height = 600;
document.body.appendChild(canvas);
var images={};
function loadImage(name){
	images[name]= new Image();
	images[name].src = "images/" + name +".png";
}
var tabimage = ["squellete","squellete2","squellete3","allie","alliedead","alliesoin","alliefla","ulti1","heroattackultima2","heroattackspecial32","herorealspecial","lamespe","herosort","herosort2","sort","flammara1","flammara2","heroheal","heroflammara","heroflammara2","ombre2","herogameover","haut1","droite1","gauche1","bas1","heroattack3","heroattacksimple2","heroattacksimple","gb_intro0","gb_intro1","gb_intro2","gb_intro3","gb_intro4","gb_intro5","gb_intro6","gb_intro7","hero","woods","exit","nightf","boss2","herorealr","marche2","ombre1","arbre2","Hallow_Boss","monstre2"]
for (var i = 0; i < tabimage.length; i++) {
	loadImage(tabimage[i]);
};

	var map = [
	["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","S","M"],
	["M","P","_","M","_","M","_","_","M","_","M","_","_","_","M","_","_","M","_","M","M","_","M"],
	["M","_","_","M","_","M","_","_","M","_","M","C","_","_","_","_","_","_","_","M","_","_","M"],
	["M","_","_","_","_","M","_","_","M","_","_","_","M","M","M","M","_","_","_","M","_","B","M"],
	["M","_","_","_","C","_","_","_","M","_","M","_","_","M","M","_","_","_","_","_","M","_","M"],
	["M","M","_","M","_","M","_","C","_","_","M","_","_","_","M","_","_","_","C","_","M","_","M"],
	["M","_","_","M","_","M","_","_","_","M","_","M","_","_","C","_","_","_","_","_","M","_","M"],
	["M","_","_","M","_","M","_","_","M","M","_","C","_","_","_","M","_","_","M","M","_","_","M"],
	["M","_","M","M","_","M","_","M","M","M","_","M","_","M","M","_","_","_","_","_","C","_","M"],
	["M","_","M","M","_","_","_","_","M","_","_","M","_","_","M","C","M","M","_","M","_","_","M"],
	["M","C","_","_","_","M","_","_","_","_","_","M","_","_","_","_","_","_","M","_","_","_","M"],
	["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"]
	];

var element_large = 48;
var element_hauteur = 48;


var Sortie = false;
var Perdu = false;
var direction = "";

var pos_x = 1;
var pos_y = 1;
var position_defence = false;
var mode_boost = false;
var phase = "intro";

var monstre ={
	nom : "ombre",
	vie : 189,
	attaque : 16,
	vie_max : 189
}
var boss ={
	nom : "squepyrus",
	vie : 534,
	mana: 120,
	attaque : 38,
	vie_max : 534,
}
var hero ={
	nom : "hero",
	vie : 216,
	mana : 152,
	mana_max : 152,
	attaque : 22,
	vie_max : 216,
	charge : 3
}
var allie ={
	nom : "Eleniak",
	vie : 120,
	mana : 200,
	mana_max : 200,
	attaque : 14,
	vie_max : 120
}

setInterval(GameLoop,1000/60);
	
document.onkeydown = function(e) {
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

function Drawmonster(){
	context.drawImage(images[image_sprite2],700,404);
	context.save();
	context.globalAlpha=oppaciteFondu;
	context.restore();
}

function Drawintro(){
	context.drawImage(images[image_sprite],0,0,1000,550);
	context.fillStyle="#ffffff";
	context.save();
	context.globalAlpha=oppaciteFondu;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.restore();
	if (etapeanim1==12) {
	AfficheTitre();
};
}

	

	window.setTimeout(function(){etapeanim1=0;},tempsEtapeAnim1[0]);
	window.setTimeout(function(){etapeanim1=1;},tempsEtapeAnim1[1]+tempsEtapeAnim1[0]);
	window.setTimeout(function(){etapeanim1=2;},tempsEtapeAnim1[2]+tempsEtapeAnim1[1]+tempsEtapeAnim1[0]);
	window.setTimeout(function(){etapeanim1=3;},tempsEtapeAnim1[3]+tempsEtapeAnim1[2]+tempsEtapeAnim1[1]+tempsEtapeAnim1[0]);
	window.setTimeout(function(){etapeanim1=4;},tempsEtapeAnim1[4]+tempsEtapeAnim1[3]+tempsEtapeAnim1[2]+tempsEtapeAnim1[1]+tempsEtapeAnim1[0]);
	window.setTimeout(function(){etapeanim1=5;},tempsEtapeAnim1[5]+tempsEtapeAnim1[4]+tempsEtapeAnim1[3]+tempsEtapeAnim1[2]+tempsEtapeAnim1[1]+tempsEtapeAnim1[0]);
	window.setTimeout(function(){etapeanim1=6;},tempsEtapeAnim1[6]+tempsEtapeAnim1[5]+tempsEtapeAnim1[4]+tempsEtapeAnim1[3]+tempsEtapeAnim1[2]+tempsEtapeAnim1[1]+tempsEtapeAnim1[0]);
	window.setTimeout(function(){etapeanim1=7;},tempsEtapeAnim1[7]+tempsEtapeAnim1[6]+tempsEtapeAnim1[5]+tempsEtapeAnim1[4]+tempsEtapeAnim1[3]+tempsEtapeAnim1[2]+tempsEtapeAnim1[1]+tempsEtapeAnim1[0]);
	window.setTimeout(function(){etapeanim1=8;},tempsEtapeAnim1[8]+tempsEtapeAnim1[7]+tempsEtapeAnim1[6]+tempsEtapeAnim1[5]+tempsEtapeAnim1[4]+tempsEtapeAnim1[3]+tempsEtapeAnim1[2]+tempsEtapeAnim1[1]+tempsEtapeAnim1[0]);
	window.setTimeout(function(){etapeanim1=9;},tempsEtapeAnim1[9]+tempsEtapeAnim1[8]+tempsEtapeAnim1[7]+tempsEtapeAnim1[6]+tempsEtapeAnim1[5]+tempsEtapeAnim1[4]+tempsEtapeAnim1[3]+tempsEtapeAnim1[2]+tempsEtapeAnim1[1]+tempsEtapeAnim1[0]);
	window.setTimeout(function(){etapeanim1=10;},tempsEtapeAnim1[10]+tempsEtapeAnim1[9]+tempsEtapeAnim1[8]+tempsEtapeAnim1[7]+tempsEtapeAnim1[6]+tempsEtapeAnim1[5]+tempsEtapeAnim1[4]+tempsEtapeAnim1[3]+tempsEtapeAnim1[2]+tempsEtapeAnim1[1]+tempsEtapeAnim1[0]);
	window.setTimeout(function(){etapeanim1=11,fonduact = true;},tempsEtapeAnim1[11]+tempsEtapeAnim1[10]+tempsEtapeAnim1[9]+tempsEtapeAnim1[8]+tempsEtapeAnim1[7]+tempsEtapeAnim1[6]+tempsEtapeAnim1[5]+tempsEtapeAnim1[4]+tempsEtapeAnim1[3]+tempsEtapeAnim1[2]+tempsEtapeAnim1[1]+tempsEtapeAnim1[0]);
	window.setTimeout(function(){etapeanim1=12;},tempsEtapeAnim1[12]+tempsEtapeAnim1[11]+tempsEtapeAnim1[10]+tempsEtapeAnim1[9]+tempsEtapeAnim1[8]+tempsEtapeAnim1[7]+tempsEtapeAnim1[6]+tempsEtapeAnim1[5]+tempsEtapeAnim1[4]+tempsEtapeAnim1[3]+tempsEtapeAnim1[2]+tempsEtapeAnim1[1]+tempsEtapeAnim1[0]);

function Animation(){
	context.globalAlpha=1;
	switch(etapeanim1)
	{

		case 0:
		image_sprite="gb_intro0"
		break;
		case 1:
		image_sprite="gb_intro1"
		break;
		case 2:
		image_sprite="gb_intro1"
		break;
		case 3:
		image_sprite="gb_intro2"
		break;
		case 4:
		image_sprite="gb_intro3"
		break;
		case 5:
		image_sprite="gb_intro4"
		break;
		case 6:
		image_sprite="gb_intro5"
		break;
		case 7:
		image_sprite="gb_intro6"
		break;
		case 8:
		image_sprite="gb_intro1"
		break;
		case 9:
		image_sprite="gb_intro0"
		break;
		case 10:
		image_sprite="gb_intro6"
		break;
		case 11:
		image_sprite="gb_intro7"
		appel()
		break;
		case 12:
		phase ="Start";
		break;


	}
};

function appel(){
	if (fonduact)	Animation2();
};

function Animation2(){
	oppaciteFondu+=1/80;
	if (oppaciteFondu<0) oppaciteFondu=0;
};

function Animation3(){
	context.globalAlpha=1;

		image_sprite2="ombre2";
		window.setTimeout(function(){image_sprite2="ombre1";},1000);
	};
function Animation4(){
	context.globalAlpha=1;

		image_boss="squellete2";
		window.setTimeout(function(){image_boss="squellete";},1000);
	};

function Animationboss(){
	context.globalAlpha=1;

		image_boss="squellete3";
		window.setTimeout(function(){image_boss="squellete";},1000);
	};
	function Animationfla(){
	context.globalAlpha=1;

		image_sprite2="flammara1";
		window.setTimeout(function(){image_sprite2="ombre1";},1000);
	};
		function Animationfla2(){
	context.globalAlpha=1;

		image_boss="flammara1";
		window.setTimeout(function(){image_boss="squellete";},1000);
	};

	function Animationmofla(){
	context.globalAlpha=1;

		image_sprite3="heroflammara";
		window.setTimeout(function(){image_sprite3="heroflammara2";},1000);
	};

	function Animationmoflaallie(){
	context.globalAlpha=1;

		image_allie="alliefla";
		window.setTimeout(function(){image_allie="allie";},1000);
	};

	function Animationulti(){
	context.globalAlpha=1;

		image_sprite3="heroattackspecial32";
		window.setTimeout(function(){image_sprite3="heroattackultima2";},1000);
	};

	function Animationulti2(){
	context.globalAlpha=1;

		image_sprite2="ombre2";
		window.setTimeout(function(){image_sprite2="ulti1";},1000);
	};
		function Animationulti3(){
	context.globalAlpha=1;

		image_boss="squellete2";
		window.setTimeout(function(){image_boss="ulti1";},1000);
	};


	function Animationsort(){
	context.globalAlpha=1;

		image_sort="lamespe";
		window.setTimeout(function(){image_sort="sort";},1000);
	};

	function Animationboost(){
	context.globalAlpha=1;

		image_sprite3="herorealspecial";
		window.setTimeout(function(){image_sprite3="herorealr";},1000);
	};

	function Animationsort2(){
	context.globalAlpha=1;

		image_sprite3="herosort2";
		window.setTimeout(function(){image_sprite3="herorealr";},1000);
	};

	function Animationattack(){
	context.globalAlpha=1;

		image_sprite3="heroattacksimple2";
		window.setTimeout(function(){image_sprite3="herorealr";},1000);

	};
	function Animationheal(){
	context.globalAlpha=1;

		image_sprite3="heroheal";
		window.setTimeout(function(){image_sprite3="herorealr";},1000);
	};

	function Animationhealallie(){
	context.globalAlpha=1;

		image_allie="alliesoin";
		window.setTimeout(function(){image_allie="allie";},1000);
	};

	function alliedead(){
	context.globalAlpha=1;

		image_allie="alliedead";
		window.setTimeout(function(){image_allie="alliedead";},1000);
	};

function AfficheTitre(){
		context.globalAlpha=1;
		context.font="40px Georgia";
		context.fillStyle="#333333";
		context.fillText("GPR",canvas.width/2-150,200);

		context.font="30px ";
		context.fillStyle="#2B2F33";
		context.fillText("utilise les touche pour commencé",canvas.width/2-400,300);
}
function GameLoop(){
	if (Sortie==false && Perdu==false) {
		switch(phase) {
		case "intro":
			Animation();
			Drawintro();
		break
		case "Start":
			Start(direction);
		break
		case "Map":
			MovePlayer(direction);
			DrawMap();
		break;
		case "Combat":
		Combat(monstre);
		break;
		case "gestionsort":
		gestionsort(direction);
		break;
		case "gestionsorte":
		gestionsorte(direction);
		break;
		case "Final":
		Final(boss)
		break;
		case "Sortie":
		victoire(direction)
		break;
		}
	direction = 'neutre';
	}
		else if (Sortie==true) {
		victoire();
		console.log("Vous vous étes échapper de la forét félicitation");
	}
	else if (Perdu==true) {
		gameover();
		console.log("AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!AH!!!");
	};
}
function Start(){
	console.log("utiliser les touche pour avancé");
	if (direction=="haut" || direction=="bas" || direction=="gauche" || direction=="droite") {
		phase = "Map";
	}
};
function victoire(){
	console.log("vous étes sortie du donjon félicitation !!!")
}
function gameover(){
	console.log("dommage vous avais perdu réfléchie la page pour recommencé le jeu bonne chance xD")
}
function sommeTab(tableau){
	for	(var i = 0, value=0; i<tableau.length; i++) value += tableau[i];
	return(value);
}

function MovePlayer(input){
	if (input != '') {
		map[pos_y][pos_x] = "_";
		switch(input)
		{
			case "haut":
			image_move="haut1";
			if (map[pos_y-1][pos_x]=='C') {
				phase="Combat";
				pos_y = pos_y-1;
			}else if (map[pos_y-1][pos_x]=='B') {
				phase="Final";
				pos_y = pos_y-1;
			}else if (map[pos_y-1][pos_x]=='S') {
				phase="Sortie";
				pos_y = pos_y-1;
				console.log("un monstre apparait")	
			}else if (map[pos_y-1][pos_x]!='M') {
				pos_y = pos_y-1;
			}
			break;
			case "bas":
			image_move="bas1";
			if (map[pos_y+1][pos_x]=='C') {
				phase="Combat";
				pos_y = pos_y+1;;
				console.log("un monstre apparait")	
			}else if (map[pos_y+1][pos_x]!='M') {
				pos_y = pos_y+1;		
			}
			break;
			case "gauche":
			image_move="gauche1";
			if (map[pos_y][pos_x-1]=='C') {
				phase="Combat";
				pos_x = pos_x-1;
				console.log("un monstre apparait")	
			}else if (map[pos_y][pos_x-1]!='M') {
				pos_x = pos_x-1;		
			}
			break;
			case "droite":
			image_move="droite1";
			if (map[pos_y][pos_x+1]=='C') {
				phase="Combat";
				pos_x = pos_x+1;
				console.log("un monstre apparait")		
			}else if (map[pos_y][pos_x+1]!='M') {
				pos_x = pos_x+1;
			}
			break;
		}
		map[pos_y][pos_x] = "P"; 
	}
}
function monstre_tour(){
	var attaque_monstre = Math.round(Math.random()*5)+1;
	if  (attaque_monstre <= 4){
		attaque(monstre,hero) ;
	}else if  (attaque_monstre <= 6){
		attaque(monstre,allie) ;
	}
}
function allie_tour(){
	var attaque_allie = Math.round(Math.random()*5)+1;
	if (allie.vie <= 0) {
		alliedead();
		console.log("l'allié et ko");
	}else if  (attaque_allie <= 2){
		attaque(allie,monstre) ;
	}else if (attaque_allie <= 3) {
		Animationhealallie();
		soin(allie);
	}else if (attaque_allie <= 6) {
		Animationmoflaallie();
		Animationfla();
		flammara(allie,monstre) ;
	}
};
function allie_tour2(){
	var attaque_allie = Math.round(Math.random()*5)+1;
	if (allie.vie <= 0) {
		alliedead();
		console.log("l'allié et ko");
	}else if  (attaque_allie <= 2){
		attaque(allie,boss) ;
	}else if (attaque_allie <= 5) {
		Animationhealallie();
		soin(allie);
	}else if (attaque_allie <= 6) {
		Animationmoflaallie();
		Animationfla2();
		flammara(allie,boss) ;
	}
};
function boss_tour(){
	var attaque_boss = Math.round(Math.random()*5)+1;
	if  (attaque_boss <= 3){
		attaque(boss,hero) ;
	}else if  (attaque_boss <= 4){
		attaque(boss,allie) ;
	}else if (attaque_boss <= 5) {
		Animationboss();
		force_de_terra(boss,allie);
	}else if (attaque_boss <= 6) {
		Animationboss();
		force_de_terra(boss,hero);
	}
};

function Combat (action,nomdusortilege) {
	context.drawImage(images["woods"],0,0,1100,550);
	context.drawImage(images[image_sprite3],300,404);
	context.drawImage(images[image_sprite2],700,404);
	context.drawImage(images[image_allie],180,374);
	context.drawImage(images[image_sort],500,404);
	context.fillStyle = "#57588C";
	context.fillRect(0,0,342,150);
	context.font = "30px Arial";
	context.fillStyle = 'white';
	context.fillText("haut : attaque",10,30);
	context.fillText("droite : sort",10,65);
	context.fillText("bas : soin",10,95);
	context.fillText("gauche : boost (limite:1)",10,125);
	context.fillStyle = 'red';
	context.fillText("pv: "+monstre.vie+"/"+monstre.vie_max,700,350);
	context.fillText("pv: "+hero.vie+"/"+hero.vie_max,300,350);
	context.fillText("pv: "+allie.vie+"/"+allie.vie_max,180,290);
	context.fillStyle = 'blue';
	context.fillText("mp: "+hero.mana+"/"+hero.mana_max,300,375);
	context.fillText("mp: "+allie.mana+"/"+allie.mana_max,180,315);

	resultat ="";
	console.log("une "+monstre.nom+" apparait utilise haut pour attaquer, gauche pour boost, droite pour lancer un sort ou bas pour se heal ! !");
	if (direction=="haut") {
		attaque(hero,monstre);
		Animationattack();
		Animation3();
		console.log(" ");
		allie_tour();
		console.log(" ");
		monstre_tour();
	}else if (direction=="bas") {
		soin(hero);
		Animationheal();
		console.log(" ");
		allie_tour();
		console.log(" ");
		monstre_tour();
	}else if (direction=="gauche") {
		boost(hero);
		Animationboost();
		console.log(" ");
		allie_tour();
		console.log(" ");
		monstre_tour();
	}else if (direction=="droite") {
		context.fillStyle = "#57588C";
		context.fillRect(0,0,480,150);
		context.font = "30px Arial";
		context.fillStyle = 'white';
		context.fillText("haut : flammara",10,30);
		context.fillText("droite : retour",10,65);
		context.fillText("bas : slashthra",10,95);
		context.fillText("gauche :crashsmash (boost requie)",10,125);
		phase = "gestionsort" ;
	}
	if (monstre.vie <=0) {
		console.log("le monstre et vaincu !!!");
		phase="Map";
		monstre.vie=189;
	};
	if (hero.vie <=0) {
		context.drawImage(images["herogameover"],300,404)
		Perdu = true;
	};

}
function gestionsort (action){
	console.log("choisie un sort flammara 'haut' slashthra 'bas' crashsmash 'gauche' et revenir en phase combat 'droite'.")
	if (action=="haut") {
		flammara(hero,monstre);
		Animationmofla();
		Animationfla();
		console.log(" ");
		allie_tour();
		console.log(" ");
		monstre_tour();
		phase = "Combat";
	}else if (action=="bas") {
		slashthra(hero,monstre);
		Animationsort();
		Animationsort2();
		Animation3();
		console.log(" ");
		allie_tour();
		console.log(" ");
		monstre_tour();
		phase = "Combat";
	}else if (action=="gauche") {
		crashsmash(hero,monstre);
		Animationulti();
		Animationulti2();
		console.log(" ");
		allie_tour();
		console.log(" ");
		monstre_tour();
		phase = "Combat";
	}else if (action=="droite") {
		phase = "Combat";
	}
}
function Final(boss) {
	context.drawImage(images["woods"],0,0,1100,575);
	context.drawImage(images[image_sprite3],300,434);
	context.drawImage(images[image_allie],300,334);
	context.drawImage(images[image_boss],700,404);
	context.drawImage(images[image_sort],500,404);
	context.fillStyle = "#57588C";
	context.fillRect(0,0,342,150);
	context.font = "30px Arial";
	context.fillStyle = 'white';
	context.fillText("haut : attaque",10,30);
	context.fillText("droite : sort",10,65);
	context.fillText("bas : soin",10,95);
	context.fillText("gauche : boost (limite:1)",10,125);
	context.fillStyle = 'red';
	context.fillText(boss.vie+"/"+boss.vie_max,700,350);
	context.fillText(hero.vie+"/"+hero.vie_max,180,474);
	context.fillText(allie.vie+"/"+allie.vie_max,180,355);
	context.fillStyle = 'blue';
	context.fillText(hero.mana+"/"+hero.mana_max,180,515);
	context.fillText(allie.mana+"/"+allie.mana_max,180,385);
	resultat ="";
	console.log("le monstre special "+boss.nom+" apparait utilise haut pour attaquer, gauche pour boost, droite pour lancer un sort ou bas pour se heal !");
	if (direction=="haut") {
		attaque(hero,boss);
		Animationattack();
		Animation4();
		console.log(" ");
		allie_tour2();
		console.log(" ");
		boss_tour();
	}else if (direction=="bas") {
		soin(hero);
		Animationheal();
		console.log(" ");
		allie_tour2();
		console.log(" ");
		boss_tour();
	}else if (direction=="gauche") {
		boost(hero);
		Animationboost();
		console.log(" ");
		allie_tour2();
		console.log(" ");
		boss_tour();
	}else if (direction=="droite") {
		phase = "gestionsorte" ;
		context.fillStyle = "#57588C";
		context.fillRect(0,0,480,150);
		context.font = "30px Arial";
		context.fillStyle = 'white';
		context.fillText("haut : flammara",10,30);
		context.fillText("droite : retour",10,65);
		context.fillText("bas : slashthra",10,95);
		context.fillText("gauche :crashsmash (boost requie)",10,125);
	}
	if (boss.vie <=0) {
		console.log("le boss et vaincu GONGRATULATION !!!");
		phase="Map";
		boss.vie=300;
	};
	if (hero.vie <=0) {
		context.drawImage(images["herogameover"],300,404)
		Perdu = true;
	};
}

function gestionsorte (action){
	console.log("choisie un sort flammara 'haut' slashthra 'bas' crashsmash 'gauche' et revenir en phase combat 'droite'.")
	if (action=="haut") {
		flammara(hero,boss);
		Animationmofla();
		Animationfla2();
		console.log(" ");
		allie_tour2();
		console.log(" ");
		boss_tour();
		phase = "Final";
	}else if (action=="bas") {
		slashthra(hero,boss);
		Animationsort();
		Animationsort2();
		Animation4();
		console.log(" ");
		allie_tour2();
		console.log(" ");
		boss_tour();
		phase = "Final";
	}else if (action=="gauche") {
		crashsmash(hero,boss);
		Animationulti();
		Animationulti3();
		console.log(" ");
		allie_tour2();
		console.log(" ");
		boss_tour();
		phase = "Final";
	}else if (action=="droite") {
		phase = "Final";
	}
}
function analyseCase(cible){
	positionCible(cible);
	var Analyse=[];
	Analyse.push(Map[(coordonee.y)-1][coordonee.x]);
	Analyse.push(Map[coordonee.y][(coordonee.x)+1]);
	Analyse.push(Map[(coordonee.y)+1][coordonee.x]);
	Analyse.push(Map[coordonee.y][(coordonee.x)-1]);
	//Analyse =[haut,droite,bas,gauche]
	return Analyse;
}
function attaque(attaquant,cible){
	var chance = Math.round(Math.random()*5)+1;
	if (position_defence == false) {
		if  (chance <= 5){
		cible.vie -= attaquant.attaque;
		console.log(attaquant.nom+" attaque inflige "+attaquant.attaque+" point de degats a "+cible.nom+" pv restant "+cible.vie+" pv.")
	}else if (chance <= 6) {
		cible.vie -= (attaquant.attaque)*1.5;
		console.log(attaquant.nom+" inflige un coup puissant "+cible.nom+" perds "+(attaquant.attaque)*1.5+" point de degats pv restant "+cible.vie+" pv.")
	}
};
	position_defence = false;
}
function flammara(lanceur,cible){
	var valeur = Math.round(Math.random()*30)+35;
	var cout = 9;
		if (lanceur.mana < cout) {
			console.log("tu n'a pas asser de mana");
		}else {
		lanceur.mana -= cout;
		cible.vie -= valeur;
		console.log(lanceur.nom+" lance le sort 'flammara' inflige "+valeur+" point de degats a "+cible.nom+" pv restant "+cible.vie+" pv.")
		}
}
function slashthra(lanceur,cible){
	var valeur = Math.round(Math.random()*30)+60;
	var cout = 18;
		if (lanceur.mana < cout) {
			console.log("tu n'a pas asser de mana");
		}else {
		lanceur.mana -= cout;
		cible.vie -= valeur;
		console.log(lanceur.nom+" invoque le tonnerre sur sont épée inflige "+valeur+" point de degats a "+cible.nom+" pv restant "+cible.vie+" pv.");
		}
}

function crashsmash(lanceur,cible){
	var valeur = Math.round(Math.random()*50)+100;
	var cout = 2;
		if (lanceur.charge < cout) {
			console.log("tu n'a plus de charge");
		}else if (mode_boost == false) {
			console.log("tu n'est pas en mode_boost")
		}else{
		lanceur.charge -= cout;
		cible.vie -= valeur;
		console.log(lanceur.nom+" frappe de toute c'est force inflige "+valeur+" point de degats a "+cible.nom+" pv restant "+cible.vie+" pv.");
		}
	mode_boost = false;
}
function force_de_terra(lanceur,cible){
		var valeur = Math.round(Math.random()*25)+38;
		var cout = 1;
		if (lanceur.mana < cout) {
			console.log("tu n'a pas asser de mana");
		}else {
		lanceur.mana -= cout;
		cible.vie -= valeur;
		console.log(lanceur.nom+" explose la terre autour de lui inflige "+valeur+" point de degats a "+cible.nom+" pv restant "+cible.vie+" pv.");
	};
}
function boost(lanceur){
	var cout = 1;
	var upattaque = 14;
	var upvie_max = 84;
	var upvie = 84;
	var upmana = 25;
	var upmana_max = 25;
		if (lanceur.charge < cout) {
			console.log("tu n'a plus de charge");
		}else if(mode_boost == true) {
			console.log("tu et deja en mode_boost")
		}else {
		mode_boost = true;
		lanceur.charge -= cout;
		lanceur.vie += upvie;
		lanceur.vie_max += upvie_max;
		lanceur.attaque += upattaque;
		lanceur.mana += upmana;
		lanceur.mana_max += upmana_max;
		console.log(lanceur.nom+" se concentre gagne en puissance augmente de "+upvie+" point de vie max "+upattaque+" d'attaque de "+upmana+" points de mana.");
		}
};
function soin(lanceur){
	var soins = Math.round(Math.random()*33)+45;
	var cout = 12;
	if (lanceur.mana < cout) {
			console.log("tu n'a pas asser de mana");
	}else if (lanceur.vie + soins < lanceur.vie_max) {
		lanceur.mana -= cout;
		lanceur.vie += soins;
		console.log(lanceur.nom+" se soigne de "+soins+" pv il a "+hero.vie+" point de vie.")
	}else if (lanceur.vie != lanceur.vie_max) {
		lanceur.mana -= cout;
		lanceur.vie = lanceur.vie_max;
		console.log(lanceur.nom+" a recupere tous ces pv");
	}else if (lanceur.vie == lanceur.vie_max) {
		console.log("vous avais tous vos pv.");
	};
}

function DrawMap(){
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
		if (map[i][j]=="M") {
			context.drawImage(images["arbre2"],j*element_large,i*element_hauteur)
		};
		if (map[i][j]=="_") {
			context.drawImage(images["marche2"],j*element_large,i*element_hauteur)
		};
		if (map[i][j]=="P") {
			context.drawImage(images[image_move],j*element_large,i*element_hauteur)
		};
		if (map[i][j]=="C") {
			context.drawImage(images["monstre2"],j*element_large,i*element_hauteur)
		};
		if (map[i][j]=="B") {
			context.drawImage(images["boss2"],j*element_large,i*element_hauteur)
		};
		if (map[i][j]=="S") {
			context.drawImage(images["exit"],j*element_large,i*element_hauteur)
		};
	}
   };

}
