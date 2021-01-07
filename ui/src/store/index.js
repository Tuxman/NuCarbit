import Vue from 'vue';
import Vuex from 'vuex';
import jwt from "jsonwebtoken";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import { ContractId,Party, Template } from '@daml/types';
import Ledger, { CreateEvent, Query, Stream, StreamCloseEvent, QueryResult } from '@daml/ledger';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths:['party', 'ledger']
  })],
  state: {
    party : null,
    beersOwed: null,
    beerProposals: null,
    ledger: null,
    ledgerUrl: process.env.VUE_APP_LEDGER_URL
    // ledger: axios.create(
    //   {
    //       baseURL: process.env.NODE_ENV === 'production' ?
    //         process.env.VUE_APP_LEDGER_URL
    //         : window.location.origin,
    //       timeout: 10000,
    //       headers: {
    //         "Content-Type": "application/json",
    //       }
    //     }
    // )
  },
  mutations: {
    loginParty(state, {party, token}){
      state.party = party;
      var ledgerUrl = state.ledgerUrl;
      state.ledger = new Ledger({token, ledgerUrl, reconnectThreshold: 1337});
    },
    logoutParty (state) {
      // There must be a better way to do this
      state.party = null;
      state.ledger = null;
      state.beers = null;
      state.beerProposals = null;
    },
    updateBeersOwed(state, beersOwed) {
      state.beersOwed = beersOwed;
    },
    updateBeerProposals(state, beerProposals) {
      state.beerProposals = beerProposals;
    }
  },
  actions: {
    async updateParty ({commit, state}, party) {
      var token = null;

      if (typeof process.env.VUE_APP_TOKEN === 'undefined' || process.env.VUE_APP_TOKEN === null){
        var payload = {"ledgerId": "o_beer", "applicationId": "HTTP-JSON-API-Gateway", "party": party};
        token = jwt.sign(payload, 'secret');
      }

      commit('loginParty', {party, token});
    },
    async getBeersOwed ({commit, state}) {
      // var query = {
      //   templateIds: ["Beer:Beer"],
      //   query: {}
      // };

      var beersOwed = await state.ledger.query(["Beer:Beer"], {});
      commit('updateBeersOwed', beersOwed.contracts)
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
