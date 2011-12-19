(function ($) {
  
	Drink = Backbone.Model.extend({
		//Create a model to hold friend atribute
		name: 'Name unknown',
		drink: 'Drink unknown',
		milk: 'Milk unknown',
		sugar: 'Sugar unknown',
		cont: 'cont unknown'
	});
	
	Drinks = Backbone.Collection.extend({
		//This is our Friends collection and holds our Friend models
		initialize: function (models, options) {
		  //this.bind("add", options.view.renderDrink);
		  //Listen for new additions to the collection and call a view function if so
		},
		localStorage: new Store("drinks")
		
	});
	
	window.drinksList = new Drinks;
	
	
	DrinkView = Backbone.View.extend({

		tagName:  "li",

		template: _.template($('#person-template').html()),
		
		initialize: function() {    
			this.model.bind('change', this.render, this);
		},
		
		render: function(model) {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
			
	});
  
	AppView = Backbone.View.extend({
	
		el: $("body"),
		
		initialize: function () {
			drinksList.bind('add', this.addOne, this);
      		drinksList.bind('reset', this.addAll, this);
			drinksList.fetch();
		},
		
		events: {
			"submit #person-form":  "addDrink"
		},
		    
	    addDrink: function(e) {
	    	e.preventDefault();
	    	var data = { 
			    name: $('#person-form #name').val(),
			    drink: $('#person-form #drink').val(),
			    milk: $('#person-form #milk').val(),
			    sugar: $('#person-form #sugar').val(),
			    cont: $('#person-form #cont').val()
			}
	      	var drink_model = new Drink(data);
		    drinksList.create(drink_model);
	    },
	    
		// Add all items in the **Todos** collection at once.
		addAll: function() {
			drinksList.each(this.addOne);
		},
    	    	    
		addOne: function(drink) {	
			var view = new DrinkView({model: drink});
			$('#drinklist').append(view.render().el);
		}
	    
	    

  });
  var appview = new AppView;
  
})(jQuery);
