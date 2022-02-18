<template>
  <v-app color="#FEFAE0">
    <v-app-bar
      app
      color="primary"
    >
      <div class="d-flex align-center">
        <v-img
          alt="NuCarbit Logo"
          class="shrink mr-2"
          contain
          src="@/assets/full-logo-transparent.png"
          transition="scale-transition"
          width="130"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn
        target="_blank"
        text
      >
        <span class="mr-2">Test</span>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  <v-footer
      color="brown"
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
          class="brown darken-2 py-4 text-center white--text"
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
