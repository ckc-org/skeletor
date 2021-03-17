# skeletor [<img src="https://ckcollab.com/assets/images/badges/badge.svg" alt="CKC" height="20">](https://ckcollab.com)

To use this:

```bash
django-admin.py startproject new_project \
    --template=https://github.com/ckc-org/skeletor/archive/master.zip \
    --name setup,app.json,README.md
```

After cloning remove the above instructions!

-------

# {{ project_name }}


## installation

```bash
$ make

# (or make init)
```

## development

default login is "admin" password "admin"

For local development (hot reloading, etc.):
http://localhost:3000

To get to the django admin:
http://localhost:8000/admin

### reset local database

```bash
$ make reset
```

### run tests

```bash
$ make test

# ..or with coverage:
# docker-compose exec django py.test --cov-report html:artifacts/coverag
```

## configuration

if you are only doing local development you _shouldn't_ have to do any extra configuration.

for a deployment you'll want to edit `.env` with your secrets.

## generating ERD

You can use [django-extensions](https://django-extensions.readthedocs.io/en/latest/graph_models.html)
to generate a nice diagram of the current model structure.

```bash
# make sure graphviz installed
#     mac: brew install graphviz
#     linux: apt-get install graphviz-dev

# install requisite graph visualizer libs
docker-compose exec django pip install pygraphviz

# take the screenshot
docker-compose exec django ./manage.py graph_models -a -g -o my_project_visualized.png
```

## deploy

when we deploy we'll do the following.. 
 * rebuild the containers (in case of `requirements.txt` or `package.json`/`yarn.lock` changes)
 * compile & collect static assets (vuejs)
 * run migrations

```bash
$ make deploy
```

### testing emails locally

eg sending a welcome email....

```bash
$ docker-compose exec django ./manage.py email welcome hello@ckcollab.com
```
