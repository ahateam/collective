<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24" >
                <span class="title-box" style="line-height: 40px">集体资产导入任务</span>
            </el-col>

        </el-row>
        <el-row class="row-box1" >
            <el-col :span="24" >
                <el-button type="primary" @click="addImportShow = true">新建导入任务</el-button>
            </el-col>

            <el-col :span="24" style="margin-top: 15px">
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                label="任务标题">
                        </el-table-column>
                        <el-table-column
                                prop="sum"
                                label="总数据量">
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                label="创建时间"
                                :formatter="timeFilter">
                        </el-table-column>
                        <el-table-column
                                label="导入进度"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.sum == 0">0</span>
                                <span v-else>
                                    {{((scope.row.success /scope.row.sum)*100).toFixed(2)}}%
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="任务状态"
                                :formatter="statusFilter"
                        >
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button @click="infoBtn(scope.row)" type="text" size="small" v-if="scope.row.status == '2'">导入数据表</el-button>
                                <el-button @click="infoResBtn(scope.row)" type="text" size="small" v-if="scope.row.status != '2' ">查看任务报告</el-button>
                                <el-button @click="infoErrorBtn(scope.row)" type="text" size="small" v-if="scope.row.status == '1' "><span style="color: #f44;">查看失败数据</span></el-button>
                                <!--<el-button type="text" size="small">编辑</el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <p>
                    当前第 {{page}} 页
                    <el-button type="primary" size="mini"  :disabled="page==1"  @click="changePage(page-1)">上一页</el-button>
                    <el-button type="primary" size="mini" :disabled="pageOver ==true"  @click="changePage(page+1)">下一页</el-button>
                </p>
            </el-col>

        </el-row>

        <el-dialog title="新建导入任务" :visible.sync="addImportShow">
            <el-form >
                <el-form-item label="导入任务标题" label-width="120px">
                    <el-input v-model="name" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addImportShow = false">取 消</el-button>
                <el-button type="primary" @click="addImportBtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "assetImport",
        data(){
            return{
                addImportShow:false,
                name:'',
                tableData:[],
                offset:0,
                count:10,
                page:1,
                pageOver:false,
                mechInfo:{},
            }
        },
        methods:{
            getAssetImportTasks(cnt){
                this.$api.getAssetImportTasks(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.tableData = []
                    }
                    if(this.tableData.length < this.count){
                        this.pageOver =true
                    }else{
                        this.pageOver =false
                    }
                })
            },
            //过滤层
            timeFilter(row,col,val){
                let timer = new Date(val)
                return timer.toLocaleDateString()+ ' '+timer.toLocaleTimeString('chinese',{hour12:false})
            },
            statusFilter(row,col,val){
                if(val == '0'){
                    return '正在导入'
                }else if(val == '1'){
                    return '导入完成'
                }else {
                    return '等待导入'
                }
            },


            //查看进度报告
            infoResBtn(info){
                localStorage.setItem('taskInfo',JSON.stringify(info))
                this.$router.push('/assetImportRes')
            },
            //查看失败的数据
            infoErrorBtn(info){
                localStorage.setItem('taskInfo',JSON.stringify(info))
                this.$router.push('/assetErrorData')
            },

            //分页
            changePage(page){
                this.page = page
                let cnt = {
                    orgId:localStorage.getItem('orgId'),
                    userId:JSON.parse(localStorage.getItem('orgUser')).id,
                    offset:(this.page-1)*this.count,
                    count:this.count
                }
                this.getAssetImportTasks(cnt)
            },

            addImportBtn(){
                console.log(this.name)
                let cnt = {
                    orgId:localStorage.getItem('orgId'),
                    userId:JSON.parse(localStorage.getItem('orgUser')).id,
                    name:this.name
                }
                this.$api.createAssetImportTask(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('创建任务成功')
                    }else{
                        this.$message.error('创建任务失败')
                    }
                    this.$router.push('/page')
                })
            },
            infoBtn(info){
                localStorage.setItem('taskInfo',JSON.stringify(info))
                console.log(localStorage.getItem('taskInfo'))
                this.$router.push('/assetImportInfo')
            }
        },
        mounted(){
            let a = this.$route.params.info
            this.mechInfo = a
            localStorage.setItem('taskInfo','')
            const loading = this.$loading({lock: true, text: '拼命加载中...', spinner: 'el-icon-loading'})
            let cnt = {
                orgId:a.orgId,
                userId:JSON.parse(localStorage.getItem('orgUser')).id,
                offset:this.offset,
                count:this.count
            }
            this.getAssetImportTasks(cnt)
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
        border-left: 4px solid #63a35c;
    }
    .row-box1{
        margin-top: 20px;
        padding: 15px;
        background: #fff;

    }
    .title-box{
        font-size: 16px;
        line-height: 30px;
        padding: 0 15px;

    }
    .content-box{
        margin-top: 10px;
    }
</style>
