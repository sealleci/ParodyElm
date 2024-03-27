<template>
  <div style="height: 100%;width: 100%">
    <van-row style="position: relative;top: 1vh;left: 2vw;">
      <van-image :src="crossImage" height="32" width="32" @click="toLogin" style="cursor: pointer;" />
    </van-row>
    <van-row type="flex" justify="left" style="margin:3vh 5vw 1vh;">
      <h2>密码登录</h2>
    </van-row>
    <van-row style="margin:0 0 4vh;" type="flex" justify="center">
      <van-field v-model="newPhone" type="tel" label="手机号" placeholder="手机号" :formatter="formatter" />
      <van-field v-model="newPwd" type="password" label="密码" placeholder="密码" :right-icon="isCloseEye"
        class="my-pwd-input" v-show="isCloseEyeBool" />
      <van-field v-model="newPwd" type="text" label="密码" placeholder="密码" :right-icon="isCloseEye" class="my-pwd-input"
        v-show="!isCloseEyeBool" />
    </van-row>
    <van-row type="flex" align="center" style="flex-direction: column;">
      <van-button round type="primary" style="width: 90%;margin-bottom: 1vh;" :disabled="!isInputed"
        @click="mobileLogin">登录
      </van-button>
    </van-row>
    <van-row type="flex" justify="center" style="position: absolute;bottom: 10vh;">
      <van-checkbox name="1" style="font-size: 12px;width: 90%;align-items: flex-start;" v-model="checked">已阅读并同意
        <span class="blue-text">《用户服务协议》</span>、
        <span class="blue-text">《隐私协议》</span>
      </van-checkbox>
    </van-row>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapState, mapMutations } from 'vuex'
import { sendLogin, accountLogin } from '../service/getData'

export default {
  name: 'PasswordLogin',
  setup() {
    const checked = ref(false)
    const newPhone = ref('')
    const newPwd = ref('')
    const formatter = (value) => value.replace(/[^0-9- ]/g, '')
    return {
      checked,
      newPhone,
      newPwd,
      formatter
    }
  },
  data() {
    return {
      crossImage: new URL('../../src/assets/images/ali_ucc_dialog_close.png', import.meta.url).href,
      eleImage: new URL('../../src/assets/images/od_icon_take_meal_ele_logo.png', import.meta.url).href,
      elemeColor: '#02b6fd',
      myPhone: '1594890315',
      showInPwd: false,
      closeEye: new URL('../../src/assets/images/aliuser_ic_visibility_off.png', import.meta.url).href,
      openEye: new URL('../../src/assets/images/aliuser_ic_visibility.png', import.meta.url).href,
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
  computed: {
    isInputed() {
      return this.newPwd !== '' && this.newPhone !== ''
    },
    isCloseEye() {
      return this.showInPwd ? this.openEye : this.closeEye
    },
    isCloseEyeBool() {
      return !this.showInPwd
    }
  },
  activated() {
    document.querySelector('#elm-nav').style.display = 'none'
    document.querySelector('#elm-page-body').style.height = '100vh'
    Array.from(document.querySelectorAll('.van-field__right-icon'))
      .forEach(e => {
        e.addEventListener('touchstart', () => {
          this.showInPwd = ~this.showInPwd
        })
      })
  },
  methods: {
    ...mapMutations([
      'RECORD_USERINFO',
    ]),
    toLogin() {
      this.$router.push('/login')
    },
    async mobileLogin() {

      this.$axios.post('/apis/v2/login', {
        username: this.newPhone,
        password: this.newPwd,
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

    }
  }
}
</script>

<style scoped lang="less">
@blue-color: #02b6fd;

:deep(.van-field) {
  width: 90%;
  background-color: transparent;
  border-bottom: 1px solid lightgray;
  padding: 16px 0;

  .van-field__label {
    display: none;
  }

  &::after {
    content: none;
  }

  input {
    caret-color: @blue-color;
    font-size: 16px;

    &::-moz-placeholder,
    &::-webkit-input-placeholder {
      color: gray;
    }
  }

  .van-field__right-icon {
    cursor: pointer;
  }
}

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
