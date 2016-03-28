////////////////////////// JOUEURS //////////////////////////


function player(Pseudo, Vie, MaxVie, Base_dmg) {
	this.Pseudo 	= Pseudo;
	this.Vie 		= Vie;
	this.MaxVie 	= MaxVie;
	this.Base_dmg 	= Base_dmg;
}

function mob(Nom, Vie, MaxVie, Base_dmg) {
	this.Nom 		= Nom;
	this.Vie 		= Vie;
	this.MaxVie 	= MaxVie;
	this.Base_dmg 	= Base_dmg;
}

///// PLAYERS
var Dieu 		= new player("Dieu", 1150, 1150, Math.floor((Math.random() * 75) + 25));
var Homme 		= new player("Homme", 940, 940, Math.floor((Math.random() * 60) + 20));

//// MOBS
var Leviathan 	= new mob("Leviathan", 5000, 5000, Math.floor((Math.random() * 50) + 10));

////////////////////////// VARIABLES GLOBALES //////////////////////////

var tour = 1;
var potionNum = 150;

function pa(){
	return (Math.random() * 10);
}

////////////////////////// GAME LOOP //////////////////////////
function Game(player, action, mob){
	switch(action){
		case "attaquer":
			if (mob.Vie > 0 && player.Vie > 0) {

				var paa = pa();

				var aze = paa.toFixed(1);

				var atk_a = player.Base_dmg * aze;

				var atk_b = mob.Base_dmg * aze;

				var atk_m = atk_b.toFixed(0);

				var atk = atk_a.toFixed(0);


				console.log("%c"+player.Pseudo+" attaque le "+mob.Nom+" !", 'color: #2ACCFF; font-weight: bold;');

				console.log(player.Pseudo+" lui inflige %c"+atk+" %cpoints de dégâts", 'color: blue;', 'color: "#000;"');

				mob.Vie = mob.Vie - atk;

				if (mob.Vie <= 0) {
					mob.Vie = 0;
					console.log("%c"+mob.Nom+" est mort !", 'color: #b20000; font-weight: bold; font-size: 100px;');
				} else {
					console.log("%cIl reste "+mob.Vie+" points de vie au "+mob.Nom, 'color: #472747; font-weight: bold; font-size: 20px;');

					console.log("==================================");

					player.Vie = player.Vie - atk_m

					console.log(mob.Nom+" attaque "+player.Pseudo+" et lui retire %c"+atk_m+" %cpoints de vie.", 'color: blue;', 'color: "#000;"')	
					console.log("%cIl reste "+player.Vie+" points de vie a "+player.Pseudo, 'color: #472747; font-weight: bold; font-size: 20px;');				
				}
			
			

			} else if (mob.Vie <= 0) {
				console.log("%c"+mob.Nom+" est mort !", 'color: #b20000; font-weight: bold; font-size: 100px;');

			} else if (player.Vie <= 0) {
				player.Vie = 0;
				console.log("%c"+player.Pseudo+" est mort", 'color: #b20000; font-weight: bold; font-size: 100px;');
			};

			break;


		case "potion":
			if (player.Vie > 0 && inventaire[0].quantite > 0) {

				var paa = pa();

				var aze = paa.toFixed(1);
				var atk_b = mob.Base_dmg * aze;

				var atk_m = atk_b.toFixed(0);

				console.log("%c"+player.Pseudo+" %cutilise une potion.", 'color: #2ACCFF; font-weight: bold;', 'color: "#000;"');


				var heal = player.MaxVie - potionNum;

				if (player.Vie >= heal) {
					player.Vie = player.MaxVie;
					console.log(player.Pseudo+" récupère %cla totalité %cde ses points de vie", 'color: darkgreen;', 'color: "#000;"');
				} else {
					player.Vie = player.Vie + potionNum;
					console.log(player.Pseudo+" récupère %c"+potionNum+" %cpoints de vie", 'color: darkgreen;', 'color: "#000;"');
				}

				inventaire[0].quantite = inventaire[0].quantite - 1;

				console.log("==================================");

				console.log(mob.Nom+" attaque "+player.Pseudo+" et lui retire "+atk_m+" points de vie.")
				console.log("%cIl reste "+player.Vie+" points de vie a "+player.Pseudo, 'color: #472747; font-weight: bold; font-size: 20px;');	

			} else if (player.Vie <= 0) {
				console.log("%c"+player.Pseudo+" est mort", 'color: #b20000; font-weight: bold; font-size: 100px;');
			} else if (inventaire[0].quantite <= 0) {
				console.log("%cVous n'avez plus de potions, choisissez une autre action", 'color: darkred; font-weight: bold; font-size: 15px;');
			};

			break;

		default :
			console.log("%cA vous de jouer !\n %cVous avez 2 joueurs, Dieu et Homme, et 1 Ennemi, Leviathan"+
						"\n %cVous pouvez choisir 2 actions : Attaquer ou utiliser une potion."+
						"\n %cExemple : Game(Dieu, 'attaquer', Leviathan) ou Game(Homme, 'potion', Leviathan)"+
						"\n %cVous pouvez consulter votre inventaire avec la commande : VoirInventaire()"+
						"\n %cPour consulter la fiche d'un personnage tapez son nom",
						'color: #2ACCFF; font-weight: bold;',
						'color: darkviolet; font-weight: bold;',
						'color: red; font-weight: bold;',
						'color: green; font-weight: bold;',
						'color: orange; font-weight: bold;',
						'color: blue; font-weight: bold;')

	}

}


//créer quelques objets
var objet = {
		nom: "Potion",
		description: "Une potion pour vous soigner",
		taille: 13,
		poids: 20,
		quantite: 15
	};
var objet2 = {
		nom: "Sucre",
		taille: 1,
		poids: 0.05,
		quantite: 1
	};
var objet3 = {
		nom: "Café",
		taille: 5,
		poids: 2,
		quantite: 1
	};

//créer un inventaire
var inventaire = [objet,objet3,objet2];
var compteur = 0;
function VoirInventaire(){
	
	//1 Avant la boucle
	var result = "L'inventaire contient : "
	compteur=0;
	while(true)
	//2 Dans la boucle
	{
	var element = inventaire[compteur];
		console.log(element);
		result=result +" "+element.nom+" (Vous en avez : "+element.quantite+") | ";
		compteur=compteur+1;
		console.log(compteur);

		
		if (compteur==inventaire.length)
			break;
	
		//stop et sortie de boucle
		//Break;
	
		//stop et nouveau tour de boucle
		continue;
	};
	
	//3 Après la boucle
	return result;
}

$(document).ready(function(){
return Game();
});