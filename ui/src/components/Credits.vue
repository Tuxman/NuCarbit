<template>
  <v-row>
    <v-col class="d-flex flex-wrap">
      <v-btn @click="refresh()" class="ma-4"> Address: AU9avKWiVVPKyU9LoMqDpduS4knoLDMdPEK54qKDNBpdnAMwQZcS </v-btn>
      <v-expansion-panels multiple>
        <v-expansion-panel
        v-for="asset in assetNames"
        :key="asset.id">
          <v-expansion-panel-header>Test</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-col xs="12" sm="12" md="12" lg="6" xl="4" class="d-inline-flex mr-n16 pr-n10">
              <v-card>
                <v-list>
                  <v-list-item class="mt-4">
                    <p class="font-weight-medium">ID:&nbsp;</p>
                    <p class="text-body-2">{{ asset.id }}</p>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item class="mt-4">
                    <p class="font-weight-medium">Evidence:&nbsp;</p>
                    <p class="text-body-2">{{ asset.evidence }}</p>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item class="mt-4">
                    <p class="font-weight-medium">Nonce:&nbsp;</p>
                    <p class="text-body-2">{{ asset.nonce }}</p>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <v-col xs="12" sm="12" md="12" lg="6" xl="4" class="d-inline-flex">
              <v-card>
                <v-list>
                  <v-list-item class="mt-4">
                    <p class="font-weight-medium">Asset Code: </p>
                    <p class="text-body-2">{{ asset.value.assetCode }}</p>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item class="my-4">
                    <v-btn @click="asset.toggleMetaData = !asset.toggleMetaData">
                      <p class="font-weight-medium">Metadata: </p>
                      <p class="text-body-2">{{ asset.value.metadata }}</p>
                    </v-btn>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item class="mt-4">
                    <p class="font-weight-medium">Quantity: </p>
                    <p class="text-body-2">{{ asset.value.quantity }}</p>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item class="mt-4">
                    <p class="font-weight-medium">Security Root: </p>
                    <p class="text-body-2">{{ asset.value.securityRoot }}</p>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <v-col xs="12" sm="12" md="12" xl="4" class="d-inline-flex" v-if="asset.toggleMetaData">
              <v-card>
                <v-list v-show="asset.toggleMetaData">
                  <v-list-item>meta 1</v-list-item>
                  <v-list-item>meta 2</v-list-item>
                </v-list>
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