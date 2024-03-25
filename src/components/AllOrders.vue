<template>
  <div class="null-order"
       v-if="!isTheCartHaving">
    <van-image :src="nullImage" height="130" width="180"/>
    <span>近一年没有下单</span>
    <van-button round type="primary" style="margin-top: 3vh;padding: 0 8vw; height: 5vh;"
                @click="this.$router.push('/home')">去下单
    </van-button>
  </div>
  <div v-else>
    <van-cell-group style="width: 90%;margin-top: 2vh;" inset>
      <van-cell>
        <h4>订单</h4>
      </van-cell>
      <template v-for="(shop,i) in $store.state.the_order">

        <van-cell
          v-if="isThisHas(shop)">
          <van-row style="width: 100%" type="flex" justify="space-between" align="center">
            <van-image :src="`/images/shops/${shop.shop.id-1}.png`" height="60"
                       style="border-radius: 10px;overflow: hidden"/>
            <span>{{ shop.shop.name }}</span>
            <span>¥{{ getSin(shop) }}</span>
          </van-row>
        </van-cell>
      </template>
      <van-cell>
        合计：
        <span style="font-size: 18px;color: red;">
          ¥{{ getTotalMoney }}
        </span>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'AllOrders',
  data () {
    return {
      nullImage: require('../../src/assets/images/null.png')
    }
  },
  methods:{
    isThisHas (shop) {
      // console.log(shop)
      for (let i = 0; i < shop.foods.length; ++i) {
        if (shop.foods[i].count > 0) {
          return true
        }
      }
      return false
    },
    getSin (shop) {
      let res = 0.0
      let b=false
      for (let i = 0; i < shop.foods.length; ++i) {
        if (shop.foods[i].count > 0) {
          b=true
          res += shop.foods[i].count * parseFloat(shop.foods[i].food.pinyin_name)
        }
      }
      if(b){
        res+=shop.shop.float_delivery_fee
      }
      return res.toFixed(2)
    }
  },
  computed: {
    getTotalMoney () {
      if (this.$store.state.the_order.length <= 0) {
        return 0;
      }
      let res = 0.0
      for (let i = 0; i < this.$store.state.the_order.length; i++) {
        let b = false
        for (let j = 0; j < this.$store.state.the_order[i].foods.length; ++j) {
          if (this.$store.state.the_order[i].foods[j].count > 0) {
            b = true
            res += this.$store.state.the_order[i].foods[j].count * parseFloat(this.$store.state.the_order[i].foods[j].food.pinyin_name)
          }
        }
        if (b) {
          res += this.$store.state.the_order[i].shop.float_delivery_fee
        }
      }
      return res.toFixed(2)
    },
    isTheCartHaving () {
      if (this.$store.state.the_order.length <= 0) {
        return false
      } else {
        let noe = []
        for (let i = 0; i < this.$store.state.the_order.length; ++i) {
          if (this.$store.state.the_order[i].foods.length != 0) {
            let b = false
            for (let j = 0; j < this.$store.state.the_order[i].foods.length; ++j) {
              if (this.$store.state.the_order[i].foods[j].count > 0) {
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
    }
  }
}
</script>

<style scoped lang="less">
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
