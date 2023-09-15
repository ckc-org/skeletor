<template>
  <Dashboard/>
</template>

<script setup lang="ts">
import Dashboard from "~/sections/dashboard/Dashboard.vue";

definePageMeta({
  middleware: ["auth"]
})
</script>

<style scoped lang="stylus">

</style>
