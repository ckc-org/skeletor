<template>
  <h1>Sign In</h1>
  <p class="text-medium-emphasis">Welcome back! Let's get started</p>

  <v-form ref="form" class="mt-7" @submit.prevent="submit">
    <v-alert v-if="errors?.non_field_errors" type="error">
      <ul>
        <li v-for="(error, index) in errors.non_field_errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </v-alert>
    <div class="mt-1">
      <label class="label text-grey-darken-2" for="email">Email</label>
      <v-text-field
        id="email"
        v-model="email"
        :rules="[ruleRequired, ruleEmail]"
        prepend-inner-icon="fluent:mail-24-regular"
        name="email"
        type="email"
        :error-messages="errors.email"
        :error="!!errors.email"
      ></v-text-field>
    </div>
    <div class="mt-1">
      <label class="label text-grey-darken-2" for="password">Password</label>
      <v-text-field
        id="password"
        v-model="password"
        :rules="[ruleRequired, rulePassLen]"
        prepend-inner-icon="fluent:password-20-regular"
        name="password"
        type="password"
        :error-messages="errors.password"
        :error="!!errors.password"
      ></v-text-field>
    </div>

    <v-checkbox v-model="rememberMe" label="Remember me" density="compact" />

    <div class="mt-5">
      <v-btn
        type="submit"
        block
        min-height="44px"
        color="primary"
        class="gradient"
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
import useErrorHandler from "~/composables/useErrorHandler";
import { userStore } from "~/store/user";

const { ruleEmail, rulePassLen, ruleRequired } = useFormRules();

const email = ref("");
const rememberMe = ref(false);
const password = ref("");
const isLoading = ref(false);
const errors = ref({});
const form = ref(null);
const user = userStore();

const submit = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    isLoading.value = true; // Set isLoading to true when submitting
    errors.value = {}; // Reset errors

    try {
      await user.login(email.value, password.value, rememberMe.value);
      navigateTo("/dashboard");
    } catch (e) {
      errors.value = e.data || {};
      useErrorHandler(e);
    }

    isLoading.value = false; // Set isLoading to false after the request is completed
  }
};
</script>
