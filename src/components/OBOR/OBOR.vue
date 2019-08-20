<template>
  <div class="OBOR">
    <div class="container">
      <div class="main">
        <div id="map">
          <baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view">
          </baidu-map>
        </div>
      </div>
      <div class="right">
        <bg border-w="40px" border-h="136px">
          <border outer-h="136">
            <div slot="header">设备连接总数</div>
            <div slot="content">
              <div class="total">
                <div id="number"></div>
                <div class="unit">台</div>
              </div>
            </div>
          </border>
        </bg>
       <bg border-w="40px" border-h="460px">
         <border outer-h="460">
           <div slot="header">{{areaTop.name}}</div>
           <div slot="content">
             <div class="orderBy" v-for="(item,index) in areaTop.data" :key="index">
               <div class="orderBy-index" :class="{'first':index === 0 ,'second':index === 1 || index === 2 }">{{index + 1}}</div>
               <div class="orderBy-name" :class="{'first':index === 0 ,'second':index === 1 || index === 2 }">{{item.name}}</div>
               <div class="orderBy-state">
                 <div class="active-state" :style="{'width':item.percentage + '%'}"></div>
               </div>
               <div class="orderBy-value" :class="{'first':index === 0 ,'second':index === 1 || index === 2 }">{{item.value}}</div>
             </div>
           </div>
         </border>
       </bg>
        <bg border-w="40px" border-h="298px">
          <border outer-h="298">
            <div slot="header">设备运行趋势</div>
            <div slot="content">
              <div id="barLine"></div>
            </div>
          </border>
        </bg>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/js/numbergd'
import * as echarts from 'echarts'
import Border from './../../base/border/border'
import Bg from './../../base/bg/bg'
export default {
  name: 'OBOR',
  data () {
    return {
      center: {lng: 2.790037, lat: 53.792707},
      zoom: 3,
      areaTop: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setRollNumber('number', '00672705', 8)
    })
    this.getAreaTop()
    this.getRun()
  },
  methods: {
    handler ({BMap, map}) {
      this.center.lng = 50.071645
      this.center.lat = 40.153863
      this.zoom = 3
      let styleJson = [{
        'featureType': 'background',
        'elementType': 'geometry',
        'stylers': {
          'color': '#10477aff'
        }
      }, {
        'featureType': 'land',
        'elementType': 'geometry',
        'stylers': {
          'color': '#313c48ff'
        }
      }, {
        'featureType': 'districtlabel',
        'elementType': 'labels.text.stroke',
        'stylers': {
          'weight': 0,
          'color': '#ffffff00'
        }
      }, {
        'featureType': 'districtlabel',
        'elementType': 'labels.text.fill',
        'stylers': {
          'color': '#ffffffff'
        }
      }, {
        'featureType': 'country',
        'elementType': 'labels',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'continent',
        'elementType': 'labels',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'continent',
        'elementType': 'labels.text.stroke',
        'stylers': {
          'color': '#ffffff00'
        }
      }, {
        'featureType': 'country',
        'elementType': 'labels.text.stroke',
        'stylers': {
          'color': '#ffffff00'
        }
      }]
      map.setMapStyle({styleJson: styleJson})
      map.enableScrollWheelZoom()
      this.overlay = [{'lang': 96.984197, 'lat': 39.75226, 'name': '中国', 'val': 515609},
        {'lang': 75.201798, 'lat': 59.157788, 'name': '俄罗斯', 'val': 800},
        {'lang': -101.117895, 'lat': 39.067211, 'name': '美国', 'val': 5000},
        {'lang': -51.665961, 'lat': -11.317332, 'name': '巴西', 'val': 5916},
        {'lang': 20.745799, 'lat': 2.831591, 'name': '刚果', 'val': 516},
        {'lang': 132.895721, 'lat': -23.444237, 'name': '澳大利亚', 'val': 910}]
    },
    setRollNumber (id, num, digit) {
      // 获取小数和整数部分
      let newNum = parseFloat(num) + ''
      // eslint-disable-next-line
      $(`#${id}`).rollNum({
        deVal: newNum,
        digit: digit || newNum.length
      })
    },
    getAreaTop () {
      this.axios.get('../static/data/OBOR/区域排名.json').then(res => {
        if (res.status === 200) {
          this.areaTop = res.data
        }
      })
    },
    getRun () {
      this.axios.get('../static/data/OBOR/设备运行趋势.json').then(res => {
        if (res.status === 200) {
          this.runTrend = res.data
          this.setBarLine('barLine', this.runTrend.data)
        }
      })
    },
    setBarLine (id, data) {
      let yData = []
      let xData = []
      Array.from(data[0].dataList, x => {
        yData.push(x.value)
        xData.push(x.workTime)
      })
      let maxValue = Math.max.apply(null, yData)
      let bgData = []
      bgData = data[0].dataList.map((item) => {
        return {
          name: item.name,
          value: maxValue + 1000
        }
      })
      let legend1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAAG64y5nAAAAAXNSR0IArs4c6QAAAHlJREFUGBljZLj6n43hEcNPBobt//8zgggGKGBk2PH/GcN/BkkGRoZOHDIwtVCaCUgvQhMDc0FmdQDNKodLMjI8Z5BlUEAxF1kSZBQmALoGuwTYieh2YOpHiKD7CSGDm8UEDInnuKXRZIBqmUBeBAUfXo0gQ0FqgGoBd04quZu7+D4AAAAASUVORK5CYII='
      let barWidth = 16
      let option = {
        grid: {
          top: 30,
          left: 30,
          right: 0,
          bottom: 10
        },
        legend: {
          show: true,
          z: 10,
          right: 0,
          itemWidth: 12,
          itemHeight: 8,
          textStyle: {
            color: '#B5DCFF',
            fontSize: 10,
            fontFamily: 'PingFang-SC-Medium'
          },
          data: [
            {
              name: '设备数量',
              icon: 'image://' + legend1
            }
          ]
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisLine: {
              lineStyle: {
                color: 'rgba(0,183,255, 0.3)'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              margin: 2,
              textStyle: {
                color: 'rgba(0,183,255, 0.7)',
                fontSize: 8,
                fontFamily: 'PingFang-SC-Medium'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: data[0].dataList[0].unit,
            nameLocation: 'end',
            nameTextStyle: {
              color: 'rgba(0,183,255, 0.7)',
              fontSize: 8,
              fontFamily: 'PingFang-SC-Medium',
              align: 'left'
            },
            nameGap: 5,
            splitLine: {show: false},
            axisLine: {
              lineStyle: {
                color: 'rgba(0,183,255, 0.3)'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              margin: 5,
              textStyle: {
                color: 'rgba(0,183,255, 0.7)',
                fontSize: 8,
                fontFamily: 'PingFang-SC-Medium'
              }
            }
          }
        ],
        series: [
          {
            name: '背景',
            type: 'pictorialBar',
            yAxisIndex: 0,
            barCategoryGap: 0,
            itemStyle: {
              normal: {
                color: 'rgba(0,183,255, 0.3)'
              }
            },
            symbol: 'rect',
            symbolSize: [barWidth, barWidth / 4],
            symbolRepeat: true,
            data: bgData
          },
          {
            name: '设备数量',
            type: 'bar',
            yAxisIndex: 0,
            barGap: '-100%',
            barWidth: barWidth,
            z: 3,
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(0,184,254, 0.7)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,184,254, 0.3)'
                    }
                  ]
                }
              }
            },
            data: yData
          }
        ]
      }
      setTimeout(function () {
        echarts.init(document.getElementById(id)).setOption(option)
      }, 200)
    }
  },
  components: {
    Border,
    Bg
  }
}
</script>

<style scoped lang="less">
  @keyframes width-percent {
    0% {
      width: 0;
    }
  }
.container {
  display: flex;
  height: 100%;
  width: 100%;
  .main {
    flex: 1;
    border: 1px solid rgba(0,183,255,0.3);
    height: 100%;
    #map {
      width: 100%;
      height: 100%;
      .bm-view {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right {
    flex: 0 0 412px;
    height: 100%;
    margin-left: 24px;
    .total {
      display: flex;
      align-items: flex-end;
      margin-top: 16px;
      .unit {
        font-size: 12px;
        color: #b5dcff;
        font-family: PingFang-SC_Medium;
      }
    }
    .orderBy {
      display: flex;
      height: 24px;
      line-height: 24px;
      font-size: 18px;
      font-family: PingFangSC-Semibold;
     margin-top: 16px;
      .orderBy-index {
        flex: 0 0 19px;
        margin-right: 4px;
      }
      .orderBy-name {
        flex: 0 0 116px;
      }
      .orderBy-state {
        flex: 1;
        background: rgba(0,183,255,0.3);
        border-radius: 8px;
        height: 16px;
        margin: 4px 8px 4px 16px;
        position: relative;
        .active-state {
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          background: linear-gradient(right,rgba(0,183,255,1),rgba(1,217,214,1));
          background: -webkit-linear-gradient(right,rgba(0,183,255,1),rgba(1,217,214,1));
          height: 16px;
          border-radius: 8px;
          animation: width-percent 1s linear;
        }
      }
      .orderBy-value {
        flex: 0 0 36px;
        font-family: Impact;
       text-align: center;
      }
      .first {
        color: #fe4d45;
      }
      .second {
        color: #ff9900;
      }
    }
    #barLine {
      width: 100%;
      height: 238px;
    }
  }
}
</style>
