<template>
  <div>
    <input :value="party" @input="updateParty">
    <router-link to="/" tag="button">Login</router-link>
    <!-- <p>Party: {{party}}</p>
    <p>Token: {{jwt_auth}}</p> -->
  </div>
</template>

<script>
import store from "../store";
import { mapState } from 'vuex'
export default {
	name: 'login',
  store,
  data () {
    return {

    }
  },
  computed : {
    ...mapState(['party', 'jwt_auth'])
  },
  methods: {
    // There is a less cumbersome way to do this over here: https://vuex.vuejs.org/guide/forms.html
    updateParty(e) {
      this.$store.commit('updateParty', e.target.value)
    }
  }
};
</script>

<style>

</style>
