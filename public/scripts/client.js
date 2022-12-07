// Fake data taken from initial-tweets.json for testing purposes
const data = [
  {
    "user": {
      "name": "Jacqui",
      "avatars": "/images/tweeter-face.png",
      "handle": "@NotImposter"
    },
    "content": {
      "text": "This is a tweet about how I started coding and was so great at it"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// takes in a tweet object and returns a tweet <article> element containing the entire HTML structure of the tweet
const createTweetElement = function (tweet) {
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
        <span>${tweet.created_at}</span>
        <span class="tweeter-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
          <i class="likes"><sup>100</sup></i>
        </span>
      </section>
    </article>
    `
  return $tweet;
}

// loops through tweets and calls createTweetElement to append new tweet to the tweets container
const renderTweets = function (tweets) {

  for (const user of tweets) {
    const $tweet = createTweetElement(user);
    $('.tweets-container').append($tweet);
  }

}

$(document).ready(function () {
  renderTweets(data);
});

