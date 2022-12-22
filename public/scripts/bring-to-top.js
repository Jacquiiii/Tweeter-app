// button appears when user scrolls down and brings user to the top of the page on click event with textarea of form enabled

$(document).ready(function() {

  $('.bring-to-top').on('click', function() {

    window.scrollTo(0, 0);
    $('#tweet-text').focus();

  });

  $(document).on('scroll', function() {
    let page = $(document).scrollTop();
    
    if (page > 100) {
      $('.bring-to-top').fadeIn();
    } else {
      $('.bring-to-top').fadeOut();
    }

  });

});