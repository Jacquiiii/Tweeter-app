// escapes text to prevent cross site scripting when used
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// takes in a tweet object and returns a tweet <article> element containing the entire HTML structure of the tweet
const createTweetElement = function(tweet) {
  const timeOfTweet = timeago.format(tweet.created_at);

  const $tweet = `
    <article class="tweet-container">
      <section class="tweet-container-header">
        <div>
          <img src=${tweet.user.avatars}>
          <span>${tweet.user.name}</span>
        </div>
        <span class="handle">${tweet.user.handle}</span>
      </section>
      <section class="tweet-container-body">
        <p>${escape(tweet.content.text)}</p>
      </section>
      <section class="tweet-container-footer">
        <span>${timeOfTweet}</span>
        <span class="tweeter-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
          <i class="likes"><sup>100</sup></i>
        </span>
      </section>
    </article>
    `;
     
  return $tweet;
};

// gets array of tweets from /tweets
const loadTweets = function() {

  $.get('/tweets', (tweets) => {
    renderTweets(tweets);
  });

};

// loops through tweets and calls createTweetElement to append new tweet to the tweets container
const renderTweets = function(tweets) {
  $('.tweets-container').empty();

  for (const user of tweets) {
    const $tweet = createTweetElement(user);
    $('.tweets-container').prepend($tweet);
  }

};

// executes when dom is fully loaded
$(document).ready(function() {

  // listens for submit event on tweet button
  $('form').submit(event => {
    event.preventDefault();
    const tweetInput = $("#tweet-text").val().trim();

    // if tweet input is empty or exceeds character count, alert is presented
    // otherwise, form data is posted to /tweets then all /tweets data is loaded
    if (!tweetInput) {
      $('.empty-error').slideDown("slow");
      // alert('Tweet cannot be empty. Please enter a message to tell your friends what you\'re humming about!');
    } else if (tweetInput.length > 140) {
      $('.exceeded-char-error').slideDown("slow");
      // alert('Your tweet is too long! Please shorten your tweet so we can get to telling your friends what you\'re humming about.');
    } else {
      $('.empty-error').slideUp("slow");
      $('.exceeded-char-error').slideUp("slow");
      const formData = $('form').serialize();
      $.post('/tweets', formData, () => {
        $("#tweet-text").val('');
        $('.counter').text(140);
        loadTweets();
      });
    }
  
  });

  // loads data from /tweets when user opens the page
  loadTweets();
});

