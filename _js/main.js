import $ from 'jquery';

$(document).ready(function(){
  var outer = '.page-content';
  var inner = '.text-wrapper';

  function scrollTop(){
    var currentScroll = $(window).scrollTop();
    var limitScroll = $(window).height();

    if (currentScroll >= limitScroll) {
      $('html, body').animate({ scrollTop: 0 }, 500);
    }
  }

  function ajaxLoad(target, title){
    $.ajax({
      type: 'get',
      url: target,
      cache: false,
      success: function(response){
        $(outer).fadeOut('fast',function(){
          $(outer).html('');
          $(outer).html($($.parseHTML(response)).filter(outer).find(inner));
          $(outer).fadeIn('fast');
        });
        scrollTop();
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

  $('body').on('click', '.ajax-link', function(e){
    e.preventDefault();

    var target = $(this).attr('href');
    var title = $(this)[0].innerText;

    ajaxLoad(target, title);
    history.pushState({ title: title, target: target }, null, target);

  });

  $(window).on('popstate', function () {
    if (history.state !== null){
      ajaxLoad(history.state.target, history.state.title);
    }
  });

  // Disable the mobile nav button from doing anything!
  $('body').on('click', '.menu-icon', function(e){
    e.preventDefault();
  });

});
