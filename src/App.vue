<template>
  <van-row id="elm-page-body">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </van-row>
  <van-row id="elm-nav" type="flex" justify="space-around" align="center">
    <router-link
      to="/home"
      :class="
        /\/home/.test(this.$route.path)
          ? 'router-link-exact-active'
          : ''
      "
    >
      <van-col class="home-tab">
        <van-row type="flex" justify="center" align="center">
          <van-image
            v-show="!/\/home/.test(this.$route.path)"
            class="home-tab-icon"
            :src="homeTabs[0]"
            alt="home"
          />
          <van-image
            v-show="/\/home/.test(this.$route.path)"
            class="home-tab-icon-active"
            :src="homeTabsActive[0]"
            alt="home"
          />
        </van-row>
        <van-row justify="center" align="center"> 首页</van-row>
      </van-col>
    </router-link>
    <router-link to="/found">
      <van-col class="home-tab">
        <van-row type="flex" justify="center" align="center">
          <van-image
            v-show="this.$route.path !== '/found'"
            class="home-tab-icon"
            :src="homeTabs[1]"
            alt="found"
          />
          <van-image
            v-show="this.$route.path === '/found'"
            class="home-tab-icon-active"
            :src="homeTabsActive[1]"
            alt="found"
          />
        </van-row>
        <van-row justify="center" align="center"> 真香</van-row>
      </van-col>
    </router-link>
    <router-link to="/order"
                 :class="
        /\/order/.test(this.$route.path)
          ? 'router-link-exact-active'
          : ''
      "
    >
      <van-col class="home-tab">
        <van-row type="flex" justify="center" align="center">
          <van-image
            v-show="!/\/order/.test(this.$route.path)"
            class="home-tab-icon"
            :src="homeTabs[2]"
            alt="order"
          />
          <van-image
            v-show="/\/order/.test(this.$route.path)"
            class="home-tab-icon-active"
            :src="homeTabsActive[2]"
            alt="order"
          />
        </van-row>
        <van-row justify="center" align="center"> 订单</van-row>
      </van-col>
    </router-link>
    <router-link to="/profile">
      <van-col class="home-tab">
        <van-row type="flex" justify="center" align="center">
          <van-image
            v-show="this.$route.path !== '/profile'"
            class="home-tab-icon"
            :src="homeTabs[3]"
            alt="profile"
          />
          <van-image
            v-show="this.$route.path === '/profile'"
            class="home-tab-icon-active"
            :src="homeTabsActive[3]"
            alt="profile"
          />
        </van-row>
        <van-row justify="center" align="center"> 我的</van-row>
      </van-col>
    </router-link>
  </van-row>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      preScrollTop: 0,
      scrollDir: 0,
      backColor: '#f5f5f5',
      homeTabs: [
        require('../src/assets/images/shopping_home_tab_take_out.png'),
        require('../src/assets/images/shopping_home_tab_found.png'),
        require('../src/assets/images/shopping_home_tab_order.png'),
        require('../src/assets/images/shopping_home_tab_personal.png')
      ],
      homeTabsActive: [
        require('../src/assets/images/shopping_home_tab_take_out_selected.png'),
        require('../src/assets/images/shopping_home_tab_found_selected.png'),
        require('../src/assets/images/shopping_home_tab_order_selected.png'),
        require('../src/assets/images/shopping_home_tab_personal_selected.png')
      ]
    }
  },
  computed: {},
  methods: {
    convertPXToVH (px) {
      return px * (100 / document.documentElement.clientHeight)
    },
    convertPXToVW (px) {
      return px * (100 / document.documentElement.clientWidth)
    },
    handleScroll () {
      try {
        if (/\/home/.test(this.$route.path)) {
          const pageBody = document.querySelector('#elm-page-body')
          const headerRow = document.querySelector('.home-header')
          const searchRow = document.querySelector('.home-search-row')
          const thresholdHeight = (10 / 12) * headerRow.clientHeight
          const curScrollTop = pageBody.scrollTop
          this.$store.commit('setHomePageScrollTop', curScrollTop)
          if (curScrollTop <= thresholdHeight) {
            headerRow.style.opacity = 1.0 - curScrollTop / thresholdHeight
            searchRow.style.borderRadius = '4vw 4vw 0 0'
          } else {
            headerRow.style.opacity = 0.0
            searchRow.style.borderRadius = '0'
          }
          const homeSelectBar = document.querySelector('.home-select-bar')
          const selectTabs = document.querySelector(
            '.home-select-bar .van-tabs__nav'
          )
          if (curScrollTop >= homeSelectBar.offsetTop) {
            selectTabs.style.backgroundColor = 'white'
          } else {
            selectTabs.style.backgroundColor = 'transparent'
          }
          if (/nearby/.test(this.$route.path)) {
            const nearbyHeader = document.querySelector('.nearby-header')
            const headerFilter = document.querySelector('.nearby-filter')
            const headerBoxes = document.querySelector('.check-box-row')
            if (curScrollTop >= homeSelectBar.offsetTop) {
              nearbyHeader.style.backgroundColor = 'white'
              headerFilter.style.backgroundColor = 'white'
              headerBoxes.style.backgroundColor = 'white'
              Array.from(headerBoxes.children).forEach((e) => {
                e.classList.add('sticky-box')
              })
              if (this.preScrollTop > curScrollTop) {
                nearbyHeader.style.top = `${
                  Math.min(
                    Math.abs(
                      this.preScrollTop - curScrollTop
                    ) / headerFilter.offsetHeight * 6
                    , 6
                  ) + 6
                }vh`
                if (this.scrollDir < curScrollTop) {
                  this.preScrollTop = curScrollTop
                }
              } else {
                nearbyHeader.style.top = `${
                  12 - Math.min(
                    Math.abs(
                      this.preScrollTop - curScrollTop
                    ) / headerFilter.offsetHeight * 6
                    , 6
                  )
                }vh`
                if (this.scrollDir > curScrollTop) {
                  this.preScrollTop = curScrollTop
                }
              }
            } else {
              nearbyHeader.style.backgroundColor = 'transparent'
              headerFilter.style.backgroundColor = 'transparent'
              headerBoxes.style.backgroundColor = 'transparent'
              Array.from(headerBoxes.children).forEach((e) => {
                e.classList.remove('sticky-box')
              })
              nearbyHeader.style.top = '6vh'
              this.preScrollTop = curScrollTop
            }
          }
          this.scrollDir = curScrollTop
        } else if (/shop/.test(this.$route.path)) {
          const shopHeader = document.querySelector('.shop-header')
          const pageBody = document.querySelector('#elm-page-body')
          const navi = document.querySelector('.my-shop-navi')
          const shop_s = document.querySelector('.my-shop-s .van-tabs__nav')
          const curScrollTop = pageBody.scrollTop
          const top = navi.clientTop + navi.clientHeight
          if (curScrollTop >= top) {
            shopHeader.style.backgroundColor = this.backColor
            shop_s.style.backgroundColor = this.backColor
            this.$store.commit('setShopHeader', true)
          } else {
            shopHeader.style.backgroundColor = 'transparent'
            shop_s.style.backgroundColor = 'white'
            this.$store.commit('setShopHeader', false)
          }
        }
      } catch (e) {

      }
    }
  },
  mounted () {
    document
      .querySelector('#elm-page-body')
      .addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less">
@elm-color: #02b6fd;
@bg-color: #f6f6f6;
@home-bg-bottom-color: #f5f5f5;
@tab-font-color: #838383;
#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#elm-page-body {
  position: relative;
  width: 100vw;
  height: 90vh;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  background-color: @home-bg-bottom-color;

  &::-webkit-scrollbar {
    display: none;
  }
}

#elm-nav {
  position: relative;
  width: 100%;
  height: 10vh;
  background-color: @bg-color;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  //border-top: 1px solid red;
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 4vw;
    color: @tab-font-color;

    &.router-link-exact-active {
      color: @elm-color;
    }
  }
}

.home-tab {
  position: relative;
  top: -1.2rem;

  img {
    width: 4rem;
    height: 4rem;
  }
}
</style>
