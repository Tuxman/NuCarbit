<template>
  <v-row justify="center">
    <v-col cols="6">
      <v-card>
        <v-container>
          <v-row justify="center">
            <v-col cols="10">
              <span>Where would you like to mint?</span>
              <v-btn-toggle
              v-model="toggleChain">
                <v-btn value="on">On Chain</v-btn>
                <v-btn value="off">Off Chain</v-btn>
              </v-btn-toggle>
              <v-form ref="form" v-show="toggleChain == 'on' || toggleChain == 'off'">
                <v-menu
                  v-model="carbonData.menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="carbonData.date"
                      label="Issuance Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="carbonData.date"
                    @input="carbonData.menu = false"
                    scrollable
                  ></v-date-picker>
                </v-menu>
                <v-text-field
                 label="Project ID"
                 v-model="carbonData.projectId"
                 ></v-text-field>
                <v-text-field
                label="Name of Project"
                v-model="carbonData.projectName"
                ></v-text-field>
                <v-text-field 
                label="Project Developer or Assembler"
                v-model="carbonData.projectDeveloper"
                ></v-text-field>
                <v-text-field 
                label="Project Type"
                v-model="carbonData.projectType"
                ></v-text-field>
                <v-text-field 
                label="Methodology"
                v-model="carbonData.methodology"
                ></v-text-field>
                <v-text-field 
                label="Total Carbon Credits Issued"
                v-model="carbonData.creditsIssued"
                ></v-text-field>
                <v-text-field 
                label="Location (Address, City/Town)"
                v-model="carbonData.address"
                ></v-text-field>
                <v-text-field 
                label="State/Province"
                v-model="carbonData.assetState"
                ></v-text-field>
                <v-text-field 
                label="Country"
                v-model="carbonData.country"
                ></v-text-field>
                <v-btn @click="mockMint()">
                  mint
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import Ledger from '@daml/ledger'
import { Topl } from '@daml.js/nucarbit-0.1.0'
import { encode } from 'jwt-simple'

export default {
  name: 'CarbonDataForm',
  data() {
    return {
      // radioDateGroup: 'year'
      carbonData: Object.assign(this.carbonDataObj),
      transaction: '',
      toggleChain: '',
      address: 'AU9avKWiVVPKyU9LoMqDpduS4knoLDMdPEK54qKDNBpdnAMwQZcS',
    }
  },
  methods: {
    // mint(date, projectName, projectDeveloper, projectType, methodology, creditsIssued, address, assetState, country) {
    //   this.$store.dispatch('mint', {
    //     date: date,
    //     projectName: projectName,
    //     projectDeveloper: projectDeveloper,
    //     projectType: projectType,
    //     methodology: methodology,
    //     creditsIssued: creditsIssued,
    //     address: address,
    //     assetState: assetState,
    //     country: country
    //   })
    // }
    mintData(carbonData) {
      this.$store.commit('mint', carbonData)
    },

    async mockMint() {
      // this.transaction = await axios.get('http://localhost:8000/mint')
    },

    async createUser(user) {
      try {
        console.log('Instantiating ledger')
        const token = this.makeToken(user)
        const ledger = new Ledger({token: token})
        console.log(ledger)
        console.log('Topl template contract: ')
        console.log(Topl)
        console.log(`user: ${user}`)
        // const packages = await ledger.listPackages()
        // console.log('packages: ')
        // console.log(packages)
        // let userContract = await ledger.fetchByKey(Topl.User, 'AU9avKWiVVPKyU9LoMqDpduS4knoLDMdPEK54qKDNBpdnAMwQZcS')
        // console.log(userContract)
        // if (userContract === null) {
        //   const userParams = {issuer: user, owner: user}
        //   console.log(userParams)
        //   userContract = await ledger.create(Topl.User, userParams)
        //   console.log(userContract)
        // }
      } catch(error) {
        alert(`Unknown error:\n${JSON.stringify(error)}`)
      }
    },

    makeToken(party) {
        const ledgerId = process.env.REACT_APP_LEDGER_ID ?? "nucarbit-sandbox"
        const payload = {
          "https://daml.com/ledger-api": {
            "ledgerId": ledgerId,
            "applicationId": 'nucarbit',
            "actAs": [party]
          }
        }
        return encode(payload, "secret", "HS256");
    }
  },

  beforeCreate() {
    this.carbonDataObj = {
      menu: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      projectId: '1',
      projectName: 'Topl',
      projectDeveloper: 'Nucarbit',
      projectType: 'Sequestration',
      methodology: 'DAC',
      creditsIssued: '1',
      address: '1234 Anytown',
      assetState: 'TX',
      country: 'USA'
    }
  },

  async created() {
    await this.createUser('Alice')
  }
}
</script>
