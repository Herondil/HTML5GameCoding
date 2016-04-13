var canvas = document.createElement("canvas");
	context = canvas.getContext("2d");
	canvas.width  = 1000;
	canvas.height = 500;
//ajout de la balise au body
document.body.appendChild(canvas);
var images={};
function loadImage(name){
	images[name] = new Image();
	images[name].src = "image/" + name + ".png";
}
loadImage("character2");
loadImage("background_intro_grand");
loadImage("Character_sprite");
loadImage("Character_sprite2")
loadImage("wood_crate");
loadImage("wood_crate2");
loadImage("Cercle");
var Sprite = "iddle";
var map1 = [
	["M","M","M","M","M","M","M","M","M","M","M"],
	["M","_","_","_","_","M","_","_","_","_","M"],
	["M","_","_","_","_","M","_","_","_","_","M"],
	["M","_","_","_","_","M","_","_","_","_","M"],
	["M","_","_","_","_","C","_","_","_","_","M"],
	["M","_","_","_","_","C","_","_","_","_","M"],
	["M","_","_","_","_","C","_","_","_","_","M"],
	["M","_","_","_","_","M","_","_","_","_","M"],
	["M","_","_","_","_","M","_","_","_","_","M"],
	["M","_","_","_","_","M","_","_","_","_","M"],
	["M","M","M","M","M","M","M","M","M","S","M"]
];
var map2 = [
	["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
	["M","_","C","_","_","_","C","_","C","_","C","_","C","_","C","_","M"],
	["M","C","_","_","_","C","_","C","_","C","_","C","_","C","_","C","M"],
	["M","_","_","_","C","_","C","_","C","_","C","_","C","_","C","_","M"],
	["M","_","_","_","_","C","_","C","_","C","_","C","_","C","_","C","M"],
	["M","_","_","_","_","_","C","_","C","_","C","_","C","_","C","_","M"],
	["M","_","_","_","_","C","_","C","_","C","_","C","_","C","_","C","M"],
	["M","_","_","_","C","_","C","_","C","_","C","_","C","_","C","_","M"],
	["M","_","_","_","_","C","_","C","_","C","_","C","_","C","_","C","M"],
	["M","_","C","_","C","_","C","_","C","_","C","_","C","_","C","_","M"],
	["M","_","_","_","_","C","_","C","_","C","_","C","_","C","_","C","M"],
	["M","C","_","C","_","_","C","_","C","_","C","_","C","_","C","_","M"],
	["M","_","C","_","_","C","_","C","_","C","_","C","_","C","_","C","M"],
	["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","S","M"]
];
var map= [
	["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
	["M","P","C","_","C","C","C","C","_","_","_","_","C","C","C","C","M"],
	["M","_","C","_","_","_","_","_","C","C","C","C","_","_","_","C","M"],
	["M","M","M","M","M","M","M","M","M","M","M","M","M","_","_","M","M"],
	["M","C","_","_","_","_","_","_","C","_","_","_","_","_","C","C","M"],
	["M","C","_","_","_","_","_","_","C","_","_","_","_","_","C","C","M"],
	["M","C","_","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
	["M","C","_","_","_","_","_","C","M","C","_","C","C","C","_","C","M"],
	["M","M","M","M","M","M","C","C","M","C","_","_","_","_","_","C","M"],
	["M","_","_","_","_","_","_","M","M","M","M","C","M","M","M","_","M"],
	["M","_","M","M","M","M","M","C","_","C","_","C","_","C","M","_","M"],
	["M","C","_","_","_","_","_","_","M","_","_","C","_","C","M","_","M"],
	["M","C","_","_","_","_","_","C","M","C","_","C","_","C","M","_","M"],
	["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","S","M"]
]
var largeur_elements = 34;
var hauteur_element  = 36; 
var img_mur = context.createImageData(largeur_elements,hauteur_element);
for (var i = 0; i < img_mur.data.length; i+=4) {
	img_mur.data[i+0] = 0;
	img_mur.data[i+1] = 0;
	img_mur.data[i+2] = 0;
	img_mur.data[i+3] = 255;
};
var img_sol = context.createImageData(largeur_elements,hauteur_element);
for (var i = 0; i < img_sol.data.length; i+=4) {
	img_sol.data[i+0] = 186;
	img_sol.data[i+1] = 172;
	img_sol.data[i+2] = 138;
	img_sol.data[i+3] = 255;
};
var img_sortie = context.createImageData(largeur_elements,hauteur_element);
for (var i = 0; i < img_sortie.data.length; i+=4) {
	img_sortie.data[i+0] = 45;
	img_sortie.data[i+1] = 140;
	img_sortie.data[i+2] = 24;
	img_sortie.data[i+3] = 255;
};

var Phase = "Intro",
	pos_x = 1,
	pos_y = 1,
	victoire = false,
	intro_delai = true,	
	direction = '',
	action = "",
	coordoneecaisse = [],
	coordoneecaisse1 = [],
	coordoneecaisse2 = [],
	caisse_mouvement = false,
	joueur_mouvement = true,
	largeur_sprite_character=116,
	hauteur_sprite_character=125,
	oppaciteFondu=1,
	image_sprite = "Character_sprite",
	image_caisse = "wood_crate",
	afficher_titre = false,
	anim1On = false,
	anim2On = false,
	etapeAnim1 =0,
	etapeAnim2 =0;
var x_caisse = 450;
var y_caisse = 360;
var posxCharacter = 0;
var posyCharacter = 350;
var pas_intro = 0;
var pas_intro_float = 0;
var position_y_image_fond = 100;
var x_sprite = 1;
var y_sprite = 2; 
var afficher_cercle= true;
var temps_cercle=0;

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
	if (e.keyCode == 65) {
		action = "action";
	};
};	

function draw_sprite(x,y,image){
	// y / x       0       1       2
	/* 0 Face   marche1  iddle  marche2
	   1 Gauche marche1  iddle  marche2
	   2 Droite marche1  iddle  marche2
	   3 Dos    marche1  iddle  marche2
	*/
	//draw_sprite(x,y)
	x_coupe=2+34*x;
	y_coupe=0+35.3*y;
	if (Phase=="Intro") {
		var x_finale=posxCharacter;
		var y_finale=posyCharacter;
	}else{
		x_finale=pos_x*largeur_elements;
		y_finale=pos_y*hauteur_element;
	}
	context.drawImage(images[image],
					  x_coupe,
					  y_coupe,
					  26,
					  35,
					  x_finale,
					  y_finale,
					  largeur_sprite_character,
					  hauteur_sprite_character
					);
}
function Draw_intro(){
	context.fillStyle="#010101";
	context.globalAlpha=1;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.globalAlpha=oppaciteFondu;
	context.drawImage(images["background_intro_grand"],0,position_y_image_fond,400,230,0,0,1000,500);
	context.drawImage(images[image_caisse],x_caisse,y_caisse,130,130)
	draw_sprite(x_sprite,y_sprite,image_sprite);
	if (afficher_titre == true) {
		AfficheTitre();
	};
}
function Intro_delai(){
	window.setTimeout(function(){etapeAnim1=0;anim1On=true},2000);
	window.setTimeout(function(){etapeAnim1=1;},5000);
	window.setTimeout(function(){etapeAnim1=3;},6000);
	window.setTimeout(function(){etapeAnim1=4;},6500);
	window.setTimeout(function(){etapeAnim1=1;},8000);
	window.setTimeout(function(){etapeAnim1=0;anim2On=true},9000);
	window.setTimeout(function(){etapeAnim2=1;},11000);
	window.setTimeout(function(){etapeAnim2=0;afficher_titre=true;anim1On=false},20000);
	window.setTimeout(function(){etapeAnim2=2;},22000);
	window.setTimeout(function(){etapeAnim2=0;anim2On=false;largeur_sprite_character = 26;hauteur_sprite_character = 35;Phase="Start";},24000);
	intro_delai=false;
}

function AfficheTitre(){
	context.globalAlpha=1;
	context.font="60px Georgia";
	context.fillStyle="#BD8A60";
	context.fillText("Gravity Crate",canvas.width/2-150,200);

	context.globalAlpha=1;
	context.font="40px Georgia";
	context.fillStyle="#BD8A60";
	context.fillText("Utilisez les flèches pour lancer le jeu...",canvas.width/2-240,300);
}
function Appel_animation(){
	if (anim1On)	Animation1();
	if (anim2On)	Animation2();
}
function Animation1(){
	switch(etapeAnim1)
	{
		//avance
		case 0:
			posxCharacter+=1.2;
			pas_intro_float+=0.045;
			pas_intro= Math.floor(pas_intro_float);
			if (pas_intro==1) {
				x_sprite=2;		
			}else if(pas_intro==0){
				x_sprite=0;
			}else if (pas_intro==2) {
				pas_intro_float=0;
				x_sprite=0;
			}
		break;
		//reste
		case 1:
			x_sprite=1;
			image_sprite="Character_sprite";
		break;
		//saut
		case 2:
		break;
		case 3:
			image_sprite="Character_sprite2";
		break;
		case 4:
			image_caisse="wood_crate2";
			x_caisse+=7;
		break;
		case 5 :
			position_y_image_fond-=0.2;
			posyCharacter+=0.4;
		break;
	}
}
function Animation2(){
	switch(etapeAnim2)
	{
		case 0:
		break;
		case 1:
			position_y_image_fond-=0.1;
			posyCharacter+=0.4;
		break;
		case 2:
			oppaciteFondu-=1/150;
			if (oppaciteFondu<0) oppaciteFondu=0;
		break;
	}
}
function Start(){
	console.log("START !");
	if (direction!="") {
		Phase="Map";
	};
}
function Effet_pouvoire(){
	context.drawImage(images["Cercle"],190,140,200,200);
}
function GameLoop(){
	switch(Phase){
		case "Intro":
			Appel_animation();
			if (intro_delai) Intro_delai();
			Draw_intro();
		break;
		case "Start":
			//Start_background();
			Start();
		break;
		case "Map":
			ActivationPouvoir(action);
			MovePlayer(direction);
			DeplacerCaisse(direction);
			DrawMap();
			if (joueur_mouvement == true) {
				direction = 'neutre'; 
			}
			action = "neutre";
		break;
		case "Victoire":
			Victoire();
		break;
	}
}
function Victoire(){
	console.log("Vous avez gagné, recharger la page maintenant.");
}
function TrouverCaisse(){
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			if (map[i][j]=="C") {
				coordoneecaisse.push(
					caisse = {
					x:j,
					y:i
				});
			};
		};
	};
}
function ActivationPouvoir(input){
	if (input=="action") {
		direction="neutre";
		caisse_mouvement=!caisse_mouvement;
		joueur_mouvement=!joueur_mouvement;
	}
}
function DeplacerCaisse(input){
	if (caisse_mouvement==true) {
		TrouverCaisse();
		for (var i = 0; i < coordoneecaisse.length; i++) {
			var x= coordoneecaisse[i].x;
			var y= coordoneecaisse[i].y;
			if(input != '')
			{
				map[y][x] = "_"; 
				switch(input){
					case 'haut':
						if(	map[y-1][x]!='M' && map[y-1][x]!='P' && map[y-1][x]!='C' && map[y-1][x]!='S'){
							y = y -1;
						}	
					break;

					case'bas':
						if(map[y+1][x] !='M' && map[y+1][x]!='P' && map[y+1][x]!='C' && map[y+1][x]!='S'){
							y = y+1; 
						}
					break;

					case'gauche': 
						if(map[y][x-1] !='M' && map[y][x-1]!='P' && map[y][x-1]!='C' && map[y][x-1]!='S'){
							x = x-1; 
						}
					break;

					case'droite':
						if(map[y][x+1]!='M' && map[y][x+1]!='P' && map[y][x+1]!='C' && map[y][x+1]!='S'){
							x = x + 1;		
						}
					break;
				}
				map[y][x] = "C"; 
			}
		}
		coordoneecaisse2=coordoneecaisse;
		coordoneecaisse=[];
	}
}

function MovePlayer(input){
	if(input != '' && joueur_mouvement==true)
	{
		map[pos_y][pos_x] = "_"; 
		switch(input)
		{
			case 'haut':
				if(	map[pos_y-1][pos_x]!='M' && map[pos_y-1][pos_x]!='C'){
					Sprite="haut";
					pos_y = pos_y -1;
				}	
			break;

			case 'bas':
				if (map[pos_y+1][pos_x] == "S") {
					Phase = "Victoire";
					Sprite="bas";
					pos_y = pos_y+1; 
				}
				else if(map[pos_y+1][pos_x]!='M' && map[pos_y+1][pos_x]!='C'){
					Sprite="bas";
					pos_y = pos_y+1; 
				}
			break;

			case 'gauche': 
				if(map[pos_y][pos_x-1] !='M' && map[pos_y][pos_x-1]!='C'){
					Sprite="gauche";
					pos_x = pos_x-1; 
				}
			break;

			case 'droite':
				if(map[pos_y][pos_x+1]!='M' && map[pos_y][pos_x+1]!='C'){
					Sprite="droite";
					pos_x = pos_x + 1;		
				}
			break;
		}
		map[pos_y][pos_x] = "P"; 
	}
}
function DrawMap(){
	context.fillStyle="#BAAC8A"
	context.fillRect(0,0,canvas.width,canvas.height);
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			if (map[i][j]=="M") {
				context.putImageData(img_mur,j*largeur_elements,i*hauteur_element);
			}
			else if (map[i][j]=="_") {
				context.putImageData(img_sol,j*largeur_elements,i*hauteur_element);
			}
			if (map[i][j]=="C" && caisse_mouvement==false) {
				context.drawImage(images["wood_crate"],j*largeur_elements,i*hauteur_element,36,36);
			}else if(map[i][j]=="C"){
				context.drawImage(images["wood_crate2"],j*largeur_elements,i*hauteur_element,36,36);
			}
			if (map[i][j]=="S") {
				context.putImageData(img_sortie,j*largeur_elements,i*hauteur_element);
			}
			if (map[i][j]=="P" && caisse_mouvement==false) {
				switch(Sprite){
					case "iddle" : 
						draw_sprite(1,0,"Character_sprite");
					break;
					case "droite" : 
						draw_sprite(0,2,"Character_sprite");
					break;
					case "gauche" :
						draw_sprite(0,1,"Character_sprite");
					break;
					case "haut" :
					    draw_sprite(0,3,"Character_sprite");
					break;
					case "bas"  :
						draw_sprite(0,0,"Character_sprite");
					break;
				}
			}else if(map[i][j]=="P"){
				temps_cercle++
				context.drawImage(images["character2"],j*largeur_elements-2,i*hauteur_element,25,33);
				if (afficher_cercle==true) {
					console.log("test");
					context.drawImage(images["Cercle"],190,140,200,200);
				}
				if (temps_cercle==200) {
					afficher_cercle=false;
				};
			}
		}
	}
}
setInterval(GameLoop,1000/90);