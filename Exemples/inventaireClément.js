var hand = {
	content : [],
	max : 7,
	show : function() {
		for (i=0; i<this.content.length; i++) {
			//necessite jquery
			$("#hand").append('<div class="card"><img src="'+ this.content[i].image +'"><div class="info"><h3>'+ this.content[i].name +'</h3><br><p>Attaque : '+ this.content[i].atk + ' - Défense : ' + this.content[i].def + '</p></div></div>')
		}
	},
	draw : function(howmany) {
		for (i=0; i<howmany; i++) {
			deck.content[i].removeDeck();
			deck.content[i].addHand();
		}
	}
} 

var inventory = {
	content : [],
	show : function(){
		for (i=0; i<this.content.length; i++) {
			console.log("name : " + this.content[i].name)
			console.log("attaque : " + this.content[i].atk)
			console.log("défense : " + this.content[i].def)
		}
	}
}

var deck = {

	content : [],

	max : 30,

	show : function() {

		for (i=0; i<this.content.length; i++) {
			console.log("name : " + this.content[i].name);
			console.log("attaque : " + this.content[i].atk);
			console.log("défense : " + this.content[i].def);
		}
	},

	shuffle : function() {

		for (i=0; i<this.content.length; i++) {
			randomIndex = Math.round(Math.random()*this.content.length);
			currentIndex = this.content[i];
			this.content[i] = this.content[randomIndex];
			this.content[randomIndex] = currentIndex;
		}
	}
}


function Item(img, name, atk, def) {
	this.image      = img;
	this.name       = name;
	this.atk        = atk;
	this.def        = def;
	this.addInv     = function() {inventory.content.push(this)};
	this.removeInv  = function() {inventory.content.splice(inventory.content.indexOf(this), 1)};
	this.addDeck    = function() {deck.content.push(this)};
	this.removeDeck = function() {deck.content.splice(inventory.content.indexOf(this), 1)};
	this.addHand    = function() {hand.content.push(this)};
	this.removeHand = function() {hand.content.splice(hand.content.indexOf(this), 1)};
}

var indice = 0;