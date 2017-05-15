<template>
  <div class="api-detail">
    <div class="header-btn">
      <el-button icon="arrow-left" @click="backToApiList">接口列表</el-button>
      <el-button type="primary" icon="information">详情</el-button>
      <el-button icon="edit">编辑</el-button>
      <el-button icon="delete2">删除</el-button>
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
        <el-table-column prop="" label="头部" width="70">
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
            <span>[{{ scope.row.type }}]</span>
            <span>{{ scope.row.limit }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="" label="示例">
          <template scope="scope">
            <el-button size="small">查看</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="" label="值可能性">
          <template scope="scope">
            <ul>
              <li v-for="(paramValue, index) in scope.row.value">
                <span>{{ index + 1 }}</span>
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </div>

    <div class="api-return-example">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 我的行程</span> 我的行程
        </el-tab-pane>
        <el-tab-pane label="消息中心">消息中心</el-tab-pane>
      </el-tabs>
    </div>

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
    computed: {
      project() {
        return this.$store.state.project
      },
      api() {
        return this.$store.state.api
      }
    },
    methods: {
      backToApiList() {
        console.log('backToApiList')
        this.$emit('backToApiList', false)
      },
      getApiDetail() {
        this.ApiService.getApiDetail({
          apiId: this.api.id
        }).then(res => {
          if (res.status === 200) {
            this.$store.commit('SAVE_API', res.data)
          }
        })
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
          background: #9e9e9e;
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
          height: 21px;
          line-height: 21px;
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
        height: 20px;
        line-height: 20px;
        text-align: center;
        text-indent: 0;
        cursor: pointer;
        color: #fff;
        background-color: #4caf50;
        border: 1px solid #43a047;
        &.unused{
          background: #9e9e9e;
          border: none;
        }
      }
    }

    .api-return {
      margin-top: 29px;
    }

    .api-return-example {
      margin-top: 20px;
    }
  }

</style>
