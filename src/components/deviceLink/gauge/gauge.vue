<template>
  <div class="gauge">
    <div class="gauge-image" :id="idName"></div>
    <h4 class="gauge-title">{{info.name}}</h4>
    <div class="num">
      <div :id="idName+'left'"></div>
      <div class="dot" v-show="val % 1 !== 0">.</div>
      <div :id="idName+'right'"></div>
      <div class="unit">{{info.unit}}</div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
// eslint-disable-next-line
import '@/assets/js/numbergd'
export default {
  name: 'gauge',
  props: {
    idName: {type: String},
    info: {type: Object}
  },
  data () {
    return {
      val: 1
    }
  },
  mounted () {
    if (this.info.num) {
      // this.setAnimate(this.info)
      this.setGaugeOption(this.info)
      if (this.info.name.indexOf('转速') >= 0) {
        this.val = parseInt(this.info.num)
      } else {
        this.val = this.info.num
      }
      this.setRollNum(this.idName, this.val, 2)
    }
  },
  methods: {
    setGaugeOption (info) {
      let max = info.maxNum || info.num * 3
      let center = ['50%', 121]
      let option = {
        grid: {
          left: 'left'
        },
        series: [
          {
            name: '刻度',
            type: 'gauge',
            radius: '120',
            min: 0,
            max: max,
            splitNumber: 10, // 刻度数量
            // startAngle: 180,
            // endAngle: 0,
            center,
            // 仪表盘轴线相关配置
            axisLine: {
              show: true,
              lineStyle: {
                width: 16,
                color: [[1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {offset: 0.01, color: '#00b7ff'},
                  {offset: 0.66, color: '#00d8d6'},
                  {offset: 0.85, color: '#eb2424'},
                  {offset: 1, color: '#bc1d01'}
                ])]]
              }
            },
            // 仪表盘轴线文字相关配置
            axisLabel: {
              show: true,
              distance: 5,
              color: 'rgba(0,183,255, 0.7)',
              fontSize: 8,
              fontFamily: 'PingFang-SC-Medium',
              formatter: function (value) {
                return parseInt(value)
              }
            },
            // 刻度标签。
            axisTick: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255, 0.3)',
                width: 1
              },
              length: 16,
              splitNumber: 5 // ?
            },
            // 分隔线样式
            splitLine: {
              show: false,
              length: 16,
              linkStyle: {
                width: 1
              }
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: false
            },
            itemStyle: {
              color: '#00b7ff'
            },
            // 仪表盘指针
            pointer: {
              show: true,
              length: 90,
              width: 4
            },
            data: [{value: info.num}]
          }
        ]
      }
      echarts.init(document.getElementById(this.idName)).setOption(option)
      // return option
    },
    // 使数字旋转
    setRollNum (id, num, fix) {
      // 获取小数和整数部分
      let newNum = parseFloat(num).toFixed(fix) + ''
      let numArr = newNum.split('.')
      let numLeft = numArr[0]
      let numRight = numArr[1]
      // eslint-disable-next-line
      $(`#${id}left`).rollNum({
        deVal: numLeft,
        digit: numLeft.length
      })
      if (numRight !== '00') {
        // eslint-disable-next-line
        $(`#${id}right`).rollNum({
          deVal: numRight,
          digit: fix
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@dataNumsH: 28px;
@dataNumsW: 14px;
.gauge{
  height: 100%;
  .gauge-image{
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  /*.speed{*/
    /*margin-top: 16px;*/
  /*}*/
  .num{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 100;
    bottom: 30px;
    left: 0;
    width: 100%;
    height: @dataNumsH;
    font-size: @dataNumsH;
    font-family: Impact;
    color: #00b7ff;
  }
  .gauge-title{
    position: absolute;
    top: 72px;
    width: 100%;
    z-index: 100;
    text-align: center;
    color: #fff;
    font-size: 20px;
    font-family: PingFangSC-Semibold;
  }
}
</style>
