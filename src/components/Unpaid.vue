<template>
  <div class="null-order">
    <van-image :src="nullImage" height="130" width="180"/>
    <span>暂无消费订单</span>
  </div>
</template>

<script>
export default {
  name: 'Unpaid',
  data () {
    return {
      nullImage: require('../../src/assets/images/null.png')
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
