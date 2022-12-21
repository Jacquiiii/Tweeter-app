// makes the write a new tweet section visible when the 'write a new tweet' button is clicked and automatically focuses on text area of form to allow typing immediately

$(document).ready(function() {
  $('.fa-angles-down').click(function() {

    $('form').toggle();
    $('#tweet-text').focus();

  });
});