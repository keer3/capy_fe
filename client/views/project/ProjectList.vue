<template>
  <div>
    <el-tabs class="second-nav" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="项目列表" name="first">
        <el-button type="primary"><i class="el-icon-plus"></i> 新增项目</el-button>
        <el-button type="primary"><i class="el-icon-upload2"></i> 导入项目</el-button>
        <div class="table-content">
          <el-table border :data="projectList" style="width: 100%">
            <el-table-column prop="name" label="项目名称">
            </el-table-column>
            <el-table-column prop="version" label="版本号">
            </el-table-column>
            <el-table-column prop="type" label="类型">
            </el-table-column>
            <el-table-column prop="update_time" label="项目最后修改时间">
            </el-table-column>
            <el-table-column prop="" label="操作">
              <template scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import Moment from 'moment'
  import ProjectService from '../../service/project.service'
  export default {
    mounted() {
      this.ProjectService = new ProjectService()
      this.ProjectService.findProjectByUser({
        userId: this.userInfor.userId
      }).then(res => {
        const {
          data
        } = res
        this.projectList = data
        this.projectList.forEach(project => {
          project.update_time = Moment(project.update_time).format('YYYY-MM-DD HH:mm:ss')
        })
      })
    },
    computed: {
      userInfor() {
        return this.$store.state.userInfor
      }
    },
    data() {
      return {
        activeName: 'first',
        projectList: []
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleEdit() {

      },
      handleDelete() {

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
    .el-table {
      th {
        background: #fff;
      }
      thead div {
        background: #fff;
      }
    }
  }

</style>
