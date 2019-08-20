<template>
  <div class="corn-border">
    <div class="corn corn-title">{{item.name}}</div>
    <div class="corn corn-number">{{item.value}}</div>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style scoped lang="less">
.corn-border {
  width: 100%;
  height: auto;
  background:linear-gradient(-135deg, transparent 16px, rgba(0,183,255,0.3) 0);
  color: #fff;
  .corn {
    margin: 8px;
  }
  .corn-title {
    font-size: 14px;
    font-family: PingFangSC-Semibold;
  }
  .corn-number {
    font-size: 24px;
    font-family: Impact;
  }
}
</style>
