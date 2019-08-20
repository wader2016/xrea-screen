<template>
  <div class="devices">
    <bg borderW="40px" borderH="60px">
      <div class="devices-part1 scrollbar">
        <devices-top-info v-for="(item,index) in topInfo" :key="index" :item='item' id-name="device"></devices-top-info>
      </div>
    </bg>
    <div class="devices-part2 scrollbar">
      <div class="devices-container">
        <devices-item class="devices-item" v-for="(item, index) in devicesList" :key="index" :item="item"></devices-item>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import storage from 'good-storage'
import DevicesTopInfo from '@/base/devices-topInfo/devices-topInfo'
import DevicesItem from '@/base/devices-item/devices-item'

export default {
  name: 'devices',
  data () {
    return {
      topInfo: [],
      devicesList: []
    }
  },
  created () {
    this.getTopInfo()
    this.getDeviceList()
  },
  methods: {
    getTopInfo () {
      let timeKey = 'WORKTIME_KEY'
      axios.get('/static/data/device/设备连接-接入设备top信息.json')
        .then((res) => {
          let data = res.data.data
          let index = data.findIndex((item) => {
            return item.name === '设备总时长'
          })
          if (storage.get(timeKey)) {
            data[index].num = storage.get(timeKey)
          } else {
            storage.set(timeKey, data[index].num)
          }
          this.topInfo = JSON.parse(JSON.stringify(data))
        })
    },
    getDeviceList () {
      axios.get('/static/data/device/连接设备-设备列表.json')
        .then((res) => {
          this.devicesList = res.data.data
        })
    }
  },
  components: {
    DevicesTopInfo,
    DevicesItem
  }
}
</script>

<style lang="less" scoped>
.devices{
  position: relative;
  .devices-part1{
    display: flex;
    justify-content: space-between;
    padding: 15px;
    height: 106px;
    overflow-x: auto;
    background-image: linear-gradient(to right, rgba(38,116,186,.3) 0%, rgba(84,206,254,.3) 50%, rgba(38,116,186,.3) 100%);
    border: 1px solid rgba(0,133,255,.7);
    border-image: linear-gradient(to right, rgba(0,133,255,.7) 0%, rgba(84,206,254,.7) 50%, rgba(0,133,255,.7) 100%) 30 30;
  }
  .devices-part2{
    /*justify-content: space-between;*/
    position: absolute;
    top: 129px;
    left: 0;
    right: -24px;
    bottom: -24px;
    /*padding-right: 15px;*/
    overflow-y: auto;
    overflow-x: hidden;
    .devices-container{
      display: flex;
      flex-wrap: wrap;
      margin-right: ~"calc(100% - 100vw + 96px)";
      border-bottom: none;
      /*position: relative;*/
      /*left: 0;*/
      /*right: -8px;*/
    }
    .devices-item{
      margin-bottom: 24px;
      margin-right: 1.3%;
      min-width: 341px;
      width: 18.69%;
      cursor: pointer;
    }
  }
}
@media screen and (min-width: 1900px) {
  .devices .devices-part2 .devices-item{
    width: 18.69%;
    margin-right: 1.3%;
  }
}
@media screen and (max-width: 1899px) and (min-width: 1540px) {
  .devices .devices-part2 .devices-item{
    width: 23.5%;
    margin-right: 1.5%;
  }
}
@media screen and (max-width: 1539px) and (min-width: 1170px) {
  .devices .devices-part2 .devices-item{
    width: 31.6%;
    margin-right: 1.7%;
  }
}
@media screen and (max-width: 1169px) and (min-width: 812px) {
  .devices .devices-part2 .devices-item{
    width: 48%;
    margin-right: 2%;
  }
}
</style>
