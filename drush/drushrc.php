<?php

/**
 * @file
 * Drush runtime configuration.
 *
 * @see https://github.com/drush-ops/drush/blob/master/examples/example.drushrc.php
 */

$options['shell-aliases'] = [];

// Configuration export.
$options['shell-aliases']['confex'] = implode("\n", [
  "!echo '\nDisabling development modules...'",
  "drush pm-uninstall -y $(cat ../mods_enabled.local | tr '\n' ' ')",

  "echo '\nExporting configuration...'",
  "drush config-export sync -y",

  "echo '\nRe-enabling development modules...'",
  "drush pm-enable -y $(cat ../mods_enabled.local | tr '\n' ' ')",

  "echo '\nImporting development module configurations...'",
  "drush config-import local --partial -y",
]);

// Configuration import.
$options['shell-aliases']['confim'] = implode("\n", array(
  "!echo '\nInitial cache clear...'",
  "drush cache-rebuild",

  "echo '\nImporting configuration...'",
  "drush config-import sync -y",

  "echo '\nEnabling development modules...'",
  "drush pm-enable -y $(cat ../mods_enabled.local | tr '\n' ' ')",

  "echo '\nUpdating database...'",
  "drush updatedb -y",

  "echo '\nFinal cache clear...'",
  "drush cache-rebuild",
));
