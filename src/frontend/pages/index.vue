<template>
  <h1>Sign In</h1>
  <p class="text-medium-emphasis">Welcome back! Let's get started</p>

  <VForm @submit.prevent="submit" class="mt-7">
    <div class="mt-1">
      <label class="label text-grey-darken-2" for="email">Email</label>
      <VTextField
        :rules="[ruleRequired, ruleEmail]"
        v-model="email"
        prepend-inner-icon="fluent:mail-24-regular"
        id="email"
        name="email"
        type="email"
      />
    </div>
    <div class="mt-1">
      <label class="label text-grey-darken-2" for="password">Password</label>
      <VTextField
        :rules="[ruleRequired, rulePassLen]"
        v-model="password"
        prepend-inner-icon="fluent:password-20-regular"
        id="password"
        name="password"
        type="password"
      />
    </div>
    <div class="mt-5">

      <VBtn type="submit" block min-height="44px" class="gradient primary">Sign In</VBtn>
    </div>
  </VForm>
  <p class="text-body-2 mt-10">
    <NuxtLink to="/reset-password" class="font-weight-bold text-primary"
    >Forgot password?
    </NuxtLink>
  </p>
  <p class="text-body-2 mt-4">
    <span
    >Don't have an account?
      <NuxtLink to="/signup" class="font-weight-bold text-primary"
      >
        Sign Up
      </NuxtLink>
    </span>
  </p>
</template>

<script setup>
//set layout to auth
import { useRequest } from "../composables/useRequest"
definePageMeta({
  layout: "auth",
});

const { ruleEmail, rulePassLen, ruleRequired } = useFormRules()

const email = ref("")
const password = ref("")


const submit = async () => {
  const { isFetching, error, data } = useRequest('/auth/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { email: email.value, password: password.value },
  })

  await isFetching

  if (error.value) {
    throw new Error(error.value.message)
  }

  return data.value
}

</script>
