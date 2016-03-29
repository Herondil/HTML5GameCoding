var map = [
		['M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['L','L','L','L','L','L','L','L','L','L','L','L','L','L','L','L',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','_','_','_','_','_','_','_','_','_','_','_','_','_','_','M',],
		['M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M',]
];

// pos Joueurs
var pos_joueur1_A = 2,
	pos_joueur1_B = 4;

var pos_joueur2_A = 19,
	pos_joueur2_B = 8;

// pos tirs
var pos_tir_j1_A,
	pos_tir_j1_B,
	pos_tir_j2_A,
	pos_tir_j2_B;

//Options
var taillemurs = 3,
	block = "%c",
	couleurmurs = "#000",
	couleurlimite = "#ff3f00",
	couleurprojectile = "#2BFF11",
	couleursols = "#CCC",
	couleurjoueur1 = "#0011FF",
	couleurjoueur2 = "#F00";
for(var i = 0; !(i == taillemurs); i++){
	block += " ";
}



function movement_joueur1(direction){
	map[pos_joueur1_A][pos_joueur1_B] = "_";
	switch(direction){
		case "gauche":
			if(map[pos_joueur1_A][pos_joueur1_B-1] != "M"){
				pos_joueur1_B--;
			};
		break;
		case "droite":
			if(map[pos_joueur1_A][pos_joueur1_B+1] != "M"){
				pos_joueur1_B++;
			};
		break;
		case "haut":
			if(map[pos_joueur1_A-1][pos_joueur1_B] != "M"){
				pos_joueur1_A--;
			};
		break;
		case "bas":
			if(map[pos_joueur1_A+1][pos_joueur1_B] != "M" && map[pos_joueur1_A+1][pos_joueur1_B] != "L"){
				pos_joueur1_A++;
			};
		break;
	}
	map[pos_joueur1_A][pos_joueur1_B] = "J1";
}

// function tir_joueur1(){
// 	pos_tir_j1_A = pos_joueur1_A+1;
// 	pos_tir_j1_B = pos_joueur1_B;
// 	map[pos_tir_j1_A][pos_tir_j1_B] = "_";
// }

// function movement_tir_1(){
// 	if(map[pos_tir_j1_A] < 19){
// 		if(map[pos_tir_j1_A+1] == "L"){
// 			pos_tir_j1_A+2;
// 		} else {
// 			pos_tir_j1_A++;
// 		}
// 	}
// 	map[pos_tir_j1_A][pos_tir_j1_B] = "tir";
// }

function movement_joueur2(direction){
	map[pos_joueur2_A][pos_joueur2_B] = "_";
	switch(direction){
		case "gauche":
			if(map[pos_joueur2_A][pos_joueur2_B-1] != "M"){
				pos_joueur2_B--;
			};
		break;
		case "droite":
			if(map[pos_joueur2_A][pos_joueur2_B+1] != "M"){
				pos_joueur2_B++;
			};
		break;
		case "haut":
			if(map[pos_joueur2_A-1][pos_joueur2_B] != "M" && map[pos_joueur2_A-1][pos_joueur2_B] != "L"){
				pos_joueur2_A--;
			};
		break;
		case "bas":
			if(map[pos_joueur2_A+1][pos_joueur2_B] != "M"){
				pos_joueur2_A++;
			};
		break;
	}
	map[pos_joueur2_A][pos_joueur2_B] = "J2";
}

// function tir_joueur2(){
	
// }

function DrawMap(){
	var	tablcss = [],
		ligne = "",
		casecourante = 0,
		lignecourante = 0;
		
	while(true){
		casecourante = 0;
		//ligne = "";
		//tablcss = [];
		
		while(true){
			ligne += block;
			if(map[lignecourante][casecourante]=="M"){
				tablcss.push("background : " + couleurmurs);
			}
			if(map[lignecourante][casecourante]=="_"){
				tablcss.push("background : " + couleursols);
			}
			if(map[lignecourante][casecourante]=="J1"){
				tablcss.push("background : " + couleurjoueur1);
			}
			if(map[lignecourante][casecourante]=="J2"){
				tablcss.push("background : " + couleurjoueur2);
			}
			if(map[lignecourante][casecourante]=="L"){
				tablcss.push("background : " + couleurlimite);
			}
			if(map[lignecourante][casecourante]=="tir"){
				tablcss.push("background : " + couleurprojectile);
			}
			casecourante++;
			if(casecourante == map[lignecourante].length){
				break;
			}
		}

		lignecourante++;
		ligne+="\n";

		if(lignecourante == map.length){
		break;
		}
	}
	
	console.log(ligne, ...tablcss);
}

function gameLoop(direction) {
	movement_joueur1(direction);
	movement_tir_1();
	movement_joueur2(direction);
	DrawMap();
}

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return;
  }

  switch (event.code) {
    case "Numpad5":
    	movement_joueur2('bas');
    	break;
    case "Numpad8":
    	movement_joueur2('haut');
     	break;
    case "Numpad4":
    	movement_joueur2('gauche');
    	break;
    case "Numpad6":
     	movement_joueur2('droite');
    	break;
    case "KeyD":
    	movement_joueur1('droite');
    	break;
    case "KeyW":
    	movement_joueur1('haut');
    	break;
    case "KeyS":
    	movement_joueur1('bas');
    	break;
    case "KeyA":
    	movement_joueur1('gauche');
    	break;
    // case "Numpad0" :
    // 	tir_joueur2();
    // 	break;
    case "Space" :
    	tir_joueur1();
    	break;
    default:
      return;
  }

  event.preventDefault();
}, true);

setInterval(gameLoop, 500);