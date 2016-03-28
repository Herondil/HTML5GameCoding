document.body.onload = function(){
		
		window.canvas = document.createElement("canvas"),
		window.context = canvas.getContext("2d");


	document.body.appendChild(canvas);  
	setInterval(GameLoop,1000/60);
};

function GameLoop(){
	DrawMap();

}

function DrawMap(){
	var img = context.createImageData(2,1);

	img.data[0] =  Math.round(Math.random()*28);
	img.data[1] =  Math.round(Math.random()*75);
	img.data[2] =  Math.round(Math.random()*180);
	img.data[3] =  Math.round(Math.random()*50);

	img.data[4] =  Math.round(Math.random()*5);
	img.data[5] =  Math.round(Math.random()*170);
	img.data[6] =  Math.round(Math.random()*100);
	img.data[7] =  Math.round(Math.random()*245);


	img.data[8] =  Math.round(Math.random()*28);
	img.data[9] =  Math.round(Math.random()*75);
	img.data[10] =  Math.round(Math.random()*180);
	img.data[11] =  Math.round(Math.random()*50);

	img.data[12] =  Math.round(Math.random()*5);
	img.data[13] =  Math.round(Math.random()*170);
	img.data[14] =  Math.round(Math.random()*100);
	img.data[15] =  Math.round(Math.random()*245);	

	for (var i=0; i<300; i+=10){
		for( var j=0; j<150; j+=15){
		context.putImageData(img,i,j);

		}
	}



}