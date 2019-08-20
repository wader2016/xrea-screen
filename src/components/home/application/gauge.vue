<template>
  <div class="gauge">
    <div class="gauge-item" :id="gauge"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'gauge',
  props: ['index', 'item'],
  data () {
    return {
      color: ['rgba(0,183,255,1)', 'rgba(250,217,97,1)', 'rgba(245,81,95,1)']
    }
  },
  mounted () {
    this.setCharts()
  },
  computed: {
    gauge () {
      return 'gauge_' + this.index
    }
  },
  methods: {
    setCharts () {
      let name = this.item.name
      let value = parseInt(this.item.description)
      let color = this.color[this.index]
      let flag = this.item.flag
      let percent = value / 100
      let option = {
        series: [{
          name: '',
          type: 'gauge',
          center: ['50%', '59%'], // 默认全局居中
          radius: '116%',
          axisLine: {
            show: false,
            lineStyle: { // 属性lineStyle控制线条样式
              color: [
                [percent, color],
                [1, 'rgba(0, 183, 255, 0.3)']
              ],
              width: 24
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false,
            length: '0',
            width: '0'
          },
          detail: {
            fontSize: 40,
            formatter: [
              '{a|' + name + '}',
              '{c|' + flag + '}{b|' + value + '%}'
            ].join('\n'),
            offsetCenter: [0, '0%'],
            rich: {
              a: {
                fontSize: 20,
                color: '#fff',
                fontFamily: 'PingFangSC-Semibold'
              },
              b: {
                fontSize: 28,
                color: '#fff',
                fontFamily: 'Impact',
                padding: [0, 0, 8, 0]
              },
              c: {
                color: '#fff',
                fontSize: 20,
                fontFamily: 'PingFangSC-Semibold',
                padding: [0, 0, 15, 0]

              }
            }
          },
          data: [{
            value: 40,
            label: {
              textStyle: {
                fontSize: 20
              }
            }
          }]

        }]
      }
      let node = 'gauge_' + this.index
      setTimeout(() => {
        echarts.init(document.getElementById(node)).setOption(option)
      }, 200)
    }
  }
}
</script>

<style scoped>
.gauge, .gauge-item{
  width: 100%;
  height: 100%;
}
</style>
