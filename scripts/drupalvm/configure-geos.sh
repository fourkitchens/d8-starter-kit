#!/bin/bash

# Compiles and configures the geos php module.

GEOS_SETUP_COMPLETE_FILE=/etc/drupal_vm_geos_config_complete
GEOS_VERSION="3.4.2"
GEOS_DOWNLOAD="http://download.osgeo.org/geos/geos-$GEOS_VERSION.tar.bz2"
GEOS_DOWNLOAD_DIR="/tmp"
PHP_VERSION="5.6"

# Check to see if we've already performed this setup.
if [ ! -e "$GEOS_SETUP_COMPLETE_FILE" ]; then
  # Get the geos module and compile.
  cd $GEOS_DOWNLOAD_DIR
  wget $GEOS_DOWNLOAD
  tar -xjf geos-$GEOS_VERSION.tar.bz2
  cd geos-$GEOS_VERSION
  ./configure --enable-php
  make
  sudo make install

  # Add geos configuration.
  sudo bash -c "cat > /etc/php/$PHP_VERSION/mods-available/geos.ini << EOF
; Configuration for php geos module.
; priority=50
extension=geos.so
EOF"

  # Enable the module and restart apache.
  sudo phpenmod geos
  sudo service apache2 restart

  # Create a file to indicate this script has already run.
  sudo touch $GEOS_SETUP_COMPLETE_FILE
else
  exit 0
fi
