<template>
  <div class="project-infor">

    <el-row class="title-row">
      <el-col :span="6" class="project-name">
        <div class="grid-content bg-purple">
          <p><i class="el-icon-menu"></i> {{ project.name }}</p>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple project-dec">
          <div class="project-dec-div">{{ project.dec ? project.dec : '暂无项目说明信息' }}</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <el-button type="text" @click="handleEdit(project)"><i class="el-icon-edit"></i> 修改</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row class="second-row">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h3>{{ project.type }}</h3>
          <p>项目类型</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h3>{{ project.version }}</h3>
          <p>版本号</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h3>{{ project.update_time }}</h3>
          <p>最后更新日期</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h3>{{ project.create_user.username }} <span class="tel"> {{ project.create_user.phone}}</span></h3>
          <p>创建者</p>
        </div>
      </el-col>
    </el-row>

    <el-row class="third-row">
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="changeTap('second')">
          <h3>{{ project.apiCount }} 个接口</h3>
          <p>接口总数</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="changeTap('third')">
          <h3>22 个数据库</h3>
          <p>数据库数量</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="changeTap('fifth')">
          <h3>{{ project.userCount}} 人</h3>
          <p>项目组成员</p>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="编辑项目" :visible.sync="editProjectDialogVisible" class="add-dialog">
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
        <el-form-item label="项目说明" prop="dsc">
          <el-input type="textarea" v-model="projectModel.dec"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editProjectDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editProject">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import ProjectApi from '../Api/ApiList.vue'
  import ProjectMember from './ProjectMember.vue'
  import ProjectService from '../../service/project.service'
  import {
    PROJECT_TYPE
  } from '../../../config/global.config.js'

  export default {
    components: {
      ProjectApi,
      ProjectMember
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
        projectType: PROJECT_TYPE
      }
    },
    methods: {
      editProject() {
        this.$refs.projectModel.validate((valid) => {
          if (valid) {
            this.projectModel.projectId = this.project.id
            this.ProjectService.updateProjectInfo(this.projectModel).then(res => {
              if (res.status === 200) {
                this.editProjectDialogVisible = false
                this.projectModel = {
                  type: ''
                }
                this.project.name = res.data.name
                this.project.type = res.data.type
                this.project.version = res.data.version
                this.project.dec = res.data.dec
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
      },
      changeTap(tapName) {
        this.$emit('changeTap', tapName)
      },
      handleEdit(project) {
        this.editProjectDialogVisible = true
        this.projectModel.name = project.name
        this.projectModel.type = project.type
        this.projectModel.version = project.version
        this.projectModel.dec = project.dec
      }
    }
  }

</script>
<style lang="">
  .project-infor {
    .project-dec {
      display: table;
      .project-dec-div {
        display: table-cell;
        vertical-align: middle;
        margin: 0px;
        padding-left: 15px;
        padding-right: 15px;
        line-height: 24px;
        font-size: 14px;
      }
    }
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
