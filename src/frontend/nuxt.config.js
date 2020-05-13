import colors from 'vuetify/es5/util/colors'

export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {
        color: 'teal',
        height: '5px',
        countinuous: true
    },
    /*
    ** Global CSS
    */
    css: [
        '~/assets/style.styl'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: ['~/plugins/axios.js'],
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
        // '@nuxtjs/moment',
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        baseURL: 'http://django:8000',
        browserBaseURL: process.env.NODE_ENV === 'production' ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : 'http://localhost:8000'
    },
    auth: {
        fetchUserOnLogin: true,
        plugins: [{ src: '~/plugins/auth.js', client: true }],
        strategies: {
            local: {
                endpoints: {
                    login: {url: '/api/auth/login/', method: 'post', propertyName: 'key'},
                    logout: {url: '/api/auth/logout/', method: 'post'},
                    user: {url: '/api/auth/user/', propertyName: false},
                },
                tokenType: 'Token',
                tokenName: 'Authorization'
            }
        },
        redirect: {
            login: '/login',
            home: '/',
            logout: '/login'
        }
    },
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        theme: {
            themes: {
                light: {
                    primary: '#5b8c5a'
                }
            }
        }
    },
    router: {
        base: process.env.NODE_ENV === 'production' ? '/static/' : '/',
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
        extend(config, ctx) {
        }
    },
}
