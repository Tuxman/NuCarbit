import Vue from 'vue';
import Vuex from 'vuex';
import jwt from "jsonwebtoken";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    party : null,
    beers: null,
    beerProposals: null,
    ledger: axios.create(
      {
          baseURL: 'http://localhost:7575',
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          }
        }
    )
  },
  mutations: {
    updateParty (state, party) {
      state.party = party;

      var payload = {"ledgerId": "o_beer", "applicationId": "HTTP-JSON-API-Gateway", "party": party};

      var jwt_auth = jwt.sign(payload, 'secret');
      state.ledger.defaults.headers.common['Authorization'] = "Bearer " + jwt_auth;
    },
    logoutParty (state) {
      // There must be a better way to do this
      state.party = null
      state.ledger.defaults.headers.common['Authorization'] = "" // delete instead?
      state.beers = null
      state.beerProposals = null
    },
    updateBeers(state, beers) {
      state.beers = beers
    },
    updateBeerProposals(state, beerProposals) {
      state.beerProposals = beerProposals;
    }
  },
  actions: {
    async getBeers ({commit, state}) {
      var query = {
        templateIds: ["Beer:Beer"],
        query: { recipient: state.party }
      };

      var beers = await state.ledger.post("/contracts/search", query);
      commit('updateBeers', beers.data)
    },
    async getBeerProposals ({commit, state}) {
      var query = {
        templateIds: ["Beer:BeerProposal"],
        query: {
          beer: {
            // templateIds: ["Beer:Beer"],
            recipient: this.party
          }
        }
      };

      var beerProposals = await state.ledger.post("/contracts/search", query)
      commit('updateBeerProposals', beerProposals.data.result)
    },
    async exerciseChoice({ commit, state }, {templateId, contractId, choice, argument={}}) {
      var query = {
        templateId: templateId,
        contractId: contractId,
        choice: choice,
        argument: argument
      }

      var response = await state.ledger.post("/command/exercise", query)

      // TODO: Finish handling response and updating lists
    }
  },
  modules: {
  },
});
