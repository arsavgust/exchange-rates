import Vue from 'vue';
import VueRouter from 'vue-router';
import Goods from '@/views/Goods.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Goods',
    component: Goods,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
