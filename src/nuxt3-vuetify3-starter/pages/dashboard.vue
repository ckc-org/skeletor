<template>
  <v-container>
    <div>
      <v-row class="d-flex">
        <v-col cols="8">
          <v-card height="420px" rounded="xl" color="#292929">V-card 1</v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="420px" rounded="xl" color="#292929">V-card 2</v-card>
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

<script>
export default {
  name: "dashboard"
}
</script>

<style scoped>

</style>
