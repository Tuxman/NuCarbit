import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    // return {
      // web3: {},
      // ethereum: {},
      // carbonDataArr: [],
      // carbonData: {
      //   date: '',
      //   projectName: '',
      //   projectDeveloper: '',
      //   projectType: '',
      //   methodology: '',
      //   creditsIssued: '',
      //   address: '',
      //   assetState: '',
      //   country: ''
      // }
    // }
    carbonDataArr: []
  },
  mutations: {
    mint: (state, payload) => {
      // state.carbonData.date = payload.date
      // Vue.set(state.carbonData, 'projectName', payload.projectName)
      // Vue.set(state.carbonData, 'projectDeveloper', payload.projectDeveloper)
      // Vue.set(state.carbonData, 'projectType', payload.projectType)
      // Vue.set(state.carbonData, 'methodology', payload.methodology)
      // Vue.set(state.carbonData, 'creditsIssued', payload.creditsIssued)
      // Vue.set(state.carbonData, 'address', payload.address)
      // Vue.set(state.carbonData, 'assetState', payload.assetState)
      // Vue.set(state.carbonData, 'country', payload.country)
      state.carbonDataArr.push(payload)
    },
  },
  actions: {
    mint: (context, payload) => {
      context.commit('mint', payload)
    }
  }
});
