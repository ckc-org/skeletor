# skeletor

To use this:

```bash
django-admin.py startproject something_wonderful \
    --template=https://github.com/ckcollab/skeletor/archive/master.zip \
    --name setup,app.json,README.md
```

After cloning remove the above instructions!

-------

# {{ project_name }}


## installation

```bash
$ cp .env_sample .env
$ make
```

can now view http://localhost or http://localhost:8000

## development

For local development (hot reloading, etc.):
http://localhost:3000

Reset local database:

```bash
$ make reset
```

Run tests:

```bash
$ make test
```

## deploy

when we deploy we'll do the following.. 
 * rebuild the containers (in case of `requirements.txt` or `package.json` changes)
 * compile & collect static assets (vuejs)
 * run migrations

```bash
$ make deploy
```