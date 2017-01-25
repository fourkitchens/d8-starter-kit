/* globals require */

(function () {

  'use strict';

  // General.
  let gulp = require('gulp-help')(require('gulp'));

  // Project gulp tasks.
  require('./gulp-tasks/project.js')(gulp);

  // TODO: Fix code smell implementation
  // See: https://github.com/fourkitchens/d8-starter-kit/issues/1

  // Emulsify gulp tasks.
  // let localConfig = {};
  //
  // try {
  //   localConfig = require('./emulsify.gulp-config');
  // }
  // catch (e) {
  //   // Do nothing.
  // }
  //
  // require('emulsify-gulp')(gulp, localConfig);

})();
