<template>
  <div class="login">
    <div class="login-header">
      <img src="../../assest/img/logo.png" alt="">
      <span>让项目管理更美好</span>
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
        <el-button type="primary" @click="login">登陆</el-button>
      </el-form-item>
    </el-form>
    <div class="login-footer">
      <span class="toReg" @click="toReg">还没有账号，免费注册..</span>
      <span><el-checkbox v-model="rememberPsd">记住密码</el-checkbox></span>
      <span>忘记密码</span>
    </div>
  </div>
</template>
<script>
  import UserService from '../../service/user.service'
  export default {
    data() {
      return {
        userInfor: {
          phone: '',
          psd: ''
        },
        rememberPsd: true
      }
    },
    mounted() {
      this.UserService = new UserService()
    },
    methods: {
      login() {
        console.log('submit!', this.userInfor.phone, this.userInfor.psd);
        this.UserService.login({
          phone: this.userInfor.phone,
          password: this.userInfor.psd
        }).then(res => {
          console.log('success')
        })

        // this.$router.push({
        //   path: '/home'
        // })
      },
      toReg() {
        this.$router.push({
          path: '/reg'
        })
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
      .toReg{
        position: absolute;
        left: 5px;
        margin: 0px;
        top: 20px;
      }
    }
  }

</style>
