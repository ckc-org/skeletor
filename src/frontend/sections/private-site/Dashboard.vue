<template>
  <div class="d-md-flex text-left flex-column justify-center">
    <div class="text-h2 font-weight-black text-md-left">
      Welcome to Skeletor
    </div>
    <div>
      <Image
        src="https://raw.githubusercontent.com/ckc-org/skeletor/master/docs/skeletor_full.png"
        height="440px"
        :width="display.lgAndUp ? '440px' : '100%'"
        class="float-md-right"
      />
      <div class="text-body-1 pt-4 pl-2">
        This a resource developed by our in-house team at CKC. This project aims
        to provide developers with a robust foundation, enabling them
        effectively initiate their web applications using a basic Django, Nuxt,
        and Vue 3 setup.
        <div class="text-h4 font-weight-bold mt-8 mb-2">
          Some features include:
        </div>
        ❯ One command dev install: make <br />
        ❯ Stack: Django + Vue + React Native <br />
        ❯ Heroku deploys for frontend and backend <br />
        ❯ Email templates + helpers <br />
        ❯ Pre-commit with ruff <br />
        ❯ Fast backend tests w/coverage (pytest) <br />
        ❯ Hot reloading for local dev <br />
        ❯ Expo for React Native <br />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify"

const display = ref(useDisplay())
</script>

<style scoped lang="scss"></style>
