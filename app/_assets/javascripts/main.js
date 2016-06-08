
// Kill it with fire on load
// ------------------------------------------
window.onload = function() {
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
        layoutMode: 'masonry'
          // layoutMode: 'masonry',
          // percentPosition: true
          // layoutMode: 'fitRows'
      });
    } else {
      // iso.destroy();
    }
  }

};