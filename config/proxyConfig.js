module.exports = {
    proxy: {
          '/user': {    //将www.exaple.com印射为/user
              // target: 'http://10.90.1.212:8880',  // 接口域名
              target: 'http://www.hanyunplat.com:1888',  // 接口域名
              secure: true,  // 如果是https接口，需要配置这个参数
              changeOrigin: true  //是否跨域             
          }
    }
  }