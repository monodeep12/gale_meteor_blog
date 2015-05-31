Meteor.startup(function() {

        return SEO.config({
            title: 'Gale Blog (Meteor)',
            meta: {
                'description': 'Gale blog developed in meteor'
            },
            og: {
                'image': 'http://sporvognsrejser.dk/fotos/logoer/graakallbanen_gb.png'
           }
        });

});

Template.article_detail.rendered = function() {
    try {
        FB.XFBML.parse();
    }catch(e) {}
};

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MMM DD, YYYY');
});

Template.registerHelper('truncatewords', function(passedString) {
    var fooText = passedString.split(" ").splice(0,50).join(" "); //same as truncate.
    return new Spacebars.SafeString(fooText)
});

Session.setDefault('searching', false);

Tracker.autorun(function() {
  if (Session.get('query')) {
    var searchHandle = Meteor.subscribe('searchResults', Session.get('query'));
    Session.set('searching', ! searchHandle.ready());
    console.log('Tracker');
  }
});

Template.search.events({
  'submit form': function(event, template) {
    event.preventDefault();
    var query = template.$('input[type=text]').val();
    console.log('Val:' + query);
    if (query)
      Session.set('query', query);
  }
});