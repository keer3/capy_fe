<template>
  <div class="api-form">
    <div class="form-header-btn">
      <el-button icon="arrow-left" @click="backToApiList">接口列表</el-button>
      <el-button icon="check" type="primary" @click="addApi">保存</el-button>
    </div>

    <div class="row">
      <el-form :inline="true" :model="apiForm" label-width="70px" label-position="left" :rules="apiRules">
        <el-form-item label="分组" prop="groupId">
          <el-select v-model="apiForm.groupId" placeholder="请选择">
            <el-option v-for="group in groupList" :key="group.id" :label="group.name" :value="group.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="apiForm.status" placeholder="请选择">
            <el-option label="启用" value="1"></el-option>
            <el-option label="弃用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求协议" prop="protocol">
          <el-select v-model="apiForm.protocol" placeholder="请选择">
            <el-option label="HTTP" value="HTTP"></el-option>
            <el-option label="HTTPS" value="HTTPS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求方式" prop="type">
          <el-select v-model="apiForm.type" placeholder="请选择">
            <el-option v-for="type in apiType" :key="type" :label="type" :value="type">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="apiForm" label-width="70px" label-position="left" :rules="apiRules" class="main-input">
        <el-form-item label="URL" prop="url">
          <el-input v-model="apiForm.url"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="apiForm.name"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="row api-header">
      <p class="title">请求头部：</p>
      <div class="content">
        <div class="repeat-row" v-for="(header, index) in apiForm.apiHeader">
          <el-button icon="minus" size="small" @click="removeApiHeader(index)"></el-button>
          <span>头部标签：</span>
          <el-select v-model="header.name" placeholder="请选择">
            <el-option v-for="h in apiHeader" :label="h" :value="h">
            </el-option>
          </el-select>
          <span>头部内容：</span>
          <el-input class="header-content" v-model="header.content" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <p class="footer">
        <el-button type="primary" size="small" @click="addApiHeader">添加 <i class="el-icon-plus el-icon--right"></i></el-button>
      </p>
    </div>

    <div class="row api-params">
      <p class="title">请求参数：</p>
      <div class="content">
        <div class="repeat-row" v-for="(params, index) in apiForm.apiParams">
          <div class="simple">
            <el-button icon="minus" size="small" @click="removeApiParams(index)"></el-button>
            <el-select v-model="params.must" placeholder="请选择" class="params-must">
              <el-option label="必填" value="1"></el-option>
              <el-option label="选填" value="0"></el-option>
            </el-select>
            <span>参数名称：</span>
            <el-input class="params-input" v-model="params.name" placeholder="请输入内容"></el-input>
            <span>参数说明：</span>
            <el-input class="params-input" v-model="params.dec" placeholder="请输入内容"></el-input>
            <span>参数类型：</span>
            <el-select v-model="params.type" placeholder="请选择">
              <el-option v-for="type in apiParamsType" :label="type" :value="type">
              </el-option>
            </el-select>
            <el-button size="small" @click="params.detail = !params.detail">更多参数</el-button>
          </div>
          <div class="detail" v-show="params.detail">
            <p>
              <span>参数限制：</span>
              <el-input class="params-input" v-model="params.limit" placeholder="请输入内容"></el-input>
            </p>
            <p>
              <span>参数示例：</span>
              <el-input class="params-input" v-model="params.example" placeholder="请输入内容"></el-input>
            </p>
            <span>值可能性：</span>
            <div class="param-value">
              <div v-for="(value, index) in params.value">
                <el-button icon="minus" size="small" @click="removeParamsValue(params, index)"></el-button>
                <el-input class="params-input" v-model="value.value" placeholder="请输入内容"></el-input>
                <span>字段说明：</span>
                <el-input class="params-input" v-model="value.dec" placeholder="请输入内容"></el-input>
              </div>
              <el-button type="primary" size="small" @click="addParamsValue(params)">添加 <i class="el-icon-plus el-icon--right"></i></el-button>
            </div>
          </div>

        </div>
      </div>
      <p class="footer">
        <el-button type="primary" size="small" @click="addApiParams">添加 <i class="el-icon-plus el-icon--right"></i></el-button>
      </p>
    </div>

    <div class="row api-return">
      <p class="title">返回说明：</p>
      <div class="content">
        <div class="repeat-row" v-for="(ret, index) in apiForm.apiReturn">
          <p>
            <el-button icon="minus" size="small" @click="removeApiRet(index)"></el-button>
            <el-select v-model="ret.must" placeholder="请选择" class="params-must">
              <el-option label="必填" value="1"></el-option>
              <el-option label="选填" value="0"></el-option>
            </el-select>
            <span>字段名称：</span>
            <el-input class="ret-input" v-model="ret.name" placeholder="请输入内容"></el-input>
            <span>字段说明：</span>
            <el-input class="ret-input" v-model="ret.dec" placeholder="请输入内容"></el-input>
          </p>
          <span class="ret-value-label">值可能性：</span>
          <div class="ret-value">
            <div v-for="(value, index) in ret.value">
              <el-button icon="minus" size="small" @click="removeRetValue(ret.value, index)"></el-button>
              <el-input class="ret-input" v-model="value.value" placeholder="请输入内容"></el-input>
              <span>字段说明：</span>
              <el-input class="ret-input" v-model="value.dec" placeholder="请输入内容"></el-input>
            </div>
            <el-button type="primary" size="small" @click="addRetValue(ret.value)">添加 <i class="el-icon-plus el-icon--right"></i></el-button>
          </div>
        </div>
      </div>
      <p class="footer">
        <el-button type="primary" size="small" @click="addApiRet">添加 <i class="el-icon-plus el-icon--right"></i></el-button>
      </p>
    </div>

    <div class="api-example">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane disabled>
          <span slot="label">返回示例：</span>
        </el-tab-pane>
        <el-tab-pane label="成功结果" name="success">
          <el-input type="textarea" placeholder="请输入内容" v-model="apiForm.successReturn" :autosize="{ minRows: 4 }">
          </el-input>
        </el-tab-pane>
        <el-tab-pane label="失败结果">
          <el-input type="textarea" placeholder="请输入内容" v-model="apiForm.errorReturn" :autosize="{ minRows: 4 }">
          </el-input>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="row">
      <p class="title">备注：</p>
      <el-input type="textarea" placeholder="请输入内容" v-model="apiForm.dec" :autosize="{ minRows: 4 }" style="margin: 15px 5px 5px 5px;">
      </el-input>
    </div>

    <div class="form-header-btn" style="margin-top: 15px;text-align: right;">
      <el-button icon="arrow-left">接口列表</el-button>
      <el-button icon="check" type="primary">保存</el-button>
    </div>


  </div>
</template>
<script>
  import ApiService from '../../service/api.service'
  import {
    API_TYPE,
    API_HEADER_PARAMS,
    API_PARAMS_TYPE
  } from '../../../config/global.config'

  export default {
    mounted() {
      this.ApiService = new ApiService()
      this.getGroupList()
    },
    data() {
      return {
        apiForm: {
          groupId: '',
          status: '',
          protocol: '',
          type: '',
          apiHeader: [],
          apiParams: [],
          apiReturn: [],
          successReturn: '',
          errorReturn: '',
          dec: ''
        },
        apiType: API_TYPE,
        apiHeader: API_HEADER_PARAMS,
        apiParamsType: API_PARAMS_TYPE,
        groupList: [],
        activeName: 'success',
        apiRules: {
          url: [
            {required: true, message: '请输入URL', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入接口名称', trigger: 'blur'}
          ]
        }
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
      userInfor() {
        return this.$store.state.userInfor
      }
    },
    methods: {
      addApi() {
        this.apiForm.projectId = this.project.id
        this.apiForm.userId = this.userInfor.userId
        this.ApiService.addApi(this.apiForm).then(ret => {
          if(ret.status === 200) {
            this.$message({
              type: 'success',
              message: `保存成功！`
            })
            this.searchApiList(this.group)
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
      },
      backToApiList() {
        this.$emit('backToApiList', 'apiList')
      },
      removeApiRet(index) {
        this.apiForm.apiReturn.splice(index, 1)
      },
      addApiRet() {
        this.apiForm.apiReturn.push({
          must: '1',
          value: []
        })
      },
      removeRetValue(value, index) {
        value.splice(index, 1)
      },
      addRetValue(value) {
        value.push({
          value: '',
          dec: ''
        })
      },
      removeApiParams(index) {
        this.apiForm.apiParams.splice(index, 1)
      },
      addApiParams() {
        this.apiForm.apiParams.push({
          must: '1',
          type: '',
          detail: false,
          value: []
        })
      },
      removeParamsValue(param, index) {
        param.value.splice(index, 1)
      },
      addParamsValue(param) {
        param.value.push({
          value: '',
          dec: ''
        })
      },
      getGroupList() {
        this.ApiService.getGroupList({
          projectId: this.project.id
        }).then(res => {
          if (res.status === 200) {
            this.groupList = res.data
          }
        })
      },
      addApiHeader() {
        this.apiForm.apiHeader.push({
          name: '',
          content: '',
          must: '1'
        })
      },
      removeApiHeader(index) {
        this.apiForm.apiHeader.splice(index, 1)
      }
    }
  }

</script>

<style lang="">
  .api-form {
    .row {
      background: #fff;
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
      .el-form-item {
        margin-bottom: 10px;
      }
      .title {
        border-bottom: 1px solid #e5e5e5;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        font-weight: 700;
        margin: 0px;
      }
      .content {
        span {
          font-size: 14px;
        }
        .header-content {
          width: 50%;
        }
        .repeat-row {
          border-bottom: 1px dotted #e5e5e5;
          padding-bottom: 5px;
        }
        .params-must {
          width: 80px;
        }
        .detail {
          margin-left: 130px;
          p {
            margin: 0px;
          }
          div {
            width: 100%;
          }
          .param-value {
            margin-left: 80px;
            position: relative;
            top: -33px;
          }
        }
      }
      .main-input{
        margin-bottom: 15px;
        margin-top: 10px;
        .el-form-item:first-child{
          margin-bottom: 20px;
        }
      }
      &.api-return {
        .ret-input.el-input {
          width: 200px;
        }
        p {
          margin: 0px;
        }
        .ret-value-label {
          position: relative;
          left: 130px;
        }
        .ret-value {
          margin-left: 210px;
          position: relative;
          top: -35px;
        }
      }
      &.api-params .params-input {
        &.el-input {
          width: 200px;
        }
      }
      .footer {
        margin: 0px;
      }
    }
    .api-example {
      margin-top: 20px;
      .el-tabs--border-card{
        border: 1px solid #e5e5e5;
        box-shadow: none;
      }
      .el-tabs__header {
        padding: 0px;
        .el-tabs__item.is-disabled {
          color: #333;
          font-size: 14px;
          font-weight: 700;
          padding-left: 10px;
          padding-right: 10px;
        }
      }
      .el-tab-pane {
        padding: 0px;
      }
    }
    .api-header {
      padding-top: 0px;
    }
    .el-form .el-form-item:last-child {
      margin-bottom: 0px;
    }
  }

</style>
