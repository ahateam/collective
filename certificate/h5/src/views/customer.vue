<template>
  <div>
    <div v-if="customer">
      <div class="title-box">客服联系方式</div>
      <div class="item-box">
        <div class="content-box">
          <div class="item-title">客服姓名:</div>
          <div class="item-text">{{customer.name}}</div>
        </div>
         <div class="content-box">
          <div class="item-title">客服手机:</div>
          <div class="item-text">{{customer.phone}}</div>
        </div>
         <div class="content-box">
          <div class="item-title">客服邮箱:</div>
          <div class="item-text">{{customer.Email}}</div>
        </div>
        <div class="content-box">
          <div class="item-title">客服QQ号:</div>
          <div class="item-text">{{customer.qqNumber}}</div>
        </div>
         <div class="content-box">
          <div class="item-title">客服微信:</div>
          <div class="item-text">{{customer.wxNumber}}</div>
        </div>
      </div>
      <div class="item-btn">
          <div > </div>
      </div>
        <div class="footer">
            <p> &copy; 集体经济网络服务平台</p>
            <p>&copy; 遵义云讯网络科技有限责任公司 &copy;2019-2020</p>
         </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "customer",
  data() {
    return {
      customer: null
    };
  },
  methods: {},
  mounted() {
    let cnt = {};
    this.$api.getCustomer(cnt, res => {
      this.customer = JSON.parse(res.data.c);
      console.log(this.customer);
    });
  }
};
</script>

<style lang="scss" scoped>
.title-box {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #6cbaf8;
  color: #fff;
  font-size: 18px;
  text-align: center;
}
.item-box {
  width: auto;
  padding: 15px;
  margin-top: 20%;

}
.content-box {
  width: auto;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
}
.item-title {
  float: left;
  width: 40%;
  height: 40px;
  line-height: 40px;
  color: #666;
  font-size: 16px;
  text-align: right;
}
.item-text{
    margin-left: 5%;
    float: left;
    width: 50%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #333;

}
.footer {
  position: fixed;
  bottom: 10px;
  width: 100%;
  height: 4rem;
  color: #666;
  font-size: 1.4rem;
  text-align: center;
}
</style>
