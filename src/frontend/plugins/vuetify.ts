import {createVuetify} from 'vuetify'
import * as labs from 'vuetify/labs/components'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components: {
      ...labs,
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
