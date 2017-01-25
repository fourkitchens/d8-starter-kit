#!/bin/bash

# ------------------------------------------------------------------------------
# Import artifacts/db.sql.gz into the circle_test MySQL database.
# ------------------------------------------------------------------------------

SCRIPT_PATH=$(dirname "$0")
ARTIFACTS_PATH=$(cd $SCRIPT_PATH/artifacts && pwd)

# Check if artifacts/db.sql.gz exists.
if [ -e $ARTIFACTS_PATH/db.sql.gz ]
then
  # Extract and import the database.
  pv $ARTIFACTS_PATH/db.sql.gz | gunzip | mysql -u 'ubuntu' --password='' circle_test
else
  echo "Cannot import database, $ARTIFACTS_PATH/db.sql.gz not found!"
  exit 1
fi
