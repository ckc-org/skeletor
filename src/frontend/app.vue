<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
const auth = useAuth()
onMounted(() => {
  auth.fetchUser()
})
</script>

