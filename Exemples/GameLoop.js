window.document.onclick=function(){
	clicked = true;
};
setInterval(GameLoop, 1000/60);


var compteur = 0,
	clicked	 = false;


function GameLoop(){
	
	Attack();
	compteur ++;
	clicked = false;
}

function Attack(){
	if(clicked){
		console.log("attaque au tour "+compteur);
	}
	
}