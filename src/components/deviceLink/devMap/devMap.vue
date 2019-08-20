<template>
  <div class="dev-map">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'devMap',
  data () {
    return {
      map: '',
      name: ''
    }
  },
  async mounted () {
    let id = this.$route.params.id
    await this.getParamsName(id)
    this.createMap(this.name)
  },
  methods: {
    async getParamsName (id) {
      await this.axios.get('static/data/device/连接设备-设备列表.json').then(res => {
        if (res.status === 200) {
          let item = res.data.data.filter(item => item.id === parseInt(id))
          this.name = item[0].name
        }
      })
    },
    createMap (name) {
      /* eslint-disable */
      let map = new AMap.Map('map', {
        resizeEnable: true,
        center: [105.403119, 38.028658],
        zoom: 5
      })
      // 高德地图在线样式
      map.setMapStyle('amap://styles/blue')
      // map.setMinClusterSize(10)
      this.getMapData(map, name)
    },
    async getMapData (map, name) {
      await this.axios.get('static/data/devMap/' + name + '位置.json').then(res => {
        if (res.status === 200) {
          let data = res.data.RECORDS
          let markers = []
          /* eslint-disable */
          for (let i = 0; i < data.length; i++) {
            markers.push(new AMap.Marker({
              position: [data[i]['LNG'], data[i]['LAT']],
              offset: new AMap.Pixel(-15, -15),
              content: '<div style="background-color: #ff9900; height: 12px; width: 12px; border: 1px solid #ff9900; border-radius: 50%; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
            }))
          }
          let styles = [{
            url: 'static/img/devMap/圆点x16.png',
            size: new AMap.Size(16, 16),
            offset: new AMap.Pixel(-9, -9),
            textColor: '#fff'
          },
          {
            url: 'static/img/devMap/圆点x24.png',
            size: new AMap.Size(24, 24),
            offset: new AMap.Pixel(-12, -12),
            textColor: '#fff'
          },
          {
            url: 'static/img/devMap/圆点x32.png',
            size: new AMap.Size(34, 34),
            offset: new AMap.Pixel(-17, -17),
            textColor: '#fff'
          },
          {
            url: 'static/img/devMap/圆点x48.png',
            size: new AMap.Size(50, 50),
            offset: new AMap.Pixel(-25, -25),
            textColor: '#fff'
          }]
          setTimeout(() => {
            map.plugin(['AMap.MarkerClusterer'], function () {
              // eslint-disable-next-line
              let cluster = new AMap.MarkerClusterer(
                map, markers, {
                  styles: styles,
                  gridSize: 80,
                  minClusterSize: 20
                })
            })
          }, 200)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .deviceLink .child-view {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  #map {
    width: 100%;
    height: 100%;
    .bm-view {
      width: 100%;
      height: 100%;
    }
  }

</style>
