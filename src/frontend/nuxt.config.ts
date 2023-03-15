import vuetify from 'vite-plugin-vuetify'

console.log("env url: " + process.env.BASE_URL)

export default defineNuxtConfig({
  // Clientside only rendering
  ssr: false,
  nitro: {
    preset: 'service-worker'
  },

  // plugins: [
  //   'plugins/fetch.js',
  // ],

  // runtimeConfig: {
  //   public: {
  //     baseURL: process.env.BASE_URL || 'http://localhost:8000/',
  //   },
  // },

  modules: [
    '@pinia/nuxt',
    '@nuxt/devtools',

    // this adds the vuetify vite plugin
    // also produces type errors in the current beta release
    async (options, nuxt) => {
      // @ts-ignore
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
      noExternal: [
        'vuetify',
      ],
    },
  },
})
