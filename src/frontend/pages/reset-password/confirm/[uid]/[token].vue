<template>
  <h1>Confirm password</h1>

  <p class="text-medium-emphasis">Welcome back! Let's get started</p>

  <v-alert v-if="errors.non_field_errors" type="error">
    <ul>
      <li v-for="(error, index) in errors.non_field_errors" :key="index">
        {{ error }}
      </li>
    </ul>
  </v-alert>

  <VForm class="mt-7" @submit.prevent="submit">
    <div class="mt-1">
      <label class="label text-grey-darken-2" for="email">New password</label>
      <VTextField
        v-model="new_password_1"
        name="new_password_1"
        type="password"
        :error-messages="errors.new_password_1"
        :error="!!errors.new_password_1"
      />
    </div>

    <div class="mt-1">
      <label class="label text-grey-darken-2" for="email"
        >Confirm new password</label
      >
      <VTextField
        v-model="new_password_2"
        name="new_password_2"
        type="password"
        :error-messages="errors.new_password_2"
        :error="!!errors.new_password_1"
      />
    </div>

    <div class="mt-5">
      <VBtn type="submit" block min-height="44px" color="primary">
        Set new password
      </VBtn>
    </div>
  </VForm>
</template>

<script setup lang="ts">
import { useRequest } from "~/composables/useRequest"
import { useRoute } from "#app"

definePageMeta({
  layout: "auth",
})

const new_password_1 = ref("")
const new_password_2 = ref("")

const errors = ref({})

const route = useRoute()

const submit = async () => {
  const uid = route.params.uid
  const token = route.params.token

  const { error } = await useRequest<any>(
    `/passwordreset/confirm/${uid}/${token}/`,
    {
      method: "POST",
      body: JSON.stringify({
        new_password_1: new_password_1.value,
        new_password_2: new_password_2.value,
      }),
    }
  )

  if (error.value && error.value?.statusCode !== 200) {
    errors.value = error.value.data
  } else {
    // Clear errors
    errors.value = {}

    // Go to login page
    navigateTo("/")
  }
}
</script>
