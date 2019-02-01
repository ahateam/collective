<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <el-button type="primary" class="nav-btn" @click="dialogVisible1 =true">导入分红数据</el-button>
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-row class="row-box-tilte">
                <el-col :span="24">
                    <div class="col-title-box">
                        分红文件列表
                    </div>
                </el-col>
            </el-row>
            <el-col :span="24">
                <template>
                    <el-table
                            :data="list"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="textName"
                                label="分红文件名">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <!--<el-button  type="text" size="small" @click="load(scope.row)">下载</el-button>-->
                                <el-button @click="load(scope.row)" type="text" size="small">下载</el-button>
                                <el-button @click="del(scope.row)" type="text" size="small" ><span style="color: #f56c6c;">删除</span></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>

            <el-col :span="24" >
                <!--<div class="page-btn">-->
                    <!--<span class="page-text">当前页码：<span style="color: #f60;">{{page}}</span> 页</span>-->
                    <!--<el-button type="primary" :disabled="page==1"   @click="changePage(0)">上一页</el-button>-->
                    <!--<el-button type="primary" :disabled="pageOver ==true"  @click="changePage(1)">下一页</el-button>-->
                <!--</div>-->
            </el-col>
        </el-row>

        <el-dialog
                title="确认删除"
                :visible.sync="dialogVisible"
                width="30%">
            <span>是否确认删除该分红文件信息</span>
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


    export default {
        name: "memberList",
        data() {
           return{
               list:[],
               delInfo:'',
               dialogVisible:false,
               dialogVisible1:false,

               fileName:'',
               fileData:[],
               num:0,
               url:'',
               address:'',
           }
        },
        methods:{
            del(info){
                this.delInfo = info
                this.dialogVisible = true
            },
            delBtn(){
                let that = this
                let name = this.delInfo.name
                async function delFile() {
                    try {
                        let result = client.delete(name);
                        that.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        that.$router.push('/page')
                    } catch (e) {
                        that.$message.error('删除失败');
                        that.$router.push('/page')
                    }
                }
                delFile()
            },
            load(info){
                window.location.href = info.url
               // let name = info.name
               //  let textName = info.textName
               //  console.log(textName)
               //  async function get () {
               //
               //      try {
               //          let result = await client.get(name, textName);
               //          console.log(result);
               //      } catch (e) {
               //          console.log(e);
               //      }
               //  }
               //  get()
            },


            fileBtn(ev){
                this.fileData= ev.target.files
                this.fileName = this.fileData[0].name
            },
            //关闭弹出框，重置上传的文件的相关变量
            closeBtn(){
                this.fileName = ''
                this.fileData = []
                this.url = ''
            },
            getProgress(p){
                this.num = p
            },
            doUpload(){

             let file = this.fileData[0]

                // this.$emit('getProgress', 0)
                this.getProgress(0)


                this.size = file.size
                let tmpName = encodeURIComponent(file.name)
                tmpName =this.address+ tmpName

                console.log(tmpName)

                this.multipartUpload(tmpName, file)
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
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        });
                        this.$router.push('/page')
                    }).catch(err => {
                        this.$message.error('上传失败，请重新上传');
                        this.dialogVisible1 = false
                    });

                } catch (e) {
                    // 捕获超时异常
                    if (e.code === 'ConnectionTimeoutError') {
                        console.log("Woops,超时啦!");
                    }
                    console.log(e)
                }
            },
            handleClose(done){
                done();
            },
        },
        mounted(){
            let orgId = localStorage.getItem('orgId')
            this.address = 'fenhong/' + orgId + '/'
            let that = this
            async function list(){

                let prefix = 'fenhong/' + orgId + '/'    //请求的前缀

                try {
                    let result = await client.list({
                        prefix: prefix
                    });
                    let arr = result.objects
                    if (arr.length != 0) {
                        let listData = []
                        for (let i = 0; i < arr.length; i++) {
                            let obj = {
                                name: arr[i].name,
                                url:arr[i].url,
                                textName: decodeURIComponent(arr[i].name.replace(prefix, ''))
                            }
                            listData.push(obj)
                        }
                        that.list = listData
                        console.log(that.list)
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            list();
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
