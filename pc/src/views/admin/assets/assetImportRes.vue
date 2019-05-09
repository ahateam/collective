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
                         任务数据总量：<span style="color: #f44;"> {{sum}} 条</span>；
                        已完成导入数据总量：<span style="color: #f44;"> {{success}} 条</span>；
                    </span>
                </p>
                <p>
                    <span class="info-text">
                            创建任务时间：<span style="color: #f44;">{{   new Date(info.createTime ).toLocaleDateString()+ ' '+new Date(info.createTime ).toLocaleTimeString('chinese',{hour12:false})}}</span>；
                    任务状态：<span v-if="status == 0" style="color: #468847">正在进行导入</span>
                    <span v-if="status == 1" style="color: #1483d8">已完成导入</span>
                    <span v-if="status == 2" style="color: #f44">等待导入</span>
                    ；错误数据条数：<span style="color: #f44;"> {{errorData}} 条</span>
                    </span>
                </p>
            </el-col>
            <el-row  style="margin: 15px 0">
                <el-col :span="24">
                    <span class="info-text" style="line-height: 30px;font-size: 16px;float: left;">写入进度：</span>
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="propressData"  style="line-height: 30px;float: left;width: 300px;margin-left: 20px; "></el-progress>
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

            </el-col>
            <el-col :span="24" style="margin: 15px 0">
                <el-button type="primary" style="float: right" @click="assetErrorBtn" v-if="status ==1"> 查看错误数据报告</el-button>
            </el-col>
        </el-row>



    </div>
</template>

<script>
    import ossAuth from '@/assets/api/oss/ossAuth'
    let client = ossAuth.client
    export default {
        name: "assetImportInfo",
        data(){
            return{
                tableData:[],

                loadData:false,
                address:'',     //导入地址

                success:0,
                sum:0,

                propressData:0,
                isOver:false,
                errorData:0,
                info:'',
                timer:'',
                status:2,
            }
        },
        methods:{

            //异步方法-请求该组织下的该任务下的excl列表
            async list () {
                try{
                    let result = await client.list({
                        prefix: this.address,
                    });
                    if(result.objects == undefined || result.objects.length ==0){
                        this.tableData = []
                    }else{
                        this.tableData = result.objects
                    }
                } catch (e) {
                    console.log(e);
                }
            },

            //过滤层
            nameFilter(row,col,val){
                let name = val.replace(this.address, '')
                name = name.slice(13)
                name = decodeURIComponent(name)
                return name
            },
            timerFilter(row,col,val){
                let timer = new Date(val).toLocaleDateString()+ ' '+new Date(val).toLocaleTimeString('chinese',{hour12:false})
                return timer
            },

            //查看报错的数据列表
            assetErrorBtn(){
                this.$router.push('/assetErrorData')
            },
            //反复调用获取进度条
            getPropressData(){
                if(this.status != 1 ){
                        let cnt = {
                            orgId: localStorage.getItem('orgId'), // Long 组织id
                            userId:  JSON.parse(localStorage.getItem('orgUser')).id, // Long 用户id
                            importTaskId: this.info.id, // Long 导入任务id
                        }
                        this.$api.getAssetImportTask(cnt,(res)=>{
                            this.sum = this.$util.tryParseJson(res.data.c).sum
                            this.success = this.$util.tryParseJson(res.data.c).success
                            this.errorData =  this.$util.tryParseJson(res.data.c).notCompletion
                            this.status = this.$util.tryParseJson(res.data.c).status
                            this.propressData = parseFloat(((this.success/this.sum)*100).toFixed(2))
                        })
                }else{
                    clearInterval(this.timer)
                    let cnt = {
                        orgId: localStorage.getItem('orgId'), // Long 组织id
                        userId:  JSON.parse(localStorage.getItem('orgUser')).id, // Long 用户id
                        importTaskId: this.info.id, // Long 导入任务id
                    }
                    this.$api.getAssetImportTask(cnt,(res)=>{
                        this.sum = this.$util.tryParseJson(res.data.c).sum
                        this.success = this.$util.tryParseJson(res.data.c).success
                        this.errorData =  this.$util.tryParseJson(res.data.c).notCompletion
                        this.status = this.$util.tryParseJson(res.data.c).status
                        this.propressData = parseFloat(((this.success/this.sum)*100).toFixed(2))
                        localStorage.setItem('taskInfo',res.data.c)
                    })
                }
            },

            //执行批量导入
            importBtn(){
                let arr = []
                for(let i = 0;i<this.tableData.length;i++){
                    arr.push(this.tableData[i].url)
                }
                console.log(arr);
            },
            //下载文件
            downLoadBtn(info){
                window.location.href = info.url
            },




        },
        mounted(){
            this.orgName = localStorage.getItem('orgName')
            let orgId = localStorage.getItem('orgId')
            this.info = JSON.parse(localStorage.getItem('taskInfo'))


            if(this.info.id == undefined || this.info.id ==  ''){
                this.$message.error('信息失效')
                this.$router.push('/assetImport')
            }

            this.sum = this.info.sum
            this.address = 'asset/'+orgId+'/'+  this.info.id+'/'
            this.list()

            let cnt = {
                orgId: orgId, // Long 组织编号
                userId: JSON.parse(localStorage.getItem('orgUser')).id,
                importTaskId: this.info.id, // Long 导入任务id
            }

            this.$api.getAssetImportTask(cnt,(res)=>{
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.success = this.$util.tryParseJson(res.data.c).success
                    this.errorData =  this.$util.tryParseJson(res.data.c).notCompletion
                    this.status = this.$util.tryParseJson(res.data.c).status
                    this.sum =  this.$util.tryParseJson(res.data.c).sum
                    if(this.status == 2){
                        let cnt1 ={
                            orgId: orgId, // Long 组织编号
                            importTaskId: this.info.id, // Long 导入任务id
                        }
                        this.$api.importAsset(cnt1,(res1)=>{
                            if(res1.data.rc == this.$util.RC.SUCCESS){
                                this.getPropressData()
                            }
                        })
                    }else{
                        this.getPropressData()
                    }
                }
            })

           this.timer = setInterval(this.getPropressData,5000)




        },
        beforeDestroy(){
            this.$once('hook:beforeDestroy', () => {
                clearInterval(this.timer);
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
