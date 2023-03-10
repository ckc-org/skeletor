<template>
  <reset-password/>
</template>

<script>
import ResetPassword from "../../../../../Downloads/skeletor-master/src/frontend/components/login/ResetPassword.vue"

export default {
  components: { ResetPassword },
  auth: 'guest',
  head() {
    return 'Reset Password'
  }
}
</script>
