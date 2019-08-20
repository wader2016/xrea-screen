<template>
  <div class="thermometer">
    <h4 class="ther-title">{{info.name}}</h4>
    <div class="ther-image" :id="idName"></div>
    <div class="num">
      <div :id="idName+'left'"></div>
      <div class="dot">.</div>
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
  name: 'thermometer',
  props: {
    idName: {type: String},
    info: {type: Object}
  },
  mounted () {
    if (this.info.num) {
      this.createThermometer(this.info)
      this.setRollNum(this.idName, this.info.num, 2)
    }
  },
  methods: {
    createThermometer (info) {
      // 定义刻度
      let kd = []
      for (var i = 0, len = 130; i <= len; i++) {
        kd.push('0')
      }
      let gradius = this.getTherColor(info.num)
      let option = {
        yAxis: [
          {
            show: false,
            min: 0,
            max: 100
          },
          {
            show: false,
            data: [],
            min: 0,
            max: 100
          }
        ],
        xAxis: [
          {
            show: false,
            data: []
          },
          {
            show: false,
            data: []
          },
          {
            show: false,
            data: []
          },
          {
            show: false,
            min: -110,
            max: 100
          }
        ],
        grid: {
          top: '20px',
          left: 'auto',
          right: '-10px',
          bottom: '15px',
          cantainLabel: true
        },
        series: [
          {
            name: '条',
            type: 'bar',
            // 对应上面XAxis的第一个对象配置
            xAxisIndex: 0,
            data: [info.num],
            barWidth: 14,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, gradius),
                barBorderRadius: 12
              }
            },
            label: {
              show: false
            },
            z: 2,
            // 设置动画时长
            animationDuration: 4000
          },
          {
            name: '内框',
            type: 'bar',
            xAxisIndex: 1,
            barGap: '-100%',
            data: [100],
            barWidth: 14,
            animation: false,
            itemStyle: {
              normal: {
                color: '#195473',
                barBorderRadius: 12
              }
            },
            z: 1,
            // 设置动画时长
            animationDuration: 4000
          },
          {
            name: '外框',
            type: 'bar',
            xAxisIndex: 2,
            barGap: '-100%',
            data: [102],
            barWidth: 16,
            animation: false,
            itemStyle: {
              normal: {
                color: '#00b7ff',
                barBorderRadius: 12
              }
            },
            z: 0
          },
          {
            name: '圆',
            type: 'scatter',
            hoverAnimation: false,
            data: [0],
            xAxisIndex: 0,
            symbolSize: 24,
            animation: false,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 1, color: '#00b7ff'
                  },
                  {
                    offset: 0.5, color: '#00bbfb'
                  },
                  {
                    offset: 0, color: '#00bef6'
                  }
                ]),
                opacity: 1
              }
            },
            z: 2
          },
          {
            name: '刻度',
            type: 'bar',
            yAxisIndex: 1,
            xAxisIndex: 3,
            animation: false,
            label: {
              normal: {
                show: true,
                position: 'left',
                distance: 18,
                fontSize: 12,
                color: 'rgba(0,183,255, 0.7)',
                formatter: function (params) {
                  // 因为柱状初始化为0，温度存在负值，所以，原本的0-100，改为0-130，0-30用于表示负值
                  if (params.dataIndex > 100 || params.dataIndex < 0) {
                    return ''
                  } else {
                    if (params.dataIndex % 20 === 0 || params.dataIndex === 0) {
                      return params.dataIndex + info.unit
                    } else {
                      return ''
                    }
                  }
                }
              }
            },
            barGap: '-100%',
            data: kd,
            barWidth: 1,
            itemStyle: {
              normal: {
                color: 'transparent',
                barBorderRadius: 12
              }
            },
            z: 0
          }
        ]
      }
      echarts.init(document.getElementById(this.idName)).setOption(option)
    },
    // 获取温度计的温度颜色值
    getTherColor (num) {
      let colors = ['#a94d61', '#00c8e9', '#01d3de', '#29b7b9', '#8d6575', '#00b7ff']
      let endColorIndex = num % 20 ? Math.floor(num / 20) : Math.floor(num / 20) - 1
      let endColor = colors[endColorIndex]
      if (num > 50) {
        return [
          {
            offset: 0, color: endColor
          },
          {
            offset: 1 - (50 / num), color: '#01d9d6'
          },
          {
            offset: 0.8, color: '#00bbfb'
          }
        ]
      } else if (num === 50) {
        return [
          {
            offset: 0, color: '#01d9d6'
          },
          {
            offset: 0.8, color: '#00bbfb'
          }
        ]
      } else {
        return [
          {
            offset: 0, color: endColor
          },
          {
            offset: 0.8, color: '#00bbfb'
          }
        ]
      }
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
      // eslint-disable-next-line
      $(`#${id}right`).rollNum({
        deVal: numRight,
        digit: fix
      })
    }
  }
}
</script>

<style lang="less" scoped>
@dataNumsH: 20px;
@dataNumsW: 12px;
.thermometer{
  height: 100%;
  width: 100%;
  .ther-title{
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 20px;
    font-family: PingFangSC-Semibold;
    white-space: nowrap;
  }
  .ther-image{
    height: 170px;
  }
  .num{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: @dataNumsH;
    font-size: @dataNumsH;
    font-family: Impact;
    color: #00b7ff;
    .dot{
      position: relative;
      top: -2px;
    }
  }
}
</style>
