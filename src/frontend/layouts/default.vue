<template>
  <v-app>
    <v-app-bar
      class="primary"
      app
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer/>

      <v-btn
        @click="$auth.logout()"
        outlined
        class="ml-2"
      >
        Sign Out &nbsp;
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-orange--text text--accent-4"
        >
          <v-list-item
            to="/"
          >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="fill-height align-start">
        <nuxt class="content"/>
      </v-container>
    </v-main>

    <v-footer
      v-if="this.$auth.loggedIn"
      dark
      class="primary"
      app
    >
      <!-- Footer Wrapper -->
      Footer ?!
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
}
</script>

<style lang="stylus" scoped>
.content
  width 100%
  height 100%
</style>
