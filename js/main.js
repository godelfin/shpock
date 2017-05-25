$(document).ready(function(){
  var $filters = $('#filters');
  $('#search').focus(function(e) {
    $filters.addClass('open').removeClass('closed');
  });
  $('#search').blur(function(e) {
    // $filters.removeClass('open').addClass('closed');
  });
});
