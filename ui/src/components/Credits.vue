<template>
  <v-row justify="center">
    <v-col class="d-flex flex-wrap" cols="8">
      <v-btn @click="refresh()" class="ma-4 mt-6"> Address: AU9avKWiVVPKyU9LoMqDpduS4knoLDMdPEK54qKDNBpdnAMwQZcS </v-btn>
      <v-expansion-panels multiple class="ma-4">
        <v-expansion-panel
        v-for="asset in assetNames"
        :key="asset.id">
          <v-expansion-panel-header>Asset Name: </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-col cols="12" xl="6" class="d-inline-flex justify-center">
              <v-card elevation="4" outlined min-width="552px">
                <v-card-title class="justify-center">Blockchain Data</v-card-title>
                <v-card>
                  <v-list>
                    <div v-for="(item, index) in listOne" :key="index">
                      <v-list-item>
                        <span class="font-weight-medium text-body-2">{{ item.title }}
                        <span class="caption">{{ asset[item.text] }}</span></span>
                      </v-list-item>
                      <v-divider v-if="index != listOne.length - 1"></v-divider>
                    </div>
                  </v-list>
                </v-card>
              </v-card>
            </v-col>
            <v-col cols="12" xl="6" class="d-inline-flex justify-center">
              <v-card elevation="4" outlined min-width="552px">
                <v-card-title class="justify-center">Asset Properties</v-card-title>
                <v-card>
                  <v-list>
                    <div v-for="(item, index) in listTwo" :key="index">
                      <v-list-item>
                        <span class="font-weight-medium text-body-2">{{ item.title }}
                        <span class="caption">{{ asset.value[item.text] }}</span></span>
                      </v-list-item>
                      <v-divider></v-divider>
                    </div>
                    <v-list-item>
                      <v-btn @click="asset.toggleMetaData = !asset.toggleMetaData">
                        <span class="font-weight-medium text-body-2">Metadata:
                        <span class="caption">{{ asset.value.metadata }}</span></span>
                      </v-btn>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-card>
            </v-col>
            <v-col cols="12" xl="6" class="d-inline-flex justify-center" v-if="asset.toggleMetaData">
              <v-card elevation="4" outlined min-width="552px">
                <v-card-title class="justify-center">Metadata Properties</v-card-title>
                <v-card class="scroll" max-height="211px">
                  <v-list v-show="asset.toggleMetaData">
                    <div v-for="(item, index) in listThree" :key="index">
                      <v-list-item>
                        <span class="font-weight-medium text-body-2">{{ item.title }}
                        <span class="caption">{{ asset.metaData[item.text] }}</span></span>
                        <v-spacer></v-spacer>
                        <v-btn>Verify</v-btn>
                      </v-list-item>
                      <v-divider v-if="index != listThree.length - 1"></v-divider>
                    </div>
                  </v-list>
                </v-card>
              </v-card>
            </v-col>
            <v-col cols="12" xl="6" class="d-inline-flex justify-center">
              <v-card elevation="4" outlined min-width="552px" v-show="asset.toggleMetaData">
                <v-card-title class="justify-center">Metadata Proof</v-card-title>
                <v-card min-height="211px">

                </v-card>
              </v-card>
            </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "Credits",
  data() {
    return {
      assetNames: [],
      listOne: [
        {
          title: 'ID: ',
          text: 'id'
        },
        {
          title: 'Evidence: ',
          text: 'evidence'
        },
        {
          title: 'Nonce: ',
          text: 'nonce'
        },
        {
          title: '',
          text: ''
        }
      ],
      listTwo: [
        {
          title: 'Asset Code: ',
          text: 'assetCode'
        },
        {
          title: 'Quantity: ',
          text: 'quantity'
        },
        {
          title: 'Security Root: ',
          text: 'securityRoot'
        }
      ],
      listThree: [
        {
          title: 'Date: ',
          text: 'date'
        },
        {
          title: 'Project ID: ',
          text: 'projectId'
        },
        {
          title: 'Project Name: ',
          text: 'projectName'
        },
        {
          title: 'Project Developer: ',
          text: 'projectDeveloper'
        },
        {
          title: 'Project Type: ',
          text: 'projectType'
        },
        {
          title: 'Methodology: ',
          text: 'methodology'
        },
        {
          title: 'Credits Issued: ',
          text: 'creditsIssued'
        },
        {
          title: 'Address: ',
          text: 'address'
        },
        {
          title: 'State: ',
          text: 'assetState'
        },
        {
          title: 'Country: ',
          text: 'country'
        },
      ]
    };
  },
  methods: {
    async refresh() {
      const balances = await axios.get("http://localhost:8000/balances");

      const boxes = balances.data.result.AU9avKWiVVPKyU9LoMqDpduS4knoLDMdPEK54qKDNBpdnAMwQZcS.Boxes.AssetBox 

      console.log(boxes)
      boxes.map(box => 
      box.toggleMetaData = false
      )
      boxes.map(box => 
      box.metaData = {"date": "2022-03-04","projectId": "1","projectName": "Topl","projectDeveloper": "NuCarbit","projectType": "Sequestration","methodology": "DAC","creditsIssued": "1","address": "1234 Anytown","assetState": "TX","country": "USA"})

      this.assetNames = boxes
    },
  },
};
</script>

<style>
.scroll {
  overflow-y: scroll
}

</style>