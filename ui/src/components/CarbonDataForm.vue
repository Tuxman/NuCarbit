<template>
  <v-card>
    <v-form>
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="6">
            <v-form ref="form">
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
              <!-- <v-radio-group 
              row
              class="mt-n4 mb-n4"
              v-model="radioDateGroup"
              >
                <v-radio
                label="Year"
                value="year"
                ></v-radio>
                <v-radio
                label="Full Date"
                value="fullDate"
                ></v-radio>
              </v-radio-group> -->
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
              <v-btn @click="mintData(carbonData.date,carbonData.projectName,carbonData.projectDeveloper,carbonData.projectType,carbonData.methodology,carbonData.creditsIssued,carbonData.address,carbonData.assetState,carbonData.country)">Mint</v-btn>
              {{ this.$store.state.carbonDataArr }}
              {{ this.carbonData.projectName }}
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'CarbonDataForm',
  data() {
    return {
      // radioDateGroup: 'year'
      carbonData: Object.assign(this.carbonDataObj)
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
