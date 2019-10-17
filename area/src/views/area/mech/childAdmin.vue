<template>
  <div>
    <el-row class="row-box">
      <el-col :span="24">
        <div class="tab-box">
          <router-link to="/addChild">
            <el-button type="primary" class="nav-btn">新增下级机构</el-button>
          </router-link>
        </div>
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
      <template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="机构名称"></el-table-column>
          <el-table-column prop="code" label="组织机构代码"></el-table-column>
          <el-table-column prop="address" label="机构具体层级"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="open(scope.row)" type="text" size="small" style="color: #f44">删除</el-button>
              <el-button type="primary" size="mini" @click="showMemberList(scope.row)">查看成员</el-button>
              <el-button type="primary" size="mini" @click="memberImport(scope.row)">导入成员</el-button>
              <el-button type="primary" size="mini" @click="assetImport(scope.row)">导入资产</el-button>
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

<script>
export default {
  name: "childAdmin",
  data() {
    return {
      tableData: [],
      page: 1,
      pageOver: false,

      count: 10,
      offset: 0,

      isActive: 1,
      infoShow: false,
      info: "",
      examine: "",
      examineList: [
        { key: 0, val: "正在申请" },
        { key: 3, val: "再次申请" },
        { key: 1, val: "申请通过" },
        { key: 2, val: "申请失败" }
      ],
      statusShow: false,

      addressMech: "",
      searchData: ""
    };
  },
  methods: {
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
          superiorId: localStorage.getItem("orgId"),
          count: this.count, // Integer
          offset: (this.page - 1) * this.count // Integer
        };
        this.getORGs(cnt);
      }
    },
    open(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delSubOrg(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delSubOrg(row) {
      let cnt = {
        orgId: row.id // Long 组织id
      };
      this.$area.delSubOrg(cnt, res => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        let cnt = {
          superiorId: localStorage.getItem("orgId"),
          count: that.count,
          offset: that.offset
        };
        this.getORGs(cnt);
      });
    },
    getORGs(cnt) {
      this.$area.getORGs(cnt, res => {
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

    //详情
    infoBtn(row) {
      this.$router.push({
        path: "/childInfo",
        name: "childInfo",
        params: { info: row }
      });
      console.log(row);
    },

    //导入成员
    memberImport(row) {
      this.$router.push({
        path: "/memberImport",
        name: "memberImport",
        params: { info: row }
      });
    },
    //导入资产
    assetImport(row) {
      this.$router.push({
        path: "/assetImport",
        name: "assetImport",
        params: { info: row }
      });
    },
    /** 跳转下级机构成员列表页*/
    showMemberList(row) {
      this.$router.push({
        path: "/areaChildMemberList",
        name: "areaChildMemberList",
        params: {
          info: row
        }
      });
    },
    //搜索下级机构列表
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
      if (this.searchData == "") {
        let cnt = {
          superiorId: localStorage.getItem("orgId"),
          count: this.count,
          offset: (this.page - 1) * this.count
        };
        this.getORGs(cnt);
      } else {
        let cnt = {
          districtId: localStorage.getItem("orgId"), // Long 区级编号
          ORGName: this.searchData, // String 下属机构名称
          count: this.count, // Integer
          offset: (this.page - 1) * this.count // Integer
        };
        this.getSearchData(cnt);
      }
    }
  },
  mounted() {
    let cnt = {
      superiorId: localStorage.getItem("orgId"),
      count: this.count,
      offset: this.offset
    };
    this.getORGs(cnt);
  }
};
</script>

<style scoped lang="scss">
.nav-btn {
  float: left;
  margin-left: 15px;
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
.tab-box {
  width: auto;
  margin-left: 20px;
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
  width: 200px;
  height: 150px;
  overflow: hidden;
}

.image-box img {
  width: 200px;
  height: 150px;
  overflow: hidden;
  cursor: pointer;
}
.row-search{
    padding: 10px 0
}
</style>
