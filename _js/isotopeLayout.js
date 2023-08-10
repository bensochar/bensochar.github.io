'use strict'
import Isotope from 'isotope-layout';
import Packery from 'isotope-packery';
import reportWindowSize from './reportWindowSize';

export default function isotopeLayout(event = undefined) {
  const gridEles = [].slice.call(document.querySelectorAll('.js-isotope-layout'));
  const gridEle = document.querySelector('.js-isotope-layout');
  const isoOptions = {
    itemSelector: '.js-isotope-item',
    layoutMode: 'packery',
    percentPosition: true,
    initLayout: false,
    resize: false
  }


  if (gridEle) {
    let iso = new Isotope( gridEle, isoOptions );
    const ws = reportWindowSize();
    const layoutIso = (ws === 'lg' || ws === 'xl') ? true : false;

    if (event === 'DOMContentLoaded') {
      if (layoutIso) {
        iso.arrange(isoOptions)
      } else if (iso) {
        iso.destroy();
      }
    } else if (event === 'resize') {
      if (layoutIso) {
        iso.arrange(isoOptions)
      } else if (iso) {
        iso.destroy();
      }
    }
  } 

}

document.addEventListener('DOMContentLoaded', function(event) {
  isotopeLayout(event.type);
});

window.addEventListener('resize', function(event) {
  isotopeLayout(event.type);
});
