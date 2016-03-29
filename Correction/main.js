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
	canvas.width = 5000;
	canvas.height = 5000;
	//ajout de la balise au body
	document.body.appendChild(canvas);
	//requestAnimFrame
	setInterval(GameLoop,1000/2);
}
function GameLoop(){
	DrawMap();
}

function DrawMap(){
	var img = context.createImageData(2,1);	
	//ne pas répéter "img.data[]" !
	//premier pixel
	img.data[0] = Math.round(Math.random()*5);
	img.data[1] = Math.round(Math.random()*100);
	img.data[2] = Math.round(Math.random()*25);
	img.data[3] = 255;
	//second
	img.data[4] = Math.round(Math.random()*5);
	img.data[5] = Math.round(Math.random()*5);
	img.data[6] = Math.round(iMath.random()*255);
	img.data[7] = 255;
	
	for(var j = Math.round(Math.random()*canvas.height); j < canvas.height;
	j += Math.round(Math.random()*canvas.height) ) {
		for(var i = Math.round(Math.random()*canvas.width);
		i < canvas.width; i+=Math.round(Math.random()*canvas.width)){
			context.putImageData(img,i,j);
		}	
	}
}