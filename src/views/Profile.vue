<template>
  <van-row class="user-header" type="flex" justify="space-between" align="center">
    <van-col span="14" @click="toLogin" style="cursor: pointer;justify-content: flex-start">
      <van-image :src="avatar" :height="38" :width="38" style="margin:0 4vw" />
      <span class="user-name">{{
      this.$store.state.userInfo != null ? this.$store.state.userInfo.username : '立即登录'
    }}</span>
    </van-col>
    <van-col span="8">
      <van-image :src="settingImage" :height="headerPicSize" :width="headerPicSize" />
      <van-image :src="messageImage" :height="headerPicSize" :width="headerPicSize" />
    </van-col>
  </van-row>
  <van-cell-group inset>
    <van-cell>
      <h3>常用功能</h3>
      <van-row type="flex" justify="space-between" align="center">
        <van-col v-for="(func, i) in commonFunctions" :key="i" style="display: flex;
                 flex-direction: column;
                 justify-content: center;
                 align-items: center;
                 cursor:pointer;" @click="i == 2 ? toCart() : null">
          <van-image :src="func.icon" height="32" width="32" />
          <span style="font-size: 13px;">{{ func.name }}</span>
        </van-col>
      </van-row>
    </van-cell>
  </van-cell-group>
  <van-cell-group inset>
    <van-cell>
      <h3>互动玩乐</h3>
      <van-row type="flex" justify="space-between" align="center">
        <van-col v-for="(enter, i) in enters" :key="i" style="display: flex;
                 flex-direction: row;
                 justify-content: center;
                 align-items: center;
                  margin:8px 0" span="12">
          <div class="enter-text" style="display: flex;flex-direction: column;">
            <span style="font-size: 13px;">{{ enter.name }}</span>
            <span style="font-size: 13px;">{{ enter.desc }}</span>
          </div>
          <van-image :src="enterImage" height="36" width="36" />
        </van-col>
      </van-row>
    </van-cell>
  </van-cell-group>
  <van-cell-group inset>
    <van-cell title="" is-link value="领5元午餐红包" style="position: relative;top:2vh;" />
    <van-cell style="position: relative;top: -6vh;background-color: transparent">
      <h3>我的钱包</h3>
      <van-row type="flex" justify="space-around" align="center">
        <van-col v-for="(w, i) in myWallet" :key="i" style="display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height:12vh;">
          <div>{{ w.name }}</div>
          <div>
            <span style="
            font-size: 20px;
            font-weight: bold;
            margin-right: 4px;">{{ w.value }}</span>
            <span>{{ w.unity }}</span>
          </div>
          <div style="color: gray;">{{ w.desc }}</div>
        </van-col>
      </van-row>
    </van-cell>
  </van-cell-group>
  <van-cell-group inset>
    <van-cell style="margin-bottom: 2vh;">
      <h3>更多推荐</h3>
      <van-row type="flex" align="flex-start">
        <van-col v-for="(rec, i) in myRecommends" :key="i" style="display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;" span="6">
          <van-image :src="rec.icon" height="30" width="30" />
          <span class="rec-name">{{ rec.name }}</span>
        </van-col>
      </van-row>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      headerPicSize: 32,
      avatar: new URL('../../src/assets/images/im_ic_profile.png', import.meta.url).href,
      settingImage: new URL('../../src/assets/images/personal_center_setting.png', import.meta.url).href,
      messageImage: new URL('../../src/assets/images/spd2_im_dark.png', import.meta.url).href,
      commonFunctions: [
        {
          icon: new URL('../../src/assets/images/od_icon_menu_item_hongbao.png', import.meta.url).href,
          name: '红包卡券'
        }, {
          icon: new URL('../../src/assets/images/spd_collected_heart_dark.png', import.meta.url).href,
          name: '店铺关注'
        }, {
          icon: new URL('../../src/assets/images/sp_shopping_cart_floating_icon.png', import.meta.url).href,
          name: '购物车'
        }, {
          icon: new URL('../../src/assets/images/od_action_comment_v3.png', import.meta.url).href,
          name: '评价中心'
        }
      ],
      enterImage: new URL('../../src/assets/images/profile_icon_red.png', import.meta.url).href,
      enters: [
        {
          name: '赚吃货豆',
          desc: '可兑换艾的大礼包'
        }, {
          name: '现金提款机',
          desc: '0门槛提现'
        }, {
          name: '0元超级购',
          desc: '夺宝赢大奖'
        }, {
          name: '推荐有奖',
          desc: '现金打款'
        }
      ],
      myWallet: [
        {
          name: '借钱',
          value: '10',
          unity: '万',
          desc: '最高可借'
        }, {
          name: '干饭神卡',
          value: '7',
          unity: '元',
          desc: '外卖红包'
        }, {
          name: '享优惠',
          value: '157',
          unity: '元',
          desc: '绑卡立减'
        }
      ],
      myRecommends: [
        {
          icon: new URL('../../src/assets/images/od_address_indicator_current.png', import.meta.url).href,
          name: '我的地址'
        }, {
          icon: new URL('../../src/assets/images/od_action_customer_service_v3.png', import.meta.url).href,
          name: '我的客服'
        }, {
          icon: new URL('../../src/assets/images/component_bubble_a.png', import.meta.url).href,
          name: '签到领现金'
        }, {
          icon: new URL('../../src/assets/images/ic_store_placeholder.png', import.meta.url).href,
          name: '企业订餐'
        }, {
          icon: new URL('../../src/assets/images/mist_life_delicious_icon_foodie_prize_bean.png', import.meta.url).href,
          name: '瓜分吃货豆'
        }, {
          icon: new URL('../../src/assets/images/wm_dog.png', import.meta.url).href,
          name: '冲吧饿小宝'
        }, {
          icon: new URL('../../src/assets/images/od_action_pay_v3.png', import.meta.url).href,
          name: '省钱好券'
        }, {
          icon: new URL('../../src/assets/images/account_fragment_icon_user_vip.png', import.meta.url).href,
          name: '品牌会员'
        }, {
          icon: new URL('../../src/assets/images/abc_ic_star_black_36dp.png', import.meta.url).href,
          name: '尊享权益'
        }, {
          icon: new URL('../../src/assets/images/bk_car_navigation_unselect_icon.png', import.meta.url).href,
          name: '骑手招募'
        }, {
          icon: new URL('../../src/assets/images/taopai_ic_white_edit.png', import.meta.url).href,
          name: '培训学习技能'
        }, {
          icon: new URL('../../src/assets/images/bk_check_off_trans.png', import.meta.url).href,
          name: '商务合作'
        }, {
          icon: new URL('../../src/assets/images/spd_collect_heart_dark.png', import.meta.url).href,
          name: '公益3小时'
        }
      ]
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login')
      document.querySelector('#elm-nav').style.display = 'none'
      document.querySelector('#elm-page-body').style.height = '100vh'
    },
    toCart() {
      this.$router.push('/cart')
      document.querySelector('#elm-nav').style.display = 'none'
      document.querySelector('#elm-page-body').style.height = '100vh'
    }
  },
  activated() {
    document.querySelector('#elm-nav').style.display = 'flex'
    document.querySelector('#elm-page-body').style.height = '90vh'
  }
}
</script>

<style scoped lang="less">
@home-bg-bottom-color: #f5f5f5;

.border {
  border: 1px solid black;
}

.text-overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.pointer {
  cursor: pointer;
}

.rec-name {
  width: 95%;
  display: inline-block;
  font-size: 12px;
  text-align: center;
  .text-overflow();
}

.enter-text {
  width: 40%;
  margin-right: 5px;

  &>span {
    display: inline-block;
    .text-overflow();
  }

  &>span:nth-child(2) {
    color: gray;
  }
}

.van-cell-group {
  width: 95%;
  position: relative;
  margin-bottom: 2vh;

  :deep(.van-cell::after) {
    display: none;
  }
}

.user-header {
  z-index: 100;
  position: sticky;
  top: 0;
  height: 6vh;
  width: 100vw;
  background-color: @home-bg-bottom-color;
  padding: 5px 0;

  .van-col {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
  }

  .user-name {
    display: inline-block;
    line-height: 6vh;
    max-width: 40vw;
    font-size: 18px;
    font-weight: bold;
    .text-overflow();
  }
}
</style>
