import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
state() {
  return {
    count: 0,
    carbonDataArr: []
  }
},
mutations: {
  increment(state) {
    state.count++
  },
  mint(state, carbonData) {
    state.carbonDataArr.push({
      
    })
  }
}

});
