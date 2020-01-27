<template>
  <div class="home-component">
		{{parties}}
  </div>
</template>

<script>
import store from "../store";
import { mapState } from 'vuex'

const axios = require('axios');

export default {
	name: 'home',
	store,
	data () {
		return {
			parties : null,
			ledger: null,
		}
	},
	computed: {
		...mapState(['root_url', 'jwt_auth']),
	},
	mounted () {
		this.ledger = axios.create({
			baseURL: this.root_url,
			timeout: 1000,
			headers: {
								'Content-Type': 'application/json',
								'Authorization': 'Bearer ' + this.jwt_auth
								}
		})
		this.ledger.get('/parties').then(request => (this.parties = request))
	}
}
</script>

<style>

</style>