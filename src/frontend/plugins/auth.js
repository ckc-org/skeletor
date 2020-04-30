/*
This is where we can initialize AFTER authenticating, a "nuxt auth" plugin
 */

export default function ({app, $auth, store}) {
    // If we need to call this in a component, you can do that like so:
    //   this.$auth.ctx.app.project_initialize()
    app.project_initialize = () => {
        // store.dispatch('some_object/get')
    }

    if ($auth.loggedIn) {
        // Do our initializing, we have our user at this point
        app.project_initialize()
    }
}
