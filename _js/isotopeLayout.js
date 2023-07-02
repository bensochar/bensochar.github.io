'use strict'
import Isotope from 'isotope-layout';
import Packery from 'isotope-packery';

export default function isotopeLayout() {
  const gridEles = [].slice.call(document.querySelectorAll('.js-isotope-layout'));
  gridEles.forEach.call(gridEles, function(gridEle) {
    let iso = new Isotope( gridEle, {
      itemSelector: '.js-isotope-item',
      layoutMode: 'packery',
      percentPosition: true
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  isotopeLayout()
});