<template>
<div class="cart-item-container">
  <div class="title">{{ title }}</div>
  <div class="quantity">
      <Input v-model="quantityValue" @on-blur="setAndValidateValue" />
  </div>
  <div class="price">
    {{ costValue }} ₽/шт.
  </div>
  <div class="delete">
    <button @click="removeGoods">Удалить</button>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartItem',
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    maxQuantity: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      quantityValue: this.quantity,
    };
  },
  computed: {
    ...mapGetters({
      dollarRate: 'getDollarRate',
      cartList: 'getCartList',
    }),
    costValue() {
      // можно использовать toFixed(2) но мне больше нравится такой способ
      return Math.round(this.dollarRate * this.cost * 100) / 100;
    },
  },
  methods: {
    // проверяем валидность введенного значения и коммитим новые данные во vuex
    setAndValidateValue() {
      if (!+this.quantityValue || +this.quantityValue < 1) {
        this.quantityValue = 1;
      }

      if (this.quantityValue > this.maxQuantity) {
        this.quantityValue = this.maxQuantity;
      }

      const list = this.$utils.clone(this.cartList);
      const currentGoods = list.find((el) => el.id === this.id);

      currentGoods.quantity = +this.quantityValue;
      this.$store.commit('setCartList', list);
    },

    // Удаление товара, при желании можно вынести во vuex,
    // или оставить тут, чтобы лишний раз не дергать стор
    removeGoods() {
      const list = this.$utils.clone(this.cartList);
      const currentGoodsIndex = list.findIndex((el) => el.id === this.id);

      if (currentGoodsIndex >= 0) {
        list.splice(currentGoodsIndex, 1);

        this.$store.commit('setCartList', list);
      }
    },
  },
};
</script>

<style scoped>
.cart-item-container div.title {
  width: 50%;
}
.quantity {
  width: 10%;
}
.price {
  width: 22%;
}
.delete button {
  background: none;
  border: none;
  color: orangered;
  cursor: pointer;
  outline: none;
}
.delete {
  width: 10%;
}
.cart-item-container div {
  margin: 6px;
}
.cart-item-container:hover {
  box-shadow:
    0 0 0 0 rgb(0 0 0 / 10%),
    0 0 0 rgb(0 0 0 / 20%),
    0 7px 7px -3px rgb(0 0 0 / 30%),
    0 6px 12px -2px rgb(50 50 93 / 25%)
}
.cart-item-container {
  padding: 0 10px;
  border-radius: 0 0 5% 5%;
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid black;
}
</style>
