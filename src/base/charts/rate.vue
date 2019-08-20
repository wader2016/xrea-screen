<template>
  <div class="rate">
    <div :id="rate"></div>
    <div class="rate-name">{{item.name}}</div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
// eslint-disable-next-line
let liquidfill = require('echarts-liquidfill')
export default {
  props: ['index', 'item'],
  mounted () {
    this.setCharts()
  },
  computed: {
    rate () {
      return 'rate_' + this.index
    }
  },
  methods: {
    setCharts () {
      let value = this.item.value / 100
      let option = {
        series: [{
          type: 'liquidFill',
          data: [value],
          color: ['rgba(0,183,255)'],
          radius: '90%',
          waveAnimation: true,
          animationEasing: 'linear',
          animationEasingUpdate: 'linear',
          animationDuration: 2000,
          animationDurationUpdate: 1000,
          outline: {
            borderDistance: 0,
            itemStyle: {
              borderWidth: 0
            }
          },
          backgroundStyle: {
            color: 'rgba(0,183,255,0.3)'
          },
          label: {
            show: true,
            color: '#fff',
            insideColor: '#fff',
            fontSize: 28,
            fontWeight: 'bold',
            align: 'center',
            baseline: 'middle',
            position: 'inside'
          }
        }]
      }
      let node = 'rate_' + this.index
      setTimeout(() => {
        echarts.init(document.getElementById(node)).setOption(option)
      }, 200)
    }
  }
}
</script>

<style lang="less">
  .rate {
    flex: 1;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
  #rate_0,#rate_1,#rate_2 {
    width: 100%;
    height: 100%;
    margin-bottom: 8px;
  }
  .rate-name {
    font-size: 14px;
    font-family: PingFangSC-Semibold;
  }
  }
</style>
