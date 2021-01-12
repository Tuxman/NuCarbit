<template>
  <b-container class="home-component">
    <span v-if="party">
      <b-row>
        <b-col class="my-3">
          <b-input-group prepend="Offer a beer to">
            <b-form-input v-model.trim="recipient" v-on:keyup.enter="createBeerProposal"></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" v-on:click="createBeerProposal">Offer {{recipient}} a beer</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card no-body header="Beers Offered">
            <b-list-group id="beerProposals">
              <b-list-group-item
                v-for="bp in beerProposals"
                v-bind:key="bp.contractId.replace('#','').replace(':','.')"
              >
                <span v-if="bp.payload.beer.recipient == party">
                  {{bp.payload.beer.giver}} offered you a beer
                  <b-button
                    variant="primary"
                    v-on:click.once="exerciseChoice(bp, obeer.Beer.BeerProposal.Accept_Beer)"
                    class="mx-1"
                  >Accept</b-button>
                  <b-button
                    variant="danger"
                    v-on:click.once="exerciseChoice(bp, obeer.Beer.BeerProposal.Reject_Beer)"
                  >Reject</b-button>
                </span>
                <span v-else>
                  You offered {{bp.payload.beer.recipient}} a beer
                  <b-button
                    variant="danger"
                    v-on:click.once="exerciseChoice(bp, obeer.Beer.BeerProposal.Cancel_Beer)"
                  >Cancel</b-button>
                </span>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
        <b-col>
          <b-card no-body header="Beers Owed">
            <b-list-group id="beersOwed">
              <b-list-group-item v-for="bo in beersOwed" v-bind:key="bo.contractId">
                <span v-if="bo.payload.giver == party">You owe {{bo.payload.recipient}} a beer</span>
                <span v-else>
                  {{bo.payload.giver}} owes you a beer
                  <b-button
                    variant="success"
                    v-on:click.once="exerciseChoice(bo, obeer.Beer.Beer.Beer_Received)"
                  >Received</b-button>
                </span>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
      </b-row>
    </span>
    <span v-else>
      <b-row>
        <b-col>
          Please
          <router-link to="/login">login</router-link>
        </b-col>
      </b-row>
    </span>
  </b-container>
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
      "ledger",
      "obeer"
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

      this.recipient = null;
    },
    async exerciseChoice(contract, choice) {
      var contractId = contract.contractId;
      await this.$store.dispatch("exerciseChoice", {
        choice,
        contractId
      });
      await this.$store.dispatch("getBeerProposals");
      await this.$store.dispatch("getBeersOwed");
    }
  }
};
</script>

<style>
</style>