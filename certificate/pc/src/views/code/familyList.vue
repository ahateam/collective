<template>
  <div class="box">
    <el-row class="row-box" :gutter="50">
      <el-col :span="12">
        <el-input placeholder="请输入户主姓名搜索" v-model="searchData" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchBtn()"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="chooseOrgBtn">重新选择组织</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input v-model="start" placeholder="请输入起点户序号"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="end" placeholder="请输入结束户序号"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="primary">选中并批量生成</el-button>
        <el-button type="danger">全选并批量生成</el-button>
      </el-col>
    </el-row>
    <el-row class="row-box1">
      <template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="familyNumber" label="户序号"></el-table-column>
          <el-table-column prop="realName" label="户主姓名"></el-table-column>
          <el-table-column prop="idNumber" label="户主身份证"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="checkFamilyBtn(scope.row)" type="text" size="small">单户证书生成</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <p>
        当前第 {{page}} 页
        <el-button type="primary" size="mini" :disabled="page==1" @click="changePage(page-1)">上一页</el-button>
        <el-button
          type="primary"
          size="mini"
          :disabled="pageOver ==true"
          @click="changePage(page+1)"
        >下一页</el-button>
      </p>
    </el-row>
  </div>
</template>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "orgList",
  data() {
    return {
      searchData: "",
      tableData: [],
      page: 1,
      count: 10,
      pageOver: false,
      orgInfo: "",

      start: "",
      end: ""
    };
  },
  methods: {
    chooseOrgBtn(){
        localStorage.setItem('orgInfo','')
        localStorage.setItem('familyInfo','')

        this.$router.push('/orgList')
    },
    changePage(page) {
      this.page = page;
      let cnt = {};
      if (this.searchData) {
        cnt = {
          orgId: this.orgInfo.id,
          orgName: this.searchData,
          offset: (this.page - 1) * this.count,
          count: this.count
        };
      } else {
        cnt = {
          orgId: this.orgInfo.id,
          offset: (this.page - 1) * this.count,
          count: this.count
        };
      }
      this.getFamilyList(cnt);
    },
    getFamilyList(cnt) {
      this.$api.getFamilyMasterList(cnt, res => {
        if (res.data.rc == this.$util.RC.SUCCESS) {
          this.tableData = this.$util.tryParseJson(res.data.c).familyMaster;
        } else {
          this.tableData = [];
        }
        console.log('222')
        console.log(this.tableData);
        if (this.tableData.length < this.count) {
          this.pageOver = true;
        } else {
          this.pageOver = false;
        }
      });
    },
    checkFamilyBtn(row) {
        localStorage.setItem('familyInfo',JSON.stringify(row))
        this.$router.push('/createCode')
    },
    searchBtn() {
      this.page = 1;
      let cnt = {};
      if (this.searchData) {
        cnt = {
          orgId: this.orgInfo.id,
          getFamilyMasterList: this.searchData,
          offset: (this.page - 1) * this.count,
          count: this.count
        };
      } else {
        cnt = {
          orgId: this.orgInfo.id,
          offset: (this.page - 1) * this.count,
          count: this.count
        };
      }
      this.getFamilyList(cnt);
    }
  },
  created() {
    if (!localStorage.getItem("orgInfo")) {
      this.$router.push("/orgList");
    }
  },
  mounted() {
    this.orgInfo = JSON.parse(localStorage.getItem("orgInfo"));
    console.log(this.orgInfo);
    let cnt = {
      orgId: this.orgInfo.id,
      offset: (this.page - 1) * this.count,
      count: this.count
    };
    this.getFamilyList(cnt);
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding: 15px;
  overflow: hidden;
}
.row-box {
  background: #fff;
  padding: 15px 0;
}

.row-box1 {
  margin-top: 20px;
  padding: 15px;
  background: #fff;
}
</style>