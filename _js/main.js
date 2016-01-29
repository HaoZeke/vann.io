var $ = require('jquery');

var outer = '.page-content';
var inner = '.text-wrapper';

function ajaxLoad(target){
  $.ajax({
    type: 'get',
    url: target,
    cache: false,
    success: function(response){
      history.pushState(null, null, target);
      var content =  $($.parseHTML(response)).filter(outer).find(inner);
      $(outer).fadeOut('fast',function(){
        $(outer).html('');
        $(outer).html(content);
        $(outer).hide().fadeIn('fast');
      });
    }
  });
};

$('body').on('click','.site-nav a, .post-title a', function(e){
  e.preventDefault();
  ajaxLoad($(this).attr('href'));
});
