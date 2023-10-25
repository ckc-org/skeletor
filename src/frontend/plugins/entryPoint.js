import {userStore} from "~/store/user";

export default defineNuxtPlugin(async (nuxtApp) => {
  const div = document.createElement('div')
    div.id = 'app'
    div.innerHTML = '<div class="nuxt-loading-container"><div class="nuxt-progress-spinner"></div></div>'


  document.body.append(div)

  /*
  On page load we want to check if the user is authenticated and redirect them to the right spot,
  let's have that be the first thing we do!

  middleware/auth.js -> this is where the redirect happens

  In this file we're just fetching the user before anything else
   */
  const store = userStore();
  try {
    await store.fetchUser();
  } catch (e) {
    console.error(e);
  }

})
