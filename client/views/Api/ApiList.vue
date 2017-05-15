<template>
  <div class="api-infor">
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple menu-left">

          <div class="search-input">
            <el-input placeholder="搜索接口" icon="search" v-model="searchApiInput" :on-icon-click="searchApi">
            </el-input>
          </div>

          <div class="api-group">
            <div class="group-title">
              <span>分组</span>
              <el-button type="text" icon="plus" @click="handleAddGroup">添 加</el-button>
            </div>
            <div class="group-list">
              <ul>
                <li :class="groupSelect === 'all' ? 'active' : ''" @click="searchApiList('all')">
                  <span>所有接口</span>
                  <span>共 {{ apiCount }} 个
                  </span>
                </li>

                <li v-for="group of groupList" @click="searchApiList(group.id)" :class="groupSelect ===  group.id ? 'active' : ''">
                  <span>{{ group.name }}</span>
                  <span>
                    <i class="el-icon-edit" @click="handleEditGroup(group)"></i>
                    <i class="el-icon-delete" @click="handleDeleteGroup(group)"></i>
                  </span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </el-col>

      <el-col :span="20" class="api-list">
        <div class="grid-content bg-purple-light">
          <el-button type="primary"><i class="el-icon-plus"></i> 新增接口</el-button>


          <el-table :data="apiList" style="width: 100%" highlight-current-row @current-change="handleCurrentChange">
            <el-table-column prop="name" label="接口名称" width="120">
              <template scope="scope">
                <span :class="scope.row.status === '1' ? 'api-used' : 'api-unused'"></span>
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="url" label="接口URL">
              <template scope="scope">
                <span class="api-type">{{ scope.row.type }}</span>
                <span>{{ scope.row.url }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="update_userId" label="最后更新者" width="120">
            </el-table-column>
            <el-table-column prop="update_time" label="更新日期">
            </el-table-column>
            <el-table-column prop="" label="操作" width="150">
              <template scope="scope">
                <el-button size="small">编 辑</el-button>
                <el-button size="small" type="danger" @click="handleDelApi(scope.row)">删 除</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-col>
    </el-row>

    <el-dialog :title="addDialogTitle" :visible.sync="addGroupDialog" size="tiny">
      <el-form label-position="left" :model="group" ref="group" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分组名" prop="groupName">
          <el-input v-model="group.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGroupDialog = false">取 消</el-button>
        <el-button type="primary" @click="addGroup">保 存</el-button>
      </span>
    </el-dialog>


    <el-dialog title="提示" :visible.sync="deleteGroupDialog" size="tiny">
      <p>确认删除分组<span style="color: #ff4949">【{{ group.name }}】</span>？</p>
      <p>删除后分组下的接口都会被删除，将不再恢复！</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteGroupDialog = false">取 消</el-button>
        <el-button type="danger" @click="delApiGroup">删 除</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="deleteApiDialog" size="tiny">
      <p>确认删除接口<span style="color: #ff4949">【{{ api.name }}】</span>？</p>
      <p>删除后将不再恢复！</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteApiDialog = false">取 消</el-button>
        <el-button type="danger" @click="delApi">删 除</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import ApiService from '../../service/api.service'

  import {
    PROJECT_TYPE
  } from '../../../config/global.config.js'

  export default {
    components: {},
    mounted() {
      this.ApiService = new ApiService()
      this.getApiGroupList()
      this.searchApiList('all')
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
        searchApiInput: '',
        groupList: [],
        addGroupDialog: false,
        addDialogTitle: '添加分组',
        group: {},
        deleteGroupDialog: false,
        apiList: [],
        groupSelect: 'all',
        apiCount: 0,
        deleteApiDialog: false,
        api: {}
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.$store.commit('SAVE_API', val)
        this.$router.push({
          path: '/api'
        })
      },
      handleDelApi(api) {
        this.deleteApiDialog = true
        this.api = api
      },
      delApi() {
        this.ApiService.delApi({
          apiId: this.api.id
        }).then(res => {
          if (res.status === 200) {
            this.api = {}
            this.searchApiList(this.groupSelect)
            this.deleteApiDialog = false
            this.$message({
              type: 'success',
              message: `删除成功！`
            })
          }
        })
      },
      searchApiList(groupId) {
        this.groupSelect = groupId
        if (groupId === 'all') {
          this.ApiService.getAllApi({
            projectId: this.project.id
          }).then(res => {
            if (res.status === 200) {
              this.apiList = res.data
              this.apiCount = this.apiList.length
            }
          })
        } else {
          this.ApiService.getApiByGroup({
            groupId: groupId
          }).then(res => {
            this.apiList = res.data
          })
        }
      },
      searchApi() {

      },
      getApiGroupList() {
        this.ApiService.getGroupList({
          projectId: this.project.id
        }).then(res => {
          if (res.status === 200) {
            this.groupList = res.data
          }
        })
      },
      addGroup() {
        if (this.addDialogTitle === '添加分组') {
          this.ApiService.addGroup({
            projectId: this.project.id,
            name: this.group.name
          }).then(res => {
            if (res.status === 200) {
              this.group = {}
              this.getApiGroupList()
              this.addGroupDialog = false
              this.$message({
                type: 'success',
                message: `添加成功！`
              })
            }
          })
        } else {
          this.ApiService.renameGroup({
            groupId: this.group.id,
            name: this.group.name
          }).then(res => {
            this.group = {}
            this.getApiGroupList()
            this.addGroupDialog = false
            this.$message({
              type: 'success',
              message: `编辑成功！`
            })
          })
        }
      },
      handleEditGroup(group) {
        this.addGroupDialog = true
        this.group = group
        this.addDialogTitle = '编辑分组'
      },
      handleDeleteGroup(group) {
        this.deleteGroupDialog = true
        this.group = group
      },
      handleAddGroup() {
        this.addGroupDialog = true
        this.addDialogTitle = '添加分组'
        this.group = {}
      },
      delApiGroup() {
        this.ApiService.delGroup({
          groupId: this.group.id
        }).then(res => {
          this.group = {}
          this.getApiGroupList()
          this.deleteGroupDialog = false
          this.$message({
            type: 'success',
            message: `删除成功！`
          })
        })
      }
    }
  }

</script>
<style>
  .api-infor {
    .search-input {
      padding: 0 15px;
    }
    .api-group {
      margin-top: 20px;
      .group-title {
        position: relative;
        height: 43px;
        line-height: 43px;
        padding: 0 15px;
        font-size: 14px;
        cursor: default;
        border-bottom: 1px solid #dcdcdc;
        span:first-child {
          color: #555;
          font-weight: 700;
        }
        button {
          float: right;
          padding: 0px;
          line-height: 43px;
        }
      }
      .group-list {
        ul {
          margin: 0px;
          padding: 0px;
          li {
            padding: 15px 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            span:last-child {
              float: right;
              i {
                padding: 0 5px;
                color: #666;
              }
            }
            &:hover {
              background: #eee;
              color: #333;
            }
            &.active {
              background: #f5f5f5;
            }
          }
        }
      }
    }
    .api-list {
      .el-table {
        margin-top: 20px;
        th {
          background: #fff;
        }
        thead div {
          background: #fff;
        }
      }
      .api-used,
      .api-unused {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #4caf50;
        display: inline-block;
        margin-right: 5px;
      }
      .api-unused {
        background: #9e9e9e;
      }
      .api-type {
        border-radius: 3px;
        margin-right: 8px;
        font-size: 12px;
        display: inline-block;
        width: 55px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        text-indent: 0;
        cursor: pointer;
        color: #fff;
        background-color: #4caf50;
        border: 1px solid #43a047;
      }
    }
  }

  .menu-left {
    padding: 20px 0px;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #fff;
  }

  .bg-purple-light {
    background: #fafafa;
    padding: 10px 15px;
  }

  .grid-content {
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
