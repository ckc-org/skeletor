<template>
  <div>
    <VApp>
      <VMain>
        <v-container fluid class="fill-height">
          <v-row no-gutters align="center" justify="center" class="fill-height">
            <v-col cols="12" md="10" lg="8" sm="10">
              <v-row no-gutters align="center" justify="center">
                <v-col cols="12" sm="6">
                  <slot/>
                </v-col>
                <v-col class="hidden-sm-and-down fill-height d-flex justify-center align-center" md="6">
                  <v-img
                    src="https://raw.githubusercontent.com/ckc-org/skeletor/master/docs/skeletor_full.png"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </VMain>
    </VApp>
  </div>
</template>
