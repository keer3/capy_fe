<template>
  <div>
    <el-tabs v-model="activeName" class="second-nav" >

      <el-tab-pane name="first">
        <span slot="label"><i class="el-icon-date"></i> 项目概况</span>
        <projectDetail v-on:changeTap="changeTap" />
      </el-tab-pane>

      <el-tab-pane name="second">
        <span slot="label"><i class="el-icon-document"></i> 接口文档</span>
        <apiList v-on:changeApi="handleCurrentChangeApi" v-show="changeApi === 'apiList'"/>
        <apiDetail v-on:backToApiList="handleCurrentChangeApi" v-show="changeApi === 'apiDetail'" />
        <apiEdit v-on:backToApiList="handleCurrentChangeApi" v-show="changeApi === 'apiEdit'" />
      </el-tab-pane>

      <el-tab-pane name="third">
        <span slot="label"><i class="el-icon-upload"></i> 数据字典</span>
      </el-tab-pane>

      <el-tab-pane name="fourth">
        <span slot="label"><i class="el-icon-minus"></i> 文档管理</span>
      </el-tab-pane>

      <el-tab-pane name="fifth">
        <span slot="label"><i class="el-icon-document"></i> 人员管理</span>
        <projectMember />
      </el-tab-pane>

    </el-tabs>

    <el-dialog title="修改项目" :visible.sync="editProjectDialogVisible" class="add-dialog">
      <el-form :model="projectModel" :rules="rules" ref="projectModel" label-position="left" label-width="80px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="projectModel.name"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="projectModel.version"></el-input>
        </el-form-item>
        <el-form-item label="项目类型" prop="type">
          <el-select v-model="projectModel.type" placeholder="请选择项目类型">
            <el-option v-for="type of projectType" :label="type.name" :value="type.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目说明" prop="dec">
          <el-input type="textarea" v-model="projectModel.dec"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editProjectDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import ApiList from '../Api/ApiList.vue'
  import ApiDetail from '../Api/ApiDetail.vue'
  import ApiEdit from '../Api/ApiEdit.vue'
  import ProjectMember from './ProjectMember.vue'
  import ProjectService from '../../service/project.service'
  import ProjectDetail from './ProjectDetail.vue'
  import {
    PROJECT_TYPE
  } from '../../../config/global.config.js'

  export default {
    components: {
      ApiList,
      ProjectMember,
      ProjectDetail,
      ApiDetail,
      ApiEdit
    },
    mounted() {
      this.ProjectService = new ProjectService()
    },
    computed: {
      userInfor() {
        return this.$store.state.userInfor
      },
      project() {
        return this.$store.state.project
      }
    },
    data() {
      return {
        activeName: 'first',
        editProjectDialogVisible: false,
        projectModel: {
          type: ''
        },
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
        projectType: PROJECT_TYPE,
        changeApi: 'apiList'
      }
    },
    methods: {
      handleCurrentChangeApi(val) {
        this.changeApi = val
      },
      changeTap(tapName) {
        this.activeName = tapName
      },
      handleEdit(project) {
        this.editProjectDialogVisible = true
        this.projectModel.name = project.name
        this.projectModel.type = project.type
        this.projectModel.version = project.version
        this.projectModel.dec = project.dec
      },
      saveEdit() {
        this.$refs.projectModel.validate((valid) => {
          if (valid) {
            this.projectModel.projectId = this.project.id
            this.ProjectService.updateProjectInfo(this.projectModel).then(res => {
              if (res.status === 200) {
                this.editProjectDialogVisible = false
                
                this.project.name = this.projectModel.name
                this.project.type = this.projectModel.type
                this.project.version = this.projectModel.version
                this.project.dec = this.projectModel.dec
                this.projectModel = {
                  type: ''
                }

                console.log(this.project)

                this.$message({
                  type: 'success',
                  message: `保存成功！`
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

  .add-dialog {
    .el-select {
      width: 100%;
    }
  }

  .el-dialog__close {
    font-size: 15px;
  }

  .el-col {
    .bg-purple {
      background: #fff;
      border: 1px solid #e5e5e5;
      border-left: 0px;
      font-size: 14px;
      color: #333;
    }
    &:first-child .bg-purple {
      border-left: 1px solid #e5e5e5;
    }
  }

  .project-infor {
    .title-row {
      border: 1px solid #e5e5e5;
      border-bottom: 0px;
      margin-bottom: 0;
      .grid-content {
        height: 130px;
        border: 0px;
      }
      .project-name {
        .grid-content {
          p {
            font-size: 24px;
            color: #20a0ff;
            font-weight: 700;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      p {
        margin: 0px;
        line-height: 130px;
        padding-left: 15px;
      }
      button {
        line-height: 130px;
        padding-top: 0px;
        padding-bottom: 0px;
      }
    }
    .second-row,
    .third-row {
      .grid-content {
        padding: 20px 15px;
        .tel {
          color: #333;
        }
        h3 {
          margin: 0px;
          font-size: 18px;
          margin-bottom: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          margin: 0px;
          font-size: 12px;
          color: #b6b6b6;
        }
      }
    }
    .third-row {
      margin-top: 20px;
      .grid-content {
        cursor: pointer;
        &:hover {
          background: #fafafa;
        }
      }
    }
  }

</style>
