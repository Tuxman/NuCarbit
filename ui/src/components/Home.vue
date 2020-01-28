<template>
  <div class="home-component">
    {{parties}}
    <button v-on:click="createContract">Create Contract</button>
    <input v-model.trim="recipient" />
    {{recipient}}
    {{newContract}}
  </div>
</template>

<script>
import store from "../store";
import { mapState } from "vuex";

const axios = require("axios");

export default {
  name: "home",
  store,
  data() {
    return {
      parties: null,
      ledger: null,
      recipient: null,
      newContract: null
    };
  },
  computed: {
    ...mapState(["root_url", "jwt_auth", "party"])
  },
  mounted() {
    this.ledger = axios.create({
      baseURL: this.root_url,
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.jwt_auth
      }
    });
    this.ledger.get("/parties").then(request => (this.parties = request.data));
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
    }
  }
};
</script>

<style>
</style>