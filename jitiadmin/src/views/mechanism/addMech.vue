<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                申请经济组织机构
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-col :span="24">
                <el-col :span="4">
                    <div class="title-box">集体经济组织名称:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="mechName" placeholder="请输入集体经济组织名称"></el-input>
                    </div>
                </el-col>
            </el-col>

            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">机构层级:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            <v-distpicker @selected="sel"></v-distpicker>
                        </div>
                    </el-col>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">机构详细地址:</div>
                    </el-col>
                    <el-col :span="18">

                        <div class="text-box">
                            <el-input v-model="mechAddress" placeholder="请输入机构详细地址"></el-input>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">组织机构代码:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            <el-input v-model="mechCode" placeholder="请输入组织机构代码"></el-input>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">总股份数:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            <el-input v-model="shareAmount" placeholder="请输入组织机构总股份数"></el-input>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">集体经济代码证:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="image-box">
                            <img :src="mechCodeImgUrl" alt=""  v-if="mechCodeImgUrl != ''">
                            <span v-if="mechCodeImgUrl == ''" style="font-size: 20px;color: #666;">暂无图片，请上传</span>
                        </div>
                        <div class="image-load">
                            <div class="text-box">
                               <span style="font-size: 1.4rem;color: #f60;">
                                    目前只支持 .jpg 格式的文件上传
                               </span>
                                <input @change="getMechData($event)" type="file" class="upload"/>
                            </div>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">上传授权书:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="image-box">
                            <img :src="mechGrantImgUrl" alt=""  v-if="mechGrantImgUrl != ''">
                            <span v-if="mechGrantImgUrl == ''" style="font-size: 20px;color: #666;">暂无图片，请上传</span>
                        </div>
                        <div class="image-load">
                            <div class="text-box">
                               <span style="font-size: 1.4rem;color: #f60;">
                                    目前只支持 .jpg 格式的文件上传
                               </span>
                                <input @change="getMechData1($event)" type="file" class="upload"/>
                            </div>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="row-box3">
                    <el-button type="primary" @click="submitBtn">提交组织资料</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker'
    import ossAuth from '@/assets/api/oss/ossAuth'
    let client = ossAuth.client

    export default {
        name: "addMech",
        data() {
            return {
                mechName: '',
                province: '',        //省份
                city: '',            //市
                district: '',        //区
                mechAddress: '',
                mechCode: '',

                mechCodeImg: '',
                mechGrantImg: '',

                mechCodeImgUrl:'',
                mechGrantImgUrl:'',

                shareAmount: '',     //总股份数
                address:''              //oss地址
            }
        },
        mounted(){
            let date = new Date()
            let year =''+date.getFullYear()
            let month =''+date.getMonth()+1
            if(month.length<2){
                month = '0'+month
            }
            let day = ''+date.getDate()
            if(day.length<2){
                day ='0'+ day
            }
            this.address = '/mechanism/'+year+month+day+'/'

        },
        components: {
            VDistpicker
        },
        methods: {
            //进度条
            getProgress(p){
                this.num = p
            },

            //开始导入到oss
            doUpload(file,type) {
                this.$emit('getProgress', 0)
                let date = new Date()
                this.size = file.size
                let tmpName = date.getTime()+''+encodeURIComponent(file.name)
                tmpName =this.address+ tmpName

                console.log(tmpName)

                this.multipartUpload(tmpName, file,type)
            },
            //分片上传
            multipartUpload(upName, upFile,type) {
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
                        //取出存好的url

                            if(type == 'code'){

                                let address = res.res.requestUrls[0]
                                console.log(address)
                                let _index =address.indexOf('?')
                                console.log(_index)
                                if(_index == -1){
                                    _this.mechCodeImgUrl = address
                                }else{
                                    _this.mechCodeImgUrl = address.substring(0,_index)
                                }
                            }else if(type == 'grant'){
                                let address = res.res.requestUrls[0]
                                let _index =address.indexOf('?')
                                if(_index == -1){
                                    _this.mechGrantImgUrl = address
                                }else{
                                    _this.mechGrantImgUrl = address.substring(0,_index)
                                }
                            }

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


            sel: function (data) {
                this.province = data.province.value
                this.city = data.city.value
                this.district = data.area.value
            },
            getMechData(event) {
                this.mechCodeImg = event.target.files[0]
                this.doUpload(this.mechCodeImg,'code')
            },

            getMechData1(event) {
                this.mechGrantImg = event.target.files[0]
                this.doUpload(this.mechGrantImg,'grant')
            },
            submitBtn() {
                if (this.mechName == '' || this.province == '' || this.mechAddress == '' || this.mechCode == '' || this.city == '' || this.district == '') {
                    this.$message({
                        showClose: true,
                        message: '请先将信息填写完整',
                        type: 'error'
                    })
                } else {

                    let that = this
                    let cnt = {
                        userId:localStorage.getItem('userId'),
                        name: this.mechName,
                        code: this.mechCode,
                        province: this.province,
                        city: this.city,
                        district: this.district,
                        address: this.mechAddress,
                        imgOrg: this.mechCodeImgUrl,
                        imgAuth: this.mechGrantImgUrl,
                        shareAmount: this.shareAmount,
                    };

                    this.$api.createORGApply(cnt, function (res) {
                        console.log(res)
                        if (res.data.rc == that.$util.RC.SUCCESS) {
                            console.log(res)
                            that.$message({
                                showClose: true,
                                message: '申请成功，等待审核',
                                type: 'success'
                            });
                            that.$router.push('/applyMech')

                            // if(localStorage.getItem('orgId') == '' ||localStorage.getItem('orgId') == null ){
                            //     localStorage.setItem('orgId',JSON.parse(res.data.c).org.id)
                            //     localStorage.setItem('orgName',JSON.parse(res.data.c).org.name)
                            //     that.$router.go(0)
                            // }else{
                            //
                            // }
                        }else{
                            that.$message({
                                showClose: true,
                                message: '申请失败',
                                type: 'error'
                            });
                        }
                    })



                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .row-box {
        background: #fff;
        padding: 15px;
        font-size: 1.6rem;
        color: #666;
        border-left: 4px solid #67C23A;

    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }

    .title-box {
        font-size: 1.6rem;
        line-height: 40px;
        letter-spacing: 2px;
        font-weight: 600;
        color: #666;
        text-align: right;
    }

    .text-box {
        margin-left: 50px;
    }

    .row-box2 {
        margin-top: 20px;
    }

    .row-box3 {
        margin-top: 20px;
        text-align: center;
        padding-bottom: 20px;
    }
    .image-box {
        margin-left: 50px;
        width: 400px;
        height: 300px;
        overflow: hidden;
        float: left;
    }

    .image-box img {
        width: 400px;
        height: 300px;
        overflow: hidden;
        cursor: pointer;
    }
    .image-load{
        float: left;
        margin-left: 50px;
        line-height: 150px;
    }

</style>
