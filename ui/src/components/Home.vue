<template>
  <div class="home-component">
    <div v-if="party">
      <input v-model.trim="recipient" />
      <button v-on:click="createBeerProposal">Give Beer</button>
      <!-- {{recipient}} -->
      <!-- {{newContract}} -->
      <ul id="beerProposals">
        <li v-for="bp in beerProposals" v-bind:key="bp.contractId.replace('#','').replace(':','.')">
          <span v-if="bp.payload.beer.recipient == party">
            Beer Proposal from: {{bp.payload.beer.giver}} | 
            <button v-on:click.once="exerciseChoice(bp, 'Accept_Beer')">Accept</button> | Reject: 
          </span>
          <span v-else>
            Beer Offered to: {{bp.payload.beer.recipient}} | Cancel: 
          </span>
        </li>
      </ul>
      <ul id="beersOwed">
        <li v-for="bo in beersOwed" v-bind:key="bo.contractId">
          Beer Owed from: {{bo.payload.giver}}
        </li>
      </ul>
      <!-- <p>Offered Beers: {{beerProposals}}</p> -->
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
    ...mapState(["root_url", "jwt_auth", "party", "beersOwed", "beerProposals", "ledger"]),
  },
  mounted() {
    // setInterval(function() {
      console.log('Updating the beers...')
      this.$store.dispatch('getBeersOwed')
      this.$store.dispatch('getBeerProposals')
    // }.bind(this), 10000)
  },
  methods: {
    async createBeerProposal() {
      this.$store.dispatch("createBeerProposal", this.recipient)
      this.$store.dispatch('getBeerProposals')
    },
    async exerciseChoice(contract, choice){
      var templateId = contract.templateId;
      var contractId = contract.contractId;
      // var choice = "Accept_Beer"
      this.$store.dispatch("exerciseChoice", {templateId, contractId, choice})
      this.$store.dispatch('getBeerProposals')
      this.$store.dispatch('getBeersOwed')
    }
  },
};
</script>

<style>
</style>