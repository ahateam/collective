<template>
  <div>
    <el-row class="row-box">上级组织机构信息</el-row>
    <el-row class="row-box1">
      <div class="title-box">上级组织名称：</div>
      <div class="text-box">{{superiorORG.name}}</div>
      <div class="clear-box"></div>
      <div class="title-box">上级组织机构代码：</div>
      <div class="text-box">{{superiorORG.code}}</div>
      <div class="clear-box"></div>
      <div class="title-box">上级组织机构地址：</div>
      <div class="text-box">{{superiorORG.address}}</div>
      <div class="clear-box"></div>

      <el-row class="row-box2">
        <el-button type="primary" @click="getOrgList">申请更换组织</el-button>
      </el-row>
    </el-row>

    <el-dialog title="选择上级" :visible.sync="showModel">
      <el-form style="padding-bottom:80px">
        <el-form-item label="搜索选择上级" label-width="100px">
          <el-select v-model="Superior" placeholder="请输入上级机构名称快速搜索" filterable style="width:80%">
            <el-option
              v-for="(item,index) in superiorORGList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showModel = false">取 消</el-button>
        <el-button type="primary" @click="setSuperiorBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "editSuperiorOrg",
  data() {
    return {
      superiorORG: "",
      showModel: false,
      superiorORGList: [],
      Superior: "",
      address:'',
      info:''
    };
  },
  methods: {
    //获取上级信息
    getSuperiorORG() {
      let cnt = {
        orgId: localStorage.getItem("orgId")
      };
      this.$api.getSuperiorORG(cnt, res => {
        if (res.data.rc == this.$util.RC.SUCCESS) {
          this.superiorORG = this.$util.tryParseJson(res.data.c);
        } else {
          this.superiorORG = "";
        }
        console.log(this.superiorORG);
      });
    },
    getOrgList() {
      let cnt = {
        level: 4, // Byte 组织编号
        count: 500, // Integer
        offset: 0 // Integ
      };
      this.$api.getSuperiorORGs(cnt, res => {
        if (res.data.rc == this.$util.RC.SUCCESS) {
          this.superiorORGList = this.$util.tryParseJson(res.data.c);
        } else {
          this.superiorORGList = [];
        }
      });
      this.showModel = true;
    },
    setSuperior() {
      console.log(this.info);
      console.log("22222");
      let cnt = {
        userId: localStorage.getItem("userId"),
        name: this.info.name,
        code: this.info.code,
        province: this.address.province.id,
        city: this.address.city.id,
        district: this.address.district.id,
        address: this.info.address,
        imgOrg: this.info.imgOrg,
        imgAuth: this.info.imgAuth,
        shareAmount: this.info.shareAmount,
        level: this.info.level,
        superiorId: this.info.superiorId,
        resourceShares: this.info.resourceShares,
        assetShares: this.info.assetShares,
        superiorId:this.Superior,
        updateDistrict: true
      };

      this.$api.createORGApply(cnt, res => {
        if (res.data.rc == this.$util.RC.SUCCESS) {
          this.$message({
            showClose: true,
            message: "申请成功，等待审核",
            type: "success"
          });
          this.$router.push("/applyMech");
        } else {
          this.$message({
            showClose: true,
            message: "申请失败",
            type: "error"
          });
        }
      });
    },
    setSuperiorBtn() {
      if (this.superiorORG) {
        this.$confirm("确认重新选择并申请更改上级机构")
          .then(_ => {
            this.setSuperior();
          })
          .catch(_ => {});
      }
    }
  },
  mounted() {
    this.info = JSON.parse(localStorage.getItem("orgInfo"));
    let cnt = {
      orgId: this.info.id // Long 组织id
    }
    this.$api.getORGDistrict(cnt,(res)=>{
      if(res.data.rc == this.$util.RC.SUCCESS){
          this.address = this.$util.tryParseJson(res.data.c)
      }
      console.log(this.address)
    })

    this.getSuperiorORG();
  }
};
</script>

<style lang="scss" scoped>
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
  min-width: 150px;
  float: left;
  color: #666;
  font-size: 1.6rem;
  line-height: 4rem;
}
.text-box {
  float: left;
  float: left;
  color: #333;
  font-size: 1.8rem;
  line-height: 4rem;
}
.row-box2 {
  text-align: center;
  height: 50px;
  line-height: 50px;
  padding: 40px 0;
}
</style>