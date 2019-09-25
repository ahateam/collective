<template>
  <div>
    <el-row class="row-box">
      <el-col :span="24">
        <div class="tab-box">
          <el-button type="primary" @click="addExport">选择组织导出数据</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row class="row-box1">
      <template v-if="tableData.length>0">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="机构名称" width="400"></el-table-column>
          <el-table-column prop="code" label="组织机构代码"></el-table-column>
          <el-table-column prop="address" label="机构具体层级"></el-table-column>
          <el-table-column prop="examine" label="申请状态" :formatter="statusFliter"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
              <el-button type="text" size="small" @click="editStatusBtn(scope.row)">修改审核</el-button>
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

    <el-dialog title="选择导出组织" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="搜索选择组织" label-width="100px">
          <el-select
            v-model="checkIndex"
            @change="checkItem()"
            filterable
            placeholder="请选择机构"
            style="width:70%"
          >
            <el-option
              v-for="(item,index) in orgList"
              :key="index"
              :label="item.name"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createExport">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "exportList",
  data() {
    return {
      tableData: [],
      page: 1,
      pageOver: false,
      dialogFormVisible: false,
      checkOrgInfo: "",
      checkIndex: 0,
      orgList: [],
      orgPage: 1,
      orgCount: 500
    };
  },
  methods: {
    getOrgs() {
      let cnt = {
        count: 500,
        offset: (this.orgPage - 1) * this.orgCount,
        superiorId: localStorage.getItem("orgId")
      };
      this.$area.getORGs(cnt, res => {
        console.log(res);
        let arr = [];
        console.log(res.data.rc == this.$util.RC.SUCCESS);
        if (res.data.rc == this.$util.RC.SUCCESS) {
          arr = this.$util.tryParseJson(res.data.c);
          console.log(arr);
        } else {
          arr = [];
        }

        this.orgList = this.orgList.concat(arr);
        console.log(this.orgList);
        if (arr.length == this.orgCount) {
          this.orgPage = this.orgPage + 1;
          this.getOrgs();
        }
      });
    },

    addExport() {
      this.dialogFormVisible = true;
    },
    checkItem() {
      this.checkOrgInfo = this.orgList[this.checkIndex];
    },

    createExport() {
      let cnt = {
          title: this.checkOrgInfo.name, // String 任务标题
          orgId: this.checkOrgInfo.id, // Long 组织编号
          userId: localStorage.getItem('userId') // Long 用户编号
        }
        this.$area.createExportTask(cnt,(res)=>{
          console.log(res)
        })
    }

  },
  mounted() {
    this.getOrgs();
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
</style>
