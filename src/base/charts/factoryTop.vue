<template>
  <div class="factory-top">
    <div class="factory-info">
      <div class="into-left">
        <p>{{item.value}}</p>
        <p>{{item.name}}</p>
      </div>
      <bg border-w="8px">
        <div class="info-icon">
          <div class="iconfont" :class="item.class"></div>
        </div>
      </bg>
    </div>
    <div class="factory-ball">
      <div class="ball" :class="{'isActive':isActive}" :style="{'background':background}"></div>
    </div>
    <div class="factory-state">
      <div class="state-circle" :style="color2">
        <div :id="circle" class="rate"></div>
      </div>
      <div class="progress">
        <div class="progress-info" v-for="(info,key) in APQInfo" :key="key">
          <div class="progress-item">{{info.name}}</div>
          <div class="progress-percent" :class="{'progress-A':info.name === 'A','progress-P':info.name === 'P','progress-Q':info.name === 'Q'}">
            <div class="progress-color" :style="{width:info.process}" :class="info.status === '1' ? 'progress-normal': 'progress-error'"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bg from '../bg/bg'
import * as echarts from 'echarts'
export default {
  name: 'factoryTop',
  props: {
    item: Object,
    index: Number,
    currentOrder: Array
  },
  data () {
    return {
      color: '#01d9d6',
      APQInfo: [],
      isActive: false,
      background: ''
    }
  },
  computed: {
    circle () {
      return 'circle_' + this.index
    },
    color2 () {
      return 'border-color: ' + this.color
    }
  },
  mounted () {
    this.APQInfo = this.item.APQInfo
    this.color = this.APQInfo[0].status === '1' ? '#01d9d6' : '#f05150'
    Array.from(this.currentOrder, x => {
      if (x.name === this.item.value) {
        this.isActive = true
        this.background = x.color
      }
    })
    this.setCharts()
  },
  methods: {
    setCharts () {
      let percent = this.item.progress
      let option = {
        title: {
          text: percent,
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: '24'
          }
        },
        color: ['rgba(255, 255, 255, 0)'],
        series: [{
          name: 'Line 1',
          type: 'pie',
          clockWise: true,
          radius: ['86%', '100%'],
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
          data: [{
            value: parseInt(percent),
            name: '01',
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: this.color // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: this.color // 100% 处的颜色
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
          }, {
            name: '02',
            value: (100 - parseInt(percent))
          }]
        }]
      }
      let node = 'circle_' + this.index
      setTimeout(() => {
        echarts.init(document.getElementById(node)).setOption(option)
      }, 200)
    }
  },
  components: {
    Bg
  }
}
</script>

<style scoped lang="less">
  .factory-top {
    margin-right: 24px;
    font-family: PingFangSC-Semibold;
    .factory-info {
      display: flex;
      align-items: center;
      .into-left {
        font-size: 18px;
        margin-right: 8px;
        p {
          margin: 8px 0;
        }
      }
      .info-icon {
        width: 58px;
        height: 58px;
        padding: 4px;
        border: 1px solid rgba(0,183,255,0.3);
        .iconfont {
          font-size: 45px;
          text-align: center;
          color: #00b7ff;
        }
      }
    }
    .factory-ball {
      width: 100%;
      border-bottom: 1px solid rgba(0,183,255,0.3);;
      .ball {
        width: 24px;
        height: 24px;
        margin: 16px 0 4px 0;
        border-radius: 50%;
      }
      .isActive {
        background-color: #0a6392;
      }
    }
    .factory-state {
      display: flex;
      .state-circle {
        height: 90px;
        width: 90px;
        border-radius: 50%;
        border: 2px solid #00cefc;
        margin: 8px 4px 0 0;
        position: relative;
        .rate {
          width: 90px;
          height: 90px;
          position: absolute;
          right: -1px;
          top: -2px;
        }
      }
      .progress {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .progress-info {
          display: flex;
          align-items: center;
          .progress-item {
            min-width: 13px;
            margin-left: 8px;
            margin-right: 4px;
          }
          .progress-percent {
            width: 54px;
            height: 8px;
            border: 1px solid #b5dcff;
            border-radius: 4px;
            .progress-color {
              height: 100%;
              border-radius: 4px;
            }
          }
          .progress-A,.progress-Q {
            .progress-normal {
              background: #01d9d6;
            }
            .progress-error {
              background: #f05150;
            }
          }
          .progress-P {
            .progress-normal {
              background: #00b7ff;
            }
            .progress-error {
              background: #f05150;
            }
          }
        }
      }
    }
  }
  .factory-top:last-child {
    margin-right: 0;
  }
</style>
