import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dollarRate: 80,
    cartList: [],
  },
  mutations: {
    setDollarRate(state, newRate) {
      state.dollarRate = newRate;
    },
    setCartList(state, newList) {
      state.cartList = newList;
    },
  },
  getters: {
    getDollarRate: (state) => state.dollarRate,
    getCartList: (state) => state.cartList,
  },
});
