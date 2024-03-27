<template>
  <div class="order-select-bar">
    <van-tabs v-model="activeOrderPage" animated :color="elmColor" @change="clickOrderSelectBar">
      <van-tab title="全部" name="all">
      </van-tab>
      <van-tab title="待消费" name="unpaid">
      </van-tab>
      <van-tab title="待评价" name="uncomment">
      </van-tab>
      <van-tab title="退款" name="refund">
      </van-tab>
    </van-tabs>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data() {
    return {
      elmColor: '#02B6FD',
      activeOrderPage: 1
    }
  },
  methods: {
    clickOrderSelectBar(name) {
      this.$router.push(`/order/${name}`)
    }
  },
  activated() {
    document.querySelector('#elm-nav').style.display = 'flex'
    document.querySelector('#elm-page-body').style.height = '90vh'
  }
}
</script>

<style scoped lang="less">
.border {
  border: 1px solid black;
}

.text-overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
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
