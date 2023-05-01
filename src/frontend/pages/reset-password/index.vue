<template>
  <h1>Reset password</h1>
  <p class="text-medium-emphasis">Add your email to get instructions</p>

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
    <div class="mt-5">
      <VBtn type="submit" block min-height="44px" color="primary">
        Send instructions
      </VBtn>
    </div>
  </VForm>
  <p class="text-body-2 mt-10">
    <span
    >Don't have an account?
      <NuxtLink to="/signup" class="font-weight-bold text-primary"
      >Sign Up
      </NuxtLink
      >
    </span
    >
  </p>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const email = ref("");
const password = ref("");

const {ruleEmail, rulePassLen, ruleRequired} = useFormRules();

const submit = async () => {
};
</script>
