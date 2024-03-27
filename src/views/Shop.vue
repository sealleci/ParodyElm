<template>
  <div style="width: 100%;" v-if="!ready">
    <van-loading color="#0094ff" vertical style="margin:2vh 0;">
      加载中……
    </van-loading>
  </div>
  <div v-else style="width: 100%;height: fit-content;" class="big-bg">
    <van-row type="flex" justify="space-between" align="center" style="position: fixed;top: 0px;width: 100vw;
              background-color: transparent;height: 40px;
              z-index: 100;" class="shop-header">
      <van-col span="16" style="cursor:pointer;display: flex;align-items: center">
        <van-image :src="!isShopS ? backToImageW : backToImage" height="30" @click="toHome" />
        <van-search v-model="value" shape="round" background="transparent" placeholder="想吃什么搜一搜" v-show="isShopS" />
      </van-col>
      <van-col span="8" style="display: flex;justify-content: space-around;">
        <van-image :src="!isShopS ? searchImageW : searchImage" height="30" />
        <van-image :src="!isShopS ? heartImageW : heartImage" height="30" />
        <van-image :src="!isShopS ? moreImageW : moreImage" height="30" />
      </van-col>
    </van-row>
    <div :style="`width:100%;height:15vh;background-color:${elmColor}; margin-bottom: 110px;`"></div>
    <van-cell-group inset style="width: 90vw;position: absolute;top: 60px;height: 150px;" class="my-shop-navi">
      <van-cell style="position: relative;">
        <div class="shop-name">{{ cur_shop.name }}</div>
        <van-image :src="`/images/shops/${cur_i}.png`" height="46"
          style="position: absolute; top: 0;border-radius: 10px;overflow: hidden;" />
        <div>蜂鸟快送约30分钟 月售{{ cur_shop.recent_order_num }}</div>
        <div class="gong-gao">{{ cur_shop.promotion_info }}</div>
        <van-row class="title-buff">
          <van-tag type="danger">
            0元补贴
          </van-tag>
          <van-tag plain type="danger">
            22减0
          </van-tag>
        </van-row>
        <div style="color: gray;position: relative;float: right">
          5个优惠
          <van-image :src="downImage" height="16" />
        </div>
      </van-cell>
    </van-cell-group>
    <van-tabs v-model="activeOrderPage" animated :color="elmColor" class="my-shop-s">
      <van-tab title="点餐" name="buy" style="min-height: 60vh;height: auto">
        <div style="width: 100%;" v-if="!ready2">
          <van-loading color="#0094ff" vertical style="margin:2vh 0;">
            加载中……
          </van-loading>
        </div>
        <van-tree-select v-else v-model:main-active-index="activeIndex" :items="items" @click-nav="changeRadius">
          <template #content>
            <template v-for="k in [0, 1, 2]" :key="k">
              <van-card v-for="(food, i) in cur_foods" :key="i" :price="parseFloat(food.pinyin_name).toFixed(2)"
                :desc="'月售 ' + food.month_sales" :title="food.name" :thumb="`/images/foods/${cur_i}/${i}.png`"
                class="food-item">
                <template #tags>
                  <van-tag plain type="danger">10折</van-tag>
                </template>
                <template #footer v-if="food.is_featured === 0">
                  <van-image :src="addImage" height="25" style="cursor: pointer;" @click="addCircle(food, i)" />
                </template>
                <template #footer v-else>
                  <van-button round type="primary" style="height:25px;font-size: 13px;position: relative;top: -2px;"
                    @click="showFunc();cur_pop=food;cur_lili=i;">
                    选规格
                  </van-button>
                </template>
              </van-card>
            </template>
          </template>
        </van-tree-select>
      </van-tab>
      <van-tab title="评价" name="comment">
        <van-cell-group inset style="width: 90%;margin-top: 2vh;">
          <van-cell class="ping-jia">
            <van-row type="flex" align="center" justify="space-between">
              <van-col class="main-rating">
                {{ cur_shop.rating.toFixed(1) }}
              </van-col>
              <van-col>
                <van-rate v-model="cur_shop.rating" readonly allow-half size="16" color="orange" />
              </van-col>
              <van-col class="up-down-info">
                <div>味道</div>
                <div>{{ cur_shop.rating.toFixed(1) }}</div>
              </van-col>
              <van-col class="up-down-info">
                <div>包装</div>
                <div>{{ cur_shop.rating.toFixed(1) }}</div>
              </van-col>
              <van-col class="up-down-info">
                <div>配送满意度</div>
                <div>{{ Math.round(cur_shop.rating / 5.0 * 100) }}%</div>
              </van-col>
            </van-row>
          </van-cell>
        </van-cell-group>
      </van-tab>
      <van-tab title="商家" name="shop-master">
        <van-cell-group inset style="margin-top: 2vh;">
          <van-cell>
            <van-row type="flex" justify="space-between">
              <van-col span="18">
                <div style="font-weight: bold;">
                  {{ cur_shop.name }}
                </div>
                <van-row type="flex" justify="space-between">
                  <van-col span="2" style="display: flex;align-items: center;">
                    <van-image :src="locImg" height="16" />
                  </van-col>
                  <van-col span="22" style="font-size: 13px;color: gray;line-height: 18px;">{{ cur_shop.address }}
                  </van-col>
                </van-row>
              </van-col>
              <van-col span="4" style="display: flex;align-items: center;justify-content: center;">
                <van-image :src="telImg" height="30" />
              </van-col>
            </van-row>
            <van-row style="display: flex;flex-direction: column;margin-top: 1.5vh;">
              <div style="font-weight: bold;">商家信息</div>
              <div style="color: gray;font-size: 13px;">商家品类：食品快餐</div>
              <div style="color: gray;font-size: 13px;">营业时间：{{ cur_shop.opening_hours[0].replace('/', '-') }}</div>
            </van-row>
            <van-row style="display: flex;flex-direction: column;margin-top: 1.5vh;">
              <div style="font-weight: bold;">商家服务</div>
              <div style="color: gray;font-size: 13px;">该商户已购买食品安全责任险，食品安全有保证</div>
            </van-row>
            <van-row type="flex" justify="center" style="margin-top: 1.5vh;">
              <van-tag plain round style="padding: 4px 10px;font-size: 13px;">
                查看本店食品安全信息
              </van-tag>
            </van-row>
          </van-cell>
        </van-cell-group>
        <van-row type="flex" justify="center">
          <van-button round style="width: 90vw;margin-top: 2vh;color: gray;">
            举报商家
          </van-button>
        </van-row>
      </van-tab>
    </van-tabs>
    <van-popup v-model:show="show_popup" round position="bottom" closeable :style="{ height: '80%' }" class="gui-ge">
      <van-card :price="cur_pop != null ? parseFloat(cur_pop.pinyin_name).toFixed(2) : 0.0"
        :desc="'已选：' + (mala_opt === 0 ? '麻辣' : mala_opt === 1 ? '不辣' : mala_opt === 2 ? '微辣' : '')"
        :title="cur_pop != null ? cur_pop.name : ''" :thumb="`/images/foods/${cur_i}/${cur_lili}.png`"
        class="pop-head" />
      <van-row type="flex" justify="center" style="width: 100vw;">
        <div style="width: 90%;
        background-color: #f0f0f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 5px;
        padding:5px 0;
        font-size: 12px;
         color: gray;">
          <van-col style="display: flex;align-items: center;margin-left: 10px;">
            <van-image :src="commentImage" height="16" />
            {{ cur_pop.satisfy_count }}人评价“好吃”
          </van-col>
          <van-col style="display: flex;align-items: center;margin-right: 10px;">
            全部({{ cur_pop.rating_count }})
            <van-image :src="rightImage" height="16" />
          </van-col>
        </div>
      </van-row>
      <van-row type="flex" justify="space-between" style="margin-top: 2vh;">
        <van-col style="margin-left: 5vw;font-weight: bold;">
          数量
        </van-col>
        <van-col style="margin-right: 5vw;">
          <van-stepper v-model="cur_list.foods[cur_lili].t_count" min="0" />
        </van-col>
      </van-row>
      <van-row style="margin-top: 2vh;display: flex;flex-direction: column;align-items: flex-start;">
        <div style="margin-left: 5vw;font-weight: bold;">麻辣度
        </div>
        <div class="mala">
          <van-tag @click="clickOpt(0)" :class="mala_opt === 0 ? 'click-mala' : ''">麻辣</van-tag>
          <van-tag @click="clickOpt(1)" :class="mala_opt === 1 ? 'click-mala' : ''">不辣</van-tag>
          <van-tag @click="clickOpt(2)" :class="mala_opt === 2 ? 'click-mala' : ''">微辣</van-tag>
        </div>
      </van-row>
      <van-row style="position: absolute; bottom: 2vh;width: 100vw;" type="flex" justify="center">
        <van-button type="primary" round style="width: 90vw;"
          @click="addGuige(cur_pop, cur_lili); show_popup = false;">加入购物车
        </van-button>
      </van-row>
    </van-popup>
    <van-row type="flex" align="center" justify="space-between"
      style="height:70px;width: 100%;position: fixed;top: 92vh;background-color: white;">
      <van-col style="display: flex;align-items: center;margin-left: 10px;">
        <van-image :src="!isHaving ? grayBoxImage : blueBoxImage" height="65" style="position: relative;top:-5px;" />
        <div style="display: flex;flex-direction: column;align-items: flex-start;">
          <div style="font-weight: bold;">
            <span>¥</span>
            <span style="font-size: 22px;margin-left:3px;">
              {{ getTotal }}
            </span>
          </div>
          <div style="color: gray;font-size:13px;">另需配送费¥{{ cur_shop.float_delivery_fee }}</div>
        </div>
      </van-col>
      <van-col style="margin-right: 10px;">
        <van-button round type="primary" :disabled="!isHaving || !isLoginin" style="width: 28vw;height: 40px;"
          @click="sendOrder">
          {{ !isHaving ? '¥0起送' : '去结算' }}
        </van-button>
      </van-col>
    </van-row>
    <!--    <van-row-->
    <!--      style="height: 80vh;"></van-row>-->
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "Shop",
  setup() {
    const activeIndex = ref(0)
    const show_popup = ref(false)
    const showFunc = (food) => {
      show_popup.value = true;
    };
    return {
      activeIndex,
      show_popup,
      showFunc,
      items: [{ text: '刚刚看过' },
      { text: '热销' },
      { text: '特色招牌' },
      { text: '美味系列' },
      { text: '特色双拼' },
      { text: '口味' },
      { text: '单加' },
      { text: '饮料' }
      ]
    }
  },
  mounted() {
  },
  activated() {
    this.cur_i = this.$store.state.cur_shop.i
    this.cur_shop = this.$store.state.cur_shop.shop
    // console.log(this.cur_shop)
    if (this.cur_shop !== undefined) {
      this.ready = true
      this.getFood()
    } else {
      this.ready = false
    }

    document.querySelector('#elm-nav').style.display = 'none'
    document.querySelector('#elm-page-body').style.height = '100vh'
    document
      .querySelector('#elm-page-body').scrollTop = 0
  },
  computed: {
    isLoginin() {
      return this.$store.state.userInfo !== null
    },
    isShopS() {
      return this.$store.state.shopHeader
    },
    getTotal() {
      if (this.cur_list.foods.length <= 0) {
        return 0;
      }
      // console.log(this.cur_list.foods)

      return (this.cur_list.foods.reduce((x, y) => x.count * parseFloat(x.food.pinyin_name) + y.count * parseFloat(y.food.pinyin_name))).toFixed(2)
    },
    isHaving() {
      if (this.cur_list.foods.length <= 0) {
        return false;
      }
      return this.cur_list.foods.reduce((x, y) => x.count + y.count) > 0
    }
  },
  data() {
    return {
      cur_list: {
        rid: 0,
        foods: []
      },
      ready: false,
      ready2: false,
      cur_pop: null,
      cur_lili: 0,
      cur_shop: undefined,
      cur_i: 0,
      blueBoxImg: new URL('../assets/images/cart_icon_not_empty_delivery_v2.png', import.meta.url).href,
      telImg: new URL('../assets/images/od_detail_icon_tel_shop_v2.png', import.meta.url).href,
      locImg: new URL('../assets/images/address_position_icon.png', import.meta.url).href,
      nullImage: new URL('../assets/images/null.png', import.meta.url).href,
      addImage: new URL('../assets/images/bk_food_button_add.png', import.meta.url).href,
      grayBoxImage: new URL('../assets/images/cart_icon_empty_delivery_v2.png', import.meta.url).href,
      blueBoxImage: new URL('../assets/images/cart_icon_not_empty_delivery_v2.png', import.meta.url).href,
      defaultImage: new URL('../assets/images/od_logo_default_rect_round.png', import.meta.url).href,
      downImage: new URL('../assets/images/cart_icon_down_arrow_t2.png', import.meta.url).href,
      backToImage: new URL('../assets/images/spd_pageback_dark_v.png', import.meta.url).href,
      searchImage: new URL('../assets/images/spd_search.png', import.meta.url).href,
      heartImage: new URL('../assets/images/spd_collect_heart_dark.png', import.meta.url).href,
      moreImage: new URL('../assets/images/spd_more_dark_v.png', import.meta.url).href,
      backToImageW: new URL('../assets/images/spd_pageback_light_v.png', import.meta.url).href,
      searchImageW: new URL('../assets/images/spd_search_light_v.png', import.meta.url).href,
      heartImageW: new URL('../assets/images/spd2_collect_heart_light.png', import.meta.url).href,
      moreImageW: new URL('../assets/images/spd2_more_light_v.png', import.meta.url).href,
      defaultFoodImage: new URL('../assets/images/cart_recommend_default_food_big.png', import.meta.url).href,
      commentImage: new URL('../assets/images/mist_life_delicious_icon_message.png', import.meta.url).href,
      rightImage: new URL('../assets/images/ap_little_arrow_right_gray.png', import.meta.url).href,
      elmColor: '#02B6FD',
      activeOrderPage: 1,
      mala_opt: -1,
      cur_foods: [],
    }
  },
  methods: {
    sendOrder() {
      if (this.$store.state.the_cart.length >= this.cur_shop.id) {
        Object.assign(this.$store.state.the_cart[this.cur_shop.id - 1].foods, this.cur_list.foods)
        // this.$store.state.the_cart[this.cur_shop.id - 1].foods = this.cur_list.foods
      }
      this.$router.push('/cart')
    },
    addCircle(p, i) {
      this.cur_list.foods[i].count += 1
    },
    addGuige(p, i) {
      let tc = this.cur_list.foods[i].t_count
      this.cur_list.foods[i].t_count = 0
      this.cur_list.foods[i].count += tc
    },
    getFood() {
      this.$axios.get('/apis/shopping/v2/foods', {
        params: { restaurant_id: this.cur_shop.id }
      }).then((resp) => {
        this.cur_foods = resp.data
        this.cur_list.rid = this.cur_shop.id
        this.cur_list.foods = resp.data.map(x => ({
          food: x,
          count: 0,
          t_count: 0
        }))
        // console.log(this.$store.state.the_cart[this.cur_shop.id - 1].foods)
        if (this.$store.state.the_cart.length >= this.cur_shop.id &&
          this.$store.state.the_cart[this.cur_shop.id - 1].foods.length > 0) {
          Object.assign(this.cur_list.foods, this.$store.state.the_cart[this.cur_shop.id - 1].foods)
        }
        this.ready2 = true
      })
    },
    clickOpt(n) {
      this.mala_opt = n
    },
    toHome() {
      this.$router.push('/home')
      document.querySelector('#elm-nav').style.display = 'flex'
      document.querySelector('#elm-page-body').style.height = '90vh'
    },
    changeRadius(index) {
      // console.log(index)
      Array.from(document.querySelectorAll('.van-tree-select .van-sidebar-item'))
        .forEach(e => {
          e.style.borderRadius = '0'
        })
      if (index > 0) {

        document.querySelector(`.van-tree-select .van-sidebar-item:nth-child(${index})`)
          .style.borderRadius = '0 0 15px 0'
      }
    }
  }
}
</script>

<style scoped lang="less">
@side-color: #e9e9e9;
@home-bg-bottom-color: #f5f5f5;
@tree-height: 60vh;
@elm-color: #02b6fd;
@light-blue-color: #F4FCFF;

.border {
  border: 1px solid red;
}

.text-overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.ping-jia {
  color: gray;

  .main-rating {
    color: orange;
    font-size: 24px;
    font-weight: bold;
  }

  .up-down-info {
    color: gray;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;

    div:last-child {
      font-weight: bold;
      color: black;
      font-size: 16px;
      font-family: Arial;
    }
  }
}

.mala {
  margin-left: 5vw;
  margin-top: 15px;
  display: flex;
  width: 90vw;
  justify-content: space-between;

  :deep(.van-tag) {
    height: 40px;
    width: 23vw;
    display: flex;
    justify-content: center;
    font-size: 14px;
    background-color: #f2f2f2;
    color: black;
    cursor: pointer;
    border-radius: 5px;

    &.click-mala {
      color: @elm-color;
      border: 1px solid @elm-color;
      background-color: @light-blue-color;
    }
  }
}

.pop-head {
  position: relative;
  background-color: transparent;
  margin-top: 1vh;

  :deep(.van-card__content) {
    align-items: flex-start;

    & div {
      text-align: left;
    }
  }

  :deep(.van-card__title) {
    font-weight: bold;
    font-size: 16px;
  }

  :deep(.van-card__price) {
    color: red;
    font-weight: bold;
    font-size: 24px;

    & .van-card__price-currency {
      font-size: 16px;
    }

    & .van-card__price-integer,
    & .van-card__price-decimal {
      font-size: 24px;
    }
  }

  :deep(.van-card__footer) {
    position: absolute;
    bottom: 5px;
    right: 20px;
  }
}

:deep(.van-tabs__wrap) {
  z-index: 100;
  position: sticky;
  top: 40px;
  padding-bottom: 5px;
}

.title-buff {
  width: 75vw;

  .van-tag {
    margin-right: 5px;
    margin-bottom: 5px;
  }
}

.big-bg {
  background: linear-gradient(to bottom, @home-bg-bottom-color, white 26%, @home-bg-bottom-color 30%);
}

.gong-gao {
  display: inline-block;
  color: gray;
  width: 70vw;
  .text-overflow();
}

.shop-name {
  display: inline-block;
  font-weight: bold;
  font-size: 18px;
  width: 65vw;
  .text-overflow();
}

.food-item {
  position: relative;
  margin-top: 2vh;
  background-color: white;

  &:last-child {
    margin-bottom: 70px;
  }

  :deep(.van-card__content) {
    align-items: flex-start;

    & div {
      text-align: left;
    }
  }

  :deep(.van-card__title) {
    font-weight: bold;
    font-size: 14px;
  }

  :deep(.van-card__price) {
    color: red;
    font-weight: bold;
  }

  :deep(.van-card__footer) {
    position: absolute;
    bottom: 5px;
    right: 20px;
  }
}

.van-tree-select {
  height: fit-content !important;

  :deep(.van-sidebar) {
    background-color: white;
    flex-grow: 2;
    min-height: @tree-height;

    .van-sidebar-item:last-child {
      &::after {
        content: '';
        display: inline-block;
        background-color: @side-color;
        width: 100%;
        height: 155px;
        margin-top: 15px;
      }
    }

    .van-sidebar-item {
      background-color: @side-color;
      color: #555;
      padding: 20px 0;
      height: fit-content;

      &::before {
        content: none;
      }

      &.van-sidebar-item--select {
        color: black;
        font-weight: bold;
        background-color: white;

        &+a {
          border-radius: 0 15px 0 0 !important;
        }
      }
    }
  }

  :deep(.van-tree-select__content) {
    flex-grow: 6;
    //min-height: @tree-height;
    //overflow: scroll;
    max-height: 90vh;
  }
}

.order-select-bar {
  z-index: 100;
  position: sticky;
  top: 7vh;
  width: 100vw;

  :deep(.van-tabs) {
    background-color: transparent;
    height: 5vh;

    .van-tabs__nav {
      padding-left: 0;
      background-color: transparent;

      .van-tab {
        font-size: 16px;
        margin: 0 4px;

        &.van-tab--active {
          font-weight: bold;
        }
      }

      .van-tabs__line {
        width: 22px;
        height: 4px;
        bottom: 19px;
      }
    }
  }
}
</style>
