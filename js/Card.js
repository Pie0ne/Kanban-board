
function Card(id, name,) {
	var self = this;	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var editCard = $('<button class="edit-card"><i class="fa fa-pencil" aria-hidden="true"></i></button>');
		var cardDescription = $('<p class="card-description"></p>');
		
		cardDeleteBtn.click(function() {
			self.removeCard();
		});

		editCard.click(function() {
			var newCardName = prompt('Enter new card name');
			self.cardEdit(newCardName);
		});

		card.append(cardDeleteBtn);
		card.append(editCard)
		cardDescription.text(self.name);
		card.append(cardDescription)
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
	    var self = this;
	    $.ajax({
		    url: baseUrl + '/card/' + self.id,
		    method: 'DELETE',
		    success: function(){
		      self.element.remove();
		    }
	    });
	},
	cardEdit: function(newCardName) {
		var self = this;		
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {			
				id: self.id,	
				name: newCardName,
				bootcamp_kanban_column_id: 19291,
			},
			success: function(response) {
				$(self.element).find('.card-description').text(newCardName);	
			}
		});
	} 
}
	



		