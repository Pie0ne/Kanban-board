
function Column(id, name) {
	var self = this; 
	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();

	function createColumn() {
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Add card</button>');
		var columnEdit = $('<button class="edit-column"><i class="fa fa-pencil" aria-hidden="true"></i></button>');
			
		columnAddCard.click(function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();			
			$.ajax({
	    		url: baseUrl + '/card',
	    		method: 'POST',
	    		data: {
		    		name: cardName,
		    		bootcamp_kanban_column_id: self.id
	    		},
			    success: function(response) {
			        var card = new Card(response.id, cardName);
			        self.createCard(card);
			    }
			});	
		});	
		columnDelete.click(function() {
			self.deleteColumn();
		});

		columnEdit.click(function() {
			var newColumnName = prompt('Enter new column name');
			self.editColumn(newColumnName);
		});

		column.append(columnTitle)
			.append(columnAddCard)
			.append(columnDelete)
			.append(columnEdit)
			.append(columnCardList);
			return column;
	}
}

Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},	
	deleteColumn: function() {
		var self = this;
		$.ajax({
		    url: baseUrl + '/column/' + self.id,
		    method: 'DELETE',
		    success: function(response){
		    	self.element.remove();
	      	}
	    });
 	},
 	editColumn: function(newColumnName) {
		var self = this;
		$.ajax({
			method: 'PUT',
			url: baseUrl + '/column/' + self.id,
			data: {
				id: self.id,
				name: newColumnName
			},
			success: function(response){
				console.log(self.element);	
				$(self.element).find('.column-title').text(newColumnName);				
			}
		});
	}	
}
	
	