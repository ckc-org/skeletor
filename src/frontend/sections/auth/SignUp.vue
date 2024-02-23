<template>
  <h1>Sign Up</h1>
  <p class="text-medium-emphasis">Enter your details to get started</p>

  <VForm class="mt-7" @submit.prevent="submit">
    <div>
      <label class="label text-grey-darken-2" for="name">Name</label>
      <VTextField
        id="name"
        v-model="name"
        :rules="[ruleRequired]"
        prepend-inner-icon="fluent:person-24-regular"
        name="name"
      />
    </div>
    <div class="mt-1">
      <label class="label text-grey-darken-2" for="email">Email</label>
      <VTextField
        id="email"
        v-model="email"
        :rules="[ruleRequired, ruleEmail]"
        type="email"
        prepend-inner-icon="fluent:mail-24-regular"
        name="email"
      />
    </div>
    <div class="mt-1">
      <label class="label text-grey-darken-2" for="password">Password</label>
      <VTextField
        id="password"
        v-model="password"
        :rules="[ruleRequired, rulePassLen]"
        type="password"
        prepend-inner-icon="fluent:password-20-regular"
        name="password"
      />
    </div>
    <div class="mt-5">
      <VBtn type="submit" block min-height="44px" color="primary">
        Create Account
      </VBtn>
    </div>
  </VForm>
  <p class="text-body-2 mt-10">
    <span
      >Already have an account?
      <NuxtLink to="/" class="font-weight-bold text-primary">Sign In</NuxtLink>
    </span>
  </p>
</template>

<script setup>
const name = ref("");
const email = ref("");
const password = ref("");

const { ruleEmail, rulePassLen, ruleRequired } = useFormRules();

const submit = async () => {};
</script>
