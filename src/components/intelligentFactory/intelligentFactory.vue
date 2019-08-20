
<template>
  <div class="intelligentFactory">
    <div class="factory">
          <factory-top v-for="(item,index) in factoryInfo.data" :currentOrder="currentOrder" :index="index" :item="item" :key="index"></factory-top>
        </div>
    <div class="factory-date">
          <div class="title">
            <div class="text">{{orderInfo.name}}</div>
            <div class="date-info">
              <div class="date" v-for="(item,index) in dateInfo" :key="index">
                <div class="date-month">{{item.month}}</div>
                <div class="date-day">
                  <div class="day-number" :class="calDateNow(item.month,date.name)" v-for="(date,day) in item.day" :key="day">
                    <div class="number">{{date.name}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="factory-order">
            <div class="order" v-for="(item,index) in orderInfo.data" :key="index">
              <div class="order-name" :style="{'border-left-color':color[index]}">{{item.name}}</div>
              <div class="order-state">
                <div class="state state-plan" :style="calPosition(item.startDate,item.endDate)">
                  <div class="plan-data" :style="calProcess(item.plan.startDate,item.plan.endDate,item.startDate,item.plan.status)">{{item.plan.currentNode}}</div>
                </div>
                <div class="state state-act" :style="calPosition(item.startDate,item.endDate)">
                  <div class="plan-data" :style="calProcess(item.progress.startDate,item.progress.endDate,item.startDate,item.progress.status)">{{item.progress.currentNode}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    <div class="factory-info">
          <div class="order-info">{{processInfo.name}}</div>
          <div class="order-content">
            <div class="first-line">
              <div class="process" v-for="(item,index) in firstLine" :key="index">
                <div class="process-point">
                  <div class="point" :class="{'completed':item.status === '1', 'unCompleted': item.status === '0','unStart':item.status === '9'}">
                    <div class="right-line"></div>
                    <div class="angle-left"></div>
                    <div class="angle-right"></div>
                  </div>
                  <div class="process-name">{{item.node}}</div>
                  <div class="process-detail">{{item.name}}</div>
                </div>
                <div class="process-online">
                  <div class="text">在线制品：{{item.curWorkNum}}</div>
                </div>
              </div>

            </div>
            <div class="radius-line"></div>
            <div class="radius-row-line">
              <div class="inner-text">在线制品：0</div>
            </div>
            <div class="last-line">
              <div class="process" v-for="(item,index) in lastLine" :key="index">
                <div class="process-point">
                  <div class="point" :class="{'completed':item.status === '1', 'unCompleted': item.status === '0','unStart':item.status === '9'}">
                    <div class="right-line"></div>
                    <div class="angle-left"></div>
                    <div class="angle-right"></div>
                  </div>
                  <div class="process-name">{{item.node}}</div>
                  <div class="process-detail">{{item.name}}</div>
                </div>
                <div class="process-online">
                  <div class="text">在线制品：{{item.curWorkNum}}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
  </div>
</template>

<script>
import FactoryTop from './../../base/charts/factoryTop'
let moment = require('moment')
export default {
  name: 'IntelligentFactory',
  data () {
    return {
      factoryInfo: [],
      orderInfo: [],
      processInfo: [],
      firstLine: [],
      lastLine: [],
      dateInfo: [],
      currentOrder: [],
      color: ['#a772f8', '#a6e56b', '#21d37d', '#4a92ff']
    }
  },
  mounted () {
    this.getInfo()
    this.getProcessInfo()
    this.getDateInfo()
  },
  computed: {
    calPosition () {
      return function (startDate, endDate) {
        let m1 = moment(startDate)
        let m2 = moment(endDate)
        let firstDate = moment('2019-01-11')
        let width = (m2.diff(m1, 'days') + 1) * 50
        let left = m1.diff(firstDate, 'days') * 50
        return {
          width: width + 'px',
          left: left + 'px'
        }
      }
    },
    calProcess () {
      return (processStartDate, processEndDate, startDate, status) => {
        let m1 = moment(processStartDate)
        let m2 = moment(processEndDate)
        let m3 = moment(startDate)
        let width = (m2.diff(m1, 'days') + 1) * 50
        let left = m1.diff(m3, 'days') * 50
        return {
          width: width + 'px',
          left: left + 'px',
          background: status === '0' ? '#f05150' : '#00b7ff'
        }
      }
    },
    calDateNow () {
      return (month, date) => {
        let m = month.split('/')[1]
        let day = date.split('/')[1]
        let isActive = false
        if (moment(new Date()).format('MM-DD') === moment(m + '-' + day).format('MM-DD')) {
          isActive = true
        }
        return {
          active: isActive
        }
      }
    }
  },
  methods: {
    async getInfo () {
      await this.getOrderInfo()
      await this.getFactoryInfo()
    },
    getFactoryInfo () {
      this.axios.get('../static/data/intelligentFactory/智能工厂基础信息.json').then(res => {
        if (res.status === 200) {
          this.factoryInfo = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getDateInfo () {
      this.axios.get('../static/data/intelligentFactory/日期.json').then(res => {
        if (res.status === 200) {
          let date = new Date()
          let month = date.getMonth()
          // 写死4月份展示用
          let info = []
          const arr = res.data.data
          // info.push(arr[2], arr[3])
          for (let index = 0; index < arr.length; index++) {
            if (arr[index].id === month) {
              if (month > 0 && month < 11) {
                info.push(arr[index - 1])
                info.push(arr[index])
                info.push(arr[index + 1])
              } else if (month === 0) {
                info.push(arr[11])
                info.push(arr[0])
                info.push(arr[1])
              } else if (month === 11) {
                info.push(arr[10])
                info.push(arr[11])
                info.push(arr[0])
              }
            }
          }
          this.dateInfo = info
          console.log(this.dateInfo)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getOrderInfo () {
      this.axios.get('../static/data/intelligentFactory/整车VIN码.json').then(res => {
        if (res.status === 200) {
          this.orderInfo = res.data
          let currentOrder = []
          for (let i = 0; i < this.orderInfo.data.length; i++) {
            currentOrder.push({
              name: this.orderInfo.data[i].progress.currentNode,
              color: this.color[i]
            })
          }
          this.currentOrder = currentOrder
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getProcessInfo () {
      this.axios.get('../static/data/intelligentFactory/工序基础信息.json').then(res => {
        if (res.status === 200) {
          this.processInfo = res.data
          this.firstLine = this.processInfo.data.slice(0, 11)
          this.lastLine = this.processInfo.data.slice(11)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    FactoryTop
  }
}
</script>

<style scoped lang="less">
  @keyframes translateX {
    0% {
      transform: translateX(0);
    }
  }

  .intelligentFactory {
    font-family: 'PingFang-SC-Semibold';
    border: 1px solid rgba(0,183,255,0.3);
    padding: 24px;
    .factory {
      display: flex;
      width: 100%;
      justify-content: space-between;
      overflow: hidden;
    }
    .factory-date {
      .title {
        display: flex;
        padding-top: 24px;
        .text {
          flex: 0 0 155px;
          font-size: 20px;
          margin-right: 16px;
        }
        .date-info {
          flex: 1;
          text-align: center;
          display: flex;
          overflow: hidden;
          .date {
            flex: 1;
            transform: translateX(-1500px);
            animation: translateX 2s ease-in-out;
            .date-month {
              height: 32px;
              line-height: 32px;
              font-size: 18px;
              background: #002645;
              border-right: 2px solid rgba(255,255,255,0.3);
            }
            .date-day {
              display: flex;
              justify-content:space-between ;
              .day-number {
                width: 50px;
                font-size: 14px;
                font-family: PingFang-SC_Medium;
                text-align: center;
                padding-bottom: 360px;
                .number {
                  background: #002645;
                  height: 24px;
                  line-height: 24px;
                }
              }
              .active {
                border-top: 1px solid #f05150;
                background: #002039;
                .number {
                  background: none;
                }
              }
            }
          }
        }
      }
      .factory-order {
        margin-top: -352px;
        margin-bottom: 8px;
        position: relative;
        .order {
          display: flex;
          padding: 8px 0;
          .order-name {
            flex: 0 0 155px;
            height: 72px;
            line-height: 72px;
            font-size: 18px;
            padding-left: 16px;
            padding-right: 16px;
            border-left: 4px solid #fff;
          }
          .order-state {
            display: flex;
            width: 500px;
            justify-content: center;
            flex-direction: column;
            font-size: 14px;
            .state {
              height: 24px;
              align-items: center;
              border-radius: 24px;
              background: #1a476e;
              position: relative;
              .plan-data {
                position: absolute;
                top: 0;
                left: 50px;
                background: rgba(0,183,255,1);
                width: 150px;
                height: 24px;
                border-radius: 24px;
                text-align: center;
                line-height: 24px;
              }
            }
            .state-plan {
              margin: 8px 0;
            }
            .state-act {
              margin-bottom: 8px;
            }
          }
        }
      }
    }
    .factory-info {
      display: flex;
      margin-top: 24px;
      .order-info {
        flex: 0 0 140px;
        font-size: 20px;
      }
      .order-content {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        .radius-line {
          position: absolute;
          right: 36px;
          top: 12px;
          width: 115px;
          height: 144px;
          border-top: 2px solid #fff;
          border-right: 2px solid #fff;
          border-bottom: 2px solid #fff;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          &:after {
            position: absolute;
            content: '';
            border: 6px solid transparent;
            border-right-color: #fff;
            bottom: -6px;
            left: -6px;
          }
        }
        .radius-row-line {
          position: absolute;
          top: 110px;
          right: 440px;
          width: 558px;
          height: 32px;
          border-top-right-radius: 8px;
          border-top-left-radius: 8px;
          border: 2px solid #fff;
          border-bottom: none;
          .inner-text {
            position: absolute;
            top: -24px;
            left: 250px;
            font-size: 12px;
          }
          &:after {
            position: absolute;
            content: '';
            border: 6px solid transparent;
            border-top-color: #fff;
            bottom: -6px;
            left: -6px;
          }
        }
        .first-line {
          display: flex;
          width: 100%;
          .process {
            margin-bottom: 24px;
            margin-right: 24px;
            position: relative;
            .process-online {
              position: absolute;
              top: -16px;
              right: -70px;
              padding: 4px 24px;
            }
          }
          .process-point {
            text-align: center;
            display: inline-block;
            vertical-align: top;
            font-size: 14px;
            font-family: PingFang-SC_Medium;
            position: relative;
            .point {
              width: 24px;
              height: 24px;
              margin: 0 auto;
              z-index: 10;
              border-radius: 50%;
              position: relative;
            }
            .process-detail {
              width: 115px;
            }
          }
          .process-name,.process-online {
            display: inline-block;
            vertical-align: top;
            margin: 4px 0;
            .text {
              font-size: 12px;
              font-family: PingFang-SC_Medium;
            }
          }
          .process-online {
            border-bottom: 2px solid;
            &:after {
              position: absolute;
              content: '';
              border: 6px solid transparent;
              border-left-color: #fff;
              bottom: -6px;
              right: -6px;
            }
          }
          .process:last-child {
            .process-online {
              border-bottom: none;
            }
            .process-online:after {
              border-color: transparent;
            }
          }
        }
        .last-line {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-start;
          margin-top: 48px;
          margin-right: 82px;
          width: 100%;
          .process {
            margin-bottom: 24px;
            margin-right: 24px;
            position: relative;
            .process-online {
              position: absolute;
              top: -16px;
              left: -70px;
              padding: 4px 24px;
              border-bottom: 2px solid;
              &:after {
                position: absolute;
                content: '';
                border: 6px solid transparent;
                border-right-color: #fff;
                bottom: -6px;
                left: -6px;
            }
          }
          .process-point {
            text-align: center;
            display: inline-block;
            vertical-align: top;
            font-size: 14px;
            font-family: PingFang-SC_Medium;
            position: relative;
            .point {
              width: 24px;
              height: 24px;
              margin: 0 auto;
              border-radius: 50%;
              position: relative;
            }
            .process-detail {
              width: 115px;
            }
          }
          .process-name,.process-online {
            display: inline-block;
            vertical-align: top;
            margin: 4px 0;
            .text {
              font-size: 12px;
              font-family: PingFang-SC_Medium;
            }
          }
          }
          .process:last-child {
            .process-online {
              display: none;
            }
          }
        }
        .completed {
          background: #01d9d6;
        }
        .unCompleted {
          background: #f05150;
        }
        .unStart {
          background: #b5dcff;
        }
      }
    }
  }

</style>
