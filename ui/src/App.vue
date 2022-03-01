<template>
  <v-app color="#FEFAE0">
    <v-app-bar app color="primary" prominent>
      <div class="d-flex align-center">
        <v-btn to="/" text class="ma-4" width="240px" height="80px">
          <v-img
            alt="NuCarbit Logo"
            class="ma-6"
            contain
            src="@/assets/full-logo-transparent.png"
            width="160px"
          />
        </v-btn>
        <v-spacer></v-spacer>
        <div>
          <v-btn to="CarbonDataForm" text>
            <span class="mr-2">Data</span>
          </v-btn>
          <v-btn to="credits" text>
            <span class="mr-2">Credits</span>
          </v-btn>
          <!-- <Connect /> -->
          <v-btn text @click="connect()"> Connect </v-btn>
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer padless>
      <v-row justify="center" no-gutters>
        <v-col class="grey darken-4 py-1 text-center white--text" cols="12">
          <v-btn
            v-for="link in links"
            :key="link.name"
            :href="link.hyperlink"
            target="_blank"
            color="white"
            text
            rounded
            class="my-2"
          >
            {{ link.name }}
          </v-btn>
        </v-col>
        <v-col class="grey darken-4 pb-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>NuCarbit</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import WalletLink from 'walletlink'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

export default {
  name: "App",
  components: {
  },
  data() {
    return {
      links: [
        {
          name: 'Github',
          hyperlink: 'https://github.com/Tuxman/NuCarbit'
        }
      ],
      web3: {},
    };
  },

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

      this.web3 = web3
    },
  },
};
</script>
