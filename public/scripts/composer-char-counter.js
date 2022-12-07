$(document).ready(function() {
  $( "#tweet-text" ).on( "input", function() {

    // 
    const characterCounter = $(this).val().length;
    const counterElement = $(this).parent().siblings( ".tweet-footer" ).children( ".counter" );
    const count = 140 - characterCounter;

    if (count < 0) {
      counterElement.text(count).addClass('red');
    } else {
      counterElement.text(count).removeClass('red');
    }

  });
});


