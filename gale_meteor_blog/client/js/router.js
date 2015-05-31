Router.configure({
    layoutTemplate:'layout',
    notFoundTemplate: "notFound"
});

Router.map( function () {
  this.route('random_article',{
    path : '/',
    template : 'random_article',
    data: {
        randomarticle: function() { Meteor.subscribe('randomArticle'); return RandomArticle.find(); },
        readnext: function(){ Meteor.subscribe('readnext',Router.current().params._id); return ReadNext.find(); }
    }
  });

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
    },
    onAfterAction: function() {
      var post;
      // The SEO object is only available on the client.
      // Return if you define your routes on the server, too.
      if (!Meteor.isClient) {
        return;
      }
      post = Article.find();
      post.forEach(function(p){
        SEO.set({
        title: p.title,
        meta: {
          'description': p.body.split(" ").splice(0,50).join(" ")
        },
        og: {
          'title': p.title,
          'description': p.body.split(" ").splice(0,50).join(" "),
          'type' : 'article',
          'image' : p.hero_image,
          'url' : 'http://localhost:3000/article/' + p.pk
        }
      });
      });


    }
  });


});