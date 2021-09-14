<template>
  <confirm-reset-password/>
</template>

<script>
import ConfirmResetPassword from "../../../../components/login/ConfirmResetPassword"

export default {
  components: { ConfirmResetPassword },
  auth: 'guest',
  head() {
    return {
      title: "Confirm Password Reset",
    }
  }
}
</script>
