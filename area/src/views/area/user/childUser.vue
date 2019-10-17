<template>
  <div>
    <el-row class="row-box">
      <el-col :span="24">
        <div class="title-text">下级机构列表—选择机构</div>
      </el-col>
    </el-row>

    <el-row class="row-box1">
      <el-row class="row-search">
        <el-col :span="12">
          <el-input placeholder="请输入组织名称查询" v-model="searchData">
            <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
          <template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="机构名称"></el-table-column>
          <el-table-column prop="code" label="组织机构代码"></el-table-column>
          <el-table-column prop="address" label="机构具体层级"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="set(scope.row)" type="text" size="mini">设置管理员</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      </el-row>
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

<script>
export default {
  name: "childUser",
  data() {
    return {
      page: 1,
      pageOver: false,
      tableData: [],
      offset: 0,
      count: 10,
      searchData: ""
    };
  },
  methods: {
    getORGs(cnt) {
      this.$area.getORGs(cnt, res => {
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
    changePage(page) {
      this.page = page;
      if (this.searchData) {
        let cnt = {
          districtId: localStorage.getItem("orgId"), // Long 区级编号
          ORGName: this.searchData, // String 下属机构名称
          count: this.count, // Integer
          offset: (this.page - 1) * this.count // Integer
        };
        this.getSearchData(cnt);
      } else {
        let cnt = {
          superiorId: localStorage.getItem("orgId"), // Long 上级编号
          count: this.count, // Integer
          offset: (this.page - 1) * this.count // Integer
        };
        this.getORGs(cnt);
      }
    },
    set(info) {
      this.$router.push({
        path: "/areaSetChildUser",
        name: "areaSetChildUser",
        params: {
          info: info
        }
      });
    },
    //搜索区级下的组织列表
    getSearchData(cnt) {
      this.$area.getSubORGByLikeORGName(cnt, res => {
        if (res.data.rc == this.$util.RC.SUCCESS) {
          this.tableData = this.$util.tryParseJson(res.data.c);
        } else {
          this.tableData = [];
        }
        if (this.tableData.length < this.count) {
          this.pageOver = true;
        } else {
          this.pageOver = false;
        }
      });
    },
    searchBtn() {
      this.page = 1;
      if (this.searchData) {
        let cnt = {
          districtId: localStorage.getItem("orgId"), // Long 区级编号
          ORGName: this.searchData, // String 下属机构名称
          count: this.count, // Integer
          offset: (this.page - 1) * this.count // Integer
        };
        this.getSearchData(cnt);
      } else {
        let cnt = {
          superiorId: localStorage.getItem("orgId"), // Long 上级编号
          count: this.count, // Integer
          offset: (this.page - 1) * this.count // Integer
        };
        this.getORGs(cnt);
      }
    }
  },
  mounted() {
    let cnt = {
      superiorId: localStorage.getItem("orgId"), // Long 上级编号
      count: this.count, // Integer
      offset: this.offset // Integer
    };
    this.getORGs(cnt);
  }
};
</script>

<style scoped lang="scss">
.search-box {
  width: auto;
  margin: 10px;
  /*!*border-radius: 5px;*!*/
  /*border-bottom: 1px solid #409eff;*/
  padding: 10px;
}
.nav-btn {
  float: left;
  margin-left: 15px;
}
.row-box {
  background: #fff;
}
.row-box1 {
  margin-top: 20px;
  padding: 15px 15px 70px 15px;
  
  background: #fff;
}
.tab-box {
  width: auto;
  margin-left: 20px;
}
.title-text {
  width: auto;
  padding: 0 15px;
  border-left: 4px solid rgb(99, 163, 92);
  font-size: 1.6rem;
  line-height: 5rem;
}
.title {
  width: auto;
  overflow: hidden;
  font-size: 1.6rem;
  color: #333;
  line-height: 4rem;
  text-align: right;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.row-search{
    padding-bottom: 15px;
}
</style>
