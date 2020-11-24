<template>
<div class="cart-container" v-if="cartList.length">
  <div v-for="cartItem in cartList" :key="cartItem.id">
    <CartItem
      :title="cartItem.title"
      :id="cartItem.id"
      :cost="cartItem.cost"
      :quantity="cartItem.quantity"
      :max-quantity="cartItem.maxQuantity"
    ></CartItem>
  </div>
  <div class="sum">
    Общая стоимость: {{ amount }} ₽
  </div>
</div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Cart',
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters({
      dollarRate: 'getDollarRate',
      cartList: 'getCartList',
    }),
    amount() {
      const amount = this.cartList.reduce((acc, el) => {
        let sum = acc;
        sum += el.cost * el.quantity * this.dollarRate;

        return sum;
      }, 0);

      return Math.round(amount * 100) / 100;
    },
  },
};
</script>

<style scoped>
.cart-container {
  width: 100%;
  display: block;
  padding: 0 20px;
}
.sum {
  margin-top: 20px;
}
</style>
