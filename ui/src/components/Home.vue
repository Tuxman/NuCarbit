<template>
  <div class="home-component">
    {{parties}}
    <button v-on:click="createContract">Create Contract</button>
    <input v-model.trim="recipient" />
    {{recipient}}
    {{newContract}}
    <p>Offered Beers: {{beerProposals}}</p>
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
    ...mapMutations(["updateBeers"])
  },
  mounted() {
    // setInterval(function() {
      console.log('Updating the beers...')
      this.$store.dispatch('getBeers')
      this.$store.dispatch('getBeerProposals')
    // }.bind(this), 10000)
  },
  methods: {
    createContract: function() {
      var query = {
        templateId: "Beer:BeerProposal",
        argument: {
          beer: {
            templateId: "Beer:Beer",
            giver: this.party,
            recipient: this.recipient
          }
        }
      };

      this.ledger.post("/command/create", query).then(request => {
        try {
          this.newContract = request.data;
        } catch (err) {
          console.error(err);
        }
      });
    },
  }
};
</script>

<style>
</style>