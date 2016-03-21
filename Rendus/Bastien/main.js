var compteur_tour = 0;
var sortie = {
    nom : "Dragon",
    monstre : true ,
    attaque : 10,
    vie : 100,
    niveau : 5,
    message : "Vous poussez la porte et l� vous le voyez enfin, le Dragon dort pour l'instant mais il est le dernier obstacle devant votre tr�sor...",
}
var Hero = {
    nom : "Alan Smithee",
    attaque : 10,
    vie : 200,
}
//Liste de g�n�ration des noms

var fin = false;
var race = ["Baykok","Berbalang", "Champion squelette", "Chuchoteur du grenier", "Cr�ature des cryptes", "Demi-liche", "Dullahan", "�corch�", "�tranger blafard", "Festrog", "goule", "Hu�cuva", "Akata", "Azruverda", "Bab�lien", "B�te lunaire", "D�capus", "Destrachan", "D�voreur d'int�llect", "Drider", "Enfouisseur des sables", "Enlaceur", "�trangleur", "Ettercap", "Flumph", "Frogh�moth", "Ghorazagh", "Grick", "Manteleur", "Fant�me", "Liche","Vampire","Zombi"];
var adjectif = ["terrible","terrifiant","horrible","vislard","ch�tif","malicieu","agressif","myst�rieux","nerveux","�nerv�","sombre","perturb�","hyst�rique","mauvais","extatique","en col�re","d�prim�","cruel"];
var numero_salle = 1;
var total_salle = 2000;
var monstre_present = false;
var Donjon = [];
var Donjon_finale = [sortie];
var monstres_dans_donjon = 0;
var niveau_totale_monstre = 0;
var attaque_list = [];
var vie_list = [];
var ordre_des_salles = 0;

function monstre_double(){
    //boucle qui v�rifie les cartes en doubles, pr�cisement les paire vie attaque en double.
    var attaque = Math.round(Math.random()*8)+1;
    var vie = Math.round(Math.random()*98)+1;
    var niveau = 0;
    for (var i = 0; i < attaque_list.length; i++) {
        if (attaque == attaque_list[i] && vie == vie_list[i]) {
            attaque = Math.round(Math.random()*8)+1;
            vie = Math.round(Math.random()*98)+1;
            continue;
        }else{
            attaque_list.push(attaque);
            vie_list.push(vie);
            break;
        }
    };
    //choix du niveau de difficult� du mob par rapport a ces points de vie
    if (vie < 25) {
        niveau = 1;
    }else if(vie < 50){
        niveau = 2;
    }else if(vie < 75){
        niveau = 3;
    }else if(vie < 100){
        niveau = 4;
    }

    var monstre = {
        nom : numero_salle,
        monstre : true,
        attaque : attaque,
        vie : vie,
        niveau : niveau,
        message : "un monstre se dresse droit devant vous, vous devez l'affronter !"
    }
    monstre_present = false;
    var_nom_race = Math.round(Math.random()*32);
    var_nom_adjectif = Math.round(Math.random()*17);
    monstre.nom = race[var_nom_race]+" "+adjectif[var_nom_adjectif];
    Donjon.push(monstre);
}

// Boucle de cr�ation des salles
while(true){
    //partie salle sans monstres
    if (!monstre_present) {
        var salle = {
            nom : "salle "+numero_salle,
            monstre : false,
            message : "Un long couloir sombre vous fait face, par chance aucun monstre n'est dans les parages..."
        }
        monstre_present = true;
        Donjon.push(salle);
    }else if(monstre_present){
        monstre_double();
    }
    numero_salle++;
    if (numero_salle >= total_salle+1) {
        break;
    };
}

//boucle qui g�n�re le donjon semi-al�atoirement

while(true){
    var choix_de_salle = Math.round(Math.random()*1999);
    if (Donjon[choix_de_salle].monstre == true) {
        monstres_dans_donjon++;
        niveau_totale_monstre += Donjon[choix_de_salle].niveau;
    };
    Donjon_finale.unshift(Donjon[choix_de_salle]);
    if (Donjon_finale.length >= 11) {
        if (monstres_dans_donjon>=3 && monstres_dans_donjon<=5 && niveau_totale_monstre<12) {
            break;
        }else{
            Donjon_finale = [sortie];
            monstres_dans_donjon = 0;
            niveau_totale_monstre = 0;
            continue;
        }
    }
}

function attaque(attaquant,cible){
    var attaque_effet= Math.round(Math.random()*5)+1;
    if (attaque_effet == 1) {
        console.log(attaquant.nom+" Attaque !, mais il rate son coup...");
    }else if(attaque_effet < 6){
        cible.vie -= attaquant.attaque;
        console.log(attaquant.nom+" Attaque !, il inflige "
                                     +attaquant.attaque+" point de d�gats a "
                                     +cible.nom+" il lui reste : "
                                     +cible.vie+" pdv");
    }else{
        cible.vie -= (attaquant.attaque)*2;
        console.log(attaquant.nom+" Attaque ! C'est un coup critique ! Il inflige "
                                 +(attaquant.attaque)*2+" point de d�gats a "
                                 +cible.nom+" il lui reste : "
                                 +cible.vie+" pdv");
    }
    return "%c.","color: white";
}
function avancer(salle){
    if (salle.monstre == false) {
        console.log("Vous vous engagez dans le couloir...");
        ordre_des_salles++;
        console.log(Donjon_finale[ordre_des_salles].message);
        if (Donjon_finale[ordre_des_salles].monstre == true && ordre_des_salles<10) {
            console.log("il s'agit d'un "+"%c"+Donjon_finale[ordre_des_salles].nom,"color: red");
        }
        if(ordre_des_salles>=10){
            console.log("%cLe Dragon s'�veille et vous observe, le vraie combat commence ! ","color: grey");
        }
    }else{
        console.log("Vous essayez de partir mais le monstre vous en emp�che et vous attaque !")
    }
    return "%c.","color: white";
}
function renommer(nouveau_nom){
    Hero.nom = nouveau_nom;
}
function Mob_tour(monstre){
    attaque(monstre,Hero);
    return "%c.","color:white";
}
function debug(){
    console.log("Erreur, voici les actions disponibles :");
    console.log("attaque");
    console.log("avancer");
    console.log("renommer");
    return "%c.","color: white";
}

//Intro
console.log("%cVous �tes un chevalier en qu�te d'un tr�sor, il vous faudra affronter le donjon rempli de monstre pour l'obtenir."
            +"Cependant, il est dit que le tr�sor est gard� par un puissant Dragon...", "color: blue");
console.log('%cVous ouvrez les lourdes portes du donjon et entrez dans la premi�re salle...', "color: blue");
console.log('%cVous pouvez nommer votre h�ros avec Gameloop("renommer","le nom choisie") mais faites �a en lieu sur...', "color: blue");
console.log(Donjon_finale[ordre_des_salles].message);
if (Donjon_finale[ordre_des_salles].monstre == true){
    console.log("il s'agit d'un "+"%c"+Donjon_finale[ordre_des_salles].nom,"color: red");
}

function Gameloop(action,complement){
    var salle_en_cour = Donjon_finale[ordre_des_salles];
    if (Hero.vie>0 && fin==false) {
        switch(action){
            case "attaque" :
                if (salle_en_cour.monstre == true) {
                    attaque(Hero,salle_en_cour);
                    compteur_tour++;
                }else{
                    console.log("Vous mettez un coup d'�p�e dans le vide... Il n'y a personne.");
                    compteur_tour++;
                }
            break;

            case "avancer" :
                avancer(salle_en_cour);
                compteur_tour++;
            break;
            case "renommer" :
                if (complement.length >= 3) {
                    renommer(complement);
                    console.log("Compris ! Vous �tes d�sormais le chevalier "+Hero.nom+".");
                }else{
                    console.log("Erreur, le nom utilis� doit faire au moins 3 caract�res");
                }
            break;
            default :
                debug();
        }
        if (salle_en_cour.monstre == true){
            if (salle_en_cour.vie <= 0 && ordre_des_salles<10) {
                salle_en_cour.monstre = false;
                console.log("%cBien jou�, vous avez battu le monstre, vous pouvez maintenant continuer votre chemin...","color: green");
            }else{
                Mob_tour(salle_en_cour,Hero);
                if (Hero.vie <= 0) {
                    console.log("%cDommage, vous �tes mort... Mais ne vous laisser pas abattre #lol, retentez votre chance en rechargent la page !","color: red");
                };
            }
        }
        if (ordre_des_salles == 10) {
            if (salle_en_cour.vie<=0) {
                console.log("%cIncroyable, vous terrasser le Dragon qui �met son dernier r�le, le tr�sor est � vous !","color : green");
                console.log("%cVous avait fini le Donjon en "+ compteur_tour +" tours, essayez de faire mieux en relancen la page !","color : green");
                fin = true;
            };
        };
    }else if(fin == false){
        console.log("%cVous essayez de bouger mais votre cadavre reste d�sesp�r�ment mort...","color: red")
    }else{
        console.log("Aller c'est fini maintenant si vous voulez rejouer il faut relancer la page !");
    };
    return "Tour : "+compteur_tour;
}