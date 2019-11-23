<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <span class="title-box" style="line-height: 40px">股东股权变更</span>
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-row style="margin: 15px 0">
                <el-col :span="24">
                    <span style="font-size: 16px;color: #333;">原始数据</span>
                </el-col>
            </el-row>
            <el-row v-if="info != '' && info !=undefined">
                <el-col :span="12">
                    <el-row> <span style="font-size: 16px;color: #666;"> 股东基本信息</span></el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="24">
                            <div class="info-box">
                                <div class="title">
                                    股东用户姓名：
                                </div>
                                <div class="content">
                                    {{oldData[0].user.realName}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户手机：
                                </div>
                                <div class="content">
                                    {{oldData[0].user.mobile}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户资源股：
                                </div>
                                <div class="content">
                                    {{oldData[0].orgUser.resourceShares}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户身份证号：
                                </div>
                                <div class="content">
                                    {{oldData[0].user.idNumber}}
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row> <span style="font-size: 16px;color: #666;"> 股东职务股份信息</span></el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="24">
                            <div class="info-box">
                                <div class="title">
                                    股东用户职务：
                                </div>
                                <div class="content">
                                    {{postStr}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户股份数：
                                </div>
                                <div class="content">
                                    {{oldData[0].orgUser.shareAmount}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户资产股：
                                </div>
                                <div class="content">
                                    {{oldData[0].orgUser.assetShares }}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户股权证：
                                </div>
                                <div class="content">
                                    {{oldData[0].orgUser.shareCerNo}}
                                </div>
                            </div>

                        </el-col>
                    </el-row>
                </el-col>
            </el-row>


        </el-row>
        <el-row class="row-box1">
            <el-row style="margin: 15px 0">
                <el-col :span="24">
                    <span style="font-size: 16px;color: #333;">股权变更之后数据</span>
                </el-col>
            </el-row>
            <el-row v-if="info != '' && info !=undefined">
                <el-col :span="12">
                    <el-row> <span style="font-size: 16px;color: #666;"> 股东基本信息</span></el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="24">
                            <div class="info-box">
                                <div class="title">
                                    股东用户姓名：
                                </div>
                                <div class="content">
                                    {{newData[0].user.realName}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户手机：
                                </div>
                                <div class="content">
                                    {{newData[0].user.mobile}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户资源股：
                                </div>
                                <div class="content">
                                    {{newData[0].orgUser.resourceShares}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户身份证号：
                                </div>
                                <div class="content">
                                    {{newData[0].user.idNumber}}
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row> <span style="font-size: 16px;color: #666;"> 股东职务股份信息</span></el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="24">
                            <div class="info-box">
                                <div class="title">
                                    股东用户职务：
                                </div>
                                <div class="content">
                                    {{postStr}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户股份数：
                                </div>
                                <div class="content">
                                    {{newData[0].orgUser.shareAmount}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户资产股：
                                </div>
                                <div class="content">
                                    {{newData[0].orgUser.assetShares }}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户股权证：
                                </div>
                                <div class="content">
                                    {{newData[0].orgUser.shareCerNo}}
                                </div>
                            </div>

                        </el-col>
                    </el-row>
                </el-col>
            </el-row>


        </el-row>
        <el-row class="row-box1">
            <el-col :span="24" style="text-align: center">
                <router-link to="/examine">
                    <el-button type="primary" @click="">返回列表</el-button>
                </router-link>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "share",
        data(){
            return{
                info:'',
                roleList:[],
                postStr:'',
                oldData:[],
                newData:[],



            }
        },
        methods: {


            getSysORGUserRoles(cnt) {
                this.$api.getSysORGUserRoles(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.roleList = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.roleList = []
                    }
                    this.roleFilter()
                })
            },
            roleFilter() {
                let arr = JSON.parse(this.oldData[0].orgUser.roles)   //取出默认的全部是id的数组
                let name = '';
                for (let i = 0; i < arr.length; i++) {
                    let name1 = ''
                    for (let j = 0; j < this.roleList.length; j++) {
                        if (arr[i] == this.roleList[j].roleId) {
                            name1 = this.roleList[j].name
                        }
                    }
                    name += ';'
                    name += name1
                }
                this.postStr = name.substr(1)
            },
        },
        mounted(){
            this.info = this.$route.params.info
            console.log(this.info)
            if(this.info != undefined && this.info != ''){
                this.oldData = JSON.parse(this.info.data).oldData
                this.newData = JSON.parse(this.info.data).newData
                let cnt ={}
                // 请求职位列表
                this.getSysORGUserRoles(cnt)
            }

        }
    }
</script>

<style scoped lang="scss">
    .nav-btn {
        float: left;
        margin-left: 15px;
    }

    .row-box {
        background: #fff;
        padding: 15px 0;
        border-left: 4px solid #63a35c;
    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;

    }

    .title-box {
        font-size: 16px;
        line-height: 30px;
        padding: 0 15px;

    }

    .content-box {
        margin-top: 10px;
    }

    .table-title {
        line-height: 40px;
        color: #666;
        font-size: 16px
    }

    .table-del {
        line-height: 40px;
        color: #f44;
        font-size: 20px;
        float: right;
        margin-right: 20px;
        padding: 0 20px;
        cursor: pointer;
    }

    .table-del i {
        font-size: 25px;
    }

    .table-add {
        float: right;
        line-height: 40px;
    }

    .table-master {
        font-size: 14px;
        margin-left: 20px;
        line-height: 40px;
        color: #666;
    }
    .info-box{
        margin: 10px 0;
        width: 100%;
        height: 20px;
    }
    .title{
        float: left;
        width: 150px;
        font-size: 1.6rem;
        color: #333;
        line-height: 20px;
        text-align: left;

    }
    .content{
        float: left;
        width: auto;
        line-height: 20px;
        font-size: 16px;
        color: #666;

    }
</style>
