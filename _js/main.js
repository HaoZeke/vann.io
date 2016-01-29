var $ = require('jquery');

var outer = '.page-content';
var inner = '.text-wrapper';

$('body').on('click','.site-nav a, .post-title a', function(e){
  e.preventDefault();
  var target = $(this).attr('href');

  $.ajax({
    type: 'get',
    url: target,
    cache: false,
    success: function(response){
      var content =  $($.parseHTML(response)).filter(outer).find(inner);
      $(outer).fadeOut('fast',function(){
        $(outer).html('');
        $(outer).html(content);
        $(outer).hide().fadeIn('fast');
      });
    }
  });
});
