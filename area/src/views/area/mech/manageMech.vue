<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24">
                <router-link to="/areaAddMech">
                    <el-button type="primary" class="nav-btn">申请机构</el-button>
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
                            label="机构名称"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="组织机构代码">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="机构详细地址">
                    </el-table-column>
                    <el-table-column
                            prop="level"
                            label="机构具体层级"
                            :formatter="levelFliter">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button @click="info(scope.row,true)" type="text" size="small">详情</el-button>
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
        name: "mechanism",
        data() {
            return {
                tableData:[],
                page:1,
                pageOver:false,
                count:10,
                offset:0,
            }
        },
        methods:{
            //ajax请求封装层
            //用户管理员账号的机构列表
            getUserORGs(cnt){
                this.$area.getUserORGs(cnt,(res)=>{
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        let data = this.$util.tryParseJson(res.data.c)
                        this.tableData = data
                        console.log(this.tableData)
                    } else {
                        this.tableData = []
                    }

                    if(this.tableData.length <this.count){
                        this.pageOver =true
                    }else{
                        this.pageOver = false
                    }
                })
            },

            //数据过滤层
            levelFliter(col,row,value){
                let val = ''
                for(let i=0;i<this.$constData.orgLevel.length;i++){
                   if( this.$constData.orgLevel[i].key == value){
                        val = this.$constData.orgLevel[i].val
                   }
                }
                return val

            },

            //普通事件层
            //分页
            changePage(page){
                this.page =page
                let cnt = {
                    offset:(this.page-1)*this.count,
                    count:this.count,
                    level:this.$constData.orgLevel[2].key,
                    userId:localStorage.getItem('userId')
                }
                this.getUserORGs(cnt)
            },
            //详情跳转
            info(row,isMech){
			this.$store.state.nowPage = this.page
                let cnt={
                    orgId: row.id,
                }
                this.$area.getORGDistrict(cnt,(res)=>{
                    console.log(res)
                })

                this.$router.push({
                    path:'/areaMechInfo',
                    name:'areaMechInfo',
                    params:{info:row,isMech:isMech},
                })
            }
        },
        mounted(){
			this.page = this.$store.state.nowPage
            const loading = this.$loading({lock: true, text: '拼命加载中...', spinner: 'el-icon-loading'})
            let cnt = {
                offset:this.offset,
                count:this.count,
                level:this.$constData.orgLevel[2].key,
                userId:localStorage.getItem('userId')
            }
            this.getUserORGs(cnt)
            loading.close()
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
