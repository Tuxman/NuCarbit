import Vue from 'vue';
import Vuex from 'vuex';
import jwt from "jsonwebtoken";
import createPersistedState from "vuex-persistedstate";
import { Choice, ContractId, Party, Template } from '@daml/types';
import Ledger, { CreateEvent, Query, Stream, StreamCloseEvent, QueryResult } from '@daml/ledger';
import * as obeer from '@daml.js/o_beer-1.0.0'

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
    ledgerUrl: process.env.VUE_APP_LEDGER_URL,
    obeer: obeer
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
        // Local devmode
        var payload = {
          "https://daml.com/ledger-api": {
            "ledgerId": process.env.VUE_APP_LEDGER_ID,
            "applicationId": "HTTP-JSON-API-Gateway",
            "actAs": [party]
          }
        };
        token = jwt.sign(payload, 'secret');
      } else {
        token = process.env.VUE_APP_TOKEN;
      }

      commit('loginParty', {party, token});
    },
    async getBeersOwed ({commit, state}) {
      var beersOwed = await state.ledger.query(obeer.Beer.Beer);
      commit('updateBeersOwed', beersOwed)
    },
    async getBeerProposals ({commit, state}) {
      var beerProposals = await state.ledger.query(obeer.Beer.BeerProposal);
      commit('updateBeerProposals', beerProposals)
    },
    async exerciseChoice({ commit, state }, {choice, contractId, argument={}}) {
      await state.ledger.exercise(choice, contractId, argument);
    },
    async createBeerProposal({commit, state}, recipient) {
      var payload = {
          beer: {
            templateId: obeer.Beer.Beer,
            giver: state.party,
            recipient: recipient
          }
        };

      try {
        await state.ledger.create(obeer.Beer.BeerProposal, payload);
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
