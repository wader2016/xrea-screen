<template>
  <bg borderW="8px" borderSize="2px" :leftTop="false" :rightTop="false">
    <div class="kuang">
      <bg borderW="4px">
        <div class="header">
          {{name}}
          <span class="fr">{{rightName}}</span>
        </div>
      </bg>
      <div class="info">
        <slot></slot>
      </div>
    </div>
  </bg>
</template>

<script>
export default {
  name: 'kuang',
  props: {
    name: {
      type: String
    },
    rightName: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.kuang{
  position: relative;
  height: 100%;
  background-color: #002039;
  border: 1px solid rgba(0,133,255, .7);
  border-image: linear-gradient(to right, rgba(0,133,255, 1) 0%, rgba(84,206,254, 1) 50%, rgba(0,133,255, 1) 100%) 30 30;
  box-shadow: 0 0 8px #002039;
  .header{
    padding: 8px 16px;
    height: 44px;
    line-height: 1;
    font-size: 20px;
    font-family: PingFangSC-Semibold;
    color: #fff;
    background-image: linear-gradient(to right, rgba(0,133,255, .3) 0%, rgba(84,206,254, .3) 50%, rgba(0,133,255, .3) 100%);
    span.fr{
      line-height: 26px;
      font-size: 14px;
      color: #fff;
      font-family: PingFang-SC-Medium;
    }
  }
  .info{
    position: absolute;
    top: 42px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
