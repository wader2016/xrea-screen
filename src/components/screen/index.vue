<template>
  <div class="screen">
    <screen-header></screen-header>
    <div class="screen-contents">
      <screen-nav></screen-nav>
      <div class="screen-content">
        <transition :name="transitionName">
          <!--<keep-alive>-->
            <router-view class="child-view"></router-view>
          <!--</keep-alive>-->
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenHeader from './screen-header/screen-header'
import ScreenNav from './screen-nav/screen-nav'
export default {
  name: 'Screen',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  created () {
  },
  components: {
    ScreenHeader,
    ScreenNav
  }
}
</script>

<style lang="less" scoped>
.screen {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .screen-header{
    flex: 90px 0;
  }
  .screen-contents{
    flex: 1;
    display: flex;
    .screen-nav{
      flex: 72px 0;
      text-align: center;
    }
    .screen-content{
      flex: 1;
      position: relative;
      width: 100%;
      overflow: hidden;
      background-image: linear-gradient(to bottom, #004580 0%, #001323 90%);
      color: #fff;
      padding: 24px;
    }
  }
  .child-view{
    position: absolute;
    top: 24px;
    left: 24px;
    right: 24px;
    bottom: 24px;
    /*width: 100%;*/
    /*height: 100%;*/
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
