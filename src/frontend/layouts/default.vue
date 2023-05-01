<template>
  <div>
    <v-app class="overflow-x-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none"
           stroke="rgb(248 250 252 / .025)" stroke-dasharray="5 3" transform="scale(1, -1)">
        <path d="M0 .5H31.5V32"/>
      </svg>
      <v-main>
        <v-container fluid class="fill-height">
          <div class="z-index-2 d-flex justify-space-between fill-width pa-4 ">
            <v-btn
              icon
              variant="outlined"
              class="transition"
              @click="toggle_theme"
            >
              <v-icon
                :class="theme.global.current.value.dark ? 'rotate-180 icon' : ' icon'"
                icon="mdi-theme-light-dark"
                size="30px"
              />
            </v-btn>
          </div>
          <v-row no-gutters justify="center" class="fill-height z-index-1 relative">
            <v-col cols="12" md="10" lg="8" sm="10">
              <slot/>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup lang="ts">
import {useTheme} from "vuetify";

const theme = useTheme()
// on mounted set theme to localstorage value
// theme.global.name.value = localStorage.getItem('theme') || 'light'

const setThemeFromLocalStorage = () => {
  const isDark = localStorage.getItem("isDark");
  theme.global.name.value = isDark === 'true' ? 'dark' : 'light'
};

onMounted(setThemeFromLocalStorage);

const toggle_theme = async () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  // save to localstorage
  localStorage.setItem("isDark", JSON.stringify(theme.global.current.value.dark));
}
</script>

<style lang="scss" scoped>
.rotate-180 {
  transform: rotate(180deg);
  transition: .2s;
}

.icon {
  transition: .5s;
}
</style>
