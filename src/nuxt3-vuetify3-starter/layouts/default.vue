<template>
	<div>
		<VApp>
      <div class="d-flex flex-column align-center relative">
        <v-avatar class="absolute bottom" color="red" size="200"></v-avatar>
        <h1 class="pa-7">Welcome Back, Jesse</h1>
        <v-btn variant="tonal">Check In</v-btn>
      </div>
      <v-row class="justify-center mt-7">
        <v-col cols="auto">
          <v-btn to="/">
            <v-icon class="mr-2" icon="mgmt:DashboardIcon"></v-icon>
            Dashboard
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn class="text-capitalize" variant="plain" to="/about">
            <v-icon class="mr-2" size="20" icon="mgmt:ProjectsIcon"></v-icon>
            Projects
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn to="/contact">
            Insights
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn to="/finances">
            Finances
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn to="/history">
            History
          </v-btn>
        </v-col>
      </v-row>
			<VMain>
				<slot />
			</VMain>
		</VApp>
	</div>
</template>

<style scoped lang="scss">

</style>
