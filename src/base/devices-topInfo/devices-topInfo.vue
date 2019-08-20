<template>
  <dl class="devices-topInfo">
    <dt>
      <bg class="info-bg" borderW="7px">
        <div class="iconfont" :class="item.class"></div>
      </bg>
    </dt>
    <dd>
      <p>{{item.name? item.name: ''}}</p>
      <div class="line2">
        <div class="unit">{{item.flag? item.flag: ''}}</div>
        <div :id="idName+'Left'+item.id"></div>
        <div v-show="!isInteger" class="dot">.</div>
        <div :id="idName+'Right'+item.id"></div>
        <div class="unit">{{item.unit? item.unit: ''}}</div>
      </div>
    </dd>
  </dl>
</template>

<script>
import Bg from '@/base/bg/bg'
import '@/assets/js/numbergd'

export default {
  name: 'devices-topInfo',
  props: {
    item: {type: Object},
    idName: {type: String}
  },
  computed: {
    isInteger () {
      return this.item.num % 1 === 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setRollNum(this.idName, this.item.num)
    })
  },
  methods: {
    // 使数字旋转
    setRollNum (id, num) {
      // 获取小数和整数部分
      let newNum = num + ''
      let numArr = newNum.split('.')
      let numLeft = numArr[0]
      let numRight = numArr.length === 1 ? [] : numArr[1]
      // eslint-disable-next-line
      $(`#${id}Left${this.item.id}`).rollNum({
        deVal: numLeft,
        digit: numLeft.length
      })
      // eslint-disable-next-line
      $(`#${id}Right${this.item.id}`).rollNum({
        deVal: numRight,
        digit: numRight.length
      })
    }
  },
  components: {
    Bg
  }
}
</script>

<style lang="less" scoped>
dl.devices-topInfo{
  display: flex;
  align-items: center;
  padding-right: 5px;
  dt{
    width: 72px;
    min-width: 72px;
    height: 72px;
    margin-right: 8px;
    border: 1px solid rgba(84,206,254,0.3);
    .bg{
      width: 100%;
      height: 100%;
      .iconfont {
        height: 40px;
        width: 40px;
        font-size: 40px;
        padding: 16px;
        color: #54ceff;
      }
    }
  }
  dd{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 72px;
    p{
      font-size: 20px;
      font-family: PingFang-SC-Bold;
      color: #b5dcff;
      white-space: nowrap;
    }
    .line2{
      display: flex;
      align-items: flex-end;
      font-size: 36px;
      font-family: Impact;
      color: #fff;
      white-space: nowrap;
      .unit{
        position: relative;
        top: -3px;
        font-size: 18px;
        font-family: PingFang-SC_Medium;
      }
    }
  }
  &:last-child{
    padding-right: 0;
  }
}
</style>
