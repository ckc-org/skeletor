<img src="docs/skeletor_full.png" alt="Skeletor" width="420" align="left">

&nbsp;<br>

# skeletor [<img src="https://ckcollab.com/assets/images/badges/badge.svg" alt="CKC" height="20">](https://ckcollab.com)

This is the official [CKC](https://ckcollab.com) base project, we use this
for most of our new clients. It gives us:

&nbsp;&nbsp; ❯ &nbsp;One command dev install: `make`<br>
&nbsp;&nbsp; ❯ &nbsp;Stack: [Django](https://www.djangoproject.com/) + [Vue](https://vuejs.org/) + [React Native](https://reactnative.dev/)<br>
&nbsp;&nbsp; ❯ &nbsp;[Heroku](https://heroku.com/) deploys for frontend and backend<br>
&nbsp;&nbsp; ❯ &nbsp;Email templates + helpers<br>
&nbsp;&nbsp; ❯ &nbsp;[Pre-commit](https://pre-commit.com) with [ruff](https://beta.ruff.rs/)<br>
&nbsp;&nbsp; ❯ &nbsp;Fast backend tests w/coverage ([pytest](https://docs.pytest.org/))<br>
&nbsp;&nbsp; ❯ &nbsp;Hot reloading for local dev<br>
&nbsp;&nbsp; ❯ &nbsp;[Expo](https://expo.dev/) for [React Native](https://reactnative.dev/)<br>

&nbsp;<br>
&nbsp;<br>
&nbsp;<br>
&nbsp;<br>

### Start a project..

```bash
SKELETOR_BRANCH=master bash <(curl -fsSL https://skeletor.ckcollab.com)
```

&nbsp;<br>
&nbsp;<br>
&nbsp;<br>
&nbsp;<br>

<img src="docs/skeletor_creation.gif" width="100%" alt="Skeletor installation">

---

# SKELETOR_NAME_PLACEHOLDER

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
# docker-compose exec frontend bun run test
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

-   rebuild the containers (in case of `requirements.txt` or `package.json` changes)
-   compile & collect static assets (vuejs)
-   run migrations

```bash
$ make deploy
```

### testing emails locally

eg sending a welcome email....

```bash
$ docker-compose exec django ./manage.py email welcome hello@ckcollab.com
```

# Mobile App (src/mobile directory)

## Running locally

### Install dependencies

Run `npm i` inside of the `src/mobile` directory.

### Environment variables

Populate a .env file with the following variables, so they get pulled into the device when running Expo Go:

```
BACKEND_URL=localhost:8000
```

If you want to run it on your device, you'll have to replace `BACKEND_URL` with your host computer's local IP address, so the phone can talk to the server.

### Start up iOS simulator

Run `npm run ios` to automatically start up an iOS simulator with expo.

### Run locally on physical device

Change the `BACKEND_URL` environment variable in `.env` to your machine's local IP address (not localhost). This will allow your phone to know which server to send API requests to.

`src/mobile/.env`:

```diff
- BACKEND_URL=localhost:8000
# Example local ip
+ BACKEND_URL=192.168.1.133:8000
```

Run `npm run start` to run expo without an iOS simulator. Although, `npm run ios` will work fine for this as well if you want both a physical device and a simulator running.

## How the mobile app works

### Routing

The app uses `expo-router` for file-based routing. This allows us to create screens without writing out all of the boiler plate for react navigation. The screens are separated into two main sections `(auth)` and `(root)` which are [Groups](https://expo.github.io/router/docs/features/routing#groups) from `expo-router`. The idea is to separate out screens that should be protected by auth from those that shouldn't be.

In order to protect the screens in the `(root)` group, the ones that should require the user to be authenticated, the app uses [react context](https://reactjs.org/docs/context.html#reactcreatecontext) (in `context/auth/provider.tsx`). This context tracks auth state. Any time the user logs in or out or the route changes (navigation happened), this context will check if the user is in the right place. For example, if the user is logged out, but the route is somewhere in the `(root)` group, the app will redirect to the `splash` screen, the screen that appears when a user opens the app for the first time.

The `user` object inside of the auth context is persisted using `AsyncStorage`, so we know if the user is logged in next time the app starts.

### Auth

The app uses token authentication via `axios`. `axios` is configured (in the `requests.ts` file) not to send cookies with the `withCredentials: false` setting, so that session auth (and csrf) doesn't intefere with the requests of the app.

When the user logs in, `axios` will take the token from the response and assign the `Authorization` header. It also saves it to `AsyncStorage`, so that when the app loads up next time, it loads the value into the `axiosInstance`. When the user logs out, the `Authorization` header is cleared along with the token in `AsyncStorage`.
