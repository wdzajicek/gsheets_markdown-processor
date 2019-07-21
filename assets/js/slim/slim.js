import test from './test.js';
import handleClientLoad from './gapiInit.js';
import setDate from './setDate.js';

document.addEventListener('DOMContentLoaded', function() {
  setDate();
  handleClientLoad();
});
