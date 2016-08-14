
// From 'sass/bootstrap/variables'
var screenSM = 768;
var screenMD = 992;
var screenLG = 1264;
var body = document.getElementsByTagName('body')[0];
$(function() {

  var supportWebp;
  supportWebp = Modernizr.webp;
  console.log(supportWebp);
  if(document.getElementById('js-gallery-project')){
    if (supportWebp == true) {
      console.log('supportWebp should be true');
      $('source[data-src]').unveil(400);
    } else {
      console.log('supportWebp should be false');
      $('img[data-src]').unveil(400);
    }
  }

});

// Kill it with fire on load
// ------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  init();
  if(document.getElementsByClassName) { // Doubt anybody is using < IE9, but never know
    var childToColor_ele = document.getElementById('nav-footer');
    var childToColor_array = childToColor_ele.children;
    for (var i = 0; i < childToColor_array.length; ++i) {
      var item = childToColor_array[i].children[0];
      item.className += ' js-random-bg-color-hover';
    }

    var linksToColor_ele = document.getElementsByClassName('js-random-bg-color-hover');
    for (var i = 0; i < linksToColor_ele.length; ++i) {
      var rng = Math.random() * (8 - 0) + 0;
      var item = linksToColor_ele[i];
      item.className += ' bg-color-hover-' + Math.round(rng);//set class
    }
  }



});

window.onload = function() {
  init();
  removeTweetStyle();
  body.className += ' window-loaded'; //set class

};
window.onresize = function() {
  init();
};

// Get the Viewport for responsive stuffz
// Array index for width then height repectively
// ------------------------------------------
getViewport = function() {
  var vpArray = [];
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  vpArray.push(w);
  vpArray.push(h);
  // console.log(w + ',' + h);
  return vpArray;
};

// Remove styles for embbed tweets
// ------------------------------------------
removeTweetStyle = function() {
  if(document.getElementsByTagName('twitterwidget')) {
    var twitterwidget_ele = document.getElementsByTagName('twitterwidget');
    for (var i = 0; i < twitterwidget_ele.length; ++i) {
      var item = twitterwidget_ele[i];
      item.removeAttribute('style'),
      item.className += ' twitter-tweet-loaded';//set class
    }
  }

};


// Any functions might have to get fired after AJAX or Window resize goes hurrrrrre
// ------------------------------------------
init = function() {
  vpArray = getViewport();

  if(document.getElementById('js-gallery-project')){
    if(vpArray[0] > screenSM){
      var elem = document.querySelector('.gallery-project');
      var iso = new Isotope(elem, {
        // options
        itemSelector: '.gallery-project-item',
        layoutMode: 'packery',
        transitionDuration: 0
      });

      function onArrange() {
        console.log('arrange done');
      }
      // bind event listener
      iso.on( 'arrangeComplete', onArrange );
      // un-bind event listener
      iso.off( 'arrangeComplete', onArrange );
      // bind event listener to be triggered just once
      iso.once( 'arrangeComplete', function() {
        console.log('arrange done, just this one time');
      });
    } else {
      // iso.destroy();
    }
  }



};