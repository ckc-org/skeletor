<template>
    <v-app>
        <v-app-bar class="primary" app>
            <!-- Header Wrapper -->
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>
            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <div v-if="this.$auth.loggedIn">
                    you are logged in!
                </div>

                <nuxt class="content"/>
            </v-container>
        </v-main>

        <v-footer class="primary" app>
            <!-- Footer Wrapper -->
            Footer
        </v-footer>
    </v-app>
</template>

<script>

</script>

<style lang="stylus">

</style>
