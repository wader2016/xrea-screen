<template>
  <div class='intelligentLogistics'>
    <div class='left'>
      <bg class='part line1' borderW='24px' borderH='50%'>
        <div class='border border-line'>
          <div class='content'>
            <h3 class='title'>车辆运行状况</h3>
            <div class='line-content'>
              <div class='num-left'>
                <h5 class='small-txt2'>行程总公里</h5>
                <div class='info'>
                  <div id='num1'></div>
                  <div class='small-txt3 util'>千米</div>
                </div>
              </div>
              <div class='num-right'>
                <h5 class='small-txt2'>码表均值</h5>
                <div class='info'>
                  <div id='num2'></div>
                  <div class='small-txt3 util'>千米</div>
                </div>
              </div>
            </div>
            <div class='line-content'>
              <div class='num-left'>
                <h5 class='small-txt2'>行程总工时</h5>
                <div class='info'>
                  <div id='num3'></div>
                  <div class='small-txt3'>小时</div>
                </div>
              </div>
              <div class='num-right'>
                <h5 class='small-txt2'>单车工时</h5>
                <div class='info'>
                  <div id='num4'></div>
                  <div class='small-txt3'>小时</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </bg>
      <bg class='part line2'>
        <div class='border'>
          <div class='content'>
            <div class='inline-block small-txt2'>实时报警统计</div>
            <div class='inline-block small-txt4 warn1'>
              一级报警
            </div>
            <div class='inline-block num' id='num2-1'></div>
            <div class='inline-block small-txt4 warn2'>
              二级报警
            </div>
            <div class='inline-block num' id='num2-2'></div>
            <div class='inline-block small-txt4 warn3'>
              三级报警
            </div>
            <div class='inline-block num' id='num2-3'></div>
          </div>
        </div>
      </bg>
      <bg class='part line3'>
        <div class='border'>
          <div class='gauge1'>
            <div id='gauge1'></div>
            <div class='txt'>
              <h4>今日总里程</h4>
              <div class='num'>
                <div id='num3-1'></div>
                <div class='util small-txt3'>千米</div>
              </div>
            </div>
          </div>
          <div class='gauge1'>
            <div id='gauge2'></div>
            <div class='txt'>
              <h4>今日总时长</h4>
              <div class='num'>
                <div id='num3-2'></div>
                <div class='util small-txt3'>小时</div>
              </div>
            </div>
          </div>
        </div>
      </bg>
      <bg class='part line4' borderW='24px' borderH='50%'>
        <div class='border border-line'>
          <div class='content'>
            <h3 class='title'>近7天行驶时长统计</h3>
            <div id='bar1'></div>
          </div>
        </div>
      </bg>
      <bg class='part line5' borderW='24px' borderH='50%'>
        <div class='border border-line'>
          <div class='content'>
            <h3 class='title'>近七天车辆各时段运行状况</h3>
            <div id='barLine'></div>
          </div>
        </div>
      </bg>
    </div>
    <div class='center'>
      <bg class='part line1' borderW='24px' borderH='50%'>
        <div class='border'>
          <div id="mapBeijing"></div>
          <!--<h3 class='title'>车辆运行热力图</h3>-->
          <div class="value-list clearfix">
            <div class="index index1 fr">
              <p class="name">总耗电</p>
              <p class="value">{{this.info7.datalist[0].value}}<span class='small-txt3 uitl'>{{this.info7.datalist[0].unit}}</span></p>
              <!--<div class='num'>-->
                <!--<div id='index1'></div>-->
                <!--<div class='small-txt3 uitl'>度</div>-->
              <!--</div>-->
            </div>
            <div class="index index2 fr">
              <p class="name">减少碳排放</p>
              <p class="value">{{this.info7.datalist[1].value}}<span class='small-txt3 uitl'>{{this.info7.datalist[1].unit}}</span></p>
            </div>
          </div>
        </div>
      </bg>
      <bg class='part line2' borderW='24px' borderH='50%'>
        <div class='border'>
          <div class='content-pie'>
            <h3 class='name'>物流运力峰值</h3>
            <div class='txt'>
              <div id='pie1'></div>
              <div class='num'>
                {{info7.datalist.length?info7.datalist[2].value:0}}%
                <!--<div id='numPie1'></div>-->
                <!--<div class='util'>%</div>-->
              </div>
            </div>
          </div>
          <div class='content-pie'>
            <h3 class='name'>车辆运行总况</h3>
            <div class='txt'>
              <div id='pie2'></div>
              <div class='num'>
                {{info7.datalist.length?info7.datalist[3].value:0}}
                <!--<div id='numPie2'></div>-->
              </div>
            </div>
          </div>
          <div class='content-pie'>
            <h3 class='name'>物流客户总况</h3>
            <div class='txt'>
              <div id='pie3'></div>
              <div class='num'>
                {{info7.datalist.length?info7.datalist[8].value:0}}
                <!--<div id='numPie3'></div>-->
              </div>
            </div>
          </div>
        </div>
      </bg>
    </div>
    <div class='right'>
      <bg class='part line1' borderW='24px' borderH='50%'>
        <div class='border border-line'>
          <div class='box'>
            <div class='content centent1'>
              <h3 class='title'>昨日运力峰值</h3>
              <div class='txt'>
                <div id='pie4'></div>
                <div class='num'>
                  {{info8.datalist.length?info8.datalist[0].value:0}}%
                </div>
              </div>
            </div>
            <div class='content centent2'>
              <h3 class='title'>昨日运单数</h3>
              <div id='num4-1'></div>
              <div class='flex-contont'>
                <span class='small-txt2'>同比前一日</span>
                <span class='icon iconfont icon-shangsheng'></span>
                <div id='num4-2'></div>
                <div class='util'>%</div>
              </div>
              <div id='line1'></div>
            </div>
          </div>
        </div>
      </bg>
      <bg class='part line2' borderW='24px' borderH='50%'>
        <div class='border border-line'>
          <div class='content'>
            <h3 class='title'>城配运单统计 <span class='fr small-txt1'>今日运单:<span class='num'>32</span></span></h3>
            <div id='intelLogList' ref='intelLogList' @mouseenter='pauseScroll' @mouseleave='restartScroll'>
              <ul>
                <li v-for='(item,index) in info10.datalist' :key='index'>
                  <span style="flex: 0 0 112px;">{{item.num}}</span>
                  <span style="flex: 0 0 36px;">{{item.transportPerson}}</span>
                  <span style="flex: 0 0 72px;">{{item.station}}</span>
                  <span>{{item.status}}</span>
                  <span>{{item.workTime}}</span>
                </li>
              </ul>
              <ul>
                <li v-for='(item,index) in info10.datalist' :key='index'>
                  <span>{{item.num}}</span>
                  <span>{{item.transportPerson}}</span>
                  <span>{{item.station}}</span>
                  <span>{{item.status}}</span>
                  <span>{{item.workTime}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </bg>
      <bg class='part line3'>
        <div class='border'>
          <div class='line3-left'>
            <div class='line3-1'>
              <h5 class='small-txt2'>充电总金额</h5>
              <div class='num'>
                <div id='num5-1'></div>
                <div class='small-txt3'>元</div>
              </div>
            </div>
            <div class='line3-2'>
              <h5 class='small-txt2'>充电总次数</h5>
              <div class='num'>
                <div id='num5-2'></div>
                <div class='small-txt3'>次</div>
              </div>
            </div>
          </div>
          <div class='line3-right'>
            <h5 class='small-txt2'>比燃油车降低成本</h5>
            <div class='liquidFill'>
              <div id='liquidFill'></div>
              <div class='num'>
                <div id='num5-3'></div>
                <div class='uitl'>%</div>
              </div>
            </div>
            <div class='num'>
              <span class='icon iconfont icon-xiajiang'></span>
              <div id='num5-4'></div>
              <div class='util small-txt3'>元</div>
            </div>
          </div>
        </div>
      </bg>
      <bg class='part line4' borderW='24px' borderH='50%'>
        <div class='border border-line'>
          <div class='content'>
            <h3 class='title'>近七天油电差统计</h3>
            <div id='barLine2'></div>
          </div>
        </div>
      </bg>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'
import BMap from 'BMap'
import {mapStyle} from '../../../static/js/mapStyle'
const mapv = require('mapv')
// eslint-disable-next-line
import '@/assets/js/numbergd'
// eslint-disable-next-line
import echartsLiquidfill from 'echarts-liquidfill'

export default {
  name: 'intelligentLogistics',
  data () {
    return {
      // 屏幕宽度
      screenWidth: document.documentElement.clientWidth,
      // 屏幕高度
      screenHeight: document.documentElement.clientHeight,
      info1: {
        name: '车辆运行状况',
        datalist: []
      },
      info2: {
        name: '实时报警统计',
        datalist: []
      },
      info3: {
        name: '今日统计',
        datalist: []
      },
      info4: {
        name: '近7天行驶时长统计',
        datalist: []
      },
      info5: {
        name: '近七天车辆运行状况',
        datalist: []
      },
      info6: {
        name: '近七天油电差统计',
        datalist: []
      },
      info7: {
        name: '车辆运行热力信息',
        datalist: []
      },
      info8: {
        name: '昨日统计',
        datalist: []
      },
      info9: {
        name: '昨日运行单数',
        datalist: []
      },
      info10: {
        name: '今日运单数',
        datalist: []
      },
      info11: {
        name: '节省成本信息',
        datalist: []
      },
      scrollLiH: 24,
      scrollTime: null,
      scrollSpeed: 50,
      scrollDelay: 1000,
      map: ''
    }
  },
  async mounted () {
    let self = this
    await this.getInfos()
    this.createMap()
    this.getData()
    this.$nextTick(() => {
      this.init()
    })
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
  watch: {
    screenWidth () {
      this.chartResize()
    },
    screenHeight () {
      this.chartResize()
    }
  },
  beforeDestroy () {
    this.pauseScroll()
  },
  methods: {
    async getInfos () {
      let self = this
      await axios.get('/static/data/intelligentLogistics/车辆运行概况.json')
        .then((res) => {
          let data = res.data.data
          let info1 = data.find((item, index) => {
            return item.name === self.info1.name
          })
          this.info1.datalist = info1.datalist
          let info2 = data.find((item, index) => {
            return item.name === self.info2.name
          })
          this.info2.datalist = info2.datalist
          let info3 = data.find((item, index) => {
            return item.name === self.info3.name
          })
          this.info3.datalist = info3.datalist
          let info4 = data.find((item, index) => {
            return item.name === self.info4.name
          })
          this.info4.datalist = info4.workTimeList
          let info5 = data.find((item, index) => {
            return item.name === self.info5.name
          })
          this.info5.datalist = info5.workTimeList
          let info6 = data.find((item, index) => {
            return item.name === self.info6.name
          })
          this.info6.datalist = info6.workTimeList
          let info7 = data.find((item, index) => {
            return item.name === self.info7.name
          })
          this.info7.datalist = info7.datalist
          let info8 = data.find((item, index) => {
            return item.name === self.info8.name
          })
          this.info8.datalist = info8.datalist
          let info9 = data.find((item, index) => {
            return item.name === self.info9.name
          })
          this.info9.datalist = info9.datalist
          let info10 = data.find((item, index) => {
            return item.name === self.info10.name
          })
          this.info10.datalist = info10.datalist
          const now = new Date()
          this.info10.datalist.forEach(val => {
            const time = val.workTime.split(' ')[1]
            const month = now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)
            const day = now.getDate() < 10 ? '0' + (now.getDate() - 1) : (now.getDate() - 1)
            val.workTime = now.getFullYear() + '-' + month + '-' + day + ' ' + time
          })
          this.info10.total = info10.total
          let info11 = data.find((item, index) => {
            return item.name === self.info11.name
          })
          this.info11.datalist = info11.datalist
        })
    },
    getData () {
      let self = this
      axios.get('/static/data/intelligentLogistics/热点.json')
        .then(function (res) {
          let data = res.data.map((item) => {
            if (item.value < 1000) {
              item.value += 3000
            }
            return item
          })
          self.setMapv(data)
        })
    },
    init () {
      this.setRollNum('num1', this.info1.datalist[0].value, 7)
      this.setRollNum('num2', this.info1.datalist[2].value, 6)
      this.setRollNum('num3', this.info1.datalist[1].value, 7)
      this.setRollNum('num4', this.info1.datalist[3].value, 6)
      this.setRollNum('num2-1', this.info2.datalist[0].value, 3)
      this.setRollNum('num2-2', this.info2.datalist[1].value, 3)
      this.setRollNum('num2-3', this.info2.datalist[2].value, 3)
      this.setGauge('gauge1', this.info3.datalist[0].value, 20000)
      this.setGauge('gauge2', this.info3.datalist[1].value, 2000)
      this.setRollNum('num3-1', this.info3.datalist[0].value)
      this.setRollNum('num3-2', this.info3.datalist[1].value)
      this.setBar('bar1', this.info4.datalist)
      this.setBarLine('barLine', this.info5.datalist)
      // this.setRollNum('numPie1', this.info7.datalist[2].value)
      this.setPie1('pie1', this.info7.datalist[2], 0)
      // this.setRollNum('numPie2', this.info7.datalist[3].value)
      this.setPie2('pie2', this.info7.datalist)
      // this.setRollNum('numPie3', this.info7.datalist[8].value)
      this.setPie3('pie3', this.info7.datalist)
      // this.setRollNum('num4', this.info8.datalist[0].value)
      this.setPie1('pie4', this.info8.datalist[0], 180)
      this.setRollNum('num4-1', this.info8.datalist[1].value)
      this.setRollNum('num4-2', this.info8.datalist[2].value)
      this.setLine('line1', this.info9.datalist)
      this.$refs.intelLogList.scrollTo(0, 1)
      this.startScroll()
      this.setRollNum('num5-1', this.info11.datalist[0].value)
      this.setRollNum('num5-2', this.info11.datalist[1].value)
      this.setRollNum('num5-3', this.info11.datalist[3].value)
      this.setRollNum('num5-4', this.info11.datalist[2].value)
      this.setliquidFill('liquidFill', this.info11.datalist[3].value)
      this.setBarLine('barLine2', this.info6.datalist, true)
    },
    chartResize () {
      echarts.init(document.getElementById('bar1')).resize()
      echarts.init(document.getElementById('barLine')).resize()
      echarts.init(document.getElementById('pie4')).resize()
      echarts.init(document.getElementById('line1')).resize()
      echarts.init(document.getElementById('liquidFill')).resize()
      echarts.init(document.getElementById('barLine2')).resize()
    },
    createMap () {
      let map = new BMap.Map('mapBeijing', {
        enableMapClick: false
      })
      map.centerAndZoom(new BMap.Point(116.421885, 39.93428), 11)
      map.enableScrollWheelZoom(true)
      map.setMapStyle({
        styleJson: mapStyle
      })
      this.map = map
      let beijingArea = [
        {name: '东城区', pos: {lng: 116.421885, lat: 39.938574}},
        {name: '西城区', pos: {lng: 116.37319, lat: 39.93428}},
        {name: '海淀区', pos: {lng: 116.239678, lat: 40.033162}},
        {name: '朝阳区', pos: {lng: 116.521695, lat: 39.958953}},
        {name: '丰台区', pos: {lng: 116.25837, lat: 39.841938}},
        {name: '房山区', pos: {lng: 115.862836, lat: 39.726753}},
        {name: '石景山区', pos: {lng: 116.184556, lat: 39.938867}},
        {name: '通州区', pos: {lng: 116.740079, lat: 39.809815}},
        {name: '顺义区', pos: {lng: 116.728229, lat: 40.154951}},
        {name: '昌平区', pos: {lng: 116.216456, lat: 40.221724}},
        {name: '大兴区', pos: {lng: 116.425195, lat: 39.65279}},
        {name: '怀柔区', pos: {lng: 116.593408, lat: 40.638139}},
        {name: '平谷区', pos: {lng: 117.150433, lat: 40.215925}},
        {name: '门头沟区', pos: {lng: 115.795795, lat: 40.000893}},
        {name: '延庆县', pos: {lng: 116.169735, lat: 40.545156}},
        {name: '密云县', pos: {lng: 117.001201, lat: 40.532843}}
      ]
      beijingArea.forEach((item) => {
        this.getBoundary(item)
      })
    },
    // 给地图的区域设置边框
    getBoundary (item) {
      let self = this
      let bdary = new BMap.Boundary()
      // 获取行政区域
      bdary.get(item.name, function (rs) {
        // map.clearOverlays()      //清除地图覆盖物
        let count = rs.boundaries.length // 行政区域的点有多少个
        for (let i = 0; i < count; i++) {
          // 建立多边形覆盖物
          let ply1 = new BMap.Polygon(rs.boundaries[i],
            {strokeWeight: 2, // 设置多边形边线线粗

              strokeOpacity: 1, // 设置多边形边线透明度0-1
              StrokeStyle: 'solid', // 设置多边形边线样式为实线或虚线，取值 solid 或 dashed

              strokeColor: 'transparent', // 设置多边形边线颜色
              fillColor: 'transparent',
              fillOpacity: 0.2

            })
          let ply2 = new BMap.Polygon(rs.boundaries[i],
            {strokeWeight: 2, // 设置多边形边线线粗

              strokeOpacity: 1, // 设置多边形边线透明度0-1
              StrokeStyle: 'solid', // 设置多边形边线样式为实线或虚线，取值 solid 或 dashed

              strokeColor: 'transparent', // 设置多边形边线颜色
              fillColor: '#fff',
              fillOpacity: 0.1

            })
          // 添加覆盖物
          self.map.addOverlay(ply1)
          self.map.addOverlay(ply2)
          ply2.hide()
          ply1.addEventListener('mouseover', function () {
            ply1.hide()
            ply2.show()
          })
          ply2.addEventListener('mouseout', function () {
            ply1.show()
            ply2.hide()
          })
        }
      })
      let point = new BMap.Point(item.pos.lng, item.pos.lat)
      let offset = new BMap.Size(-20, -5)
      if (item.name === '东城区' || item.name === '西城区') {
        offset = new BMap.Size(-20, 0)
      } else if (item.name === '怀柔区') {
        offset = new BMap.Size(-10, 0)
      } else if (item.name === '石景山区') {
        offset = new BMap.Size(-30, -5)
      }
      let opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: offset // 设置文本偏移量
      }
      let label = new BMap.Label(item.name, opts) // 创建文本标注对象
      label.setStyle({
        color: '#FFF',
        backgroundColor: 'transparent', // 文本背景色
        borderColor: 'transparent', // 文本框边框色
        fontSize: '12px',
        height: '12px',
        lineHeight: '12px',
        fontFamily: '微软雅黑'
      })
      this.map.addOverlay(label)
    },
    refactorData (data) {
      let info = []
      for (let i = 0; i < data.length; i++) {
        info.push({
          geometry: {
            type: 'Point',
            coordinates: [data[i].lng, data[i].lat]
          },
          count: data[i].value
        })
      }
      return info
    },
    setMapv (data) {
      let info = this.refactorData(data)
      let dataSet = new mapv.DataSet(info)
      let max = 0
      info.forEach((item) => {
        max = Math.max(max, item.count)
      })

      let options = {
        size: 10,
        gradient: {0.25: 'rgb(0,0,255)', 0.55: 'rgb(0,255,0)', 0.95: 'yellow', 1.0: 'rgb(255,0,0)'},
        max: max / 4,
        // animation: {
        //   type: 'time',
        //   stepsRange: {
        //     start: 0,
        //     end: 100
        //   },
        //   trails: 10,
        //   duration: 4
        // },
        draw: 'heatmap',
        globalAlpha: 0
      }
      // eslint-disable-next-line
      let mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options)
    },
    // 使数字旋转
    setRollNum (id, num, digist) {
      // 获取小数和整数部分
      let newNum = parseFloat(num) + ''
      // eslint-disable-next-line
      $(`#${id}`).rollNum({
        deVal: newNum,
        digit: digist || newNum.length
      })
    },
    // 设置仪表盘
    setGauge (id, val, max) {
      let option = {
        series: [
          {
            name: '',
            type: 'gauge',
            splitNumber: 10, // 刻度数量
            min: 0,
            max: max,
            // startAngle: 196,
            // endAngle: -16,
            radius: '107', // 图表尺寸
            center: ['50%', '107'],
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
                shadowBlur: 0,
                color: [
                  // [0, '#fff'],
                  [0.05, '#00b8fe'],
                  [0.15, '#00b8fd'],
                  [0.25, '#01bcfa'],
                  [0.35, '#00c0f3'],
                  [0.45, '#01c8eb'],
                  [0.5, '#01c8eb'],
                  [0.55, '#01d0e2'],
                  [0.65, '#01d5dc'],
                  [0.75, '#01d7d9'],
                  [0.85, '#01d8d7'],
                  [0.9, '#01d8d8'],
                  [0.95, '#01d8d7'],
                  // [0.99, '#01d8d8'],
                  [1, '#01d8d8']
                ]
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: 'auto',
                width: 4
              },
              length: 8,
              splitNumber: 5
            },
            splitLine: {
              show: true,
              length: 8,
              linkStyle: {
                // color: 'rgba(0,183,255, 0.7)',
                width: 4
              }
            },
            axisLabel: {
              show: true,
              distance: 5,
              color: 'rgba(0,183,255, 0.7)',
              fontSize: 8,
              fontFamily: 'PingFang-SC-Medium'
            },
            // 仪表盘指针
            pointer: {
              show: true,
              length: '100%',
              width: 1
            },
            detail: {
              show: false
            },
            data: [{
              name: '',
              value: val
            }]
          },
          {
            tooltip: {
              show: false
            },
            name: 'wrap',
            type: 'pie',
            hoverAnimation: false,
            legendHoverLink: false,
            center: ['50%', '107'],
            radius: ['0', '3'],
            z: 10,
            label: {
              show: false
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
              value: 87,
              itemStyle: {
                normal: {
                  color: '#fff'
                }
              }
            }]
          },
          {
            tooltip: {
              show: false
            },
            name: 'wrap',
            type: 'pie',
            hoverAnimation: false,
            legendHoverLink: false,
            center: ['50%', '107'],
            radius: ['3', '4'],
            z: 10,
            label: {
              show: false
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
              value: 87,
              itemStyle: {
                normal: {
                  color: '#01d9d6'
                }
              }
            }]
          }
        ]
      }
      echarts.init(document.getElementById(id)).setOption(option)
    },
    // 近七天开工时长统计
    setBar (id, info) {
      let dataX = []
      let dataY1 = []
      let dataY2 = []
      dataX = this.editTime(info[0].datalist)
      dataY1 = this.setYData(info[0].datalist)
      dataY2 = this.setYData(info[1].datalist)
      let option = {
        grid: {
          top: 25,
          left: 20,
          right: 0,
          bottom: 10
        },
        legend: {
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
              name: info[0].type,
              icon: 'roundRect'
            },
            {
              name: info[1].type,
              icon: 'roundRect'
            }
          ]
        },
        xAxis: [
          {
            type: 'category',
            data: dataX,
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
            name: '小时',
            nameLocation: 'end',
            nameTextStyle: {
              color: 'rgba(0,183,255, 0.7)',
              fontSize: 8,
              fontFamily: 'PingFang-SC-Medium',
              align: 'left'
              // verticalAlign: 'bottom',
              // lineHeight: 8,
              // padding: [10, 0, 0, 0]
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
            name: '自营',
            type: 'bar',
            barGap: '30%',
            // barWidth: 10,
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
                      color: '#00dcff'
                    },
                    {
                      offset: 1,
                      color: '#00b7ff'
                    }
                  ]
                }
              }
            },
            data: dataY1
          },
          {
            name: '租赁',
            type: 'bar',
            // barWidth: '10',
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
                      color: '#02eeed'
                    },
                    {
                      offset: 1,
                      color: '#01d9d6'
                    }
                  ]
                }
              }
            },
            data: dataY2
          }
        ]
      }
      echarts.init(document.getElementById(id)).setOption(option)
    },
    // 近七天车辆各时段运行状况
    setBarLine (id, info, showSymbol) {
      let dataY1 = []
      let dataY2 = []
      dataY1 = this.setYData(info[0].datalist)
      dataY2 = this.setYData(info[1].datalist)
      // 所有数据最大值
      var maxValue = Math.max.apply(null, dataY1)
      let bgData = []
      bgData = info[0].datalist.map((item) => {
        return {
          name: item.name,
          value: maxValue
        }
      })
      let legend1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAAG64y5nAAAAAXNSR0IArs4c6QAAAHlJREFUGBljZLj6n43hEcNPBobt//8zgggGKGBk2PH/GcN/BkkGRoZOHDIwtVCaCUgvQhMDc0FmdQDNKodLMjI8Z5BlUEAxF1kSZBQmALoGuwTYieh2YOpHiKD7CSGDm8UEDInnuKXRZIBqmUBeBAUfXo0gQ0FqgGoBd04quZu7+D4AAAAASUVORK5CYII='
      let img2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAAG64y5nAAAAAXNSR0IArs4c6QAAADdJREFUGBljYEAGjIy3rm1l+M/ghSwIZjMy3rz2H0OUhgLYLWRk3Eo9O3H7FpsdjAzbsAlTVwwAvIEOL6Jj2UkAAAAASUVORK5CYII='
      let img3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAAG64y5nAAAAAXNSR0IArs4c6QAAAMhJREFUGBljYEAGjIy3rm1VZ2X3uvnrJ7I4kM1489p/EADRcCkQx+PJo2/a//+zgQRZYDKCTKz8u75+Tf3HyPgLJoaVZgSJCt2+zSfBwvTm+q+frP/VtcBijDCL/qlpMrg9ecSw59tXoCsYt8KNYbp5vRhmMUgQrA0uC2SAJK/fvpEHEhNgZJn1TlX1E7I82LcM/xm8YILOXNwMu2XkwFytB/cYbiCHAiPDNhQbQKZfu3X9pys3z/fHv3+zABWzgryNbgvMcKJoAI2kUkAU1GSCAAAAAElFTkSuQmCC'
      let legend2, dataX
      let barWidth = 8
      if (dataY1.length === 7) {
        legend2 = img3
        barWidth = 16
        dataX = this.editTime(info[0].datalist)
      } else {
        legend2 = img2
        barWidth = 8
        dataX = (function (data) {
          let arr = []
          data.forEach(function (items) {
            arr.push(items.workTime)
          })
          return arr
        })(info[0].datalist)
      }
      let option = {
        grid: {
          top: 30,
          left: 18,
          right: 32,
          bottom: 10
        },
        legend: {
          show: true,
          z: 10,
          // top: 0,
          right: 32,
          itemWidth: 12,
          itemHeight: 8,
          textStyle: {
            color: '#B5DCFF',
            fontSize: 10,
            fontFamily: 'PingFang-SC-Medium'
          },
          data: [
            {
              name: '车辆数量',
              icon: 'image://' + legend1
            },
            {
              name: '总里程',
              icon: 'image://' + legend2
            }
          ]
        },
        xAxis: [
          {
            type: 'category',
            data: dataX,
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
            name: info[0].datalist[0].unit,
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
          },
          {
            type: 'value',
            name: info[1].datalist[0].unit,
            nameLocation: 'end',
            nameTextStyle: {
              color: 'rgba(0,183,255, 0.7)',
              fontSize: 8,
              fontFamily: 'PingFang-SC-Medium',
              align: 'right'
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
            // barGap: '0',
            // barWidth: '45%',
            barCategoryGap: 0,
            itemStyle: {
              normal: {
                color: 'rgba(0,183,255, 0.3)'
              }
            },
            // silent: true,
            // symbol: 'image://' + bgImg,
            symbol: 'rect',
            // symbolClip: false,
            // symbolBoundingData: maxValue,
            symbolSize: [barWidth, barWidth / 4],
            symbolRepeat: true,
            data: bgData
          },
          {
            name: '车辆数量',
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
            data: dataY1
          },
          {
            name: '总里程',
            type: 'line',
            yAxisIndex: 1,
            z: 4,
            smooth: true, // 平滑显示曲线
            symbolSize: 4,
            symbol: 'circle',
            showSymbol: showSymbol || false,
            itemStyle: {
              color: '#fff',
              borderColor: '#00b7ff',
              borderWidth: 2
            },
            lineStyle: {
              color: '#01d9d6',
              width: 2,
              shadowBlur: 4,
              shadowColor: '#01d9d6'
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                distance: 0,
                fontSize: 8,
                fontFamily: 'PingFangSC-Semibold'
              }
            },
            data: dataY2
          }
        ]
      }
      echarts.init(document.getElementById(id)).setOption(option)
    },
    setPie1 (id, info, startAngle) {
      let color = {}
      if (id === 'pie4') {
        color = new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          {
            offset: 0,
            color: '#00b7ff'
          },
          {
            offset: 1,
            color: '#01d9d6'
          }]
        )
      } else {
        color = {
          colorStops: [
            {
              offset: 0,
              color: '#00b7ff'
            },
            {
              offset: 1,
              color: '#01d9d6'
            }
          ]
        }
      }
      let option = {
        animation: false,
        series: [{
          type: 'pie',
          center: ['50%', '55%'],
          radius: ['78%', '85%'],
          startAngle: startAngle || 90,
          // 是否是顺时针
          clockWise: true,
          hoverAnimation: false,
          itemStyle: {
            normal: {
              color: color,
              borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00b7ff'
              }, {
                offset: 1,
                color: '#01d9d6'
              }]),
              borderWidth: 6,
              labelLine: {
                show: false
              }
            }
          },
          data: [
            {
              value: info.value
            },
            {
              value: 100 - info.value,
              itemStyle: {
                normal: {
                  color: 'rgba(0,183,255, 0)',
                  borderColor: 'rgba(0,183,255, 0.3)',
                  borderWidth: 6
                },
                emphasis: {
                  color: 'rgba(0,183,255, 0)',
                  borderColor: 'rgba(0,183,255, 0.3)',
                  borderWidth: 6
                }
              }
            }
          ]
        }]
      }
      echarts.init(document.getElementById(id)).setOption(option)
    },
    setPie2 (id, info) {
      let data = info.filter((item) => {
        return item.name === '故障' || item.name === '停留' || item.name === '行驶' || item.name === '充电'
      })
      let dataDetail = data.map((item) => {
        if (item.name === '故障') {
          return {
            id: 1,
            name: item.name,
            value: item.value,
            itemStyle: {
              normal: {
                color: '#21d37d',
                borderColor: '#21d37d'
              },
              emphasis: {
                color: '#21d37d',
                borderColor: '#21d37d'
              }
            },
            labelLine: {
              lineStyle: {
                color: '#21d37d'
              }
            }
          }
        }
        if (item.name === '行驶') {
          return {
            id: 2,
            name: item.name,
            value: item.value,
            itemStyle: {
              normal: {
                color: '#00b7ff',
                borderColor: '#00b7ff'
              },
              emphasis: {
                color: '#00b7ff',
                borderColor: '#00b7ff'
              }
            },
            labelLine: {
              lineStyle: {
                color: '#00b7ff'
              }
            }
          }
        }
        if (item.name === '充电') {
          return {
            id: 3,
            name: item.name,
            value: item.value,
            itemStyle: {
              normal: {
                color: '#01d9d6',
                borderColor: '#01d9d6'
              },
              emphasis: {
                color: '#01d9d6',
                borderColor: '#01d9d6'
              }
            },
            labelLine: {
              lineStyle: {
                color: '#01d9d6'
              }
            }
          }
        }
        if (item.name === '停留') {
          return {
            id: 4,
            name: item.name,
            value: item.value,
            itemStyle: {
              normal: {
                color: '#fff',
                borderColor: '#fff'
              },
              emphasis: {
                color: '#fff',
                borderColor: '#fff'
              }
            },
            labelLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        }
      })
      dataDetail.sort(function (a, b) {
        return a.id - b.id
      })
      let option = {
        animation: false,
        series: [{
          type: 'pie',
          center: ['50%', '55%'],
          radius: ['78%', '85%'],
          // 是否是顺时针
          clockWise: true,
          hoverAnimation: false,
          // 图形是否不响应和触发鼠标事件
          silent: true,
          itemStyle: {
            borderWidth: 6
          },
          label: {
            color: '#fff',
            fontSize: 12,
            fontFamily: 'PingFang-SC-Medium',
            formatter: '{c}%\n{b}'
          },
          labelLine: {
            length: 0
          },
          data: dataDetail
        }]
      }
      echarts.init(document.getElementById(id)).setOption(option)
    },
    setPie3 (id, info) {
      let data = info.filter((item) => {
        return item.name === '个人用户' || item.name === '企业用户'
      })
      let dataDetail = data.map((item) => {
        if (item.name === '个人用户') {
          return {
            id: 1,
            name: item.name,
            value: item.value,
            itemStyle: {
              normal: {
                color: '#01d9d6',
                borderColor: '#01d9d6'
              },
              emphasis: {
                color: '#01d9d6',
                borderColor: '#01d9d6'
              }
            },
            labelLine: {
              lineStyle: {
                color: '#01d9d6'
              }
            }
          }
        }
        if (item.name === '企业用户') {
          return {
            id: 2,
            name: item.name,
            value: item.value,
            itemStyle: {
              normal: {
                color: '#00b7ff',
                borderColor: '#00b7ff'
              },
              emphasis: {
                color: '#00b7ff',
                borderColor: '#00b7ff'
              }
            },
            labelLine: {
              lineStyle: {
                color: '#00b7ff'
              }
            }
          }
        }
      })
      dataDetail.sort(function (a, b) {
        return a.id - b.id
      })
      let option = {
        animation: false,
        series: [{
          type: 'pie',
          center: ['50%', '55%'],
          radius: ['78%', '85%'],
          // 是否是顺时针
          clockWise: true,
          hoverAnimation: false,
          silent: true,
          itemStyle: {
            borderWidth: 6
          },
          label: {
            color: '#fff',
            fontSize: 12,
            fontFamily: 'PingFang-SC-Medium',
            lineHeight: 40,
            formatter: '{c}%\n{b}'
          },
          labelLine: {
            length: 0
          },
          data: dataDetail
        }]
      }
      echarts.init(document.getElementById(id)).setOption(option)
    },
    setLine (id, info) {
      let xData = info.map((value) => {
        let timeArr = value.workTime.split('/')
        let newTime = timeArr[1] + '/' + timeArr[2]
        return newTime
      })
      let dataY = this.setYData(info)
      var maxValue = Math.max.apply(null, dataY)
      var minValue = Math.min.apply(null, dataY)
      let option = {
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          cantainLabel: true
        },
        xAxis: {
          type: 'category',
          show: false,
          // 设置两边是否有空间
          boundaryGap: false,
          data: xData
        },
        yAxis: {
          show: false,
          min: minValue - 5,
          max: maxValue,
          type: 'value',
          boundaryGap: true
        },
        // 设置动画时长
        // animationDuration: 2000,
        series: [{
          data: info,
          type: 'line',
          smooth: true, // 平滑显示曲线
          symbolSize: 4,
          symbol: 'circle',
          showSymbol: false,
          lineStyle: {
            color: '#01d9d6',
            width: 2
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(1,217,214, 0.5)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(2,238,237, 0)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        }]
      }
      echarts.init(document.getElementById(id)).setOption(option)
    },
    // 设置水球
    setliquidFill (id, info) {
      let option = {
        series: [{
          type: 'liquidFill',
          data: [info / 100],
          color: [
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: '#01d9d6'
                },
                {
                  offset: 0.5,
                  color: '#01cfe3'
                },
                {
                  offset: 0,
                  color: '#00b7ff'
                }
              ]
            }
          ],
          radius: '92',
          center: ['46', '46'],
          waveAnimation: true,
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
            show: false
          }
        }]
      }
      setTimeout(() => {
        echarts.init(document.getElementById(id)).setOption(option)
      }, 200)
    },
    // 城配运单统计的文字自动滚动
    scrollUp () {
      // let self = this
      let area = this.$refs.intelLogList
      // let areaH = area.clientHeight / 2
      this.$refs.intelLogList.scrollTo(0, parseFloat(area.scrollTop) + 1)
      if (parseInt(area.scrollTop) % this.scrollLiH === 0) {
        clearInterval(this.scrollTime)
        setTimeout(() => {
          this.startScroll()
        }, this.scrollDelay)
      } else if (area.scrollTop >= this.info10.datalist.length * this.scrollLiH) {
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
    // 编辑时间
    editTime (info) {
      let date = new Date()
      let time = info.map(() => {
        date.setDate(date.getDate() - 1)
        let month = date.getMonth() + 1
        let day = date.getDate()
        return `${month}/${day}`
      })
      return time
    },
    setYData (info) {
      let yData = info.map((item) => {
        return item.value
      })
      return yData
    }
  }
}
</script>

<style lang='less' scoped>
.intelligentLogistics{
  display: flex;
  .left,.right,.center{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .left,.right{
    flex: 27.22% 0;
  }
  .left{
    .line1{
      flex: 220px 0;
      .content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .line-content{
        display: flex;
        justify-content: space-between;
        .info{
          display: flex;
          align-items: flex-end;
          margin-top: 4px;
        }
        .num-right{
          padding: 8px;
          background-color: rgba(0,183,255, .3);
        }
      }
    }
    .line2{
      flex: 32px 0;
      .border{
        padding: 0 24px;
      }
      .content{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .warn1{
        &:before{
          content: '';
          display: inline-block;
          /*margin-right: 2px;*/
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #f05150;
        }
      }
      .warn2{
        /*margin: 0 8px;*/
        &:before{
          content: '';
          display: inline-block;
          /*margin-right: 2px;*/
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ff9900;
        }
      }
      .warn3{
        &:before{
          content: '';
          display: inline-block;
          /*margin-right: 2px;*/
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #f8e71c;
        }
      }
    }
    .line4, .line5{
      flex: 1;
    }
    .line3{
      flex: 183px 0;
      .border{
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        padding-bottom: 14px;
        .gauge1, .gauge2{
          position: relative;
          width: 214px;
          #gauge1, #gauge2{
            height: 100%;
          }
          .txt{
            position: absolute;
            bottom: 0px;
            z-index: 10;
            width: 100%;
            text-align: center;
            h4{
              margin-bottom: 24px;
              font: 14px PingFangSC-Semibold;
              color: #b5dcff;
            }
            .num{
              display: flex;
              justify-content: center;
              align-items: flex-end;
              color: #01d9d6;
            }
            .util{
              position: relative;
              top: -2px;
              margin-left: 4px;
            }
          }
        }
      }
    }
    .line4{
      .content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .title{
        flex: 20px 0;
      }
      #bar1{
        flex: 1;
      }
    }
    .line5{
      .content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .title{
        flex: 20px 0;
      }
      #barLine{
        flex: 1;
      }
    }
  }
  .center{
    flex: 1;
    margin: 0 24px;
    .line1{
      flex: 1;
      .border{
        position: relative;
        #mapBeijing{
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
        .title{
          width: 40%;
          font-size: 28px;
          &:before {
            height: 16px;
          }
        }
        .value-list{
          position: absolute;
          top: 16px;
          right: 16px;
        }
        .index{
          padding: 8px;
          height: 78px;
          background: linear-gradient(-135deg, transparent 16px, rgba(0, 183, 255, 0.3) 0);
          .name{
            margin-bottom: 16px;
            font-size: 14px;
            font-family: PingFangSC-semibold;
            color: #fff;
          }
          .value{
            font-size: 28px;
            font-family: Impact;
          }
          .util{
            margin-left: 4px;
          }
        }
        .index1{
          color: #00b7ff;
        }
        .index2{
          margin-right: 16px;
          color: #01d9d6;
        }
      }
    }
    .line2{
      flex: 190px 0;
      .border{
        display: flex;
      }
      .content-pie{
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        h3.name{
          flex: 14px 0;
          margin-bottom: 8px;
          font-size: 14px;
          font-family: PingFangSC-Semibold;
          color: #fff;
          text-align: center;
        }
        .txt{
          flex: 1;
          position: relative;
          #pie1, #pie2, #pie3{
            width: 100%;
            height: 100%;
          }
          #numPie1, #numPie2, #numPie3{
            position: relative;
            top: 2px;
          }
          .num{
            position: absolute;
            top: 54%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 28px;
            font-family: Impact;
          }
        }
      }
      .content-pie:first-child{
        flex: 33% 0;
      }
    }
  }
  .right{
    .line1{
      flex: 23.35% 0;
      #num4-1{
        margin: 20px 0 4px;
      }
      #pie4{
        width: 100%;
        height: 100%;
      }
      #numPie4{
        position: relative;
        top: 2px;
      }
      .num{
        position: absolute;
        top: 54%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 28px;
        font-family: Impact;
      }
      .icon{
        color: #f05150;
        font-size: 18px;
      }
    }
    .line2{
      flex: 1;
      .content{
        position: relative;
      }
      #intelLogList{
        position: absolute;
        top: 36px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: hidden;
      }
      li{
        display: flex;
        justify-content: space-between;
        text-align: left;
        line-height: 24px;
        font-size: 10px;
        font-family: PingFang-SC-Medium;
        color: #fff;
        background-color: rgba(0,183,255, 0.3);
      }
      li:nth-child(even) {
        background-color: transparent;
      }
    }
    .line3{
      flex: 192px 0;
      .border{
        display: flex;
      }
      .num{
        display: flex;
        align-items: flex-end;
        /*margin-top: 10px;*/
        color: #01d9d6;
      }
      .line3-left{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .num{
          margin-top: 10px;
        }
        h5{
          line-height: 1;
        }
      }
      .line3-right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 24px;
        &>h5.small-txt2{
          flex: 14px 0;
          margin-bottom: 8px;
        }
        .liquidFill{
          flex: 1;
          position: relative;
          #liquidFill{
            height: 100%;
          }
          &>.num{
            position: absolute;
            top: 46px;
            left: 46px;
            transform: translate(-50%, -50%);
            display: flex;
            color: #fff;
            font-size: 23px;
            font-family: Impact;
            .util{
              position: relative;
              top: 1px;
            }
          }
        }
        &>.num{
          flex: 28px 0;
          font-size: 28px;
          .icon{
            margin-right: 4px;
          }
        }
        #num5-4{
          position: relative;
          top: 2px;
        }
      }
    }
    .line4{
      flex: 1;
      .content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .title{
        flex: 20px 0;
      }
      #barLine2{
        flex: 1;
      }
    }
    .content{
      display: flex;
      flex-direction: column;
      height: 100%;
      .txt{
        flex: 1;
        position: relative;
      }
      #line1{
        flex: 1;
      }
    }
    .flex-contont{
      display: flex;
      align-items: flex-end;
      .icon{
        margin: 0 4px 0 8px;
      }
    }
    .icon{
      color: #f05150;
      font-size: 18px;
    }
  }
  .part{
    margin-bottom: 24px;
    .border{
      padding: 16px 24px;
      height: 100%;
      background-image: linear-gradient(to right, rgba(38,116,186,.3) 0%, rgba(84,206,254,.3) 50%, rgba(38,116,186,.3) 100%);
      border-image: linear-gradient(to right, rgba(0,133,255,.7) 0%, rgba(84,206,254,.7) 50%, rgba(0,133,255,.7) 100%) 30 30;
      border: 1px solid rgba(0,133,255,.7);
      .content{
        height: 100%;
      }
    }
    .border-line{
      position: relative;
      height: 100%;
      &:before{
        content: '';
        display: block;
        position: absolute;
        top: 4px;
        bottom: 4px;
        left: 4px;
        right: 4px;
        border-left: 2px solid #3090c6;
        border-right: 2px solid #3090c6;
      }
    }
  }
  .part:last-child{
    margin-bottom: 0;
  }
  .title{
    z-index: 1;
    position: relative;
    font: 20px/1 PingFangSC-Semibold;
    color: #fff;
    &:before {
      content: ' ';
      display: block;
      height: 8px;
      width: 100%;
      position: absolute;
      top: 50%;
      margin-top: -4px;
      background: linear-gradient(right,rgba(83,192,238,0),rgba(0,183,255,0.5));
      background: -webkit-linear-gradient(right,rgba(83,192,238,0),rgba(0,183,255,0.5));
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#53c0ee00',endColorStr='#00b7ff8c',gradientType='1');
      z-index: -1;
    }
  }
  .box{
    display: flex;
    height: 100%;
    .centent1{
      flex: 32.8% 0;
      margin-right: 48px;
    }
    .centent2{
      flex: 1;
    }
  }
  .small-txt1{
    font: 14px PingFangSC-Semibold;
    color: #fff;
    .num{
      margin-left: 4px;
      color: #01d9d6;
    }
  }
  .small-txt2{
    font: 14px PingFangSC-Semibold;
    color: #b5dcff;
  }
  .small-txt3{
    font: 12px PingFang-SC-Medium;
    color: #b5dcff;
  }
  .small-txt4{
    font: 14px PingFang-SC-Medium;
    color: #b5dcff;
  }
  .inline-block{
    display: inline-block;
  }
  .util{
    margin-left: 4px;
  }
}
</style>
