/* globals require, process, __dirname */

(function () {

  'use strict';

  const options = require('minimist')(process.argv.slice(2), {
    alias: {
      t: 'task',
      y: 'yes',
      h: 'help'
    }
  });
  const fs = require('fs');
  const path = require('path');
  const execSync = require('child_process').execSync;
  const yaml = require('js-yaml');
  const prompt = require('gulp-prompt');
  const tap = require('gulp-tap');
  const _ = require('lodash');

  module.exports = function (gulp) {

    let projectDir = path.join(__dirname, '../');
    let projectConfig = {};

    // Load config from project.yml.
    try {
      projectConfig = yaml.safeLoad(fs.readFileSync(path.join(projectDir, 'project.yml'), 'utf8'));
    } catch (e) {}

    // Get local project config from local.project.yml and merge.
    try {
      let localConfig = yaml.safeLoad(fs.readFileSync(path.join(projectDir, 'local.project.yml'), 'utf8'));
      projectConfig = _.defaultsDeep(localConfig, projectConfig);
    } catch (e) {}

    function initEnv() {
      let defaults = _.get(projectConfig, 'env.default', {});

      _.forIn(projectConfig.env, function (vars, env) {
        let envVars = _.defaultsDeep(projectConfig.env[env], defaults);

        _.forIn(envVars, function (value, key) {
          process.env['ENV_' + env.toUpperCase() + '_' + key.toUpperCase()] = value;
        });
      });
    }

    function taskHelp() {
      let output = 'Syntax: gulp run -t task_name \n';
      output += 'Available run tasks: \n';

      _.forIn(projectConfig.run, function(task, name) {
        if (task.hasOwnProperty('description')) {
          output += name + ': ' + task.description + '\n';
        }
      });

      return output;
    }

    // Initialize environment variables.
    initEnv();

    gulp.task('aliases', 'Setup drush aliases.', function () {
      console.log('Setting up Drush aliases...');

      let projectDrush = path.join(projectDir, 'drush');
      let homeDrush = path.join(process.env.HOME, '.drush');

      fs.readdirSync(projectDrush)
        .filter((child) => {
          return child.indexOf('.aliases.drushrc.php') > 0;
        })
        .forEach((child) => {
          if (!fs.existsSync(homeDrush)) {
            fs.mkdirSync(homeDrush);
          }

          if (!fs.existsSync(path.join(homeDrush, child))) {
            console.log('Adding Drush alias: ' + child);
            fs.symlinkSync(path.join(projectDrush, child), path.join(homeDrush, child));
          }
        });
    }, {
      options: {}
    });

    gulp.task('run', 'Project run tasks.', function () {
      // Help option set or task option set without a task.
      if (options.hasOwnProperty('h')
        || !options.hasOwnProperty('t')
        || (options.hasOwnProperty('t') && !options.t.length)) {
        console.log(taskHelp());
        return;
      }

      function executeTaskCommand(task) {
        console.log('Running "' + task + '" commands.');

        try {
          projectConfig.run[task].commands.forEach((command) => {
            if (command.indexOf('echo ') < 0) {
              console.log('Command: ' + command);
            }

            execSync(command, {stdio: 'inherit'});
          });
        } catch (err) {
          console.log(err.message);
        }
      }

      // Run the task commands.
      if (options.hasOwnProperty('t') && options.t.length > 0) {
        let task = options.t;

        if (_.hasIn(projectConfig, 'run.' + task)) {
          let taskConfig = projectConfig['run'][task];

          // If task config has a confirm property and it is not false and the
          // --yes option has not been set, prompt the user with the
          // confirmation message.
          if (taskConfig.hasOwnProperty('confirm')
            && taskConfig.confirm
            && !options.hasOwnProperty('y')) {
            return gulp.src('')
              .pipe(prompt.prompt({
                type: 'confirm',
                name: 'task',
                message: taskConfig.confirm,
                default: false
              }, function (res) {
                if (res.task) {
                  executeTaskCommand(task);
                }
              }));
          }
          // No prompt, just execute the task commands.
          else {
            executeTaskCommand(task);
          }
        }
        else {
          console.log('Task "' + task + '" is not defined in project.yml.');
          console.log(taskHelp());
        }
      }
    }, {
      options: {
        task: 'The project task to run.',
        yes: 'Automatically confirm all prompts.',
        help: 'Print available run tasks.'
      }
    });

  };
})();
