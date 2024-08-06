<template>
  <slot :props="currentProps" />
</template>

<script setup>
import { computed } from "vue"
import { useDisplay } from "vuetify"

const props = defineProps({
  forDesktopLarge: {
    type: Object,
    default: null,
  },
  forDesktop: {
    type: Object,
    default: null,
  },
  forTablet: {
    type: Object,
    default: null,
  },
  forMobile: {
    type: Object,
    default: null,
  },
  useMobileForTablet: {
    type: Boolean,
    default: false,
  },
})

// Everything defaults to mobile unless isDesktop or isTablet is true
const breakpoint = useDisplay()
const isDesktopLarge = computed(() => breakpoint.xlAndUp.value)
const isDesktop = computed(() => breakpoint.lgAndUp.value)
const isTablet = computed(() => breakpoint.smAndUp.value)

const currentProps = computed(() => {
  if (isDesktopLarge.value) {
    return props.forDesktopLarge || props.forDesktop
  } else if (isDesktop.value) {
    return props.forDesktop
  } else if (isTablet.value && !props.useMobileForTablet) {
    return props.forTablet || props.forDesktop
  } else {
    // Mobile is the default
    return props.forMobile || props.forTablet || props.forDesktop
  }
})
</script>
