<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                新增经济组织机构
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-col :span="24">
                <el-col :span="4">
                    <div class="title-box">集体经济组织名称:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="name" placeholder="请输入集体经济组织名称" disabled="disabled"></el-input>
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
                            <v-distpicker @selected="sel" :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
                        </div>
                    </el-col>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">机构地址:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            <el-input v-model="address" placeholder="请输入机构地址"></el-input>
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
                            <el-input v-model="code" placeholder="请输入组织机构代码"></el-input>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">股份总数:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            <el-input v-model="shareAmount" placeholder="请输入组织股份总数"></el-input>
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
                        <div class="text-box">
                            <input @change="getMechData($event)" type="file" class="upload"/>
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
                        <div class="text-box">
                            <input @change="getMechData1($event)" type="file" class="upload"/>
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

    export default {
        name: "editMech",
        data() {
            return {
                info:{},
                select:{
                    province:'',
                    city:'',
                    area:''
                },
                name: '',
                citydata: '',
                province:'',
                city:'',
                district:'',
                address: '',
                code: '',
                mechCodeImg: '',
                mechGrantImg: '',
                shareAmount:''
            }
        },
        components: {
            VDistpicker
        },
        methods: {
            sel: function (data) {
                this.province = data.province.value
                this.city = data.city.value
                this.district = data.area.value
            },
            getMechData(event) {
                this.mechCodeImg = event.target.files[0]
                console.log(this.mechCodeImg)
            },
            getMechData1(event) {
                this.mechGrantImg = event.target.files[0]
                console.log(this.mechGrantImg)
            },
            submitBtn(){
                let that = this
                if(this.name =='' || this.province == '' || this.address == '' ||this.code == '' ){
                    this.$message({
                        showClose: true,
                        message: '请先将信息填写完整',
                        type: 'error'
                    })
                }else{

                    let cnt = {
                        orgId: this.info.id,
                        province: this.province,
                        city: this.city,
                        district: this.district,
                        address: this.address,
                        imgOrg: this.imgOrg,
                        imgAuth: this.imgAuth,
                        shareAmount: this.shareAmount,
                    };

                    this.$util.call('/org/setORG',cnt,function (res) {
                        if(res.data.rc == that.$util.RC.SUCCESS){
                            that.$message({
                                showClose: true,
                                message: '修改组织信息成功',
                                type: 'success'
                            })
                            that.$router.push('/mechanism')
                        }else {
                            that.$message({
                                showClose: true,
                                message: '修改组织信息失败',
                                type: 'error'
                            })
                        }
                    })
                    // this.$ajax.api.setORG(,function (res) {
                    //     if(res.data.rc == 'succ'){
                    //         that.$message({
                    //             showClose: true,
                    //             message: '修改组织信息成功',
                    //             type: 'success'
                    //         })
                    //         that.$router.push('/mechanism')
                    //     }else {
                    //         that.$message({
                    //             showClose: true,
                    //             message: '修改组织信息失败',
                    //             type: 'error'
                    //         })
                    //     }
                    // })


                }
            }
        },
        mounted(){
            let that = this
            this.mechId = this.$route.params.mechId

            let cnt = {
                orgId:this.mechId,
            };
            this.$util.call('/org/getORGById',cnt,function (res) {
                if(res.data.rc == that.$util.RC.SUCCESS){
                    that.info = JSON.parse(res.data.c)
                    that.name = that.info.name
                    that.address = that.info.address
                    that.code = that.info.code
                    that.select.province = that.info.province
                    that.select.city = that.info.city
                    that.select.area = that.info.district
                    that.shareAmount = that.info.shareAmount
                }else{
                    that.$message({
                        showClose: true,
                        message: '信息失效',
                        type: 'error'
                    })
                    that.$router.push('/mechanism')
                }
                console.log(that.info)
            })
            //
            // this.$ajax.api.getORGById(this.mechId,function (res) {
            //     that.info = JSON.parse(res.data.c)
            //     that.name = that.info.name
            //     that.address = that.info.address
            //     that.code = that.info.code
            //     that.select.province = that.info.province
            //     that.select.city = that.info.city
            //     that.select.area = that.info.district
            //
            // })

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

    .row-box3{
        margin-top: 20px;
        text-align: center;
        padding-bottom: 20px;
    }
</style>
