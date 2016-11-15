/* globals require, process, __dirname */

(function () {

  'use strict';

  var options = require('minimist')(process.argv.slice(2));

  // JS.
  var eslint = require('gulp-eslint');

  // PHP.
  var tap = require('gulp-tap');
  var execSync = require('sync-exec');

  module.exports = function (gulp) {

    gulp.task('eslint', 'Check JavaScript files for coding standards issues.', function () {
      var excludePatterns = [];
      var sourcePatterns = [
        '*.js',
        '**/*.js'
      ];
      var patterns = [];

      // If path is provided, override.
      if (options.hasOwnProperty('path') && options.path.length > 0) {
        sourcePatterns = [
          options.path + '/*.js',
          options.path + '/**/*.js'
        ];
      }

      // Merge sourcePatterns with excludePatterns.
      patterns = sourcePatterns.concat(excludePatterns);
      return gulp.src(patterns)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
    }, {
      options: {
        path: 'The path in which to check coding standards.'
      }
    });

    gulp.task('phpcs', 'Check PHP files for coding standards issues.', function () {
      // Source file defaults to a pattern.
      var extensions = '{php,module,inc,install,test,profile,theme}';
      var sourcePatterns = [
        '**/*.' + extensions,
        '*.' + extensions
      ];
      var excludePatterns = [
        '!**/autoload.php',
        '!**/vendor/**/*',
        '!node_modules/**/*',
        '!circle/**/*',
        '!scripts/**/*',
        '!pattern-lab/**/*',
        '!drush/**/*',
        '!web/core/**/*',
        '!web/modules/contrib/**/*',
        '!web/profiles/contrib/**/*',
        '!web/themes/contrib/**/*',
        '!**/source/_twig-components/**/*',
        '!files/**/*',
        '!**/example.settings.php',
        '!**/example.local.settings.php',
        '!**/local.settings.php',
        '!**/settings.secret.php',
        '!acquia-utils/**/*',
        '!library/**/*',
        '!hooks/**/*'
      ];

      // If path is provided, override.
      if (options.hasOwnProperty('path') && options.path.length > 0) {
        sourcePatterns = [
          options.path + '/*.' + extensions,
          options.path + '/**/*.' + extensions
        ];
      }

      // Merge sourcePatterns with excludePatterns.
      var patterns = sourcePatterns.concat(excludePatterns);

      return gulp.src(patterns)
        .pipe(tap(function (file) {
          execSync(__dirname + '/../vendor/bin/phpcs --config-set installed_paths ' + __dirname + '/../vendor/drupal/coder/coder_sniffer');
          var report = execSync(__dirname + '/../vendor/bin/phpcs --standard="./ruleset.xml" ' + file.path);
          if (report.stdout.length > 0) {
            // Log report, and remove silly Code Sniffer 2.0 ad.
            /* eslint-disable */
            console.log(report.stdout.split('UPGRADE TO PHP_CODESNIFFER 2.0 TO FIX ERRORS AUTOMATICALLY')[0]);
            /* eslint-enable */
          }

          if (report.status !== 0 && options.hasOwnProperty('exit')) {
            // Exit with error code.
            /* eslint-disable */
            process.exit(report.status);
            /* eslint-enable */
          }
        }));
    }, {
      options: {
        path: 'The path in which to check coding standards.',
        exit: 'Exit with an error code if phpcs finds errors.'
      }
    });

    gulp.task('lint', 'Run all coding standard and style checking tools.', ['eslint', 'phpcs']);

  };

})();
