<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24" >
                <span class="title-box" style="line-height: 40px">集体资产导入任务: 啊实打实的</span>
            </el-col>

        </el-row>
        <el-row class="row-box1" >
            <el-col :span="24">
                <p>
                    <span class="info-text">
                         任务数据总量：52000；创建任务时间：2019-05-07；任务状态：正在导入；
                    </span>
                </p>
            </el-col>
            <el-row  style="margin: 15px 0">
                <el-col :span="24">
                    <span class="info-text" style="line-height: 30px;font-size: 16px;float: left;">写入进度：</span>
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="70" style="line-height: 30px;float: left;width: 300px;margin-left: 20px; "></el-progress>
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
                <el-button type="primary" style="float: right" @click="importBtn"> 查看错误数据报告</el-button>
            </el-col>
        </el-row>


        <!--批量移入资产-->
        <el-dialog
                title="上传资产表格"
                :visible.sync="importModal"
                width="30%"
                :before-close="handleClose"
                center
                @close="closeBtn">
            <span>
                        <div class="file-msg">
                            目前只支持后缀为 '.xlsx'的Excl文件.
                        </div>
                        <div class="file-box">
                            <span class="icon-box"><i class="el-icon-upload"></i></span> <span class="icon-text">上传文件</span>
                             <input type="file" class="input-file-box" @change="fileBtn($event)">
                        </div>

                        <div class="fine-name" v-if="fileName != ''">
                            文件名：{{fileName}}
                        </div>

                        <div class="line" v-if="num >0 && num<100">
                            <div class="line-title">上传进度:</div>
                            <div class="line-box">
                                <el-progress :percentage="num"></el-progress>
                            </div>
                        </div>

                        <div class="line" v-if="num == 100">
                            <div class="line-title">上传进度:</div>
                            <div class="line-text">
                                上传成功！
                            </div>
                        </div>



            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="importModal = false">取 消</el-button>
                <el-button type="primary"   @click="doUpload"  >确认上传数据表格</el-button>
            </span>
        </el-dialog>
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
                orgName:'',     //机构名称
                importModal:false,  //导入资产弹出框
                fileName:'',    //文件上传
                fileData:[],
                url:'',         //文件的线上地址
                num:0,          //上传进度
                multipleSelection:[],
                address:'',     //导入地址
            }
        },
        methods:{

            //异步方法-请求该组织下的该任务下的excl列表
            async list () {
                try{
                    let result = await client.list({
                        prefix: this.address,
                    });
                    this.tableData = result.objects
                } catch (e) {
                    console.log(e);
                }
            },
            //异步方法-下载单个文件
            async  get (objName,localName) {
                try {
                    let result = await client.get(objName,localName);
                    console.log(result)
                } catch (e) {
                    console.log(e);
                }
            },
            //异步方法-删除单个文件
            async  delete (name) {
                try {
                    let result = await client.delete(name);
                    this.$router.push('/page')
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
                console.log(info)
                let objName = info.name
                let localName = objName.replace(this.address, '')
                localName = localName.slice(13)
                localName = decodeURIComponent(localName)

                // let url = client.signatureUrl(objName);
                // console.log(url)
                console.log(objName)
                console.log(localName)
                this.get(objName,localName)
            },
            //删除文件
            delBtn(info){
                this.delete(info.name)
            },
            //导入文件上传相关
            //关闭弹出框，重置上传的文件的相关变量
            closeBtn() {
                this.fileName = ''
                this.fileData = []
                this.url = ''
            },
            //讲已经导入到oss的文件传递给服务端进行数据库导入
            importAssetsFile(){
                if(this.url != '' || this.url != undefined){
                    let cnt = {
                        orgId:localStorage.getItem('orgId'),
                        url:this.url
                    }
                    this.importAssets(cnt)
                }
            },
            //进度条
            getProgress(p) {
                this.num = p
            },
            //开始导入到oss
            doUpload() {
                this.loadData = true
                let files = []
                files[0] = this.fileData[0]
                this.getProgress(0)
                let file =files
                this.size = file[0].size
                let timer = new Date().getTime()
                let tmpName =timer+ encodeURIComponent(file[0].name)
                tmpName =this.address+ tmpName
                this.multipartUpload(tmpName, file[0])
            },
            //分片上传
            multipartUpload(upName, upFile) {
                //Vue中封装的分片上传方法（详见官方文档）
                let _this = this
                const progress = async function (p) {
                    //项目中需获取进度条，故调用进度回调函数（详见官方文档）
                    // _this.$emit('getProgress', Math.round(p * 100))
                    _this.getProgress(Math.round(p * 100))
                }
                try {
                    let result = client.multipartUpload(upName, upFile, {
                        progress,
                        meta: {
                            year: 2017,
                            people: 'test'
                        }
                    }).then(res => {
                        //导入资产
                        this.$router.push('/page')
                    }).catch(err => {
                        console.log(result)
                        console.log(err)
                    });

                } catch (e) {
                    // 捕获超时异常
                    if (e.code === 'ConnectionTimeoutError') {
                        console.log("Woops,超时啦!");
                    }
                    console.log(e)
                }
            },
            // 获取文件名显示
            fileBtn(ev) {
                this.fileData = ev.target.files
                this.fileName = this.fileData[0].name
            },
            handleClose(done) {
                done();
            },
            delMore() {
                console.log(this.multipleSelection)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        },
        mounted(){
            this.orgName = localStorage.getItem('orgName')
            let orgId = localStorage.getItem('orgId')
            let taskId = '111'
            this.address = 'asset/'+orgId+'/'+taskId+'/'

            // let result = await client.list({
            //     prefix: this.address
            // })
            this.list()
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
