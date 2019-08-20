
<template>
  <div class="intelligentService">
        <div class="main">
          <div class="main-header">
            <top-info v-for="item in topInfo.data" :key="item.Id" :item="item" id-name="serviceTop"></top-info>
          </div>
          <div class="main-content">
            <div class="main-text">{{serviceTotalInfo.name}}</div>
            <div id="map"></div>
            <div class="example">
              <div class="list">
                <span class="point point1"></span>
                <span class="name">服务人员</span>
              </div>
              <div class="list">
                <span class="point point2"></span>
                <span class="name">服务车</span>
              </div>
            </div>
            <div class="footer">
              <bg border-w="10px" border-h="10px" border-size="2px">
                <div class="main-footer">
                  <top-info v-for="item in serviceTotalInfo.data" :key="item.Id" :item="item" id-name="serviceBottom"></top-info>
                </div>
              </bg>
            </div>
          </div>
        </div>
        <div class="right">
          <bg border-w="40px" border-h="214px">
            <border outer-h="214">
              <div slot="header">{{todayInfo.name}}</div>
              <div slot="content">
                <div class="corn-content">
                  <corn-border v-for="(item,index) in todayService" :item="item" :key="index"></corn-border>
                </div>
                <div class="corn-rate">
                  <div class="corn-left">
                    <div class="corn-text">{{todayRate.name}}</div>
                    <div class="corn-percent">{{todayRate.value}}{{todayRate.unit}}</div>
                  </div>
                  <div class="corn-right">
                    <div class="inner-percent">
                      <div class="percent active"></div>
                      <div class="percent active"></div>
                      <div class="percent active"></div>
                      <div class="percent active"></div>
                      <div class="percent active"></div>
                      <div class="percent active"></div>
                      <div class="percent active"></div>
                      <div class="percent active"></div>
                      <div class="percent active"></div>
                      <div class="percent active"></div>
                      <div class="percent active"></div>
                      <div class="percent active"></div>
                      <div class="percent active"></div>
                      <div class="percent active"></div>
                      <div class="percent"></div>
                      <div class="percent"></div>
                      <div class="percent"></div>
                      <div class="percent"></div>
                      <div class="percent"></div>
                      <div class="percent"></div>
                      <div class="actual-percent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </border>
          </bg>
          <bg border-w="40px" border-h="438px">
            <border outer-h="438">
              <div slot="header">{{completedService.name}}</div>
              <div slot="content">
                <div class="service-rate">
                  <rate v-for="(item,index) in completedService.data" :item="item" :index="index" :key="index"></rate>
                </div>
                <div class="orderBy-title">{{serviceAddress.name}}</div>
                <div class="service-orderBy" v-for="(item,index) in serviceAddress.data" :key="index">
                  <div class="orderBy">
                    <div class="orderBy-name" :class="{'first':index === 0 ,'second':index === 1 || index === 2 }">{{item.name}}</div>
                    <div class="orderBy-State">
                      <div class="active-state" :style="{'width':item.percentage + '%'}"></div>
                    </div>
                    <div class="orderBy-value" :class="{'first':index === 0 ,'second':index === 1 || index === 2 }">{{item.value}}</div>
                  </div>
                </div>
              </div>
            </border>
          </bg>
          <bg border-w="40px" border-h="242px">
            <border outer-h="242">
              <div slot="header">{{orderByYear.name}}</div>
              <div slot="content">
                <div class="service-curve">
                  <div id="curve"></div>
                </div>
              </div>
            </border>
          </bg>
        </div>
  </div>
</template>

<script>
import BMap from 'BMap'
import * as echarts from 'echarts'
import TopInfo from './../../base/devices-topInfo/devices-topInfo'
import Bg from './../../base/bg/bg'
import border from './../../base/border/border'
import CornBorder from '../../base/border/cornBorder'
import rate from '../../base/charts/rate'
const mapv = require('mapv')
// eslint-disable-next-line
import {mapStyle} from "../../../static/js/mapStyle"
export default {
  name: 'intelligentService',
  data () {
    return {
      topInfo: [],
      todayInfo: [],
      todayService: [],
      todayRate: {},
      completedService: [],
      serviceAddress: [],
      serviceTotalInfo: [],
      orderByYear: [],
      map: ''
    }
  },
  mounted () {
    this.getTopInfo()
    this.getTodayInfo()
    this.getCompletedService()
    this.getServiceAddress()
    this.getServiceTotalInfo()
    this.getOrderByYear()
    this.createMap()
    this.getMapData()
  },
  methods: {
    getTopInfo () {
      this.axios.get('../static/data/intelligentService/智能服务订单总信息.json').then(res => {
        if (res.status === 200) {
          this.topInfo = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getTodayInfo () {
      this.axios.get('../static/data/intelligentService/今日服务订单信息.json').then(res => {
        if (res.status === 200) {
          this.todayInfo = res.data
          this.todayService = this.todayInfo.data.slice(0, 3)
          this.todayRate = res.data.data[3]
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getCompletedService () {
      this.axios.get('../static/data/intelligentService/服务完成率.json').then(res => {
        if (res.status === 200) {
          this.completedService = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getServiceAddress () {
      this.axios.get('../static/data/intelligentService/服务网点排名.json').then(res => {
        if (res.status === 200) {
          this.serviceAddress = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getServiceTotalInfo () {
      this.axios.get('../static/data/intelligentService/智能服务总体信息.json').then(res => {
        if (res.status === 200) {
          this.serviceTotalInfo = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getOrderByYear () {
      this.axios.get('../static/data/intelligentService/近一年订单数.json').then(res => {
        if (res.status === 200) {
          this.orderByYear = res.data
          let xData = []
          let yData = []
          this.orderByYear.data.forEach(item => {
            xData.push(parseInt(item.orderDate.slice(5, 7)).toString() + '月')
            yData.push(item.value)
          })
          this.setECharts(xData, yData)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    async createMap () {
      let map = new BMap.Map('map', {
        enableMapClick: false
      })
      map.centerAndZoom(new BMap.Point(105.403119, 34.028658), 5)
      map.enableScrollWheelZoom(true)
      map.setMapStyle({styleJson: mapStyle})
      this.map = map
    },
    async getMapData () {
      await this.axios.get('static/data/intelligentService/服务网点分布.json').then(res => {
        if (res.status === 200) {
          let result = this.setMapVData(res.data.RECORDS)
          this.setMapV(result, '#00b7ff')
        }
      })
      await this.axios.get('static/data/intelligentService/服务人员.json').then(res => {
        if (res.status === 200) {
          let result = this.setMapVData(res.data.RECORDS)
          this.setMapV(result, 'rgba(248, 222, 39, 1)')
        }
      })
    },
    setMapVData (data) {
      let dataInfo = []
      data.forEach(val => {
        dataInfo.push({
          geometry: {
            type: 'Point',
            coordinates: [val.LNG, val.LAT]
          },
          count: val.ID
        })
      })
      return dataInfo
    },
    setMapV (data, color) {
      let dataSet = new mapv.DataSet(data)
      let options = {
        fillStyle: color,
        globalCompositeOperation: 'lighter',
        methods: {
          click: function (item) {
            console.log(item)
          }
        },
        size: 5,
        draw: 'simple'
      }
      // eslint-disable-next-line
      let mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options)
    },
    setECharts (xData, yData) {
      let option = {
        tooltip: {
          backgroundColor: 'rgba(0,183,255, 0.7)',
          extraCssText: 'box-shadow: 0 0 8px rgba(0,183,255, 0.7)',
          textStyle: {
            fontSize: '14px',
            color: '#fff'
          },
          trigger: 'axis',
          padding: 4,
          formatter: function (params) {
            return params[0].name + '<br />' + params[0].value
          }
        },
        grid: {
          top: '20px',
          left: '42px',
          right: '20px',
          bottom: '38px',
          cantainLabel: true
        },
        xAxis: {
          type: 'category',
          // 设置两边是否有空间
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: 'rgba(0,183,255, 0.3)'
            },
            onZero: false
          },
          axisLabel: {
            color: 'rgba(0,183,255, 0.7)'
          },
          axisTick: {
            show: false
          },
          data: xData,
          axisPointer: {
            show: true,
            type: 'line',
            lineStyle: {
              color: '#fe4d45'
            }
          },
          nameLocation: 'center',
          nameGap: 10
        },
        yAxis: {
          splitLine: {show: false},
          axisLine: {
            lineStyle: {
              color: 'rgba(0,183,255, 0.3)'
            }
          },
          axisTick: {
            show: false
          },
          type: 'value',
          boundaryGap: true,
          axisLabel: {
            color: 'rgba(0,183,255, 0.7)',
            formatter: function (value) {
              return value
            }
          }
        },
        series: [{
          data: yData,
          type: 'line',
          smooth: true, // 平滑显示曲线
          symbolSize: 4,
          symbol: 'circle',
          showSymbol: false,
          itemStyle: {
            color: '#fff',
            borderColor: '#00b7ff',
            borderWidth: 2
          },
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#00b7ff' // 0% 处的颜色
              }, {
                offset: 1, color: '#01d9d6' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            },
            width: 2,
            shadowBlur: 4,
            shadowColor: '#00b7ff'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(0,183,255, 0.5)' // 0% 处的颜色
              }, {
                offset: 0.8, color: 'rgba(83,192,238, 0)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        }]
      }
      echarts.init(document.getElementById('curve')).setOption(option)
    }
  },
  components: {
    TopInfo,
    Bg,
    border,
    CornBorder,
    rate
  }
}
</script>
  <style scoped lang="less">
    @keyframes width-percent {
     0% {
       width: 0;
     }
    }
    .intelligentService {
      display: flex;
      .main {
        flex: 1;
        align-items: stretch;
        margin-right: 24px;
        .main-header {
          display: flex;
          justify-content: space-between;
          padding: 15px;
          background: linear-gradient(to right,rgba(38,116,186,0.3),rgba(84,206,254,0.3),rgba(38,116,186,0.3));
          border: 1px solid rgba(0,133,255,0.7);
        }
        .main-content {
          height: 812px;
          width: 100%;
          margin: 24px 0;
          border: 1px solid rgba(0,183,255,0.3);
          position: relative;
          .main-text {
            position: absolute;
            top: 16px;
            left: 50%;
            margin-left: -96px;
            z-index: 10;
            font-size: 24px;
            font-family: PingFangSC-Semibold;
          }
          #map {
            width: 100%;
            height: 100%;
          }
          .example {
            position: absolute;
            right: 24px;
            bottom: 130px;
            display: flex;
            flex-direction: column;
            .list {
              font-size: 12px;
              margin-bottom: 16px;
              .point {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                margin-right: 8px;
                display: inline-block;
              }
              .point1 {
                background: #00b7ff;
              }
              .point2 {
                background: rgba(248, 222, 39, 1);
              }
            }
          }
          .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 10;
          }
          .main-footer {
            display: flex;
            justify-content: space-between;
            padding: 15px;
            background: linear-gradient(to right,rgba(38,116,186,0.3),rgba(84,206,254,0.3),rgba(38,116,186,0.3));
            border: 1px solid rgba(0,133,255,0.3);
          }
        }
      }
      .right {
        flex: 0 0 378px;
        align-items: stretch;
        .corn-content {
          display: flex;
          margin-top: 16px;
          .corn-border {
            margin-right: 16px;
          }
          & .corn-border:last-child {
            margin-right: 0;
          }
        }
        .corn-rate {
          display: flex;
          margin-top: 16px;
          .corn-left {
            flex: 0 0 auto;
            margin-right: 8px;
            .corn-text {
              font-size: 14px;
            }
            .corn-percent {
              font-size: 24px;
              font-family: Impact;
            }
          }
          .corn-right {
            flex: 1;
            border: 1px solid #00b7ff;
            padding: 4px 4px 4px 0;
            overflow: hidden;
            display: flex;
            .inner-percent {
              width: 100%;
              position: relative;
              display: flex;
              .percent {
                height: 38px;
                margin-left: 4px;
                flex: 1;
                background-color: rgba(0,183,255,0.3);
              }
              .active {
                background: linear-gradient(#00b7ff,#01d9d6);
              }
            }
          }
        }
        .service-rate {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: space-between;
          margin: 16px 0;
        }
        .orderBy-title {
          padding-top: 24px;
          padding-bottom: 8px;
          font-size: 14px;
        }
        .service-orderBy {
          .orderBy {
            display: flex;
            height: 32px;
            line-height: 32px;
            margin-bottom: 8px;
            .orderBy-name,.orderBy-value {
              flex: 0 0 auto;
              color: #00b7ff;
            }
            .orderBy-name {
              font-size: 14px;
            }
            .orderBy-value {
              font-size: 18px;
              font-family: Impact;
            }
            .first {
              color: #fe4d45;
            }
            .second {
              color: #ff9900;
            }
            .orderBy-State {
              flex: 1;
              background: rgba(0,183,255,0.3);
              border-radius: 8px;
              height: 16px;
              margin: 8px 16px;
              position: relative;
              .active-state {
                position: absolute;
                top: 0;
                left: 0;
                background: linear-gradient(right,rgba(0,183,255,1),rgba(1,217,214,1));
                background: -webkit-linear-gradient(right,rgba(0,183,255,1),rgba(1,217,214,1));
                height: 16px;
                border-radius: 8px;
                animation: width-percent 2s linear;
              }
            }
          }
        }
        .service-curve {
          #curve {
            height: 184px;
            width: 100%;
          }
        }
      }
    }
</style>
