<template>
  <reset-password/>
</template>

<script>
import ResetPassword from "../components/login/ResetPassword"

export default {
  components: { ResetPassword },
  auth: 'guest',
  head() {
    return 'Reset Password'
  }
}
</script>
