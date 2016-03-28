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
	["M","_","C","_","_","_","_","_","_","_","_","_","_","_","_","_","M"],
	["M","_","C","_","_","_","_","_","_","_","_","_","_","_","_","_","M"],
	["M","M","M","M","M","M","M","M","M","M","M","M","M","_","_","M","M"],
	["M","C","_","_","_","_","_","_","_","_","_","_","_","_","C","C","M"],
	["M","C","_","_","_","_","_","_","_","_","_","_","_","_","C","C","M"],
	["M","_","_","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
	["M","C","_","_","_","_","_","C","M","C","_","_","_","_","_","C","M"],
	["M","M","M","M","M","M","C","C","M","C","_","_","_","_","_","C","M"],
	["M","_","_","_","_","_","_","M","M","M","M","C","M","M","M","_","M"],
	["M","_","M","M","M","M","M","C","_","C","_","_","_","C","M","_","M"],
	["M","_","_","_","_","_","_","_","M","_","_","_","_","C","M","_","M"],
	["M","_","_","_","_","_","_","C","M","_","_","_","_","C","M","_","M"],
	["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","S","M"]
]
//options graphiques
var taillemurs 		= 3,
	couleurmurs 	= "#1C2B2B",
	couleursols 	= "#436665",
	couleurjoueur 	= "#2DD9D5",
	couleursortie 	= "#30E346",
	couleurcaisse   = "#4C3714",
	couleurmurs2    = "#4C0D09",
	couleursols2    = "#99211B",
	couleurjoueur2  = "#CC2452",
	couleurcaisse2  = "#694C1C",
	bordure1		= "";
	bordure2		= "";
	symbole_personnage = "♠",
	block 	= "%c",
	block_player = "%c "+symbole_personnage+" ",
	pos_x = 1,
	pos_y = 1;

//autre variables
var Phase = "Start",
	victoire = false,	
	direction = '',
	action = "",
	coordoneecaisse = [],
	caisse_mouvement = false,
	joueur_mouvement = true;

function Taille_murs(){
	for(var i = 0; !(i == taillemurs); i++){
		block += " ";
	}
}

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
	if (e.keyCode == 32) {
		action = "action";
	};
};	
function Start(){
	console.log("utiliser les flèches directionnelles pour vous déplacer et 'espace' pour passer en mode déplacement de caisses. \n"
	 			+"utiliser les flèches pour commencer à jouer. Vous pouvez activez l'option couleurs aléatoires avec la fonction : "
	 			+"ActiverCouleuraleatoire()");
	if (direction!="" && direction!="neutre") {
		Phase = "Map";
	}
};


setInterval(GameLoop,1000/60);

function GameLoop(){
	switch(Phase){
		case "Start":
			Start();
		break;
		case "Map":
			block 	= "%c";
			Taille_murs();
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
					pos_y = pos_y -1;
				}	
			break;

			case 'bas':
				if (map[pos_y+1][pos_x] == "S") {
					Phase = "Victoire";
					pos_y = pos_y+1; 
				}
				else if(map[pos_y+1][pos_x]!='M' && map[pos_y+1][pos_x]!='C'){
					pos_y = pos_y+1; 
				}
			break;

			case 'gauche': 
				if(map[pos_y][pos_x-1] !='M' && map[pos_y][pos_x-1]!='C'){
						pos_x = pos_x-1; 
				}
			break;

			case 'droite':
				if(map[pos_y][pos_x+1]!='M' && map[pos_y][pos_x+1]!='C'){
					pos_x = pos_x + 1;		
				}
			break;
		}
		map[pos_y][pos_x] = "P"; 
	}
}
function Couleuraleatoire(){
	var couleuraleatoire=true;
	var color="";
	var r=Math.round(Math.random()*255);
	var g=Math.round(Math.random()*255);
	var b=Math.round(Math.random()*255);
	color="rgb("+r+","+g+","+b+")";
	return color;
}
function ActiverCouleuraleatoire(){
	couleurmurs 	= Couleuraleatoire();
	couleursols 	= Couleuraleatoire();
	couleurjoueur 	= Couleuraleatoire();
	couleursortie 	= Couleuraleatoire();
	couleurcaisse   = Couleuraleatoire();
	couleurmurs2    = Couleuraleatoire();
	couleursols2    = Couleuraleatoire();
	couleurjoueur2  = Couleuraleatoire();
	couleurcaisse2  = Couleuraleatoire();
}
function DesactiverCouleuraleatoire(){
	couleurmurs 	= "#1C2B2B";
	couleursols 	= "#436665";
	couleurjoueur 	= "#2DD9D5";
	couleursortie 	= "#30E346";
	couleurcaisse   = "#4C3714";
	couleurmurs2    = "#4C0D09";
	couleursols2    = "#99211B";
	couleurjoueur2  = "#CC2452";
	couleurcaisse2  = "#694C1C";
}
function ActiverBordure(){
	bordure1="; border: 1px solid red";
	bordure2="; border: 1px solid blue"
}
function Desactiverbordure(){
	bordure1="";
	bordure2="";
}
function DrawMap(){
	//prévoir un espace pour les cases vides
	//un bloc noir pour les murs console.log("%c ","background: #000")
	//une lettre verte pour le joueur
	var	tablcss = [];
	var	ligne = "";
	var	casecourante = 0;
	var	lignecourante = 0;
		
	while(true){
		casecourante = 0;
		//ligne = "";
		//tablcss = [];
		
		while(true){
			var c=map[lignecourante][casecourante];
			if(c=="M"){
				if (joueur_mouvement==true) {
					tablcss.push("background : " + couleurmurs+bordure1);
				}else{
					tablcss.push("background : " + couleurmurs2+bordure2);
				}
				ligne += block;
			}
			if(c=="_"){
				if (joueur_mouvement==true) {
					tablcss.push("background : " + couleursols+bordure1);
				}else{
					tablcss.push("background : " + couleursols2+bordure2);
				}
				ligne += block;
			}
			if(c=="P"){
				if (joueur_mouvement==true) {
					tablcss.push("background : " + couleurjoueur+bordure1);
				}else{
					tablcss.push("background : " + couleurjoueur2+bordure2);
				}
				ligne+= block_player;
			}
			if(c=="S"){
				tablcss.push("background : " + couleursortie+bordure1);
				ligne += block;
			}
			if(c=="C") {
				if (joueur_mouvement==true) {
					tablcss.push("background : " + couleurcaisse+bordure1);
				}else{
					tablcss.push("background : "+ couleurcaisse2+bordure2);
				}
				ligne += block;
			}
			casecourante++;
			if(casecourante == map[lignecourante].length){
				break;
			}
		}
		lignecourante++;
		ligne += "\n";
		
		if(lignecourante == map.length){	
			break;
		}
	}
	console.log(ligne, ...tablcss);
}