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
      this.bind("add", options.view.renderDrink);
      //Listen for new additions to the collection and call a view function if so
    }
  });
  
  AppView = Backbone.View.extend({
    el: $("body"),
    initialize: function () {
      this.drinks = new Drinks( null, { view: this });
      //Create a friends collection when the view is initialized.
      //Pass it a reference to this view to create a connection between the two
    },
    events: {
    	"submit #person-form":  "addDrink"
   },
   
   template: _.template($('#person-template').html()),


    renderDrink: function (model) {
      //The parameter passed is a reference to the model that was added
      
      console.log(model.attributes);
      
      $('#drinklist').append(_.template($('#person-template').html(),model.attributes));

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
	    this.drinks.add( drink_model );
    },

  });
  
  var appview = new AppView;
})(jQuery);


/*

$(function(){

window.Person = Backbone.Model.extend({
    defaults: {
        name: 'Name unknown',
        drink: 'Drink unknown',
        milk: 'Milk unknown',
        sugar: 'Sugar unknown',
        cont: 'cont unknown'
    },
    initialize: function(){
        console.log("Initialisting person - "+this.get("name"));
    }
});



window.DrinkList = Backbone.Collection.extend({
	model: Person,
	url: '/person'
});
window.Drinks = new DrinkList;





 window.PersonView = Backbone.View.extend({
 
 	el : $('#drinklist'),

    tagName:  "li",

    template: _.template($('#person-template').html()),

    initialize: function() {    
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    render: function() {
      $(this.el).html(this.template,this.model.toJSON());
      return this;
    },

    remove: function() {
      $(this.el).remove();
    },

    clear: function() {
      this.model.destroy();
    }

  });







  window.AppView = Backbone.View.extend({

    el: $("body"),

    events: {
      "submit #person-form":  "addDrink"
    },

    initialize: function() {
      Drinks.bind('add',  this.renderDrink, this);
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
		console.log(data);
		
		var view = new PersonView({model: Person});
		console.log(view);
		$("#drinklist").html(view.render().el+'boo');

   	
    },
    
    

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;
  
});

*/