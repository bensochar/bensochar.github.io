'use strict'
export default function lazyLoadImgs() {
  const eles = [].slice.call(document.querySelectorAll('.js-lazy'));

  if ('IntersectionObserver' in window) {
    let imgObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let imgEle = entry.target;
          imgEle.src = imgEle.dataset.src;
          // imgEle.srcset = imgEle.dataset.srcset;
          imgEle.classList.remove('js-lazy');
          imgObserver.unobserve(imgEle);
        }
      });
    });

    eles.forEach(function(imgEle) {
      imgObserver.observe(imgEle);
    });
  } else {
    // Possibly fall back to event handlers here
  }
}

document.addEventListener('DOMContentLoaded', function() {
  lazyLoadImgs()
});