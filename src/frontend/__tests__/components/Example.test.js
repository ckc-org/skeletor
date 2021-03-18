import { createLocalVue } from '@vue/test-utils'
import { render, fireEvent } from '@testing-library/vue'
import Vuetify from 'vuetify'
import Vuex from "vuex"

//Utils
import { create_store_module, addElemWithDataAppToBody } from '../setup.js'

describe('Example Component Test', () => {
    const localVue = createLocalVue()
    let vuetify
    let store

    beforeEach(() => {
        // Tells our local vue instance we're using Vuetify
        vuetify = new Vuetify()
        localVue.use(Vuex)

        // This mimics a <v-app> container. Mostly needed for v-dialogs and other various vuetify components
        addElemWithDataAppToBody()


        // Artificially set state properties before mounting the component
        // const note_state = {
        //     ...note_store.state(),
        //     shown: true
        // }

        // List all the stores you need for your tests -- 'key' is what the component uses
        // to reference the store (i.e. state.note_helper.list)
        // store = create_store_module([
        //     { key: 'note_helper', actions: note_store.actions, mutations: note_store.mutations, state: note_state },
        //     {
        //         key: 'projects',
        //         actions: project_store.actions,
        //         mutations: project_store.mutations,
        //         state: project_store.state
        //     }
        // ])
    })

    test('2+2=4', async () => {
        expect(2+2).toBe(4)
    })

})
