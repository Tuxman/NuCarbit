<template>
  <div class="home-component">
    {{parties}}
    <button v-on:click="createContract">Create Contract</button>
    <input v-model.trim="recipient" />
    {{recipient}}
    {{newContract}}
    <p>Offered Beers: {{beers}}</p>
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
  created() {
    // this.beerProposalQuery = {
    //   templateIds: ["Beer:BeerProposal"],
    //   query: {
    //     beer: {
    //       templateId: "Beer:Beer",
    //       recipient: this.party
    //     }
    //   }
    //   // query: {'beer.recipient': this.party}
    // };
    // this.ledger.get("/parties").then(request => (this.parties = request.data));
  },
  computed: {
    ...mapState(["root_url", "jwt_auth", "party", "beers", "ledger"]),
    ...mapMutations(["updateBeers"])
  },
  mounted() {
    this.$store.dispatch('getBeers')
    this.$store.dispatch('getBeerProposals')
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
  //   getContracts: function(query) {
  //     this.ledger.post("/contracts/search", query).then(request => {
  //       try {
  //         return request.data;
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     });
  //   }
  }
};
</script>

<style>
</style>