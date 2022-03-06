<template>
  <v-row justify="center">
    <v-col class="d-flex flex-wrap">
      <v-btn @click="refresh()" class="ma-4"> Address: AU9avKWiVVPKyU9LoMqDpduS4knoLDMdPEK54qKDNBpdnAMwQZcS </v-btn>
      <v-expansion-panels multiple class="mx-4">
        <v-expansion-panel
        v-for="asset in assetNames"
        :key="asset.id">
          <v-expansion-panel-header>Asset Name: TestAsset</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-col xs="12" sm="12" md="12" lg="6" xl="4" class="d-inline-flex mr-n16 pr-n10">
              <v-card elevation="4" outlined>
                <v-card-title class="justify-center">Blockchain Data</v-card-title>
                <v-card>
                  <v-list>
                    <v-list-item class="my-2">
                      <span class="font-weight-medium">ID:
                      <span class="text-body-2">{{ asset.id }}</span></span>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item class="my-2">
                      <span class="font-weight-medium">Evidence:
                      <span class="text-body-2">{{ asset.evidence }}</span></span>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item class="my-2">
                      <span class="font-weight-medium">Nonce:
                      <span class="text-body-2">{{ asset.nonce }}</span></span>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-card>
            </v-col>
            <v-col xs="12" sm="12" md="12" lg="6" xl="4" class="d-inline-flex">
              <v-card elevation="4" outlined>
                <v-card-title class="justify-center">Asset Properties</v-card-title>
                <v-card>
                  <v-list>
                    <v-list-item class="my-2">
                      <span class="font-weight-medium">Asset Code:
                      <span class="text-body-2">{{ asset.value.assetCode }}</span></span>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item class="my-2">
                      <v-btn @click="asset.toggleMetaData = !asset.toggleMetaData">
                        <span class="font-weight-medium">Metadata</span>
                      </v-btn>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item class="my-2">
                      <span class="font-weight-medium">Quantity:
                      <span class="text-body-2">{{ asset.value.quantity }}</span></span>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item class="my-2">
                      <span class="font-weight-medium">Security Root:
                      <span class="text-body-2">{{ asset.value.securityRoot }}</span></span>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-card>
            </v-col>
            <v-col xs="12" sm="12" md="12" xl="4" class="d-inline-flex" v-if="asset.toggleMetaData">
              <v-card elevation="4" outlined>
                <v-card-title class="justify-center">Metadata Properties</v-card-title>
                <v-card>
                  <v-list v-show="asset.toggleMetaData">
                    <v-list-item class="my-2">
                      <span class="text-body-2">{{ asset.value.metadata }}</span>
                    </v-list-item>
                  </v-list>
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
      assetNames: [
        {
"toggleMetaData": false,
"nonce": "8357572620002112241",
"id": "9nXAVt82sKGfU3dDYAdCLVGuUN7NTbZnoqQgr8x6b3eq",
"evidence": "LmJU2jCd6pUWNKQgifyxXWw9XnFr2cxxSY57MLqjqM6e",
"type": "AssetBox",
"value": {
	"quantity": "1",
	"assetCode": "6Lm9dRk8kZqP1ZgKJutmNAmkwZsqKu14JLrtWWcZapuFpZ93vthSVgPPZ9",
	"metadata": "{'date': '2022-03-04','projectId': '1','projectName': 'Topl','projectDeveloper': 'Nucarbit','projectType': 'Sequestration','methodology': 'DAC','creditsIssued': '1','address': '1234 Anytown','assetState': 'TX','country': 'USA'}",
	"type": "Asset",
	"securityRoot": "11111111111111111111111111111111"
}
},
                    {
                        "toggleMetaData": false,
                        "nonce": "-7583401972890980652",
                        "id": "Gj2iycFbt8izV6gT79gH3wxbiV1djoGtkpCaoYphvkzD",
                        "evidence": "LmJU2jCd6pUWNKQgifyxXWw9XnFr2cxxSY57MLqjqM6e",
                        "type": "AssetBox",
                        "value": {
                            "quantity": "2",
                            "assetCode": "6Lm9dRk8kZqP1ZgKJutmNAmkwZsqKu14JLrtWWcZapuFpZ93vthSVgPPZ9",
                            "metadata": "{'date': '2022-03-04','projectId': '1','projectName': 'Topl','projectDeveloper': 'Nucarbit','projectType': 'Sequestration','methodology': 'Tree planting','creditsIssued': '1','address': '1234 Anytown','assetState': 'TX','country': 'USA'}",
                            "type": "Asset",
                            "securityRoot": "11111111111111111111111111111111"
                        }
                    }

      ],
    };
  },
  methods: {
    async refresh() {
      const balances = await axios.get("http://localhost:8000/balances");

      const boxes = balances.data.result.AU9avKWiVVPKyU9LoMqDpduS4knoLDMdPEK54qKDNBpdnAMwQZcS.Boxes.AssetBox 

      console.log(boxes)
      boxes.map(box => 
      box.toggleMetaData = false)

      // const formatted = boxes.map(box => 
      // Object.assign(
      //   {},
      //   ...(function _flatten(o) {
      //     return [].concat(
      //       ...Object.keys(o).map((k) =>
      //         typeof o[k] === "object" ? _flatten(o[k]) : { [k]: o[k] }
      //       )
      //     );
      //   })(box)
      // ))

      this.assetNames = boxes
    },
    showMeta(toggle) {
      toggle = !toggle
    }
  },
};
</script>