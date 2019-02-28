<template>
    <div>
        <header-box title="资产导入"></header-box>
        <div class="main-box">
            <van-uploader :after-read="onRead" accept="excl/xls" multiple style="width: 100%">
                <div class="addBtn  van-contact-card" >
                    +
                </div>
            </van-uploader>

            <div class="name" v-if="fileName != ''">
                上传资产文件名：<span style="color: #f44;">{{fileName}} </span>
            </div>
            <div class="text">
                请上传excl文件，仅支持读取excl文件后缀：.xls/.xlsx
            </div>

            <div class="line" v-if="num >0 && num<100">
                <div class="line-title">daor进度:</div>
                <div class="line-box">
                    <van-progress :percentage="num"  />
                </div>
            </div>

            <div class="line" v-if="num == 100">
                <div class="line-title">上传进度:</div>
                <div class="line-text">
                    上传成功！
                </div>
            </div>


            <div class="create-btn" @click="doUpload"  v-if="num!=100">开始导入</div>
            <div class="create-btn" @click="returnBtn"  v-if="num==100">返回文件管理</div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import ossAuth from '@/assets/api/oss/ossAuth'
    let client = ossAuth.client
    export default {
        name: "formFile",
        components:{
            HeaderBox
        },
        data(){
            return{
                fileName:'',
                fileData:'',
                address:'',
                num:0,
                url:'',
            }
        },
        methods:{
            getProgress(p){
                this.num = p
            },
            importAssets(){
                let that = this
               if(that.url != '' || that.url != undefined){
                   let cnt = {
                       orgId:JSON.parse(localStorage.getItem('user')).orgId,
                       url:this.url
                   }
                    this.$api.importAssets('/asset/importAssets',cnt,function (res) {
                        console.log(res)
                    })

               }
            },

            doUpload() {
                let files = []
                files[0] = this.fileData

                // this.$emit('getProgress', 0)
                this.getProgress(0)
                let file =files
                this.size = file[0].size
                let tmpName = encodeURIComponent(file[0].name)
                tmpName =this.address+ tmpName
                console.log(tmpName)
                this.multipartUpload(tmpName, file[0])
            },
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
            onRead(file) {
                this.fileName = file.file.name
                this.fileData = file.file
                console.log(this.fileName)
                console.log(file)
            },
            returnBtn(){
                this.$router.push('/file')
            }
        },
        mounted(){
            this.address = 'zichan/'+JSON.parse(localStorage.getItem('user')).orgId+'/'
        }

    }
</script>

<style scoped lang="scss">
    .main-box{
        width: 100%;
        height: 100%;
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
    .create-btn{
        width: 90%;
        height: 3rem;
        margin:0 auto;
        margin-top: 3rem;
        border-radius: 25px;
        background: rgb(125,177,253);
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }
    .van-contact-card{
        padding: .5rem;
    }
    .addBtn{
        width:90%;
        height: 5rem;
        margin: 0 auto;
        margin-top: 2rem;
        position: relative;
        font-size: 5rem;
        line-height: 5rem;
        text-align: center;
    }
    .text{
        width: 90%;
        height: 4rem;
        margin: 0 auto;
        margin-top: 2rem;
        font-size: 1.4rem;
        color: #666;
        line-height: 2rem;
    }
    .name{
        width: 90%;
        line-height: 2rem;
        margin: 0 auto;
        margin-top:2rem ;
        font-size: 1.4rem;
        color: #666;
    }
</style>
