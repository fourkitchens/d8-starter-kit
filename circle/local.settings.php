<?php
/**
 * @file
 * Local configuration settings for the Circle CI.
 */

// Database.
$databases = array(
  'default' => array(
    'default' => array(
      'database' => 'circle_test',
      'username' => 'ubuntu',
      'password' => '',
      'host' => '127.0.0.1',
      'port' => '',
      'driver' => 'mysql',
      'prefix' => '',
    ),
  ),
);

$settings['hash_salt'] = 'dfgfds88adsv7eTT76OInjdfJBJK8878kksntd7HHgki';
$settings['trusted_host_patterns'][] = '^circle\.local(.*)$';

// GA test property ID.
$config['google_analytics.settings']['account'] = "UA-00000000-0";
