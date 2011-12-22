(function ($) {

	// Define data structure for a Drink
	Drink = Backbone.Model.extend({
		defaults : {
			name: '',
			drink: '',
			milk: '',
			sugar: '',
			cont: '',
			edit: false
		}
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
			"click .delete":  "removeDrinkModel",
			"click .edit":  "editDrinkModel"
		},
		
		removeDrinkFromDom: function(){
			$(this.el).remove();
		},

	    removeDrinkModel: function(e) {
			e.preventDefault();
	      	this.model.destroy();
	    },

	    editDrinkModel: function(e) {
			e.preventDefault();
			this.model.set({edit:true});
	      	myFormView.model.set(this.model.toJSON());
	    },

		render: function(model) {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
			
	});
	
	// Create a view for the drink preference form	
	FormView = Backbone.View.extend({
		
		tagName:  "div",
		
		template: _.template($('#form-template').html()),
		
		initialize: function() {    
			this.model.bind('change', this.render, this);
		},

		events: {
			"click #add":  "addDrink",
			"click #cancel":  "reset",
			"click #update":  "updateDrink"
		},
		
		reset: function(e){
			e.preventDefault();
			this.model.set(new Drink());
		},
		
	    addDrink: function(e) {
	    	e.preventDefault();
	    	console.log('adding drink');
			var data = this.$('form').serializeObject();
	      	var drink_model = new Drink(data);
		    drinksList.create(drink_model);
	    },

	    updateDrink: function(e) {
	    	e.preventDefault();
	    	console.log('editing drink');
			var data = this.$('form').serializeObject();
			drinksList.get(this.model.id).save(data);
	    },   

		render: function(model) {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
		
		
	});
 	var myFormView = new FormView({model : new Drink()});
 	
  	// Create an overall view for the application
	AppView = Backbone.View.extend({
	
		el: $("body"),
		
		initialize: function () {
			drinksList.bind('add', this.addOne, this);
      		drinksList.bind('reset', this.addAll, this);
			drinksList.fetch();
			
			$('#form').append(myFormView.render().el);			
			
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