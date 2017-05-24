<template>
  <div class="login">
    <div class="login-header">
      <img src="../../assest/img/logo.png" alt="">
      <span>项目管理让开发更美好</span>
    </div>
    <hr />
    <el-form :inline="true" :model="userInfor">
      <el-form-item>
        <el-input v-model="userInfor.phone" placeholder="联系方式"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" v-model="userInfor.psd" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" v-loading.fullscreen="loading">登陆</el-button>
      </el-form-item>
    </el-form>
    <div class="login-footer">
      <span class="toReg" @click="toReg">还没有账号，免费注册..</span>
      <span><el-checkbox v-model="rememberPsdChecked">记住密码</el-checkbox></span>
      <span @click="toForgetPsd">忘记密码</span>
    </div>
  </div>
</template>
<script>
  import UserService from '../../service/user.service'
  import sha1 from 'sha1'

  export default {
    data() {
      return {
        userInfor: {
          phone: '',
          psd: ''
        },
        rememberPsdChecked: false,
        loading: false
      }
    },
    mounted() {
      //如果记住了密码 则显示用户名和密码
      let oldPhone = this.$cookie.get('capy_phone')
      if (oldPhone) {
        this.rememberPsdChecked = true
        this.userInfor.phone = oldPhone
      }
      let oldPwd = this.$cookie.get('capy_psd')
      if (oldPwd) {
        this.userInfor.psd = oldPwd
      }
      this.UserService = new UserService()
    },
    methods: {
      // 登陆
      login() {
        this.loadding = true
        this.UserService.login({
          phone: this.userInfor.phone,
          password: sha1(this.userInfor.psd)
        }).then(res => {
          this.loadding = false
          const {
            status,
            message,
            data
          } = res

          if (status === 200) {
            // 将用户信息保存到vuex
            this.$store.commit('SAVE_USER_INFOR', data)
            this.$router.push({
              path: '/project/list'
            })
            // 处理记住密码
            this.rememberPsd()
          }
        })
      },
      // 跳转到注册页面
      toReg() {
        this.$router.push({
          path: '/reg'
        })
      },
      toForgetPsd() {
        this.$router.push({
          path: '/forgetPsd'
        })
      },
      rememberPsd() {
        if (this.rememberPsdChecked) {
          this.$cookie.set('capy_phone', this.userInfor.phone, 1)
          this.$cookie.set('capy_psd', this.userInfor.psd, 1)
        } else {
          this.$cookie.delete('capy_phone')
          this.$cookie.delete('capy_psd')
        }
      }
    }
  }

</script>

<style lang="">
  .login {
    width: 500px;
    margin: 0px auto;
    position: relative;
    top: 150px;
    .login-header {
      position: relative;
      img {
        width: 200px;
        height: 100px;
      }
      span {
        color: #666;
        font-size: 20px;
        position: relative;
        bottom: 20px;
      }
    }
    hr {
      border: none;
      border-top: 1px solid #c1c1c1;
    }
    form {
      text-align: center;
      height: 40px;
      button {
        width: 78px;
      }
      & .el-form-item:last-child {
        margin-right: 0px;
      }
    }
    .login-footer {
      text-align: right;
      position: relative;
      span {
        font-size: 12px;
        color: #666;
        cursor: pointer;
      }
      &>span {
        margin-left: 50px;
      }
      .toReg {
        position: absolute;
        left: 5px;
        margin: 0px;
        top: 20px;
      }
    }
  }

</style>
