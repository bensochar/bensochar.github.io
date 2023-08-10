'use strict'
export default function filterFix() {
  const scrollY = window.scrollY;
  if (scrollY == 0) {
    window.scroll({
      top: window.scrollY + 1,
      left: 0
    }); 
  }
}

document.addEventListener('DOMContentLoaded', function() {
  filterFix()
});