<template>
  <div>
    <el-row class="row-box">
      <el-col :span="12">
        <el-form label-width="100px">
          <el-form-item label="组织编号">
            <el-input v-model="code" placeholder="请输入组织编号"></el-input>
          </el-form-item>
          <el-form-item label="开始户序号">
            <el-input type="number" v-model="start" placeholder="请输入组织内起始户序号"></el-input>
          </el-form-item>
          <el-form-item label="截止户序号">
            <el-input type="number" v-model="end" placeholder="请输入组织内截止户序号"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="createBtn">开始生成</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-progress :text-inside="true" :stroke-width="26" :percentage="num"></el-progress>
      </el-col>
    </el-row>
    <el-row>
      <div class="qrCodeUrl" ref="qrCodeUrl" style="width:100px;height:100px"></div>
    </el-row>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import html2canvas from "html2canvas";
import ossAuth from "@/commen/oss/ossAuth";
let client = ossAuth.client;
export default {
  name: "createRQ",
  data() {
    return {
      code: "",
      familyNumber: "",
      start: "",
      end: "",
      url: "http://test.zyyunxun.cn/pc/index.html#/?",
      num: 0,
      addressUrl: "/code/"
    };
  },
  methods: {
    createBtn() {
      if (this.code == "" || this.start == "" || this.end == "") {
        this.$message.error("请将信息输入完整");
      } else if (this.end < this.start) {
        this.$message.error("截止户序号不能小于起始户序号");
      } else {

        for (let i = this.start; i <= this.end; i++) {
          console.log("循环第" + i + "次------------");
          let tempName = this.addressUrl + this.code + "/" + i + ".jpg";
          this.creatQrCode(this.code, i);
          let Blob = this.toImage(tempName);
          this.$refs.qrCodeUrl.childNodes =removeChild(this.$refs.qrCodeUrl.childNodes[0]);
          console.log(Blob);
        }
        

      }
    },
    //上传oss
    // 上传Blob二进制数据
    uploadBlob(fileName, blob) {
      console.log(fileName);
      console.log(blob);
      async function putBlob() {
        try {
          let result = await client.put(fileName, blob);
        } catch (e) {
          console.log(e);
        }
      }
      putBlob();

      //   return new Promise((resolve, reject) => {
      //     async function putBlob() {
      //       try {
      //         let result = await client.put(fileName, blob);
      //         result.imgUrl = `${CDN_IMAGE_DOMAIN}/${result.name}`;
      //         resolve(result);
      //         consoel.log('resolve')

      //       } catch (e) {
      //         reject(e);
      //       }
      //     }
      //     putBlob();
      //   });
    },

    //转换最终的base64编码为二进制图片
    base64ToBlob(tempName, dataUrl, type) {
      var arr = dataUrl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1] || type;
      // 去掉url的头，并转化为byte
      var bytes = window.atob(arr[1]);
      // 处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }

      let data = new Blob([ab], {
        type: mime
      });
      return this.uploadBlob(tempName, data);
    },
    toImage(tempName) {
      html2canvas(this.$refs.qrCodeUrl, {
        backgroundColor: null
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        return this.base64ToBlob(tempName, dataURL);
      });
    },
    creatQrCode(code, familyNumber) {
      let url = this.url + "code=" + code + "&familyNumber=" + familyNumber;
      let qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: url,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.row-box {
  background: #fff;
  padding: 15px 0;
}
</style>