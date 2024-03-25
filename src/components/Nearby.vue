<template>
  <div
    v-if="!ready">
    <van-loading color="#0094ff" vertical
                 style="margin:2vh 0;">
      加载中……
    </van-loading>
  </div>
  <template v-else>
    <div
      class="nearby-header">
      <van-dropdown-menu
        class="nearby-filter"
        z-index="5000"
        active-color="black"
      >
        <van-dropdown-item
          v-for="(title, i) in filterTitles"
          :key="i"
          :title="title"
          :v-model="filterVars[i]"
          :options="filterOptions[i]"
        />
      </van-dropdown-menu>
      <van-row
        class="check-box-row"
        type="flex"
        justify="space-around"
        align="center"
      >
        <van-tag
          v-for="(title, i) in checkBoxTitles"
          :key="i"
          v-model="checkBoxes[i]"
          color="white"
          text-color="black"
          @mouseup="toggleCheckBox(i)"
        >
          {{ title }}
        </van-tag>
      </van-row>
    </div>
    <van-row class="red-packet-prompt" type="flex" justify="center">
      <van-tag :text-color="redColor" :color="lightRedColor">
        <van-image :src="redPacketIcon" height="16" width="16" alt="red"/>
        你的14元补贴已到账，全场可用
      </van-tag>
    </van-row>
    <van-row class="food-list">
      <van-col span="24">
        <van-row
          class="food-card"
          v-for="(food, i) in dbShops"
          :key="i"
          type="flex"
          align="center"
          justify="space-around"
          @click="toShop(food,i)"
        >
          <van-col>
            <van-image
              :src="`/images/shops/${i}.png`"
              alt="food"
              height="110"
              width="110"
            />
          </van-col>
          <van-col span="13">
            <van-row type="flex" justify="space-between" align="center">
              <span>{{ food.name }} </span>
              <span></span>
            </van-row>
            <van-row type="flex" justify="space-between" align="center">
              <van-col span="18">
              <span>
                {{ food.rating + "分" }}
              </span>
                <span>
                {{ "月售" + food.recent_order_num }}
              </span>
              </van-col>
              <van-col>
              <span>
                {{ 30 + "分钟" }}
              </span>
              </van-col>
            </van-row>
            <van-row span="6">
              {{ "配送¥" + food.float_delivery_fee }}
            </van-row>
            <van-row>
              <van-col span="20">
                <van-tag :color="redColor" text-color="white">
                  {{ 0 + "元补贴" }}
                </van-tag>
                <van-tag plain :text-color="redColor">
                  {{ `${20}减${0}` }}
                </van-tag>
              </van-col>
              <van-col span="4"></van-col>
            </van-row>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </template>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Nearby',
  data () {
    return {
      redPacketIcon: require('../../src/assets/images/mist_sp_home_supermarket_red_packet.png'),
      defaultFoodImage: require('../../src/assets/images/cart_recommend_default_food_big.png'),
      redColor: '#F43C28',
      lightRedColor: '#FCE6D9',
      foodList: [
        {
          image: '',
          title: '甜遇丶小份菜',
          score: 4.8,
          sales: 3559,
          time: 59,
          tip: 0.3,
          perk: 16,
          prefer: [36, 13]
        },
        {
          image: '',
          title: '酥鲜森（圣克拉店）',
          score: 4.8,
          sales: 117,
          time: 30,
          tip: 4.2,
          perk: 16,
          prefer: [20, 5]
        },
        {
          image: '',
          title: '东北大馅饺子馆',
          score: 4.5,
          sales: 1305,
          time: 34,
          tip: 1.8,
          perk: 16,
          prefer: [22, 6]
        },
        {
          image: '',
          title: '大先生小碗菜（软件园区店）',
          score: 4.7,
          sales: 4820,
          time: 33,
          tip: 0,
          perk: 14,
          prefer: [25, 13]
        },
        {
          image: '',
          title: '老头盖浇饭（嗨食）',
          score: 4.7,
          sales: 210,
          time: 30,
          tip: 2.8,
          perk: 15,
          prefer: [10, 5]
        }
      ],
      checkBoxes: [
        0, 0, 0, 0
      ],
      checkBoxTitles: [
        '首单立减', '百亿补贴', '吃货联盟', '30分钟达'
      ],
      filterTitles: [
        '综合排序',
        '分类',
        '速度',
        '全部筛选'
      ],
      filterVars: [
        0, 0, 0, 0
      ],
      filterOptions: [
        [
          {
            text: '综合排序',
            value: 0
          },
          {
            text: '销量最高',
            value: 1
          },
          {
            text: '距离最近',
            value: 2
          },
          {
            text: '好评优选',
            value: 3
          },
          {
            text: '起送价最低',
            value: 4
          },
          {
            text: '配送最快',
            value: 5
          },
          {
            text: '配送费最低',
            value: 6
          },
          {
            text: '人均从低到高',
            value: 7
          },
          {
            text: '人均从高到低',
            value: 8
          },
          {
            text: '通用排序',
            value: 9
          }
        ],
        [
          {
            text: '全部分类',
            value: 0
          },
          {
            text: '快餐便当',
            value: 1
          },
          {
            text: '全球美食',
            value: 2
          },
          {
            text: '小吃/烧烤',
            value: 3
          },
          {
            text: '甜点饮品',
            value: 4
          },
          {
            text: '香锅火锅',
            value: 5
          },
          {
            text: '商店超市',
            value: 6
          },
          {
            text: '水果',
            value: 7
          },
          {
            text: '厨房生鲜',
            value: 8
          },
          {
            text: '鲜花绿植',
            value: 9
          },
          {
            text: '医药健康',
            value: 10
          }
        ],
        [
          {
            text: '30分钟内',
            value: 0
          },
          {
            text: '40分钟内',
            value: 1
          },
          {
            text: '50分钟内',
            value: 2
          },
          {
            text: '60分钟内',
            value: 3
          },
          {
            text: '1km内',
            value: 4
          },
          {
            text: '2km内',
            value: 5
          },
          {
            text: '3km内',
            value: 6
          },
          {
            text: '5km内',
            value: 7
          }
        ],
        [
          {
            text: '百亿补贴',
            value: 0
          },
          {
            text: '首次光顾立减',
            value: 1
          },
          {
            text: '满减优惠',
            value: 2
          },
          {
            text: '下单返红包',
            value: 3
          },
          {
            text: '配送费优惠',
            value: 4
          },
          {
            text: '赠品优惠',
            value: 5
          },
          {
            text: '特价商品',
            value: 6
          },
          {
            text: '店铺红包',
            value: 7
          },
          {
            text: '吃货联盟',
            value: 8
          },
          {
            text: '蓝骑士专送',
            value: 9
          },
          {
            text: '到店自取',
            value: 10
          },
          {
            text: '品牌商家',
            value: 11
          },
          {
            text: '新店',
            value: 12
          },
          {
            text: '接受预订',
            value: 13
          },
          {
            text: '食无忧',
            value: 14
          },
          {
            text: '开发票',
            value: 15
          },
          {
            text: '透明餐厅',
            value: 16
          }
        ]
      ],
      dbShops: [],
      ready: false
    }
  },
  mounted () {
    this.initData()
  },
  computed: {
    ...mapState(['the_cart']),
  },
  methods: {
    initData () {
      this.$axios.get('/apis/shopping/restaurants').then((resp) => {
        this.dbShops = resp.data
        this.$store.state.the_cart = resp.data.map(e=>({
          shop:e,
          foods:[]
        }))
        this.ready = true
      })
    },
    toShop (shop, i) {
      this.$router.push('/shop')
      document.querySelector('#elm-nav').style.display = 'none'
      document.querySelector('#elm-page-body').style.height = '100vh'
      this.$store.state.cur_shop = {
        shop, i
      }
    },
    toggleCheckBox (index) {
      this.checkBoxes[index] = this.checkBoxes[index] ^ 1
      const box = document.querySelector(`.check-box-row > span:nth-child(${index + 1})`)
      if (this.checkBoxes[index] === 1) {
        box.classList.add('checked-box')
      } else {
        box.classList.remove('checked-box')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@home-bg-bottom-color: #f5f5f5;
@red-color: #f43c28;
@gray-color: #666666;
@light-blue-color: #e5f6fe;
@text-blue-color: #01a6ff;

.border {
  border: 1px solid black;
}

.pointer {
  cursor: pointer;
}

.text-overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.food-card {
  width: 95%;
  background-color: white;
  border-radius: 10px;
  padding: 10px 0;
  flex-shrink: 0;
  margin-bottom: 1vh;
  .pointer();

  & > .van-col:nth-child(1) {
    height: 110px;
    width: 110px;
    border-radius: 10px;
    overflow: hidden;
  }

  & > .van-col:nth-child(2) {
    display: flex;
    height: 100px;
    flex-direction: column;
    align-content: flex-start;
    justify-content: space-between;

    & > .van-row:nth-child(1) {
      width: 100%;
      font-weight: bold;

      & > span:nth-child(1) {
        display: inline-block;
        .text-overflow();
      }
    }

    & > .van-row:nth-child(2) {
      width: 100%;
      font-size: 14px;
      color: @gray-color;

      & > .van-col:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        & > span:nth-child(1) {
          color: @red-color;
          margin-right: 3vw;
        }
      }
    }

    & > .van-row:nth-child(3) {
      width: 100%;
      font-size: 14px;
      color: @gray-color;
    }

    & > .van-row:nth-child(4) {
      /deep/ .van-tag {
        border-radius: 4px;
      }

      & > .van-col {
        display: flex;
        justify-content: flex-start;

        & > .van-tag:nth-child(1) {
          margin-right: 5px;
        }
      }
    }
  }
}

.food-list {
  & > .van-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.red-packet-prompt {
  margin-top: 1vh;
  margin-bottom: 1vh;

  /deep/ .van-tag {
    width: 87%;
    font-size: 14px;
    padding: 8px 15px;
    border-radius: 5px;

    .van-image {
      margin-right: 6px;
    }
  }
}

.check-box-row {
  z-index: 90;
  height: 6vh;
  padding: 1vh 0;

  /deep/ .van-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    height: 5vh;
    width: 16vw;
    padding: 0 8px;
    border-radius: 5px;
    .pointer();

    &.sticky-box {
      background-color: @home-bg-bottom-color !important;
    }

    &.checked-box {
      color: @text-blue-color !important;
      background-color: @light-blue-color !important;
    }
  }
}

.nearby-filter {
  z-index: 90;
  background-color: transparent;
  height: 6vh;

  /deep/ .van-dropdown-menu__bar {
    background-color: transparent;
    box-shadow: none;

    .van-dropdown-menu__title {
      color: @gray-color;
      margin-right: 2vw;
    }

    .van-dropdown-menu__title--active {
      font-weight: bold;
    }

    .van-dropdown-menu__title::after {
      border: 4px solid;
      border-color: transparent transparent @gray-color @gray-color;
    }

    .van-dropdown-menu__title--active.van-dropdown-menu__title::after {
      border-color: transparent transparent black black;
    }
  }

  /deep/ .van-dropdown-item {
    .van-popup {
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}

.nearby-header {
  z-index: 90;
  position: sticky;
  top: 6vh;
  height: fit-content;
}
</style>
