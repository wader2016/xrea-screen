<template>
  <div class="radar">
    <h4 class="radar-title">{{info.name}}</h4>
    <div class="radar-image" :id="idName"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'radar',
  props: {
    idName: {type: String},
    info: {type: Object}
  },
  mounted () {
    if (this.info.data) {
      this.createRadar(this.info.data)
    }
  },
  methods: {
    createRadar (info) {
      let values = info.map((item) => {
        return item.value
      })
      let option = {
        radar: {
          indicator: info,
          center: ['50%', '52%'],
          radius: 72,
          shape: 'circle',
          name: {
            textStyle: {
              color: 'rgba(255,255,255, 0.7)',
              fontSize: 12,
              fontFamily: 'PingFang-SC-Medium'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0,183,255, 0.1)'
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,183,255, 0.1)'
            }
          }
        },
        series: {
          type: 'radar',
          symbol: 'none',
          itemStyle: {
            normal: {
              color: 'rgba(1,217,214)'
            }
          },
          areaStyle: {
            normal: {
              opacity: 0.5
            }
          },
          lineStyle: {
            normal: {
              width: 1,
              opacity: 0.5
            }
          },
          data: [
            {
              value: values
            }
          ]
        }
      }
      echarts.init(document.getElementById(this.idName)).setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.radar-title{
  font-size: 14px;
  font-family: PingFangSC-Semibold;
  color: #fff;
}
.radar-image{
  width: 100%;
  height: 200px;
}
</style>
