<template>
  <v-row>
    <v-col class="d-flex flex-wrap">
      <v-btn @click="refresh()"> Refresh </v-btn>
      <v-expansion-panels multiple>
        <v-expansion-panel
        v-for="asset in assetNames"
        :key="asset.id">
          <v-expansion-panel-header>Test</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-col cols="6" class="d-inline-flex flex-wrap">
              <v-list>
                <v-list-item>ID: {{ asset.id }}</v-list-item>
                <v-list-item>Evidence: {{ asset.evidence }}</v-list-item>
                <v-list-item>Nonce: {{ asset.nonce }}</v-list-item>
              </v-list>
            </v-col>
            <v-col cols="6" class="d-inline-flex flex-wrap">
              <v-list>
                <v-list-item>Asset Code: {{ asset.value.assetCode }}</v-list-item>
                <v-list-item>Metadata: {{ asset.value.metadata }}</v-list-item>
                <v-list-item>Quantity: {{ asset.value.quantity }}</v-list-item>
                <v-list-item>Security Root: {{ asset.value.securityRoot }}</v-list-item>
              </v-list>
            </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>



      <!-- <v-card v-for="asset in assetNames" :key="asset.id">
        {{ asset.evidence }}
        {{ asset.id }}
        {{ asset.nonce }}
        <v-card v-for="prop in asset" :key="prop.id">
          {{ prop }}
        </v-card>
      </v-card> -->
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
      boxes.map(box => console.log(box))

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
  },
};
</script>