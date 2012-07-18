$(function() {
  
  window.Show = Backbone.Model.extend({
    
  });
  
  window.Shows = Backbone.Collection.extend({
    url: function(){ 
      return "http://ws.audioscrobbler.com/2.0/?method=artist.getevents&artist=beck&autocorrect=1&api_key=894064fca12d26335a68f014d98f4145&format=json";
    } 
  });
  
  window.ShowsView = Backbone.View.extend({
    template: _.template($('#search-template').html()),
    el: '#container',
    initialize: function(){
      _.bindAll(this,'render');
      this.render();
      
    },
    render: function(){
      $(this.el).append(this.template());
      
    }
  });
  
  window.Venu = new ShowsView;
  
});