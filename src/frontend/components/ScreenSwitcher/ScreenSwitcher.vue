<template>
  <slot v-if="isDesktop.value" name="forDesktop"/>
  <slot v-else-if="isTablet.value" name="forTablet">
    <!-- Fallback content if forTablet slot doesn't exist -->
    <slot v-if="useDesktopForTablet" name="forDesktop"/>
    <slot v-else name="forMobile"/>
  </slot>
  <slot v-else name="forMobile"/>
</template>

<script setup>
import { useDisplay } from "vuetify"

const props = defineProps({
  useDesktopForTablet: {
    type: Boolean,
    default: false
  }
})

// Everything defaults to mobile unless isDesktop or isTablet is true
const breakpoint = useDisplay()
const isDesktop = computed(() => breakpoint.lgAndUp)
const isTablet = computed(() => breakpoint.smAndUp)
</script>
