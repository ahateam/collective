<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24" >
                <span class="title-box" style="line-height: 40px">集体资产导入任务: {{info.name}}</span>
            </el-col>

        </el-row>
        <el-row class="row-box1" >
            <el-col :span="24">
                <p>
                    <span class="info-text">
                         任务数据总量：<span style="color: #f44;"> {{info.sum}} 条</span>；
                        已完成导入数据总量：<span style="color: #f44;"> {{info.success}} 条</span>；
                    </span>
                </p>
                <p>
                    <span class="info-text">
                            创建任务时间：<span style="color: #f44;">{{   new Date(info.createTime ).toLocaleDateString()+ ' '+new Date(info.createTime ).toLocaleTimeString('chinese',{hour12:false})}}</span>；
                    任务状态：<span v-if="info.status == 0" style="color: #468847">正在进行导入</span>
                    <span v-if="info.status == 1" style="color: #1483d8">已完成导入</span>
                    <span v-if="info.status == 2" style="color: #f44">等待导入</span>
                    ；错误数据条数：<span style="color: #f44;"> {{info.notCompletion}} 条</span>
                    </span>
                </p>
            </el-col>
            <el-row  style="margin: 15px 0">
                <el-col :span="24">
                    <span class="info-text" style="line-height: 30px;font-size: 16px;float: left;">写入进度：</span>
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="parseFloat(((info.success/info.sum)*100).toFixed(2))" style="line-height: 30px;float: left;width: 300px;margin-left: 20px; "></el-progress>
                </el-col>

            </el-row>
            <el-col :span="24" >
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                label="文件名"
                                :formatter="nameFilter">
                        </el-table-column>
                        <el-table-column
                                prop="lastModified"
                                label="上传时间"
                                :formatter="timerFilter">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button @click="downLoadBtn(scope.row)" type="text" size="small">下载</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <el-col :span="24" style="margin-top: 20px">
                    <div class="page-btn " style=" float: right; font-size: 16px;color: #666;">
                        <span class="page-text">当前页码：第 <span style="color: #f60;">{{page}}</span> 页</span>
                        <el-button type="primary" :disabled="page==1"   @click="changePage(page-1)">上一页</el-button>
                        <el-button type="primary" :disabled="pageOver ==true"  @click="changePage(page+1)">下一页</el-button>
                    </div>
                </el-col>
            </el-col>
        </el-row>



    </div>
</template>

<script>

    export default {
        name: "assetErrorData",
        data(){
            return{
                tableData:[],
                info:'',
                offset:0,
                count:10,
                page:1,
                pageOver:false,
            }
        },
        methods:{
            getNotcompletionRecord(cnt){
                this.$api.getNotcompletionRecord(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.tableData = []
                    }
                    console.log(this.tableData)
                    if(this.tableData.length <this.count){
                        this.pageOver = true
                    }
                })
            },
            changePage(page){
                this.page = page
                let cnt = {
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    importTaskId: this.info.id, // Long 导入任务id
                    count: this.count, // Integer
                    offset:(this.page-1)*this.count, // Integer
                }
                this.getNotcompletionRecord(cnt)
            }
        },
        mounted(){
            this.info = JSON.parse(localStorage.getItem('taskInfo'))
            console.log(this.info)
            let cnt = {
                orgId: localStorage.getItem('orgId'), // Long 组织编号
                importTaskId: this.info.id, // Long 导入任务id
                count: this.count, // Integer
                offset: this.offset, // Integer
            }
            this.getNotcompletionRecord(cnt)

            let cnt1 = {
                orgId: localStorage.getItem('orgId'), // Long 组织id
                userId: JSON.parse(localStorage.getItem('orgUser')).id, // Long 用户id
                importTaskId: this.info.id, // Long 导入任务id
            }
            this.$api.getAssetImportTask(cnt1,(res1)=>{
                if(res1.data.rc == this.$util.RC.SUCCESS){
                    this.info = this.$util.tryParseJson(res1.data.c)
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
    .info-text{
        font-size: 1.4rem;
        color: #666;

    }

    .box{
        background: #fff;
        padding: 15px;
    }
    .el-tree-node__content{
        width: 100%;
        height: 32px !important;
        line-height: 32px;
    }
    .custom-tree-node{
        width: 100%;
        line-height: 32px;
        height: 32px;
        margin: 10px 0;
    }
    .label-box{
        float: left;
        width: 150px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        font-weight: 600;
    }
    .icon-box{
        float: right;
        width: 50px ;
        height: 32px;
        z-index: 100;
        background: #fff;
    }

    .el-tree-node:focus>.el-tree-node__content{
        background:#00a0e9 !important;
        border-bottom: 1px solid #ddd;
    }

    .page-text{
        line-height: 4rem;
        margin-left: 2rem;
        margin-right: 2rem;
        font-size: 1.6rem;
        color: #555;
    }
    .page-btn{
        margin-top: 2rem;
        margin-bottom: 1rem;
        float: right;
        margin-right: 5rem;
    }
    .line-title{
        float: left;
        width: 5rem;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #666;

    }
    .line{
        width: 90%;
        height: 3rem;
        margin-top: 2rem;
        margin: 0 auto;
    }
    .line-box{
        width: auto;
        padding-top: 1.2rem;
        margin-left: 6rem;
    }
    .line-text{
        width: auto;
        height: 3rem;
        color:rgb(76, 174, 76);
        margin-left: 6rem;
        line-height: 3rem;
        font-size: 1.4rem;
    }


    .file-msg{
        width: 90%;
        margin: 0 auto;
        height: 2rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #f60;
        margin-bottom:1rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .fine-name{
        width: 90%;
        margin: 0 auto;
        margin-top: 2rem;
        font-size: 1.4rem;
        height: 2rem;
        line-height: 2rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }
    .upload-btn{
        margin-left: 5%;
        margin-top: 1rem;
    }
    .input-file-box{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5rem;
        opacity: 0;
    }

    .icon-text{
        display: block;
        float: left;
        width: 50%;
        height: 5rem;
        text-align: left;
        line-height: 5rem;
    }
    .file-box{
        margin: 0 auto;
        width: 90%;
        height: 5rem;
        border: 1px dashed #f4516c;
        position: relative;

    }
    .col-title-box{
        padding:15px;
    }
    .tab-btn{
        margin-left: 15px;
        line-height: 50px;
        padding: 5px 15px;
        border-radius: 5px;
        font-size: 1.4rem;
        border: 1px solid #409EFF;
        color: #409EFF;
        cursor: pointer;
        background: #fff;
    }
    .tab-btn-active{
        background:#409EFF;
        color: #fff;
    }
    .groups-box {
        width: 100%;
        line-height: 2rem;
        font-size: 1.6rem;
        color: #666;
    }
    .post-list{
        width: auto;
        height: 2rem;
        padding: 1rem;
        border-bottom: 1px solid #eee;
        line-height: 2rem;
        color: #333;
        font-size: 1.4rem;
        font-weight: 500;
    }
    .post-list:hover{
        background: rgb(236,245,255);
    }
    .post-list:active{
        color: #333;
        font-weight: 600;
    }
    .post-active{
        color: #333;
        font-weight: 600;
        background: rgb(236,245,255);
    }

</style>
