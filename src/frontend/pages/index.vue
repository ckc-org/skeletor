<template>
    <div>
        <div v-if="this.$auth.loggedIn">
            you are logged in!
        </div>
        <v-btn
            @click="$auth.logout()"
            outlined
        >
            Sign Out
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </div>
</template>

<script>

</script>
