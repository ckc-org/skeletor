<template>
  <v-app class="overflow-hidden">
    <v-main>
      <v-container fluid class="fill-height">
        <div class="z-index-2 d-flex flex-sm-column px-4 pb-4">
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

          <v-btn
            icon
            variant="outlined"
            class="transition ml-4 ml-sm-0 mt-sm-4"
            @click="logout"
          >
            <v-icon
              class="rotate-180"
              icon="mdi-logout"
              size="24px"
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
</template>

<script setup lang="ts">
import {useTheme} from "vuetify";
import {userStore} from "~/store/user";

const theme = useTheme()
const user = userStore()

const setThemeFromLocalStorage = () => {
  const isDark = localStorage.getItem("isDark");
  theme.global.name.value = isDark === 'true' ? 'dark' : 'light'
};

const toggle_theme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  // save to localstorage
  localStorage.setItem("isDark", JSON.stringify(theme.global.current.value.dark));
}

const logout = async () => {
  try {
    await user.logout()
  } catch (e) {
    console.error(e)
  }
}

onMounted(setThemeFromLocalStorage);
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
