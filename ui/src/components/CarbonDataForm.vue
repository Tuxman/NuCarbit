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
                <v-text-field label="Project ID">
                </v-text-field>
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
                v-model="carbonData.state"
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

export default {
  name: 'CarbonDataForm',
  data() {
    return {
      // radioDateGroup: 'year'
      carbonData: Object.assign(this.carbonDataObj),
      transaction: '',
      toggleChain: ''
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
      this.transaction = await axios.get('http://localhost:8000/mint')
    }
  },
  beforeCreate() {
    this.carbonDataObj = {
      menu: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      projectName: '',
      projectDeveloper: '',
      projectType: '',
      methodology: '',
      creditsIssued: '',
      address: '',
      assetState: '',
      country: ''
    }
  }
}
</script>
