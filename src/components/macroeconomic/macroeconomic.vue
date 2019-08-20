<template>
  <bg borderW="40px" borderH="50%" borderColor="#1095de">
    <div class='macroeconomic'>
      <div class="macroeconomic-btn">
        <router-link tag="button" :to='`/screen/macroeconomic/inventory`'>设备分布图</router-link>
        <router-link tag="button" :to='`/screen/macroeconomic/workTime`'>设备开工率</router-link>
      </div>
      <div class="macroeconomic-content">
        <transition name="slide-left">
          <keep-alive>
            <router-view class="child-view"/>
          </keep-alive>
        </transition>
      </div>
    </div>
  </bg>
</template>

<script>
export default {
  name: 'macroeconomic'
}
</script>

<style lang="less" scoped>
.macroeconomic{
  position: relative;
  height: 100%;
  border: 1px solid rgba(0,133,255,.7);
  border-image: linear-gradient(to right, rgba(0,133,255,.7) 0%, rgba(84,206,254,.7) 50%, rgba(0,133,255,.7) 100%) 30 30;
  .macroeconomic-btn{
    height: 56px;
    background-image: linear-gradient(to right, rgba(38,116,186,.3) 0%, rgba(84,206,254,.3) 50%, rgba(38,116,186,.3) 100%);
    font-size: 0;
    button{
      width: 96px;
      height: 100%;
      font-size: 14px;
      color: #fff;
      font-family: PingFangSC-Semibold;
      background-color: transparent;
    }
    button.router-link-active{
      position: relative;
      top: -1px;
      font-family: PingFangSC-Medium;
      background-image: linear-gradient(to bottom, rgba(83,192,238, 0) 0%, rgba(0,183,255, 1) 100%);
      border-bottom: 2px solid #54cefe;
    }
    .back{
      float: right;
      width: 84px;
      height: 56px;
      background: url("/static/img/btn-bg.png") no-repeat;
      background-size: contain;
    }
  }
  .macroeconomic-content{
    /*height: 100%;*/
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  /*动画*/
  .child-view{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
}
</style>
