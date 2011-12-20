(function ($) {

	// Define data structure for a Drink
	Drink = Backbone.Model.extend({
		name: 'Name unknown',
		drink: 'Drink unknown',
		milk: 'Milk unknown',
		sugar: 'Sugar unknown',
		cont: 'cont unknown'
	});
	
	// Create a Collection to store Drinks
	Drinks = Backbone.Collection.extend({
		initialize: function (models, options) {},
		localStorage: new Store("drinks")		
	});
	window.drinksList = new Drinks;
	
	// Create a drink view to represent a drink model in the DOM
	DrinkView = Backbone.View.extend({

		tagName:  "li",

		template: _.template($('#person-template').html()),
		
		initialize: function() {    
			this.model.bind('change', this.render, this);
      		this.model.bind('destroy', this.removeDrinkFromDom, this);
		},
		
		events: {
			"click .delete":  "removeDrinkModel"
		},
		
		removeDrinkFromDom: function(){
			$(this.el).remove();
		},

	    removeDrinkModel: function(e) {
			e.preventDefault();
	      	this.model.destroy();
	    },


		render: function(model) {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
			
	});
  
  	// Create an overall view for the application
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
