<template>
  <v-dialog v-model="value" @blur="emit('cancel')">
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-card-actions class="d-flex justify-end align-center">
        <v-btn @click="emit('cancel')">{{ cancelText }}</v-btn>
        <v-btn color="primary" @click="emit('confirm')">{{ confirmText }}</v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Boolean,
    required:                true,
  },
  title: {
    type: String,
    default: "Are you sure?",
  },
  text: {
    type: String,
    default: "",
  },
  confirmText: {
    type: String,
    default: "OK",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
})

const emit = defineEmits(["cancel", "confirm"])
</script>
<style scoped lang="stylus">

</style>
