<template>
  <v-row justify="center">
    <v-col cols="8" lg="6" xl="6">
      <v-card class="my-6">
        <v-container>
          <v-row justify="center">
            <v-col cols="12">
              <v-row justify="center">
                <v-col>
                  <v-card-text class="text-center text-h5">Where would you like to mint?</v-card-text>
                  <v-btn-toggle
                  v-model="toggleChain">
                    <v-col v-for="chain in chainOptions" :key="chain.id">
                      <v-card>
                        <v-card-text :class="chain.textClass">
                          {{ chain.text }}
                        </v-card-text>
                        <v-card-actions :class="chain.actionsClass">
                          <v-btn :value="chain.btnValue">
                            {{ chain.name }}
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="8">
                  <v-form ref="form" v-show="toggleChain == 'on-chain' || toggleChain == 'off-chain'">
                    <v-text-field 
                    label="Project ID"
                    v-model="carbonData.projectID">
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
                    v-for="field in textFields"
                    :key="field.id"
                    :label="field.label"
                    :v-model="field.model"
                    ></v-text-field>
                    <v-btn @click="mockMint()">
                      mint {{ toggleChain }}
                    </v-btn>
                  </v-form>
                </v-col>
              </v-row>
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
      toggleChain: '',
      chainOptions: [
        {
          name: 'Off-Chain',
          textClass: 'text-center',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat eros magna, nec interdum ligula sollicitudin sed. Duis ut ornare odio. Suspendisse sagittis sit amet erat a mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.',
          actionsClass: 'justify-center',
          btnValue: 'off-chain'
        },
        {
          name: 'On-Chain',
          textClass: 'text-center',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat eros magna, nec interdum ligula sollicitudin sed. Duis ut ornare odio. Suspendisse sagittis sit amet erat a mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.',
          actionsClass: 'justify-center',
          btnValue: 'on-chain'
        }
      ],
      textFields: [
        {
          label: 'Name of Project',
          model: 'carbonData.projectName'
        },
        {
          label: 'Project Developer or Assembler',
          model: 'carbonData.projectDeveloper'
        },
        {
          label: 'Project Type',
          model: 'carbonData.projectType'
        },
        {
          label: 'Methodology',
          model: 'carbonData.methodology'
        },
        {
          label: 'Total Carbon Credits Issued',
          model: 'carbonData.creditsIssued'
        },
        {
          label: 'Location (Address, City/Town)',
          model: 'carbonData.address'
        },
        {
          label: 'State/Province',
          model: 'carbonData.assetState'
        },
        {
          label: 'Country',
          model: 'carbonData.country'
        },
      ]
    }
  },
  methods: {
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
      projectID: '',
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
