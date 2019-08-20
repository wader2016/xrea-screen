<template>
  <div class="workTime">
    <div class="explain">
      <h3 class="title">累计工作时长(小时)</h3>
      <div class="timeNum">
        <div id="timeNum"></div>
        <div class="unti">小时</div>
      </div>
      <img src="/static/img/数据图.png">
    </div>
    <div id='map'></div>
  </div>
</template>

<script>
import axios from 'axios'
import BMap from 'BMap'
import {mapStyle} from '../../../../static/js/mapStyle'
import storage from 'good-storage'
const mapv = require('mapv')
// eslint-disable-next-line
import '@/assets/js/numbergd'

export default {
  name: 'workTime',
  data () {
    return {
      map: '',
      time: null,
      workTime: 2679162172,
      timeKey: 'WORKTIME_KEY'
    }
  },
  beforeDestroy () {
    clearTimeout(this.time)
  },
  mounted () {
    this.getData()
    this.time = null
    if (storage.get(this.timeKey)) {
      this.workTime = storage.get(this.timeKey)
    } else {
      storage.set(this.timeKey, this.workTime)
    }
    this.setRollNum('#timeNum', this.workTime)
  },
  methods: {
    createMap () {
      // 百度地图API功能
      let map = new BMap.Map('map', {
        enableMapClick: false
      })
      // 创建Map实例
      map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5)// 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放

      map.setMapStyle({
        styleJson: mapStyle
      })
      this.map = map
    },
    getData () {
      let self = this
      axios.get('/static/data/开工率分布(1).json')
        .then(function (res) {
          self.createMap()
          self.setMapv(res.data)
        })
    },
    refactorData (data) {
      let info = []
      for (let i = 0; i < data.length; i++) {
        info.push({
          geometry: {
            type: 'Point',
            coordinates: [data[i].Lng, data[i].Lat]
          },
          count: data[i].AbovePercent
        })
      }
      return info
    },
    /* eslint-disable */
    setMapv (data) {
      let info = this.refactorData(data)
      let dataSet = new mapv.DataSet(info)

      let options = {
        size: 12,
        gradient: {0.25: 'rgb(0,0,255)', 0.55: 'rgb(0,255,0)', 0.95: 'yellow', 1.0: 'rgb(255,0,0)'},
        max: 100,
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

      let mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options)
    },
    // 使数字旋转
    setRollNum (id, num) {
      // 生成5-10的随机数
      let add = Math.floor(Math.random()*6+5)
      num = parseInt(num) + add
      storage.set(this.timeKey, num)
      this.workTime = num
      $(id).rollNum({
        deVal: num,
        digit: (num + '').length
      })
      // eslint-disable-next-line
      this.time = setTimeout(() => {
        this.setRollNum(id, num)
      }, 10000)
    },
  }
}
</script>

<style lang="less" scoped>
.workTime{
  position: relative;
  height: 100%;
  .explain{
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 10;
    height: 36px;
    .unti{
      position: relative;
      top: -2px;
      margin-left: 4px;
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      color: #b5dcff;
    }
    img{
      width: 100%;
    }
  }
  .title{
    padding-left: 8px;
    border-left: 4px solid #01d9d6;
    line-height: 24px;
    color: #fff;
    font-size: 20px;
    font-family: PingFangSC-Semibold;
  }
  .timeNum{
    display: flex;
    align-items: flex-end;
    margin: 8px auto;
  }
  #timeNum{
    color: #01d9d6;
    font-size: 36px;
  }
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
