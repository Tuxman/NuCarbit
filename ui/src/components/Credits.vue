<template>
  <div>
    <v-col class="d-flex flex-wrap">
      <v-btn @click="refresh()"> Refresh </v-btn>
      <v-card v-for="asset in assetNames" :key="asset">
        <v-card v-for="prop in asset" :key="prop">
          <v-card-text>{{ prop }}</v-card-text>
        </v-card>
        <v-card> </v-card>
        <v-card> </v-card>
      </v-card>
    </v-col>
  </div>
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