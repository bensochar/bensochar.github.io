'use strict'

// scss-docs-start grid-breakpoints
// $grid-breakpoints: (
//   xs: 0,
//   sm: 576px,
//   md: 768px,
//   lg: 992px,
//   xl: 1200px
// );
export default function reportWindowSize() {
  const iw = window.innerWidth;
  const xs = 0;
  const sm = 576;
  const md = 768;
  const lg = 992;
  const xl = 1200;
  let breakpoint = 'xs'
  if (iw > xs && iw < sm) {
    breakpoint = 'sm'
  } else if (iw >= md && iw < lg) {
    breakpoint = 'md'
  } else if (iw >= lg && iw < xl) {
    breakpoint = 'lg'
  } else if (iw >= xl) {
    breakpoint = 'xl'
  }
  return breakpoint;
}