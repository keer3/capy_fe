<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="0"><router-link to="/">首页</router-link></el-menu-item>
      <el-menu-item index="1"><router-link to="/project">项目管理</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/doc">文档管理</router-link></el-menu-item>
      <el-menu-item index="3">人员管理</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '0',
      }
    }
  }

</script>

<style>


</style>
