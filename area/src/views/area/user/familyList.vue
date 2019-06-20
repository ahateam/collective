<template>
    <div>
        <el-row class="row-box">
            <el-col :span="20" style="margin: 10px 0">


                    <el-form label-width="150px">
                        <el-form-item label="选择合作社机构">

                            <el-select v-model="org"
                                       filterable
                                       placeholder="至少选择一个合作社"
                                       style="margin-left: 20px; width: 100%;"
                                       @change="changeOrg">
                                <el-option
                                        v-for="item in orgList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>

                        </el-form-item>
                        <el-form-item label="家庭户列表">

                            <el-input placeholder="请输入搜索的内容" v-model="searchData" class="input-with-select">
                                <el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width: 120px">
                                    <el-option label="户主姓名" value="1"></el-option>
                                    <el-option label="户序号" value="2"></el-option>
                                    <el-option label="股权证号" value="3"></el-option>
                                </el-select>
                                <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                            </el-input>

                        </el-form-item>
                    </el-form>
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-row>
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="familyNumber"
                                label="户序号">
                        </el-table-column>
                        <el-table-column
                                prop="shareCerNo"
                                label="股权证编号">
                        </el-table-column>
                        <el-table-column
                                prop="familyMaster"
                                label="户主姓名">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <el-button @click="separateBtn(scope.row)" type="text" size="small">选择家庭户</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <p>
                    当前第 {{page}} 页
                    <el-button type="primary" size="mini" :disabled="page==1" @click="changePage(page-1)">上一页
                    </el-button>
                    <el-button type="primary" size="mini" :disabled="pageOver ==true" @click="changePage(page+1)">下一页
                    </el-button>
                </p>

            </el-row>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "familyList",
        data(){
            return{
                orgList:[],
                org:'',

                searchData:'',
                searchType:'1',
                page:1,
                pageOver:true,
                tableData:[],
                offset:0,
                count:10,


            }
        },
        methods:{
            //户主搜索列表
            getFamilyByFamilyMaster(cnt) {
                this.$area.getFamilyByFamilyMaster(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.tableData = []
                    }
                    if (this.tableData.length < this.count) {
                        this.pageOver = true
                    } else {
                        this.pageOver = false
                    }
                })
            },
            //户编号搜索
            getFamilyByFamilyNumber(cnt) {
                this.$area.getFamilyByFamilyNumber(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.tableData = []
                    }
                    if (this.tableData.length < this.count) {
                        this.pageOver = true
                    } else {
                        this.pageOver = false
                    }
                })
            },
            //股权证号搜索
            getFamilyByshare(cnt) {
                this.$area.getFamilyByshare(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.tableData = []
                    }
                    if (this.tableData.length < this.count) {
                        this.pageOver = true
                    } else {
                        this.pageOver = false
                    }
                })
            },


            getFamilyAll(cnt) {
                this.$area.getFamilyAll(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.tableData = []
                    }
                    if (this.tableData.length < this.count) {
                        this.pageOver = true
                    } else {
                        this.pageOver = false
                    }
                    console.log(this.tableData)
                })
            },

            changePage(page){
                this.page = page
                if (this.searchData.length == 0) {
                    let cnt = {
                        orgId: localStorage.getItem('orgId'),
                        count: this.count, // Integer <选填> 查询数
                        offset: (this.page - 1) * this.count, // Integer <选填> 开始位置
                    }
                    this.getFamilyAll(cnt)
                } else {
                    let cnt = {
                        orgId: localStorage.getItem('orgId'),
                        content: this.searchData,
                        count: this.count, // Integer <选填> 查询数
                        offset: (this.page - 1) * this.count, // Integer <选填> 开始位置
                    }
                    if (this.searchType == '1') { //户主姓名
                        this.getFamilyByFamilyMaster(cnt)
                    } else if (this.searchType == '2') { //户序号
                        this.getFamilyByFamilyNumber(cnt)
                    } else if (this.searchType == '3') {  //股权证号
                        this.getFamilyByshare(cnt)
                    }
                }
            },
            changeOrg(val){
                this.page = 1
                this.pageOver = true
                let cnt = {
                    orgId: val,
                    count: this.count, // Integer <选填> 查询数
                    offset: this.offset, // Integer <选填> 开始位置
                }
                this.getFamilyAll(cnt)
            },

            searchBtn(){
              if(this.org == ''){
                  this.$message.error('请先选择一个合作社机构')
              }else{
                  if (this.searchData.length == 0) {
                      this.page = 1
                      let cnt = {
                          orgId: localStorage.getItem('orgId'),
                          count: this.count, // Integer <选填> 查询数
                          offset: this.offset, // Integer <选填> 开始位置
                      }
                      this.getFamilyAll(cnt)
                  } else {
                      this.page = 1
                      this.pageOver = false
                      let cnt = {
                          orgId: localStorage.getItem('orgId'),
                          content: this.searchData,
                          count: this.count,
                          offset: this.offset
                      }
                      if (this.searchType == '1') { //户主姓名
                          this.getFamilyByFamilyMaster(cnt)
                      } else if (this.searchType == '2') { //户序号
                          this.getFamilyByFamilyNumber(cnt)
                      } else if (this.searchType == '3') {  //股权证号
                          this.getFamilyByshare(cnt)
                      }
                  }
              }
            },
            //选中分户 跳转页面
            separateBtn(row){
                let info = {org:this.org,user:row}
                localStorage.setItem('print','')
                localStorage.setItem('print',JSON.stringify(info))
                this.$router.push('/areaPrintView')
            }
        },
        mounted(){


            let cnt ={
                superiorId: localStorage.getItem('orgId'),
                count: 500, // Integer
                offset: 0, // Integer
            }
            this.$area.getORGs(cnt, (res)=> {
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.orgList = this.$util.tryParseJson(res.data.c)
                }else{
                    this.orgList = []
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .row-box{
        background: #fff;
        padding:15px 0;
    }
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

    .el-select .el-input {
        width: 130px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>
