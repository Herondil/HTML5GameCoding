//créer quelques objets
var objet = {
		poids: 2,
		nom: "Omnigel",
		description: "Soigne les blessures",
		quantite: 100,
	};
var objet2 = { 

		poids: 3,
		nom: "Grenade",
		description : " Blesse un ennemi",
		quantite : 100,
	};
//créer un inventaire
var potionNum = 100;
var inventaire = [objet,objet2];
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
		result=result +" "+element.nom;
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
var test;

console.log("Attention les moissonneurs attaquent !");



var Shepard = {

    heros : 'Shepard', 
	vieHerosIni : 700,
	vieHeros : 700,
	atkHerosMax : Math.floor((Math.random() *99) + 20),
	atkHeros : Math.round((Math.random() * 99) + 1),

};

function pa(){
	return Math.round((Math.random() * 5));
};
var Moissonneur = {

	vieMonstre : 1000,
	atkMonstre : Math.round((Math.random() * 90) + 10),
};	

var tour = 1,
	penalité   = 5,
	EnCouverture = 0,
	tourMort;


function GameLoop(NomHeros,action){
	var message = "Tour " + tour + "\n";
	if (NomHeros.vieHeros > 0) {
		switch(action) {
		
			case 'assaut' :
				message += Assaut(NomHeros);
				//if (NomHeros = 0) {
				//var atkMonstreRed = atkMonstre - 10;
				//message += 'Les degats sont moins importants car vous etiez à couvert';
				//}
			break;
			
			case 'couverture' :
				//if (NomHeros = 0) {
					//message += 'Vous êtes à couvert !';
				//}
			break;
			
			case 'objets' :
				if(NomHeros.vieHeros > 0 && inventaire[0].quantite > 0) {

					message += ' Utilise un Omnigel';
					var soin = NomHeros.vieHeros - potionNum;

					if (NomHeros.vieHeros >= soin){
						NomHeros.vieHeros = NomHeros.vieHerosIni;
						message += ' récupère la totalité de ses points';
					}else{
						NomHeros.vieHeros = NomHeros.vieHeros + potionNum;
						message += ' récupère 100 pv ';
					}

					inventaire[0].quantite = inventaire[0].quantite - 1;
				}
			break;
			
			default :
				message += 'Fais ton choix rapidement ! "assaut", "couverture" ou "objets"?';
		}
	} else {
			if(tour == (tourMort + penalité)){
			NomHeros.vieHeros = NomHeros.vieHerosIni;
			message += "N'abandonnez pas, tout n'est pas perdu !";
		} else {
			var respawn = tourMort+penalité-tour;
			message += "Courage vous y êtes presque ! ";
			if(respawn >1) {
				message += respawn + " tours pour revenir à la vie.";				
			} else {
				message += "le prochain tour pour revenir à la vie.";						
			}
		}	
	}
	message += AttaqueEnnemi(NomHeros);
	console.log(message);
	return tour ++;
}

function Assaut (NomHeros) {
	var message ="";
	var pav = pa();
	var pava = NomHeros.atkHeros * pav;
	if ((Moissonneur.vieMonstre > 0) && (NomHeros.vieHeros > 0)) {
		Moissonneur.vieMonstre -= pava;
		message += 'Votre attaque inflige ' + pava 
												+ ' points dégats.' 
		if ( Moissonneur.vieMonstre <= 0 ) {
			message += "Le moissonneur est mortellement " 
					+ "touché. Vous avez sauvé le monde !"
			Moissonneur.vieMonstre = 0;
		} else {
			message += '\nIl reste ' + Moissonneur.vieMonstre 
									 + ' points de vie à votre adversaire.';
		}										
	} else {
		if(NomHeros.vieHeros > 0) {
			message += 'La paix est revenue !';
		}
		
	}
	return message;
}

function Couverture (NomHeros) {

message += 'Vous avez trouvé une bonne couverture, bien joué !';
}
function AttaqueEnnemi(NomHeros) {
	
	var message = "";

	var pavMon = pa();
	var pavaMon = Moissonneur.atkMonstre * pavMon;

	if((NomHeros.vieHeros > 0) && (Moissonneur.vieMonstre > 0)) {
		NomHeros.vieHeros -= pavaMon;
		message+="\n Le moissonneur passe à l'attaque vous prenez " + pavaMon + " points de dégats."
			
		if (NomHeros.vieHeros <= 0) {
			message += "Vous avez échoué tout est perdu...";

		} else {
			message += '\nIl vous reste ' + NomHeros.vieHeros + ' points de vie.';
	
			
		}
	}
	return message;
};