<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <div v-if="party">
        Logged in as {{party}} |

        <button v-on:click.once="logoutParty()">Logout</button>
      </div>
      <router-link v-else to="/login">Login</router-link>
    </div>
    <router-view />
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
    // ...mapMutations(["logoutParty"])
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
