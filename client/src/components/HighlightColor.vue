<template>
  <section class="section">
    <h4 class="title is-4">Highlight Color</h4>
    <h6 class="subtitle is-6">
      Use the below color picker to select the color of the bookmarklet Highlight
      that is seen when saving your place in a Medium article.
    </h6>
    <compact-picker v-model="colors" />
    <!-- <swatches-picker v-model="colors" /> -->
  </section>
</template>

<script>
import { Compact, Swatches } from 'vue-color'

export default {
  data () {
    return {
      colors: {
        hex: 'yellow'
      }
    }
  },
  components: {
    'compact-picker': Compact,
    'swatches-picker': Swatches
  }
};
</script>

<style scoped>
div.vc-compact {
  width: 100%;
  max-width: 725px;
}
</style>
