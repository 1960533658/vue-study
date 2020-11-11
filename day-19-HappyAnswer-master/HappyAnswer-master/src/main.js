import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import store from './store';
import ajax from './asserts/js/ajax';

import './asserts/css/common.scss';
import './asserts/js/rem'


const app = new Vue({ // eslint-disable-line no-new
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')