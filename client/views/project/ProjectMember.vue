<template>
  <div class="member-infor">
    <div class="content">
      <div class="search">
        <el-input placeholder="请输入内容" v-model="searchInput">
          <el-select v-model="searchSelect" slot="prepend" placeholder="请选择">
            <el-option label="用户名" value="username"></el-option>
            <el-option label="联系方式" value="phone"></el-option>
            <el-option label="邮箱" value="email"></el-option>
          </el-select>
          <el-button slot="append" icon="search">搜索用户</el-button>
        </el-input>
      </div>

      <div class="member-list">
        <p class="kind">创建者</p>

        <ul class="member">
          <li class="pull-left name-summary-li">{{ project.create_user.username }}</li>
          <li class="pull-left people-li">
            <p class="name">{{ project.create_user.username }}</p>
            <p class="phone">{{ project.create_user.phone }}</p>
          </li>
          <li class="pull-right menu">
            <i class="el-icon-more"></i>
          </li>
        </ul>

        <p class="kind">协作成员</p>

        <el-row :gutter="20">

          <el-col v-for="member of memberList" :span="12" :xs="12" :sm="8" :md="6" :lg="6">
            <ul class="member">
              <li class="pull-left name-summary-li">{{ member.username }}</li>
              <li class="pull-left people-li">
                <p class="name">{{ member.username }}</p>
                <p class="phone">{{ member.phone }}</p>
              </li>
              <li class="pull-right menu">
                <i class="el-icon-more"></i>
              </li>
            </ul>
          </el-col>

        </el-row>

      </div>

    </div>
  </div>
</template>
<script>
  import ProjectService from '../../service/project.service'
  export default {
    mounted() {
      this.ProjectService = new ProjectService()
      this.ProjectService.findUserByProject({
        projectId: this.project.id
      }).then(res => {
        if (res.status === 200) {
          this.memberList = res.data
        }
      })
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
        searchInput: '',
        searchSelect: '',
        memberList: []
      }
    }
  }

</script>
<style>
  .member-infor {
    .el-select .el-input {
      width: 110px;
    }
    .content {
      background: #FFF;
      .search {
        padding: 20px;
        border-bottom: 1px solid #e5e5e5;
      }
      .member-list {
        padding: 0 20px;
        .kind {
          font-size: 14px;
          font-weight: 700;
          height: 36px;
          line-height: 44px;
          text-indent: 0;
        }
        .member {
          width: 200px;
          padding: 10px;
          overflow: hidden;
          margin-right: 10px;
          border: 1px solid #ededed;
          -webkit-border-radius: 3px;
          border-radius: 3px;
          margin-top: 10px;
          height: 43px;
          line-height: 43px;
          .name-summary-li {
            -webkit-border-radius: 23px;
            border-radius: 23px;
            width: 41px;
            height: 41px;
            line-height: 41px;
            background-color: #fafafa;
            text-align: center;
            color: #999;
            border: 1px solid #ddd;
            font-size: 14px;
          }
          .people-li {
            margin-left: 15px;
            p {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 21.5px;
              line-height: 21.5px;
              font-size: 14px;
              margin: 0px;
            }
            .phone {
              color: #999;
            }
          }

          .menu i {
            display: block;
            color: #999;
            font-size: 14px;
            cursor: pointer;
          }

          .pull-left {
            float: left;
          }
          .pull-right {
            float: right;
          }
        }
      }
    }
    .search {
      .el-input-group__append {
        color: #20a0ff;
      }
    }
  }

</style>
