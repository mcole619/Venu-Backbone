$(function() {
  
  window.Show = Backbone.Model.extend({
    
  });
  
  window.Shows = Backbone.Collection.extend({
    initialize: function() {
      this.artist = $('input').val();
    },
    url: function(){
      return "http://ws.audioscrobbler.com/2.0/?method=artist.getevents&artist="+this.artist+"&autocorrect=1&api_key=894064fca12d26335a68f014d98f4145&format=json&callback=?";
    } 
  });
  
  window.ShowsView = Backbone.View.extend({
    template: _.template($('#search-template').html()),
    showTemplate: _.template($('#show-template').html()),
    errorTemplate: _.template($('#error-template').html()),
    el: '#container',
    events: {
      "click .btn" : "getShows",
      'keypress': 'checkKeyCode'
    },
    initialize: function(){
      _.bindAll(this,'render');
      this.render();      
    },
    render: function(){
      $(this.el).append(this.template());
      return this;     
    },
    getShows: function(){
      this.showsCollection = new Shows;
      var self = this;
      this.showsCollection.fetch({success: function(collection, response){
       console.log(collection);
        if(collection.models[0].attributes.events.event){
          collection.models[0].attributes.events.event.forEach(function(show){
            console.log(show);
            $(self.el).append(self.showTemplate({show: show}));
          });
        } else{
          $(self.el).append(self.errorTemplate());
        }
      }});
      
    },
    checkKeyCode: function(e) {
      if(e.keyCode === 13) {
        this.getShows();
      }
    }
  });
  
  window.Venu = new ShowsView;
  
});