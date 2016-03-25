document.body.onload = function(){
	var map = [
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
	//ajout de la balise au body
	document.body.appendChild(canvas);
	//requestAnimFrame
	setInterval(GameLoop,1000/60);
}
function GameLoop(){
	DrawMap();
}

function DrawMap(){
	var img = context.createImageData(1,1);
	//ne pas répéter "img.data[]" !
	img.data[0] = 130;
	img.data[1] = 50;
	img.data[2] = 23;
	img.data[3] = 255;	
	context.putImageData(img,10,10);
	context.putImageData(img,10,15);
}