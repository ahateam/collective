<template>
  <div style="height:100%;width:100%">
    <div class="bg-box">
      <div class="content" v-if="info">
        <div class="title">电 子 股 权 证</div>
        <p class="code">
          编 号:
          <span style="color:#f66">{{info.master.share_cer_no}}</span>
        </p>
        <p class="text">
          为深化农村集体经济产权制度改革,发展壮大农
          村集体经济,赋予农民集体收益分配权，增加农民财
          产性收入，让广大农民群众共享改革红利。根据国家
          有关农村集体产权制度改革文化精神和法律、法规规
          定，经集体经济组织成员(代表)大会表决通过，对本
          村、组集体资产股份量化确权到户。
        </p>
        <div class="org-info">
          <div class="org-name">
            <div class="org-title">集体经济组织信息</div>
            <p class="org-name-text">组织名：{{info.org.name}}</p>
            <p class="org-name-text">组织编号：{{info.org.code}}</p>
            <p class="org-name-text">组织地址：{{info.org.address}}</p>
            <p class="org-name-text">入驻时间：{{timeFilter(info.org.createTime)}}</p>
            <p class="org-name-text">总资源股：{{info.org.resourceShares}}</p>
            <p class="org-name-text">总资产股：{{info.org.assetShares}}</p>
            <p class="org-name-text">总股份数：{{info.org.shareAmount}}</p>
          </div>
        </div>
        <div class="org-info">
          <div class="org-name">
            <div class="org-title">家庭户信息</div>
            <p class="org-name-text">户主姓名：{{info.master.master}}</p>
            <p class="org-name-text">家庭地址：{{info.master.address}}</p>
            <p class="org-name-text">家庭资源股：{{info.master.resource_shares}}</p>
            <p class="org-name-text">股权证编号{{info.master.share_cer_no}}</p>
          </div>
        </div>
        <div class="org-info">
          <div class="org-name">
            <div class="org-title">家庭户成员信息</div>
            <div class="user-list" v-for="(item,index) in info.menberArray" :key="index">
              <div class="item">
                <p v-if="item.realName">姓名：{{item.realName}}</p>
                <p v-if="item.sex">性别：{{item.sex}}</p>
                <p v-if="item.family_relations">与户主关系：{{item.family_relations}}</p>
                <p v-if="item.idNumber">身份证{{item.idNumber}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">&copy; 遵义云讯网络科技有限责任公司 &copy;2019</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      orgId: "",
      familyNumber: "",
      info: ""
    };
  },
  methods: {
    getData(cnt) {
      this.$api.getFamilyInfo(cnt, res => {
        if (res.data.rc == this.$util.RC.SUCCESS) {
          this.info = this.$util.tryParseJson(res.data.c);
        } else {
          this.info = "";
        }
        console.log(this.info);
      });
    },
    timeFilter(val) {
      let time = new Date(val);
      return time.toLocaleDateString();
    }
  },
  mounted() {
    this.orgId = this.$route.query.orgId;
    this.familyNumber = this.$route.query.familyNumber;

    let cnt = {
      familyNumber: this.familyNumber,
      orgId: this.orgId
    };

    this.getData(cnt);
  }
};
</script>

<style lang="scss" scoped>
.bg-box {
  width: 100%;
  min-height: 100%;
  background-image: url("../assets/image/bg.jpg");
  // background-size: 100%;
  background-position: center;
  background-size: cover;
}
.content {
  min-height: 100%;
  padding: 0 1.5rem 2rem 1.5rem;

  background: rgba($color: #fff, $alpha: 0.4);
}
.title {
  width: 100%;
  min-height: 5rem;
  line-height: 5rem;
  text-align: center;
  font-weight: 600;
  font-size: 2.2rem;
  color: #7dacc0;
}
.code {
  width: 100%;
  height: 4rem;
  margin-top: 1rem;
  color: #333;
  font-weight: 600;
  font-size: 1.8rem;
}
.text {
  margin-top: 1rem;
  color: #333;
  font-size: 1.4rem;
  line-height: 2rem;
}

.org-info {
  width: 100%;
  margin-top: 2rem;
}
.org-name {
  width: 100%;
}
.org-title {
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  color: #fff;
  font-size: 1.6rem;
  text-align: center;
  background: #98cee5;
  border-radius: 5px;
}
.org-name-text {
  margin-top: 1rem;
  width: 100%;
  font-size: 1.6rem;
  line-height: 2rem;
}

.user-list {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 5px;
  background: rgba($color: #fff, $alpha: 0.8);
  font-size: 1.6rem;
  color: #333;
}
.item p {
  line-height: 3rem;
}
.footer {
  margin-top: 4rem;
  width: 100%;
  height: 4rem;
  color: #666;
  font-size: 1.4rem;
  text-align: center;
}
</style>