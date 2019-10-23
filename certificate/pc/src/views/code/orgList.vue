<template>
  <div class="box">
    <el-row class="row-box">
      <el-col :span="12">
        <el-input placeholder="请输入组织名称搜索" v-model="searchData" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchBtn()"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="row-box1">
      <template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="组织名称"></el-table-column>
          <el-table-column prop="code" label="组织编号"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="checkOrgBtn(scope.row)" type="text" size="small">选择</el-button>
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
      pageOver: false
    };
  },
  methods: {
    changePage(page) {
      this.page = page;
      let cnt = {};
      if (this.searchData) {
        cnt = {
          orgName: this.searchData,
          offset: (this.page - 1) * this.count,
          count: this.count
        };
      } else {
        cnt = {
          offset: (this.page - 1) * this.count,
          count: this.count
        };
      }
      this.getOrgList(cnt);
    },
    getOrgList(cnt) {
      this.$api.getORGList(cnt, res => {
        if (res.data.rc == this.$util.RC.SUCCESS) {
          this.tableData = this.$util.tryParseJson(res.data.c);
        } else {
          this.tableData = [];
        }
        console.log(this.tableData);
        if (this.tableData.length < this.count) {
          this.pageOver = true;
        } else {
          this.pageOver = false;
        }
      });
    },
    checkOrgBtn(row) {
      localStorage.setItem('orgInfo',JSON.stringify(row))
      this.$router.push('/familyList')
    },
    searchBtn() {
      this.page = 1;
      let cnt = {};
      if (this.searchData) {
        cnt = {
          orgName: this.searchData,
          offset: (this.page - 1) * this.count,
          count: this.count
        };
      } else {
        cnt = {
          offset: (this.page - 1) * this.count,
          count: this.count
        };
      }
      this.getOrgList(cnt);
    }
  },
  mounted() {
    if (localStorage.getItem("orgInfo")) {
      this.$router.push("/familyList");
    }
    let cnt = {
      offset: (this.page - 1) * this.count,
      count: this.count
    };
    this.getOrgList(cnt);
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding: 15px;
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