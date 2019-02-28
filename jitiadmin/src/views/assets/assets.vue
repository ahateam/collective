<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                    <el-button type="primary" class="nav-btn">新增资产</el-button>
                    <el-button type="primary" class="nav-btn" @click="dialogVisible1 =true">批量导入</el-button>
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-row class="row-box-tilte">
                <el-col :span="3">
                    <div class="col-title-box">
                        筛选
                    </div>
                </el-col>
                <el-col :span="19">
                    <span v-for="(item,index) in typeList" :key="index">
                             <span class="tab-btn"  :class="{'tab-btn-active':btnActive== index}" @click="listBtn(index)">{{item}}</span>
                    </span>
                </el-col>
            </el-row>
            <el-row class="row-box-tilte">
                <el-col :span="24">
                    <div class="col-title-box">
                        {{tableName}}列表
                    </div>
                </el-col>
            </el-row>
            <el-col :span="24">
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                label="资产名称">
                        </el-table-column>
                        <el-table-column
                                prop="assetType"
                                label="资产分类">
                        </el-table-column>
                        <el-table-column
                                prop="resType"
                                label="资源类型">
                        </el-table-column>
                        <el-table-column
                                prop="location"
                                label="资产位置">
                        </el-table-column>
                        <el-table-column
                                prop="ownership"
                                label="资产权属">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button @click="info(scope.row)" type="text" size="small">详情</el-button>
                                <!--<el-button @click="editPost(scope.row)" type="text" size="small">修改职位</el-button>-->
                                <el-button @click="del(scope.row)" type="text" size="small" ><span style="color: #f56c6c;">删除</span></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>
            <el-col :span="24" >
                <div class="page-btn">
                    <span class="page-text">当前页码：<span style="color: #f60;">{{page}}</span> 页</span>
                    <el-button type="primary" :disabled="page==1"   @click="changePage(0)">上一页</el-button>
                    <el-button type="primary" :disabled="pageOver ==true"  @click="changePage(1)">下一页</el-button>
                </div>
            </el-col>
        </el-row>

        <el-dialog
                title="确认删除"
                :visible.sync="dialogVisible"
                width="30%">
            <span>是否确认删除该资产信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"  @click="delBtn" >确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog
                title="导入成员"
                :visible.sync="dialogVisible1"
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
                            资产文件名：{{fileName}}
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
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary"   @click="doUpload">确认导入数据</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    import ossAuth from '@/assets/api/oss/ossAuth'
    let client = ossAuth.client
    import { Message } from 'element-ui';

    export default {
        name: "memberList",
        data() {
            return {
                typeList:[ '全部资产'],
                btnActive:0,
                tableName:'全部资产',
                tableData: [],
                dialogVisible: false,
                dialogVisible1:false,
                delId:'',
                num:0,
                fileData:[],
                fileName:'',
                url:'',
                address:'',
                //分页相关
                page:1, //当前页码
                count:10,   //每一页数据条数
                pageOver:false  //true:最后一页 false:没有到最后一页
            }
        },
        methods: {
            //文件上传相关
            //关闭弹出框，重置上传的文件的相关变量
            closeBtn(){
                this.fileName = ''
                this.fileData = []
                this.url = ''
            },
            //讲已经导入到oss的文件传递给服务端进行数据库导入
            importAssets(){
                let that = this
                if(that.url != '' || that.url != undefined){
                    let cnt = {
                        orgId:localStorage.getItem('orgId'),
                        url:this.url
                    }
                    this.$api.importAssets(cnt,function (res) {
                        if(res.data.rc == that.$util.RC.SUCCESS ){
                            Message({
                                message: '导入成功',
                                type: 'success'
                            });
                            that.$router.push('/page')
                        }else{
                            Message.error('导入失败，文件有误');
                            that.$router.push('/page')
                        }
                    })

                }
            },
            //进度条
            getProgress(p){
                this.num = p
            },
            //开始导入到oss
            doUpload() {
                let files = []
                files[0] = this.fileData[0]

                // this.$emit('getProgress', 0)
                this.getProgress(0)
                let file =files
                this.size = file[0].size
                let tmpName = encodeURIComponent(file[0].name)
                tmpName =this.address+ tmpName

                console.log(tmpName)

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
                        //导入用户
                        _this.url  = res.res.requestUrls[0]
                        _this.importAssets()

                    }).catch(err => {
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
            fileBtn(ev){
                this.fileData= ev.target.files
                this.fileName = this.fileData[0].name
            },
            handleClose(done){
                done();
            },

            //页面列表以及数据渲染相关
            listBtn(key){
                this.page=1 //当前页码
                let  offset=(this.page-1 )* this.count   //数据起点
                this.count=10   //每一页数据条数
                this.pageOver = false

                let that = this
                this.btnActive = key
                this.tableName = this.typeList[key]
                let orgId = localStorage.getItem('orgId')

                //分页
                let cnt = {
                    orgId: orgId,
                    count: this.count,
                    offset: offset,
                };
                this.$api.getAssets(cnt,function (res) {
                    console.log(JSON.parse(res.data.c))
                    if(res.data.rc == that.$util.RC.SUCCESS){

                        that.tableData = JSON.parse(res.data.c)
                    }else{
                        that.tableData = []
                    }
                    if(that.tableData.length <that.count){
                        that.pageOver = true
                    }else{
                        that.pageOver = false
                    }
                })


            },
            //分页操作相关 上一页/下一页
            changePage(key){
                let that = this

                if(key == 0){   //上一页
                    this.page = this.page-1
                }else{          //下一页
                    this.page = this.page+1
                }
                let offset = (this.page-1 )* this.count
                let orgId = localStorage.getItem('orgId')
                let cnt = {
                    orgId: orgId,
                    count: this.count,
                    offset: offset,
                };
                this.$api.getAssets(cnt,function (res) {
                    console.log(JSON.parse(res.data.c))
                    if(res.data.rc == that.$util.RC.SUCCESS){
                        that.tableData = JSON.parse(res.data.c)
                    }else{
                        that.tableData = []
                    }

                    if(that.tableData.length <that.count){
                        that.pageOver = true
                    }else{
                        that.pageOver = false
                    }
                })

            },

            //删除一行数据
            delBtn(){
                let that = this

                this.dialogVisible = false
                //this.delId是删除的资产id（请求后端删除）
                let cnt = {
                    assetId:this.delId
                };
                this.$api.delAsset(cnt,function (res) {
                    if(res.data.rc == that.$util.RC.SUCCESS){
                        that.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                        })
                    }else{
                        that.$message({
                            showClose: true,
                            message: '删除失败',
                            type: 'error'
                        })
                    }
                    that.$router.push('/page')
                })
            },
            del(row){
                this.delId = row.id
                this.dialogVisible = true

            },
            //资产详情
            info(row){
               console.log(row)
                this.$router.push({
                    path:'/assetsInfo',
                    name:'assetsInfo',
                    params:{
                        info:row
                    }
                })
            }

        },
        mounted(){
            let that = this
            let orgId = localStorage.getItem('orgId')
            let count = 10
            let offset = 0
            let cnt = {
                orgId: orgId,
                count: count,
                offset: offset,
            };
            this.$api.getAssets(cnt,function (res) {
                console.log(JSON.parse(res.data.c))
                if(res.data.rc == that.$util.RC.SUCCESS){

                    that.tableData = JSON.parse(res.data.c)
                }else{
                    that.tableData = []
                }
                if(that.tableData.length <that.count){
                    that.pageOver = true
                }else{
                    that.pageOver = false
                }
            })
        }
    }
</script>

<style scoped lang="scss">
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
    .icon-box{
        display: block;
        float: left;
        width: 46%;
        height: 5rem;
        line-height: 5rem;
        font-size:3rem;
        text-align: right;
        padding-right: 2%;
    }
    .icon-text{
        display: block;
        float: left;
        width: 50%;
        height: 5rem;
        text-align: left;
        font-size: 1.6rem;
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
    .row-box {
        background: #fff;
        padding: 15px 0;
    }

    .nav-btn {
        float: left;
        margin-left: 15px;
    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }
    .row-box-tilte{
        background: #fff;

        font-size: 1.6rem;
        color: #666;
        border-left: 4px solid #67C23A;
        margin-bottom: 15px;
    }
</style>
