
$(function() {

  if(Modernizr.webp){
    $('source[data-src]').unveil(200, false, 'srcset');
  } else {
    $('img[data-src]').unveil(200, false, 'src');
  }

});

// Kill it with fire on load
// ------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  // init();
  if(document.getElementsByClassName) { // Doubt anybody is using < IE9, but never know
    var cusid_ele = document.getElementsByClassName('js-random-bg-color-hover');
    for (var i = 0; i < cusid_ele.length; ++i) {
      var rng = Math.random() * (8 - 0) + 0;
      var item = cusid_ele[i];
      item.className += ' bg-color-hover-' + Math.round(rng);//set class
    }
  }

});

window.onload = function() {
  init();

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
  console.log(w + ',' + h);
  return vpArray;
};


// Any functions might have to get fired after AJAX or Window resize goes hurrrrrre
// ------------------------------------------
init = function() {
  vpArray = getViewport();

  if(document.getElementById('js-gallery-project')){
    if(vpArray[0] > 600){
      var elem = document.querySelector('.gallery-project');
      var iso = new Isotope(elem, {
        // options
        itemSelector: '.gallery-project-item',
        layoutMode: 'packery',
        transitionDuration: 0
        // originTop: false
          // layoutMode: 'masonry',
          // percentPosition: true
          // layoutMode: 'fitRows'
      });
    } else {
      // iso.destroy();
    }
  }

  // var colcade = new Colcade( '.gallery-project', {
  //   columns: '.gallery-project-item',
  //   items: '.gallery-project-item'
  // });

};