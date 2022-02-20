<template>
  <v-container>
    <TreeGreeting/>
  </v-container>
</template>

<script>
import TreeGreeting from '../components/TreeGreeting.vue'
import Bifrost from '../components/Bifrost.vue'
export default {
  name: "home",
  components: {
    TreeGreeting
  }
}
</script>