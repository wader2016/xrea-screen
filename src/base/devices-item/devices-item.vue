<template>
  <bg class="devices-bg" borderW="40px" borderH="289px" :leftTop="false" :rightTop="false">
    <!--<router-link :to="{path:'/screen/deviceLink/devDetail', query: {id: item.id}}"-->
                 <!--tag="div" class="devices-item">-->
    <router-link :to="`/screen/deviceLink/${item.id}`"
                 tag="div" class="devices-item">
      <bg class="header-bg">
        <div class="item-header">{{item.name}}</div>
      </bg>
      <div class="item-content">
        <!--<div class="item-img">-->
        <!---->
        <!--</div>-->
        <img :src="item.image" alt="">
        <div class="item-info">
          <bg class="left" borderSize="2px" borderW="8px">
            <p class="line1"><small>支持设备型号</small></p>
            <p class="line2">{{item.type}} <small>{{item.unit}}</small></p>
          </bg>
          <!--<bg class="right" borderSize="2px" borderW="8px">-->
            <!--<p class="line1"><small>累计工作时间</small></p>-->
            <!--<p class="line2">{{item.runTime}}<small> {{item.timeUnit}}</small></p>-->
          <!--</bg>-->
        </div>
      </div>
    </router-link>
  </bg>
</template>

<script>
import Bg from '@/base/bg/bg'
export default {
  name: 'devices-item',
  props: ['item'],
  components: {
    Bg
  }
}
</script>

<style lang="less" scoped>
.devices-bg{
}
.devices-item{
  border: 1px solid #0065bf;
  border-image: linear-gradient(to right, #0065bf 0%, #3fabdb 50%, #0065bf 100%) 30 30;
  .header-bg{
    margin: -1px;
    background-image: linear-gradient(to right, rgba(0,133,255,.3) 0%, rgba(84,206,254,.3) 50%, rgba(0,133,255,.3) 100%);
    .item-header{
      padding: 0 16px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-family: PingFangSC-Semibold;
    }
  }
  .item-content{
    margin: 4px;
    padding: 0 16px 11px 16px;
    border-left: 2px solid #2b81ae;
    border-right: 2px solid #2b81ae;
    border-top: 1px solid transparent;
    img{
      display: block;
      width: 213px;
      height: 160px;
      margin: 15px auto 16px;
    }
    .item-info{
      display: flex;
      justify-content: space-between;
      .left, .right{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
        height: 48px;
        background-color: rgba(84,206,254,.3);
      }
      .left{
        width: 100%;
        .line1{
          color: #f90;
          display: inline-block;
          /*font-size: 20px;*/
          font-family: Impact;

        }
        .line2{
          font-size: 28px;
          display: inline-block;
          font-family: Impact;
          color: #ff9900;
        }
      }
      /*.right{*/
        /*width: 52.52%;*/
        /*.line2{*/
          /*font-family: PingFangSC-Semibold;*/
        /*}*/
        /*.line2{*/
          /*font-size: 28px;*/
          /*font-family: Impact;*/
          /*white-space: nowrap;*/
        /*}*/
      /*}*/
      small{
        color: #b5dcff;
        font-size: 14px;
        font-family: PingFangSC-Medium;
      }
    }
  }
  .time{
    margin-top: 8px;
  }
}
</style>
