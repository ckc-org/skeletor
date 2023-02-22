# Running locally

Populate a .env file with the following variables, so they get pulled into the device when running Expo Go:

```
API_DOMAIN=localhost:8000
```

If you want to run it on your device, you'll have to replace `API_DOMAIN` with your host computer's local IP address, so the phone can talk to the server.

# How it works

### Routing

The app uses `expo-router` for file-based routing. This allows us to create screens without writing out all of the boiler plate for react navigation. The screens are separated into two main sections `(auth)` and `(root)` which are [Groups](https://expo.github.io/router/docs/features/routing#groups) from `expo-router`. The idea is to separate out screens that should be protected by auth from those that shouldn't be.

In order to protect the screens in the `(root)` group, the ones that should require the user to be authenticated, the app uses [react context](https://reactjs.org/docs/context.html#reactcreatecontext) (in `context/auth/provider.tsx`). This context tracks auth state. Any time the user logs in or out or the route changes (navigation happened), this context will check if the user is in the right place. For example, if the user is logged out, but the route is somewhere in the `(root)` group, the app will redirect to the `splash` screen, the screen that appears when a user opens the app for the first time.

The `user` object inside of the auth context is persisted using `AsyncStorage`, so we know if the user is logged in next time the app starts.

### Auth

The app uses token authentication via `axios`. `axios` is configured (in the `requests.ts` file) not to send cookies with the `withCredentials: false` setting, so that session auth (and csrf) doesn't intefere with the requests of the app.

When the user logs in, `axios` will take the token from the response and assign the `Authorization` header. It also saves it to `AsyncStorage`, so that when the app loads up next time, it loads the value into the `axiosInstance`. When the user logs out, the `Authorization` header is cleared along with the token in `AsyncStorage`.