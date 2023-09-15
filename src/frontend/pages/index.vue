<template>
  <Login/>
</template>

<script setup lang="ts">
import Login from "~/sections/auth/Login.vue";

definePageMeta({
  layout: "auth",
  middleware: ["guest"]
})

</script>

<style scoped lang="stylus">

</style>
