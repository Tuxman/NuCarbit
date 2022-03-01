<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="1"></v-col>
      <v-col cols="3">
        <v-card class="rounded-xl mr-6" color="rgb(200, 200, 200, 0.95)">
          <v-card-title>Daml</v-card-title>
          <v-card-text>
            	- Robust smart contract language and tooling for creating off-chain smart contracts
              <br>
              - can interface between multiple blockchains and databases
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="rounded-xl mx-2" color="rgb(200, 200, 200, 0.95)">
          <v-card-title>Topl</v-card-title>
          <v-card-text>
            	- Layer 1 blockchain focused on impact finance
              <br>
	            - smart assets allow full control of tokenized assets on-chain
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="rounded-xl ml-6" color="rgb(200, 200, 200, 0.95)">
          <v-card-title>ChainLink</v-card-title>
          <v-card-text>
            - Read and write data from external sources
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SecondCardGroup',
}
</script>