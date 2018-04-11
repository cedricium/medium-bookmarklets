<template>
  <nav class="navbar is-primary">
    <div class="navbar-brand is-pulled-right">
      <div class="navbar-item">
        <b-dropdown>
          <button class="button is-primary" slot="trigger">
              <b-icon
                pack="fas"
                icon="ellipsis-h"></b-icon>
          </button>
          <b-dropdown-item>Domain List</b-dropdown-item>
          <b-dropdown-item>Highlight Color</b-dropdown-item>
          <b-dropdown-item custom>
            <span>Dark Mode:</span>
            <b-switch
              style="margin-left: 1rem;"
              type="is-primary"></b-switch>              
          </b-dropdown-item>
          <hr class="dropdown-divider">
          <b-dropdown-item custom>
            <strong class="has-text-primary">Version:</strong> <strong>2.1.1</strong>
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
};
</script>

<style>

</style>
