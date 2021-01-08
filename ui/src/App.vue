<template>
  <div id="app">
    <b-navbar id="nav">
      <b-navbar-brand href="#">
        <code>O(🍻)</code>
      </b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item>
          <router-link to="/">Home</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <div v-if="party">
            Logged in as {{party}}
            <b-button variant="outline-danger" v-on:click.once="logoutParty()">Logout</b-button>
          </div>
          <router-link v-else to="/login">Login</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-container>
      <b-row>
        <b-col>
          <img alt="Vue logo" src="@/assets/logo.png" class="img-fluid" />
        </b-col>
      </b-row>
      <router-view />
      <b-row class="my-5">
        <b-col>
          Frontend made with <a href="https://vuejs.org/">Vue.js</a>.
          Backend made with <a href="https://daml.com">DAML</a> in 32 lines of code.
        </b-col>
      </b-row>
      <b-row class="my-5">
        <b-col class="text-left">
          <h3 class="text-center">This is the whole backend, database schema, access control, json queries, business logic, everything that isn't the server</h3>
          <h1 class="text-center">👇</h1>
          <pre>
            <code class="daml bg-white">
daml 1.2
module Beer where

template BeerProposal -- This is the template for a contract. Akin to object and instance.
  with
    beer : Beer
  where
    signatory beer.giver -- Signatories say who is needed to create an instantiated contract
    observer beer.recipient -- Observers say who else can see the contract
    ensure beer.giver /= beer.recipient -- Assure preconditions

    choice Accept_Beer : ContractId Beer
      controller beer.recipient -- Give different participants different choices
        do
          create beer -- Here the recipient of a proposal can choose to accept the beer contract

    choice Reject_Beer : ()      -- Every choice consumes a contract (unless specified)
      controller beer.recipient  -- so contracts are atomic and events are sequential
        do
          pure ()                -- This choice simply consumes the existing contract

    choice Cancel_Beer : ()      -- Note how this choice is very similar to the previous
      controller beer.giver
        do
          pure ()

template Beer  -- Once the recipient chooses to Accept_Beer in BeerProposal this contract is created
  with
    giver : Party
    recipient : Party
  where
    signatory giver, recipient
    ensure giver /= recipient

    choice Beer_Received : ()  -- These are really just helper functions, this functionality is
      controller recipient     -- equivalent to spending a UTXO or as DAML calls it, archiving a contract
        do
          pure ()
            </code>
          </pre>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from "./store";
import { mapState, mapMutations } from "vuex";
import haskell from 'highlight.js/lib/languages/haskell';
import 'highlight.js/styles/default.css'

import * as hljs from "highlight.js";

export default {
  name: "app",
  store,
  computed: {
    ...mapState(["party"])
  },
  created (){
    hljs.initHighlightingOnLoad();
    hljs.registerLanguage('daml', haskell)
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
        this.$store.commit("logoutParty");
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
