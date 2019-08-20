<template>
  <div id="resolution">
    <div class="left">
      <resolution-left :showNum="true" v-for="item in pointData.data" :key="item.id" :index="item.id" :item="item"></resolution-left>
      <resolution-left :showNum="false" :item="product[0]"></resolution-left>
    </div>
    <div class="main">
      <div class="main-title">
        <resolution-title v-for="list in title" :key="list.id" :item="list"></resolution-title>
      </div>
      <div class="main-content">
        <img class="main-img" src="static/img/device-big-img/起重机03.png" alt="">
        <img class="img-code" src="static/img/code.png" alt="">
        <div class="line" :class="{'point1': isPoint1, 'point2': isPoint2, 'point3': isPoint3}"></div>
        <div class="main-point" :class="{'position1': isPoint1, 'position2': isPoint2, 'position3': isPoint3}">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="center"></div>
        </div>
      </div>
    </div>
    <div class="right">
      <resolution-right :showNum="true" v-for="item in rightData" :key="item.id" :index="item.id" :item="item"></resolution-right>
      <resolution-right :showNum="false" :item="product[1]"></resolution-right>
    </div>
  </div>
</template>

<script>
import ResolutionTitle from '@/base/resolution/resolution-title'
import ResolutionLeft from '@/base/resolution/resolution-left'
import ResolutionRight from '@/base/resolution/resolution-right'
export default {
  name: 'idResolution',
  data () {
    return {
      title: [],
      leftData: [],
      pointData: {},
      rightData: [],
      product: [],
      isPoint1: true,
      isPoint2: false,
      isPoint3: false
    }
  },
  mounted () {
    this.getResolutionTitle()
    this.getResolutionLeftData()
    this.getResolutionRightData()
    this.getResolutionProductData()
    const that = this
    setInterval(function () {
      if (that.isPoint1) {
        that.isPoint1 = false
        that.isPoint2 = true
        that.isPoint3 = false
        that.pointData = that.leftData.find(item => item.point === 2)
      } else if (that.isPoint2) {
        that.isPoint1 = false
        that.isPoint2 = false
        that.isPoint3 = true
        that.pointData = that.leftData.find(item => item.point === 3)
      } else if (that.isPoint3) {
        that.isPoint1 = true
        that.isPoint2 = false
        that.isPoint3 = false
        that.pointData = that.leftData.find(item => item.point === 1)
      }
    }, 10000)
  },
  methods: {
    getResolutionTitle () {
      const that = this
      this.axios.get('./static/data/resolution/title.json').then(res => {
        that.title = res.data
      })
    },
    getResolutionLeftData () {
      this.axios.get('./static/data/resolution/left-data.json').then(res => {
        this.leftData = res.data
        this.pointData = this.leftData.find(item => item.point === 1)
      })
    },
    getResolutionRightData () {
      this.axios.get('./static/data/resolution/right-data.json').then(res => {
        this.rightData = res.data
      })
    },
    getResolutionProductData () {
      this.axios.get('./static/data/resolution/product.json').then(res => {
        this.product = res.data
      })
    }
  },
  components: {
    ResolutionTitle,
    ResolutionLeft,
    ResolutionRight
  }
}
</script>

<style scoped lang="less">
  #resolution {
    display: flex;
    .left, .main, .right {
      display: flex;
      flex-direction: column;
    }
    .left {
      flex: 0 0 300px;
    }
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      .main-title {
        border-bottom: 1px solid #00b7ff;
        display: flex;
        padding-left: 24px;
        justify-content: space-between;
      }
      .main-content {
        flex: 1;
        position: relative;
        overflow: hidden;
        .main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .img-code {
          position: absolute;
          top: 494px;
          left: 600px;
          width: 64px;
          height: 64px;
        }
        .main-point {
          position: absolute;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 2px solid #01d9d6;
          background-color: rgba(1,217,214,0.2);
          .circle1, .circle2, .circle3, .center {
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -18px 0 0 -18px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: rgba(1,217,214,0.3);
          }
          .center {
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -8px 0 0 -8px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: rgba(1, 217, 214, 0.7);
          }

          .circle1{
            -webkit-animation:circle 3s linear infinite;
            animation:circle 3s linear infinite;
          }

          .circle2{
            -webkit-animation:circle 3s linear 0.8s infinite;
            animation:circle 3s linear 0.8s infinite;
          }
          .circle3{
            -webkit-animation:circle 3s linear 1.6s infinite;/* Safari and Chrome */
            animation:circle 3s linear 1.6s infinite;
          }
          @keyframes circle{ /* Safari and Chrome */
            from{
              opacity:1;
              -webkit-transform:scale(0);
            }
            to{
              opacity:0;
              -webkit-transform:scale(3);
            }
          }
        }
      }
    }
    .right {
      flex: 0 0 300px;
    }
  }
  .line {
    height: 2px;
    background-color: #01d9d6;
    position: absolute;
  }
  .point1 {
    width: 140px;
    top: 160px;
    left: 140px;
    transform: translateX(-140px);
    animation: rightToLeft1 2s ease-in-out;
  }
  .position1 {
    top: 160px;
    left: 140px;
    margin-top: -80px;
  }
  .point2 {
    width: 800px;
    top: 340px;
    left: 800px;
    transform: translateX(-800px);
    animation: rightToLeft2 2s ease-in-out;
  }
  .position2 {
    top: 340px;
    left: 800px;
    margin-top: -80px;
  }
  .point3 {
    width: 700px;
    top: 560px;
    left: 700px;
    transform: translateX(-700px);
    animation: rightToLeft3 2s ease-in-out;
  }
  .position3 {
    top: 560px;
    left: 700px;
    margin-top: -80px;
  }
  @keyframes rightToLeft1 {
    0% {
      width: 0;
      transform: translateX(0);
    }
    100% {
      width: 140px;
      transform: translateX(-140px);
    }
  }
  @keyframes rightToLeft2 {
    0% {
      width: 0;
      transform: translateX(0);
    }
    100% {
      width: 800px;
      transform: translateX(-800px);
    }
  }
  @keyframes rightToLeft3 {
    0% {
      width: 0;
      transform: translateX(0);
    }
    100% {
      width: 700px;
      transform: translateX(-700px);
    }
  }
</style>
