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
                                prop="title"
                                label="任务标题">
                        </el-table-column>
                        <el-table-column
                                prop="num"
                                label="总数据量">
                        </el-table-column>
                        <el-table-column
                                prop="time"
                                label="创建时间"
                               >
                        </el-table-column>
                        <el-table-column
                                prop="march"
                                label="导入进度"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="任务状态"
                        >
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button @click="infoBtn(scope.row)" type="text" size="small">导入数据表</el-button>
                                <el-button @click="setBtn(scope.row)" type="text" size="small">查看任务报告</el-button>
                                <!--<el-button type="text" size="small">编辑</el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>

        </el-row>

        <el-dialog title="新建导入任务" :visible.sync="addImportShow">
            <el-form >
                <el-form-item label="导入任务标题" label-width="120px">
                    <el-input v-model="title" autocomplete="off"></el-input>
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
                title:'',
                tableData:[
                    {id:'111',title:'奥术大师',num:'1111',time:'2019-05-07',march:'85%',status:'正在导入'},
                ]
            }
        },
        methods:{
            addImportBtn(){
                console.log(this.title)
            },
            infoBtn(item){
                this.$router.push({
                    path:'/assetImportInfo',
                    name:'assetImportInfo',
                    params:{
                        info:item
                    }
                })
            }
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
