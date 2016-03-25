var test;

console.log("bonjour");

var vieJoueurMax = 50,
	vieJoueur  = vieJoueurMax,
	atkJoueurMax = 6,
	atkJoueur  = atkJoueurMax,
	vieMonstre = 75,
	atkMonstre = 8,
	modeDefense= false,
	tour       = 1,
	penalité   = 5,
	tourMort;
	
	


function Jouer(action){
	var message = "C'est le tour numéro " + tour + "\n";
	if (vieJoueur > 0) {
		switch(action) {
		
			case 'attaquer' :
				message += attaquer();
				
			break;
			
			case 'defendre' :
				modeDefense = true;
			break;
			
			case 'attendre' :
			break;
			
			default :
				message += 'choississez "attaquer", "defendre" ou "attendre"';
		}
	} else {
		if(tour == (tourMort + penalité)){
			vieJoueur = vieJoueurMax;
			message += "Vous revenez à la vie, mais vous êtes encore faible. Vous pourrez attaquer au prochain tour.";
		} else {
			var respawn = tourMort+penalité-tour;
			message += "Vous êtes mort, vous ne pouvez pas bouger. Attendez ";
			if(respawn >1) {
				message += respawn + " tours pour revenir à la vie.";				
			} else {
				message += "le prochain tour pour revenir à la vie.";						
			}
		}	
	}
	message += monstreAttaquer();
	console.log(message);
	return tour ++;
}

function attaquer () {
	var message ="";
	if ((vieMonstre > 0) && (vieJoueur > 0)) {
		vieMonstre -= atkJoueur;
		message += 'Vous attaquez et infligez ' + atkJoueur 
												+ ' points dégats.' 
		if ( vieMonstre <= 0 ) {
			message += "Vous portez le coup final " 
					+ "et votre adversaire meurt dans d'atroces souffrances"
			vieMonstre = 0;
		} else {
			message += '\nIl reste ' + vieMonstre 
									 + ' points de vie à votre adversaire.';
		}										
	} else {
		if(vieJoueur > 0) {
			message += 'Vous avez vaincu votre adversaire !';
		}
		
	}
	return message;
}

function monstreAttaquer() {
	
	var message = "";
	if (!modeDefense) {
		if((vieJoueur > 0) && (vieMonstre > 0)) {
			vieJoueur -= atkMonstre;
			message+="\n Votre adversaire vous attaque et inflige " + atkMonstre + " points de dégat."
			
			if (vieJoueur <= 0) {
				message += "Vous êtes mort.";
				tourMort = tour;
			} else {
				message += '\nIl vous reste ' + vieJoueur + ' points de vie.';
			}
			
		}
	} else {
		message += 'Défense réussie';
		modeDefense = false; 
	}
	
	return message;
}