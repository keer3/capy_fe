<template>
  <div>
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
        }
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
      }
    }
  }

</script>
