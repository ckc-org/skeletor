/*
This is where we can initialize AFTER authenticating, a "nuxt auth" plugin
 */

// eslint-disable-next-line no-unused-vars
export default function ({ app, $auth, store }) {
  // If we need to call this in a component, you can do that like so:
  //   this.$auth.ctx.app.project_initialize()
  app.project_initialize = () => {
    // Connect to websocket and start receiving store commits from backend
    // store.dispatch('realtime/start_listening')

    // TODO: Add more "on project start" stuff here!
    // store.dispatch('some_object/get')
  }

  if ($auth.loggedIn) {
    // Do our initializing, we have our user at this point
    app.project_initialize()
  }
}
