<template>
  <div style="height: 100%">
    <van-row style="position: relative;top: 1vh;left: 2vw;">
      <van-image :src="crossImage" height="32" width="32" @click="toProfile" style="cursor: pointer;" />
    </van-row>
    <van-row type="flex" justify="center" style="margin:5vh 0;">
      <van-image :src="eleImage" round height="60" :style="`background-color: ${elemeColor};`" />
    </van-row>
    <van-row type="flex" justify="center" style="font-size:12px;color: gray;margin:3vh 0 1vh;">使用本机号码一键登录
    </van-row>
    <van-row style="margin:0 0 4vh;" type="flex" justify="center">
      <div style="font-size: 30px;">{{ calcNumber }}</div>
    </van-row>
    <van-row type="flex" align="center" style="flex-direction: column;">
      <van-button round type="primary" style="width: 90%;margin-bottom: 1vh;" @click="mobileLogin">登录
      </van-button>
      <van-button round style="width: 90%;" @click="toPassword">使用其他手机登录</van-button>
    </van-row>
    <van-row type="flex" justify="center" style="margin-top:2vh;">
      <van-checkbox name="1" style="font-size: 12px;width: 90%;align-items: flex-start;"
        v-model="checked">未注册手机号登录后将自动生成帐号，且代表你已阅读并同意
        <span class="blue-text">《用户服务协议》</span>、
        <span class="blue-text">《隐私协议》</span>和
        <span class="blue-text">《运营商协议》</span>
      </van-checkbox>
    </van-row>
    <van-row type="flex" justify="center" style="position: absolute;bottom: 12vh;">
      <div style="color: gray;font-size: 12px;">其他登录方式</div>
    </van-row>
    <van-row type="flex" justify="center" style="position: absolute;bottom: 5vh;">
      <van-col v-for="(icon, i) in loginIcons" :key="i" span="4">
        <van-image :src="icon" height="30" />
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapState, mapMutations } from 'vuex'
import { sendLogin, accountLogin } from '../service/getData'

export default {
  name: 'Login',
  setup() {
    const checked = ref(false)
    return {
      checked
    }
  },
  data() {
    return {
      crossImage: new URL('../../src/assets/images/ali_ucc_dialog_close.png', import.meta.url).href,
      eleImage: new URL('../../src/assets/images/od_icon_take_meal_ele_logo.png', import.meta.url).href,
      elemeColor: '#02b6fd',
      myPhone: '1594890315',
      loginIcons: [
        new URL('../../src/assets/images/ic_account_alipay.png', import.meta.url).href,
        new URL('../../src/assets/images/wml_open_wopc_auth_taobao.png', import.meta.url).href,
        new URL('../../src/assets/images/ic_account_wechat.png', import.meta.url).href,
        new URL('../../src/assets/images/wml_miniapp_bar_more_dark.png', import.meta.url).href
      ],
      loginWay: false, // 登录方式，默认短信登录
      showPassword: false, // 是否显示密码
      phoneNumber: null, // 电话号码
      mobileCode: null, // 短信验证码
      validate_token: null, // 获取短信时返回的验证值，登录时需要
      computedTime: 0, // 倒数记时
      userInfo: null, // 获取到的用户信息
      userAccount: null, // 用户名
      passWord: null, // 密码
      captchaCodeImg: null, // 验证码地址
      codeNumber: null, // 验证码
      showAlert: false, // 显示提示组件
      alertText: null // 提示的内容
    }
  },
  activated() {
    document.querySelector('#elm-nav').style.display = 'none'
    document.querySelector('#elm-page-body').style.height = '100vh'
  },
  computed: {
    calcNumber() {
      return this.myPhone.slice(0, 3) + '****' + this.myPhone.slice(6)
    },
    rightPhoneNumber: function () {
      return /^1\d{10}$/gi.test(this.phoneNumber)
    }
  },
  methods: {
    ...mapMutations([
      'RECORD_USERINFO',
    ]),
    toProfile() {
      this.$router.push('/profile')
      document.querySelector('#elm-nav').style.display = 'flex'
      document.querySelector('#elm-page-body').style.height = '90vh'
    },
    async mobileLogin() {
      this.$axios.post('/apis/v2/login', {
        username: this.myPhone,
        password: '',
        captcha_code: ''
      }).then((response) => {
        this.userInfo = response.data
        if (!this.userInfo.user_id) {
          this.showAlert = true;
          this.alertText = this.userInfo.message;
          // if (!this.loginWay) this.getCaptchaCode();
        } else {
          // this.$store.commit('storeUserInfo',this.userInfo);
          this.RECORD_USERINFO(this.userInfo);
          // console.log(this.$store.state.userInfo.username)
          this.$router.push('/profile');
        }
      })

    },
    toPassword() {
      this.$router.push('/login/password')
    }
  }
}
</script>

<style scoped lang="less">
@blue-color: #02b6fd;

:deep(.van-checkbox__label) {
  text-align: left;
}

.blue-text {
  color: @blue-color;
}

.van-row {
  width: 100%;
}
</style>
