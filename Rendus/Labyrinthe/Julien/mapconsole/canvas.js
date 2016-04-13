{
	var map = [
	["M","M","M","M","M","M","M","M"],
	["M","_","_","_","_","E","_","M"],
	["M","_","_","_","_","_","_","M"],
	["M","_","_","P","_","_","_","M"],
	["M","M","M","_","_","_","_","M"],
	["M","_","M","_","_","M","M","M"],
	["M","_","M","_","_","M","E","M"],
	["M","_","_","_","_","_","_","M"],
	["M","E","M","_","_","_","_","M"],
	["M","M","M","_","_","_","S","M"],
	["M","M","M","M","M","M","M","M"]
	];
	var taillemurs = 2,
		block 	= "%c",
		pos_x = 3,
		pos_y = 3, 
		direction = '', 
		couleurmurs 	= "#000",
		couleursols 	= "#BCFFFF",
		couleurjoueur 	= "#E8FF25",
		couleurmonstre  = "#f10",
		couleursortie 	= "#48FF25";
		possortie_x     = 6;
		possortie_y     = 9;
		posennemi_x 	= 5;
		posennemi_y		= 1;
	for(var i = 0; !(i == taillemurs); i++){
		block += " ";
	}
	setInterval(GameLoop,1000/30);
	
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
		 
		 if(e.keyCode == 40){
			direction ='bas';
		}
	};	
}

function GameLoop(){
	MovePlayer(direction);
	DrawMap();
	GameWin();
	direction = 'neutre'; 
	
}

function MovePlayer(input){
	
	if(input != '')
	{
		map[pos_y][pos_x] = "_"; 
		switch(input)
		{
			case 'haut':
			{	
				if(	map[pos_y-1][pos_x]!='M')
				{
					pos_y = pos_y -1;
				}	
			
				break;
			}
			case'bas':
			{
				if(map[pos_y+1][pos_x] !='M'){
					pos_y = pos_y+1; 
				
				}
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
			case'sortie':
			{
				if(map[possortie_x][possortie_y]=="S"){
				console.log("vous avez gagné");
				}
			}	
		}
		map[pos_y][pos_x] = "P"; 
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
			if(map[lignecourante][casecourante]=="S"){
				tablcss.push("background : " + couleursortie);
			}
			if(map[lignecourante][casecourante]=="E"){
				tablcss.push("background : " + couleurmonstre);
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
}

function GameWin(){
	possortie_x     = 6;
	possortie_y     = 9;
	if(map[possortie_x][possortie_y]=="S"){
		console.log("vous avez gagné");
	}
	map[possortie_y][possortie_x] = "S"; 
}

function GameLose(){
	posennemi_x     = 5;
	posennemi_y     = 1;
	if(map[posennemi_x][posennemi_y]=="E"){
		console.log("vous avez perdu");
	}
	map[posennemi_x][posennemi_y] = "E";
}