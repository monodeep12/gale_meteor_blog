/*
Meteor.methods({
    getArticleById: function() {
        // Get article by Id
        HTTP.get('http://127.0.0.1:8000/article/10/', function(error, article) {
            data = JSON.parse(article.content)[0].fields;
            var item = {}
            item._id = '10';
            item.category = data.category;
            item.body = data.body;
            item.author = data.author;
            item.title = data.title;
            item.created = data.created;
            item.hero_image = data.hero_image;

            Session.set('article', item);
        });
    }

});*/

Meteor.publish('article', function(id) {
  var self = this;
  try {
        var response = HTTP.get('http://127.0.0.1:8000/article/' + id);
        data = JSON.parse(response.content)[0].fields;
        var item = {}
        item.pk = JSON.parse(response.content)[0].pk;
        item.category = data.category;
        item.body = data.body;
        item.summary = data.body
        item.author = data.author;
        item.title = data.title;
        item.created = data.created;
        item.hero_image = data.hero_image;
        item.articleExists = true
        self.added('article', Random.id(), item);
        self.ready();

  } catch(error) {
    var item = {}
    item.articleExists = false
    self.added('article', Random.id(), item);
    self.ready();
    console.log(error);
  }
});




Meteor.publish('readnext', function(id) {
  var self = this;
  try {
        var response = HTTP.get('http://127.0.0.1:8000/readnext/?=' + id);
        data = JSON.parse(response.content);
        //console.log(data[1]);
        data.forEach(function(d){
            var item = {}
            console.log(d.pk);
            item.pk = d.pk;
            item.category = d.fields.category;
            item.body = d.fields.body;
            item.author = d.fields.author;
            item.title = d.fields.title;
            item.created = d.fields.created;
            item.hero_image = d.fields.hero_image;
            self.added('readnext', Random.id(), item);
        });
    self.ready();

  } catch(error) {
    console.log('TEST ERROR');
    console.log(error);
  }
});



Meteor.publish('searchResults', function(q) {

  var self = this;
  try {
        var response = HTTP.get('http://127.0.0.1:8000/search/?q=' + q);

        data = JSON.parse(response.content);
        //console.log(data);
        data.forEach(function(d){
            var item = {}
            console.log(d.fields.category);
            item.pk = d.pk;
            item.category = d.fields.category;
            item.body = d.fields.body;
            item.author = d.fields.author;
            item.title = d.fields.title;
            item.created = d.fields.created;
            item.hero_image = d.fields.hero_image;
            self.added('searchresults', Random.id(), item);
        });

    self.ready();

  } catch(error) {
    console.log('TEST SEARCH ERROR');
    console.log(error);
  }
});



Meteor.publish('randomArticle', function() {
  var self = this;
  try {
        var response = HTTP.get('http://127.0.0.1:8000/random_article/');
        data = JSON.parse(response.content)[0].fields;
        var item = {}
        console.log(data.title);
        item.pk = JSON.parse(response.content)[0].pk;
        item.category = data.category;
        item.body = data.body;
        item.summary = data.body
        item.author = data.author;
        item.title = data.title;
        item.created = data.created;
        item.hero_image = data.hero_image;
        item.articleExists = true
        self.added('randomarticle', Random.id(), item);
        self.ready();

  } catch(error) {
    var item = {}
    item.articleExists = false
    self.added('randomarticle', Random.id(), item);
    self.ready();
    console.log(error);
  }
});
