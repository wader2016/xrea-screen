<template>
  <Kuang class="date" name="利用率日历" :right-name="YearMon">
    <div>
      <ul class="weekday">
        <li v-for="(item, index) in weekday" :key="index">{{item}}</li>
      </ul>
      <ul class="days">
        <li v-for="(item, index) in days" :key="index" :class="item.className">{{item.day}}</li>
      </ul>
      <div class="color-info">
        <span>0</span>
        <div class="color"></div>
        <span>100</span>
      </div>
    </div>
  </Kuang>
</template>

<script>
import Kuang from '@/base/kuang/kuang'
// 工作日历
export default {
  name: 'calendar',
  props: {
    data: {type: Array}
  },
  data () {
    return {
      weekday: ['一', '二', '三', '四', '五', '六', '日'],
      days: [],
      YearMon: ''
    }
  },
  created () {
    this.getYearMon()
    this.createDays()
  },
  mounted () {
    if (this.data.length > 0) {
      this.setDays()
    }
  },
  watch: {
    data () {
      if (this.data.length > 0) {
        console.log(this.data.length)
        this.setDays()
      }
    }
  },
  methods: {
    getYearMon () {
      let curDate = new Date()
      // 获取当前月份
      let curMonth = curDate.getMonth() + 1
      curMonth = curMonth >= 10 ? curMonth : '0' + curMonth
      // 获取当前年份
      let curYear = curDate.getFullYear()
      this.YearMon = curYear + '-' + curMonth
    },
    createDays () {
      let curDate = new Date()
      // 获取今天是星期几
      curDate.setDate(1)
      let week = curDate.getDay()
      if (week === 0) {
        week = 7
      }
      let days = []
      for (let i = 0; i < week - 1; i++) {
        days.push({
          day: '',
          value: ''
        })
      }
      let daysNum = this.getCountDays()
      for (let i = 1; i <= daysNum; i++) {
        let day = i
        if (i < 10) {
          day = '0' + day
        }
        days.push({
          day: day,
          value: '',
          className: ''
        })
      }
      this.days = days
    },
    getCountDays () {
      let curDate = new Date()
      // 获取当前月份
      let curMonth = curDate.getMonth()
      // 生成实际的月份: 由于curMonth会比实际月份小1, 故需加1
      curDate.setMonth(curMonth + 1)
      // 将日期设置为0
      curDate.setDate(0)
      // 返回当月的天数
      return curDate.getDate()
    },
    setDays () {
      let curDate = new Date()
      let curDay = curDate.getDate()
      let days = JSON.parse(JSON.stringify(this.days))
      // 获取今天是星期几
      curDate.setDate(1)
      let week = curDate.getDay()
      if (week === 0) {
        week = 7
      }
      for (let i = 0; i < curDay; i++) {
        days[i + week - 1].className = this.selClass(this.data[i].WORKTIME)
      }
      this.days = JSON.parse(JSON.stringify(days))
    },
    selClass (value) {
      return 'bg' + Math.floor(value)
    }
  },
  components: {Kuang}
}
</script>

<style lang="less" scoped>
.date{
  .weekday{
    display: flex;
    margin-left: 24px;
    margin-top: 16px;
    li{
      width: 32px;
      height: 32px;
      line-height: 32px;
      margin-right: 1px;
      margin-bottom: 1px;
      font-size: 14px;
      font-family: PingGang-SC-Medium;
      color: #fff;
      text-align: center;
    }
  }
  .days{
    display: flex;
    flex-wrap: wrap;
    margin-left: 24px;
    li{
      width: 32px;
      height: 32px;
      line-height: 32px;
      margin-right: 1px;
      margin-bottom: 1px;
      font-size: 14px;
      font-family: PingGangSC-Semibold;
      color: #fff;
      text-align: center;
      &.green{
        background-color: #50e3c2;
      }
      &.yellow{
        background-color: #ff9900;
      }
      &.red{
        background-color: #fe4d45;
      }
    }
    .bg1{
      background-color: #FCE3A2;
    }
    .bg2{
      background-color: #FBDD9E;
    }
    .bg3{
      background-color: #FBD698;
    }
    .bg4{
      background-color: #FACC91;
    }
    .bg5{
      background-color: #FAC78E;
    }
    .bg6{
      background-color: #F9C38B;
    }
    .bg7{
      background-color: #F8B884;
    }
    .bg8{
      background-color: #F8B985;
    }
    .bg9{
      background-color: #F8B381;
    }
    .bg10{
      background-color: #F8AC7B;
    }
    .bg11{
      background-color: #F7A577;
    }
    .bg12{
      background-color: #F69F72;
    }
    .bg13{
      background-color: #F6976D;
    }
    .bg14{
      background-color: #F58E67;
    }
    .bg15{
      background-color: #F58863;
    }
    .bg16{
      background-color: #F4805D;
    }
    .bg17{
      background-color: #F47757;
    }
    .bg18{
      background-color: #F37253;
    }
    .bg19{
      background-color: #F3644A;
    }
    .bg20{
      background-color: #F26148;
    }
    .bg21{
      background-color: #F15A42;
    }
    .bg22{
      background-color: #F1523C;
    }
    .bg23{
      background-color: #F04934;
    }
    .bg24{
      background-color: #F1442F;
    }
  }
  .color-info{
    padding: 0 24px;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      color: #fff;
    }
    .color{
      flex: 1;
      margin: 0 4px;
      height: 8px;
      background-image: linear-gradient(to right, #fde199 0%, #f52323 80%);
    }
  }
}
</style>
