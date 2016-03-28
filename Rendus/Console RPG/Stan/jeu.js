var nom =["optine", "optine z", "exeter", "gaiora"];
var pv= [216 , 250 , 143 , 416];
var attaque_cout = [22 , 35 , 14 , 28];
var boss ={
	nom : "gaiora",
	vie : 685,
	mana: 120,
	attaque : 38,
	vie_max : 685
}
var ennemie ={
	nom : "slime",
	vie : 68,
	mana: 6,
	attaque : 4,
	vie_max : 48,
	message : "un slime apparait !"
}
var ennemie2 ={
	nom : "lamara",
	vie : 75,
	mana : 10,
	attaque : 8,
	vie_max : 65,
	message : "une lamara apparait !"
}
var ennemie3 ={
	nom : "arme squelette",
	vie : 100,
	attaque : 12,
	vie_max : 100,
	message : "un squellette apparait !"
}
var ennemie4 ={
	nom : "ombre",
	vie : 112,
	attaque : 15,
	vie_max : 112,
	message : "une ombre apparait !"
}
var ennemie5 ={
	nom : "songstorm",
	vie : 135,
	attaque : 19,
	vie_max : 135,
	message : "songstorm apparait !"
}
var hero ={
	nom : "optine",
	vie : 216,
	mana : 102,
	attaque : 22,
	vie_max : 216,
	charge : 3
}

var allie ={
	nom : "exeter",
	vie : 120,
	mana : 200,
	attaque : 14,
	vie_max : 120
}

var mode_boost = false;
var position_defence = false;
var tour = 1;
var monstre =[ennemie,ennemie2,ennemie3,ennemie4,ennemie5];
var monstre_boss =[]

while(true){
	var apparition_hasard = Math.round(Math.random()*4);
	monstre_boss.push(monstre[apparition_hasard]);


	if (monstre_boss.length > 3) {
		break;
	};
}

console.log("partant pour la chasse au trésor !!?? alors commencé l'aventure sans attandre !");
console.log(hero,allie);

function debug(){
	console.log("Erreur voici les choix disponible");
	console.log("attaque");
	console.log("defence");
	console.log("flammara");
	console.log("soin");
	console.log("boost");
	console.log("refait !");
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

function defence(defenceur){
	position_defence = true;
	console.log(defenceur.nom+" passe en defence !")
}

function flammara(lanceur,cible){
	var valeur = Math.round(Math.random()*20)+25;
	var cout = 6;
		if (lanceur.mana < cout) {
			console.log("tu n'a pas asser de mana");
		}else {
		lanceur.mana -= cout;
		cible.vie -= valeur;
		console.log(lanceur.nom+" lance le sort 'flammara' inflige "+valeur+" point de degats a "+cible.nom+" pv restant "+cible.vie+" pv.")
		}
}
function slashthra(lanceur,cible){
	var valeur = Math.round(Math.random()*40)+48;
	var cout = 23;
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
function boost(lanceur){
	var cout = 1;
	var upattaque = 13;
	var upvie_max = 74;
	var upvie = 74;
	var upmana = 25;
		if (lanceur.charge < cout) {
			console.log("tu n'a plus de charge");
		}else {
		mode_boost = true;
		lanceur.charge -= cout;
		lanceur.vie += upvie;
		lanceur.vie_max += upvie_max;
		lanceur.attaque += upattaque;
		lanceur.mana += upmana;
		console.log(lanceur.nom+" se concentre gagne en puissance augmente de "+upvie+" point de vie max "+upattaque+" d'attaque de "+upmana+" points de mana.");
		}
}

function soin(lanceur){
	var soins = Math.round(Math.random()*43)+35;
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

function force_de_terra(lanceur,cible){
		var valeur = Math.round(Math.random()*40)+25;
		var cout = 1;
		if (lanceur.mana < cout) {
			console.log("tu n'a pas asser de mana");
		}else {
		lanceur.mana -= cout;
		cible.vie -= valeur;
		console.log(lanceur.nom+" explose la terre autour de lui inflige "+valeur+" point de degats a "+cible.nom+" pv restant "+cible.vie+" pv.");
	};
}

function ennemie_tour(){
	var attaque_ennemie = Math.round(Math.random()*5)+1;
	if  (attaque_ennemie <= 3){
		attaque(ennemie,hero) ;
	}else if (attaque_ennemie <= 6) {
		attaque(ennemie,allie);
	};
}

function boss_tour(){
	var attaque_boss = Math.round(Math.random()*5)+1;
	if  (attaque_boss <= 2){
		attaque(boss,hero) ;
	}else if (attaque_boss <= 3) {
	attaque(boss,allie);
	}else if (attaque_boss <= 4) {
		force_de_terra(boss,allie);
	}else if (attaque_boss <= 6) {
		force_de_terra(boss,hero);
	tour++;
	}
};

function allie_tour(){
	var attaque_allie = Math.round(Math.random()*5)+1;
	if  (attaque_allie <= 2){
		attaque(allie,boss) ;
	}else if (attaque_allie <= 3) {
		soin(allie);
	}else if (attaque_allie <= 6) {
		soin(hero);
	tour++;
	}
};

function jouer(action,nomdusortilege){
	console.log(hero,allie)
	switch(action) {

		case 'attaque' :
		if (true) {};
			console.log("tour : "+tour);
			attaque(hero,boss);
			console.log(" ");
			allie_tour();
			console.log(" ");
			boss_tour();
		break;

		case 'defence' :
			console.log("tour : "+tour);
			defence(hero);
			console.log(" ");
			allie_tour();
			console.log(" ");
			boss_tour();
		break;

		case 'sortilège' :
			console.log("tour : "+tour);
			console.log("choisi le sort");
			switch(nomdusortilege){
				case 'flammara' :
				flammara(hero,boss);
				break;
				case 'slashthra' :
				slashthra(hero,boss);
				break;
				case 'crashsmash' :
				crashsmash(hero,boss);
				break;
				default:
					console.log("sort non reconnu");
				}	
			console.log(" ");
			allie_tour();
			console.log(" ");
			boss_tour();
		break;

		case 'soin' :
			console.log("tour : "+tour);
			soin(hero)
			console.log(" ");
			allie_tour();
			console.log(" ");
			boss_tour();
		break;

		case 'boost' :
			console.log("tour : "+tour);
			boost(hero)
			console.log(" ");
			allie_tour();
			console.log(" ");
			boss_tour();
		break;

		default :
			debug();		
		}
		if (hero.vie <= 0) {
			console.log("Game over reset for continue ...");
			hero.vie = 0
		}
		if (boss.vie <= 0) {
			console.log("%c felicitation ta exploser le boss: "+boss.nom+" !!!", "color:purple");
			boss.vie = 0
		}
		if (tour) {
			tour++
		};
	};