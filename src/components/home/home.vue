<template>
  <div id="main">
    <div class="content">
      <b-g border-w="40px" border-h="60px">
      <div class="content-header">
          <devices-top-info v-for="item in topInfo.data" :key="item.Id" :item="item" id-name="home"></devices-top-info>
      </div>
      </b-g>
      <div id="content-main">
        <baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view">
          <my-overlay :position="{lng: item.lang, lat: item.lat}" :text="item.name + ' ' + item.val" v-for="item in overlay" :key="item.lat"></my-overlay>
        </baidu-map>
      </div>
    </div>
    <div class="left">
      <b-g border-w="40px" border-h="400px">
        <border outer-h="400">
          <div slot="header">{{appOrder.name}}</div>
          <div slot="content">
            <div class="order-list">
              <div class="list-item" @click="goAppRank(item.id)" v-for="(item,index) in appOrder.data" :key="index">
                <div class="item-border">
                  <div class="item-image iconfont" :class="item.icon"></div>
                </div>
                <div class="item-name">{{item.name}}</div>
                <div class="item-flag" :class="{'first':index === 0 ,'middle':index ===1 || index === 2 }">{{index + 1}}</div>
              </div>
            </div>
          </div>
        </border>
      </b-g>
      <b-g border-w="40px" border-h="518px">
        <border outer-h="518">
          <div slot="header">{{appCatalog.name}}</div>
          <div slot="content">
            <div class="app-list">
              <div class="list-item catalog" v-for="(item,index) in appCatalog.data" :key="index">
                <div class="item-border">
                  <div class="item-image iconfont" :class="item.icon"></div>
                </div>
                <div class="item-name">{{item.name}}</div>
              </div>
            </div>
          </div>
        </border>
      </b-g>
    </div>
    <div class="right">
      <!--<b-g border-w="40px">-->
        <!--<border outer-h="274">-->
          <!--<div slot="header">{{safeTime.name}}</div>-->
          <!--<div slot="content">-->
            <!--<div class="circle-time">-->
              <!--<div class="time-text">-->
                <!--<div class="time-inner" v-for="(item,index) in safeTime.data" :key="item.id">-->
                  <!--<div class="text-total">{{item.name}}</div>-->
                  <!--<div class="text-hour"><span :id="'right'+ item.id" :class="{'text-blue':index===0,'text-red':index===1}"></span>{{item.unit}}</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</border>-->
      <!--</b-g>-->
      <!--<b-g border-w="40px" border-h="220px">-->
        <!--<border outer-h="220">-->
          <!--<div slot="header">{{services.name}}</div>-->
          <!--<div slot="content">-->
            <!--<div class="corn" v-for="item in services.data" :key="item.Id">-->
              <!--<div class="corn-content">-->
                <!--<div class="corn-image iconfont" :class="item.icon"></div>-->
                <!--<div class="corn-text">{{item.name}}</div>-->
                <!--<div class="corn-number">{{item.num}}</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</border>-->
      <!--</b-g>-->
      <b-g border-w="40px" border-h="400px">
        <border outer-h="400">
          <div slot="header">{{applications.name}}</div>
          <div slot="content">
            <div class="order-list">
              <div class="list-item" @click="goApplication(item.id)" v-for="(item,index) in applications.data" :key="index">
                <div class="item-border">
                  <div class="item-image">
                    <img :src="item.url" alt="">
                  </div>
                </div>
                <div class="item-name">{{item.name}}</div>
                <div class="item-flag" :class="{'first':index === 0 ,'middle':index ===1 || index === 2 }">{{index+1}}</div>
              </div>
            </div>
          </div>
        </border>
      </b-g>
      <b-g border-w="40px" border-h="518px">
        <border outer-h="518">
          <div slot="header">{{scene.name}}</div>
          <div slot="content">
            <div class="app-list">
              <div class="list-item catalog2" v-for="(item,index) in scene.data" :key="index">
                <div class="item-border">
                  <div class="item-image iconfont" :class="item.icon"></div>
                </div>
                <div class="item-name">{{item.name}}</div>
              </div>
            </div>
          </div>
        </border>
      </b-g>
    </div>
  </div>
</template>

<script>
import '@/assets/js/numbergd'
import border from './../../base/border/border'
import MyOverlay from './../../base/overlay/myOverlay'
import BG from './../../base/bg/bg'
import DevicesTopInfo from './../../base/devices-topInfo/devices-topInfo'
import CirclePercent from '../../base/charts/circlePercnet'
export default {
  name: 'home',
  data () {
    return {
      center: {lng: 2.790037, lat: 53.792707},
      zoom: 1,
      overlay: [],
      active: false,
      appOrder: [],
      applications: [],
      appCatalog: [],
      catalog: [],
      pageIndex: false,
      pageIndex2: false,
      timer1: '',
      timer2: '',
      safeTime: [],
      services: [],
      topInfo: [],
      scene: [],
      sceneData: []
    }
  },
  mounted () {
    let self = this
    self.getAppOrder()
    self.getApplications()
    self.getAppCatalog()
    self.getSafeTime()
    self.getService()
    self.getTopInfo()
    self.getScenesData()
  },
  beforeDestroy () {
    // if (this.timer1) {
    //   clearInterval(this.timer1)
    // }
    // if (this.timer2) {
    //   clearInterval(this.timer2)
    // }
  },
  methods: {
    handler ({BMap, map}) {
      this.center.lng = 54.114129
      this.center.lat = 27.550339
      this.zoom = 4
      let styleJson = [
        {
          'featureType': 'water',
          'elementType': 'all',
          'stylers': {
            'color': '#044161'
          }
        },
        {
          'featureType': 'land',
          'elementType': 'all',
          'stylers': {
            'color': '#004981'
          }
        },
        {
          'featureType': 'boundary',
          'elementType': 'geometry',
          'stylers': {
            'color': '#064f85'
          }
        },
        {
          'featureType': 'railway',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'geometry',
          'stylers': {
            'color': '#004981'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#005b96',
            'lightness': 1
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'arterial',
          'elementType': 'geometry',
          'stylers': {
            'color': '#004981'
          }
        },
        {
          'featureType': 'arterial',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#00508b'
          }
        },
        {
          'featureType': 'poi',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'green',
          'elementType': 'all',
          'stylers': {
            'color': '#056197',
            'visibility': 'off'
          }
        },
        {
          'featureType': 'subway',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'manmade',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'local',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'arterial',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'boundary',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#029fd4'
          }
        },
        {
          'featureType': 'building',
          'elementType': 'all',
          'stylers': {
            'color': '#1a5787'
          }
        },
        {
          'featureType': 'label',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        }
      ]
      map.setMapStyle({styleJson: styleJson})
      map.enableScrollWheelZoom()
      map.setMinZoom(4)
      this.overlay = this.getMapPoint()
    },
    getAppOrder () {
      this.axios.get('static/data/home/首页app排行.json').then(res => {
        if (res.status === 200) {
          this.appOrder = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getApplications () {
      this.axios.get('static/data/home/应用案例.json').then(res => {
        if (res.status === 200) {
          this.applications = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getAppCatalog () {
      this.axios.get('static/data/home/首页app分类统计.json').then(res => {
        if (res.status === 200) {
          this.appCatalog = res.data
          // let length = res.data.data.length
          // clearInterval(this.timer1)
          // this.timeLoop(length)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    timeLoop (length) {
      let that = this
      that.setTimer0(length)
      that.timer1 = setInterval(() => {
        this.pageIndex = !this.pageIndex
        if (this.pageIndex) {
          that.setTimer2(length)
        } else {
          that.setTimer1(length)
        }
      }, 10000)
    },
    setTimer0 (length) {
      let that = this
      let timer = ''
      let i = 0
      clearInterval(timer)
      this.catalog = this.appCatalog.data.slice(0, 7)
      timer = setInterval(() => {
        that.setActiveNode(i)
        if (i >= length - 1) {
          /* eslint-disable */
          $($('.catalog')).removeClass('active')
          clearInterval(timer)
        }
        i++
      }, 300)
    },
    setTimer1 (length) {
      let that = this
      let i = 0
      let timer = ''
      // this.catalog = this.appCatalog.data.slice(0, 7)
      clearInterval(timer)
      timer = setInterval(() => {
        this.$set(that.catalog, i, that.appCatalog.data[i])
        that.setActiveNode(i)
        if (i >= length - 1) {
          /* eslint-disable */
          $($('.catalog')).removeClass('active')
          clearInterval(timer)
        }
        i++
      }, 300)
    },
    setTimer2 (length) {
      let that = this
      let i = 0
      let timer = ''
      clearInterval(timer)
      timer = setInterval(() => {
        this.$set(that.catalog, i, that.appCatalog.data[7 + i])
        that.setActiveNode(i)
        if (i >= length - 7) {
          this.$set(that.catalog, i,{"name":"","icon":""})
          /* eslint-disable */
        }
        if ( i >= length - 3) {
          $($('.catalog')).removeClass('active')
          clearInterval(timer)
        }
        i++
      }, 300)
    },
    timeLoop2 (length) {
      let that = this
      that.setTimer3(length)
      that.timer2 = setInterval(() => {
        this.pageIndex2 = !this.pageIndex2
        if (this.pageIndex2) {
          that.setTimer5(length)
        } else {
          that.setTimer4(length)
        }
      }, 10000)
    },

    setTimer3 (length) {
      let i = 0
      let timer = ''
      this.sceneData = this.scene.data.slice(0, 7)
      clearInterval(timer)
      timer = setInterval(() => {
        /* eslint-disable */
        $($('.catalog2')[i]).addClass('active')
        if (i >= length - 1) {
          $($('.catalog2')).removeClass('active')
          clearInterval(timer)
        }
        i++
      }, 300)
    },
    setTimer4 (length) {
      let that = this
      let i = 0
      let timer = ''
      clearInterval(timer)
      timer = setInterval(() => {
        this.$set(that.sceneData, i, that.scene.data[i])
        /* eslint-disable */
        $($('.catalog2')[i]).addClass('active')
        if (i >= length - 1) {
          $($('.catalog2')).removeClass('active')
          clearInterval(timer)
        }
        i++
      }, 300)
    },
    setTimer5 (length) {
      let that = this
      let i = 0
      let timer = ''
      clearInterval(timer)
      timer = setInterval(() => {
        this.$set(that.sceneData, i, that.scene.data[7 + i])
        /* eslint-disable */
        $($('.catalog2')[i]).addClass('active')
        if (i >= length - 7) {
          this.$set(that.sceneData, i,{"name":"","icon":""})
        }
        if ( i >= length - 3) {
          $($('.catalog2')).removeClass('active')
          clearInterval(timer)
        }
        i++
      }, 300)
    },
    setActiveNode (i) {
      /* eslint-disable */
      $($('.catalog')[i]).addClass('active')
    },
    getSafeTime () {
      this.axios.get('/static/data/home/安全运营时长.json').then(res => {
        if (res.status === 200) {
          this.safeTime = res.data
          for (let i = 0; i < this.safeTime.data.length; i++) {
            setTimeout(() => {
              this.setRollNum('right' + this.safeTime.data[i].id, this.safeTime.data[i].value)
            }, 100)
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getScenesData () {
      this.axios.get('/static/data/home/十大场景.json').then(res => {
        if (res.status === 200) {
          this.scene = res.data
          // let length = res.data.data.length
          // clearInterval(this.timer2)
          // this.timeLoop2(length)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getService () {
      this.axios.get('/static/data/home/微服务&算法库.json').then(res => {
        if (res.status === 200) {
          this.services = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getTopInfo () {
      this.axios.get('/static/data/home/首页top信息.json').then(res => {
        if (res.status === 200) {
          this.topInfo = res.data
        //   资产系数 为 590000
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getMapPoint () {
      let overlay = []
      this.axios.get('../static/data/home/map.json').then(res => {
        if (res.status === 200) {
          Array.from(res.data, x => {
            let item = {'lang': '', 'lat': '', 'name': '', 'val': ''}
            item.lang = x.latlngs.lng
            item.lat = x.latlngs.lat
            item.name = x.content.title
            item.val = x.content.content
            overlay.push(item)
          })
        }
      })
      return overlay
    },
    goApplication (id) {
      this.$router.push({ path: `/screen/application/${id}` })
    },
    goAppRank (id) {
      this.$router.push({ path: `/screen/appRank/${id}` })
    },
    setRollNum (id, num) {
      // 获取小数和整数部分
      // eslint-disable-next-line
      $(`#${id}`).rollNum({
        deVal: num,
        digit: num.length
      })
    }
  },
  components: {
    border,
    MyOverlay,
    BG,
    DevicesTopInfo,
    CirclePercent
  }
}
</script>

<style scoped lang="less">
  /*@keyframes transformX {*/
    /*0% {*/
      /*transform: rotateX(0deg);*/
    /*}*/
    /*50% {*/
      /*transform: rotateX(180deg);*/
    /*}*/
    /*100% {*/
      /*transform: rotateX(360deg);*/
    /*}*/
  /*}*/
  #main {
    display: flex;
    overflow: hidden;
    .content {
      flex: 1;
      margin: 0 24px;
      display: flex;
      flex-direction: column;
      .content-header {
        height: 104px;
       justify-content: space-between;
        padding: 15px;
        background: linear-gradient(to right,rgba(38,116,186,0.3),rgba(84,206,254,0.3),rgba(38,116,186,0.3));
        border: 1px solid rgba(0,133,255,0.7);
        display: flex;
        .header-modal{
          flex: 1;
          margin: 16px 0 16px 16px;
          .header-icon {
            height: 71px;width: 71px;display: inline-block;
            margin-right: 8px;
            vertical-align: middle;
            .icon {
              width: 40px;
              height: 40px;
              font-size: 36px;
              color: #54cefe;
              margin: 16px auto;
              text-align: center;
            }
          }
          .header-right {
            display: inline-block;
            vertical-align: middle;
            .header-title {
              font-size: 20px;
              color: #b5dcff;
            }
            .header-number {
              font-size: 36px;
              font-family: 'Impact';
              color: #fff;
              span {
                font-size: 14px;
              }
            }
          }
        }
      }
      #content-main {
        height: 814px;
        margin-top: 24px;
        border: 1px solid rgba(84,206,254,0.7)
      }
    }
    .left,.right {
      flex: 0 0 295px;
      align-items: stretch;
    }
    .left {
      order: -1;
    }
  }
  .order-list {
    .list-item {
      height: 52px;
      line-height: 52px;
      background: rgba(0,183,255,0.3);
      margin-top: 16px;
      position: relative;
      cursor: pointer;
      .item-border {
        position: absolute;
        top: 0;
        left: 0;
        background-size: 100% 100%;
        width: 52px;
        height: 52px;
        display: flex;
        align-content: center;
        justify-content: center;
        .corn-left {
          border: 2px solid #333;
          left: 0;
        }
        .item-image {
          width: 32px;
          height: 32px;
          font-size: 32px;
          img {
            width: 100%;
            height: 100%;
            background-size: contain;
            margin: 10px 0;
          }
        }
      }
      .item-name {
        margin-left: 60px;
      }
      .item-flag{
        position: absolute;
        top: 0;
        right: 0;
        height: 24px;
        width: 24px;
        line-height: 24px;
        text-align: center;
        border-bottom-left-radius: 4px;
        font-size: 18px;
        background: #35b8ff;
      }
      .first {
        background: #fe4d45;
      }
      .middle {
        background: #ff9900;
      }
    }
  }
  .app-list {
    .list-item {
      height: 50px;
      line-height: 50px;
      background: rgba(0,183,255,0.3);
      margin-top: 16px;
      position: relative;
      transform-style: preserve-3d;
      .item-border {
        position: absolute;
        top: 0;
        left: 0;
        background-size: 100% 100%;
        width: 52px;
        height: 52px;
        display: flex;
        align-content: center;
        justify-content: center;
        .corn-left {
          border: 2px solid #333;
          left: 0;
        }
        .item-image {
          width: 28px;
          height: 28px;
          font-size: 28px;
        }
      }
      .item-name {
        margin-left: 60px;
      }
      .item-flag{
        position: absolute;
        top: 0;
        right: 0;
        height: 24px;
        width: 24px;
        line-height: 24px;
        text-align: center;
        border-bottom-left-radius: 4px;
        font-size: 18px;
        background: #35b8ff;
      }
      .first {
        background: #fe4d45;
      }
      .middle {
        background: #ff9900;
      }
    }
    /*.active {*/
      /*animation: transformX  1s linear;*/
    /*}*/
  }

  .right {
    .circle-time {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      margin: 16px auto 0;
      border: 8px solid rgba(0,183,255,1);
      .time-text {
        text-align: center;
        color: #54cefe;
        .text-total {
          font-size: 18px;
          margin-top: 16px;
          margin-bottom: 8px;
        }
        .text-hour {
          font-size: 14px;
          color: #b5dcff;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          span {
            font-size: 36px;
            font-family: Impact;
          }
          .text-blue {
            color: #54c3f1;
          }
          .text-red {
            color: #01d9d6;
          }
        }
      }
    }
  }

  .corn {
    width: 100%;
    margin-top: 16px;
    background:linear-gradient(-135deg, transparent 16px, rgba(0,183,255,0.3) 0);
    color: #fff;
    .corn-content {
      .corn-image,.corn-text,.corn-number {
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
      }
      .corn-image {
        width: 64px;
        height: 64px;
        font-size: 36px;
        padding: 14px;
      }
      .corn-text {
        margin-right: 24px;
      }
      .corn-number {
        font-family: Impact;
      }
    }
  }

  .bm-view{
    width: 100%;
    height: 100%;
  }

</style>
