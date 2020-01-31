<template>
  <b-container>
    <b-row>
      <b-col class="col-6 mx-auto">
        <b-input-group>
          <b-form-input v-model="newParty"></b-form-input>
          <b-input-group-append>
            <router-link to="/">
              <b-button variant="primary" v-on:click.once="updateParty">
                Login
              </b-button>
            </router-link>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
  </b-container>
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
    async updateParty() {
      if (this.newParty) {
        await this.$store.dispatch('updateParty', this.newParty)
      }
    }
  }
};
</script>

<style>

</style>
