function pile(){
	console.log("vous pensez que se sera pile ?");
	var x = Math.random() ;
	if (x>=0.5) {
		console.log("gagné !!!");
	}
	if (x==0.5) {
		console.log("... joue au loto maintenant");
	}
	if (x<=0.5) {
		console.log("perdu ...");
	}
}