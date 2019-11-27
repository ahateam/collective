<template>
  <div>
    <el-row class="row-box">
      <el-col :span="24">机构组织详细信息</el-col>
    </el-row>
    <el-row class="row-box1">
      <el-col :span="24">
        <el-col :span="4">
          <div class="title-box">集体经济组织名称:</div>
        </el-col>
        <el-col :span="18">
          <div class="text-box">{{info.name}}</div>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="4">
          <div class="title-box">机构地址:</div>
        </el-col>
        <el-col :span="18">
          <div
            class="text-box"
            v-if="addressMech != '' "
          >{{addressMech.province.name}} &nbsp; {{addressMech.city.name}}&nbsp; {{addressMech.district.name}}</div>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="4">
          <div class="title-box">机构详细地址:</div>
        </el-col>
        <el-col :span="18">
          <div class="text-box">{{info.address}}</div>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="4">
          <div class="title-box">组织机构代码:</div>
        </el-col>
        <el-col :span="18">
          <div class="text-box">{{info.code}}</div>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="4">
          <div class="title-box">机构总股份数:</div>
        </el-col>
        <el-col :span="18">
          <div class="text-box">{{info.shareAmount}}</div>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="4">
          <div class="title-box">机构总资源股:</div>
        </el-col>
        <el-col :span="18">
          <div class="text-box">{{info.resourceShares}}</div>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="4">
          <div class="title-box">机构总资产股:</div>
        </el-col>
        <el-col :span="18">
          <div class="text-box">{{info.assetShares}}</div>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="4">
          <div class="title-box">集体经济代码证:</div>
        </el-col>
        <el-col :span="18">
          <div class="image-box">
            <img :src="getOssFile(info.imgOrg)" alt />
          </div>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="4">
          <div class="title-box">上传授权书:</div>
        </el-col>
        <el-col :span="18">
          <div class="image-box">
            <img :src="getOssFile(info.imgAuth)" alt />
          </div>
        </el-col>
      </el-col>
      <el-col :span="24" class="row-box2">
        <el-button type="primary" @click="edit">修改机构信息</el-button>
        <router-link to="/mechanism">
          <el-button style="margin-left: 50px">返回机构列表</el-button>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "mechInfo",
  data() {
    return {
      info: {},
      isMech: "",
      addressMech: "",
      city: "",
      province: "",
      district: ""
    };
  },
  methods: {
    edit() {
      this.$router.push({
        path: "/editMech",
        name: "editMech",
        params: {
          info: this.info,
          isMech: this.isMech
        }
      });
    },
    getOssFile(url){
        return this.$commen.getOssUrl(url)
    }
  },
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: "拼命加载中...",
      spinner: "el-icon-loading"
    });
    this.info = this.$route.params.info;
    this.isMech = this.$route.params.isMech;
    console.log("---------------");
    console.log(this.info);

    this.province = this.info.province;
    this.city = this.info.city;
    this.district = this.info.district;

    if (this.isMech == true) {
      //已经创建org
      let cnt = {
        orgId: this.info.id // Long 组织id
      };
      this.$api.getORGDistrict(cnt, res => {
        if (res.data.rc == this.$util.RC.SUCCESS) {
          this.addressMech = this.$util.tryParseJson(res.data.c);
        }
      });

      this.$api.getSuperior(cnt, res => {
        let obj = {
          superiorId: this.$util.tryParseJson(res.data.c, {}).superiorId
        };
        Object.assign(this.info, obj);
      });
    } else {
      //没有创建org
      let cnt = {
        orgExamineId: this.info.id // Long 组织id
      };
      this.$api.getORGDistrictByOrgApplyId(cnt, res => {
        if (res.data.rc == this.$util.RC.SUCCESS) {
          this.addressMech = this.$util.tryParseJson(res.data.c);
        }
      });
    }
    loading.close();
  }
};
</script>

<style scoped lang="scss">
.row-box {
  background: #fff;
  padding: 15px;
  font-size: 1.6rem;
  color: #666;
  border-left: 4px solid #67c23a;
}

.row-box1 {
  margin-top: 20px;
  padding: 15px;
  background: #fff;
}

.title-box {
  font-size: 1.6rem;
  line-height: 40px;
  letter-spacing: 2px;
  font-weight: 600;
  color: #666;
  text-align: right;
}

.text-box {
  margin-left: 50px;
  font-size: 1.6rem;
  color: #333;
  line-height: 40px;
}

.image-box {
  margin-left: 50px;
  width: 400px;
  height: 300px;
  overflow: hidden;
}

.image-box img {
  width: 400px;
  height: 300px;
  overflow: hidden;
  cursor: pointer;
}

.row-box2 {
  margin-top: 40px;
  text-align: center;
  padding-bottom: 20px;
}
</style>
