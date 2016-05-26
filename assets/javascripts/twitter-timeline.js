// Use the url from a Twitter widget instead of their iFrame
// Sample url looksl like this:
// 'https://syndication.twitter.com/widgets/timelines/731936434932862976?dnt=true&domain=localhost%3A4000&lang=en'
var script = null;
var inProgress = false;
var targetTimelineEle = 'js-twitter-timeline';
var x = 0;
var twitterFetcher = {
  fetch: function() {




      var head = document.getElementsByTagName('head')[0];
      if (script !== null) {
          head.removeChild(script);
      }
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://cdn.syndication.twimg.com/widgets/timelines/' +
          '731936434932862976' + '?&lang=en&callback=twitterFetcher.callback&' +
          'suppress_response_codes=true&rnd=' + Math.random();
      head.appendChild(script);

  },
  callback: function(data) {
    var tweets = [];
    var targetTimelineEle = document.getElementById('js-twitter-timeline');
    targetTimelineEle.innerHTML = data.body;
    var tmp = targetTimelineEle.querySelectorAll('.timeline-TweetList > li');
    // var tmp = targetTimelineEle.getElementsByTagName('ol')[0].childNodes;
    targetTimelineEle.innerHTML = '';
    targetTimelineList = '';

    while (x < tmp.length) {
      var tweetHTML = tmp[x];
      // console.log(tweetHTML);
      // targetTimelineEle.innerHTML = targetTimelineEle + tmp[x].innerHTML;
      var tweetID = tmp[x].getAttribute('data-tweet-id');
      var tweetText = tmp[x].querySelector('.timeline-Tweet-text').innerHTML;
      var tweetDateUrl = tmp[x].querySelector('.timeline-Tweet-timestamp');
      var tweetUrl = tweetDateUrl.getAttribute('href');
      var tweetDate = tweetDateUrl.children[0].innerHTML;
      var tweetLikeUrl = tmp[x].querySelector('.TweetAction').getAttribute('href');
      var authorProfileImg = tmp[x].querySelector('.Avatar').getAttribute('data-src-2x');
      var tweetMedia = '<!-- no media -->';
      if(tmp[x].querySelector('.timeline-Tweet-media') != null) {
        tweetEle = tmp[x].querySelector('.timeline-Tweet-media').getElementsByTagName('img')[0];
        if(tweetEle.getAttribute('data-srcset')) {
          var tweetMediaUrl = tweetEle.getAttribute('data-srcset').split(',')[1].split(' ')[0];
        } else {
          var tweetMediaUrl = tweetEle.getAttribute('src');

        }
        // console.log(decodeURIComponent(tweetMediaUrl));
        // tweetMedia += '<a href=\"' + tweetUrl + '\" class=\"tweet-media\">';
        // tweetMedia += '  <img class=\"media-object\" src=\"' + decodeURIComponent(tweetMediaUrl) + '\" alt=\"...\">';
        // tweetMedia += '</a>';

      }
      // https://o.twimg.com/2/proxy.jpg?t=HBiUAWh0dHBzOi8vdi5jZG4udmluZS5jby9yL3ZpZGVvcy9FRjA2OEI1NjVDMTMwMjcyNzI4OTg2MzU4MTY5Nl80MDM2OTczNjczNi41LjEuMTY1NjIwNDg1MDM1MjU4Njc2MzEubXA0LmpwZz92ZXJzaW9uSWQ9R0tPTzJUeEkwdFZoZkFRZzlvYkdJXzlRcWFMTUh0dEcUwAcUwAcAFgASAA&s=7CWOQ1DzL8QqQDzTlk1uVDtLKW2GmRWjVDGsb3SsAMw
      var tweetHTML='<code class="box-drawing">├─</code>';
      tweetHTML += '<div class=\"media\">';
      tweetHTML += '  <div class=\"media-left\">';
      tweetHTML += '    <a href=\"#\">';
      tweetHTML += '      <img class=\"media-object\" src=\"' + authorProfileImg + '\" alt=\"...\">';
      tweetHTML += '    </a>';
      tweetHTML += '  </div>';
      tweetHTML += '  <div class=\"media-body\">';
      tweetHTML += '    <h4 class=\"media-heading\">';
      tweetHTML += '    <a href=\"' + tweetUrl + '\" target=\"_blank\">'+ tweetDate +'</a>';
      tweetHTML += '    <a href=\"' + tweetUrl + '\" class=\"tweet-date\" target=\"_blank\"><time>' + tweetDate + '</time></a>';
      tweetHTML += '    </h4>';
      tweetHTML += '    <p class=\"tweet-text\">' + tweetText + '</p>';
      tweetHTML += '    '+tweetMedia;
      tweetHTML += '    <ul class=\"nav nav-tweet-actions\">';
      tweetHTML += '      <li><a href=\"' + tweetLikeUrl + '\" target=\"_blank\" title=\"Like\">&hearts;</a></li>';
      tweetHTML += '    </ul>';
      tweetHTML += '  </div>';
      tweetHTML += '</div>';
      tweets.push(tweetHTML);
      // tweets.push(tmp[x].innerHTML);
      x++;
    }
    var tweetsString = tweets.join('');
    // console.log(tweetsString);
    targetTimelineEle.innerHTML = tweetsString;

  }
}
if(document.getElementById(targetTimelineEle)) {
  window.twitterFetcher = twitterFetcher;
  twitterFetcher.fetch();
}









//
// https://www.instagram.com/query/?q=ig_user(4143133)%20{%20media.after(895271319999937511,%2012)%20{%20count,%20nodes%20{%20caption,%20code,%20comments%20{%20count%20},%20date,%20dimensions%20{%20height,%20width%20},%20display_src,%20id,%20is_video,%20likes%20{%20count%20},%20owner%20{%20id%20},%20thumbnail_src%20},%20page_info%20}%20}
// $.ajax({
//   url: 'https://www.instagram.com/query/?q=ig_user(4143133)+%7B+media.after(895271319999937511%2C+12)+%7B%0A++count%2C%0A++nodes+%7B%0A++++caption%2C%0A++++code%2C%0A++++comments+%7B%0A++++++count%0A++++%7D%2C%0A++++date%2C%0A++++dimensions+%7B%0A++++++height%2C%0A++++++width%0A++++%7D%2C%0A++++display_src%2C%0A++++id%2C%0A++++is_video%2C%0A++++likes+%7B%0A++++++count%0A++++%7D%2C%0A++++owner+%7B%0A++++++id%0A++++%7D%2C%0A++++thumbnail_src%0A++%7D%2C%0A++page_info%0A%7D%0A+%7D&ref=users%3A%3Ashow&callback=instaFetcher.callback',
//   dataType: 'jsonp',
//   success: function(data) {
//     console.log('ajax');
//     console.log(data);
//   }
// });

// ig_user(4143133) {
//   media.after(895271319999937511, 12) {
//     count,
//     nodes {
//       caption,
//       code,
//       comments {
//         count
//       },
//       date,
//       dimensions {
//         height,
//         width
//       },
//       display_src,
//       id,
//       is_video,
//       likes {
//         count
//       },
//       owner {
//         id
//       },
//       thumbnail_src
//     },
//     page_info
//   }
// }
var instaFetcher = {
  fetch: function() {


      // var insta_base = 'https://www.instagram.com/query/?';
      // var insta_url = 'q=ig_user(4143133)+%7B+media.after(895271319999937511%2C+12)+%7B%0A++count%2C%0A++nodes+%7B%0A++++caption%2C%0A++++code%2C%0A++++comments+%7B%0A++++++count%0A++++%7D%2C%0A++++date%2C%0A++++dimensions+%7B%0A++++++height%2C%0A++++++width%0A++++%7D%2C%0A++++display_src%2C%0A++++id%2C%0A++++is_video%2C%0A++++likes+%7B%0A++++++count%0A++++%7D%2C%0A++++owner+%7B%0A++++++id%0A++++%7D%2C%0A++++thumbnail_src%0A++%7D%2C%0A++page_info%0A%7D%0A+%7D&ref=users%3A%3Ashow';
      // var head = document.getElementsByTagName('head')[0];
      // if (script !== null) {
      //     head.removeChild(script);
      // }
      // script = document.createElement('script');
      // script.type = 'application/javascript';
      // script.src = insta_base + insta_url + '&callback=instaFetcher.callback';
      // // script.src = JSON.parse(encodeURI(insta_url));

      // head.appendChild(script);
      // console.log(script);


  },
  callback: function(data) {
    console.log('callback');
    console.log(data);


  }
}
window.instaFetcher = instaFetcher;
instaFetcher.fetch();