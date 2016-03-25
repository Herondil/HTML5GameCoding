console.log("Jeu de course");

// réglages manuelles
var taille		= 8;

var circuit		= ["#         #\n",
				  "#         #\n",
				  "#         #\n",
				  "#    *    #\n",
				  "#         #\n",
				  "#         #\n",
				  "#         #\n",
				  "#         #\n",
				  "#         #\n"];

//variables pour le code
var pos_x		= Math.round(taille/2);
var result		= "";
var compteur 	= 0;
var pos_y		= 0;
var pos_x_obstacle = 4;
var pos_y_obstacle = 6;

//setInterval(GameLoop,1000/2); 

function GameLoop(input){
	calculPos(input);
	detecteColision();
	afficheCircuit(input);
	compteur++;
}

function calculPos(input)
{
	switch (input)
	{
		case "droite":
			pos_x++;
			// if pour définir une position max
			if(pos_x >= taille){pos_x=taille;}
		break;
		
		case "gauche":
			pos_x--;
			// if pour définir une position min
			if(pos_x <= 0){pos_x=0;}
		break;
	}
	pos_y++;
}
function afficheVoiture(){
	var result = "";
	result+="#"; // mur de gauche
	if(pos_y == pos_y_obstacle){
		// nombre de caractère(s) avant le V
		for	(var i=0; i<pos_x; i++)
		{
			if(i==pos_x_obstacle){
				result+="*";
			}else{
				result+=" ";
			}
		}
		result+="V";
	
		// nombre de caractère(s) après le V
		for	(var i=pos_x+1; i<(taille+1); i++)
		{
			if(i==pos_x_obstacle){
				result+="*";
			}else{
				result+=" ";
			}
		}
		
	}else{
		// nombre de caractère(s) avant le V
		for	(var i=0; i<pos_x; i++)
		{
			result+=" ";
		}
		result+="V";
	
		// nombre de caractère(s) après le V
		for	(var i=0; i<taille-pos_x; i++)
		{
			result+=" ";
		}
		
	}
	result+="#\n"; // mur de droite
	return result;
}
function afficheFinCircuit(){
	if(pos_y == 0){
		return "";
	}else{
		var ligneFin = circuit.length-pos_y;
		var resultat = "";
		for (var i=0; i<ligneFin; i++){
			resultat+=circuit[i];
		}
		return resultat;
	}
}
function afficheDebutCircuit(){
	if(pos_y==circuit.length){
		return "";
	}else{
		var ligneDebut = pos_y;
		var resultat = "";
		for (var i=ligneDebut; i>0; i--){
			resultat+=circuit[circuit.length-i+1];
		}
		return resultat;
	}
}
function afficheCircuit()
{
	result = "";
	result+=afficheFinCircuit();
	result+=afficheVoiture()
	result+=afficheDebutCircuit();
	
	
	console.log(result);
}
function detecteColision(){
	if(pos_x == pos_x_obstacle && pos_y == pos_y_obstacle){
		console.log("Il y a une colision !!!")
	}
}
