<template>
  <v-container>
    <TreeGreeting/>
    <Bifrost/>
  </v-container>
</template>

<script>
import TreeGreeting from '../components/TreeGreeting.vue'
import Bifrost from '../components/Bifrost.vue'
export default {
  name: "home",
  components: {
    TreeGreeting,
    Bifrost
  }
}
</script>