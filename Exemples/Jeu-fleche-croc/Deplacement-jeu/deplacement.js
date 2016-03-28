//https://github.com/Herondil
//https://github.com/Herondil/HTML5GameCoding/tree/master

console.log("Déplacement");

// réglages manuels
var hauteurMap    = 10;
var largeurMap		= 20;
var carMur				= "M";
var carSol				= " ";
var carPoint			= "*";
var vitesse				= 10;

var spritPerso		= ["%c^%c","%cv%c","%c<%c","%c>%c"];
var spritMechant	= ["%cC%c","%cR%c","%cO%c","%cC%c"];

var couleurPerso	= "color : #e2f";


// valeur pour code
var score 					 = 3;
var onPoint					 = false;
var timerPoint			 = 0;
var map              = [];
var dessinMap        = [];
var CSS							 = [];
var carPerso				 = spritPerso[0];
var carMechant			 = spritMechant[0];
var pos_y            = 0;	var pos_y_mechant = 0;	var pos_x_point = 0;
var pos_x            = 0;	var pos_x_mechant = 0;	var pos_y_point = 0;
var result           = "";
var direction        = "";
var directionMechant = "";
var compteur         = 0;
var finJeu 					 = false;
var go 							 = false;

function init(){
	// création de la map
	score-=3;
	map = [];
	for (var i = hauteurMap ; i > 0; i--)
	{
		var terrain ="";
		dessinMap   =[];
		for (var j = largeurMap; j > 0; j--)
		{
			if (i==1 || j==1 || i==hauteurMap || j==largeurMap)
			{
				terrain = carMur;
			}
			else
			{
				var nbRand = Math.round(Math.random()*15);
				if (nbRand>1){
					terrain = carSol;
				}else{
					terrain = carMur;
				}
			}
			dessinMap.push(terrain);
		}
		map.push(dessinMap);
	}

	// position du perso
	direction = "";
	carPerso  = spritPerso[0];
	pos_y     = Math.round(Math.random()*(hauteurMap-3)+2);
	pos_x     = Math.round(Math.random()*(largeurMap-3)+2);
	var playerPret=false;
	while (playerPret!=true)
	{
		if (map[pos_y][pos_x]==carSol)
		{
			map[pos_y][pos_x]=carPerso;
			playerPret = true;
		}
		else
		{
			pos_y = Math.round(Math.random()*(hauteurMap-3)+2);
			pos_x = Math.round(Math.random()*(largeurMap-3)+2);
		}
	}

	// position du mechant
	directionMechant = "";
	carMechant  = spritMechant[0];
	pos_y_mechant = Math.round(Math.random()*(hauteurMap-3)+2);
	pos_x_mechant = Math.round(Math.random()*(largeurMap-3)+2);
	var mechantPret=false;
	while (mechantPret!=true)
	{
		if (map[pos_y_mechant][pos_x_mechant]==carSol)
		{
			map[pos_y_mechant][pos_x_mechant]=carMechant;
			mechantPret = true;
		}
		else
		{
			pos_y_mechant = Math.round(Math.random()*(hauteurMap-3)+2);
			pos_x_mechant = Math.round(Math.random()*(largeurMap-3)+2);
		}
	}

	// position point
	placementPoint();
}


//////////////////////////////////////GAME//////LOOP///
///////////////////////////////////////////////////////

setInterval(GameLoop,1000/vitesse); // 2 fois par seconde

function GameLoop(input)
{
	if (go)
	{
		if (compteur==0) {init();}
		verifFinJeu();
		if (finJeu)
		{
			afficheFinJeu();
		}
		else
		{
			calculDeplacementMechant(directionMechant);
			calculDeplacement(direction);
			afficheMap();
			afficheScore();
			compteur++;
			timerPoint++;
			if (timerPoint==10*vitesse){placementPoint();}
		}
	}else{
		console.log("ATTENTION ! Ne fonctionne que sur chrome (normalement)\n\n"+
			"Le but de la flèche est d'atteindre les 15 points. Pour chaque étoile attrapé"+
			", elle gagne 1 point."+
			"\nLe but du croqueur est de croquer la flèche pour faire descendre ses points à néant."+
			" Chaque fois qu'il la touche, la flèche perd 3 points."+
			"\n\nLes touches du perso 'La Flèche' > o(haut) k(gauche) l(bas) m(droite)"+
			"\nLes touches du perso 'Le croqueur' > z(haut) q(gauche) s(bas) d(droite)"+
			"\n\nAppuyez sur Enter pour commencer !"
			);
	}
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/*
function colorMap()
{
	CSS = [];
	for (var i = 0; i <= map.length - 1; i++)
	{
		//console.log("%c i = "+i,"color : #f22;");
		for (var j = 0; j <= map[i].length - 1; j++)
		{
			//console.log("j = "+j);

			if (map[i][j]==carMur)
			{
				CSS.push(couleurMur);
			}
			if (map[i][j]==carSol)
			{
				CSS.push(couleurSol);
			}
		}
	}
}*/

function afficheMap()
{
	result="";
	for (var i = map.length - 1; i >= 0; i--)
	{
		result+="\n"+map[i].join(" ");
	}
	console.log(result,couleurPerso,"background : #fff",couleurPerso,"background : #fff");
}

window.document.onkeypress = getInput;

function getInput(e)
{
	if(e.keyCode==13)
	{
		go = true;
	}
	switch (e.keyCode)
	{
		case 111: // touche 'o'
			direction="haut";
		break;

		case 108: // touche 'l'
			direction="bas";
		break;

		case 107: // touche 'k'
			direction="gauche";
		break;

		case 109: // touche 'm'
			direction="droite";
		break;

		default:
		break;
	}
	switch (e.keyCode)
	{
		case 122: // touche 'z'
			directionMechant="haut";
		break;

		case 115: // touche 's'
			directionMechant="bas";
		break;

		case 113: // touche 'q'
			directionMechant="gauche";
		break;

		case 100: // touche 'd'
			directionMechant="droite";
		break;

		default:
		break;
	}
}
function calculDeplacement(input)
{
	var pos_y_new = 0;
	var pos_x_new = 0;

	switch (input)
	{
		case "haut":
			pos_x_new = pos_x;
			pos_y_new =	pos_y + 1;
			carPerso  = spritPerso[0];
		break;

		case "bas":
			pos_x_new = pos_x;
			pos_y_new =	pos_y - 1;
			carPerso  = spritPerso[1];
		break;

		case "gauche":
			pos_x_new = pos_x - 1;
			pos_y_new =	pos_y;
			carPerso  = spritPerso[2];
		break;

		case "droite":
			pos_x_new = pos_x + 1;
			pos_y_new =	pos_y;
			carPerso  = spritPerso[3];
		break;

		default:
		break;
	}
	//direction="";
	//carPerso = spritPerso[compteur%spritPerso.length];

	if (map[pos_y_new][pos_x_new]==carSol)
	{
		map[pos_y][pos_x]=carSol;
		pos_y=pos_y_new;
		pos_x=pos_x_new;
		map[pos_y_new][pos_x_new]=carPerso;
	}else if(map[pos_y_new][pos_x_new]==carMechant){
		map[pos_y][pos_x]=carSol;
		compteur=-1;	
	}else if(map[pos_y_new][pos_x_new]==carPoint){
		map[pos_y][pos_x]=carSol;
		pos_y=pos_y_new;
		pos_x=pos_x_new;
		map[pos_y_new][pos_x_new]=carPerso;
		score++;
		placementPoint();
		
	}
}

function afficheScore()
{
	console.log("score : "+score);
}

function calculDeplacementMechant(input)
{
	var pos_y_new = 0;
	var pos_x_new = 0;

	if (compteur>(vitesse*2))
	{
		switch (input)
		{
			case "haut":
				pos_x_new = pos_x_mechant;
				pos_y_new =	pos_y_mechant + 1;
			break;

			case "bas":
				pos_x_new = pos_x_mechant;
				pos_y_new =	pos_y_mechant - 1;
			break;

			case "gauche":
				pos_x_new = pos_x_mechant - 1;
				pos_y_new =	pos_y_mechant;
			break;

			case "droite":
				pos_x_new = pos_x_mechant + 1;
				pos_y_new =	pos_y_mechant;
			break;

			default:
			break;
		}	
	}
	
	if (timerPoint==0){
		onPoint=false;
	}
	//direction="";
	carMechant = spritMechant[compteur%spritMechant.length];
	if (map[pos_y_new][pos_x_new]==carSol)
	{
		if (onPoint)
		{
			map[pos_y_mechant][pos_x_mechant]=carPoint;
			onPoint=false;
		}
		else
		{
			map[pos_y_mechant][pos_x_mechant]=carSol;
		}
		pos_y_mechant=pos_y_new;
		pos_x_mechant=pos_x_new;
		map[pos_y_new][pos_x_new]=carMechant;
	}else if(map[pos_y_new][pos_x_new]==carPerso){
		map[pos_y_mechant][pos_x_mechant]=carSol;
		pos_y_mechant=pos_y_new;
		pos_x_mechant=pos_x_new;
		map[pos_y_new][pos_x_new]=carMechant;
		compteur=-1;
	}else if(map[pos_y_new][pos_x_new]==carPoint){
		map[pos_y_mechant][pos_x_mechant]=carSol;
		pos_y_mechant=pos_y_new;
		pos_x_mechant=pos_x_new;
		map[pos_y_new][pos_x_new]=carMechant;
		onPoint=true;
	}
}

function placementPoint()
{
	// position point
	if (map[pos_y_point][pos_x_point]==carPoint)
	{
		map[pos_y_point][pos_x_point]=carSol;
	}
	pos_y_point = Math.round(Math.random()*(hauteurMap-3)+2);
	pos_x_point = Math.round(Math.random()*(largeurMap-3)+2);
	var mechantPret=false;
	while (mechantPret!=true)
	{
		if (map[pos_y_point][pos_x_point]==carSol)
		{
			map[pos_y_point][pos_x_point]=carPoint;
			mechantPret = true;
		}
		else
		{
			pos_y_point = Math.round(Math.random()*(hauteurMap-3)+2);
			pos_x_point = Math.round(Math.random()*(largeurMap-3)+2);
		}
	}
	timerPoint = 0;
}

function verifFinJeu()
{
	if (score==15)
	{
		finJeu = true;
	}
	if (score<=-1)
	{
		finJeu = true;
	}
}

function afficheFinJeu()
{
	if (score>=15)
	{
		console.log("\n\n\nLa fleche a 15 pts > c'est gagné pour elle !");
	}
	if (score<=0){
		console.log("\n\n\nLe croqueur a croquer la flèche alors qu'elle n'avait plus assez de point pour vivre > C'est gagné pour lui !")
	}
}