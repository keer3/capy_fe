<template>
  <div class="reg">
    <div class="reg-header">
      <img src="../../assest/img/logo.png" alt="">
      <span>让项目管理更美好</span>
    </div>
    <hr />
    <el-form :model="userInfor" :rules="rules" ref="userInfor" label-width="100px">
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="userInfor.phone"></el-input>
      </el-form-item>
      <el-form-item class="code" label="短信验证码" prop="code">
        <el-input v-model="userInfor.code"></el-input>
        <el-button type="primary">获取验证码</el-button>
      </el-form-item>
      <el-form-item label="密码" prop="psd">
        <el-input type="password" v-model="userInfor.psd"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="userInfor.name"></el-input>
      </el-form-item>
      <el-form-item class="footer-btn">
        <el-button type="primary">注册</el-button>
        <el-button @click="resetForm('userInfor')">重置</el-button>
        <span class="to-login" @click="toLogin">已有账号，立即登陆！</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import UserService from '../../service/user.service'
  export default {
    data() {
      return {
        userInfor: {
          phone: '',
          code: '',
          psd: '',
          name: ''
        },
        rules: {
          phone: [{
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          }],
          code: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }],
          psd: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      }
    },
    mounted() {
      this.UserService = new UserService()
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      toLogin() {
        this.$router.push({
          path: '/login'
        })
      }
    }
  }

</script>

<style lang="">
  .reg {
    width: 500px;
    margin: 0px auto;
    position: relative;
    top: 80px;
    .reg-header {
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
    .code {
      .el-input {
        width: 70%;
      }
      .el-button {
        float: right;
      }
    }
    .footer-btn {
      .el-button {
        width: 100px;
      }
      .to-login {
        color: #666;
        float: right;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }

</style>
