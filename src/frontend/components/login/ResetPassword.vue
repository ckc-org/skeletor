<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex md4>

        <v-alert type="success" text outlined prominent v-if="successful">
          <h1>Thank you!</h1>
          <p>An email is being sent your way, please check for reset email in spam or junk folder if its not in you main
            folder.</p>
        </v-alert>

        <v-card v-if="!successful">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="display-1">Reset password</v-toolbar-title>
          </v-toolbar>

          <v-form @submit.prevent="submit">
            <v-card-text>
              <v-alert outlined type="error" v-if="errors.non_field_errors || errors.detail">
                <ul>
                  <li v-for="(error, i) in errors.non_field_errors" :key="i">
                    {{ error }}
                  </li>
                </ul>
                {{ errors.detail }}
              </v-alert>

              <v-text-field label="Email"
                            name="email"
                            ref="email"
                            prepend-icon="email"
                            :error="!!errors.email"
                            :error-messages="errors.email"
                            v-model='email'
                            type="text"></v-text-field>
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn depressed type="submit">
                Send password reset email
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      successful: false,
      errors: {}
    }
  },
  methods: {
    async submit() {
      try {
        this.errors = {}
        await this.$axios.post('/api/auth/users/reset_password/', { email: this.email })
        this.successful = true
      } catch (error) {
        this.errors = error.response.data
        // focus on in the input to easily re-enter password
        this.$refs.email.focus()
      }
    }
  }
}
</script>
