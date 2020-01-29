import Vue from 'vue';
import Vuex from 'vuex';
import jwt from "jsonwebtoken";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // jwt_auth = this token, obtained from jwt.io
    // It doesn't work
    // {
    //   "https://daml.com/ledger-api": {
    //     "ledgerId": "o_beer",
    //     "applicationId": "HTTP-JSON-API-Gateway",
    //     "actAs": ["Alice"]
    //   }
    // }
    // jwt_auth : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2RhbWwuY29tL2xlZGdlci1hcGkiOnsibGVkZ2VySWQiOiJvX2JlZXIiLCJhcHBsaWNhdGlvbklkIjoiSFRUUC1KU09OLUFQSS1HYXRld2F5IiwiYWN0QXMiOlsiQWxpY2UiXX19.ZIBxNhqT7wzJPvIlcFaqXJD1zClHojumV4Cr3_AjI6s',
    
    // {"ledgerId": "o_beer", "applicationId": "HTTP-JSON-API-Gateway", "party": "Alice"}
    // jwt_auth : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZWRnZXJJZCI6Im9fYmVlciIsImFwcGxpY2F0aW9uSWQiOiJIVFRQLUpTT04tQVBJLUdhdGV3YXkiLCJwYXJ0eSI6IkFsaWNlIn0.pVmzkpVqNtNYlL1gZjViCUC5n1GSB9FKIgM79cvoM-Y',
    party : null,
    // jwt_auth : null,
    // root_url : 'http://localhost:7575',
    beers: null,
    beerProposals: null,
    ledger: axios.create(
      {
          baseURL: 'http://localhost:7575',
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + jwt_auth
          }
        }
    )
    // axiosConfig: null,
  },
  mutations: {
    updateParty (state, party) {
      state.party = party;

      var payload = {"ledgerId": "o_beer", "applicationId": "HTTP-JSON-API-Gateway", "party": party};

      var jwt_auth = jwt.sign(payload, 'secret');
      state.ledger.defaults.headers.common['Authorization'] = "Bearer " + jwt_auth;
    },

    updateBeers(state, beers) {
      state.beers = beers
    },
    updateBeerProposals(state, beerProposals) {
      state.beerProposals = beerProposals;
    }
  },
  actions: {
    getBeers ({commit, state}) {
      var query = {
        templateIds: ["Beer:Beer"],
        query: { recipient: state.party }
      };

      var beers = state.ledger.post("/contracts/search", query).then(request => {
        try {
          return request.data;
        } catch (err) {
          console.error(err);
        }
      });
      commit('updateBeers', beers)
    },
    getBeerProposals ({commit, state}) {
      var query = {
        templateIds: ["Beer:BeerProposal"],
        query: {
          beer: {
            templateId: "Beer:Beer",
            recipient: this.party
          }
        }
        // query: {'beer.recipient': this.party}
      };

      // var ledger = axios.create(...state.axiosConfig)

      var beerProposals = state.ledger.post("/contracts/search", query).then(request => {
        try {
          return request.data;
        } catch (err) {
          console.error(err);
        }
      });

      commit('updateBeerProposals', beerProposals)
    }
  },
  modules: {
  },
});
