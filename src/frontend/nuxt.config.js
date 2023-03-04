import webpack from 'webpack'
import head_config from './head.config'
import vuetify_config from './vuetify.config'
import { defineNuxtConfig } from '@nuxt/bridge'

export const getBrowserBaseURL = () => {
  // Production
  if (process.env.SITE_DOMAIN) {
    return `${process.env.SITE_DOMAIN}`
  } else if (process.env.HEROKU_APP_NAME) {
    return `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
  } else {
    throw "Trying to launch in production without SITE_DOMAIN or HEROKU_APP_NAME defined!"
  }
}

export default defineNuxtConfig({
  ssr: false,
  /*
  ** Headers of the page
  */
  head: head_config,
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: 'teal',
    height: '5px',
    continuous: true
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/stylus/index.styl'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/lodash.js',
  ],
  buildDir: "build/dist",
  generate: {
    dir: "build/generated"
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/moment',
    '@pinia/nuxt',
  ],
  /*
   * Pinia configuration
   */
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://django:8000',
    browserBaseURL: getBrowserBaseURL()
  },
  auth: {
    fetchUserOnLogin: true,
    plugins: [{ src: '~/plugins/auth.js', client: true }],
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login/', method: 'post' },
          logout: { url: '/api/auth/logout/', method: 'post' },
          user: { url: '/api/users/me/', propertyName: false },
        },
      }
    },
    cookie: {
      maxAge: 60 * 60 * 24  // one day
    },
    redirect: {
      login: '/login',
      home: '/',
      logout: '/login'
    }
  },
  /*
  ** vuetify module configuration
  ** https://vuetifyjs.com/en/features/theme/#customizing
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: vuetify_config,
  router: {
    middleware: ['auth']
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // eslint-disable-next-line no-unused-vars
    extend(config, ctx) {
    },
    publicPath: '/static/',
    babel: {
      plugins: [
        '@babel/plugin-proposal-optional-chaining'
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ],
    // @ts-ignore
    transpile: ['iron-webcrypto', 'unhead'],
  },
  bridge: {

    // -- Opt-in features --

    // Use Vite as the bundler instead of webpack 4
    vite: false,

    // Enable Nuxt 3 compatible useHead
    // meta: true,


    // -- Default features --

    // Use legacy server instead of Nitro
    nitro: false,

    // Use legacy generator rather than new nitro prerenderer
    nitroGenerator: false,

    // Disable nuxt 3 compatible `nuxtApp` interface
    app: false,

    // Disable Composition API support
    capi: false,

    // ... or just disable legacy Composition API support
    // capi: {
    //   legacy: false
    // },

    // Do not transpile modules
    transpile: false,

    // Disable composables auto importing
    imports: false,

    // Do not warn about module incompatibilities
    constraints: false
  },
})
