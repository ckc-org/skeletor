import { ofetch } from 'ofetch'


export default defineNuxtPlugin(nuxtApp => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!setting api base url..")
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!setting api base url..")
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!setting api base url..")

  console.log(globalThis.$fetch)
  console.log(process.env?.API_BASE_URL || 'http://localhost:8000')

  globalThis.$fetch = ofetch.create({
    baseURL: process.env?.API_BASE_URL || 'http://localhost:8000',
    // onRequest: () => {},
  })

  console.log(globalThis.$fetch)
})
