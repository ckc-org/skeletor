<template>
    <v-app>
        <div v-if="this.$auth.loggedIn">
            you are logged in!
        </div>

        <nuxt class="content"/>
    </v-app>
</template>

<script>

</script>

<style lang="stylus">

</style>
