<template>
    <v-app>
        <v-content>
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

                                    <v-text-field v-model="form.username"
                                                  label="Username"
                                                  name="username"
                                                  :error="!!errors.username"
                                                  :error-messages="errors.username"
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
                                    <nuxt-link to="/passwordReset">Forgot username/password?</nuxt-link>
                                    <v-spacer></v-spacer>
                                    <v-btn type="submit">Login</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                errors: {},
                form: {
                    username: '',
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

                    this.errors = {}
                } catch (e) {
                    this.errors = e.response.data

                    // focus on in the input to easily re-enter password
                    this.$refs.password.focus()
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
