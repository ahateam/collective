<template>
    <div>
        <el-row class="row-box1">
            <el-row class="row-box-tilte">
                <el-col :span="24">
                    <div class="col-title-box">
                        新增文章
                    </div>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="22" :offset="1">
                    <el-input v-model="title" size="large" placeholder="请输入文章标题(5~30字)"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-col :span="22" :offset="1">
                    <span style="padding: 0 2rem 0 0;font-size: 1.6rem;color: #666;">文章类型：</span>
                    <template>
                        <el-select v-model="type" placeholder="请选择文章类型">
                            <el-option
                                    v-for="item in typeList"
                                    :key="item.v"
                                    :label="item.t"
                                    :value="item.v">
                            </el-option>
                        </el-select>
                    </template>

                </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-col :span="22" :offset="1">
                    <vue-ueditor-wrap v-model="content" :config="myConfig" @beforeInit="addCustomButtom"></vue-ueditor-wrap>
                </el-col>
            </el-row>
            <el-row class="row-box2" >
                <el-col :span="22" :offset="1">
                    <el-col :span="3">
                       <span class="title-box"> 封 面 :</span>
                    </el-col>
                    <el-col :span="19">
                        <template>
                            <el-radio v-model="cover" label="0">无图</el-radio>
                            <el-radio v-model="cover" label="1">单图</el-radio>
                            <el-radio v-model="cover" label="2">三图</el-radio>
                        </template>
                    </el-col>
                </el-col>
            </el-row>
            <el-row class="row-box2">
                <el-col :span="22" :offset="1">
                    <el-button type="danger" @click="btn">立即发布</el-button>
                    <el-button type="warning" @click="draftBtn">保存草稿</el-button>
                </el-col>
            </el-row>
        </el-row>
        <el-dialog
                title="上传图片"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
                center
                @close="closeBtn">
            <span>
                        <div class="file-msg">
                            目前只支持后缀为 '.jpg' 图片上传.
                        </div>
                        <div style="position: relative;cursor: pointer;">
                          <div class="file-box">
                            <span class="icon-box">
                                <i class="el-icon-upload"></i></span>
                            <span class="icon-text">上传图片</span>
                          </div>
                          <input type="file" class="input-file-box" @change="fileBtn($event)">
                        </div>

                        <div class="fine-name" v-if="fileName != ''">
                            资产文件名：{{fileName}}
                        </div>

                        <div class="line" v-if="num >0 && num<100">
                            <div class="line-title"
                            >上传进度:</div>
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
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doUpload">确认上传</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>
    import ossAuth from '@/assets/api/oss/ossAuth'

    let client = ossAuth.client

    import VueUeditorWrap from 'vue-ueditor-wrap'

    export default {
        name: "articleAdd",
        data(){
            return{
                title:'',
                cover:'',
                type:'',
                typeList:[],
                fileName: '',
                fileData: [],
                num: 0,
                address: '',
                dialogVisible: false,
                content: '',
                myConfig: {
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: true,
                    // 初始容器高度
                    initialFrameHeight: 500,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                    // serverUrl: 'http://35.201.165.105:8000/controller.php',
                    // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                    UEDITOR_HOME_URL: '/UEditor/'
                }
            }
        },
        methods:{
            btn() {
                let that = this
                let cnt = {
                    userId: localStorage.getItem('userId'), // Long 用户编号
                    type: this.type, // Byte 内容类型Content.TYPE
                    upChannelId: '', // Long <选填> 上传专栏编号
                    title: this.title, // String 标题
                    data: JSON.stringify(this.content), // String 数据（JSON）
                };
                this.$util.call('/content/createContentPublished',cnt,function (res) {
                    console.log(res)
                    if(res.data.rc == that.$util.RC.SUCCESS){
                        that.$message({
                            message: '发布成功',
                            type: 'success'
                        });
                        that.$router.push('/artice')
                    }else{
                        that.$message.error('发布出错啦')
                    }
                })
            },
            draftBtn(){
                let that = this
                let cnt = {
                    userId: localStorage.getItem('userId'), // Long 用户编号
                    type: this.type, // Byte 内容类型Content.TYPE
                    upChannelId: '', // Long <选填> 上传专栏编号
                    title: this.title, // String 标题
                    data: JSON.stringify(this.content), // String 数据（JSON）
                };
                   this.$util.call('/content/createContentDraft',cnt,function (res) {
                       if(res.data.rc == that.$util.RC.SUCCESS){
                           that.$message({
                               message: '保存草稿成功',
                               type: 'success'
                           });
                           // that.$router.push('/artice')
                       }else{
                           that.$message.error('保存出错啦')
                       }
                })
            },

            fileBtn(ev) {
                this.fileData = ev.target.files
                this.fileName = this.fileData[0].name
            },
            //关闭弹出框，重置上传的文件的相关变量
            closeBtn() {
                this.fileName = ''
                this.fileData = []
            },
            getProgress(p) {
                this.num = p
            },
            doUpload() {

                let file = this.fileData[0]

                // this.$emit('getProgress', 0)
                this.getProgress(0)


                this.size = file.size
                let tmpName = encodeURIComponent(file.name)
                let date = new Date()
                date = date.getTime()
                tmpName = this.address + +date + tmpName

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
                        console.log(res)
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        });
                        this.fileName = ''
                        this.fileData = []
                        this.dialogVisible = false
                        console.log(res.res.requestUrls[0])
                        let url = res.res.requestUrls[0]
                        let html = '<p><img src="' + url + '" alt=""></p>'
                        this.content = this.content + html

                    }).catch(err => {
                        this.$message.error('上传失败，请重新上传');
                        this.dialogVisible = false

                    });

                } catch (e) {
                    // 捕获超时异常
                    if (e.code === 'ConnectionTimeoutError') {
                        console.log("Woops,超时啦!");
                    }
                    console.log(e)
                }
            },
            handleClose() {

            },

            addCustomButtom(editorId) {
                let that = this
                // 1. 自定义按钮
                window.UE.registerUI('test-button' + editorId, function (editor, uiName) {
                    // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
                    editor.registerCommand(uiName, {
                        execCommand: function () {
                            editor.execCommand(
                            )
                        }
                    })
                    // 创建一个 button
                    var btn = new window.UE.ui.Button({
                        // 按钮的名字
                        name: uiName,
                        // 提示
                        title: '图片上传',
                        // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
                        cssRules: "background-image: url('/upload.png') !important;background-size: cover;",
                        // 点击时执行的命令
                        onclick: function () {
                            // 这里可以不用执行命令，做你自己的操作也可
                            that.dialogVisible = true
                        }
                    })
                    // 当点到编辑内容上时，按钮要做的状态反射
                    editor.addListener('selectionchange', function () {

                        var state = editor.queryCommandState(uiName)
                        if (state === -1) {
                            btn.setDisabled(true)
                            btn.setChecked(false)
                        } else {
                            btn.setDisabled(false)
                            btn.setChecked(state)
                        }
                    })

                    // 因为你是添加 button，所以需要返回这个 button
                    return btn
                }, 0 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)


            }
        },
        components:{
            VueUeditorWrap
        },
        mounted(){
            this.typeList = this.$constData.contentType
            console.log(this.typeList)
            let date = new Date()
            let year = '' + date.getFullYear()
            let month = '' + date.getMonth() + 1
            if (month.length < 2) {
                month = '0' + month
            }
            let day = '' + date.getDate()
            if (day.length < 2) {
                day = '0' + day
            }
            this.address = 'article/image/' + year + month + day + '/'
        }

    }
</script>

<style scoped lang="scss">
    .box {
        width: 200px !important;
        height: 200px !important;
        background: #0086b3 !important;
    }

    .btn-box {
        margin-top: 10px;
        background: #fff;
        padding: 15px;
    }

    .editor-box {
        margin-bottom: 10px;
    }

    .line-title {
        float: left;
        width: 5rem;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #666;

    }

    .line {
        width: 90%;
        height: 3rem;
        margin-top: 2rem;
        margin: 0 auto;
    }

    .line-box {
        width: auto;
        padding-top: 1.2rem;
        margin-left: 6rem;
    }

    .line-text {
        width: auto;
        height: 3rem;
        color: rgb(76, 174, 76);
        margin-left: 6rem;
        line-height: 3rem;
        font-size: 1.4rem;
    }

    .file-msg {
        width: 90%;
        margin: 0 auto;
        height: 2rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #f60;
        margin-bottom: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .fine-name {
        width: 90%;
        margin: 0 auto;
        margin-top: 2rem;
        font-size: 1.4rem;
        height: 2rem;
        line-height: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

    }

    .upload-btn {
        margin-left: 5%;
        margin-top: 1rem;
    }

    .input-file-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5rem;
        opacity: 0;;
        cursor: pointer;
    }

    .icon-box {
        display: block;
        float: left;
        width: 46%;
        height: 5rem;
        line-height: 5rem;
        font-size: 3rem;
        text-align: right;
        padding-right: 2%;
    }

    .icon-text {
        display: block;
        float: left;
        width: 50%;
        height: 5rem;
        text-align: left;
        font-size: 1.6rem;
        line-height: 5rem;
    }

    .file-box {
        margin: 0 auto;
        width: 90%;
        height: 5rem;
        border: 1px dashed #f4516c;
        position: relative;
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
    .col-title-box{
        padding:15px;
    }
    .title-box{
        display: block;
        font-size: 1.6rem;
        color: #666;
        font-weight: 600;

    }
    .row-box2{
        margin-top: 20px;
        height: 4rem;
        line-height: 4rem;
    }


</style>
