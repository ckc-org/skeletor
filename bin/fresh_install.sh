#!/usr/bin/env bash

source ./bin/helpers.sh

# Only copy over .env_sample if .env doesn't exist
cp -n .env_sample .env || echo ".env already exists"

echo "Make sure you add this hostname to ALLOWED_HOSTS in .env"

# Create githooks in project, warns us about requirements/migrations changes
./bin/create_git_hooks.sh

# Store a reference of our current skeletor version, assuming we just used
# django-admin startproject yadda yadda to spin this up
SKELETOR_LOCATION="./SKELETOR_VERSION"
if [ ! -f $SKELETOR_LOCATION ]; then
    SKELETOR_VERSION=$(get_skeletor_master_sha)
    echo "Writing ./SKELETOR_VERSION of ${SKELETOR_VERSION}"
    echo $SKELETOR_VERSION > $SKELETOR_LOCATION
else
    echo "SKELETOR_VERSION already exists"
fi

# Fix symlinks from potentially busted django-admin.py startproject
ln -sf src/backend/manage.py .
ln -sf src/frontend/package.json .
ln -sf src/frontend/yarn.lock .

# first deploy
./bin/deploy.sh

# set django site url and such (useful for password reset emails, typically!)
printf "\n\n * - * - * - * - * - * - * - * - *\n\n"
printf "What is the hostname? (i.e. example.com or localhost)\n > "
read HOSTNAME
docker-compose exec django ./manage.py set_default_site --name=$HOSTNAME --domain=$HOSTNAME

# generate data (creates default admin account)
docker-compose exec django ./manage.py generate_data

# Restart to make sure things are started properly (i.e. vuetify on first install)
docker-compose restart
