<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
      <Snackbar />
    </NuxtLayout>
  </div>
</template>

<script setup>
const auth = useAuth()
onMounted(() => {
  auth.fetchUser()
})
</script>

