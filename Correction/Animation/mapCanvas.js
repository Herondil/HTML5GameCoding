document.body.onload = function(){
	window.map = [
		["M","M","M","M","M","M","M","M"],
		["M","_","_","M","M","_","_","M"],
		["M","_","_","M","_","M","_","M"],
		["M","_","_","P","M","_","_","M"],
		["M","_","_","_","_","_","M","M"],
		["M","_","_","M","_","M","_","M"],
		["M","_","_","M","_","_","_","M"],
		["M","_","_","M","_","M","_","M"],
		["M","_","M","M","_","M","_","M"],
		["M","_","_","M","_","M","S","M"],
		["M","M","M","M","M","M","M","M"]
	];
	
		
	//création de la balise
	window.canvas 	= document.createElement("canvas"),
	window.context = canvas.getContext("2d");
	window.wall = context.createImageData(8,8);
	
	for (var x = 0; x < 256; x+=4){
		wall.data[x] = 25;
		wall.data[x+1] = 125;
		wall.data[x+2] = 50;
		wall.data[x+3] = 255;
	}
	window.user = context.createImageData(8,8);
	
	for (var x = 0; x < 256; x+=4){
		user.data[x] = 150;
		user.data[x+1] = 100;
		user.data[x+2] = 50;
		user.data[x+3] = 200;
	}
	window.exit = context.createImageData(8,8);
	
	for (var x = 0; x < 256; x+=4){
		exit.data[x] = 180;
		exit.data[x+1] = 50;
		exit.data[x+2] = 200;
		exit.data[x+3] = 255;
	}
	window.empty = context.createImageData(8,8);
	
	for (var x = 0; x < 256; x+=4){
		empty.data[x] = 180;
		empty.data[x+1] = 180;
		empty.data[x+2] = 180;
		empty.data[x+3] = 255;
	}
	canvas.width = 1280;
	canvas.height = 720;
	//ajout de la balise au body
	document.body.appendChild(canvas);
	//requestAnimFrame
	setInterval(GameLoop,1000/2);
}
function GameLoop(){
	DrawMap();
}

function DrawMap(){
	var casecourante = 0,
		lignecourante = 0;
		
	while(true){
		casecourante = 0;
		
		while(true){
			
			if(map[lignecourante][casecourante]=="M"){
				context.putImageData(wall,
				8*casecourante+5,8*lignecourante+5);
			}
			if(map[lignecourante][casecourante]=="_"){
				context.putImageData(empty,
				8*casecourante+5,8*lignecourante+5);	
			}
			if(map[lignecourante][casecourante]=="P"){
				context.putImageData(user,
				8*casecourante+5,8*lignecourante+5);
			}
			if(map[lignecourante][casecourante]=="S"){
				context.putImageData(exit,
				8*casecourante+5,8*lignecourante+5);
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

	//for (var j = 5; j  < 72; j += 9){
		//context.putImageData(wall,j,5);
	//}
	//context.putImageData(user,18,8);
	//context.putImageData(exit,25,15);
	//context.putImageData(empty,15,35);
}