//https://github.com/Herondil
//https://github.com/Herondil/HTML5GameCoding/tree/master

console.log("Déplacement");

// réglages manuels
var hauteurMap    = 10;
var largeurMap		= 20;
var carMur				= "M";
var carSol				= " ";

var spritPerso		= ["%c^%c","%cv%c","%c<%c","%c>%c"];
var spritMechant	= ["%cA%c","%cZ%c","%cE%c","%cR%c","%cT%c","%cY%c"];

var couleurPerso	= "color : #e2f";


// valeur pour code
var map              = [];
var dessinMap        = [];
var CSS							 = [];
var carPerso				 = spritPerso[0];
var carMechant			 = spritMechant[0];
var pos_y            = 0;	var pos_y_mechant = 0;
var pos_x            = 0;	var pos_x_mechant = 0;
var result           = "";
var mooving          = false;
var direction        = "";
var directionMechant = "";
var compteur         = 0;

function init(){
	// création de la map
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
}


//////////////////////////////////////GAME//////LOOP///
///////////////////////////////////////////////////////

setInterval(GameLoop,1000/13); // 2 fois par seconde

function GameLoop(input)
{
	if (compteur==0) {init();}
	calculDeplacementMechant(directionMechant);
	calculDeplacement(direction);
	afficheMap();
	mooving=false;
	compteur++;
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
	switch (e.keyCode)
	{
		case 111:
			direction="haut";
			moving=true;
		break;

		case 108:
			direction="bas";
			moving=true;
		break;

		case 107:
			direction="gauche";
			moving=true;
		break;

		case 109:
			direction="droite";
			moving=true;
		break;

		default:
		break;
	}
	switch (e.keyCode)
	{
		case 122:
			directionMechant="haut";
			moving=true;
		break;

		case 115:
			directionMechant="bas";
			moving=true;
		break;

		case 113:
			directionMechant="gauche";
			moving=true;
		break;

		case 100:
			directionMechant="droite";
			moving=true;
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
	}
}

function calculDeplacementMechant(input)
{
	var pos_y_new = 0;
	var pos_x_new = 0;

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
	//direction="";
	carMechant = spritMechant[compteur%spritMechant.length];
	if (map[pos_y_new][pos_x_new]==carSol)
	{
		map[pos_y_mechant][pos_x_mechant]=carSol;
		pos_y_mechant=pos_y_new;
		pos_x_mechant=pos_x_new;
		map[pos_y_new][pos_x_new]=carMechant;
	}else if(map[pos_y_new][pos_x_new]==carPerso){
		map[pos_y_mechant][pos_x_mechant]=carSol;
		pos_y_mechant=pos_y_new;
		pos_x_mechant=pos_x_new;
		map[pos_y_new][pos_x_new]=carMechant;
		compteur=-1;
	}
}