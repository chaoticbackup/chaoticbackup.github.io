// function debounce(f, t) {
//     return function (args) {
//       let previousCall = this.lastCall;
//       this.lastCall = Date.now();
//       if (previousCall && ((this.lastCall - previousCall) <= t)) {
//         clearTimeout(this.lastCallTimer);
//       }
//       this.lastCallTimer = setTimeout(() => f(args), t);
//     }
// }

// function debounce2 (func, wait, immediate) {
//     let timeout;
//     return function() {
//         const context = this, args = arguments;
//         const later = function() {
//             clearTimeout(timeout);
//             func.apply(context, args);
//         };
//         clearTimeout(timeout);
//         if (immediate) func.apply(context, args);
//         else timeout = setTimeout(later, wait);
//     };
// }
  
  
  /* https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44 */
  export function debounced(delay, fn) {
    let timerId;
    return function (...args) {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    }
  }
  
  export function throttled(delay, fn) {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      return fn(...args);
    }
  }
  