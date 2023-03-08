var Animal = {  					// prototype pour un seul animal
	initialize: function(petName, petType) {
		this.name = petName;
		this.type = petType;
		this.foodLevel = 5.0;
		this.sleepLevel = 5.00;
		this.activityLevel = 5.0;
	},
	timePasses: function() {   	// cette fonction épuise les niveaux de l'animal chaque fois qu'elle est appelée
		this.foodLevel = this.foodLevel-1;
		this.sleepLevel = this.sleepLevel - 0.75;
		this.activityLevel = this.activityLevel - 0.5;
	},
	isAlive: function() {   		// cette fonction passe seulement quand les valeurs de nourriture food, repos et activité sont toutes > 0
		if (this.foodLevel > 0 && this.sleepLevel > 0 && this.activityLevel > 0) {
			return true;
		} else {
			return false;
		}
	}
}

var Zoo = {										// prototype pour un nouveau zoo virtuel contenant des 'objets' animaux
	initialize: function(zooName) {
		this.name = zooName;
		this.petsInZoo = [];
	}
}

var createAPet = function(zoo) {													// appelé chaque fois qu'un nouveau formulaire pour nouvel animal est soumis. Crée et initialise un objet pour chaque nouvel animal.
	var newPet = Object.create(Animal);
	newPet.initialize(($('input#new-pet-name').val()), ($('input#new-pet-type').val()));
	zoo.petsInZoo.push(newPet);															// un nouvel animal est ajouté au zoo
	$('div#zoo-list').append('<button type="button" class="btn btn-default">' + newPet.name + ' , ' + newPet.type + '</button>');
	$('div#zoo').show();
	$('div#zoo-list button').last().click(function() {			// configure un gestionnaire de clics pour le nouvel animal du zoo
		showAPet(newPet);
	});
}

var showAPet = function(pet) {								// cette fonction s'exécute quand le nom de l'animal est cliqué
	$('div.pet-stats').hide();									// efface les anciennes informations de l'écran
	$('div.after-death').hide();
	$('button#feed').off();											// efface tout gestionnaire de clics associaté aux autres animaux
	$('button#put-to-bed').off();
	$('button#play').off();

	if (pet.isAlive()) {												// Montre les valeurs de l'animal si il est vivant
		$('span#name').text(pet.name + ' , ' + pet.type);
		$('span#food').text(pet.foodLevel);
		$('span#sleep').text(pet.sleepLevel);
		$('span#activity').text(pet.activityLevel);
		$('div.pet-stats').show();
	} else {																		// Autrement, montrer que l'animal n'est plus vivant
		$('div.pet-stats').hide();
		$('h3#status-message').text(pet.name + ' is unwell :-(');
		$('div.after-death').show();
	}
	
	$('button#feed').click(function() {				// crée un gestionnaire de clics pour nourrir l'animal (trois unités_ repas par jour)
		pet.foodLevel = pet.foodLevel + 2;
		$('span#food').text(pet.foodLevel);
	});
		
	$('button#put-to-bed').click(function() {		// crée un gestionnaire de clics pour mettre l'animal au repos (6 unités_heures par jour)
		pet.sleepLevel = pet.sleepLevel + 3;
		$('span#sleep').text(pet.sleepLevel);
	});
		
	$('button#play').click(function() {					// crée un gestionnaire de clics pour jouer avec l'animal (6 unités_ fois par jour)
		pet.activityLevel = pet.activityLevel + 3;
		$('span#activity').text(pet.activityLevel);
	});
}



$(document).ready(function() {
	var newZoo = Object.create(Zoo);				// prepare un nouveau zoo lors du chargement de la page
	newZoo.initialize("My Zen Zoo");

	$('form#new-pet').submit(function(event) {		// met en place un nouvel animal de compagnie lors de la soumission du formulaire
		event.preventDefault();		
		
		createAPet(newZoo);	
		
		$('input#new-pet-name').val('');
		$('input#new-pet-type').val('');

	});

});
