import vuetify from "vite-plugin-vuetify";

// PWA Config
const title = "Skeletor";
const shortTitle = "Skeletor";
const description = "Welcome to Skeletor -- a bootstrapped starter project.";
const image = "https://raw.githubusercontent.com/ckc-org/skeletor/master/docs/skeletor_full.png";
const url = "https://github.com/ckc-org/skeletor";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // Runtime Config
    runtimeConfig: {
        public: {
            server_url: process.env.API_BASE_URL || 'http://localhost:8000/api',
        },
    },

    // import styles
    css: ["@/assets/main.scss", "@/assets/stylus/index.styl"],
    // enable takeover mode
    typescript: {shim: false},
    pinia: {
        autoImports: [
            // automatically imports `defineStore`
            'defineStore', // import { defineStore } from 'pinia'
            ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
    },
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        'vuetify-nuxt-module'
    ],
    app: {
        head: {
            title: "Vuetify 3 + Nuxt 3 Starter",
            titleTemplate: "%s | Vuetify 3 + Nuxt 3 Starter",
            link: [
                {rel: "stylesheet", href: "https://rsms.me/inter/inter.css"},
                {rel: "preconnect", href: "https://rsms.me/"},
                {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
                {rel: "canonical", href: url},
            ],
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: description,
                },
                {property: "og:site_name", content: title},
                {hid: "og:type", property: "og:type", content: "website"},
                {
                    hid: "og:url",
                    property: "og:url",
                    content: url,
                },
                {
                    hid: "og:image:secure_url",
                    property: "og:image:secure_url",
                    content: image,
                },
                {
                    hid: "og:title",
                    property: "og:title",
                    content: title,
                },
                {
                    hid: "og:description",
                    property: "og:description",
                    content: description,
                },
                {
                    hid: "og:image",
                    property: "og:image",
                    content: image,
                },
                //Twitter
                {name: "twitter:card", content: "summary_large_image"},
                {
                    hid: "twitter:url",
                    name: "twitter:url",
                    content: url,
                },
                {
                    hid: "twitter:title",
                    name: "twitter:title",
                    content: title,
                },
                {
                    hid: "twitter:description",
                    name: "twitter:description",
                    content: description,
                },
                {
                    hid: "twitter:image",
                    name: "twitter:image",
                    content: image,
                },
            ],
        },
    }
});
