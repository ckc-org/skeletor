<template>
  <v-container>
    <div>
      <v-row class="d-flex">
        <v-col cols="8">
          <v-card height="325px" rounded="xl" color="#292929">
            <h1 class="ml-4 mt-1 font-24">Goals</h1>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="d-flex flex-column" height="325px" rounded="xl" color="#292929">
            <div class="d-flex align-center mt-1">
              <h1 class="ml-4 mt-0 font-24" >Your Daily</h1>
              <v-icon class="ml-12" size="15" icon="mgmt:DailyTimeIcon"></v-icon>
              <p class="font-weight-medium font-12 ml-1">1:45</p>
              <v-icon class="ml-4" size="15" icon="mgmt:DailyDateIcon"></v-icon>
              <p class="font-weight-medium font-12 ml-1">November 23, 2023</p>
            </div>
            <div style="height: 250px;">
              <v-textarea v-model="yesterday_data" rows="3" label="Yesterday" hide-details class="ma-4 p-0" no-resize variant="outlined"></v-textarea>
              <v-textarea v-model="today_data" rows="3" label="Today" hide-details class="ma-4 p-0" no-resize variant="outlined"></v-textarea>
            </div>
            <div class="d-flex justify-center">
              <v-btn @click="pushDailyToSlack" height="30px" width="100px" class="mb-10">Push</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-card height="150px" rounded="xl" color="#292929"></v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="150px" rounded="xl" color="#292929"></v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="150px" rounded="xl" color="#292929"></v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { useAuth } from "../composables/useAuth"
import { useRequest } from "~/composables/useRequest"

const yesterday_data = ref("")
const today_data = ref("")

const pushDailyToSlack = async () => {
  const body = "Yesterday:" + "\n" + yesterday_data.value + "\n\n" + "Today:" + "\n" + today_data.value

  const { data, error, execute } = useRequest("/users/send_message_to_slack/", { method: 'POST', body: {"message": body} })
  await execute()

  return { data, error, execute }
}

const display = ref(useDisplay())
const auth = useAuth()
definePageMeta({
  // middleware: ["auth"]
})


const setThemeFromLocalStorage = async () => {
  console.log(auth.isLoggedIn.value)
  try {
    await auth.fetchUser()
  } catch (e) {
    console.error(e)
  }
}

onMounted(setThemeFromLocalStorage)

</script>

<style scoped lang="scss">

</style>
