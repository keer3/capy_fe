<template>
  <div class="api-detail">
    <div class="header-btn">
      <el-button icon="arrow-left" @click="backToApiList">接口列表</el-button>
      <el-button type="primary" icon="information">详情</el-button>
      <el-button icon="edit" @click="backToApiEdit">编辑</el-button>
      <el-button icon="delete2" @click="deleteApiDialog = true">删除</el-button>
    </div>

    <div class="api-infor">
      <span :class="api.status === '1' ? 'api-status' : 'api-status unused'" v-text="api.status === '1' ? '启用' : '弃用'"></span>
      <p><span class="api-protocol">{{ api.protocol }}</span><span>{{ api.url }}</span></p>
      <p><span class="api-type">{{ api.type }}</span><span>{{ api.name }}</span><span class="api-time">{{ api.update_time }}</span></p>
    </div>

    <div class="api-header">
      <el-table :data="api.header" style="width: 100%">
        <el-table-column prop="" label="头部" width="100">
          <template scope="scope">
            <el-tag type="gray">{{ scope.$index + 1 }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="标签" width="180">
        </el-table-column>
        <el-table-column prop="content" label="内容">
        </el-table-column>
      </el-table>
    </div>

    <div class="api-params">
      <el-table :data="api.params" style="width: 100%">
        <el-table-column prop="" label="参数" width="70">
          <template scope="scope">
            <el-tag type="gray">{{ scope.$index + 1 }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="" label="" width="80">
          <template scope="scope">
            <span :class="scope.row.must ? 'api-type' : 'api-type unused'" v-text="scope.row.must ? '必填' : '非必填'"></span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="参数" width="100">
          <template scope="scope">
            <span>{{ scope.row.name }}</span>
            <span>{{ scope.row.dec }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="" label="[类型]/限制">
          <template scope="scope">
            <span>[{{ scope.row.type }}]</span>/
            <span>{{ scope.row.limit }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="" label="示例">
          <template scope="scope">
            <el-button class="api-example" size="small" @click="handleApiParamExample(scope.row)">查看</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="" label="值可能性">
          <template scope="scope">
            <ul>
              <li v-for="(paramValue, index) in scope.row.value">
                <span class="param-value-num">{{ index + 1 }}</span>
                <span>{{ paramValue.value }}</span>
              </li>
            </ul>
          </template>
        </el-table-column>

        <el-table-column prop="" label="值说明">
          <template scope="scope">
            <ul>
              <li v-for="(paramValue, index) in scope.row.value">
                <span>{{ paramValue.dec }}</span>
              </li>
            </ul>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <div class="api-return">
      <el-table :data="api.return" style="width: 100%">
        <el-table-column prop="" label="返回" width="70">
          <template scope="scope">
            <el-tag type="gray">{{ scope.$index + 1 }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="" label="" width="80">
          <template scope="scope">
            <span :class="scope.row.must ? 'api-type' : 'api-type unused'" v-text="scope.row.must ? '必含' : '非必含'"></span>
          </template>
        </el-table-column>

        <el-table-column prop="" label="参数" width="100">
          <template scope="scope">
            <span>{{ scope.row.name }}</span>
            <span>{{ scope.row.dec }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="" label="值可能性">
          <template scope="scope">
            <ul>
              <li v-for="(paramValue, index) in scope.row.value">
                <span class="param-value-num">{{ index + 1 }}</span>
                <span>{{ paramValue.value }}</span>
              </li>
            </ul>
          </template>
        </el-table-column>

        <el-table-column prop="" label="值说明">
          <template scope="scope">
            <ul>
              <li v-for="(paramValue, index) in scope.row.value">
                <span>{{ paramValue.dec }}</span>
              </li>
            </ul>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <div class="api-return-example">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane disabled>
          <span slot="label">返回示例：</span>
        </el-tab-pane>
        <el-tab-pane label="成功结果" name="success">
          <p>{{ api.success_return }}</p>
        </el-tab-pane>
        <el-tab-pane label="失败结果">
          <p>{{ api.error_return }}</p>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="api-remark">
      <p class="title">备注</p>
      <div class="content">
        {{ api.dec }}
      </div>
    </div>

    <el-dialog :title="paramExample.title + '参数示例'" :visible.sync="apiParamExampleDialog" size="tiny">
      <span>{{ paramExample.value }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="apiParamExampleDialog = false">取 消</el-button>
        <el-button type="primary" @click="apiParamExampleDialog = false">确 定</el-button>
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
  export default {
    mounted() {
      this.ApiService = new ApiService()
    },
    data() {
      return {
        apiParamExampleDialog: false,
        paramExample: {},
        activeName: 'success',
        deleteApiDialog: false
      }
    },
    computed: {
      project() {
        return this.$store.state.project
      },
      api() {
        return this.$store.state.api
      },
      apiList() {
        return this.$store.state.apiList
      },
      group() {
        return this.$store.state.group
      },
      apiToEdit() {
        return this.$store.state.apiToEdit
      },
      apiCount() {
        return this.$store.state.apiCount
      }
    },
    methods: {
      backToApiEdit() {
        this.$emit('backToApiList', 'apiEdit')
        let apiToEdit = {
          groupId: this.api.group_id,
          status: this.api.status,
          protocol: this.api.protocol,
          type: this.api.type,
          apiHeader: this.api.header,
          apiParams: this.api.params,
          apiReturn: this.api.return,
          successReturn: this.api.success_return,
          errorReturn: this.api.error_return,
          dec: this.api.dec,
          name: this.api.name,
          url: this.api.url
        }
        this.$store.commit('SAVE_API_TO_EDIT', apiToEdit)
      },
      handleApiParamExample(param) {
        this.apiParamExampleDialog = true
        this.paramExample = {
          title: param.name,
          value: param.example
        }
      },
      backToApiList() {
        this.$emit('backToApiList', 'apiList')
      },
      getApiDetail() {
        this.ApiService.getApiDetail({
          apiId: this.api.id
        }).then(res => {
          if (res.status === 200) {
            this.$store.commit('SAVE_API', res.data)
          }
        })
      },
      delApi() {
        this.ApiService.delApi({
          apiId: this.api.id
        }).then(res => {
          if (res.status === 200) {
            this.api = {}
            this.deleteApiDialog = false
            this.$message({
              type: 'success',
              message: `删除成功！`
            })
            this.searchApiList(this.group)
            this.$emit('backToApiList', 'apiList')
            this.$store.commit('SAVE_API_COUNT', this.apiCount - 1)
          }
        })
      },
      searchApiList(groupId) {
        this.groupSelect = groupId
        this.$store.commit('SAVE_GROUP', groupId)
        if (groupId === 'all') {
          this.ApiService.getAllApi({
            projectId: this.project.id
          }).then(res => {
            if (res.status === 200) {
              this.$store.commit('SAVE_API_LIST', res.data)
              this.apiCount = this.apiList.length
            }
          })
        } else {
          this.ApiService.getApiByGroup({
            groupId: groupId
          }).then(res => {
            this.$store.commit('SAVE_API_LIST', res.data)
          })
        }
      }
    }
  }

</script>

<style>
  .api-detail {
    .api-infor {
      background: #fff;
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #e5e5e5;
      .api-status {
        display: inline-block;
        width: 48px;
        height: 48px;
        line-height: 48px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        border: none;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        background-color: #4caf50;
        float: left;
        margin-right: 10px;
        &.unused {
          background-color: #9e9e9e;
          color: #ffffff;
        }
      }
      p {
        margin: 0px;
        font-weight: 700;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 24px;
        .api-protocol,
        .api-type {
          width: 54px;
          height: 22px;
          line-height: 22px;
          color: #fff;
          display: inline-block;
          text-align: center;
          font-size: 14px;
          margin-right: 10px;
          -webkit-border-radius: 3px;
          border-radius: 3px;
        }
        .api-protocol {
          background: #20a0ff;
        }
        .api-type {
          background: #4caf50;
        }
        .api-time {
          color: #a3a3a3;
          font-size: 14px;
          float: right;
        }
      }
    }

    .api-header {
      margin-top: 20px;
    }

    .api-params {
      margin-top: 20px;
      .api-type {
        border-radius: 3px;
        margin-right: 8px;
        font-size: 12px;
        display: inline-block;
        width: 55px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        text-indent: 0;
        cursor: pointer;
        color: #fff;
        background-color: #4caf50;
        border: 1px solid #43a047;
        &.unused {
          background: #9e9e9e;
          border: 1px solid #828282;
        }
      }
      .api-example {
        width: 50px;
        font-size: 13px;
        background: #f5f5f5;
        color: #444;
        border: 1px solid rgba(0, 0, 0, .06);
      }
      ul {
        margin: 3px 0;
        li {
          margin: 3px 0;
        }
      }
    }

    .api-return {
      margin-top: 29px;
      .api-type {
        border-radius: 3px;
        margin-right: 8px;
        font-size: 12px;
        display: inline-block;
        width: 55px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        text-indent: 0;
        cursor: pointer;
        color: #fff;
        background-color: #4caf50;
        border: 1px solid #43a047;
        &.unused {
          background: #9e9e9e;
          border: 1px solid #828282;
        }
      }
    }

    .api-return-example {
      margin-top: 20px;
      .el-tabs__item.is-disabled {
        color: #333;
        cursor: default;
      }
      .el-tabs__header {
        padding: 0px;
      }
      .el-tab-pane {
        padding: 0px;
      }
      p {
        font-size: 14px;
        color: #1f2d3d;
        line-height: 20px;
      }
      .el-tabs--border-card {
        box-shadow: none;
        border: 1px solid #e5e5e5;
      }
    }

    .api-remark {
      background: #fff;
      border: 1px solid #e5e5e5;
      margin-top: 20px;
      padding: 20px;
      p.title {
        margin: 0px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 16px;
        padding-bottom: 10px;
      }
      .content {
        margin-top: 10px;
        font-size: 16px;
      }
    }

    .el-table {
      th {
        background: #fff;
      }
      thead div {
        background: #fff;
      }
    }

    .param-value-num {
      width: 25px;
      height: 25px;
      line-height: 25px;
      -webkit-border-radius: 3px;
      border-radius: 3px;
      background-color: #f2f2f2;
      color: #9e9e9e;
      display: inline-block;
      font-size: 14px;
      text-align: center;
      margin-right: 5px;
    }

    ul {
      margin: 3px 0;
      li {
        margin: 3px 0;
      }
    }
  }

</style>
