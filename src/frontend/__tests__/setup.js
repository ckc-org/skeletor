// This is required for Jest to know we're using Vuetify
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from "vuex"

Vue.use(Vuetify)


// These are functions you'll probably need to call before each test
export function create_store_module(stores) {
    const modules = {}
    stores.forEach(({key, actions, state, mutations}) => {
        modules[key] = {
            state,
            actions,
            mutations
        }
    })
    return new Vuex.Store({ modules })
}

export function addElemWithDataAppToBody() {
    // Vuetify needs this container div to mock <v-app>
    const app = document.createElement('div')
    app.setAttribute('data-app', true)
    document.body.append(app)
}
