<template>
  <div class="circle-percent">
    <div class="circle-rate" :id="rate"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'circle',
  props: ['index', 'item'],
  mounted () {
    this.setCharts()
  },
  computed: {
    rate () {
      return 'rate_percent_' + this.index
    }
  },
  methods: {
    setCharts () {
      let value = this.item.percentage
      let option = {
        title: {
          text: `${value}%`,
          left: 'center',
          top: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            fontFamily: 'PingFangSC-Semibold'
          }
        },
        series: [{
          type: 'pie',
          startAngle: 90,
          radius: ['88%', '89%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          data: [
            {
              name: 'gap',
              value: value,
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                  color: 'rgba(255, 255, 255, 1)',
                  borderColor: 'rgba(255, 255, 255, 1)',
                  borderWidth: 5
                }
              }
            }, {
              value: 100 - value,
              name: 'completed',
              itemStyle: {
                normal: {
                  borderWidth: 5,
                  borderColor: {
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(0, 183, 255, 0.3)' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: 'rgba(0, 183, 255, 0.3)' // 100% 处的颜色
                    }]
                  },
                  color: { // 完成的圆环的颜色
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(0, 183, 255, 0.3)' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: 'rgba(0, 183, 255, 0.3)' // 100% 处的颜色
                    }]
                  },
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              }
            }]
        }]
      }
      let node = 'rate_percent_' + this.index
      setTimeout(() => {
        echarts.init(document.getElementById(node)).setOption(option)
      }, 200)
    }
  }
}
</script>

<style scoped lang="less">
.circle-percent {
  width: 100%;
  height: 100%;
  .circle-rate {
    width: 56px;
    height: 56px;
  }

}
</style>
