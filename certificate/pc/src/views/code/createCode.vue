<template>
  <div style="padding:15px;">
    <el-row class="row-box">
      <el-col :span="16">
        <el-form label-width="100px">
          <el-form-item label="选择组织">
            <el-select
              v-model="orgId"
              filterable
              placeholder="请选择或搜索一个组织"
              style="width:100%"
            >
              <el-option
                v-for="(item,index) in orgList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始户序号">
            <el-input type="number" v-model="start" placeholder="请输入组织内起始户序号"></el-input>
          </el-form-item>
          <el-form-item label="截止户序号">
            <el-input type="number" v-model="end" placeholder="请输入组织内截止户序号"></el-input>
          </el-form-item>

          <el-form-item label="打包下载进度">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="num"></el-progress>
          </el-form-item>
        </el-form>
        <el-row>
          <el-button type="primary" @click="createBtn" :loading="isShowData">开始生成数据</el-button>
          <el-button type="primary" @click="batchDownLoad" v-show="isLoad">打包下载</el-button>
        </el-row>
      </el-col>
    </el-row>
    
    <el-row v-show="list.length>0">
      <div id="batch" hidden>
        <div v-for="(item,index) in list" :key="index">
          <div :id="''+item.id">
            <vue-qr
              :correctLevel="3"
              :logoScale="0.4"
              :text="item.url"
              :size="200"
              :margin="0"
              :dotScale="1"
              style="margin: 10px"
            ></vue-qr>
          </div>
        </div>
      </div>

      <canvas
        id="box"
        ref="box"
        style="display: none;background: #FFFFFF;"
        width="250px"
        height="250px"
      ></canvas>
      <!-- <canvas id="box" $ref="box" style="display: none;background: #FFFFFF;" width="250px" height="350px"></canvas> -->
    </el-row>
  </div>
</template>

<script>
import VueQr from "vue-qr"; //引入VueQr
import JSZip from "jszip"; //引入 jsZip
import FileSaver from "file-saver"; //引入FileSaver
import { Message } from "element-ui";
export default {
  name: "createRQ",

  data() {
    return {
      
      familyNumber: "",
      start: "",
      end: "",
      url: "http://online.zyyunxun.cn/h5/index.html#/?",
      num: 0,
      sum: 0,
      num1: 0,
      list: [],
      dataUrls: [],
      isLoad: false,
      isShowData: false,
      orgId:'',
      orgList: [],
      page: 1,
      count: 500
    };
  },
  components: {
    VueQr,
    JSZip,
    FileSaver
  },
  methods: {
    // getCode(){
    //   console.log(this.orgId)
    //   this.orgList.forEach((item)=>{
    //     if(item.id == this.orgId){
    //       this.code = item.code
    //       console.log(this.code)
    //       return
    //     }
    //   })
    // },
    //生成批量数据
    createBtn() {
      this.isShowData = true;
      if (this.orgId == "" || this.start == "" || this.end == "") {
        this.isShowData = false;
        this.$message.error("请将信息输入完整");
      } else if (this.end < this.start) {
        this.isShowData = false;
        this.$message.error("截止户序号不能小于起始户序号");
      } else {
        let start = this.start;
        while (start <= this.end) {
          let url = this.url + "orgId=" + this.orgId + "&familyNumber=" + start;
          let obj = { id: start, url: url };
          this.list.push(obj);
          start++;
        }
        this.sum = this.list.length;
        this.isLoad = true;
        this.isShowData = false;
      }
    },
    //批量生成图片
    batchDownLoad() {
      this.dataUrls = []; //重置dataUrls
      let len = this.list.length;
      for (let i = 0; i < len; i++) {
        this.num = parseInt(((i + 1) / this.sum) * 100);
        this.paintCanvas(this.list[i].id, "batch");
      }
      this.handleBatchDownload();
    },
    //压缩图片
    handleBatchDownload() {
      const zip = new JSZip();
      const zipName =   "集体二维码.zip";
      this.dataUrls.forEach(item => {
        const fileName = item.fileName + ".jpg";
        let arrData = item.picData.split(",");
        zip.file(fileName, arrData[1], { base64: true }); //向zip中添加文件
        zip.file(fileName, arrData[1], { base64: true }); //向zip中添加文件
      });
      zip.generateAsync({ type: "blob" }).then(function(content) {
        saveAs(content, zipName);
      });
    },
    // 生成二维码图片
    paintCanvas(id, type) {
      //id表示对应的二维码标签的id   type表示画布的类型
      let c = document.getElementById("box"); //获取canvas画布 画布大小和canvas大小一致
      let picName = id;
      let ctx = c.getContext("2d");
      c.height = c.height; //清空画布，重新绘制
      let div = null; //设置div变量
      //判断类型：single 单张  batch  批量
      if (type != "single") div = document.getElementById("" + id);
      //获取到需要绘制到canvas的div即二维码div
      else div = document.getElementById("" + id); //获取到需要绘制到canvas的div即二维码div
      let img = div.getElementsByTagName("img")[0]; //获取二维码
      ctx.drawImage(img, 25, 25, 200, 200); //参数依次为：绘制图片， 左，上，宽，高
      ctx.font = "20px bold 微软雅黑"; //设置字体大小  这里文字的加粗一直无效，至今没搞清楚原因 有能解决的朋友可以私聊
      //多画几次，让字体加粗  解决文字无法加粗问题

      let dataUrl = c.toDataURL(); //获取返回的base64的信息
      this.dataUrls.push({ picData: dataUrl, fileName: picName }); //把数据存进数组里面
      //如果类型是单张（single）则下载合成好的图片
      if (type == "single") {
        const link = document.createElement("a");
        link.download = id + ".jpg";
        link.href = dataUrl;
        link.click();
      }
    },
    getORGList() {
      let cnt = {
        offset: (this.page - 1) * this.count,
        count: this.count
      };
      this.$api.getORGList(cnt, res => {
        let arr = [];
        if (res.data.rc == this.$util.RC.SUCCESS) {
          arr = this.$util.tryParseJson(res.data.c);
        } else {
          arr = [];
        }
        console.log(arr);
        if (arr.length > 0) {
          this.orgList = this.orgList.concat(arr);
          this.page++;
          this.getORGList();
        }
      });
    }
  },
  mounted() {
    this.page = 1;
    this.getORGList();
    let canvas = this.$refs.box;
  }
};
</script>

<style lang="scss" scoped>
</style>