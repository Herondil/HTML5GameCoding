var map = [
["M","M","M","M","M","M","M","M"],
["M","_","_","M","M","_","_","M"],
["M","_","_","M","_","M","_","M"],
["M","_","_","M","S","_","_","M"],
["M","_","_","_","_","_","M","M"],
["M","_","_","M","_","M","_","M"],
["M","_","_","M","_","_","_","M"],
["M","_","_","M","_","_","_","M"],
["M","_","P","M","_","_","_","M"],
["M","_","_","M","_","_","_","M"],
["M","M","M","M","M","M","M","M"]
];
var taillemurs = 2,
	block = "%c",
	couleurmurs = "#000",
	couleursols = "#f40",
	couleurjoueur = "#f80",
	couleursortie = "#b4d455";
for(var i = 0; !(i == taillemurs); i++){
	block += " ";
}
setInterval(GameLoop,1000);
function GameLoop(input){
	MovePlayer(input);
	DrawMap();
}

function MovePlayer(input){
	
}

function DrawMap(){
	//prévoir un espace pour les cases vides
	//un bloc noir pour les murs console.log("%c ","background: #000")
	//une lettre verte pour le joueur
	var	tablcss = [],
		ligne = "",
		casecourante = 0,
		lignecourante = 0;
		
	while(true){
		casecourante = 0;
		ligne = "";
		tablcss = [];
		
		while(true){
			ligne += block;
			if(map[lignecourante][casecourante]=="M"){
				tablcss.push("background : " + couleurmurs);
			}
			if(map[lignecourante][casecourante]=="_"){
				tablcss.push("background : " + couleursols);
			}
			if(map[lignecourante][casecourante]=="P"){
				tablcss.push("background : " + couleurjoueur);
			}
			if(map[lignecourante][casecourante]=="S"){
				tablcss.push("background : " + couleursortie);
			}
			casecourante++;
			if(casecourante == 8){
				break;
			}
		}
		console.log(ligne, tablcss[0],tablcss[1],
					tablcss[2],tablcss[3],tablcss[4],
					tablcss[5],tablcss[6],tablcss[7]);
		
		lignecourante++;
		if(lignecourante == 11){
		break;
		}
	}
	
	
}