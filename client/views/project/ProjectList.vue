<template>
  <div>
    <el-tabs class="second-nav" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="项目列表" name="first">
        <el-button type="primary"><i class="el-icon-plus"></i> 新增项目</el-button>
        <el-button type="primary"><i class="el-icon-upload2"></i> 导入项目</el-button>
        <div class="table-content">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="项目名称">
            </el-table-column>
            <el-table-column prop="name" label="版本号">
            </el-table-column>
            <el-table-column prop="address" label="类型">
            </el-table-column>
            <el-table-column prop="name" label="项目最后修改时间">
            </el-table-column>
            <el-table-column prop="name" label="操作">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    mounted() {
      
    },
    data() {
      return {
        activeName: 'first',
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }

</script>
<style>
  .second-nav {
    .el-tabs__header {
      background-color: #fcfcfc;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 30px;
    }
  }

  .el-tab-pane {
    padding: 0px 30px 20px 30px;
  }

  .table-content {
    margin-top: 20px;
    .el-table{
      th {
        background: #fff;
      }
      thead div{
        background: #fff;
      }
    }
  }

</style>
