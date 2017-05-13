<template>
  <div>
    <el-tabs class="second-nav" v-model="activeName">
      <el-tab-pane label="项目列表" name="first">
        <el-button type="primary" @click="addProjectDialogVisible = true; dialogTitle = '新增项目'"><i class="el-icon-plus"></i> 新增项目</el-button>
        <el-button type="primary"><i class="el-icon-upload2"></i> 导入项目</el-button>
        <div class="table-content">
          <el-table border :data="projectList" style="width: 100%" v-loading="loading">
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
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>


    <el-dialog title="提示" :visible.sync="deleteProjectDialogVisible" size="tiny">
      <p>确认删除项目<span style="color: #ff4949">【{{ nameToDel }}】</span>？</p>
      <p>删除后相关联的所有都会被删除，将不再恢复！</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteProjectDialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="delProject">删 除</el-button>
      </span>
    </el-dialog>


    <el-dialog :title="dialogTitle" :visible.sync="addProjectDialogVisible" class="add-dialog">
      <el-form :model="project" :rules="rules" ref="project" label-position="left" label-width="80px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="project.name"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="project.version"></el-input>
        </el-form-item>
        <el-form-item label="项目类型" prop="type">
          <el-select v-model="project.type" placeholder="请选择项目类型">
            <el-option v-for="type of projectType" :label="type.name" :value="type.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目说明" prop="dsc">
          <el-input type="textarea" v-model="project.dsc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addProjectDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProject">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import Moment from 'moment'
  import ProjectService from '../../service/project.service'
  import {
    PROJECT_TYPE
  } from '../../../config/global.config.js'
  export default {
    mounted() {
      this.ProjectService = new ProjectService()
      this.reload()
    },
    computed: {
      userInfor() {
        return this.$store.state.userInfor
      }
    },
    data() {
      return {
        activeName: 'first',
        projectList: [],
        addProjectDialogVisible: false,
        deleteProjectDialogVisible: false,
        project: {
          type: '',
          version: '1.0.0'
        },
        projectType: PROJECT_TYPE,
        rules: {
          name: [{
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
          }],
          version: [{
            required: true,
            message: '请输入版本号',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请选择项目类型',
            trigger: 'blur'
          }]
        },
        dialogTitle: '',
        nameToDel: '',
        loading: false
      }
    },
    methods: {
      handleEdit(index, project) {
        this.dialogTitle = '编辑项目'
        this.addProjectDialogVisible = true
        this.project = project
      },
      handleDelete(index, project) {
        this.deleteProjectDialogVisible = true;
        this.nameToDel = project.name
        this.project = project
      },
      addProject() {
        // 验证表单
        this.$refs.project.validate((valid) => {
          if (valid) {
            this.project.createUserId = this.userInfor.userId
            // 添加项目
            if (this.dialogTitle === '新增项目') {
              this.ProjectService.addProject(this.project).then(res => {
                if (res.status === 200) {
                  this.reload()
                  this.addProjectDialogVisible = false
                  this.project = {}
                  this.$message({
                    type: 'success',
                    message: `添加成功！`
                  })
                }
              })
            } else {
              // 编辑项目
              this.project.projectId = this.project.id
              this.ProjectService.updateProjectInfo(this.project).then(res => {
                if (res.status === 200) {
                  this.addProjectDialogVisible = false
                  this.project = {}
                  this.$message({
                    type: 'success',
                    message: `保存成功！`
                  })
                }
              })
            }
          } else {
            return false
          }
        })
      },
      delProject() {
        this.ProjectService.delProject({
          projectId: this.project.id
        }).then(res => {
          if (res.status === 200) {
            this.reload()
            this.deleteProjectDialogVisible = false
            this.project = {}
            this.$message({
              type: 'success',
              message: `删除成功！`
            })
          }
        })
      },
      reload() {
        this.loading = true
        this.ProjectService.findProjectByUser({
          userId: this.userInfor.userId
        }).then(res => {
          this.loading = false
          const {
            data
          } = res
          this.projectList = data
          this.projectList.forEach(project => {
            project.update_time = Moment(project.update_time).format('YYYY-MM-DD HH:mm:ss')
          })
        })
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

  .add-dialog {
    .el-select {
      width: 100%;
    }
  }

  .el-dialog__close {
    font-size: 15px;
  }

</style>
