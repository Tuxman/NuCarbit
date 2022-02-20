
<template>
  <v-container>
    <v-btn @click="connect()"> Connect </v-btn>
  </v-container>
</template>

<script>
import coinbaseWallet from "../utils/coinbaseWallet";

export default {
  methods: {
    connect() {
      const providerOptions = {
        walletlink: {
          package: WalletLink, // Required
          options: {
            appName: "Nucarbit", // Required
            infuraId: "a40f9cbe88ee4758ab51b0682175e7b8", // Required unless you provide a JSON RPC url; see `rpc` below
            // rpc: "", // Optional if `infuraId` is provided; otherwise it's required
            chainId: 4, // Optional. It defaults to 1 if not provided
            appLogoUrl: null, // Optional. Application logo image URL. favicon is used if unspecified
            darkMode: false, // Optional. Use dark theme, defaults to false
          },
        },
      };

      const web3Modal = new Web3Modal({
        network: "rinkeby",
        cacheProvider: true,
        providerOptions,
      });

      const provider = web3Modal.connect();

      const web3 = new Web3(provider);
    },
  },
};
</script>