<template>
  <h1>Sign Up</h1>
  <p class="text-medium-emphasis">Enter your details to get started</p>

  <VForm class="mt-7" @submit.prevent="submit">
    <div>
      <label class="label text-grey-darken-2" for="name">First Name</label>
      <VTextField
        id="first_name"
        v-model="form.first_name"
        prepend-inner-icon="fluent:person-24-regular"
        name="first_name"
        :error-messages="errors.first_name"
        :error="!!errors.first_name"
      />
    </div>
    <div>
      <label class="label text-grey-darken-2" for="name">Last Name</label>
      <VTextField
        id="last_name"
        v-model="form.last_name"
        prepend-inner-icon="fluent:person-24-regular"
        name="last_name"
        :error-messages="errors.last_name"
        :error="!!errors.last_name"
      />
    </div>
    <div class="mt-1">
      <label class="label text-grey-darken-2" for="email">Email</label>
      <VTextField
        id="email"
        v-model="form.email"
        type="email"
        prepend-inner-icon="fluent:mail-24-regular"
        name="email"
        :error-messages="errors.email"
        :error="!!errors.email"
      />
    </div>
    <div class="mt-1">
      <label class="label text-grey-darken-2" for="password">Password</label>
      <VTextField
        id="password"
        v-model="form.password"
        type="password"
        prepend-inner-icon="fluent:password-20-regular"
        name="password"
        :error-messages="errors.password"
        :error="!!errors.password"
      />
    </div>
    <div class="mt-5">
      <VBtn type="submit" block min-height="44px" color="primary">
        Create Account
      </VBtn>
    </div>
  </VForm>
  <p class="text-body-2 mt-10">
    <span>
      Already have an account?
      <NuxtLink to="/" class="font-weight-bold text-primary">Sign In</NuxtLink>
    </span>
  </p>
</template>

<script setup>
import { userStore } from "~/store/user"

const user = userStore()

const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
})
const errors = ref({})

const submit = async () => {
  try {
    await user.createUser(form.value)
    navigateTo("/dashboard")
  } catch (e) {
    errors.value = e.data || {}
  }
}
</script>
