
<template>
  <v-btn @click="connect()"> Connect </v-btn>
</template>

<script>
import WalletLink from 'walletlink'
import Web3 from 'web3'

export default {
  methods: {
    connect () {

const APP_NAME = 'NuCarbit'
const APP_LOGO_URL = ''
const DEFAULT_ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/a40f9cbe88ee4758ab51b0682175e7b8'
const DEFAULT_CHAIN_ID = 4

// Initialize WalletLink
const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false
})

// Initialize a Web3 Provider object
const ethereum = walletLink.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)

// Initialize a Web3 object
const web3 = new Web3(ethereum)

      return { ethereum, web3 }
    },
  },
};
</script>