<template>
    <div>
        <div class="bg-box">
            <div class="form-box">
                <div class="logo-box">
                    <div class="logo-img">
                        <i class="iconfont icon-logo"></i>
                    </div>
                    <div class="logo-title">
                        集体经济组织管理系统—机构注册
                    </div>
                </div>
                <el-row class="row-box1">
                        <el-col :span="24">
                            <el-col :span="8">
                                <div class="title-box">集体经济组织名称:</div>
                            </el-col>
                            <el-col :span="14">
                                <div class="text-box">
                                    <el-input v-model="mechName" placeholder="请输入集体经济组织名称"></el-input>
                                </div>
                            </el-col>
                        </el-col>

                        <el-col :span="24">
                            <div class="row-box2">
                                <el-col :span="8">
                                    <div class="title-box">机构层级:</div>
                                </el-col>
                                <el-col :span="14">
                                    <div class="text-box">
                                        <v-distpicker @selected="sel"></v-distpicker>
                                    </div>
                                </el-col>
                            </div>
                        </el-col>

                        <el-col :span="24">
                            <div class="row-box2">
                                <el-col :span="8">
                                    <div class="title-box">机构详细地址:</div>
                                </el-col>
                                <el-col :span="14">
                                    <div class="text-box">
                                        <el-input v-model="mechAddress" placeholder="请输入机构详细地址"></el-input>
                                    </div>
                                </el-col>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="row-box2">
                                <el-col :span="8">
                                    <div class="title-box">组织机构代码:</div>
                                </el-col>
                                <el-col :span="14">
                                    <div class="text-box">
                                        <el-input v-model="mechCode" placeholder="请输入组织机构代码"></el-input>
                                    </div>
                                </el-col>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="row-box2">
                                <el-col :span="8">
                                    <div class="title-box">总股份数:</div>
                                </el-col>
                                <el-col :span="14">
                                    <div class="text-box">
                                        <el-input v-model="shareAmount" placeholder="请输入组织机构总股份数"></el-input>
                                    </div>
                                </el-col>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="row-box2">
                                <el-col :span="8">
                                    <div class="title-box">集体经济代码证:</div>
                                </el-col>
                                <el-col :span="14">
                                    <div class="text-box" style="line-height: 3rem">
                           <span style="font-size: 1.4rem;color: #f60;">
                                目前只支持 .jpg 格式的文件上传
                           </span>
                                        <input @change="getMechData($event)" type="file" class="upload"/>
                                    </div>
                                </el-col>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="row-box2">
                                <el-col :span="8">
                                    <div class="title-box">上传授权书:</div>
                                </el-col>
                                <el-col :span="14">
                                    <div class="text-box"  style="line-height: 3rem">
                              <span style="font-size: 1.4rem;color: #f60;">
                                目前只支持 .jpg 格式的文件上传
                           </span>
                                        <input @change="getMechData1($event)" type="file" class="upload"/>
                                    </div>
                                </el-col>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="row-box3">
                              <router-link to="/login"><el-button type="info" >取消并返回登录页</el-button></router-link>
                                <el-button type="primary" @click="submitBtn" style="margin-left: 50px">提交组织资料并登录</el-button>

                            </div>
                        </el-col>
                    </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker'
    import ossAuth from '@/assets/api/oss/ossAuth'
    let client = ossAuth.client

    export default {
        name: "login",
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
                            _this.mechCodeImgUrl = res.res.requestUrls[0]
                        }else if(type == 'grant'){
                            _this.mechGrantImgUrl = res.res.requestUrls[0]
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

                    this.$api.createORG(cnt, function (res) {
                        if (res.data.rc == that.$util.RC.SUCCESS) {
                            that.$router.push('/mechanism')
                            that.$message({
                                showClose: true,
                                message: '新增组织信息成功',
                                type: 'success'
                            });
                        }else{
                            that.$message({
                                showClose: true,
                                message: '新增组织信息失败',
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
    .bg-box {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background-image: url("../../../assets/image/bg.jpg");
        background-position: center;
        background-size: cover;
    }

    .form-box {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -27rem;
        margin-left: -20rem;
        width: 50rem;
        height: 54rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 8px;
    }

    .logo-box {
        width: 100%;
        height: 11rem;
    }

    .logo-img {
        width: 8rem;
        height: 8rem;
        margin: 0 auto;
        border-radius: 50%;

    }

    .logo-img i {
        width: 8rem;
        height: 8rem;
        line-height: 8rem;
        text-align: center;
        color: #0a6c05;
        font-size: 8rem;

    }

    .logo-title {
        width: 100%;
        height: 3rem;
        text-align: center;
        line-height: 3rem;
        color: #666;
        font-size: 2rem;
        letter-spacing: 5px;
        font-weight: 600;
    }

    .admin-name {
        width: 90%;
        margin: 0 auto;
        height: 4rem;
        margin-top: 5rem;
    }

    .admin-label {
        float: left;
        width: 10rem;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.6rem;
        color: #333;
        letter-spacing: 3px;
        font-weight: 600;
        text-align: center;
    }

    .admin-text {
        float-left: 12rem;
        width: auto;
        height: 4rem;
        overflow: hidden;
        line-height: 4rem;
    }

    .admin-pwd {
        width: 90%;
        margin: 0 auto;
        height: 4rem;
        margin-top: 2rem;
    }

    .form-btn {
        width: 80%;
        margin: 0 auto;
        line-height: 4rem;
        margin-top: 3rem;
    }

    .login-btn {
        width: 100%;
        height: 3.5rem;
        background: rgb(94, 174, 203);
        border-radius: 20px;
        text-align: center;
        line-height: 3.5rem;
        font-weight: 600;
        font-size: 1.4rem;
        color: #fff;
        cursor: pointer;
    }

    .login-btn:active {
        background: rgb(125, 177, 253);
    }
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

</style>
