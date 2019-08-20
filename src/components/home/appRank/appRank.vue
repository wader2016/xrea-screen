<template>
  <div class="appRank">
    <div class="appRank-header">
      <div class="header">{{appRankData.name}}</div>
      <router-link class="back" tag="div" to="/screen/home">返回</router-link>
    </div>
    <div class="appRank-main">
      <div class="main-left">
        <border class="applicationInfo" name="应用介绍">
          <div class="info-main">
            <div class="main-image">
              <bg border-w="8px" border-size="2px" v-for="(item,index) in appRankData.data.image" :key="index">
                <div class="img-info">
                  <img :src="item" alt="">
                </div>
              </bg>
            </div>
            <div class="main-text">{{appRankData.data.description}}</div>
            <div class="main-function">
              <div class="value" v-for="(item,index) in appRankData.data.value" :key="index">
                <span class="value-strong" v-if="item.name !== ''">{{item.name}}:</span>
                <span class="value-normal">{{item.description}}</span>
              </div>
            </div>
          </div>
        </border>
      </div>
      <div class="main-right">
        <border class="develop" name="主要功能">
          <div class="develop-main">
            <div class="function-icon">
              <div class="function-item" v-for="(item,index) in appRankData.data.mainFunction" :key="index">
                <bg border-w="8px" border-size="2px">
                  <div class="icon-item">
                    <div class="iconfont" :class="item.icon"></div>
                  </div>
                </bg>
                <div class="text">{{item.name}}</div>
              </div>
            </div>
          </div>
        </border>
        <border class="client" name="赋能客户">
          <div class="client-main">
            <div class="client-item" v-for="(item,index) in appRankData.data.client" :key="index">
              <router-link tag="div" :to="item.url">
                <bg border-w="8px" border-size="2px">
                  <div class="item-icon">
                    <img :src="item.image" alt="">
                  </div>
                </bg>
                <div class="client-text">{{item.name}}</div>
              </router-link>
            </div>
          </div>
        </border>
      </div>
    </div>
  </div>
</template>

<script>
import Border from './../../../base/kuang/kuang'
import Bg from './../../../base/bg/bg'
export default {
  name: 'appRank',
  data () {
    return {
      appRankData: {}
    }
  },
  mounted () {
    let id = this.$route.params.Id
    this.getAppData(id)
  },
  methods: {
    async getAppData (id) {
      await this.axios.get('static/data/home/首页app排行.json').then(res => {
        if (res.status === 200) {
          console.log(res.data.data)
          let item = res.data.data.filter(item => item.id === parseInt(id))
          this.getAppRankJson(item[0].name)
        }
      })
    },
    getAppRankJson (name) {
      this.axios.get('static/data/appRank/' + name + '.json').then(res => {
        if (res.status === 200) {
          this.appRankData = res.data
          console.log(res.data)
        }
      })
    }
  },
  components: {
    Border,
    Bg
  }
}
</script>

<style scoped lang="less">
.appRank {
  border: 1px solid rgba(0,183,255,0.7);
  display: flex;
  flex-direction: column;
  font-size: 20px;
  .appRank-header {
    flex: 0 0 56px;
    height: 56px;
    line-height: 56px;
    font-size: 36px;
    padding-left: 24px;
    color: #fff;
    display: flex;
    font-family: PingFangSC-Semibold;
    background: linear-gradient(rgba(84,206,255,0.3), rgba(0,133,255,0.3));
    .header {
      flex: 1;
    }
    .back {
      flex: 0 0 84px;
      height: 56px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      background: url("./../../../../static/img/btn-bg.png") no-repeat;
      background-size: cover;
    }
  }
  .appRank-main {
    flex: 1;
    display: flex;
    padding: 24px;
    .main-left {
      flex: 0 0 1168px;
      margin-right: 24px;
      .applicationInfo {
        height: 100%;
        .info-main {
          padding: 24px;
          .main-image {
            display: flex;
            .bg {
              margin-right: 24px;
              &:last-child {
                margin-right: 0;
              }
            }
            .img-info {
              width: 548px;
              height: 318px;
              border: 1px solid rgba(0,183,255,0.7);
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .main-text {
            font-size: 20px;
            line-height: 40px;
            margin: 24px 0 32px 0;
          }
          .main-function {
            display: flex;
            flex-direction: column;
            .value {
              margin-top: 16px;
              .value-strong {
                color: #00b7ff;
                font-family: PingFangSC-Semibold;
              }
              .value-normal {
                font-size: 20px;
                line-height: 40px;
                color: #fff;
                font-family: PingFang-SC_Medium;
              }
            }
          }
        }
      }
    }
    .main-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      .develop {
        flex: 0 0 494px;
        margin-bottom: 24px;
        .develop-main {
          padding: 24px;
          .function-icon {
            display: flex;
            flex-wrap: wrap;
            .function-item {
              margin: 16px 28px;
              .icon-item {
                width: 110px;
                height: 110px;
                border: 1px solid rgba(0,183,255,0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                .iconfont {
                  font-size: 56px;
                  color: #00b7ff;
                }
              }
              .text {
                width: 80px;
                text-align: center;
                margin: 8px auto 0;
              }
            }
          }
          .develop-header {
            margin: 36px 0;
            font-size: 28px;
            color: #00b7ff;
            line-height: 40px;
          }
          .develop-text {
            line-height: 40px;
          }
        }
      }
      .client {
        flex: 1;
        .client-main {
          padding: 24px;
          display: flex;
          height:100%;
          align-items: center;
          .client-item {
            cursor: pointer;
            margin-right: 24px;
            .item-icon {
              width: 112px;
              height: 112px;
              border: 1px solid rgba(0,183,255,0.7);
              img {
                width: 100%;
                height: 100%;
                background-size: contain;
              }
            }
            .client-text {
              text-align: center;
              margin: 8px auto 0;
            }
          }
        }
      }
    }
  }
}
</style>
