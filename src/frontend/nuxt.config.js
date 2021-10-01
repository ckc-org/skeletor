import webpack from 'webpack'
import head_config from './head.config'
import vuetify_config from './vuetify.config'

export const getBrowserBaseURL = () => {
  // Production
  if (process.env.SITE_DOMAIN) {
    return `${ process.env.SITE_DOMAIN }`
  } else if (process.env.HEROKU_APP_NAME) {
    return `https://${ process.env.HEROKU_APP_NAME }.herokuapp.com`
  } else {
    throw "Trying to launch in production without SITE_DOMAIN or HEROKU_APP_NAME defined!"
  }
}

export default {
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
  ],
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
          user: { url: '/api/auth/user/', propertyName: false },
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
    mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
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
    ]
  },
}
