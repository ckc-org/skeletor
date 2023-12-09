#!/usr/bin/env bash

# Check for Heroku CLI installation
if ! command -v heroku &> /dev/null; then
    echo "Heroku CLI could not be found. Please install it and try again."
    exit 1
fi

# Check if the parameter is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 heroku_app_name"
    exit 1
fi

heroku_app_name=$1

# Save a dump of the local database
current_date=$(date +%Y-%m-%d-%H-%M)
local_dump_filename="${current_date}-local-dump.sql"
heroku_dump_filename="${current_date}-${heroku_app_name}-dump.sql"

echo "Saving a dump of the local database to ${local_dump_filename}"
docker-compose exec -T db bash -c "pg_dump -U \$DB_USERNAME \$DB_NAME" > "$local_dump_filename"

# Get a fresh dump from Heroku
echo "Capturing database dump Heroku..."
heroku pg:backups:capture --app "$heroku_app_name"
echo "Download dump URL from Heroku..."
heroku_dump_url=$(heroku pg:backups:url --app "$heroku_app_name")

# Check if the Heroku dump URL is obtained
if [ -z "$heroku_dump_url" ]; then
    echo "Failed to get Heroku database dump URL."
    exit 1
fi

echo "Downloading dump from Heroku..."
curl -o "$heroku_dump_filename" "$heroku_dump_url"

# Reset local database
echo "Resetting local database..."
docker-compose exec -T db bash -c "dropdb --if-exists -U \$DB_USERNAME \$DB_NAME --force"
docker-compose exec -T db bash -c "dropdb --if-exists -U \$DB_USERNAME test_\$DB_NAME --force"
docker-compose exec -T db bash -c "createdb -U \$DB_USERNAME \$DB_NAME"

# Load the dump into the local database
echo "Loading Heroku dump into the local database..."
docker-compose exec -T db bash -c "pg_restore -U \$DB_USERNAME -d \$DB_NAME -v" < "$heroku_dump_filename"

# Do migrations, just in case
echo "Running migrations..."
docker-compose exec -T django ./manage.py migrate

echo "Database restoration complete."
