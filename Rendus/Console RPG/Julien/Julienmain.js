var compteur = 0;
var vieJoueurMax = Math.floor(Math.random()*(45)+40),
	vieJoueur  = vieJoueurMax,
	atkJoueurMax = /*Math.floor(Math.random()*(8)+4)*/ 6,
	atkJoueur  = atkJoueurMax,
	vieMonstre = Math.floor(Math.random()*(50)+45),
	atkMonstre = Math.floor(Math.random()*(10)+2),
	modeDefense= false,
	tour       = 1,
	penalité   = 2,
	tourMort;

function GameLoop(input){
	compteur ++;
	console.log("Tour " + compteur);
	if (vieJoueur > 0){
		switch(input){

			case 'attaquer':
				Attaquer()
			break;

			case 'defendre' :
					modeDefense = true;
					defendre();
			break;
			default: console.log("choisir 'attaquer' ou 'défendre' ");
		}
	} else {
		if(tour == (tourMort + penalité)){
			vieJoueur = vieJoueurMax;
			console.log("Vous revenez à la vie, mais vous êtes encore faible. Vous pourrez attaquer au prochain tour.");
		} else {
			var respawn = tourMort+penalité-tour;
			console.log("Vous êtes mort, vous ne pouvez pas bouger. Attendez ");
			if(respawn >1) {
				console.log(respawn + " tours pour revenir à la vie.");				
			} else {
				console.log("le prochain tour pour revenir à la vie.");						
			}
		}	
	}
	monstreAttaquer();
	return tour ++;
}

function Attaquer(){
	atkJoueur = Math.floor(Math.random()*(8)+2);
	console.log("Le joueur attaque. ");
	if ((vieMonstre > 0) && (vieJoueur > 0)) {
		vieMonstre -= atkJoueur;
		console.log('Vous attaquez et infligez ' + atkJoueur 
												+ ' points dégats. '); 
		if ( vieMonstre <= 0 ) {
			console.log("Vous portez le coup final "
					+ "et votre adversaire meurt dans d'atroces souffrances.");
			vieMonstre = 0;
		} else {
			console.log('\nIl reste ' + vieMonstre 
									 + ' points de vie à votre adversaire.');
		}										
	} else {
		if(vieJoueur > 0) {
			console.log('Vous avez vaincu votre adversaire !');
		}
		
	}
}
function monstreAttaquer() {
	atkMonstre = Math.floor(Math.random()*(10)+2);
	if (modeDefense == false) {
		if((vieJoueur > 0) && (vieMonstre > 0)) {
			vieJoueur -= atkMonstre;
			console.log("\n Votre adversaire vous attaque et inflige " + atkMonstre + " points de dégats. ");
			if (vieJoueur <= 0) {
				console.log("Vous êtes mort.");
				tourMort = tour;
			} else {
				console.log('\nIl vous reste ' + vieJoueur + ' points de vie.');
			}
			
		}
	} else {
		console.log('Contre-attaque réussie. ');
		modeDefense = false; 
	}
}

function defendre() {
	modeDefense = true
if(!modeDefense)
	console.log("Vous effectuez une contre-attaque");
	if((vieJoueur > 0) && (vieMonstre > 0)){
		vieJoueur -= atkMonstre - 2;
		vieMonstre -= atkMonstre - 3;
		console.log("Vous contre-attaquez, votre adversaire vous inflige " +(atkMonstre - 2) + " points de dégats. ");
		console.log("Vous attaquez et vous infligez " + (atkMonstre - 3) + " points de dégats. ");
	}
}
function epee(){
	if(atkJoueur == 6){
		atkJoueur += epee.degats;
		return atkJoueur;
	}
}