<template>
    <div>
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex md4>

                        <v-alert type="success" text outlined prominent v-if="successful">
                            <h1>Password has been reset!</h1>
                            <nuxt-link to='/login'>Back to login</nuxt-link>
                        </v-alert>

                        <v-card v-if="!successful">
                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title class="display-1">Reset password</v-toolbar-title>
                            </v-toolbar>

                            <v-form @submit.prevent="submitReset">
                                <v-card-text>
                                    <v-alert outlined type="error" v-if="errors.non_field_errors || errors.detail">
                                        <ul>
                                            <li v-for="error in errors.non_field_errors">{{ error }}</li>
                                        </ul>
                                        {{ errors.detail }}
                                    </v-alert>

                                    <v-text-field label="Password"
                                                  :error="!!errors.new_password1"
                                                  :error-messages="errors.new_password1"
                                                  prepend-icon="lock"
                                                  v-model='form.new_password1'
                                                  type="password"></v-text-field>

                                    <v-text-field label="Confirm password"
                                                  :error="!!errors.new_password2"
                                                  :error-messages="errors.new_password2"
                                                  prepend-icon="lock"
                                                  v-model='form.new_password2'
                                                  type="password"></v-text-field>
                                </v-card-text>

                                <v-card-actions>
                                    <v-btn type="submit">Reset</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>

                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </div>
</template>

<script>
    export default {
        auth: 'guest',
        data() {
            return {
                form: {
                    new_password1: '',
                    new_password2: '',
                },
                errors: {},
                successful: false
            }
        },
        methods: {
            submitReset() {
                const payload = {
                    uid: this.$route.params.uid,
                    token: this.$route.params.token,
                    ...this.form
                }
                this.$axios.post('/api/auth/password/reset/confirm/', payload)
                    .then(res => {
                        this.successful = true
                        this.errors = {}
                    })
                    .catch(error => {
                        this.errors = error.response.data
                    })
            }
        }
    }
</script>

<style>
</style>
