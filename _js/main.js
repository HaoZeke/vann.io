var $ = require('jquery');

var outer = '.page-content';
var inner = '.text-wrapper';

function scrollTop(){
  var currentScroll = $(window).scrollTop();
  var limitScroll = $(window).height();

  if (currentScroll >= limitScroll) {
    $('html, body').animate({ scrollTop: 0 }, 500);
  }
}

function ajaxLoad(target){
  $.ajax({
    type: 'get',
    url: target,
    cache: false,
    success: function(response){
      history.pushState(null, null, target);
      scrollTop();

      var content =  $($.parseHTML(response)).filter(outer).find(inner);
      $(outer).fadeOut('fast',function(){
        $(outer).html('');
        $(outer).html(content);
        $(outer).hide().fadeIn('fast');
      });
    },
    error: function(){
      scrollTop();

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
