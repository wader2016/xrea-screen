<template>
  <div class="inventory">
    <!--<h3 class="title">设备保有数量统计</h3>-->
    <div id='allmap'></div>
  </div>
</template>

<script>
import axios from 'axios'
import BMap from 'BMap'
import {mapStyle} from '../../../../static/js/mapStyle'
const mapv = require('mapv')
export default {
  name: 'inventory',
  mounted () {
    this.createMap()
  },
  methods: {
    createMap () {
      let self = this

      // 百度地图API功能
      let map = new BMap.Map('allmap', {
        enableMapClick: false
      })
      // 创建Map实例
      map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5)
      // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true)
      // 开启鼠标滚轮缩放

      // 地图自定义样式
      map.setMapStyle({
        styleJson: mapStyle
      })
      axios.get('/static/data/保有量机器位置信息.json')
        .then(function (res) {
          self.setMapv(map, res.data)
        })
    },
    /* eslint-disable */
    setMapv (map, rs1) {
      let data1 = []
      for (let i = 0; i < rs1.length; i++) {
        let data = rs1[i]
        let geoCoord = [data.Lng, data.Lat]
        data1.push({
          geometry: {
            type: 'Point',
            coordinates: geoCoord
          },
          time: Math.random() * 10
        })
      }
      let dataSet1 = new mapv.DataSet(data1)
      let options1 = {
        fillStyle: 'rgba(235, 230, 0, 0.8)',
        bigData: 'Point',
        size: 1.5,
        draw: 'simple'
      }
      let mapvLayer1 = new mapv.baiduMapLayer(map, dataSet1, options1)

      let dataSet2 = new mapv.DataSet(data1)
      let options2 = {
        fillStyle: 'rgba(255, 250, 250, 0.9)',
        size: 1.5,
        draw: 'simple',
        bigData: 'Point',
        animation: {
          stepsRange: {
            start: 0,
            end: 10
          },
          trails: 1,
          duration: 7
        }
      }
      let mapvLayer3 = new mapv.baiduMapLayer(map, dataSet2, options2)
    }
  }
}
</script>

<style lang="less" scoped>
.inventory{
  position: relative;
  /*height: 100%;*/
  #allmap {
    width: 100%;
    height: 100%;
  }
}
</style>
