<template>
  <v-app>
    <v-app-bar app color="primary" prominent>
      <v-col class="d-inline-flex align-end">
        <div>
          <v-btn to="/" text class="ma-2" width="240px" height="80px">
            <v-img
              alt="NuCarbit Logo"
              class="ma-6"
              src="@/assets/logo-full-white-text.png"
              width="160px"
            ></v-img>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-btn to="CarbonDataForm" text>
            <span class="mr-2 white--text">Data</span>
          </v-btn>
          <v-btn to="credits" text>
            <span class="mr-2 white--text">Credits</span>
          </v-btn>
          <v-btn text @click="connect()" class="white--text">Connect</v-btn>
        </div>
      </v-col>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer padless color="footer">
      <v-row justify="center" no-gutters>
        <v-col class="py-1 text-center" cols="12">
          <v-btn
            v-for="link in footerLinks"
            :key="link.name"
            :href="link.hyperlink"
            target="_blank"
            text
            rounded
            class="my-2"
          >
            {{ link.name }}
          </v-btn>
        </v-col>
        <v-col class="pb-4 text-center" cols="12">
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
      headerLinks: [
        {
          name: 'Data',
          hyperlink: ''  
        },
        {
          name: 'Credits',
          hyperlink: ''  
        },
        {
          name: 'Connect',
          hyperlink: ''  
        },
      ],
      footerLinks: [
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
