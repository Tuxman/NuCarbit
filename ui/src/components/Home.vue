<template>
  <div class="home-component">
    <div v-if="party">
      <input v-model.trim="recipient" />
      <button v-on:click="createBeerProposal">Give Beer</button>
      <b-list-group id="beerProposals">
        <b-list-group-item v-for="bp in beerProposals" v-bind:key="bp.contractId.replace('#','').replace(':','.')">
          <span v-if="bp.payload.beer.recipient == party">
            Beer Proposal from: {{bp.payload.beer.giver}}
            <b-button variant="primary" v-on:click.once="exerciseChoice(bp, 'Accept_Beer')">Accept</b-button>
            <b-button variant="danger" v-on:click.once="exerciseChoice(bp, 'Reject_Beer')">Reject</b-button>
          </span>
          <span v-else>
            Beer Offered to: {{bp.payload.beer.recipient}}
            <b-button variant="danger" v-on:click.once="exerciseChoice(bp, 'Cancel_Beer')">Cancel</b-button>
          </span>
        </b-list-group-item>
      </b-list-group>
      <b-list-group id="beersOwed">
        <b-list-group-item v-for="bo in beersOwed" v-bind:key="bo.contractId">
          <span v-if="bo.payload.giver == party">Beer Owed to: {{bo.payload.recipient}}</span>
          <span v-else>
            Beer Owed from: {{bo.payload.giver}}
            <b-button
              variant="success"
              v-on:click.once="exerciseChoice(bo, 'Beer_Received')"
            >Received</b-button>
          </span>
        </b-list-group-item>
      </b-list-group>
    </div>
    <div v-else>
      Please
      <router-link to="/login">login</router-link>
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
      newContract: null
    };
  },
  beforeCreated() {},
  computed: {
    ...mapState([
      "root_url",
      "jwt_auth",
      "party",
      "beersOwed",
      "beerProposals",
      "ledger"
    ])
  },
  async mounted() {
    if (this.party) {
      console.log("Setting up the party...");
      await this.$store.dispatch("updateParty", this.party);
      console.log("Getting the beers...");
      await this.$store.dispatch("getBeersOwed");
      await this.$store.dispatch("getBeerProposals");
    }
  },
  methods: {
    async createBeerProposal() {
      await this.$store.dispatch("createBeerProposal", this.recipient);
      await this.$store.dispatch("getBeerProposals");
    },
    async exerciseChoice(contract, choice) {
      var templateId = contract.templateId;
      var contractId = contract.contractId;
      await this.$store.dispatch("exerciseChoice", {
        templateId,
        contractId,
        choice
      });
      await this.$store.dispatch("getBeerProposals");
      await this.$store.dispatch("getBeersOwed");
    }
  }
};
</script>

<style>
</style>