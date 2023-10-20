<template>
  <h1>Sign In</h1>
  <p class="text-medium-emphasis">Welcome back! Let's get started</p>

  <v-form @submit.prevent="submit" ref="form" class="mt-7">
    <v-alert v-if="errors?.non_field_errors" type="error">
      <ul>
        <li v-for="(error, index) in errors.non_field_errors" :key="index">{{ error }}</li>
      </ul>
    </v-alert>
    <div class="mt-1">
      <label class="label text-grey-darken-2" for="email">Email</label>
      <v-text-field
        :rules="[ruleRequired, ruleEmail]"
        v-model="email"
        prepend-inner-icon="fluent:mail-24-regular"
        id="email"
        name="email"
        type="email"
        :error-messages="errors.email"
        :error="!!errors.email"
      ></v-text-field>
    </div>
    <div class="mt-1">
      <label class="label text-grey-darken-2" for="password">Password</label>
      <v-text-field
        :rules="[ruleRequired, rulePassLen]"
        v-model="password"
        prepend-inner-icon="fluent:password-20-regular"
        id="password"
        name="password"
        type="password"
        :error-messages="errors.password"
        :error="!!errors.password"
      ></v-text-field>
    </div>

    <div class="mt-5">
      <v-btn
        type="submit"
        block
        min-height="44px"
        class="gradient primary"
        :loading="isLoading"
      >
        Sign In
      </v-btn>
    </div>
  </v-form>
  <p class="text-body-2 mt-10">
    <nuxt-link to="/reset-password" class="font-weight-bold text-primary"
    >Forgot password?
    </nuxt-link>
  </p>
  <p class="text-body-2 mt-4">
    <span>
      Don't have an account?
      <nuxt-link to="/signup" class="font-weight-bold text-primary">
        Sign Up
      </nuxt-link>
    </span>
  </p>

</template>

<script setup>
import useErrorHandler from "~/composables/useErrorHandler"
import {userStore} from "~/store/user";

const { ruleEmail, rulePassLen, ruleRequired } = useFormRules()

const email = ref("")
const password = ref("")
const isLoading = ref(false)
const errors = ref({})
const form = ref(null)
const user = userStore()

const submit = async () => {
  const { valid } = await form.value.validate()
  if (valid || true) {

    isLoading.value = true // Set isLoading to true when submitting
    errors.value = {} // Reset errors

    const rememberMe = true

    const { error, data } = await user.login(email.value, password.value, rememberMe)

    if (error.value) {
      isLoading.value = false // Set isLoading to false if there's an error
      errors.value = error.value.data || {}
      useErrorHandler(error.value)
      return
    }

    isLoading.value = false // Set isLoading to false after the request is completed
    navigateTo("/dashboard")
    return data.value
  }
}

</script>
