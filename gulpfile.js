/* globals require */

(function () {

  'use strict';

  // General
  var gulp = require('gulp-help')(require('gulp'));

  // Tests.
  require('./gulp-tasks/tests.js')(gulp);

})();
