<template>
  <h1>Reset password</h1>
  <p class="text-medium-emphasis">Add your email to get instructions</p>

  <VForm class="mt-7" @submit.prevent="submit">
    <div class="mt-1">
      <label class="label text-grey-darken-2" for="email">Email</label>
      <VTextField
        id="email"
        v-model="email"
        :rules="[ruleRequired, ruleEmail]"
        prepend-inner-icon="fluent:mail-24-regular"
        name="email"
        type="email"
      />
    </div>
    <div class="mt-5">
      >
      <VBtn
        type="submit"
        block
        min-height="44px"
        color="primary"
        @click="submit"
      >
        Send instructions
      </VBtn>
    </div>
  </VForm>
  <p class="text-body-2 mt-10">
    <span
      >Don't have an account?
      <NuxtLink to="/signup" class="font-weight-bold text-primary"
        >Sign Up
      </NuxtLink>
    </span>
  </p>
</template>

<script setup lang="ts">
const email = ref("")

const { ruleEmail, ruleRequired } = useFormRules()
const submit = async () => {
  try {
    await useRequest<any>("/passwordreset/", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
      }),
    })
  } catch (e) {
    console.error(e)
  }
}
</script>
