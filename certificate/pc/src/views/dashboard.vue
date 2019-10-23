<template>
  <div>
    首页
    <el-button type="primary" @click="creatQrCode">二维码</el-button>
    <div class="qrcode" ref="qrCodeUrl"></div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "dashboard",
  methods: {
    creatQrCode() {
      let url ="http://jiti.test.3ch.org.cn/h5/index.html#/?orgId=123&userId=22323"
      let qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: url,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>