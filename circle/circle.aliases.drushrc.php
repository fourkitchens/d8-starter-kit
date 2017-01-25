<?php
/**
 * @file
 * CircleCI Drush Aliases.
 */

$aliases['circle.local'] = array(
  'uri' => 'circle.local',
  'root' => '/home/ubuntu/' . getenv('CIRCLE_PROJECT_REPONAME') . '/' . getenv('DRUPAL_DOCROOT'),
);
