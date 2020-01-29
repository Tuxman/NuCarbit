<template>
  <div>
    <input v-model="newParty">
    <router-link to="/" tag="button">
      <span v-on:click.once="updateParty">Login</span>
    </router-link>
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
      newParty: null
    }
  },
  computed: {
    ...mapState(['party', 'jwt_auth'])
  },
  methods: {
    // There is a less cumbersome way to do this over here: https://vuex.vuejs.org/guide/forms.html
    updateParty() {
      if (this.newParty) {
        this.$store.commit('updateParty', this.newParty)
      }
    }
  }
};
</script>

<style>

</style>
