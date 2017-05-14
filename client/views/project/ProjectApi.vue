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
              <el-button type="text" icon="plus">添 加</el-button>
            </div>
            <div class="group-list">
              <ul>
                <li class="active">
                  <span>所有接口</span>
                  <span>
                    <i class="el-icon-edit"></i>
                    <i class="el-icon-delete"></i>
                  </span>
                </li>
                <li v-for="group of groupList">
                  <span>{{ group.name }}</span>
                  <span>
                    <i class="el-icon-edit"></i>
                    <i class="el-icon-delete"></i>
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


          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="接口名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="接口URL" width="180">
            </el-table-column>
            <el-table-column prop="address" label="最后更新者">
            </el-table-column>
            <el-table-column prop="address" label="更新日期">
            </el-table-column>
            <el-table-column prop="" label="操作">
            <template scope="scope">
                <el-button size="small">编 辑</el-button>
                <el-button size="small" type="danger">删 除</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-col>
    </el-row>
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
      searchApi() {

      },
      getApiGroupList() {
        this.ApiService.getGroupList({
          projectId: this.project.id
        }).then(res => {
          if(res.status === 200) {
            this.groupList = res.data
          }
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
