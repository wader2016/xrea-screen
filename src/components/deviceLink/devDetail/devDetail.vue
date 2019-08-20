<template>
  <div class="dev-detail">
    <div class="dev-detail-1">
      <kuang class="info info1" :name="info1.name">
        <div id="info1"></div>
      </kuang>
      <kuang class="info info2" :name="info3.name">
        <div id="info2"></div>
      </kuang>
      <kuang class="info info4" :name="info2.name">
        <div class="padding">
          <div id="record" ref="record">
            <ul>
              <li v-for="(item,index) in info2.data" :key="index">
                <span>{{item.ALARMNAME}}</span>
                <div class="text-scroll" ref="textScroll1">
                  <span :title="item.CONTENT">{{item.CONTENT}}</span>
                  <i></i>
                  <!--<span>{{item.CONTENT}}</span>-->
                </div>
                <span>{{item.STARTTIME.split(" ")[1]}}</span>
              </li>
            </ul>
          </div>
        </div>
      </kuang>
    </div>
    <div class="dev-detail-2">
      <div class="top">
        <div class="img">
          <img :src="image" alt="">
        </div>
        <div class="top-list">
          <kuang class="pos" name="设备位置">
            <div class="padding" id="pos"></div>
            <bg v-show="pos.posName.length>0" class="posName" borderW="8px" border-size="2px">
              <p>{{pos.posName}}</p>
            </bg>
          </kuang>
          <Calendar :data="calendar"></Calendar>
        </div>
      </div>
      <div class="bottom">
        <kuang class="info info3" :name="info4.name">
          <div class="padding" id="info3">
            <div class="info3-content">
              <div class="image" v-for="(item,index) in info4.image" :class="item.image+'-img'" :key="index"
                   :style="{'width': item.image==='thermometer'&&item.name.length===5?'100px': '',
                            'flex-basis': item.image==='thermometer'&&item.name.length===5?'100px': ''}">
                <gauge v-if="item.image==='gauge'" :info="item" :id-name="'gauge'+index"></gauge>
                <thermometer v-if="item.image==='thermometer'" :info="item" :id-name="'thermometer'+index"></thermometer>
                <radar v-if="item.image==='radar'" :info="item" :id-name="'thermometer'+index"></radar>
              </div>
              <div ref="indicatorList" class="indicator-list">
                <ul>
                  <li v-for="(item,index) in info4.data" :key="index" :style="liStyle">
                    <span>{{item.name}}</span>
                    <span>{{item.num}}{{item.unit}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </kuang>
      </div>
    </div>
    <!--<div class="dev-detail-3">-->
      <!--<div class="health">-->
        <!--<div id="health"></div>-->
        <!--<h4 class="health-title">健康度</h4>-->
        <!--<div class="healthNum">-->
          <!--<div id="healthLeft"></div>-->
          <!--<div class="dot">.</div>-->
          <!--<div id="healthRight"></div>-->
          <!--<div class="unit">分</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<kuang class="info info3" :name="info4.name">-->
        <!--<div class="padding" id="info3">-->
          <!--<div ref="info3" class="info3-content">-->
            <!--<div ref="tu" class="tu">-->
              <!--<gauge class="image" v-for="(item,index) in info4.image" :key="index" :info="item" :id-name="'gauge'+index"></gauge>-->
            <!--</div>-->
            <!--<div ref="indicatorList" class="indicator-list">-->
              <!--<ul>-->
                <!--<li v-for="(item,index) in info4.data" :key="index">-->
                  <!--<span>{{item.name}}</span>-->
                  <!--<span>{{item.num}}{{item.util}}</span>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<div v-if="isTwoPage" class="tu tu2">-->
              <!--<gauge class="image" v-for="(item,index) in info4.image" :key="index" :info="item" :id-name="'gauge2'+index"></gauge>-->
            <!--</div>-->
            <!--<div v-if="isTwoPage" class="indicator-list">-->
              <!--<ul>-->
                <!--<li v-for="(item,index) in info4.data" :key="index">-->
                  <!--<span>{{item.name}}</span>-->
                  <!--<span>{{item.num}}{{item.util}}</span>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</kuang>-->
    <!--</div>-->
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'
import BMap from 'BMap'
import Kuang from '@/base/kuang/kuang'
import Gauge from '@/components/deviceLink/gauge/gauge'
import Thermometer from '@/components/deviceLink/thermometer/thermometer'
import Radar from '@/components/deviceLink/radar/radar'
import Calendar from '@/base/calendar/calendar'
import {mapStyle} from '../../../../static/js/mapStyle'
// eslint-disable-next-line
import '@/assets/js/numbergd'

export default {
  name: 'devDetail',
  data () {
    return {
      // 屏幕宽度
      screenWidth: document.documentElement.clientWidth,
      // 屏幕高度
      screenHeight: document.documentElement.clientHeight,
      pos: {
        posNum: {},
        posName: ''
      },
      calendar: [],
      info1: [],
      info2: [],
      info3: [],
      info4: {
        name: '',
        image: [],
        data: []
      },
      health: 100,
      image: '',
      scrollLiH: 32,
      scrollTime: null,
      scrollSpeed: 30,
      scrollDelay: 2000,
      scrollTime3: null,
      scrollSpeed3: 30,
      scrollDelay3: 1000,
      // scrollTime2: null,
      // scrollSpeed2: 50,
      // isTwoPage: false,
      info3H: 0,
      timer: null,
      currentIndex1: -1,
      currentIndex2: -1,
      liStyle: {width: '50%'}
    }
  },
  async mounted () {
    let self = this
    let id = parseInt(this.$route.params.id) || 1
    await this.getInfos(id)
    let echart1 = this.createEchart1()
    let echart2 = this.createEchart2(this.info3)
    this.createMap()
    // 设置健康度
    // this.createHealth()
    // this.setRollNum('health', this.health, 1)
    // this.$nextTick(() => {
    //   this.init()
    // })
    clearInterval(this.timer)
    setTimeout(() => {
      // this.startScroll2()
      this.timer = setInterval(() => {
        this.focusAnimate(this.info1, echart1, 1)
        this.focusAnimate(this.info3, echart2, 2)
      }, 2000)
    }, 2000)
    let resizeTimer = null
    window.onresize = function () { // 定义窗口大小变更通知事件
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        // 窗口宽度
        self.screenWidth = document.documentElement.clientWidth
        // 窗口高度
        self.screenHeight = document.documentElement.clientHeight
      }, 300)
    }
  },
  beforeDestroy () {
    this.pauseScroll()
    // this.pauseScroll2()
    clearInterval(this.timer)
    clearInterval(this.scrollTime3)
  },
  watch: {
    async $route (to) {
      if (to.name === 'DevDetail' && this.info1.length === 0) {
        let id = parseInt(this.$route.params.id) || 1
        await this.getInfos(id)
        this.createEchart1(this.info1)
        this.createEchart2(this.info3)
      }
    },
    info2 () {
      let self = this
      this.$nextTick(function () {
        self.$refs.record.scrollTo(0, 1)
        // self.startScroll()
        // self.startScroll3(0)
      })
    },
    screenWidth () {
      this.chartResize()
    },
    screenHeight () {
      this.chartResize()
    }
  },
  methods: {
    async getInfos (id) {
      await axios.get('/static/data/device/id/' + id + '.json')
        .then((res) => {
          let data = res.data
          this.pos.posNum = data.pos
          this.calendar = data.calendar
          console.log(data.calendar)
          this.info1 = data.info1
          // this.info2 = data.info2
          this.info3 = data.info3
          this.info4.name = data.info4.name
          this.info4.image = data.info4.data.filter((item) => {
            return item.image
          })
          this.info4.data = data.info4.data.filter((item) => {
            return !item.image
          })
          this.image = data.image
          this.health = data.health
          this.info2 = this.editInfo2(data.info2)
          this.initInfo4W()
        })
    },
    initInfo4W () {
      let datanum = this.info4.data.length
      let parentW = document.getElementsByClassName('info3-content')[0].offsetWidth
      this.info4.image.forEach((item) => {
        if (item.image === 'gauge') {
          parentW = parentW - 264
        }
        if (item.image === 'radar') {
          parentW = parentW - 314
        }
        if (item.image === 'thermometer') {
          if (item.name.length === 5) {
            parentW = parentW - 124
          } else {
            parentW = parentW - 110
          }
        }
      })
      let lie = (datanum % 6 > 0) ? parseInt(datanum / 6) + 1 : datanum / 6
      this.liStyle.width = (parentW / lie - 24) + 'px'
    },
    chartResize () {
      echarts.init(document.getElementById('info1')).resize()
      echarts.init(document.getElementById('info2')).resize()
      // echarts.init(document.getElementById('health')).resize()
    },
    createEchart1 () {
      let xData = this.getDateX1()
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
            color: 'rgba(0,183,255, 0.7)',
            nameTextStyle: {
              lineHeight: 18
            },
            formatter: function (value, index) {
              let dates = value.split('/')
              if (index === 4) {
                return dates[0] + '月  ' + '\n' + dates[1] + '日  '
              }
              return dates[0] + '月' + '\n' + dates[1] + '日'
            }
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
              return value.toFixed(1)
            }
          }
        },
        // 设置动画时长
        animationDuration: 2000,
        series: [{
          data: this.getDateY1(),
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
      let mychart = echarts.init(document.getElementById('info1'))
      mychart.setOption(option)
      return mychart
    },
    createEchart2 (info) {
      let xData = this.getDateX2()
      let yData = this.getDateY2(info.data)
      let option = {
        tooltip: {
          backgroundColor: 'rgba(254,77,69, 0.7)',
          extraCssText: 'box-shadow: 0 0 8px rgba(254,77,69, 0.7)',
          textStyle: {
            fontSize: '14px',
            color: '#fff'
          },
          trigger: 'axis',
          formatter: function (params) {
            return params[0].name + '<br />' + parseInt(params[0].value)
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
            color: 'rgba(0,183,255, 0.7)',
            lineHeight: 26,
            formatter: function (value, index) {
              let dates = value.split('/')
              if (index === 4) {
                return dates[0] + '年   ' + '\n' + dates[1] + '月   '
              }
              return dates[0] + '年' + '\n' + dates[1] + '月'
            }
          },
          axisTick: {
            show: false
          },
          data: xData,
          axisPointer: {
            show: true,
            type: 'line',
            align: 'right',
            lineStyle: {
              color: '#fe4d45'
            }
          },
          nameLocation: 'start',
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
              return parseInt(value)
            }
          }
        },
        // 设置动画时长
        animationDuration: 2000,
        series: [{
          data: yData,
          type: 'line',
          smooth: true, // 平滑显示曲线
          symbolSize: 4,
          symbol: 'circle',
          showSymbol: false,
          // 数据点样式
          itemStyle: {
            color: '#fff',
            borderColor: '#fe4d45',
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
                offset: 0, color: '#f5515f' // 0% 处的颜色
              }, {
                offset: 1, color: '#9f041b' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            },
            width: 2,
            shadowBlur: 4,
            shadowColor: '#f5515f'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(254,77,69, 0.5)' // 0% 处的颜色
              }, {
                offset: 0.8, color: 'rgba(83,192,238, 0)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        }]
      }
      let mychart = echarts.init(document.getElementById('info2'))
      mychart.setOption(option)
      return mychart
    },
    getDateY1 () {
      let nowDate = new Date()
      nowDate.setDate(nowDate.getDate() - 9)
      let info = []
      for (let i = 0; i < 7; i++) {
        nowDate.setDate(nowDate.getDate() + 1)
        let day = nowDate.getDate()
        info.push(parseInt(this.calendar[day - 1].WORKTIME))
      }
      return info
    },
    getDateX1 () {
      let nowDate = new Date()
      nowDate.setDate(nowDate.getDate() - 8)
      let days = []
      for (let i = 0; i < 7; i++) {
        nowDate.setDate(nowDate.getDate() + 1)
        let mon = nowDate.getMonth() + 1
        let day = nowDate.getDate()
        mon = mon < 10 ? '0' + mon : mon
        day = day < 10 ? '0' + day : day
        days.push(mon + '/' + day)
      }
      return days
    },
    getDateY2 (info) {
      console.log(info)
      return info.map((item) => {
        item.value = item.value * 100
        return item
      })
    },
    getDateX2 () {
      let nowDate = new Date()
      nowDate.setMonth(nowDate.getMonth() - 5)
      let months = []
      for (let i = 0; i < 5; i++) {
        nowDate.setMonth(nowDate.getMonth() + 1)
        let year = nowDate.getFullYear()
        let mon = nowDate.getMonth() + 1
        mon = mon < 10 ? '0' + mon : mon
        months.push(year + '/' + mon)
      }
      return months
    },
    focusAnimate (info, myChart, i) {
      let dataLen = info.data.length
      // 取消之前高亮的图形
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: this['currentIndex' + i]
      })
      this['currentIndex' + i] = (this['currentIndex' + i] + 1) % dataLen
      // 高亮当前图形
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: this['currentIndex' + i]
      })
      // 显示tooltip
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: this['currentIndex' + i]
      })
    },
    // createHealth () {
    //   // let center = ['50%', '50%']
    //   var data = []
    //   for (let i = 1; i <= 180; i++) {
    //     data.push({
    //       value: 8,
    //       name: 'CARD'
    //     })
    //   }
    //   let option = {
    //     tooltip: {
    //       show: false
    //     },
    //     toolbox: {
    //       show: false
    //     },
    //     series: [
    //       // 虚线
    //       {
    //         name: '虚线',
    //         type: 'pie',
    //         radius: ['94%', '100%'],
    //         center: ['50%', '50%'],
    //         silent: true,
    //         data: data,
    //         color: [
    //           'rgba(0,183,255,0.7)'
    //         ],
    //         label: {
    //           normal: {show: false},
    //           emphasis: {show: false}
    //         },
    //         labelLine: {
    //           normal: {show: false}
    //         },
    //         itemStyle: {
    //           normal: {
    //             borderWidth: 2,
    //             borderColor: '#003868'
    //           }
    //         }
    //       },
    //       // {
    //       //   type: 'pie',
    //       //   radius: ['98%', '98%'],
    //       //   // 图形是否不响应和触发鼠标事件
    //       //   silent: true,
    //       //   itemStyle: {
    //       //     normal: {
    //       //       label: {
    //       //         show: false
    //       //       },
    //       //       labelLine: {
    //       //         show: false
    //       //       }
    //       //     }
    //       //   },
    //       //   data: [{
    //       //     value: 1,
    //       //     itemStyle: {
    //       //       normal: {
    //       //         color: 'rgba(0,183,255,0.7)',
    //       //         borderColor: 'rgba(0,183,255,0.7)',
    //       //         borderWidth: 4,
    //       //         borderType: 'dashed'
    //       //       }
    //       //     }
    //       //   }]
    //       // },
    //       {
    //         type: 'pie',
    //         radius: ['88%', '92%'],
    //         // 图形是否不响应和触发鼠标事件
    //         silent: true,
    //         itemStyle: {
    //           normal: {
    //             label: {
    //               show: false
    //             },
    //             labelLine: {
    //               show: false
    //             }
    //           }
    //         },
    //         data: [{
    //           value: 1,
    //           itemStyle: {
    //             normal: {
    //               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //                 {offset: 0, color: '#00b8fe'},
    //                 {offset: 1, color: '#01d9d7'}
    //               ])
    //             }
    //           }
    //         }]
    //       },
    //       {
    //         type: 'pie',
    //         radius: ['0%', '84%'],
    //         animation: false,
    //         // 图形是否不响应和触发鼠标事件
    //         silent: true,
    //         itemStyle: {
    //           normal: {
    //             label: {
    //               show: false
    //             },
    //             labelLine: {
    //               show: false
    //             }
    //           }
    //         },
    //         data: [{
    //           value: 1,
    //           itemStyle: {
    //             normal: {
    //               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //                 {offset: 0, color: '#00b8fe'},
    //                 {offset: 1, color: '#01d9d7'}
    //               ])
    //             }
    //           }
    //         }]
    //       }
    //     ],
    //     // 设置动画时长
    //     animationDuration: function (idx) {
    //       return 2000
    //     }
    //   }
    //   echarts.init(document.getElementById('health')).setOption(option)
    // },
    // 使数字旋转
    setRollNum (id, num, fix) {
      // 获取小数和整数部分
      let newNum = parseFloat(num).toFixed(fix) + ''
      let numArr = newNum.split('.')
      let numLeft = numArr[0]
      let numRight = numArr[1]
      // eslint-disable-next-line
      $(`#${id}Left`).rollNum({
        deVal: numLeft,
        digit: numLeft.length
      })
      // eslint-disable-next-line
      $(`#${id}Right`).rollNum({
        deVal: numRight,
        digit: fix
      })
    },
    // 创建地图
    createMap () {
      let self = this
      let map = new BMap.Map('pos', {
        enableMapClick: false
      })
      let point = new BMap.Point(this.pos.posNum.LNG, this.pos.posNum.LAT)
      map.centerAndZoom(point, 10)
      map.enableScrollWheelZoom(true)
      map.setMapStyle({
        styleJson: mapStyle
      })
      let geoc = new BMap.Geocoder() // 地址解析对象
      geoc.getLocation(point, function (rs) {
        if (rs.addressComponents.street) {
          let addComp = rs.addressComponents
          self.pos.posName = addComp.province + addComp.city + addComp.street + addComp.streetNumber
        } else {
          self.pos.posName = rs.address
        }
      })
    },
    // 保养记录文字自动滚动
    scrollUp () {
      // let self = this
      let area = this.$refs.record
      // let areaH = area.clientHeight / 2
      area.scrollTo(0, parseFloat(area.scrollTop) + 1)
      if (parseInt(area.scrollTop) % this.scrollLiH === 0) {
        clearInterval(this.scrollTime)
        let i = parseInt(area.scrollTop) / this.scrollLiH
        this.startScroll3(i)
        // setTimeout(() => {
        //   this.startScroll()
        // }, this.scrollDelay)
      } else if (area.scrollTop >= this.info2.data.length * this.scrollLiH) {
        area.scrollTop = 0
      }
    },
    startScroll () {
      clearInterval(this.scrollTime)
      this.scrollTime = setInterval(() => {
        this.scrollUp()
      }, this.scrollSpeed)
    },
    pauseScroll () {
      clearInterval(this.scrollTime)
    },
    restartScroll () {
      clearInterval(this.scrollTime)
      this.scrollTime = setInterval(() => {
        this.scrollUp()
      }, this.scrollSpeed)
    },
    scrollLeft (i) {
      let textScroll1 = this.$refs.textScroll1
      textScroll1[i].scrollTo(parseFloat(textScroll1[i].scrollLeft) + 1, 0)
      if (textScroll1[i].scrollLeft >= textScroll1[i].childNodes[0].offsetWidth - 165) {
        this.pauseScroll3()
        textScroll1[i].scrollTo(0, 0)
      }
    },
    startScroll3 (i) {
      clearInterval(this.scrollTime3)
      this.scrollTime3 = setInterval(() => {
        this.scrollLeft(i)
      }, this.scrollSpeed3)
    },
    pauseScroll3 () {
      clearInterval(this.scrollTime3)
    },
    // 关键指标自动滚动
    // scrollUp2 () {
    //   let info3 = this.$refs.info3
    //   info3.scrollTo(0, parseFloat(info3.scrollTop) + 1)
    //   if (info3.scrollTop >= this.info3H + 16) {
    //     info3.scrollTo(0, 0)
    //   }
    // },
    // startScroll2 () {
    //   clearInterval(this.scrollTime2)
    //   this.scrollTime2 = setInterval(() => {
    //     this.scrollUp2()
    //   }, this.scrollSpeed2)
    // },
    // pauseScroll2 () {
    //   clearInterval(this.scrollTime2)
    // },
    // 编辑关键指标数据
    editInfo2 (info) {
      let curDate = new Date()
      let data = info.data
      data.map((item) => {
        curDate.setDate(curDate.getDate() - 1)
        let year = curDate.getFullYear()
        let month = curDate.getMonth() + 1
        let day = curDate.getDate()
        let hour = curDate.getHours()
        let minute = curDate.getMinutes()
        item.serviceTime = `${year}/${month}/${day} ${hour}:${minute}`
        return item
      })
      return info
    }
  },
  components: {
    Kuang,
    Calendar,
    Gauge,
    Thermometer,
    Radar
  }
}
</script>

<style lang="less" scoped>
@dataNumsH: 16px;
@dataNumsW: 11px;
@dataNumsH2: 48px;
@dataNumsW2: 28px;
@bottomH: 290px;
.dev-detail{
  display: flex;
  .dev-detail-2{
    flex: 1;
    margin-left: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .top{
      flex: 1;
      display: flex;
      align-items: stretch;
      margin-bottom: 24px;
      .img{
        flex: 1;
        img{
          display: block;
          margin: 0 auto;
          height: 100%;
        }
      }
      .top-list{
        flex: 278px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .pos{
          flex: 1;
          margin-bottom: 24px;
          position: relative;
          .posName{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -16px);
            p{
              padding: 8px;
              white-space: nowrap;
              background-color: rgba(0,183,255, 0.3);
              font-size: 14px;
              font-family: PingFang-SC-Medium;
            }
          }
        }
        #pos{
          height: 100%;
        }
        .date{
          flex: 304px 0;
        }
      }
    }
    .bottom{
      flex: @bottomH 0;
      .info3{
        height: 100%;
        .image{
          height: 100%;
          margin-right: 24px;
        }
        .gauge-img{
          width: 240px;
          flex: 240px 0;
        }
        .thermometer-img{
          width: 86px;
          flex: 86px 0;
        }
        .radar-img{
          width: 290px;
          flex: 290px 0;
        }
      }
    }
  }
  .dev-detail-1{
    flex: 360px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .info{
      flex: 1;
      margin-bottom: 24px;
    }
    .info4{
      flex: @bottomH 0;
      margin-bottom: 0;
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      color: #54cefe;
      .padding{
        padding: 16px;
        width: 100%;
        height: 100%;
      }
      #record{
        height: 100%;
        overflow-y: hidden;
      }
      li{
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        line-height: 32px;
        height: 32px;
        span:first-child{
          flex: 87px 0;
          overflow: hidden;
          white-space: nowrap;
          -ms-word-break: keep-all;
          word-break: keep-all;
          text-overflow: ellipsis;
        }
        .text-scroll{
          flex: 164px 0;
          width: 164px;
          overflow: hidden;
          white-space: nowrap;
          -ms-word-break: keep-all;
          word-break: keep-all;
          text-overflow: ellipsis;
          i{
            display: inline-block;
            width: 165px;
            /*height: 32px;*/
          }
        }
        span:last-child{
          flex: 56px 0;
        }
      }
    }
  }
  /*.dev-detail-3{*/
    /*flex: 288px 0;*/
    /*height: 100%;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: space-between;*/
    /*.info3{*/
      /*flex: 62.5% 0;*/
    /*}*/
  /*}*/
  #info1, #info2, #info3{
    width: 100%;
    height: 100%;
  }
  /*.health{*/
    /*flex: 34.4% 0;*/
    /*position: relative;*/
    /*justify-content: center;*/
    /*#health{*/
      /*width: 100%;*/
      /*height: 100%;*/
    /*}*/
    /*.health-title{*/
      /*position: absolute;*/
      /*top: 30%;*/
      /*width: 100%;*/
      /*text-align: center;*/
      /*color: #fff;*/
      /*font-size: 20px;*/
      /*font-family: PingFangSC-Semibold;*/
    /*}*/
    /*.healthNum{*/
      /*display: flex;*/
      /*justify-content: center;*/
      /*align-items: flex-end;*/
      /*position: absolute;*/
      /*top: 43%;*/
      /*width: 100%;*/
      /*<!--height: @dataNumsH2;-->*/
      /*<!--font-size: @dataNumsH2;-->*/
      /*font-family: Impact;*/
      /*.unit{*/
        /*margin-left: 4px;*/
        /*line-height: 30px;*/
        /*font-size: 14px;*/
        /*font-family: PingFang-SC-Medium;*/
      /*}*/
    /*}*/
  /*}*/
  #info3{
    padding: 16px;
    padding-left: 24px;
    padding-right: 0;
    overflow: hidden;
    .info3-content{
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
    }
    .image{
      position: relative;
      box-sizing: content-box;
    }
    .indicator-list{
      flex: 1;
      ul{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        height: 100%;
      }
      li:nth-child(6),li:nth-child(12),li:nth-child(18){
        margin-bottom: 0;
      }
      li{
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
        padding: 0 8px;
        box-sizing: border-box;
        width: 45%;
        max-width: 48%;
        line-height: 32px;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        background-color: rgba(0,183,255, .3);
        span{
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
