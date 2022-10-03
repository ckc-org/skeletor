#!/usr/bin/env bash

# Only copy over .env_sample if .env doesn't exist
cp -n .env_sample .env || echo ".env already exists"

# Create githooks in project, warns us about requirements/migrations changes
./bin/create_git_hooks.sh

# Fix symlinks from potentially busted django-admin.py startproject
ln -sf src/backend/manage.py .
ln -sf src/frontend/package.json .
ln -sf src/frontend/yarn.lock .

# Make frontend build dir so we can volume it immediately (doesn't exist otherwise)
mkdir -p src/frontend/build/

# Build docker containers
docker-compose up -d

# NOTE: "-T" flag is for running docker-compose stuff on Github actions, otherwise not
# necessary

# Make frontend assets
docker-compose exec -T builder yarn run generate

# setup database and gather assets; make sure we run this _after_ building frontend assets
docker-compose exec -T django ./manage.py collectstatic --noinput
docker-compose exec -T django ./manage.py migrate

# setup React Native, if it's around
if [ -d "src/mobile" ]; then
    cd src/mobile
    yarn
    cd ../../
fi

# set django site url and such (useful for password reset emails, typically!)
# TODO: Keep this? we always put localhost here and never use this for deployments
#printf "\n\n * - * - * - * - * - * - * - * - *\n\n"
#printf "What is the hostname? (i.e. example.com or localhost)\n > "
#read HOSTNAME
docker-compose exec -T django ./manage.py set_default_site --name=localhost --domain=localhost

# generate data (creates default admin account)
docker-compose exec -T django ./manage.py generate_data

