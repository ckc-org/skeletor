<template>
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex md4>
                        <v-card>
                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title class="display-1">Login</v-toolbar-title>
                            </v-toolbar>

                            <v-form @submit.prevent="login" novalidate>
                                <v-card-text>
                                    <v-alert outlined type="error" v-if="errors.non_field_errors || errors.detail">
                                        <ul>
                                            <li v-for="error in errors.non_field_errors">{{ error }}</li>
                                        </ul>
                                        {{ errors.detail }}
                                    </v-alert>

                                    <v-text-field v-model="form.email"
                                                  label="Email"
                                                  name="email"
                                                  :error="!!errors.email"
                                                  :error-messages="errors.email"
                                                  prepend-icon="person"
                                                  type="text"></v-text-field>
                                    <v-text-field v-model="form.password"
                                                  label="Password"
                                                  name="password"
                                                  :error="!!errors.password"
                                                  :error-messages="errors.password"
                                                  prepend-icon="lock"
                                                  ref="password"
                                                  onfocus="this.select()"
                                                  type="password"></v-text-field>
                                </v-card-text>

                                <v-card-actions>
                                    <nuxt-link to="/passwordReset">Forgot password?</nuxt-link>
                                    <v-spacer></v-spacer>
                                    <v-btn type="submit">Login</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
</template>

<script>
    export default {
        data() {
            return {
                errors: {},
                form: {
                    email: '',
                    password: ''
                },
                remember_me: true
            }
        },
        methods: {
            async login() {
                try {
                    await this.$auth.login({data: this.form})

                    this.$nuxt.$router.push('/')

                    // IMPORTANT! Do our initializing! (from our auth plugin)
                    this.$auth.ctx.app.project_initialize()

                    // TODO: We need to make a good client side initialization spot...
                    // Connect to websocket and start receiving store commits from backend
                    this.$store.dispatch('realtime/start_listening')

                    this.errors = {}
                } catch (e) {
                    if(e.response) {
                        this.errors = e.response.data
                    } else {
                        console.error(e)
                    }

                    // focus on in the input to easily re-enter password
                    this.$refs.password.focus()
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
