import Vue from 'vue';

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import locale from 'view-design/dist/locale/ru-RU';

import VueTimers from 'vue-timers';
import vueGlobalServices from '@/global/vueGlobalServices';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ViewUI, { locale });
Vue.use(VueTimers);

vueGlobalServices(Vue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
