// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

require('material-design-lite/material.min.css');
require('material-design-lite/material.min.js');

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaulIconPack: 'fa' // OR fas (solid), far (regular)
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
