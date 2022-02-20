<template>
  <v-row justify="center">
    <v-col class="d-flex justify-center">
      <v-card>
        <v-img 
        :background-size=true
        src="@/assets/tree-background.jpg"
        class="white--text mt-n3 mx-n18">
          <v-row>
            <v-col>
              <SolutionSummary class="mt-16"/>
              <FirstCardGroup/>
              <TechSummary/>
              <SecondCardGroup/>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SolutionSummary from '../components/SolutionSummary.vue'
import FirstCardGroup from '../components/FirstCardGroup.vue'
import TechSummary from '../components/TechSummary.vue'
import SecondCardGroup from '../components/SecondCardGroup.vue'

export default {
  components: {
    SolutionSummary,
    FirstCardGroup,
    TechSummary,
    SecondCardGroup
  },
}
</script>
