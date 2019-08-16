<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                机构组织详细信息
            </el-col>
        </el-row>
        <el-row class="row-box1">

            <el-col :span="24">
                <el-col :span="4">
                    <div class="title-box">集体经济组织名称:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box" >
                        {{info.name}}
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="4">
                    <div class="title-box">机构地址:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box" v-if="addressMech != '' ">
                        {{addressMech.province.name}}    {{addressMech.city.name}}  {{addressMech.district.name}}
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="4">
                    <div class="title-box">机构详细地址:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        {{info.address}}
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="4">
                    <div class="title-box">组织机构代码:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        {{info.code}}
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="4">
                    <div class="title-box">机构总股份数:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        {{info.shareAmount}}
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="4">
                    <div class="title-box">集体经济代码证:</div>
                </el-col>
                <el-col :span="18">
                    <div class="image-box">
                        <img :src="info.imgOrg" alt="">
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="4">
                    <div class="title-box">上传授权书:</div>
                </el-col>
                <el-col :span="18">
                    <div class="image-box">
                        <img :src="info.imgAuth" alt="">
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" class="row-box2">
                <el-button type="primary" @click="edit">修改机构信息</el-button>
                <el-button style="margin-left: 50px" @click="goBack">返回上一页</el-button>
                <!--<router-link to="/areaManageApplyMech">-->

                <!--</router-link>-->
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "childInfo",
        data() {
            return {
                info: {},
                // isMech:'',
                addressMech:'',
            }
        },
        methods: {
            edit() {
                this.$router.push({
                    path: '/areaEditMech',
                    name: 'areaEditMech',
                    params: {
                        info: this.info,
                    }
                })
            },
            goBack(){
                this.$router.go(-1)
            }
        },
        mounted() {
            this.info = this.$route.params.info
                let cnt = {
                    orgExamineId: this.info.id, // Long 组织id
                }
                this.$area.getORGDistrictByOrgApplyId(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.addressMech = this.$util.tryParseJson(res.data.c)
                    }
                })
        },
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
        font-size: 1.6rem;
        color: #333;
        line-height: 40px;
    }

    .image-box {
        margin-left: 50px;
        width: 400px;
        height: 300px;
        overflow: hidden;
    }

    .image-box img {
        width: 400px;
        height: 300px;
        overflow: hidden;
        cursor: pointer;
    }

    .row-box2 {
        margin-top: 40px;
        text-align: center;
        padding-bottom: 20px;
    }

</style>
