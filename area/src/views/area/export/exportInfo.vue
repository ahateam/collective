<template>
  <div>
    <el-row class="row-box">
      <el-col :span="24">
        <div class="tab-box">导出任务详情</div>
      </el-col>
    </el-row>
    <el-row class="row-box1">
      <el-row>
        <div class="info-box">
          <div class="info-title">{{info.title}}</div>
          <el-row>
            <el-col :span="6">
              <span class="status">
                导出状态：
                <span v-if="info.status == 0" class="status-text" style="color：#409EFF">{{statusStr}}</span>
                   <span v-if="info.status == 1" class="status-text" style="color：#67c23a">{{statusStr}}</span>
                      <span v-if="info.status == 3" class="status-text" style="color：#F56C6C">{{statusStr}}</span>
              </span>
            </el-col>
            <el-col :span="12">
              <span class="pro">
                <el-progress
                  style="margin-top:15px"
                  :text-inside="true"
                  :stroke-width="26"
                  :percentage="percentageNum"
                ></el-progress>
              </span>
            </el-col>
          </el-row>
        </div>
      </el-row>
      <el-row class="row-box2">
        <el-button type="primary" v-if="info.status ==1" @click="loadData()">下载数据</el-button>
        <el-button type="defalut" @click="toList()">返回列表</el-button>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "exportInfo",
  data() {
    return {
      info: "",
      statusStr: "",
      percentageNum: 0,
      timer: ""
    };
  },
  methods: {
    toList() {
      this.$router.push("/exportList");
    },
    downLoadExcel(cnt) {
      this.$area.downLoadExcel(cnt, res => {
        if (res.data.rc == this.$util.RC.SUCCESS) {
          this.$message({
            message: "开始执行批量数据导出",
            type: "success"
          });
        }
         this.getExportTaskById()
      });
    },
    getExportTaskById() {
      let cnt = {
        taskId: this.info.id
      };
      this.$area.getExportTaskById(cnt, res => {
        if (res.data.rc == this.$util.RC.SUCCESS) {
          this.info = this.$util.tryParseJson(res.data.c);
          this.percentageNum = parseInt(this.info.completedCount/this.info.amount)*100;
                  this.statusFliter();
          if (this.info.status != 1) {
              setTimeout(()=>{
                  this.getExportTaskById()
              },1500)
          }
        }
      });
    },
    statusFliter() {
      if (this.info.status == 0) {
        this.statusStr = "等待生成文件";
      } else if (this.info.status == 1) {
        this.statusStr = "数据已生成文件";
      } else if (this.info.status == 3) {
        this.statusStr = "数据正在生成文件，请等待.....";
      }
    },
    //下载
    loadData() {
      window.location.href = this.info.fileUrls;
    }
  },
  mounted() {
    this.info = this.$route.params.info;
       this.statusFliter()

    if (this.info.status == 0) {
      this.percentageNum = 0;
      let cnt = {
        taskId: this.info.id, // Long 任务组织编号
        orgId: this.info.orgId // Long 组织编号
      };
      this.downLoadExcel(cnt);
    } else if (this.info.status == 3) {
      this.percentageNum = parseInt(this.info.completedCount/this.info.amount)*100;
      this.getExportTaskById()
  
    } else {
      this.percentageNum = 100;
    }
   
  }
};
</script>

<style lang="scss" scoped>
.row-box {
  background: #fff;
  padding: 15px 0;
}
.row-box1 {
  margin-top: 20px;
  padding: 15px 15px 50px 15px;
  background: #fff;
}
.tab-box {
  width: auto;
  font-size: 16px;
  color: #333;
  margin-left: 20px;
}
.title-box {
  font-size: 1.6rem;
  line-height: 40px;
  letter-spacing: 2px;
  font-weight: 600;
  color: #666;
  text-align: right;
}
.info-box {
  width: auto;
  height: 50px;
}
.info-title {
  width: auto;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #666;
}
.status {
  font-size: 16px;
  line-height: 50px;
  color: #666;
}
.status-text {
  font-size: 16px;
  color: #67c23a;
}
.row-box2 {
  height: 50px;
  line-height: 50px;
}
</style>