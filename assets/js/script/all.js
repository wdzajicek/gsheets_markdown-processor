import lazyLoad from './lazyLoad.js';
import footerDate from './footerDate.js';
//import start from './sheetsAPI.js';
import test from './test.js';

document.addEventListener('DOMContentLoaded', function() {
  lazyLoad();
  footerDate();
  //gapi.load('client', start);
  //handleClientLoad();
});
