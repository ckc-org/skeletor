#!/usr/bin/env bash

docker-compose exec db bash -c "
echo 'dropping database'
dropdb --if-exists -U \$DB_USERNAME \$DB_NAME --force
dropdb --if-exists -U \$DB_USERNAME test_\$DB_NAME --force
echo \$DB_PASSWORD
echo 'drop successful'
echo 'creating db'
createdb -U \$DB_USERNAME \$DB_NAME
echo 'create successful'
"

docker-compose exec django bash -c "
python manage.py migrate && python manage.py generate_data
"

docker-compose exec django ./manage.py set_default_site --name=localhost --domain=localhost:8000
