<template>
<div>
  <v-col class="d-flex flex-wrap">
    <v-card v-for="asset in assetNames" :key="asset">
      <v-card-text>{{ asset }}</v-card-text>
      <v-card>
        
      </v-card>
      <v-card>

      </v-card>
    </v-card>
  </v-col>
</div>
</template>

<script>
export default {
  name: 'AssetCard',
  data() {
    return {
      assetNames: [
        'a1',
        'a2',
        'a3'
      ]
    }
  },
  methods: {
  }
}
</script>