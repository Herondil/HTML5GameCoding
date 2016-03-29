//Map
var map =[
	['M','M','M','M','M','M','M','M','M','M'],
	['M','O','O','O','O','O','M','O','O','M'],
	['M','O','O','O','O','O','M','O','O','M'],
	['M','O','O','O','O','O','M','O','O','M'],
	['M','O','O','O','O','O','O','O','O','M'],
	['M','M','O','O','O','O','O','O','O','M'],	
	['M','O','O','O','O','O','M','O','O','M'],	
	['M','O','O','M','M','O','M','M','O','M'],
	['M','O','O','O','O','O','M','C','O','M'],	
	['M','M','M','M','M','M','M','M','M','M'],
];
var liste_element = ['M','O','P','E','S','C']
var liste_couleur = [[0,0,0],[150,150,150],[0,0,250],[250,0,0],[250,250,0],[250,0,2500]];
var largeur = 600 ;
var hauteur = 600 ;
var largeur_img = 60;
var hauteur_img = 60;
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.setAttribute('height',hauteur+'px');
canvas.setAttribute('width',largeur+'px');
var nb_carre = (hauteur/hauteur_img)*(largeur/largeur_img);
//Joueur
var input = '';
var pos_x = 1;
var pos_y = 1 ;
var lettre_joueur = 'P';
map[pos_y][pos_x] = lettre_joueur;
var win_tours = 0;
//Ennemi
var nb_tour = 0;
var pos_ennemi_x = [1,7,1];
var pos_ennemi_y = [3,4,8];
var direction_ennemi = [3,0,3];
var lettre_ennemi = 'E';
for (var i = 0; i < pos_ennemi_x.length-1; i++) {
	map[pos_ennemi_y[i]][pos_ennemi_x[i]]= lettre_ennemi;	
}
//Sortie
var pos_sortie_x = 0;
var pos_sortie_y = 0;
//Coffre
var coffre_x=[7,1,1];
var coffre_y=[8,1,8];
var coffre_actuel = 0;
//Phase jeu
var phase ='main';
// coodonnée message
var message_x = 0;
var message_y = canvas.height/2;
var compteur_couleur=0 ;
var vitesse_texte = 2;
var message_scale = 1;
//Affiche map
function affiche_map(){	
	canvas.setAttribute('height',hauteur+'px');
	canvas.setAttribute('width',largeur+'px');
	var img = context.createImageData(largeur_img,hauteur_img);
	var ligne = -1;
	var colonne = 0;
	for (var k = 0; k <nb_carre; k++) {
			if (k%10 == 0) {ligne++;colonne = 0}
			var x = colonne*largeur_img;
			var y = ligne*hauteur_img;
			var couleur=choix_couleur();
			for (var i = 0; i < img.data.length; i+=4) {
				img.data[i+0] = couleur[k][0]; 
				img.data[i+1] =	couleur[k][1]; 
				img.data[i+2] = couleur[k][2]; 
				img.data[i+3] = 255; 
			}
			context.putImageData(img,x,y);
			colonne++
		}
	return null;
}
function choix_couleur(){
	var couleur=[];
	for (var i = 0; i < map.length; i++) {
		for (var k = 0; k < map[i].length; k++) {
			var indice = liste_element.indexOf(map[i][k]);
			if (indice>=0){
				couleur.push(liste_couleur[indice]);
			}	
		}
	}
	return(couleur);
}
//Afficher message
function afficher_text(text,color,effet){
	canvas.setAttribute('height',hauteur+'px');
	canvas.setAttribute('width',largeur+'px');
	context.font = "25px Comic Sans MS";
	if (effet == 'change_couleur'){
		compteur_couleur++;
		if (compteur_couleur>=30) {
			color = "#048B9A";
			if (compteur_couleur>60) compteur_couleur = 0;
		}
		if (compteur_couleur>0 && compteur_couleur>30){
			color = color;			
		}
	}else if(effet == 'defilement'){
		message_x += vitesse_texte;
		if (message_x>canvas.width) {
			vitesse_texte = -vitesse_texte;
		}else if (message_x<0){
			vitesse_texte = -vitesse_texte;
		}
	}
	if (effet == 'scale')  {
		message_scale+= +vitesse_texte;
		if (message_scale>1.1) {
			vitesse_texte = -0.0025;
		}else if (message_scale<0.9){
			vitesse_texte = 0.0025;
		}
		context.scale(message_scale,1);
	}
	context.fillStyle = color;
	context.fillText(text, message_x, message_y);
}
//Affiche main
function main(input){
	afficher_text("Appuyes sur 'entrée'!","#FF0000",'change_couleur');
 	if (input =='enter') {
		phase = 'jeu';
	}
	return null;
}
//mort psk c'cool
function mort(){
	afficher_text("T'es mort, appuyes sur entrée pour recommencer",'#FF0000','scale');
	if (input == 'enter') location.reload();
}
//win
function win(){
	afficher_text("T'as gagné en "+win_tours+" secondes, appuyes sur entrée pour recommencer",'#00FF00','defilement');
	if (input == 'enter') location.reload();
}
//Depla joueur
function deplacement_joueur(direction){
	if (direction != '') {
		map[pos_y][pos_x]= liste_element[1];	
		switch(direction){
			case 'gauche':
				if (map[pos_y][pos_x-1] != liste_element[0]) {
					pos_x-= 1;
				}
				break;
			
			case 'droite':
				if (map[pos_y][pos_x+1] != liste_element[0]) {
					pos_x+= 1;
				}
				break;
			
			case 'bas':
				if (map[pos_y+1][pos_x]  != liste_element[0]) {
					pos_y+= 1;
				}
				break;
			
			case 'haut':
				if (map[pos_y-1][pos_x]  != liste_element[0]) {
					pos_y-= 1;
				}
				break;
			
			default:
				break;
		}
		map[pos_y][pos_x]= lettre_joueur;	
		input = '';
		return null;
	}
}
//Depla ennemi
function deplacement_ennemi(){
	if (nb_tour%3==0){	
		for (var i = 0; i < pos_ennemi_x.length; i++) {
			map[pos_ennemi_y[i]][pos_ennemi_x[i]]= liste_element[1];	
			switch(direction_ennemi[i]){
				case 3:
					if (map[pos_ennemi_y[i]][pos_ennemi_x[i]-1] != liste_element[0] && map[pos_ennemi_y[i]][pos_ennemi_x[i]-1] != liste_element[3]) {
						pos_ennemi_x[i]-= 1;
					}else{
						direction_ennemi[i]-=2;
					}
					break;
				
				case 1:
					if (map[pos_ennemi_y[i]][pos_ennemi_x[i]+1] != liste_element[0]&& map[pos_ennemi_y[i]][pos_ennemi_x[i]-1] != liste_element[3]) {
						pos_ennemi_x[i]+= 1;
					}else{
						direction_ennemi[i]+=2;
					}
					break;
				
				case 2:
					if (map[pos_ennemi_y[i]+1][pos_ennemi_x[i]]  != liste_element[0]&& map[pos_ennemi_y[i]][pos_ennemi_x[i]-1] != liste_element[3]) {
						pos_ennemi_y[i]+= 1;
					}else{
						direction_ennemi[i]-=2;				
					}
					break;
				
				case 0:
					if (map[pos_ennemi_y[i]-1][pos_ennemi_x[i]]  != liste_element[0]&& map[pos_ennemi_y[i]][pos_ennemi_x[i]-1] != liste_element[3]) {
						pos_ennemi_y[i]-= 1;
					}else{
						direction_ennemi[i]+=2;				
					}
					break;
				
				default:
					direction_ennemi[i] = 3;
					break;
			}
			map[pos_ennemi_y[i]][pos_ennemi_x[i]]= lettre_ennemi;	
		}
	}	
	return null;
}
//collision
function collision_joueur_ennemi(){
	for (var i = 0; i < pos_ennemi_x.length; i++) {
		if (pos_x==pos_ennemi_x[i] && pos_y==pos_ennemi_y[i]){
			var collision = true;
			phase='mort';
		}else{
			var collision = false;
		}
	}
	return(collision);
}
function collision_joueur_sortie(){
	if (pos_x==pos_sortie_x && pos_y==pos_sortie_y) {
		var sortie = true;
		win_tours = (win_tours*60)/1000;
	}else{
		var sortie = false;
	}
	return(sortie);
}
function collision_joueur_cle(){
	if (pos_x==coffre_x[coffre_actuel] && pos_y==coffre_y[coffre_actuel]) {
		coffre_actuel++;
	}
	if (coffre_actuel<3) {
		map[coffre_y[coffre_actuel]][coffre_x[coffre_actuel]]= 'C';
	}else{
		//Sortie
		pos_sortie_x = 8;
		pos_sortie_y = 1;
		map[pos_sortie_y][pos_sortie_x] = liste_element[4];
	}
	return null;
}
//game loop
function gameloop() {
	nb_tour++;
	switch (phase){
		case 'jeu':
			win_tours++;
			affiche_map();
			deplacement_ennemi();
			if (collision_joueur_ennemi()) {
				phase = 'mort';
			}
			if(collision_joueur_sortie()){
				phase = 'win';
			}
			deplacement_joueur(input);
			if (collision_joueur_ennemi()) {
				phase = 'mort';
			}
			if(collision_joueur_sortie()){
				phase = 'win';
			}
			collision_joueur_cle();
			break;
		case 'main':
			main(input);
			break;
		case 'mort':
			mort();
			break;
		case 'win':
			win();
			break;		
	}
}	

//Et on repete !
setInterval(gameloop,1000/60);

window.document.onkeydown = function(e){
	if(e.keyCode == 38){
		input = 'haut';
	}
		
	if(e.keyCode == 37){
		input = 'gauche';
	}
	
	if(e.keyCode == 39){
		input = 'droite';
	}
	 
	 if(e.keyCode == 40){
		input ='bas';
	}

	 if(e.keyCode == 13){
		input ='enter';
	}
};	