<template>
  <div class="project-infor">

    <el-row class="title-row">
      <el-col :span="6" class="project-name">
        <div class="grid-content bg-purple">
          <p><i class="el-icon-menu"></i> 项目名称</p>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple">
          <p>项目介绍</p>
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
          <h3>Web</h3>
          <p>项目类型</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h3>V 1.2.1</h3>
          <p>版本号</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h3>2017-05-13 11:55:25</h3>
          <p>最后更新日期</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h3>阿大</h3>
          <p>创建者</p>
        </div>
      </el-col>
    </el-row>

    <el-row class="third-row">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h3>22 个接口</h3>
          <p>接口总数</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h3>0 个数据库</h3>
          <p>数据库数量</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h3>12 人</h3>
          <p>项目组成员</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
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

  .grid-content {
    min-height: 36px;
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
        h3 {
          margin: 0px;
          font-size: 18px;
          margin-bottom: 12px;
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
    }
  }

</style>
