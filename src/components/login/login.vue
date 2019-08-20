<template>
  <div class="login">
    <div class="main">
      <div class="main-login">
        <!--<div class="login-logo">-->
          <!--<img src="./../../../static/img/Xrea-logo.png" alt="汉云工业互联网平台">-->
        <!--</div>-->
        <div class="login-name">汉云工业互联网平台</div>
        <div class="login-input">
          <div class="user-input">
            <input placeholder="用户名" type="text" v-model="loginData.userName">
            <div class="user-icon userIcon">
              <div class="icon iconfont icon-account"></div>
            </div>
          </div>
          <div class="user-input">
            <input type="password" placeholder="密码" v-model="loginData.password">
            <div class="user-icon pwdIcon">
              <div class="icon iconfont icon-password"></div>
            </div>
          </div>
        </div>
        <div class="login-btn">
          <button class="btn" @click="login">登录</button>
        </div>
        <div class="error-message">{{message}}</div>
        <div class="login-device"></div>
        <div class="login-sign">
          <!--<span>还没有账户？</span>-->
          <!--<span class="sign">注册</span>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      loginData: {userName: '', password: ''},
      message: ''
    }
  },
  methods: {
    login () {
      const that = this
      this.axios.get('../static/data/user/user.json').then(function (res) {
        if (res.data) {
          const userList = res.data
          for (let i = 0; i < userList.length; i++) {
            if (userList[i].loginName === that.loginData.userName && userList[i].loginPwd === that.loginData.password) {
              localStorage.setItem('token', '8c7e9294570742d7bb60815173d0ee04')
              that.$router.push('screen/home')
              return
            }
          }
          that.message = '用户名或密码错误'
        } else {
          that.message = '用户名或密码错误'
        }
      }).catch(function () {
        this.message = '用户名或密码错误'
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url("./../../../static/img/login/login-background.png") no-repeat;
    background-size: cover;
    display: flex;
    padding: 200px 320px 160px 320px;
    .main {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      box-shadow: 0 0 16px 0;
      background: url("./../../../static/img/login/login-picture.png") no-repeat;
      background-size: cover;
      .main-login {
        height: 100%;
        padding: 70px;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        background: #fff;
        float: right;
        .login-logo {
          width: 96px;
          height: 96px;
          margin: 0 auto 8px;
          img {
            width: 100%;
            height:100%;
          }
        }
        .login-name {
          text-align: center;
          font-size: 36px;
          font-family: PingFangSC-Semibold;
          background: linear-gradient(#00447E,#001323);
          -webkit-background-clip: text;
          color: transparent;
          margin: 40px 0;
        }
        .login-input {
          padding-top: 40px;
          padding-bottom: 8px;
          width: 300px;
          margin: 0 auto;
          .user-input {
            position: relative;
            margin-bottom: 24px;
            input {
              height: 46px;
              width: 230px;
              padding-left: 16px;
              padding-right: 50px;
              border: 1px solid #eaf3fe;
              border-left: 4px solid transparent;
              font-family: PingFang-SC_Medium;
            }
            input:focus {
              border-left-color:#00b7ff;
              box-shadow: 0 0 4px #eaf3fe;
            }
            .user-icon {
              position: absolute;
              top: 0;
              right: 0;
              width: 48px;
              border-left: 1px solid #eaf3fe;
              .icon {
                width: 24px;
                height: 24px;
                margin: 12px auto;
                color: #93a3b6;
                font-size: 24px;
              }
            }
          }
        }
        .login-btn {
          width: 300px;
          margin: 0 auto;
          .btn {
            width: 100%;
            height: 48px;
            line-height: 48px;
            border-radius: 4px;
            font-size: 20px;
            font-family: PingFangSC-Semibold;
            color: #fff;
            background-color: #00b7ff;

          }
        }
        .error-message {
          padding: 16px;
          color: red;
        }
        .login-device {
          height: 32px;
          width: 100%;
          border-bottom: 1px solid #eaf3fe;
        }
        .login-sign {
          text-align: center;
          margin-top: 32px;
          span {
            font-size: 14px;
            color: #bfccdf;
            font-family: PingFang-SC_Medium;
          }
          .sign {
            color: #00b7ff;
            cursor: pointer;
            font-family: PingFangSC-Semibold;
          }
        }
      }
    }
  }
</style>
