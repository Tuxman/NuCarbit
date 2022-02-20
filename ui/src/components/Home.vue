<template>
  <v-container>
    <TreeGreeting/>
    <Bifrost/>
    <Connect/>
  </v-container>
</template>

<script>
import TreeGreeting from '../components/TreeGreeting.vue'
import Bifrost from '../components/Bifrost.vue'
import Connect from '../components/Connect.vue'
export default {
  name: "home",
  components: {
    TreeGreeting,
    Bifrost,
    Connect
  }
}
</script>