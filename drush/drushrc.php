<?php

$options['shell-aliases'] = [
  'confex' =>
    "!echo '\nDisabling development modules...'
    drush {{@target}} pmu -y $(cat ../mods_enabled.local | tr '\n' ' ')
    echo '\nExporting configuration...'
    drush {{@target}} cex -y
    echo '\nRe-enabling development modules...'
    drush {{@target}} en -y $(cat ../mods_enabled.local | tr '\n' ' ')
    echo '\nImporting development module configuration...'
    drush @nyu-pubhealth.local cim local --partial -y",
  'confim' =>
    "!echo '\nInitial cache clear...'
    drush {{@target}} cr
    echo '\nImporting configuration...'
    drush {{@target}} cim sync -y
    echo '\nEnabling development modules...'
    drush {{@target}} en -y $(cat ../mods_enabled.local | tr '\n' ' ')
    echo '\nUpdating database...'
    drush {{@target}} updb -y
    echo '\nFinal cache clear...'
    drush {{@target}} cr",
];
