<template>
<div class="container">
  <div>
    <div class="title">{{ title }}</div>
    <div class="quantity" :class="isEnding">
      (В наличии: {{ quantity }} шт.)
    </div>
  </div>
  <div class="price-block">
    <div
      class="price"
      :class="containerColorClass"
    >
      {{ costValue }} ₽/шт.
      <Button @click="addGoods">В корзину</Button>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GoodsItem',
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
    cost: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      oldCost: 0,
      containerColorClass: '',
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
    isEnding() {
      return this.quantity > 3 ? 'green' : 'red';
    },
  },
  watch: {
    costValue(val) {
      if (this.oldCost > val) {
        this.oldCost = val;
        this.containerColorClass = 'green';
      } else if (this.oldCost < val) {
        this.oldCost = val;
        this.containerColorClass = 'red';
      } else {
        this.containerColorClass = '';
      }
    },
  },
  methods: {
    // добавление позиции товара в корзину, при желании можно вынести во vuex,
    // или оставить тут, чтобы лишний раз не дергать стор
    addGoods() {
      const list = this.$utils.clone(this.cartList);
      const currentGoods = list.find((el) => el.id === this.id);

      if (!currentGoods) {
        list.push({
          id: this.id,
          title: this.title,
          quantity: 1,
          maxQuantity: this.quantity,
          cost: this.cost,
        });

        this.$store.commit('setCartList', list);
      }
    },
  },
  beforeMount() {
    this.oldCost = this.costValue;
  },
};
</script>

<style scoped>
.container > div {
  width: 100%;
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  padding: 8px;
  margin-bottom: 10px;
}
.price-block {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
}
.quantity, .title {
  width: 100%;
  text-align: left;

}
.price {
  padding: 6px;
}
.price.red {
  background: lightpink;
}
.price.green {
  background: lightgreen;
}
.quantity.green {
  color: green;
}
.quantity.red {
  color: red;
}
</style>
