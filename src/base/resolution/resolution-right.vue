<template>
  <div class="resolution-apply">
    <bg border-w="8px" borderColor="#54c3f1">
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
  name: 'resolution-right',
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
      border: 1px solid rgba(0,133,255,0.7);
      /*background: rgba(84,195,241,0.3);*/
      .box-header {
        display: flex;
        padding: 8px;
        align-items: center;
        .header-icon {
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
            flex: 0 0 90px;
            margin-right: 8px;
          }
          .list-val {
            color: #fff;
            width: 200px;
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
      font-family: Impact;
      border: 1px solid #54cefe;
      /*background-color: rgba(84,195,241,0.3);;*/
      box-shadow: inset 0 0 12px #01d9d6;
      text-align: center;
      line-height: 48px;
    }
  }
</style>
