var attaque_list = [];
var vie_list = [];
var famille =["Eau","Feu","Terre","Vent"];
var deck = [];
var cartes = [];
var numero_carte = 0;
var numero_famille = 0;
var total_cartes = 10000;
var nombre_cartes_par_famille = (total_cartes/famille.length);

while(true){
    for (var j = 0; j < nombre_cartes_par_famille; j++) {
        var attaque = Math.round(Math.random()*100);
        var vie = Math.round(Math.random()*1000);
        //boucle qui v�rifie les cartes en doubles.
        for (var i = 0; i < attaque.length; i++) {
            if (attaque == attaque_list[i] && vie == vie_list[i]) {
                attaque = Math.round(Math.random()*100);
                vie = Math.round(Math.random()*1000);
                continue;
            }else{
                attaque_list.push(attaque);
                vie_list.push(vie);
                break;
            }
        };
        var carte = { 
            nom : numero_carte,
            attaque : attaque,
            vie: vie,
            famille: famille[numero_famille]
        }
        numero_carte++;
        cartes.push(carte);
    };
    numero_famille++;
    if (numero_carte >= total_cartes-1) {
        break;
    };
}
cartes.sort();

//------------------------------------------------------- Voire Cartes ------------------------------------------------------

function voire_cartes(){
    for (var i = 0; i < cartes.length; i++) {
        console.log("Cartes num�ro "+(i+1));
        console.log("NOM : "+cartes[i].nom+" / ATTAQUE : "+cartes[i].attaque+" / VIE : "+cartes[i].vie+" / FAMILLE : "+cartes[i].famille+"/");
        console.log(" ");
    };
    return "Affichage des cartes... Cartes trouv� : "+cartes.length;
}

//-------------------------------------------------------- Voire Deck -------------------------------------------------------

function voire_deck(){
    for (var i = 0; i < deck.length; i++) {
        console.log("Cartes num�ro "+(i+1));
        console.log("NOM : "+deck[i].nom+" / ATTAQUE : "+deck[i].attaque+" / VIE : "+deck[i].vie+" / FAMILLE : "+deck[i].famille+"/");
        console.log(" ");
    };
    return "Affichage du deck... Taille du deck : "+deck.length;
}

//------------------------------------------------------- Ajout Carte ------------------------------------------------------

function ajout_carte(nom,attaque,vie){
    var carte = { 
        nom : nom,
        attaque : attaque,
        vie: vie
    };
    if (nom.length < 3) {
        console.log("Erreur... le nom est trop court");
    }
    else if(attaque < 1 || attaque > 20 ){
        console.log("Erreur... l'attaque doit �tre comprise entre 1 et 20");
    }
    else if(vie < 1 || vie > 100){
        console.log("Erreur... la vie doit �tre comprise entre 1 et 100");
    }
    else{
        cartes.push(carte);
        cartes.sort();
    }
    return "Ajout de la carte ...";
}

//------------------------------------------------------- Ajout Deck ------------------------------------------------------

function ajout_deck(nom){
    var carte_trouve = false;
    for (var i = 0; i < cartes.length; i++) {
        if (cartes[i].nom == nom){
            deck.push(cartes[i]);
            cartes.splice(i,1);
            carte_trouve = true;
        }
    };
    if (carte_trouve == false) {
        console.log("Erreur... Aucune carte de se nom trouv�");
    }else{
        console.log("Carte trouv� !");
    }
    return "Ajout de la carte au deck ...";
}

//-------------------------------------------------------- Trier par famille ----------------------------------------------

function trie_famille(famille){
    var trie_famille = [];
    for (var i = 0; i < cartes.length; i++) {
        if (cartes[i].famille == famille) {
            trie_famille.push(cartes[i]);
        };
    };
    console.log(trie_famille);
    return "Cartes tri�es... "+trie_famille;
}

//------------------------------------------- Trier par attaque croissant ou d�croissant ----------------------------------

function trie_attaque(ordre){
    //si on rentre croissant on vas trier les cartes par ordre croissant de leur attaque
    if (ordre == "croissant") {
        cartes.sort(function(a, b){
            if (a.attaque < b.attaque) {
                return -1;
            };
            if (a.attaque > b.attaque) {
                return 1;
            };
        });
        return "Cartes tri�es... "+cartes;
    }
    //si on rentre d�croissant on vas trier les cartes par ordre d�croissant de leur attaque
    else if(ordre == "d�croissant"){
        cartes.sort(function(a, b){
            if (a.attaque > b.attaque) {
                return -1;
            };
            if (a.attaque < b.attaque) {
                return 1;
            };
        });
        return "Cartes tri�es... "+cartes;
    }
    else{
        return "Echec du trie..."
    }
}

function trie(a, b){
    if (a.vie < b.vie) {
        return -1;
    };
    if (a.vie > b.vie) {
        return 1;
    };    
}

//------------------------------------------- Trier par vie croissant ou d�croissant --------------------------------------

function trie_vie(ordre){
    //si on rentre croissant on vas trier les cartes par ordre croissant de leur attaque
    if (ordre == "croissant") {
        cartes.sort(trie);
        return "Cartes tri�es... "+cartes;
    }
    //si on rentre d�croissant on vas trier les cartes par ordre d�croissant de leur attaque
    else if(ordre == "d�croissant"){
        cartes.sort(function(a, b){
            if (a.vie > b.vie) {
                return -1;
            };
            if (a.vie < b.vie) {
                return 1;
            };
        });
        return "Cartes tri�es... "+cartes;
    }
    else{
        return "Echec du trie...";
    }
}

function melange () {
    var cartes_melangee = [];
    for (var i = 0; i < total_cartes; i++) {
        var place_alea = Math.round(Math.random()*total_cartes);
        var carte_choisie = 0;
        carte_choisie = cartes[place_alea];
        cartes_melangee.push(carte_choisie);
    };
    return cartes_melangee;
}