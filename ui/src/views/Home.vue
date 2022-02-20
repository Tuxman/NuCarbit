<template>
  <v-container>
    <TreeGreeting />
  </v-container>
</template>

<script>
  import TreeGreeting from '../components/TreeGreeting.vue'

  export default {
    name: 'Home',
    components: {
      TreeGreeting
    },
  }
</script>
