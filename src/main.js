/* eslint-disable */
import '@babel/polyfill';
import 'es6-promise/auto';

import 'roboto-fontface/css/roboto/roboto-fontface.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
