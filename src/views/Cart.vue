<template>
  <div style="width:100%;height: 100vh;">
    <van-row type="flex" justify="space-between" align="center"
             :style="`position: sticky;top:0vh;background-color: ${backColor};z-index:100;height:6vh;`">
      <van-col @click="backToPage" span="4">
        <van-image :src="backImage" height="32" width="32" style="cursor: pointer;"/>
      </van-col>
      <van-col span="10" style="font-size: 20px;">
        购物车
      </van-col>
      <van-col span="4">
        清空
      </van-col>
    </van-row>
    <div class="null-order" v-if="!isTheCartHaving">
      <van-image :src="nullImage" height="130" width="180"/>
      <span>没有可结算的商品</span>
    </div>
    <template v-if="isTheCartHaving">
      <van-row class="cart-list">
        <van-cell-group inset class="cart-item"
                        v-for="(shop,i) in myCart" :key="i">
          <van-cell class="item-head" style="background-color: #FAFAFA;box-sizing: content-box;">
            <van-checkbox-group v-model="itemTotal">
              <van-checkbox :name="(shop.shop.id-1).toString()"
                            label-disabled>
                <van-row>
                  <van-col>
                  <span class="item-total-name">
                    {{ shop.shop.name }}
                  </span>
                  </van-col>
                  <van-col
                    style="width: 40vw;display: flex;align-items: center;position: relative;top:-2px;left:10px; justify-content: space-between;">
                    <van-image :src="lilBackImage" height="12"/>
                    <span style="color: gray;font-size: 12px;">
                    月售{{ shop.shop.recent_order_num }} 30分钟
                  </span>
                    <van-image :src="trashImage" height="14" style="cursor:pointer;"/>
                  </van-col>
                </van-row>
              </van-checkbox>
            </van-checkbox-group>
            <van-row class="buff-bar">
              <van-tag color="red">10折</van-tag>
              <van-tag color="red" plain>20减0</van-tag>
            </van-row>
          </van-cell>
          <van-cell class="item-body">
            <van-checkbox-group v-model="itemSingle[shop.shop.id-1]">
              <template v-for="(food,j) in shop.foods"
                        :key="j">
                <van-checkbox :name="j.toString()" v-if="food.count>0" label-disabled>
                  <van-row style="position: relative;width: 75vw;" type="flex" align="center">
                    <van-col style="margin-right: 10px;">
                      <van-image :src="`/images/foods/${shop.shop.id-1}/${j}.png`" height="65"
                                 style="overflow: hidden;border-radius: 10px;"/>
                    </van-col>
                    <van-col>
                      <div style="font-size: 13px;font-weight: bold;">
                        {{ food.food.name }}
                      </div>
                      <div style="font-size: 13px;color:gray;">
                        美味
                      </div>
                      <div style="font-size: 13px;font-weight: bold;">
                        ¥{{ (parseFloat(food.food.pinyin_name) * food.count).toFixed(2) }}
                      </div>
                    </van-col>
                    <van-col style="position: absolute;top:40px;left: 170px;">
                      <van-stepper v-model="$store.state.the_cart[shop.shop.id-1].foods[j].count" min="0" @click.stop/>
                    </van-col>
                  </van-row>
                </van-checkbox>
              </template>
            </van-checkbox-group>
          </van-cell>
          <van-cell>
            <van-button round color="lightgray" style="float: right;height: 36px;width: 25vw;">去结算</van-button>
          </van-cell>
        </van-cell-group>
      </van-row>
      <van-row type="flex" justify="space-between" align="center" class="cart-footer">
        <van-col span="4">
          <van-checkbox style="font-size: 12px;width: 90%;align-items: flex-start;"
                        v-model="checked"
          >全选
          </van-checkbox>
        </van-col>
        <van-col style="font-size:13px;" v-show="isTheCartHaving">
          合计：
          <span style="color: red;">¥</span>
          <span style="color: red;font-size: 18px;">{{ getTotalMoney }}</span>
        </van-col>
        <van-col span="6">
          <van-button round :color="!isTheCartHaving?'lightgray':'dodgerblue'"
                      :disabled="!isTheCartHaving"
                      style="float: right;height: 36px;width: 30vw;"
                      @click="sendDB"
          >一键结算
          </van-button>
        </van-col>
      </van-row>
    </template>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {ref} from "vue";

export default {
  name: "Cart",
  setup () {
    const checked = ref(false)
    return {
      checked
    }
  },
  data () {
    return {
      itemTotal: ref(this.$store.state.the_cart.map((x, i) => i.toString())),
      itemSingle: ref(this.$store.state.the_cart.map(x => (x.foods.length > 0 ? x.foods.filter(k => k.count > 0).map((y, j) => j.toString()) : []))),
      showMoveDot: [], //控制下落的小圆点显示隐藏
      backColor: '#f5f5f5',
      backImage: require('../assets/images/ic_back.png'),
      lilBackImage: require('../assets/images/ap_arrow_right_gray.png'),
      trashImage: require('../assets/images/ap_search_buttom_delete.png'),
      defaultImage: require('../assets/images/od_logo_default_rect_round.png'),
      nullImage: require('../../src/assets/images/null.png')
    }
  },
  activated () {
    document.querySelector('#elm-nav').style.display = 'none'
    document.querySelector('#elm-page-body').style.height = '100vh'
    this.itemTotal = ref(this.$store.state.the_cart.map((x, i) => i.toString()))
    this.itemSingle = ref(this.$store.state.the_cart.map(x => (x.foods.length > 0 ? x.foods.filter(k => k.count > 0).map((y, j) => j.toString()) : [])))
  },
  computed: {
    ...mapState([
      'cartList',
      'the_cart'
    ]),
    getTotalMoney () {
      if (this.$store.state.the_cart.length <= 0) {
        return 0;
      }
      let res = 0.0
      for (let i = 0; i < this.$store.state.the_cart.length; i++) {
        let b = false
        for (let j = 0; j < this.$store.state.the_cart[i].foods.length; ++j) {
          if (this.$store.state.the_cart[i].foods[j].count > 0) {
            b = true
            res += this.$store.state.the_cart[i].foods[j].count * parseFloat(this.$store.state.the_cart[i].foods[j].food.pinyin_name)
          }
        }
        if (b) {
          res += this.$store.state.the_cart[i].shop.float_delivery_fee
        }
      }
      return res.toFixed(2)
    },
    trueCart: {
      get () {
        return this.$store.state.the_cart
      },
      set (v) {
        this.$store.state.the_cart = v
      }
    },
    myCart () {
      let res = []
      for (let i = 0; i < this.the_cart.length; i++) {
        if (this.the_cart[i].foods.length > 0) {
          let b = false
          for (let j = 0; j < this.the_cart[i].foods.length; ++j) {
            if (this.the_cart[i].foods[j].count > 0) {
              b = true
            }
          }
          if (b) {
            res.push(this.the_cart[i])
          }
        }
      }
      return res
    },
    isTheCartHaving () {
      if (this.$store.state.the_cart.length <= 0) {
        return false
      } else {
        let noe = []
        for (let i = 0; i < this.$store.state.the_cart.length; ++i) {
          if (this.$store.state.the_cart[i].foods.length != 0) {
            let b = false
            for (let j = 0; j < this.$store.state.the_cart[i].foods.length; ++j) {
              if (this.$store.state.the_cart[i].foods[j].count > 0) {
                b = true
              }
            }
            if (b) {
              noe.push(i)
            }
          }
        }
        if (noe.length <= 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    /**
     * 监听cartList变化，更新当前商铺的购物车信息shopCart，同时返回一个新的对象
     */
    shopCart: function () {
      return Object.assign({}, this.cartList[this.shopId]);
    },
    //shopCart变化的时候重新计算当前商品的数量
    foodNum: function () {
      let category_id = this.foods.category_id;
      let item_id = this.foods.item_id;
      if (this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]) {
        let num = 0;
        Object.values(this.shopCart[category_id][item_id]).forEach((item, index) => {
          num += item.num;
        })
        return num;
      } else {
        return 0;
      }
    },
  },
  props: ['foods', 'shopId'],
  methods: {
    sendDB () {
      this.$store.state.the_order = this.$store.state.the_cart
      // this.$store.state.the_cart = []
      this.$router.push('/order')
    },
    backToPage () {
      this.$router.push('/home')
      document.querySelector('#elm-nav').style.display = 'flex'
      document.querySelector('#elm-page-body').style.height = '90vh'
    }
  },
}
</script>

<style scoped lang="less">
.text-overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.van-stepper {
  /deep/ .van-stepper__input {
    height: 22px;
    margin: 0;
  }

  /deep/ button:nth-child(1) {
    height: 22px;
    border-radius: 20px 0 0 20px;
  }

  /deep/ button:nth-child(3) {
    height: 22px;
    border-radius: 0 20px 20px 0;

  }
}

.cart-item {
  margin-bottom: 1.5vh;

  .item-total-name {
    display: inline-block;
    .text-overflow();
    width: 32vw;
    font-size: 14px;
    font-weight: bold;
  }

  .buff-bar {
    margin-left: 7vw;
    width: 70vw;

    .van-tag {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
}

.cart-footer {
  z-index: 100;
  position: sticky;
  height: 10vh;
  top: 90vh;
  width: 100%;
  background-color: white;

  .van-col {
    margin: 0 2vw;
  }
}

.cart-list {
  position: relative;
  top: 3vh;
  width: 100%;

  .van-cell-group {
    width: 90%;
  }
}

.null-order {
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    margin-top: 3vh;
    font-size: 16px;
  }
}
</style>
