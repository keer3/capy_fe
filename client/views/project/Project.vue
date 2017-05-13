<template>
  <div>
    <el-tabs v-model="activeName" class="second-nav">

      <el-tab-pane name="first">
        <span slot="label"><i class="el-icon-date"></i> 项目概况</span>
        <div class="project-infor">

          <el-row class="title-row">
            <el-col :span="6" class="project-name">
              <div class="grid-content bg-purple">
                <p><i class="el-icon-menu"></i> {{ project.name }}</p>
              </div>
            </el-col>
            <el-col :span="15">
              <div class="grid-content bg-purple">
                <p>{{ project.dec ? project.dec : '暂无项目说明信息' }}</p>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <el-button type="text"><i class="el-icon-edit"></i> 修改</el-button>
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
        </div>
      </el-tab-pane>

      <el-tab-pane name="second">
        <span slot="label"><i class="el-icon-document"></i> 接口文档</span>
        <projectApi :project="project" />
      </el-tab-pane>

      <el-tab-pane name="third">
        <span slot="label"><i class="el-icon-upload"></i> 数据字典</span>
      </el-tab-pane>
      
      <el-tab-pane name="fourth">
        <span slot="label"><i class="el-icon-minus"></i> 文档管理</span>
      </el-tab-pane>

      <el-tab-pane name="fifth">
        <span slot="label"><i class="el-icon-document"></i> 人员管理</span>
        <projectMember :project="project" />
      </el-tab-pane>

    </el-tabs>

  </div>
</template>
<script>
  import ProjectApi from './ProjectApi.vue'
  import ProjectMember from './ProjectMember.vue'
  import ProjectService from '../../service/project.service'

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
        activeName: 'first'
      }
    },
    methods: {
      changeTap(tapName) {
        this.activeName = tapName
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
      .grid-content{
        cursor: pointer;
        &:hover{
          background: #fafafa;
        }
      }
    }
  }

</style>
