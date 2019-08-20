<template>
  <div class="title-inner">
    <div class="title-name">{{item.title}}</div>
    <div class="title-val">
      <div class="num">
        <div :id="`title${item.id}`"></div>
        <span class="unit">{{item.unit}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/js/numbergd'
export default {
  name: 'resolution-title',
  props: ['item'],
  mounted () {
    this.$nextTick(() => {
      this.setRollNum(this.item.id, this.item.val)
    })
  },
  methods: {
    // 使数字旋转
    setRollNum (id, num) {
      // 获取小数和整数部分
      let newNum = num + ''
      // eslint-disable-next-line
      $(`#title${id}`).rollNum({
        deVal: newNum,
        digit: newNum.length
      })
    }
  }
}
</script>

<style scoped lang="less">
  .title-inner {
    flex: 1;
    margin: 24px 24px 24px 0;
    padding: 8px;
    background: rgba(84,195,241, 0.4);
    border: 1px solid #54c3f1;
    .title-name {
      padding: 8px;
      color: #b5dcff;
      font-size: 20px;
      font-family: PingFang-SC-Bold
    }
    .title-val {
      padding:0 8px 8px 8px;
      color: #b5dcff;
      .num {
        font-size: 36px;
        font-family: Impact;
        display: flex;
        align-items: flex-end;
      }
      .unit{
        position: relative;
        font-size: 16px;
        font-family: PingFang-SC_Medium;
      }
    }
  }
</style>
