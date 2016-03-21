var compteur_tour = 0;
var sortie = {
    nom : "Dragon",
    monstre : true ,
    attaque : 10,
    vie : 100,
    niveau : 5,
    message : "Vous poussez la porte et là vous le voyez enfin, le Dragon dort pour l'instant mais il est le dernier obstacle devant votre trésor...",
}
var Hero = {
    nom : "Alan Smithee",
    attaque : 10,
    vie : 200,
}
//Liste de génération des noms

var fin = false;
var race = ["Baykok","Berbalang", "Champion squelette", "Chuchoteur du grenier", "Créature des cryptes", "Demi-liche", "Dullahan", "Écorché", "Étranger blafard", "Festrog", "goule", "Huécuva", "Akata", "Azruverda", "Babélien", "Bête lunaire", "Décapus", "Destrachan", "Dévoreur d'intéllect", "Drider", "Enfouisseur des sables", "Enlaceur", "Étrangleur", "Ettercap", "Flumph", "Froghémoth", "Ghorazagh", "Grick", "Manteleur", "Fantôme", "Liche","Vampire","Zombi"];
var adjectif = ["terrible","terrifiant","horrible","vislard","chétif","malicieu","agressif","mystérieux","nerveux","énervé","sombre","perturbé","hystérique","mauvais","extatique","en colère","déprimé","cruel"];
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
    //boucle qui vérifie les cartes en doubles, précisement les paire vie attaque en double.
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
    //choix du niveau de difficulté du mob par rapport a ces points de vie
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

// Boucle de création des salles
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

//boucle qui génére le donjon semi-aléatoirement

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
                                     +attaquant.attaque+" point de dégats a "
                                     +cible.nom+" il lui reste : "
                                     +cible.vie+" pdv");
    }else{
        cible.vie -= (attaquant.attaque)*2;
        console.log(attaquant.nom+" Attaque ! C'est un coup critique ! Il inflige "
                                 +(attaquant.attaque)*2+" point de dégats a "
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
            console.log("%cLe Dragon s'éveille et vous observe, le vraie combat commence ! ","color: grey");
        }
    }else{
        console.log("Vous essayez de partir mais le monstre vous en empêche et vous attaque !")
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
console.log("%cVous êtes un chevalier en quête d'un trésor, il vous faudra affronter le donjon rempli de monstre pour l'obtenir."
            +"Cependant, il est dit que le trésor est gardé par un puissant Dragon...", "color: blue");
console.log('%cVous ouvrez les lourdes portes du donjon et entrez dans la première salle...', "color: blue");
console.log('%cVous pouvez nommer votre héros avec Gameloop("renommer","le nom choisie") mais faites ça en lieu sur...', "color: blue");
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
                    console.log("Vous mettez un coup d'épée dans le vide... Il n'y a personne.");
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
                    console.log("Compris ! Vous êtes désormais le chevalier "+Hero.nom+".");
                }else{
                    console.log("Erreur, le nom utilisé doit faire au moins 3 caractères");
                }
            break;
            default :
                debug();
        }
        if (salle_en_cour.monstre == true){
            if (salle_en_cour.vie <= 0 && ordre_des_salles<10) {
                salle_en_cour.monstre = false;
                console.log("%cBien joué, vous avez battu le monstre, vous pouvez maintenant continuer votre chemin...","color: green");
            }else{
                Mob_tour(salle_en_cour,Hero);
                if (Hero.vie <= 0) {
                    console.log("%cDommage, vous êtes mort... Mais ne vous laisser pas abattre #lol, retentez votre chance en rechargent la page !","color: red");
                };
            }
        }
        if (ordre_des_salles == 10) {
            if (salle_en_cour.vie<=0) {
                console.log("%cIncroyable, vous terrasser le Dragon qui émet son dernier râle, le trésor est à vous !","color : green");
                console.log("%cVous avait fini le Donjon en "+ compteur_tour +" tours, essayez de faire mieux en relancen la page !","color : green");
                fin = true;
            };
        };
    }else if(fin == false){
        console.log("%cVous essayez de bouger mais votre cadavre reste désespérément mort...","color: red")
    }else{
        console.log("Aller c'est fini maintenant si vous voulez rejouer il faut relancer la page !");
    };
    return "Tour : "+compteur_tour;
}