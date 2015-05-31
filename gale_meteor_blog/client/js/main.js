$('#sidebar').affix({
      offset: {
        top: 245
      }
});

var $body   = $(document.body);
var navHeight = $('.navbar').outerHeight(true) + 10;

$body.scrollspy({
    target: '#leftCol',
    offset: navHeight
});



var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();



var num = $('div.content');

for (i =0; i<num.length;i++){
    if (urlParams['page'] == undefined){
        $(num[i]).text(i+1);
    }else{
        pageNo = parseInt(urlParams['page']);
        curr = 5 * (pageNo-1)
        $(num[i]).text(curr + i + 1);
    }
}
