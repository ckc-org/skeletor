<template>
  <div>
    <VApp>
      <VMain>
        <v-container fluid class="fill-height">
          <v-btn icon variant="outlined" class="absolute left top ma-4 transition" @click="toggle_theme">
            <v-icon
              :class="theme.global.current.value.dark ? 'rotate-180 icon' : ' icon'"
              icon="mdi-theme-light-dark"
              size="30px"
            />
          </v-btn>
          <v-row no-gutters align="center" justify="center" class="fill-height">
            <v-col cols="12" md="10" lg="8" sm="10">
              <v-row no-gutters align="center" justify="center">
                <v-col cols="12" sm="6">
                  <slot/>
                </v-col>
                <v-col class="hidden-sm-and-down fill-height d-flex justify-center align-center" md="6">
                  <v-img
                    src="https://raw.githubusercontent.com/ckc-org/skeletor/master/docs/skeletor_full.png"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </VMain>
    </VApp>
  </div>
</template>

<script setup lang="ts">
import {useTheme} from "vuetify";

const theme = useTheme()
// on mounted set theme to localstorage value
// theme.global.name.value = localStorage.getItem('theme') || 'light'

const setThemeFromLocalStorage = () => {
  const isDark = localStorage.getItem("isDark");
  console.log(isDark)
  theme.global.name.value = isDark === 'true' ? 'dark' : 'light'
};

onMounted(setThemeFromLocalStorage);

const toggle_theme = async () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  // save to localstorage
  console.log('setting to dark:', JSON.stringify(theme.global.current.value.dark))
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
