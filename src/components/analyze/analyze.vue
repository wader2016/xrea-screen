<template>
  <div class="analyze">
    <div class="main">
      <iframe :src="url" ref="iframe"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: 'analyze',
  data () {
    return {
      url: ''
    }
  },
  mounted () {
    // 10.80.0.101:8088 内网
    // this.url = 'http://10.80.0.101:8088/EquipmentAnalysis/Area'
    this.url = 'http://221.178.242.16:8088/EquipmentAnalysis/Area'
  },
  methods: {
  }
}

</script>

<style scoped lang="less">
  .main {
    display: flex;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0,183,255,0.7);
    iframe {
      width: 100%;
      height: 100%;
    }
  }

</style>
