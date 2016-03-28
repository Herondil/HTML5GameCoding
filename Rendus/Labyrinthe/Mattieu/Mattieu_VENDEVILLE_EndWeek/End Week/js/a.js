{
	var map = [
	["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"],
  ["M","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","M"],
	["M","_","E","E","_","_","_","E","E","E","_","E","E","_","E","E","_","E","E","_","E","E","_","E","E","_","M"],
	["M","_","E","E","_","_","_","E","E","E","_","E","E","_","E","E","_","E","E","_","E","E","_","E","E","_","M"],
	["M","_","E","E","_","_","_","E","E","E","_","E","E","_","E","E","_","E","E","_","E","E","_","E","E","_","M"],
	["M","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","M"],
	["M","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","M"],
	["M","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","M"],
	["M","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","M"],
	["M","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","M"],
	["M","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","M"],
	["M","_","_","_","M","M","M","_","_","_","M","_","_","M","_","_","_","_","_","M","_","_","M","_","_","_","M"],
	["M","_","_","_","M","M","M","_","_","_","M","_","_","M","_","_","_","_","_","M","_","_","M","_","_","_","M"],
	["M","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","M"],
	["M","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","M"],
	["M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M","M"]
	];
	var taillemurs      = 2,
      block           = "%c",
      pos_x           = Math.floor((Math.random() * 23) + 1),
      pos_y           = 14,
      pos_x_tir       = pos_x,
      pos_y_tir       = pos_y - 1,
      direction       = '', 
      couleurmurs     = "#000",
      couleursols     = "#042F61",
      couleurjoueur 	= "#f80",
      couleurennemi 	= "#b4d455",
      couleurtir      = "#2838F6",
      defaite         = false;
      temps           = 30;

      score           = 0;


	for(var i = 0; !(i == taillemurs); i++){
		block += " ";
	}
  	setInterval(GameLoop,1000/5);
    setInterval(function(){temps--}, 1000);
  setTimeout(function(){ defaite = true;}, 30000);
	
	window.document.onkeydown = function(e){
		if(e.keyCode == 38){
			direction = 'haut';
		}
		
		if(e.keyCode == 37){
			direction = 'gauche';
		}
		
		if(e.keyCode == 39){
			direction = 'droite';
		}
	};	
}

function GameLoop(){
	if (defaite == false) {
    MovePlayer(direction);
    MoveTir();
    DrawMap();
    direction = 'neutre';
    console.log("Il vous reste : "+temps+" secondes")
  } else if (score >= 1125) {
    clearTimeout();
    console.log("%cVOUS AVEZ GAGNÉ !", 'color: darkgreen; font-size: 40px;')    
  } else if (defaite == true) {
    clearTimeout();
    console.log("%cVOUS AVEZ PERDU !", 'color: red; font-size: 40px;')
  }
	
}

function MovePlayer(input){
	
	if(input != '')
	{
		map[pos_y][pos_x] = "_"; 
		switch(input)
		{
			case 'haut':
			{	
				// if(	map[pos_y-1][pos_x]!='M')
				// {
				// 	pos_y = pos_y -1;
				// }
       
        Tir();

				break;
			}
			case'gauche': 
			{
			if(map[pos_y][pos_x-1] !='M'){
					pos_x = pos_x-1; 
			}
			
				break;
			}	
			case'droite':
			{
				if(map[pos_y][pos_x+1]!='M'){
					pos_x = pos_x + 1;		
				}
				
			 
				break;
			}	
		}
		map[pos_y][pos_x] = "P"; 
	}
}

function Tir(){
  map[pos_y-1][pos_x] = "|";
}

function MoveTir(){
  var casecourante = 0,
      lignecourante = 0;
    
  while(true){
    casecourante = 0;
    
    while(true){
      if(map[lignecourante][casecourante] == "|" && map[lignecourante-1][casecourante] != "M" && map[lignecourante-1][casecourante] != "|"){
        map[lignecourante][casecourante] = "_";
        map[lignecourante-1][casecourante] = "|";

      } else if (map[lignecourante][casecourante] == "|" && map[lignecourante-1][casecourante] == "M") {
        map[lignecourante][casecourante] = "_";        
      } else if (map[lignecourante][casecourante] == "E" && map[lignecourante+1][casecourante] == "|") {
        map[lignecourante][casecourante] = "_";
        map[lignecourante+1][casecourante] = "_";
        score = score + 25;
      }


      casecourante++;
      if(casecourante == map[lignecourante].length){
        break;
      }
    }
    
    
    lignecourante++;
    
    if(lignecourante == map.length){  
      break;
    }
  }
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
			if(map[lignecourante][casecourante]=="P"){
				tablcss.push("background : " + couleurjoueur);
			}

      if(map[lignecourante][casecourante]=="E"){
        tablcss.push("background : " + couleurennemi);
      }

			if(map[lignecourante][casecourante]=="|"){
				tablcss.push("background : " + couleurtir);
			}
			casecourante++;
			if(casecourante == map[lignecourante].length){
				break;
			}
		}
		
		
		lignecourante++;
		ligne += "\n";
		
		if(lignecourante == map.length){	
			break;
		}
	}
	

	console.log(ligne, ...tablcss);
  console.log("%cVotre Score : "+score, 'color: red, font-size: 20px;')
}