var tour = 0;

setInterval(function(){
}, 1000/60)

window.onclick = function(){console.log(tour)};

var allies = [];
var enemies = [];

// DECK
var deck = {

	// CONTENU DU DECK
	content : [],

	// FONCTION MELANGE DU DECK
	shuffle : function() {
		for(i=0; i<this.content.length; i++) {
			randomIndex = Math.round(Math.random()*this.content.length);
			currentIndex = this.content[i];
			this.content[i] = this.content[randomIndex];
			this.content[randomIndex] = currentIndex;
		}	
	}
}

// MAIN
var hand = {

	// CONTENU DE LA MAIN
	content : [],

	max : 3,
	
	// FONCTION PIOCHER(COMBIEN?)
	draw : function(howmany) {
		for(i=0; i<howmany; i++) {
			deck.content[0].addToHand();
			deck.content[0].removeFromDeck();
		}
	},
	
	// FONCTION MONTRER LE CONTENU DE LA MAIN DANS LA CONSOLE
	show : function() {
		for(i=0; i<this.content.length; i++) {
			console.log(this.content[i]);
		}
	},

	// FONCTION VIDER LA MAIN
	empty : function() {
		this.content.splice(0, this.content.length);
	}
}

// PROTOTYPE DE CARTE (NOM, CIBLE, COUT, EFFET)
function card(name, cost, value, desc, mess, effect) {

	this.name   = name;
	this.cost   = cost;
	this.value	= value;
	this.effect = effect;

	this.descArray = desc.split(' ');
	this.descArray.splice(this.descArray.indexOf('value'), 1, this.value);
	this.description = this.descArray.join(' ');

	this.messArray = mess.split(' ');
	this.messArray.splice(this.messArray.indexOf('value'), 1, this.value);
	this.message = this.messArray.join(' ');
	
	this.removeFromDeck = function() {deck.content.splice(deck.content.indexOf(this), 1)};
	this.addToHand 		= function() {hand.content.push(this)};
	this.removeFromHand = function() {hand.content.splice(hand.content.indexOf(this), 1)};
}
//cartes soin
for(i=0; i<12; i++) {
	deck.content.push(
		new card('Soin', 4, 2, "Vous récupérez value points de vie", "regagnez value points de vie", function(){
			if(playerCurrentHp < playerMaxHp) {
				playerCurrentHp += this.value;
				if (playerCurrentHp > playerMaxHp) {
					playerCurrentHp = playerMaxHp;
				};
			}
	}));
}
//cartes attaque
for(i=0; i<12; i++) {
	deck.content.push(
		new card('Attaque', 4, 5, "Inflige value points de dégats à votre cible", "infligez value points de dégat à votre cible", function(target){
			enemies[target].hp -= 10;			
	}));
}
// PROTOTYPE D'ENEMI (VIE, ATTAQUE)
function enemy(name, maxHp, minAtk, maxAtk) {
	this.name	= name;
	this.maxHp  = maxHp;
	this.hp     = this.maxHp;
	this.minAtk = minAtk;
	this.maxAtk = maxAtk;

	this.attack = function(){
		damage = (this.minAtk + (Math.round(Math.random()* this.maxAtk) - this.minAtk))
		playerCurrentHp -= damage;
		return damage;
	}
	enemies.push(this);
}

// JOUEUR
var playerMaxHp = 50,
	playerCurrentHp = playerMaxHp,
	playerMaxMana = 20,
	playerCurrentMana = playerMaxMana;

/*var player = {

	maxHp : 50,
	currentHp    : this.maxHp,
	maxMana: 20,
	mana  : this.maxMana
}
*/
enemy1 = new enemy('enemy1', 20, 2, 5);
enemy2 = new enemy('enemy2', 15, 2, 5);





deck.shuffle();
hand.draw(hand.max);
hand.show();

var message ='';
function gameloop(action, card, target) {
	message = 'Vous êtes au tour ' + tour + "<br>";
	action = action.toLowerCase();
	selectedCard = hand.content[card];

	if(playerCurrentMana<playerMaxMana) {
		playerCurrentMana++;
	}

	switch(action) {
		case "use" :
			if (selectedCard.cost <= playerCurrentMana) {
				playerCurrentMana -= selectedCard.cost;
				selectedCard.effect(target);
				message += "Vous utilisez la carte " + selectedCard.name + " et " + selectedCard.message;
				hand.empty();
				endTurn();				
			} else {
				message += "Vous n'avez pas assez de mana pour utiliser cette carte";
			}
			
		break;

		case "keep" :
			message += "Vous choississez de garder la carte" + selectedCard.name;
			hand.empty();
			selectedCard.addToHand();
			endTurn();
	}

	for (i=0; i<enemies.length; i++) {
		if(enemies[i].hp <= 0) {
			message += 'Vous avez vaincu ' + enemies[i].name + ' !';
		}
	}
	refresh();
	console.log(message);
}

function endTurn() {
	
	if (hand.content.length < hand.max) {
		hand.draw(hand.max - hand.content.length);
	}
	
	for(i=0; i<enemies.length; i++) {
		
		message += "<br>" + enemies[i].name + " vous attaque et inflige " + enemies[i].attack() + ' points de dégat.'
	}

	message += "<br>Il vous reste " + playerCurrentHp + "points de vie.";
	message += "<br>Qu'allez vous faire maintenant ?"

	tour++;
}

function refresh() {
	var enemiesDivContent ='';
	for (i=0; i<enemies.length; i++) {
		enemiesDivContent += '<div class="enemy"><p>' + enemies[i].name + '</p><p>hp : ' + enemies[i].hp + '/' + enemies[i].maxHp + '</p><p>atk : ' + enemies[i].minAtk + '-' + enemies[i].maxAtk + '</p></div>';

	} 
	$('#enemies').html(enemiesDivContent);

	var handDivContent ='';
	for (i=0; i<hand.content.length; i++) {
		handDivContent += '<div class="card" id="'+ i +'"><p>' + hand.content[i].name + '</p><p>' + hand.content[i].description + '</p><button class="use">Utiliser</button><button class="keep">Garder</button></div>';

	} 
	$('#enemies').html(enemiesDivContent);
	$('#hand').html(handDivContent);
	if(message != '') {
		$('#history').append('<p class="history">' + message + '</p>');
	}

	$('#mana').html('mana : ' + playerCurrentMana + '/' + playerMaxMana);
	$('#hp').html('points de vie : ' + playerCurrentHp + '/' + playerMaxHp);
	
}
$(document).ready(function(){
	refresh();
	$('.use').on('click', function(){

		cible = prompt("Quel ennemi voulez vous cibler ? (tapez 1 pour cibler l'ennemi 1 ou 2 pour cibler l'ennemi 2)")-1;
		console.log($(this).parent().attr('id'));
		gameloop('use', parseInt($(this).parent().attr('id')), cible);
	})

	$('.keep').on('click', function(){
		gameloop('keep', parseInt($(this).parent().attr('id')));
	})
	
})
