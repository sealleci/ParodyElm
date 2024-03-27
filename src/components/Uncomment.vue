<template>
  <div className="null-order">
    <van-image :src="nullImage" height="130" width="180" />
    <span>暂无评价订单</span>
  </div>
</template>

<script>
export default {
  name: 'Uncomment',
  data() {
    return {
      nullImage: new URL('../../src/assets/images/null.png', import.meta.url).href
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
