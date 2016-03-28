var test;

console.log("Bienvenu!");

var PV_Joueur_max   = 60,
	PV_Joueur 	    = PV_Joueur_max,
	ATK_Joueur_max  = 8,
	ATK_Joueur 	    = ATK_Joueur_max,


	PV_Monstre_max  = 70,
	PV_Monstre 		= PV_Monstre_max,
	ATK_Monstre		= 6,

	Nb_tour 		= 1,
	penalité   		= 3,
	tourMort;
	Defmode			= false;

function Play(action){
	console.log("Début du tour " +Nb_tour+ " !")
	if (PV_Joueur > 0) {
		switch(action){
			case 'Attaque' :
			fight();

			break;

			case 'Défense' :
			Defmode = true;

			

			break;

			default :
			console.log("Choisir 'Attaque' ou 'Défense'");
		}
	}else{
		if (Nb_tour ==(tourMort + penalité)) {
			PV_Joueur = PV_Joueur_max;
			console.log("Vous revenez dans la partie mais vous n'avez pas récupérer toute votre vie.Il sera possible d'attaquer qu'à votre prochain tour.")
		}else{
			var retour_en_jeu = tourMort + penalité - Nb_tour;
			console.log("Vous avez été tuer , vous êtes immobile , Patientez...");
			if (retour_en_jeu > 1) {
				console.log (retour_en_jeu + 'tours pour revenir dans la partie.');

			}else{
				console.log("le prochain tour pour revenir à la vie.");
			}
		}
	}
	fightmonstre();
	return Nb_tour ++;
}

	function fight () {
		ATK_Joueur = Math.floor(Math.random()*(11)+3);
		if ((PV_Monstre > 0) && (PV_Joueur > 0)) {
			PV_Monstre -= ATK_Joueur ;
			console.log("Vous attaquez , vous infligez donc " +ATK_Joueur+ " points de dégats.")

			if (PV_Monstre <=0) {
				PV_Monstre = 0 ;
				console.log("Le monstre a été vaincu , vous avez gagner la partie !")
			}else{
				console.log("Votre adversaire n'a plus que " +PV_Monstre+ " points de vie")
			}
		}else{
			if (PV_Joueur > 0) {
				console.log("Vous avez vaincu le monstre")
			}
		}
	}

	function fightmonstre(){
		ATK_Joueur = Math.floor(Math.random()*(11)+3);
		if (!Defmode) {
			if ((PV_Joueur > 0) && (PV_Monstre > 0)) {
				PV_Joueur -= ATK_Monstre;
				console.log("Le monstre passe à l'attaque et vous inflige " +ATK_Monstre+ " points de dégats !");

				if (PV_Joueur <= 0) {
					console.log("Vous êtes mort...")
					tourMort = Nb_tour;
				}else{
					console.log("Il vous reste " +PV_Joueur+ " points de vie.")
				}
			}
		}else{
			console.log("Vous vous êtes bien défendu !")
			Defmode = false ;
		}
}

