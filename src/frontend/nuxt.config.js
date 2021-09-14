import webpack from 'webpack'
import head_config from './head.config'

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
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      options: {
        customProperties: true, // Maps all theme colors to css variables (i.e. background: var(--v-primary-base);)
      },
      themes: {
        light: {
          primary: '#5b8c5a',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#ff2121',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        }
      }
    }
  },
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
