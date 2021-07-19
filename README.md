<img src="docs/skeletor_full.png" alt="CKC" width="420" align="left">

&nbsp;<br>

# skeletor [<img src="https://ckcollab.com/assets/images/badges/badge.svg" alt="CKC" height="20">](https://ckcollab.com)

This is the official [CKC](https://ckcollab.com) base project, we use this
for most of our new clients. It gives us:

 &nbsp;&nbsp; ❯ &nbsp;One command dev install: `make`<br>
 &nbsp;&nbsp; ❯ &nbsp;Heroku deploys for frontend and backend<br>
 &nbsp;&nbsp; ❯ &nbsp;Email templates + helpers<br>
 &nbsp;&nbsp; ❯ &nbsp;Fast tests w/coverage (pytest)<br>
 &nbsp;&nbsp; ❯ &nbsp;Hot reloading for local dev<br>
 
 
&nbsp;<br>
&nbsp;<br>
&nbsp;<br>
&nbsp;<br>


### Start a project..

Use [`django-admin startproject`](https://docs.djangoproject.com/en/3.2/ref/django-admin/#startproject) to clone skeletor

```bash
$ django-admin.py startproject new_project \
    --template=https://github.com/ckc-org/skeletor/archive/master.zip \
    --name index.md,setup,app.json,README.md
```

```bash
$ cd new_project
```

Finally, remove this section from the README and continue below!

-----------------



# new_project


## installation

```bash
$ make

# (or make init)
```

## development

default login is "admin@admin.com" password "admin"

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

# run frontend tests
# docker-compose exec builder yarn test
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
