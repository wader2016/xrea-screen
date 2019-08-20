<template>
  <div class="application">
    <div class="application-header">
       <span>{{appInfo.name}}</span>
      <router-link class="back" tag="div" to="/screen/home">返回</router-link>
    </div>
    <div class="application-main">
      <div class="main-top">
        <div class="application-info">
          <border class="application-top-h" :name="companyInfo.name">
            <div class="content">
                <div class="content-left">
                  <bg border-w="10px" border-size="2px">
                  <img :src="companyInfo.image" alt="">
                  </bg>
                </div>
              <div class="content-right">
                <div class="content-icon"></div>
                <div class="content-text">{{companyInfo.description}}</div>
              </div>
            </div>
          </border>
        </div>
        <div class="application-info">
          <border class="application-top-h" :name="applicationInfo.name">
            <div class="project">
              <div class="project-item" v-for="(item,index) in applicationInfo.data" :key="index">
                <bg border-w="8px" border-size="2px">
                  <div class="item-icon">
                    <div class="icon iconfont" :class="item.class"></div>
                  </div>
                </bg>
                <div class="item-text">
                  <span>
                    <span class="strong" v-if="item.name !== ''">{{item.name}}:</span>
                    <span>{{item.description}}</span>
                  </span>
                </div>
              </div>
            </div>
          </border>
        </div>
      </div>
      <div class="main-bottom">
        <div class="app-info-left">
          <border class="application-bottom-h" :name="importantInfo.name">
            <div class="problem">
              <div class="problem-item" v-for="(item,index) in importantInfo.data" :key="index">
                <div class="icon">
                  <img src="./../../../../static/img/home/icon.png" alt="">
                </div>
                <div class="text">
                  <span class="strong" v-if="item.name !== ''">{{item.name}}:</span>
                  <span>{{item.description}}</span>
                </div>
              </div>
            </div>
          </border>
        </div>
        <div class="app-info-right">
          <border class="application-bottom-h" :name="resultInfo.name">
            <div class="appInfo">
              <gauge v-for="(item,index) in resultInfo.data" :index="index" :item="item" :key="index"></gauge>
            </div>
          </border>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Border from './../../../base/kuang/kuang'
import Bg from './../../../base/bg/bg'
import Gauge from './gauge'
export default {
  name: 'application',
  data () {
    return {
      appInfo: [],
      applicationInfo: {},
      companyInfo: {},
      importantInfo: {},
      resultInfo: {}
    }
  },
  mounted () {
    let id = this.$route.params.Id
    this.getAppData(id)
  },
  methods: {
    getAppData (id) {
      this.axios.get('../static/data/application/' + id + '.json').then(res => {
        if (res.status === 200) {
          this.appInfo = res.data
          this.companyInfo = this.appInfo.data.info1
          this.applicationInfo = this.appInfo.data.info2
          this.importantInfo = this.appInfo.data.info3
          this.resultInfo = this.appInfo.data.info4
        }
      })
    }
  },
  components: {
    Border,
    Bg,
    Gauge
  }
}
</script>

<style scoped lang="less">
.application {
  border: 1px solid rgba(0,183,255,0.7);
  .application-header {
    height: 56px;
    line-height: 56px;
    font-size: 36px;
    padding-left: 24px;
    color: #fff;
    font-family: PingFangSC-Semibold;
    background: linear-gradient(rgba(84,206,255,0.3), rgba(0,133,255,0.3));
    .back {
      float: right;
      height: 56px;
      width: 84px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      background: url("./../../../../static/img/btn-bg.png") no-repeat;
      background-size: cover;
    }
  }
  .application-main {
    padding: 24px;
    height: 100%;
    .main-top {
      display: flex;
      height: 55%;
      .application-info {
        flex: 1;
        height: 100%;
        margin-left: 24px;
        &:first-child {
          margin-left: 0;
        }
        .application-top-h {
          height: 100%;
        }
        .content {
          display: flex;
          padding: 24px;
          width: 100%;
          height: 100%;
          .content-left {
            flex: 0 0 384px;
            max-height: 384px;
            width: 100%;
            height: 100%;
            background-size: cover;
            margin-top: 11px;

            img {
              width: 100%;
              height: 100%;
              border: 1px solid rgba(0, 183, 255, 0.3);
            }
          }
          .content-right {
            flex: 1;
           padding-left: 24px;
            display: flex;
            .content-icon {
              flex: 0 0 40px;
              margin-top: 8px;
              background: url("./../../../../static/img/home/icon.png") no-repeat;
              background-size: 100%;
            }
            .content-text {
              flex: 1;
              margin-left: 8px;
              font-size: 20px;
              line-height: 40px;
              font-family: PingFang-SC_Medium;
            }
          }
        }
        .project {
          display: flex;
          height: 100%;
          flex-direction: column;
          justify-content: center;
          padding: 24px;
          .project-item {
            height: 110px;
            display: flex;
            margin-bottom: 24px;
            background:linear-gradient(-135deg, transparent 16px, rgba(0,183,255,0.3) 0);
            color: #fff;
            &:last-child {
              margin-bottom: 0;
            }
            .item-icon {
              flex: 0 0 auto;
              justify-content: center;
              height: 100%;
              width: 110px;
              border-left: 1px solid rgba(0,183,255,0.3);
              border-right: 1px solid rgba(0,183,255,0.3);
              display: flex;
              justify-content: center;
              align-items: center;
              .icon {
                width: 56px;
                height: 56px;
                font-size: 56px;
                color: rgba(0,183,255,1);
              }
            }
            .item-text {
              flex: 1;
              display: flex;
              margin: 0 24px;
              font-size: 20px;
              line-height: 40px;
              color: #fff;
              font-family: PingFang-SC_Medium;
              align-items: center;
              .strong {
                color: #00b7ff;
                font-family: PingFangSC-Semibold;
              }
            }
          }

        }
      }
    }
    .main-bottom {
      margin-top: 24px;
      height: 35%;
      display: flex;
      .app-info-left {
        flex: 0 0 42%;
        height: 100%;
        margin-right: 24px;
        .problem {
          display: flex;
          height: 100%;
          padding: 24px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .problem-item {
            display: flex;
            font-size: 20px;
            line-height: 40px;
            width: 100%;
            margin-bottom: 24px;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              flex: 0 0 40px;
            }
            .text {
              flex: 1;
              font-family: PingFang-SC_Medium;
              .strong {
                color: #00b7ff;
                font-family: PingFangSC-Semibold;
              }
            }
          }
        }
      }
      .app-info-right {
        flex: 1;
        height: 100%;
        .appInfo {
          display: flex;
          height: 100%;
          padding: 24px;
          justify-content: center;
          align-items: center;
        }
      }
      .application-bottom-h {
        height: 100%;
      }
    }
  }
}
</style>
