# skeletor [<img src="https://ckcollab.com/assets/images/badges/badge.svg" alt="CKC" height="20">](https://ckcollab.com)

To use this:

```bash
django-admin.py startproject new_project \
    --template=https://github.com/ckcollab/skeletor/archive/master.zip \
    --name bin/heroku/setup,app.json,README.md
```

After cloning remove the above instructions!

-------

# {{ project_name }}


## installation

```bash
$ make
```

can now view http://localhost or http://localhost:8000

## development

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
```

## configuration

if you are only doing local development you _shouldn't_ have to do any extra configuration.

for a deployment you'll want to edit `.env` with your secrets.

## deploy

when we deploy we'll do the following.. 
 * rebuild the containers (in case of `requirements.txt` or `package.json` changes)
 * compile & collect static assets (vuejs)
 * run migrations

```bash
$ make deploy
```
