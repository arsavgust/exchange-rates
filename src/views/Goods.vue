<template>
<div class="container">
  <div class="categories">
    <template
      v-for="category in categoriesList"
    >
      <CollapseComponent
        v-if="getPriceGroupById(category.id).length"
        :key="category.id"
      >
        <template v-slot:panel>
          <Panel :name="`category-${ category.id }`" class="panel">
            {{ category.G }}
            <div slot="content" class="goods-group">
              <GoodsItem
                v-for="price in getPriceGroupById(category.id)"
                :key="`${price.T}`"
                :title="getGoodsByPrice(category.B, price.T).N"
                :id="price.T"
                :cost="price.C"
                :quantity="price.P"
              ></GoodsItem>
            </div>
          </Panel>
        </template>
      </CollapseComponent>
    </template>
  </div>
  <Cart></Cart>
</div>
</template>

<script>
import CollapseComponent from '@/components/CollapseComponent.vue';
import GoodsItem from '@/components/GoodsItem.vue';
import Cart from '@/components/Cart.vue';

import pricesData from '@/data-files/data.json';
import categoriesData from '@/data-files/names.json';

export default {
  name: 'Goods',
  components: {
    GoodsItem,
    CollapseComponent,
    Cart,
  },
  data() {
    return {
      pricesList: pricesData.Value.Goods,
      categoriesList: this.getListFromObj(categoriesData),
      pricesBlock: '',
    };
  },
  timers: {
    // метод, который будет каждый 15 секунд менять курс доллара к рублю
    setDollarRate: {
      time: 15000,
      autostart: true,
      repeat: true,
    },
  },
  methods: {
    // получаем рандомное значение курса доллара для иммитации
    getRandomArbitrary: (min, max) => Math.random() * (max - min) + min,

    // иммитируем получение нового значения курса доллара
    setDollarRate() {
      const val = this.getRandomArbitrary(20, 80);

      this.$store.commit('setDollarRate', val);
    },

    // получение списка цен для категории товаров
    getPriceGroupById(id) {
      return this.pricesList.filter((el) => +el.G === +id);
    },

    // получение товара по id из файла цен
    getGoodsByPrice(goods, id) {
      return this.getListFromObj(goods).find((el) => +el.id === +id);
    },

    // получение массива для перебора из объекта
    getListFromObj: (obj) => Object.entries(obj)
      .reduce((acc, [key, value]) => {
        Object.assign(value, { id: key });
        acc.push(value);

        return acc;
      }, []),
  },
};
</script>

<style scoped>
.goods-group > div:hover {
  box-shadow:
    0px -2px 6px 2px rgb(60 64 67 / 10%),
    0px -1px 2px rgb(60 64 67 / 20%),
    0px 4px 7px -3px rgb(0 0 0 / 30%),
    0px 6px 12px -2px rgb(50 50 93 / 25%);
}
.goods-group >>> .container:last-child {
  margin-bottom: 0;
}
.container {
  display: flex;
}
.categories {
  width: 100%;
}
</style>
