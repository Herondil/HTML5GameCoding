console.log("Jeu de course");

// réglages manuelles
var taille		= 50;

//variables pour le code
var pos			= Math.round(taille/2);
var result		= "";
var compteur 	= 0;

//setInterval(GameLoop,1000/60); //

function GameLoop(input){
	calculPos(input);
	afficheCircuit(input);
	compteur++;
}

function calculPos(input)
{
	switch (input)
	{
		case "droite":
			pos++;
			// if pour définir une position max
			if(pos >= taille){pos=taille;}
		break;
		
		case "gauche":
			pos--;
			// if pour définir une position min
			if(pos <= 0){pos=0;}
		break;
	}
}

function afficheCircuit()
{
	result+="#"; // mur de gauche
	
	// nombre de caractère(s) avant le V
	for	(var i=0; i<pos; i++)
	{
		result+=" ";
	}
	
	result+="V";
	
	// nombre de caractère(s) après le V
	for	(var i=0; i<taille-pos; i++)
	{
		result+=" ";
	}
	result+="#"; // mur de droite
	console.log(result);
	result="";
}