import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',

    // @ts-ignore
    // this adds the vuetify vite plugin
    // also produces type errors in the current beta release
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
        vuetify()
      ))
    }
  ],

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  css: ['vuetify/styles'], // vuetify ships precompiled css, no need to import sass
  vite: {
    // @ts-ignore
    // curently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
    ssr: {
      noExternal: ['vuetify'], // add the vuetify vite plugin
    },
  },
})
