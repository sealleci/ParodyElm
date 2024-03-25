<template>
  <van-row class="home-page">
    <van-row
      class="home-header"
      type="flex"
      justify="space-between"
      align="bottom"
    >
      <van-col span="16">
        <van-row type="flex" gutter="3" justify="start" align="center">
          <van-col span="4">
            <van-image
              :src="positionIcon"
              height="1.75rem"
              width="1.75rem"
            ></van-image>
          </van-col>
          <van-col class="home-my-address">
            东软软件园企业服务中心楼
          </van-col>
          <van-col span="2" class="pointer">
            <van-image
              :src="addressDropIcon"
              height="0.75rem"
              width="0.75rem"
            ></van-image>
          </van-col>
        </van-row>
      </van-col>
      <van-col span="4" class="pointer" @click="toCart">
        <van-image
          :src="shopCartIcon"
          height="2rem"
          width="2rem"
        ></van-image>
      </van-col>
      <van-col span="4" class="pointer">
        <van-image
          :src="chatIcon"
          height="2rem"
          width="2rem"
        ></van-image>
      </van-col>
    </van-row>
    <van-row class="home-body" type="flex" justify="center" align="top">
      <van-col span="24">
        <van-row
          class="home-search-row"
          type="flex"
          justify="center"
          align="bottom"
        >
          <van-row
            class="home-search"
            type="flex"
            justify="space-between"
            align="center"
          >
            <van-col span="3">
              <van-image
                :src="qrScanIcon"
                height="1rem"
                width="1rem"
                alt="qrcode"
              />
            </van-col>
            <van-col span="15">
              特价赛百味不吃白不吃快来吃吃与吃吃
            </van-col>
            <van-col span="5">
              <van-button round>搜索</van-button>
            </van-col>
          </van-row>
        </van-row>
        <van-row
          class="search-rec"
          type="flex"
          justify="start"
          align="center"
        >
          <van-col class="search-rec-cell">好吃吃</van-col>
          <van-col class="search-rec-cell">小老鼠</van-col>
          <van-col class="search-rec-cell">油炸鸡米花</van-col>
        </van-row>
        <van-tabs
          class="home-func"
          v-model="activeHomeFuncPage"
          swipeable
          animated
          :color="elmColor"
          type="card"
          swipe-threshold="2"
          @change="clickHomeFuncTab"
        >
          <van-tab name="1">
            <van-row
              class="pointer"
              type="flex"
              justify="space-around"
              align="center"
              v-for="(row, i) in homeFuncs[0]"
              :key="i"
            >
              <van-col
                span="4"
                class="home-func-icon"
                v-for="(col, j) in row"
                :key="j"
              >
                <van-image :src="col.icon"
                           :height="i===0?40:25"
                            :width="i===0?40:25"/>
                <div>{{ col.title }}</div>
              </van-col>
            </van-row>
          </van-tab>
          <van-tab name="2">
            <van-row
              class="pointer"
              type="flex"
              justify="space-around"
              align="center"
              v-for="(row, i) in homeFuncs[1]"
              :key="i"
            >
              <van-col
                span="4"
                class="home-func-icon"
                v-for="(col, j) in row"
                :key="j"
              >
                <van-image :src="col.icon"/>
                <div>{{ col.title }}</div>
              </van-col>
            </van-row>
          </van-tab>
        </van-tabs>
        <van-row
          class="discount-row"
          type="flex"
          justify="space-around"
          align="center"
        >
          <van-col span="4">
            <van-tag size="medium" :color="orangeColor"
            >赚豆
            </van-tag
            >
          </van-col>
          <van-col span="15"
          >领吃货卡送<span>20</span>吃货豆，可兑换艾的大礼包
          </van-col
          >
          <van-col class="pointer" span="5">
            <van-tag size="medium" round plain :color="orangeColor"
            >查看
            </van-tag
            >
          </van-col>
        </van-row>
        <van-row
          class="red-packet"
          type="flex"
          justify="center"
          :style="`background: url(${redPacketImage})`"
        >
          <van-col span="24">
            <van-row class="red-packet-header">
              <van-col span="24">
                <van-row> 今日补贴已到账</van-row>
                <van-row>
                  <span>￥</span>
                  <span>42</span>
                </van-row>
                <van-row>
                  剩余
                  <span>
                    <van-row type="flex" align="center">
                      <van-tag
                        :color="lightRed"
                        text-color="red"
                      >
                        {{
                          getRedPacketRemainTime.slice(
                            0,
                            2
                          )
                        }}
                      </van-tag>
                      :
                      <van-tag
                        :color="lightRed"
                        text-color="red"
                      >
                        {{
                          getRedPacketRemainTime.slice(
                            2,
                            4
                          )
                        }}
                      </van-tag>
                      :
                      <van-tag
                        :color="lightRed"
                        text-color="red"
                      >
                        {{
                          getRedPacketRemainTime.slice(
                            4,
                            6
                          )
                        }}
                      </van-tag>
                    </van-row>
                  </span>
                  结束
                  <span>
                    <van-image
                      :src="redPacketInfoIcon"
                      height="14"
                      width="14"
                      alt="info"
                    />
                  </span>
                </van-row>
              </van-col>
            </van-row>
            <van-row class="sale-title">
              <span> 新人特价菜 | 下单后再返红包 </span>
              <span class="pointer">
                更多
                <van-image
                  :src="saleTitleRightIcon"
                  height="10"
                  width="8"
                  alt="right"
                />
              </span>
            </van-row>
            <van-row class="red-mask"></van-row>
            <van-row class="sale-list" type="flex" align="center">
              <van-skeleton
                round
                :row="2"
                row-width="100%"
                avatar-size="100"
                avatar
                avatar-shape="square"
                :loading="loading"
                v-for="(food, i) in redPacketSale"
                :key="i"
              >
                <van-card
                  :thumb="defaultFoodImage"
                  :title="food.name"
                  :desc="food.shop"
                  currency="补贴后 ¥ "
                  :price="food.price"
                  centered
                />
              </van-skeleton>
              <van-col class="sale-list-see-more">
                <van-row type="flex" align="center">
                  <van-tag round class="pointer">
                    <van-image
                      :src="rightArrowIcon"
                      height="16"
                      alt="left"
                    />
                  </van-tag>
                  <span>查看更多</span>
                </van-row>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
        <div class="home-select-bar">
          <van-tabs
            v-model="activeHomeSubPage"
            animated
            :color="elmColor"
            @change="clickHomeSelectBar"
          >
            <van-tab title="附近推荐" name="nearby">
            </van-tab>
            <van-tab title="发现好菜" name="dish"></van-tab>
            <van-tab :title="`${localName}必吃`" name="eatable">
            </van-tab>
            <van-tab title="鲜花" name="flower"></van-tab>
            <van-tab title="超市" name="supermarket"></van-tab>
            <van-tab title="水果" name="fruit"></van-tab>
            <van-tab title="买菜" name="vegetable"></van-tab>
            <van-tab title="到店吃" name="eating"></van-tab>
            <van-tab title="医药" name="medicine"></van-tab>
          </van-tabs>
        </div>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </van-col>
    </van-row>
  </van-row>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      loading: true,
      localName: '温州',
      defaultFoodImage: require('../../src/assets/images/cart_recommend_default_food_big.png'),
      positionIcon: require('../../src/assets/images/sp_home_location_icon_big.png'),
      addressDropIcon: require('../../src/assets/images/sp_home_address_drop_down.png'),
      shopCartIcon: require('../../src/assets/images/channel_shopping_cart.png'),
      chatIcon: require('../../src/assets/images/spd2_im.png'),
      qrScanIcon: require('../../src/assets/images/sc_icon_scan_qr_code.png'),
      redPacketImage: require('../../src/assets/images/sp_red_packet_update_icon_right.png'),
      redPacketInfoIcon: require('../../src/assets/images/od_modify_info_hint_icon.png'),
      saleTitleRightIcon: require('../../src/assets/images/od_detail_right_indicator.png'),
      rightArrowIcon: require('../../src/assets/images/bk_checkout_icon_back_action.png'),
      activeHomeFuncPage: 1,
      activeHomeSubPage: 1,
      elmColor: '#02B6FD',
      lightRed: '#FFD4C5',
      tabNoActiveColor: '#E1E1E1',
      orangeColor: '#FCA200',
      homeFuncTrackObserver: new MutationObserver((mutations) => {
        mutations.forEach(() => {
          this.handleHomeFuncScroll()
        })
      }),
      remainTime: 11 * 60 * 60 + 23 * 60 + 58,
      homeFuncs: [
        [
          [
            {
              icon: require('../../src/assets/images/app/a60732e5fbeacbbea6469cc22d4f2png.png'),
              title: '美食外卖'
            },
            {
              icon: require('../../src/assets/images/app/83c3d3b05c86417f198269e0bb420png.png'),
              title: '超市便利'
            },
            {
              icon: require('../../src/assets/images/app/9c50ea3d57cb62e85c321f8b85927png.png'),
              title: '美食团购'
            },
            {
              icon: require('../../src/assets/images/app/f61874fcf36f7b7d601d04aadcd75png.png'),
              title: '丽人/医美'
            },
            {
              icon: require('../../src/assets/images/app/212b3d9933207797e02e89798e50cjpeg.jpeg.png'),
              title: '休闲玩乐'
            }
          ],
          [
            {
              icon: require('../../src/assets/images/app/5f948143e93b6153f5fad3448af82png.png'),
              title: '下午茶'
            },
            {
              icon: require('../../src/assets/images/app/1af0dcbe044dd905c367ff9d61a6cpng.png'),
              title: '水果'
            },
            {
              icon: require('../../src/assets/images/app/288ef9ad692bc657deeefab744b9bpng.png'),
              title: '甜品饮料'
            },
            {
              icon: require('../../src/assets/images/app/a6dea2ebc750190bb810977f26c94png.png'),
              title: '买菜'
            },
            {
              icon: require('../../src/assets/images/app/a95ad27e0c94e97f10111decd1fbepng.png'),
              title: '送药上门'
            }
          ],
          [
            {
              icon: require('../../src/assets/images/app/a95ad27e0c94e97f10111decd1fbepng.png'),
              title: '跑腿代购'
            },
            {
              icon: require('../../src/assets/images/app/288ef9ad692bc657deeefab744b9bpng.png'),
              title: '鲜花绿植'
            },
            {
              icon: require('../../src/assets/images/app/1af0dcbe044dd905c367ff9d61a6cpng.png'),
              title: '0元领水果'
            },
            {
              icon: require('../../src/assets/images/app/5f948143e93b6153f5fad3448af82png.png'),
              title: '红包膨胀'
            },
            {
              icon: require('../../src/assets/images/app/a6dea2ebc750190bb810977f26c94png.png'),
              title: '冲吧饿小宝'
            }
          ]
        ],
        [
          [
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '省钱好券'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '现金提款机'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '洗衣家政'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '天天赚现金'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '酒店'
            }
          ],
          [
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '洗浴汗蒸'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '酒水饮料'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '足疗按摩'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '医疗口腔'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '景点门票'
            }
          ],
          [
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '充电包'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '全城购'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '大牌价到'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '借钱'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '信用卡'
            }
          ],
          [
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '电影票'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '快速自取'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '火车机票'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '周边游'
            },
            {
              icon: require('../../src/assets/images/colored_logo.png'),
              title: '全部'
            }
          ]
        ]
      ],
      redPacketSale: [
        {
          name: '叫了个童子鸡',
          shop: '叫了个炸鸡（数码店）',
          price: 4.8
        },
        {
          name: '双堡+小食+饮品',
          shop: '贝个汉堡',
          price: 3.99
        },
        {
          name: '招牌麻辣拌（超级大鼠）',
          shop: '油麻弟麻辣拌专业店面',
          price: 1.8
        },
        {
          name: '原味螺丝粉+超级大鼠',
          shop: '小蛮螺螺丝粉烧烤',
          price: 5.98
        },
        {
          name: '馕粉两掺',
          shop: '歹歹的新疆米粉店铺',
          price: 11
        },
        {
          name: '玫瑰小芋圆冰粉',
          shop: '鹿小茶-甜品冰粉',
          price: 1.8
        },
        {
          name: '任选3肉3菜套餐',
          shop: '毛毛匠串炒饭（好吃）',
          price: 5.9
        },
        {
          name: '李先生牛肉面',
          shop: '李先生牛肉面（超级牛牛）',
          price: 10.5
        }
      ]
    }
  },
  methods: {
    toCart () {
      this.$router.push('/cart')
      document.querySelector('#elm-nav').style.display = 'none'
      document.querySelector('#elm-page-body').style.height = '100vh'
    },
    getBetweenColor (a, b, ratio) {
      const rs = [parseInt(a.slice(1, 3), 16),
        parseInt(b.slice(1, 3), 16)]
      const gs = [parseInt(a.slice(3, 5), 16),
        parseInt(b.slice(3, 5), 16)]
      const bs = [parseInt(a.slice(5, 7), 16),
        parseInt(b.slice(5, 7), 16)]

      function calcColor (arr) {
        return Math.floor((arr[1] - arr[0]) * ratio + arr[0]).toString(16)
      }

      return `#${calcColor(rs)}${calcColor(gs)}${calcColor(bs)}`
    },
    handleHomeFuncScroll () {
      const tabRow = document.querySelector('.home-func .van-tabs__wrap')
      const tab1 = document.querySelector('.home-func .van-tab:nth-child(1)')
      const tab2 = document.querySelector('.home-func .van-tab:nth-child(2)')
      const track = document.querySelector('.home-func .van-swipe__track')
      const trackWidth = track.clientWidth
      const offset = parseInt(track.style.transform.match(/-?\d+/)[0])
      const ratio = Math.abs(offset) / Math.round(trackWidth / 2)
      let h1 = Array.from(document.querySelectorAll('.home-func .van-swipe__track>.van-swipe-item:nth-child(1) .van-row'))
      if (h1.length !== 0) {
        h1 = h1.map(a => a.offsetHeight)
          .reduce((a, b) => a + b)
      } else {
        h1 = 0
      }
      let h2 = Array.from(document.querySelectorAll('.home-func .van-swipe__track>.van-swipe-item:nth-child(2) .van-row'))
      if (h2.length !== 0) {
        h2 = h2.map(a => a.offsetHeight)
          .reduce((a, b) => a + b)
      } else {
        h2 = 0
      }
      const hDiff = h2 - h1
      tab1.style.flexGrow = 9 - Math.floor(ratio * 8)
      tab2.style.flexGrow = 1 + Math.floor(ratio * 8)
      tab1.style.backgroundColor = this.getBetweenColor(this.elmColor, this.tabNoActiveColor, ratio)
      tab2.style.backgroundColor = this.getBetweenColor(this.tabNoActiveColor, this.elmColor, ratio)
      if (tab1.classList.contains('van-tab--active')) { // 左划右
        tabRow.style.marginTop = `${Math.floor(hDiff * ratio)}px`
      } else { // 右划左
        tabRow.style.marginTop = `${-Math.floor(hDiff * (1 - ratio))}px`
      }
      if (ratio >= 0.9 || ratio <= 0.1) {
        tabRow.style.marginTop = '0px'
      }
    },
    clickHomeFuncTab (name) {
      const tab1 = document.querySelector('.home-func .van-tab:nth-child(1)')
      const tab2 = document.querySelector('.home-func .van-tab:nth-child(2)')
      switch (name) {
        case '1':
          tab1.style.flexGrow = 9
          tab2.style.flexGrow = 1
          tab1.style.backgroundColor = this.elmColor
          tab2.style.backgroundColor = this.tabNoActiveColor
          break
        case '2':
          tab1.style.flexGrow = 1
          tab2.style.flexGrow = 9
          tab1.style.backgroundColor = this.tabNoActiveColor
          tab2.style.backgroundColor = this.elmColor
          break
        default:
          break
      }
    },
    clickHomeSelectBar (name) {
      if (name === 'nearby') {
        this.$router.push(`/home/${name}`)
      } else {
        this.$router.push('/home/other')
      }
    }
  },
  created () {
    setInterval(() => {
      this.remainTime = Math.max(0, this.remainTime - 1)
    }, 1000)
  },
  mounted () {
    this.loading = false
    this.homeFuncTrackObserver.observe(document.querySelector('.home-func .van-swipe__track'), {
      childList: false,
      attributes: true,
      attributeFilter: ['style']
    })

  },
  computed: {
    getRedPacketRemainTime () {
      const h = [
        Math.floor(this.remainTime / 60 / 60).toString().padStart(2, '0'),
        Math.floor((this.remainTime % (60 * 60)) / 60).toString().padStart(2, '0'),
        Math.floor(this.remainTime % 60).toString().padStart(2, '0')
      ]
      return h.join('')
    }
  },
  activated () {
    const pageBody = document.querySelector('#elm-page-body')
    pageBody.scrollTop = this.$store.state.homePageScrollTop
    document.querySelector('#elm-nav').style.display = 'flex'
    document.querySelector('#elm-page-body').style.height = '90vh'
  }
}
</script>

<style lang="less" scoped>
@elm-color: #02b6fd;
@bg-color: #f6f6f6;
@home-bg-bottom-color: #f5f5f5;
@search-rec-cell-bg-color: #f2f2f2;
@search-font-color: #999999;
@search-btn-l-color: #28c9ff;
@search-btn-r-color: #02adf5;
@tab-no-active-color: #e1e1e1;
@orange-color: #fca200;
@red-color: #f43c28;
@red-bottom-color: #fe6d4f;
@red-packet-font-color: #9c8a7b;
@red-packet-image: "../../src/assets/images/sp_red_packet_update_icon_right.png";

.border {
  border: 1px solid black;
}

.text-overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.home-select-bar {
  z-index: 100;
  position: sticky;
  top: 7vh;
  width: 100vw;

  /deep/ .van-tabs {
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

.sale-list {
  /deep/ .van-skeleton {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .van-skeleton__avatar {
      margin: 0;
    }
  }

  /deep/ .van-card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    flex-shrink: 0;
    width: 112px;
    height: 100%;
    margin: 0;
    padding: 0 6px;
    background-color: transparent;

    .van-card__header {
      display: flex;
      flex-direction: column;
      align-content: center;

      .van-card__thumb {
        display: flex;
        justify-content: center;
        width: 100px;
        height: 100px;
        margin: 0;

        img {
          height: 100px;
          width: 100px;
        }
      }

      .van-card__content {
        justify-content: space-between;
        min-height: 50px;
        margin-top: 8px;
        padding: 0;

        .van-card__title {
          display: inline-block;
          width: 100%;
          font-size: 14px;
          .text-overflow();
        }

        .van-card__bottom {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          & * {
            color: @red-color !important;
          }

          .van-card__price {
            font-size: 16px;
            font-weight: bold;
          }

          .van-card__price-currency {
            font-size: 12px;
            font-weight: normal;
          }
        }
      }
    }
  }

  .sale-list-see-more {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-shrink: 0;
    margin-right: 5px;
    font-size: 14px;

    .van-tag {
      display: flex;
      align-items: center;
      height: 100%;
      margin: 0 4px;
    }

    span:last-child {
      display: flex;
      align-items: center;
      height: 100%;
      width: 1rem;
    }
  }
}

.red-packet {
  position: relative;
  width: 100%;
  height: 60vh;
  margin-top: 1vh;
  background-repeat: no-repeat !important;
  background-size: 300px !important;
  background-position: top !important;

  & .van-col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sale-list {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    top: 114px;
    width: 270px;
    height: 180px;
    padding: 0 5px;
    border-radius: 2vw;
    background-color: white;
    overflow-x: scroll;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .red-mask {
    position: absolute;
    top: 255px;
    width: 298px;
    height: 160px;
    background: linear-gradient(to bottom,
    @red-bottom-color,
    @home-bg-bottom-color);
  }

  .sale-title {
    position: relative;
    top: 105px;
    width: 260px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    span:last-child {
      font-size: 13px;
    }
  }

  .red-packet-header {
    position: relative;
    top: 72px;
    width: 210px;
    height: 120px;
    margin-left: 1vw;

    .van-col {
      height: 100%;
      justify-content: space-around;

      & > .van-row:nth-child(1) {
        color: @red-color;
        font-size: 14px;

        &::before {
          content: "";
          position: relative;
          top: 1vh;
          right: 5px;
          width: 40px;
          height: 4px;
          background: linear-gradient(to left,
          @red-color,
          transparent);
          clip-path: polygon(0 50%, 100% 0, 100% 100%);
        }

        &::after {
          content: "";
          position: relative;
          top: 1vh;
          left: 5px;
          width: 40px;
          height: 4px;
          background: linear-gradient(to right,
          @red-color,
          transparent);
          clip-path: polygon(0 0%, 100% 50%, 0% 100%);
        }
      }

      & > .van-row:nth-child(2) {
        color: @red-color;
        font-size: 30px;
        font-weight: bold;

        span {
          display: flex;
          align-items: center;
        }

        span:first-child {
          font-size: 24px;
        }
      }

      & > .van-row:nth-child(3) {
        font-size: 14px;
        color: @red-packet-font-color;

        span {
          color: @red-color;
        }

        span:first-child {
          display: flex;
          align-items: center;

          .van-tag {
            margin: 0 3px;
            font-size: 13px;
            padding: 1px 2px;
          }
        }

        span:last-child {
          display: flex;
          align-items: center;

          padding: 0.5vw;
        }
      }
    }
  }
}

.discount-row {
  height: 5vh;
  width: 95%;
  margin: 0 auto;
  border-radius: 2vw;
  background-color: white;

  & > .van-col:nth-child(2) {
    letter-spacing: 2px;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;

    & > span {
      font-weight: bold;
      color: @orange-color;
    }
  }

  & > .van-col:nth-child(3) {
    /deep/ .van-tag {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70%;
      background-color: transparent;
    }
  }
}

.home-func-icon {
  margin: 2vh 0 0;

  & > .van-image {
    height: 1.5rem;
    width: 1.5rem;
  }

  & > div {
    font-size: 13px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
}

.home-func {
  display: flex;
  flex-direction: column-reverse;

  & /deep/ .van-tabs__content {
    margin-bottom: 2vh;
  }

  & /deep/ .van-tabs__wrap {
    display: flex;
    justify-content: center;
    height: 2vh;

    & > .van-tabs__nav--card {
      width: 10vw;
      height: 4px;
      border: none;
      background-color: transparent;

      & > .van-tab {
        flex-grow: 1;
        width: 5vw;
        margin: 0 2px;
        border: none;
        border-radius: 50vw;
        background-color: @tab-no-active-color;
      }

      & > .van-tab.van-tab--active {
        flex-grow: 9;
      }
    }
  }
}

.search-rec {
  width: 100%;
  height: 3vh;
  padding: 0 5vw;

  & > .search-rec-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-right: 2vw;
    padding: 0 0.5rem;
    font-size: 14px;
    background-color: @search-rec-cell-bg-color;
    border-radius: 5vh;
  }
}

.pointer {
  cursor: pointer;
}

.home-page {
  width: 100vw;
  background: linear-gradient(to bottom,
  white 50%,
  @home-bg-bottom-color 50%);
}

.home-header {
  z-index: 0;
  width: 100vw;
  height: 12vh;
  background-color: @elm-color;
  font-weight: bold;
  color: white;

  & > .van-col {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vh;
    //border: 1px solid red;

    & > .van-row {
      height: 100%;
      width: 100%;

      & .van-col {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        //border: 1px solid red;
      }
    }
  }

  .home-my-address {
    display: inline-block !important;
    max-width: 50vw;
    font-size: 16px;
    line-height: 10vh;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
}

.home-body {
  position: relative;
  top: -2vh;
  width: 100vw;
  height: fit-content;
  border-radius: 4vw 4vw 0 0;
  background: linear-gradient(to bottom,
  white 12vh,
  @home-bg-bottom-color,
  @home-bg-bottom-color 60vh);
}

.home-search-row {
  z-index: 100;
  position: sticky;
  top: 0;
  width: 100%;
  height: 6.5vh;
  background-color: white;
  padding-bottom: 1vh;
  border-radius: 4vw 4vw 0 0;
}

.home-search {
  width: 90%;
  height: 32px;
  border: 1px solid @elm-color;
  border-radius: 5vh;

  & > .van-col {
    height: 100%;
  }

  & > .van-col:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      content: "";
      position: relative;
      left: 2.5vw;
      width: 0;
      height: 60%;
      border: 0.05rem solid rgba(0, 0, 0, 0.1);
    }
  }

  & > .van-col:nth-child(2) {
    display: inline-block;
    width: 100%;
    line-height: 32px;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    font-size: 14px;
    color: @search-font-color;
  }

  & > .van-col:nth-child(3) {
    display: flex;
    justify-content: right;

    & > .van-button {
      height: 100%;
      width: 100%;
      font-size: 14px;
      color: white;
      border: none;
      background: linear-gradient(to right,
      @search-btn-l-color,
      @search-btn-r-color);
    }
  }
}
</style>
