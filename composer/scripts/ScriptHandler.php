<?php

/**
 * @file
 * Contains \DrupalProject\composer\ScriptHandler.
 */

namespace DrupalProject\composer;

use Composer\Script\Event;
use Composer\Semver\Comparator;
use Symfony\Component\Filesystem\Filesystem;

class ScriptHandler {

  /**
   * Returns the path to the project root directory.
   *
   * @return string
   *   The absolute path to the project root.
   */
  protected static function getProjectRoot() {
    return getcwd();
  }

  /**
   * Returns the path to the Drupal root directory.
   *
   * @param $project_root
   *   The absolute path to the project root.
   *
   * @return string
   *   The absolute path to the Drupal root.
   */
  protected static function getDrupalRoot($project_root) {
    return self::getProjectRoot() . '/docroot';
  }

  /**
   * Create required Drupal files and directories.
   *
   * @param \Composer\Script\Event $event
   *   The event that triggered this method.
   */
  public static function createRequiredFiles(Event $event) {
    $fs = new Filesystem();
    $project_root = self::getProjectRoot();
    $drupal_root = self::getDrupalRoot($project_root);

    $dirs = [
      'modules',
      'profiles',
      'themes',
    ];

    // Required for unit testing
    foreach ($dirs as $dir) {
      if (!$fs->exists($drupal_root . '/'. $dir)) {
        $fs->mkdir($drupal_root . '/'. $dir);
        $fs->touch($drupal_root . '/'. $dir . '/.gitkeep');
      }
    }

    // Prepare the settings file for installation
    if (!$fs->exists($drupal_root . '/sites/default/settings.php') and $fs->exists('./settings/example.settings.php')) {
      $fs->copy('./settings/example.settings.php', $drupal_root . '/sites/default/settings.php');
      $fs->chmod($drupal_root . '/sites/default/settings.php', 0666);
      $event->getIO()->write("Create a sites/default/settings.php file with chmod 0666");
    }

    // Prepare the local settings file for installation
    if (!$fs->exists($drupal_root . '/sites/default/local.settings.php') and $fs->exists('./settings/example.local.settings.php')) {
      $fs->copy('./settings/example.local.settings.php', $drupal_root . '/sites/default/local.settings.php');
      $fs->chmod($drupal_root . '/sites/default/settings.php', 0666);
      $event->getIO()->write("Create a sites/default/local.settings.php file with chmod 0666");
    }

    // Prepare the services file for installation
    if (!$fs->exists($drupal_root . '/sites/default/services.yml') and $fs->exists($drupal_root . '/sites/default/default.services.yml')) {
      $fs->copy($drupal_root . '/sites/default/default.services.yml', $drupal_root . '/sites/default/services.yml');
      $fs->chmod($drupal_root . '/sites/default/services.yml', 0666);
      $event->getIO()->write("Create a sites/default/services.yml file with chmod 0666");
    }

    // Create the files directory with chmod 0777
    if (!$fs->exists($drupal_root . '/sites/default/files')) {
      $oldmask = umask(0);
      $fs->mkdir($drupal_root . '/sites/default/files', 0777);
      umask($oldmask);
      $event->getIO()->write("Create a sites/default/files directory with chmod 0777");
    }
  }

  /**
   * Checks if the installed version of Composer is compatible.
   *
   * Composer 1.0.0 and higher consider a `composer install` without having a
   * lock file present as equal to `composer update`. We do not ship with a lock
   * file to avoid merge conflicts downstream, meaning that if a project is
   * installed with an older version of Composer the scaffolding of Drupal will
   * not be triggered. We check this here instead of in drupal-scaffold to be
   * able to give immediate feedback to the end user, rather than failing the
   * installation after going through the lengthy process of compiling and
   * downloading the Composer dependencies.
   *
   * @see https://github.com/composer/composer/pull/5035
   */
  public static function checkComposerVersion(Event $event) {
    $composer = $event->getComposer();
    $io = $event->getIO();

    $version = $composer::VERSION;

    // The dev-channel of composer uses the git revision as version number,
    // try to the branch alias instead.
    if (preg_match('/^[0-9a-f]{40}$/i', $version)) {
      $version = $composer::BRANCH_ALIAS_VERSION;
    }

    // If Composer is installed through git we have no easy way to determine if
    // it is new enough, just display a warning.
    if ($version === '@package_version@' || $version === '@package_branch_alias_version@') {
      $io->writeError('<warning>You are running a development version of Composer. If you experience problems, please update Composer to the latest stable version.</warning>');
    }
    elseif (Comparator::lessThan($version, '1.0.0')) {
      $io->writeError('<error>Drupal-project requires Composer version 1.0.0 or higher. Please update your Composer before continuing</error>.');
      exit(1);
    }
  }

}
