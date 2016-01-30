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
    },
    error: function(){
      $(outer).fadeOut('fast',function(){
        $(outer).html('');
        $(outer).html('<div class="text-wrapper">Oops, something went wrong!</div>');
        $(outer).hide().fadeIn('fast');
      });
    }
  });
};

$('body').on('click','.ajax-link', function(e){
  e.preventDefault();
  ajaxLoad($(this).attr('href'));
});

// Smooth scrolling to contact anchor
$('body').on('click','.contact-link',function(e) {
  e.preventDefault();

  var target = $(this.hash);
  $('html,body').animate({
    scrollTop: target.offset().top
  }, 1000);
});
