<template>
  <div class="resolution-apply">
      <bg border-w="24px" borderSize="2px" :rightTop="false" :leftBottom="false" borderColor="#01d9d6">
        <div class="box-inner">
          <div class="box-header">
            <div class="header-icon">
              <img :src="item.icon" v-if="item.icon" alt="">
            </div>
            <div class="header-title">{{item.name}}</div>
          </div>
          <div class="box-content">
            <div class="list" v-for="list in item.content" :key="list.name">
              <div class="list-key">{{list.name}}</div>
              <div class="list-val">{{list.val}}</div>
            </div>
          </div>
        </div>
        <div v-if="showNum" class="top-info">{{index}}</div>
      </bg>
  </div>
</template>

<script>
import Bg from '@/base/bg/bg'
export default {
  name: 'resolution-left',
  props: ['index', 'item', 'showNum'],
  components: {
    Bg
  }
}
</script>

<style scoped lang="less">
  .resolution-apply {
    margin-bottom: 16px;
    .box-inner {
      width: 100%;
      height: auto;
      padding: 8px;
      border: 1px solid #00b7ff;
      box-shadow: inset 0 0 16px #00b7ff;
      background-color: rgba(0,32,57,0.3);
      .box-header {
        display: flex;
        padding: 8px;
        align-items: center;
        .header-icon {
          /*font-size: 20px;*/
          width: 24px;
          height: 24px;
          img {
            width: 24px;
            height: 24px;
          }
        }
        .header-title {
          color: #fff;
          font-size: 16px;
          margin-left: 16px;
          font-family: PingFang-SC-Bold;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .box-content {
        padding: 0 8px;
        .list {
          display: flex;
          color: #b5dcff;
          font-size: 14px;
          margin-bottom: 8px;
          font-family: PingFang-SC-Medium;
          .list-key {
            width: 86px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 8px;
          }
          .list-val {
            color: #fff;
            width: 172px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
    .top-info {
      position: absolute;
      top: 0;
      right: 0;
      width: 48px;
      height: 48px;
      font-size: 30px;
      color: #fff;
      font-family: Impact;
      border: 1px solid #01d9d6;
      box-shadow: inset 0 0 12px #01d9d6;
      text-align: center;
      line-height: 48px;
    }
  }
</style>
