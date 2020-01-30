<template>
  <div id="app">
    <b-navbar id="nav">
      <b-navbar-brand href="#"><code>O(🍻)</code></b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <div v-if="party">
            Logged in as {{party}} <b-button variant="outline-danger" v-on:click.once="logoutParty()">Logout</b-button>
          </div>
          <router-link v-else to="/login">Login</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import store from "./store";
import { mapState, mapMutations } from "vuex";
export default {
  name: "app",
  store,
  computed: {
    ...mapState(["party"]),
  },
  methods: {
    // There is a less cumbersome way to do this over here: https://vuex.vuejs.org/guide/forms.html
    updateParty(party) {
      if (party) {
        this.$store.commit("updateParty", party);
      }
    },
    logoutParty() {
      if (this.party) {
        this.$store.commit("logoutParty")
      }
    }
  }
};
</script> 

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
