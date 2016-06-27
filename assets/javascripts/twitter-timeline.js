// Use the url from a Twitter widget instead of their iFrame
// Sample url looksl like this:
// 'https://syndication.twitter.com/widgets/timelines/731936434932862976?dnt=true&domain=localhost%3A4000&lang=en'
var tweetLimit = 20;
var script = null;
var inProgress = false;
var targetTimelineEle = 'js-twitter-timeline';
var twitterRetweetIcon = '<svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns\="http://www.w3.org/2000/svg\"><path d=\"M1216 1504q0 13-9.5 22.5t-22.5 9.5h-960q-8 0-13.5-2t-9-7-5.5-8-3-11.5-1-11.5v-600h-192q-26 0-45-19t-19-45q0-24 15-41l320-384q19-22 49-22t49 22l320 384q15 17 15 41 0 26-19 45t-45 19h-192v384h576q16 0 25 11l160 192q7 11 7 21zm640-416q0 24-15 41l-320 384q-20 23-49 23t-49-23l-320-384q-15-17-15-41 0-26 19-45t45-19h192v-384h-576q-16 0-25-12l-160-192q-7-9-7-20 0-13 9.5-22.5t22.5-9.5h960q8 0 13.5 2t9 7 5.5 8 3 11.5 1 11.5v600h192q26 0 45 19t19 45z\"/></svg>';
var twitterLikeIcon = '<svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M896 1664q-26 0-44-18l-624-602q-10-8-27.5-26t-55.5-65.5-68-97.5-53.5-121-23.5-138q0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344q0 221-229 450l-623 600q-18 18-44 18z\"/></svg>';
var twitterReplyIcon = '<svg width=\"1792\" height=\"1792\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1792 1120q0 166-127 451-3 7-10.5 24t-13.5 30-13 22q-12 17-28 17-15 0-23.5-10t-8.5-25q0-9 2.5-26.5t2.5-23.5q5-68 5-123 0-101-17.5-181t-48.5-138.5-80-101-105.5-69.5-133-42.5-154-21.5-175.5-6h-224v256q0 26-19 45t-45 19-45-19l-512-512q-19-19-19-45t19-45l512-512q19-19 45-19t45 19 19 45v256h224q713 0 875 403 53 134 53 333z\"/></svg>';
var x = 0;

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals.
    factory();
  }
}(this, function() {
  var twitterFetcher = {
    fetch: function() {




        var head = document.getElementsByTagName('head')[0];
        if (script !== null) {
            head.removeChild(script);
        }
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.syndication.twimg.com/widgets/timelines/' +
            '731936434932862976' + '?tweet_limit=' + tweetLimit + '&lang=en&callback=twitterFetcher.callback&' +
            'suppress_response_codes=true&rnd=' + Math.random();
        head.appendChild(script);

    },
    callback: function(data) {

      // function swapDataSrc(element) {
      //   var avatarImg = element.getElementsByTagName('img')[0];
      //   avatarImg.src = decodeURIComponent(avatarImg.getAttribute('data-src-2x'));
      //   console.log();
      //   return element;
      // };

      var tweets = [];
      var targetTimelineEle = document.getElementById('js-twitter-timeline');
      targetTimelineEle.innerHTML = data.body;
      var tmp = targetTimelineEle.querySelectorAll('.timeline-TweetList > li');
      // var tmp = targetTimelineEle.getElementsByTagName('ol')[0].childNodes;
      // targetTimelineEle.innerHTML = '';
      targetTimelineList = '';

      while (x < tmp.length) {
        // var tweetHTML = tmp[x];
        // console.log(tweetHTML);
        // targetTimelineEle.innerHTML = targetTimelineEle + tmp[x].innerHTML;
        var tweetID = tmp[x].getAttribute('data-tweet-id');
        var tweetText = tmp[x].querySelector('.timeline-Tweet-text').innerHTML;
        var tweetDateUrl = tmp[x].querySelector('.timeline-Tweet-timestamp');
        var tweetUrl = tweetDateUrl.getAttribute('href');
        var tweetID = tweetUrl.substr(tweetUrl.lastIndexOf('/') + 1);
        var tweetDate = tweetDateUrl.children[0].innerHTML;
        var tweetLikeUrl = tmp[x].querySelector('.TweetAction').getAttribute('href');
        var authorProfileImg = tmp[x].querySelector('.Avatar').getAttribute('data-src-2x');

        var authorHandle = tmp[x].querySelector('.TweetAuthor-screenName').innerHTML;
        var authorName = tmp[x].querySelector('.TweetAuthor-name').innerHTML;

        var authorUrl = tmp[x].querySelector('.TweetAuthor-link').getAttribute('href');
        var tweetMedia = '<!-- no media -->';
        if(tmp[x].querySelector('.MediaCard') != null) {
          tweetEle = tmp[x].querySelector('.MediaCard').getElementsByTagName('img')[0];
          if(tweetEle.getAttribute('data-srcset')) {
            var tweetMediaUrl = tweetEle.getAttribute('data-srcset').split(',')[1].split(' ')[0];
          } else if(tweetEle.getAttribute('src')) {
            var tweetMediaUrl = tweetEle.getAttribute('src');
          } else {
            var tweetMediaUrl = false;
          }
          if(tweetMediaUrl ){
            tweetMedia += '<a href=\"' + tweetUrl + '\" target=\"_blank\"  class=\"tweet-media\">';
            tweetMedia += '  <img class=\"media-object\" src=\"' + decodeURIComponent(tweetMediaUrl) + '\" alt=\"...\">';
            tweetMedia += '</a>';
          }


        }
        // https://o.twimg.com/2/proxy.jpg?t=HBiUAWh0dHBzOi8vdi5jZG4udmluZS5jby9yL3ZpZGVvcy9FRjA2OEI1NjVDMTMwMjcyNzI4OTg2MzU4MTY5Nl80MDM2OTczNjczNi41LjEuMTY1NjIwNDg1MDM1MjU4Njc2MzEubXA0LmpwZz92ZXJzaW9uSWQ9R0tPTzJUeEkwdFZoZkFRZzlvYkdJXzlRcWFMTUh0dEcUwAcUwAcAFgASAA&s=7CWOQ1DzL8QqQDzTlk1uVDtLKW2GmRWjVDGsb3SsAMw
        var tweetHTML='';
        tweetHTML += '<li class=\"media twitter-tweet\">';
        tweetHTML += '  <div class=\"media-left\"><code class=\"box-drawing\">├─</code></div>';
        tweetHTML += '  <div class=\"media-left\">';
        tweetHTML += '    <a href=\"' + authorUrl + '\" target=\"_blank\" class=\"tweet-author-profile-link\">';
        tweetHTML += '      <img class=\"media-object tweet-avatar-img\" src=\"' + authorProfileImg + '\" alt=\"' + authorProfileImg + '\" width="73" height="73">';
        tweetHTML += '    </a>';
        tweetHTML += '  </div>';
        tweetHTML += '  <div class=\"media-body\">';
        tweetHTML += '    <h4 class=\"media-heading tweet-heading\">';
        tweetHTML += '    <a href=\"' + authorUrl + '\" target=\"_blank\" class=\"tweet-author\">'+ authorHandle +'</a> - ';
        tweetHTML += '    <a href=\"' + tweetUrl + '\" target=\"_blank\" class=\"tweet-date\"><time>' + tweetDate + '</time></a>';
        tweetHTML += '    </h4>';
        tweetHTML += '    <p class=\"tweet-text\">' + tweetText + '</p>';
        tweetHTML += '    '+tweetMedia;
        tweetHTML += '    <ul class=\"nav nav-tweet-actions\">';
        tweetHTML += '      <li class=\"nav-tweet-item nav-tweet-action-reply\"><a href=\"https://twitter.com/intent/tweet?in_reply_to=' + tweetID + '\" target=\"_blank\" title=\"Reply\"><span class=\"sr-only\">Reply</span>' +  twitterReplyIcon + '</a></li>';
        tweetHTML += '      <li class=\"nav-tweet-action-retweet\"><a href=\"https://twitter.com/intent/retweet?tweet_id=' + tweetID + '\" target=\"_blank\" title=\"Retweet\"><span class=\"sr-only\">Retweet</span>' + twitterRetweetIcon + '</a></li>';
        tweetHTML += '      <li class=\"nav-tweet-action-like\"><a href=\"https://twitter.com/intent/like?tweet_id=' + tweetID + '\" target=\"_blank\" title=\"Like\"><span class=\"sr-only\">Like</span>' +  twitterLikeIcon + '</a></li>';
        tweetHTML += '    </ul>';
        tweetHTML += '  </div>';
        tweetHTML += '</li>';
        tweets.push(tweetHTML);
        // tweets.push(tmp[x].innerHTML);
        x++;
      }
      var tweetsString = tweets.join('');
      // console.log(tweetsString);
      targetTimelineEle.innerHTML = tweetsString;
      targetTimelineEle.className += ' in';

    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    if(document.getElementById(targetTimelineEle)) {
      window.twitterFetcher = twitterFetcher;
      twitterFetcher.fetch();
    }
  });


}));


