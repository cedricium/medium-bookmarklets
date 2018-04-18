<template>
  <nav class="navbar is-primary">
    <div class="navbar-brand is-pulled-right">
      <div class="navbar-item" id="back-button"
          v-show="$route.name !== 'default'">
        <router-link :to="{name: 'default'}" class="button is-primary" slot="trigger">
          <b-icon
            pack="fas"
            icon="angle-left"></b-icon>
        </router-link>
      </div>
      <div class="navbar-item">
        <b-dropdown>
          <button class="button is-primary" slot="trigger">
              <b-icon
                pack="fas"
                icon="ellipsis-h"></b-icon>
          </button>
          <b-dropdown-item has-link>
            <router-link :to="{name: 'domains'}">Domain List</router-link>
          </b-dropdown-item>
          <b-dropdown-item has-link>
            <router-link :to="{name: 'highlight-color'}">Highlight Color</router-link>
          </b-dropdown-item>
          <b-dropdown-item custom>
            <span>Dark Mode:</span>
            <b-switch
              style="margin-left: 1rem;"
              type="is-primary"></b-switch>              
          </b-dropdown-item>
          <hr class="dropdown-divider">
          <b-dropdown-item custom>
            <strong class="has-text-primary">Version:</strong> <strong>{{ getVersion() }}</strong>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start"></div>
      <div class="navbar-end"></div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    getVersion () {
      try {
        return browser.runtime.getManifest().version;
      } catch (e) {
        return "Testing..." // replace with a different error handling string
      }
    }
  }
};
</script>

<style scoped>
#back-button {
  position: absolute;
  top: 0;
  left: 0;
}

</style>
