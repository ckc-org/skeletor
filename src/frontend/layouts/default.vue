<template>
    <v-app>
        <v-app-bar class="primary" app v-if="this.$auth.loggedIn">
            <!-- Header Wrapper -->
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>
            <!-- Provides the application the proper gutter -->
            <v-container fluid class="fill-height align-start">
                <nuxt class="content"/>
            </v-container>
        </v-main>

        <v-footer class="primary" app v-if="this.$auth.loggedIn">
            <!-- Footer Wrapper -->
            Footer
        </v-footer>
    </v-app>
</template>

<script>
</script>

<style lang="stylus" scoped>
.content
    width 100%
    height 100%
</style>
