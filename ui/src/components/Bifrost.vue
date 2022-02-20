
<template>
  <v-container>
    <v-btn @click="getBalances()">
      Balances
    </v-btn>

  </v-container>
</template>

<script>
import axios from 'axios'

export default {

  data () {
    return {
      url: 'http://localhost:8000'
    }
  },

  async created () {

    await axios.get(`${this.url}/init`)
    .then(res => console.log(res.data))
  },

  methods: {

    async getBalances () {
      await axios.get(`${this.url}/balances`)
      .then(res => console.log(res))
      .catch(console.log)
    }
  }

}
</script>