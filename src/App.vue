<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    let loading = document.getElementById('loading')
    if (loading !== null) {
      document.body.removeChild(loading)
    }
  }
}
</script>

<style lang="less">
html,body{
  width: 100%;
  height: 100%;
}

</style>
