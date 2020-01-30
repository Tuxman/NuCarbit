<template>
  <div class="home-component">
    <div v-if="party">
      <input v-model.trim="recipient" />
      <button v-on:click="createContract">Give Beer</button>
      {{recipient}}
      <!-- {{newContract}} -->
      <ul id="beerProposals">
        <li v-for="bp in beerProposals" v-bind:key="bp.contractId">
          Beer Proposal from: {{bp.payload.beer.giver}} | Accept: | Reject: 
        </li>
      </ul>
      <ul id="beersGiven">
        <li v-for="bg in beers" v-bind:key="bg.contractId">
          Beer Owed from: {{bg}}
        </li>
      </ul>
      <p>Offered Beers: {{beerProposals}}</p>
    </div>
    <div v-else>
      Please <router-link to="/login">login</router-link>
    </div>
  </div>
</template>

<script>
import store from "../store";
import { mapState, mapMutations } from "vuex";

const axios = require("axios");

export default {
  name: "home",
  store,
  data() {
    return {
      parties: null,
      recipient: null,
      newContract: null,
    };
  },
  beforeCreated() {

  },
  computed: {
    ...mapState(["root_url", "jwt_auth", "party", "beers", "beerProposals", "ledger"]),
  },
  mounted() {
    // setInterval(function() {
      console.log('Updating the beers...')
      this.$store.dispatch('getBeersOwed')
      this.$store.dispatch('getBeerProposals')
    // }.bind(this), 10000)
  },
  methods: {
    async createContract() {
      this.$store.dispatch("createContract", recipient)
    }
  },
};
</script>

<style>
</style>