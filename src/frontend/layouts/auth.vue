<template>
  <v-app class="overflow-hidden">
    <v-main>
      <v-container fluid class="fill-height">
        <div class="z-index-2 d-flex justify-space-between fill-width px-4">
          <Button
            icon
            variant="outlined"
            class="transition"
            @click="toggle_theme"
          >
            <v-icon
              :class="
                theme.global.current.value.dark ? 'rotate-180 icon' : ' icon'
              "
              icon="mdi-theme-light-dark"
              size="30px"
            />
          </Button>
          <v-sheet
            class="bg-transparent hidden-sm-and-up"
            width="150px"
            height="150px"
          >
            <Image
              src="https://raw.githubusercontent.com/ckc-org/skeletor/master/docs/skeletor_full.png"
            />
          </v-sheet>
        </div>
        <v-row
          no-gutters
          justify="center"
          class="fill-height z-index-1 relative"
        >
          <v-col cols="12" md="10" lg="8" sm="10">
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" sm="6">
                <slot />
              </v-col>
              <v-col
                class="hidden-sm-and-down fill-height d-flex justify-center align-center"
                md="6"
              >
                <Image
                  src="https://raw.githubusercontent.com/ckc-org/skeletor/master/docs/skeletor_full.png"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify"

const theme = useTheme()

const setThemeFromLocalStorage = () => {
  const isDark = localStorage.getItem("isDark")
  theme.global.name.value = isDark === "true" ? "dark" : "light"
}

onMounted(setThemeFromLocalStorage)

const toggle_theme = async () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
  // save to localstorage
  localStorage.setItem(
    "isDark",
    JSON.stringify(theme.global.current.value.dark)
  )
}
</script>

<style lang="scss" scoped>
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s;
}

.icon {
  transition: 0.5s;
}
</style>
