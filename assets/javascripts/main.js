window.onload = function() {
  init();
};

init = function() {
  if(document.getElementById('js-gallery-project')){
    var elem = document.querySelector('.gallery-project');
    var iso = new Isotope(elem, {
      // options
      itemSelector: '.gallery-project-item',
      layoutMode: 'masonry'
        // layoutMode: 'masonry',
        // percentPosition: true
        // layoutMode: 'fitRows'
    });
  }
};