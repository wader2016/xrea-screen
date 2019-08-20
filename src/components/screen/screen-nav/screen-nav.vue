<template>
  <div class="screen-nav">
    <ul>
      <router-link tag="li" :to="item.link" v-for="(item, index) in linkData" :key="index" :class="(isDevices&&item.name==='设备连接') || (isApp&&item.name==='首页') || (isApp2&&item.name==='首页') ? 'router-link-active':''">
        <p @click="changeLink(index)" class="item-txt">{{item.name}}</p>
        <div class="line" ref="line"></div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'screen-nav',
  data () {
    return {
      linkData: [
        {name: '首页', link: '/screen/home'},
        {name: '设备连接', link: '/screen/devices'},
        {name: '标识解析', link: '/screen/idResolution'},
        {name: '设备地图', link: '/screen/analyze'},
        {name: '智能工厂', link: '/screen/intelligentFactory'},
        {name: '智能服务', link: '/screen/intelligentService'},
        {name: '智能物流', link: '/screen/intelligentLogistics'},
        {name: '徐工指数', link: '/screen/macroeconomic'}
        // {name: '一带一路', link: '/screen/OBOR'}
      ]
    }
  },
  computed: {
    isDevices () {
      let path = this.$route.path
      if (path.indexOf('deviceLink') >= 0) {
        return true
      }
      return false
    },
    isApp () {
      let path = this.$route.path
      if (path.indexOf('appRank') >= 0) {
        return true
      }
      return false
    },
    isApp2 () {
      let path = this.$route.path
      if (path.indexOf('application') >= 0) {
        return true
      }
      return false
    }
  },
  mounted () {
    let active = document.getElementsByClassName('router-link-active')[0]
    let prev = active.previousElementSibling
    if (prev) {
      prev.getElementsByClassName('line')[0].style.display = 'none'
    }
  },
  methods: {
    changeLink (i) {
      // this.$refs.line.style.display = 'inherit'
      this.$refs.line.forEach((item) => {
        item.style.display = 'inherit'
      })
      this.$refs.line[i].style.display = 'none'
      if (i > 0) {
        this.$refs.line[i - 1].style.display = 'none'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.screen-nav{
  padding-top: 24px;
  line-height: 20px;
  background-color: #074c77;
  .line{
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right, #0a5f8d 0%, #4fc7f7 50%, #0a5f8d 100%);
  }
  li{
    height: 56px;
    background-image: linear-gradient(to right, #065a96 0%, #176895 50%, #065a96 100%);
    position: relative;
    cursor: pointer;
    .item-txt{
      width: 100%;
      height: 55px;
      line-height: 55px;
      color: #fff;
      font-size: 12px;
      position: relative;
      z-index: 210;
    }
  }
  .router-link-active{
    position: relative;
    z-index: 210;
    &:after{
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: -12px;
      z-index: 200;
      background: url("/static/img/nav-active.png") no-repeat;
      background-size: 84px 56px;
    }
    .line{
      display: none;
    }
  }
}
</style>
