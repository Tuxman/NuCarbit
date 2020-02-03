import Vue from 'vue';
import Vuex from 'vuex';
import jwt from "jsonwebtoken";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

// Figure out where the site is hosted from. Thanks Dimitri.
const siteSubDomain = () => {
  if (window.location.hostname === 'localhost') {
      return 'http://localhost:7575';
  }

  let host = window.location.host.split('.')
  const ledgerId = host[0];
  let apiUrl = host.slice(1)
  apiUrl.unshift('api')

  return 'https://' + apiUrl.join('.') + (window.location.port ? ':' + window.location.port : '') + '/data/' + ledgerId;
}

const site = siteSubDomain();

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths:['party', 'ledger']
  })],
  state: {
    party : null,
    beersOwed: null,
    beerProposals: null,
    ledger: axios.create(
      {
          baseURL: site,
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          }
        }
    )
  },
  mutations: {
    loginParty(state, {party, authHeader}){
      state.party = party
      state.ledger.defaults.headers.common['Authorization'] = authHeader
    },
    logoutParty (state) {
      // There must be a better way to do this
      state.party = null
      state.ledger.defaults.headers.common['Authorization'] = "" // delete instead?
      state.beers = null
      state.beerProposals = null
    },
    updateBeersOwed(state, beersOwed) {
      state.beersOwed = beersOwed
    },
    updateBeerProposals(state, beerProposals) {
      state.beerProposals = beerProposals;
    }
  },
  actions: {
    async updateParty ({commit, state}, party) {
      var payload = {"ledgerId": "o_beer", "applicationId": "HTTP-JSON-API-Gateway", "party": party};
      var jwtAuth = jwt.sign(payload, 'secret');
      var authHeader = "Bearer " + jwtAuth;

      commit('loginParty', {party, authHeader});
    },
    async getBeersOwed ({commit, state}) {
      var query = {
        templateIds: ["Beer:Beer"],
        query: { 
          // recipient: state.party 
        }
      };

      var beersOwed = await state.ledger.post("/contracts/search", query);
      commit('updateBeersOwed', beersOwed.data.result)
    },
    async getBeerProposals ({commit, state}) {
      var query = {
        templateIds: ["Beer:BeerProposal"],
        query: {
          beer: {
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

      await state.ledger.post("/command/exercise", query)
    },
    async createBeerProposal({commit, state}, recipient) {
      var query = {
        templateId: "Beer:BeerProposal",
        argument: {
          beer: {
            templateId: "Beer:Beer",
            giver: state.party,
            recipient: recipient
          }
        }
      };

      try {
        await state.ledger.post("/command/create", query);
      }
      catch (err) {
        // TODO: Should throw an event and show a dialog box
        console.log("Couldn't create contract " + err)
      }
    }
  },
  modules: {
  },
});
