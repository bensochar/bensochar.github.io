'use strict'
export default function randomColor(selector = '.icon-link') {
  const eles = [].slice.call(document.querySelectorAll(selector));
  const styles = [
    'bg-blue',
    'bg-coral',
    'bg-green',
    'bg-indigo',
    'bg-orange',
    'bg-peach',
    'bg-pink',
    'bg-teal',
    'bg-yellow'
  ]

  function posSpan(event, ele) {
    
    let rect = event.currentTarget.getBoundingClientRect();
    let x = event.clientX - rect.left;
    ele.style.setProperty("left", x + 'px');
  }

  eles.forEach(function(ele) {
    let randomStyle = styles[Math.floor(Math.random() * styles.length)];
    let fillEle = document.createElement('span');
    fillEle.classList.add(randomStyle, 'position-absolute', 'z-index-n1', 'h-100', 'top-0');
    ele.classList.add('random-bg-hover', 'position-relative', 'overflow-hidden');
    ele.appendChild(fillEle);

    ele.addEventListener('pointerover', (event) => {
      console.log(event.type)
      posSpan(event, fillEle)
    }, false);

    // ele.addEventListener('pointerout', (event) => {
    //   console.log(event.type)
    //   ele.style.removeProperty("left");
    // }, false);

    // ele.addEventListener('pointerleave', (event) => {
    //   console.log(event.type)
    //   ele.style.removeProperty("left");      
    // }, false);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  randomColor('.icon-link')
  randomColor('.navbar-brand')
  randomColor('.navbar-nav > .nav-link')
});