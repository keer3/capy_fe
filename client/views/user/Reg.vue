<template>
  <div class="reg">
    <div class="reg-header">
      <img src="../../assest/img/logo.png" alt="">
      <span>这是阿大的毕业设计</span>
    </div>
    <hr />
    <el-form :model="userInfor" :rules="rules" ref="userInfor" label-width="100px">
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="userInfor.phone"></el-input>
      </el-form-item>
      <el-form-item class="code" label="短信验证码" prop="code">
        <el-input v-model="userInfor.code"></el-input>
        <el-button type="primary" @click="getCode" :disabled="disabled">{{ text }}</el-button>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userInfor.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="userInfor.name"></el-input>
      </el-form-item>
      <el-form-item class="footer-btn">
        <el-button type="primary" @click="reg">注册</el-button>
        <el-button @click="resetForm('userInfor')">重置</el-button>
        <span class="to-login" @click="toLogin">已有账号，立即登陆！</span>
      </el-form-item>
    </el-form>
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
          code: '',
          password: '',
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
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        },
        text: '获取验证码',
        times: 60,
        disabled: false
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
      },
      getCode() {
        this.UserService.getCode({
          phone: this.userInfor.phone
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: `验证码发送成功！`
            })
            this.disabled = true
            this.timer()
          }
        })
      },
      timer() {
        if (this.times > 0) {
          this.times--
            this.text = this.times + 's后重新获取'
          setTimeout(this.timer, 1000)
        } else {
          this.disabled = false
          this.text = "获取验证码"
          this.times = 60
        }
      },
      reg() {
        this.$refs.userInfor.validate((valid) => {
          if (valid) {
            this.UserService.reg({
              password: sha1(this.userInfor.password),
              phone: this.userInfor.phone,
              code: this.userInfor.code,
              name: this.userInfor.name
            }).then(res => {
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: `注册成功，请登录！`
                })
                this.$router.push({
                  path: '/login'
                })
              }
            })
          } else {
            return false
          }
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
        width: 65%;
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
