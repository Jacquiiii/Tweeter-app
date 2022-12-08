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
        <p>${tweet.content.text}</p>
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
  // when clicked, form data is posted to /tweets then all /tweets data is loaded
  $('form').submit(event => {
    event.preventDefault();
    const formData = $('form').serialize();

    $.post('/tweets', formData, () => {
      loadTweets();
    });
  
  });

  // loads data from /tweets when user opens the page
  loadTweets();
});

