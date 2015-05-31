Router.configure({
    layoutTemplate:'layout',
    notFoundTemplate: "notFound"
});

Router.map( function () {
  this.route('search',{
    path : '/search',
    template : 'search',
    data: {
        searching: function() { return Session.get('searching'); },
        searchresult: function() { return SearchResults.find(); }
    }
  });

  this.route('article_detail',{
    path : '/article/:_id',
    template : 'article_detail',
    data: {
        article: function(){ Meteor.subscribe('article',Router.current().params._id); return Article.find(); },
        readnext: function(){ Meteor.subscribe('readnext',Router.current().params._id); return ReadNext.find(); }
    }
  });


});