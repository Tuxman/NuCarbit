<template>
  <v-app color="#FEFAE0">
    <v-app-bar
      app
      color="primary"
      prominent
    >
      <div class="d-flex align-center">
        <v-btn to="/" text class="ma-4" width="240px" height="80px">
          <v-img
            alt="NuCarbit Logo"
            class="ma-6"
            contain
            src="@/assets/full-logo-transparent.png"
            width="160px"
          />
        </v-btn>
      <v-spacer></v-spacer>
        <div>
          <v-btn
            to="CarbonDataForm"
            text
          >
            <span class="mr-2">Data</span>
          </v-btn>
          <v-btn
            to="AssetCard"
            text
          >
            <span class="mr-2">AssetCard</span>
          </v-btn>
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  <v-footer
      padless
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col
          class="grey darken-4 py-4 text-center white--text"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      link: [
        
      ]
    }
  }
}
</script>
