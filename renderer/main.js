import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './theme/index.less';
import messageService from 'vue-update-message';

Vue.config.productionTip = false
Vue.use(messageService);

new Vue({
  router,
  store,
  data: {
    fishpi: null,
    key: '',
    info: JSON.parse(localStorage.getItem('lastInfo') || 'null'),
    cookies: JSON.parse(localStorage.getItem("cks") ||'{}')
  },
  mounted() {

  },
  render: h => h(App)
}).$mount('#app')
