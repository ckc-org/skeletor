import {createVuetify} from 'vuetify'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    // your config will come here
  })

  nuxtApp.vueApp.use(vuetify)
})
