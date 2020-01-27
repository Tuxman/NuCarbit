import Vue from 'vue';
import Vuex from 'vuex';
import jwt from "jsonwebtoken";

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
    jwt_auth : null,
    root_url : 'http://localhost:7575',
  },
  mutations: {
    updateParty (state, party) {
      state.party = party;

      var payload = {"ledgerId": "o_beer", "applicationId": "HTTP-JSON-API-Gateway", "party": party};
      state.jwt_auth = jwt.sign(payload, 'secret');
    }
  },
  actions: {
  },
  modules: {
  },
});
