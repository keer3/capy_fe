<template>
  <div class="nav">
    <router-link to="/" class="logo">
      <img src="../assest/img/logo.png" alt="">
    </router-link>
    <el-menu :default-active="activeIndex" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/project"><i class="el-icon-upload"></i>项目管理</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/doc"><i class="el-icon-document"></i>文档管理</router-link>
      </el-menu-item>
      <el-menu-item index="3">人员管理</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
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
  }

</style>
