//créer quelques objets
var objet = {
		taille: 25,
		poids: 2,
		matiere: "Plastique"
	};
var objet2 = {
		taille: 16,
		poids: 3,
		matiere: "Metal"
	};
var objet3 = {
		taille: 24,
		poids: 7,
		matiere: "Bois"
	};
//créer un inventaire
var inventaire = [objet,objet3,objet3,objet2];
var compteur = 0;
function VoirInventaire(){
	
	//1 Avant la boucle
	var result = "L'inventaire contient : "
	compteur=0;
	while(true)
	//2 Dans la boucle
	{
	var element = inventaire[compteur];
		console.log(element);
		result=result +" "+element.nom;
		compteur=compteur+1;
		console.log(compteur);

		
		if (compteur==inventaire.length)
			break;
	
		//stop et sortie de boucle
		//Break;
	
		//stop et nouveau tour de boucle
		continue;
	};
	
	//3 Après la boucle
	return result;
}