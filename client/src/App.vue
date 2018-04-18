<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <sidebar-nav />
    <router-view/>
  </div>
</template>

<script>
import SidebarNav from '@/components/SidebarNav.vue';

export default {
  name: 'App',
  components: {
    SidebarNav
  }
};
</script>

<style lang="scss">
$primary: #7678ed;

@import "~bulma/sass/utilities/_all";
@import "~bulma/sass/base/generic";

html {
  min-width: 0 !important;
}

$box-padding: 0.75rem;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
