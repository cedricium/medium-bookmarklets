<template>
  <div class="is-right">
    <button id="demo-menu-lower-right"
        class="mdl-button mdl-js-button mdl-button--icon">
      <i class="material-icons">more_vert</i>
    </button>

    <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
        for="demo-menu-lower-right">
      <li class="mdl-menu__item">Some Action</li>
      <li class="mdl-menu__item">Another Action</li>
      <li disabled class="mdl-menu__item">Disabled Action</li>
      <li class="mdl-menu__item">Yet Another Action</li>
    </ul>
  </div>
</template>

<script>
import CardView from './CardView';
export default {
  components: {
    CardView
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-right {
  /* padding: 20px; */
  text-align: right;
}
</style>
