var vieJoueurMax = 200,
vieJoueur = vieJoueurMax, 
attqJoueur= 15, 
vieMonstre = 175, 
attqMonstre = 20, 
modeDefense = false, 
tour = 1, 
tourMort, 
penalite = 5, 
potion1 = 
{
	forcedesoin: 10 
}, 

potion2= {
	forcedesoin : 40 
}, 

potion3 =  {
	forcedesoin : 60
}; 


function gameloop(action){
	console.log('bonjour');
	var message="c'est le  tour numero " + tour +"\n"; 
	tour++; 
	if(vieJoueur > 0){
		switch(action){

			case'attaquer':
			message += attaquer();
			message += monstreAttaquer(); 
			break;

			case 'defendre': 
			modeDefense = true;
			break;

			case 'utiliser_potion': 
			message+= utiliser_potion();
			break;

			case'potion_aleatoire':
			message+=potion_aleatoire();
			default: 
			message += 'choississez + "attaquer","defendre" , "utiliser_potion" ou "potion_aleatoire'; 
		}
	}else{
		if(tour == (tourMort+ penalite)){
			VieJoueur = VieJoueurMax; 
			message += "vous revenez a la vie avec la moitie de vous pv";
		}else{
			var respawn = tourMort +penalite - tour; 
			message = "Vous etes mort, mais vous revenez a la vie avec la moitie de vos pv"; 
		}if(respawn >1){
			message += respawn +" tours pour revenir a la vie ";
		}else{
			message +="le prochain tour pour revenir a ma vie";
		}
	}
	return message;
}	



function attaquer(){
	var message="";

	if((vieMonstre >0 )&& (vieJoueur>0)){
		vieMonstre -= attqMonstre; 
		message += "\n Vous attaquez  et vous  infliguez "+ attqMonstre + "points de degats"; 
		if(vieJoueur <= 0){
			message += "vous etes mort";
			tourMort = tour;
		}else{
			message += '\n il vous reste' + vieJoueur+ ''; 
		}

	}else{
		message += 'Défense reussie';
		modeDefense = false; 
		if(vieJoueur <= 100){

			message+='vous devez utiliser une potion'; 
		}
	else{
		message += ' vous etes mort';  
		}

	}return message; 
}

function monstreAttaquer(){
	var message = '';
	if(!modeDefense){
		if((vieJoueur >0)&&( vieMonstre >0)){

			vieJoueur -= attqMonstre; 
			message +="\n votre adversaire vous attaque et infligue"+ attqMonstre+ " points de degats";
		}else{
			message += '\n il vous reste '+ vieJoueur+ +''+ 'points de vie';
		}
	}else{
		message += 'defense reussie'; 
		modeDefense = false; 
	}
	return message; 
}

function utiliser_potion(){ 
	var message =''; 
	if(vieJoueur <= 100){
		message += ("\n votre vie est basse vous devirez utiliser une potion");

		vieJoueur += potion2.forcedesoin; 
	

	}else{
		message += '\n votre vie est de : '+ vieJoueur;
		
	}
	return message; 
}

function potion_aleatoire(){
	var message ='';
	if(vieJoueur <= 100); 
	potion_aleatoire = Math.floor(Math.random()*(60)+10);
	console.log(potion_aleatoire);
return message;
}