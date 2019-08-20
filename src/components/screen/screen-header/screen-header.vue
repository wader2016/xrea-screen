<template>
  <div class="screen-header">
    <div class="header-left">
      <div class="kuai3"></div>
      <div class="kuai2"></div>
      <div class="kuai1"></div>
      <div class="border-bottom"></div>
    </div>
    <div class="header-title">
      <!--<img class="logo" src="/static/img/Xrea-logo.png" alt="汉云">-->
      汉云工业互联网平台
    </div>
    <div class="header-right">
      <div class="kuai1"></div>
      <div class="kuai2"></div>
      <div class="kuai3"></div>
      <div class="border-bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'screen-header'
}
</script>

<style lang="less" scoped>
.screen-header{
  width: 110%;
  margin-left: -5%;
  height: 90px;
  display: flex;
  background-color: #04345a;
  .border-bottom{
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: 0;
  }
  .header-left{
    flex: 1;
    padding-bottom: 10px;
    background-image: linear-gradient(to left, #0068a3 0%, #0068a3 10%, #003e72 100%);
    /*border-bottom: 1px solid #1c7bae;*/
    border-right: 2px solid transparent;
    border-image: linear-gradient(to bottom, #8de3f9,#1a79ac) 20 30;
    transform: skewX(-24deg);
    display: flex;
    align-items: flex-end;
    position: relative;
    .border-bottom{
      background-image: linear-gradient(to left, #1a79ac 0%, #0a6392 80%);
    }
    .kuai1,.kuai2{
      flex: 10px 0;
      height: 15px;
      margin-right: 8px;
      background-color: #00b7ff;
    }
    .kuai3{
      flex: 1;
      margin-right: 8px;
      height: 10px;
      /*background-color: #fff;*/
      background-image: linear-gradient(to left, #00b7ff 0%, #003e72 80%);
    }
  }
  .header-title{
    flex: 62.29% 0;
    text-align: center;
    color: #fff;
    line-height: 90px;
    font-size: 36px;
    font-family: PingFangSC-Semibold;
    img.logo{
      width: 72px;
      vertical-align: middle;
    }
  }
  .header-right{
    flex: 1;
    background-image: linear-gradient(to right, #0068a3 0%, #0068a3 10%, #003e72 100%);
    /*border-bottom: 1px solid #1c7bae;*/
    border-left: 2px solid #52beec;
    border-image: linear-gradient(to bottom, #8de3f9, #1a79ac) 20 30;
    transform: skewX(24deg);
    display: flex;
    align-items: flex-end;
    padding-bottom: 10px;
    position: relative;
    .border-bottom{
      background-image: linear-gradient(to right, #1a79ac 0%, #0a6392 90%);
    }
    .kuai1,.kuai2{
      flex: 10px 0;
      height: 15px;
      margin-left: 8px;
      background-color: #00b7ff;
    }
    .kuai3{
      flex: 1;
      margin-left: 8px;
      height: 10px;
      /*background-color: #fff;*/
      background-image: linear-gradient(to right, #00b7ff 0%, #003e72 80%);
    }
  }
}
</style>
