//https://github.com/Herondil
//https://github.com/Herondil/HTML5GameCoding/tree/master/Correction
console.log("Bonjour et bienvenu sur le simulateur de combat ultra réaliste: \"L'Elisium\"\n"+
	"Chaque sujet peut réaparaitre deux fois. Si un sujet meurt, il perd un item aléatoire de son inventaire. "+
	"Si un sujet réussi a se suicider, il garde son équipement... Le retrait d'item ne peut pas être mortel.\n\n"+
	"Pour faire une action, il suffit d'entrer cette commande:\n"+
	"GameLoop(sujet,'action',sujet_cible)\n\n"+
	"Voici une liste des sujets:\n"+
	"'Sheepok' 'Semoon' 'Arendil' 'Leubogos' 'Mattplajia'\n\n"+
	"Voici une liste des actions:"+
	"\n'rechercher' > Permet de chercher un équipement dans l'Elisium. Il y a 50% de chance d'en trouver un. "+
	"(Attention ! Cette action consomme un tour au sujet qui l'utilise)"+
	"\n'attaquer' > Permet d'attaquer un sujet choisis, présent dans l'Elisium (il faudra donc choisir une cible)"+
	"\n'saboter' > Permet de supprimer un objet aléatoirement dans l'inventaire d'un sujet (il faudra donc choisir une cible). "+
	"Si la cible est vous même, le sabotage réussira obligatoirement, et l'action ne consommera pas de tour."+
	"\n'inventaire' > Permet de visualiser l'inventaire d'un sujet (cette action ne consomme pas de tour)"+
	"\n\n(Des actions de débuff sont a prévoir à l'avenir)");
function item(nom,vie,armure,dmg,puissance){
	this.nom		=	nom;
	this.vie		=	vie;
	this.armure		=	armure;
	this.dmg		=	dmg;
	this.puissance	=	puissance;
}

var ITEMS = [];
for (var i = 1; i <= 1999; i++) {
	var nom_item	="item"+i;
	var vie			= Math.round(Math.random()*50);
	var armure		= Math.round(Math.random()*4);
	var dmg			= Math.round(Math.random()*10);
	var puissance 	= Math.round(Math.random()*8);
	var itemRand = new item(nom_item,vie,armure,dmg,puissance);
	ITEMS.push(itemRand);
}

function player(nom,nbVie,vie,armure,dmg,puissance,inventaire){
	var inventaire = [];

	this.nom		=	nom;
	this.nbVie		=	nbVie;
	this.vie		=	vie;
	this.vieBase	=	vie;
	this.armure		=	armure;
	this.dmg		=	dmg;		//attaque minimum du perso
	this.puissance	=	puissance;	//valleur ajouté au dmg pour deffinir l'attaque maximum
	this.inventaire =	inventaire;
//	this.etatDeff	=	false;
}
// liste des joueurs	"nom"				vie		arm	dmg	pui
var Sheepok = new player('Sheepok',3,		160,	2,	8,	3);
var Semoon 	= new player('Semoon',3,		150,	3,	1,	11);
var Arendil = new player('Arendil',3,		210,	2,	3,	8);
var Leubogos= new player('Leubogos',3,		180,	3,	5,	3);
var Mattplajia = new player('Mattplajia',3,	380,	1,	1,	1);


function ajout_inventaire(nom_player,no_item)
{
	if(no_item>0 && no_item<=ITEMS.length)
	{
		if(nom_player.inventaire.length<6)
		{
			nom_player.vie 			+=	ITEMS[no_item].vie;
			nom_player.armure		+=	ITEMS[no_item].armure;
			nom_player.dmg 			+=	ITEMS[no_item].dmg;
			nom_player.puissance	+=	ITEMS[no_item].puissance;
			nom_player.inventaire.push(ITEMS[no_item]);
		}
		else
		{
			return("L'inventaire est plein. L'item ne peut pas y être ajouté");
		}
	}
	else
	{
		return("Une erreur est survenu, aucun item n'a été ajouté à l'inventaire du joueur "+nom_player);
	}
}

function sup_inventaire_rand(nom_player,no_item){
	if((no_item>=0) && (no_item<nom_player.inventaire.length))
	{
		console.log("no_item = "+no_item);
		nom_player.vie 			-=	nom_player.inventaire[no_item].vie;
		if(nom_player.vie<=0){nom_player.vie=1;}
		nom_player.armure		-=	nom_player.inventaire[no_item].armure;
		nom_player.dmg 			-=	nom_player.inventaire[no_item].dmg;
		nom_player.puissance 	-=	nom_player.inventaire[no_item].puissance;
		return("Un item a été supprimé de l'inventaire de "+nom_player.nom+
			"\nIl offrait:\n"+
			"\n > "+nom_player.inventaire[no_item].vie+" pt de VIE"+
			"\n > "+nom_player.inventaire[no_item].armure+" pt d'ARMURE"+
			"\n > "+nom_player.inventaire[no_item].dmg+" pt de DOMAGE"+
			"\n > "+nom_player.inventaire[no_item].puissance+" pt de PUISSANCE"+
			"\n\n"+nom_player.nom+" a maintenant:\n"+
			"\n Vie > "+nom_player.vie+
			"\n Arm > "+nom_player.armure+
			"\n Dmg > "+nom_player.dmg+
			"\n Pui > "+nom_player.puissance);
		nom_player.inventaire.splice(no_item,1);
	}
	else if(nom_player.inventaire.length<=0)
	{
		return("Aucun item n'est present dans l'inventaire de "+nom_player.nom);
	}
	else
	{
		return("Aucun item n'a été supprimé de l'inventaire de "+nom_player.nom);
	}
}


function sup_inventaire(nom_player,nom_item){
	console.log("nom_item = "+nom_item);
	var indiceItem = 0;
	while(true) // on cherche l'indice de l'inventaire correspondant à l'item
	{
		if(nom_player.inventaire[indiceItem].nom == nom_item){
			break;
		}else{
			indiceItem++;
		}

		if (indiceItem>nom_player.inventaire.length){break;}
	}
	console.log("indiceItem = "+indiceItem);
	if(indiceItem>=0)
	{
		nom_player.vie 			-=	nom_player.inventaire[indiceItem].vie;
		nom_player.armure		-=	item.armure;
		nom_player.dmg 			-=	item.dmg;
		nom_player.puissance 	-=	item.puissance;
		nom_player.inventaire.splice((nom_player.inventaire.indexOf(item)),1);
		return("L'item a été supprimé de l'inventaire de "+nom_player.nom);
	}else{
		return("Cet item n'est pas présent dans l'inventaire de "+nom_player.nom);
	}
}


function aff_inventaire(nom_player)
{
	if (nom_player.inventaire.length>0)
	{
		var result="inventaire du perso:\n\n";
		var i=0;
		while(true)
		{
			result+="-"+nom_player.inventaire[i].nom
				+"\n vie = "+nom_player.inventaire[i].vie
				+"\n armure = "+nom_player.inventaire[i].armure
				+"\n dégat = "+nom_player.inventaire[i].dmg
				+"\n puissance = "+nom_player.inventaire[i].puissance;
			i++;
			if (i>=nom_player.inventaire.length)
			{
				break;
			}
			result+="\n\n --- \n";
		}
	}
	else
	{
		result="L'inventaire est vide."
	}
	return(result);
}

var textFeedBack 	= "";
var nbTour			= 1;
var tourPass		= true;

var test = 42;
function GameLoop(nom_player,action,nom_cible)
{
	textFeedBack="Tour "+nbTour+"\n\n";
	switch(action)
	{
		case "attaquer":
			attaquer(nom_player,nom_cible);
		break;
/*
		case "protéger":
			proteger(nom_player,nom_cible);
		break;
*/
		case "rechercher":
			textFeedBack+=rechercher(nom_player);
		break;

		case "saboter":
			textFeedBack+=saboter(nom_player,nom_cible);
		break;

		case "inventaire":
			textFeedBack=aff_inventaire(nom_player);
			tourPass=false;
		break;

		default:
			textFeedBack="Commande invalide. Les parametres sont GameLoop(nom_player,action,nom_cible)"+
			"\nliste des actions: 'attaquer', 'rechercher', 'saboter', 'inventaire'"+
			"\nnom_cible est facultatif pour les actions 'rechercher' et 'inventaire'";
			tourPass=false;
	}
	console.log(textFeedBack)
	textFeedBack="";
	if(tourPass){nbTour++;}
	tourPass=true;
}

function attaquer(nom_player,nom_cible)
{
	if(nom_player.vie<=0)
	{
		textFeedBack=nom_player.nom+" est actuellement décédé";
		tourPass=false;
	}
	else if(nom_cible.vie<=0)
	{
		textFeedBack="Votre cible ("+nom_cible.nom+") est déjà morte. Ce n'est pas très gentil de s'acharner ainsi..."
	}
	else
	{
		// dégat du player de base:
		var player_degat=Math.round(Math.random()*nom_player.puissance+nom_player.dmg);
		textFeedBack+="Vous attaquez à "+player_degat+" sur "+nom_cible.nom+" !";

		// dégat après reduction par armure:
		if (nom_cible.armure!=0)
		{
			player_degat+=-nom_cible.armure;
			if (player_degat<0){player_degat=0;}

			textFeedBack+="\nIl bloque "+nom_cible.armure;
			if(player_degat>1){
				textFeedBack+=" et reçoit donc "+player_degat+" dégats !";
			}else if(player_degat>0){
				textFeedBack+=" et reçoit donc "+player_degat+" dégat !";
			}else{
				textFeedBack+=". Il ne reçoit aucun dégat";
			}
		}

		// Calcul de la vie des joueurs après l'attaque:
		nom_cible.vie-=player_degat;
		if (nom_cible.vie<=0)
		{
			nom_cible.vie=0;
			nom_cible.nbVie--;

			if (nom_cible.nom==nom_player.nom) {
				textFeedBack+="\nFélicitation: Vous vous êtes suicidé ! Vous ne perdez aucun item";
			}else{
				textFeedBack+="\nVous avez tué "+nom_cible.nom;
				var j = Math.round(Math.random()*(nom_cible.inventaire.length-1));
				console.log(j);
				sup_inventaire_rand(nom_cible,j);
			}

			if(nom_cible.nbVie<=0){
				textFeedBack+="\n"+nom_cible.nom+" vien d'être effacé de l'Elisium. "+nom_player.nom+" l'a totalement éliminé";
			}else{
				nom_cible.vie=nom_cible.vieBase;
				textFeedBack+="\n\n"+nom_cible.nom+" vien de respawn avec "+nom_cible.vie;
				for (var i = 0; i < nom_cible.inventaire.length; i++) {
					nom_cible.vie += nom_cible.inventaire[i].vie;
				}
				textFeedBack+="\n"+nom_cible.nom+" a desormais "+nom_cible.vie+" Grâce à son équipement";
			}
		}
		else
		{
			textFeedBack+="\nIl reste "+nom_cible.vie+" HP à "+nom_cible.nom;
		}
	}
}

/*
function proteger(nom_player,nom_cible)
{
	var player_defense = nom_player.armure*2;
}
*/

function rechercher(nom_player)
{
	var result="";
	if (nom_player.vie<=0)
	{
		result=nom_player.nom+" est actuellement décédé";
		tourPass=false;
	}
	else
	{
		var chance = Math.round(Math.random()*2);
		result ="Vous avez une chances sur 2 de trouver un item\n";
		if(chance<=1)
		{
			var i = Math.round(Math.random()*ITEMS.length);
			ajout_inventaire(nom_player,i);
			result+="\nEt vous l'avez trouvé !\n"+aff_inventaire(nom_player);
		}
		else
		{
			result+="Vous n'avez rien trouvé... Domage";
		}	
	}
	return(result);	
}

function saboter(nom_player,nom_cible)
{
	if(nom_cible.inventaire.length>0)
	{
		var result="";
		var i=0;
		if(nom_player==nom_cible)
		{
			i = Math.round(Math.random()*(nom_cible.inventaire.length-1));
			tourPass=false;
		}
		else
		{
			i = Math.round(Math.random()*5);
		}
		console.log("i = "+i); ////
		result+=sup_inventaire_rand(nom_cible,i);
		return(result);
	}else{
		tourPass=false;
		return("L'inventaire du sujet ciblé est vide... Vous n'avez pas perdu de tour");
	}
}