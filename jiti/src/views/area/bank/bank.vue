<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24">
                <router-link to="/areaAddBank">
                    <el-button type="primary" class="nav-btn">创建银行</el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-row class="row-box1" >
            <template>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="银行名称">
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="金融组织机构代码">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="机构详细地址">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <!--<el-button @click="info(scope.row,true)" type="text" size="small">详情</el-button>-->
                            <el-button @click="setAdmin(scope.row)" type="text" size="small">设置管理员</el-button>
                            <!--<el-button @click="infoMoney(scope.row)" type="text" size="small">机构资金</el-button>-->
                            <!--<el-button @click="del(scope.row)" type="text" size="small" style="color: #f44">删除</el-button>-->
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

    </div>

</template>

<script>
    export default {
        name: "bank",
        data(){
            return{
                tableData:[],
                page:1,
                pageOver:false,
                offset:0,
                count:10,
            }
        },
        methods:{
            changePage(page){
                this.page = page
                let cnt={
                    districtId: localStorage.getItem('orgId'), // Long 区级机构id
                    count: this.count, // Integer
                    offset: (this.page-1)*this.count, // Integer
                }
                this.$area.getBankList(cnt,(res)=>{
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
            setAdmin(info){
                this.$router.push({
                    path:'/areaSetAdminBank',
                    name:'areaSetAdminBank',
                    params:{
                        info:info
                    }
                })
            }

        },
        mounted(){
            let cnt={
                districtId: localStorage.getItem('orgId'), // Long 区级机构id
                count: this.count, // Integer
                offset: this.offset, // Integer
            }
            this.$area.getBankList(cnt,(res)=>{
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
</style>
