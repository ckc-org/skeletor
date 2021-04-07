#!/usr/bin/env bash

source ./bin/helpers.sh

# Make sure we're set up to track updates...
SKELETOR_LOCATION="./SKELETOR_VERSION"

if [ ! -f $SKELETOR_LOCATION ]; then
    echo "ERROR: You need to set up ${SKELETOR_LOCATION} with the correct SHA"
    exit -1
fi

SKELETOR_VERSION=$(cat $SKELETOR_LOCATION)

# Try to see if there's anything new...
PATCH=$(curl -s "https://github.com/ckc-org/skeletor/compare/${SKELETOR_VERSION}...master.patch")

if [ ! -z "$PATCH" ]; then
    SKELETOR_VERSION=$(get_skeletor_master_sha)
    echo "Updating ./SKELETOR_VERSION to ${SKELETOR_VERSION}"
    echo $SKELETOR_VERSION > $SKELETOR_LOCATION

    echo "Applying patch interactively..."
    echo "$PATCH" | git apply -
    git add -p
else
    echo "Nothing to patch, you have the most up-to-date Skeletor!"
fi
