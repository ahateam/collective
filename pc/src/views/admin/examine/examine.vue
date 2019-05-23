<template>
    <div>
        <el-row class="row-box1" >
            <el-row>
                <el-col :span="12">
                    <span style="font-size: 1.6rem;color: #666;">历史审批记录</span>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="familyNumber"
                                label="审批编号">
                        </el-table-column>
                        <el-table-column
                                prop="shareCerNo"
                                label="审批类型">
                        </el-table-column>
                        <el-table-column
                                prop="familyMaster"
                                label="审批状态">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <el-button @click="separateBtn(scope.row)" type="text" size="small">分户操作</el-button>
                            </template>
                        </el-table-column>

                    </el-table>
                </template>
                <p>
                    当前第 {{page}} 页
                    <el-button type="primary" size="mini"  :disabled="page==1"  @click="changePage(page-1)">上一页</el-button>
                    <el-button type="primary" size="mini" :disabled="pageOver ==true"  @click="changePage(page+1)">下一页</el-button>
                </p>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "examineSeparateList",
        data(){
            return{
                tableData:[],
                offset:0,
                count:10,
                page:1,
                pageOver:false,

            }
        },
        methods:{
            getExamine(cnt){
              this.$api.getExamine(cnt,(res)=>{
                  if(res.data.rc == this.$util.RC.SUCCESS){
                      this.tableData = this.$util.tryParseJson(res.data.c)
                  }else{
                      this.tableData = []
                  }
                  if(this.tableData.length <this.count){
                      this.pageOver = true
                  }else{
                      this.pageOver = false
                  }
              })
            },

            //分页
            changePage(page){


            },
        },
        mounted(){
            // let cnt={
            //     orgId: localStorage.getItem('orgId'),
            //     count: this.count, // Integer <选填> 查询数
            //     offset: this.offset, // Integer <选填> 开始位置
            // }
            // this.getExamine(cnt)
        }
    }
</script>

<style scoped lang="scss">
    .nav-btn{
        float: left;
        margin-left: 15px;
    }
    .row-box{
        background: #fff;
        padding:15px 0;
    }
    .row-box1{
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
