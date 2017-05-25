<template>
  <div class="nav">
    <div class="logo">
      <img src="../assest/img/logo.png" alt="">
    </div>
    <el-menu :default-active="activeIndex" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/project/list"><i class="el-icon-upload"></i>项目管理</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/doc"><i class="el-icon-document"></i>任务管理</router-link>
      </el-menu-item>
      <el-menu-item index="3">仓库管理</el-menu-item>

      <label class="right-menu"><img src="../assest/img/icon/person.png" alt="">
        <el-popover popper-class="right-menu-popover" ref="popover5" placement="top" width="160" v-model="visible2">
          <ul class="right-menu-ul">
            <li class="user-intro">
              <p class="username">{{userInfor.username}}</p>
              <p class="phone">{{userInfor.phone}}</p>
            </li>
            <li>
              小工具
            </li>
            <li>
              交流社区
            </li>
            <li>
              讨论QQ群
            </li>
            <li @click="logoutDialog = true">
              退出登陆
            </li>
          </ul>
        </el-popover>
        <el-button class="nav-username" type="text" v-popover:popover5>{{ userInfor.username }}</el-button>
      </label>
    </el-menu>

    <el-dialog title="提示" :visible.sync="logoutDialog" size="tiny">
      <p>确认退出账户<span style="color: #ff4949">【{{ userInfor.username }}】</span>？</p>
      <p>退出后需要重新登陆！</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logoutDialog = false">取 消</el-button>
        <el-button type="danger" @click="logout">确 认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import UserService from '../service/user.service'
  export default {
    data() {
      return {
        activeIndex: '1',
        visible2: false,
        logoutDialog: false
      }
    },
    computed: {
      userInfor() {
        return this.$store.state.userInfor
      }
    },
    mounted() {
      this.UserService = new UserService()
    },
    methods: {
      logout() {
        this.UserService.logout({
          phone: this.userInfor.phone
        }).then(ret => {
          if (ret.status === 200) {
            this.$message({
              type: 'success',
              message: `退出成功，请重新登陆！`
            })
            this.$router.push({
              path: '/login'
            })
          }
        })
      }

    }
  }

</script>

<style>
  .nav {
    .logo {
      display: inline;
      float: left;
      z-index: 4;
      position: relative;
      left: 30px;
      outline: none;
      a {
        outline: none;
      }
      img {
        width: 70px;
        height: 35px;
        top: 7px;
        position: relative;
      }
    }
    .el-menu {
      background: #fff;
      z-index: 2;
      border-bottom: 1px solid #e5e5e5;
      padding-left: 150px;
    }
    a {
      display: block;
      text-decoration: none;
    }
    .el-menu--horizontal .el-menu-item {
      height: 50px;
      line-height: 50px;
      &:hover {
        background: #FFF;
      }
    }
    .nav .el-menu--horizontal .el-menu-item.logo:hover {
      boder: 0px;
    }
    .right-menu {
      float: right;
      margin-right: 30px;
      .nav-username {
        padding: 0px;
      }
      img {
        width: 20px;
        position: relative;
        top: 3px;
        vertical-align: middle;
        right: -20px;
      }
      span {
        font-size: 14px;
        line-height: 50px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }

  .right-menu-popover {
    padding: 0px !important;
    .right-menu-ul {
      li {
        line-height: 43px;
        height: 43px;
        font-size: 14px;
        padding-left: 10px;
        cursor: pointer;
        &:hover {
          background: #20a0ff;
          color: #fff;
        }
        &.user-intro {
          padding: 10px;
          border-bottom: 1px solid #f1f1f1;
          height: auto;
          &:hover {
            background: #fff;
            color: #333;
            cursor: default;
          }
          p {
            margin: 0px;
            line-height: 22px;
          }
          .username {
            font-weight: 700;
          }
          .phone {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }

</style>
