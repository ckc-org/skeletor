# Vue File Pattern

We try to use this common pattern for our Vue setup scripts. The general idea is to keep the logic categorized and grouped by type. This way when you want to find a ref, you know it's going to be in the top of the file, along with every single other ref in the file. 

```
<script setup lang="ts">
// Imports

// Data (refs, computed, stores, props, etc)

// Lifecycle (onMounted, watchers, etc)

// Methods (util functions, etc)

// Composable definitions and what not (rarely used but mostly
</script>
```

Make it easy on yourself by adding a code snippet for this pattern.

### 1) ```cmd + ,```
### 2) Search for `live templates` in search bar
### 3) Click Vue
### 4) Click the `+` button
### 5) Paste the following code into the `Template text` field

```
<template>

</template>

<script setup lang="ts">
/* Imports */

/* Data */

/* Lifecycle */

/* Methods */

/* Hooks */
</script>

<style scoped lang="stylus">

</style>
```

### 6) Add a description and abbreviation
### 7) Click `Apply` and you're done!

Now you can go into vue file, type your abbreviate + ```tab``` and you'll have a nice template to start with. 

