<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                修改成员基本信息
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-col :span="24">
                <el-col :span="4">
                    <div class="title-box">成员名称:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="realName	" placeholder="请输入成员名称（保持与身份证一致）"></el-input>
                    </div>
                </el-col>
            </el-col>

            <el-col :span="24" class="row-box2">
                <el-col :span="4">
                    <div class="title-box">联系电话:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="mobile" placeholder="请输入成员联系电话"  ></el-input>
                    </div>
                </el-col>
            </el-col>

            <el-col :span="24" class="row-box3">
                <el-button type="primary" @click="editBtn">确认修改成员</el-button>
            <el-button style="margin-left: 50px" @click="returnBtn">返回列表</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "memberEdit",
        data(){
            return{
                info:{},
                userId:'',
                realName:'',
                mobile:'',
            }
        },
        methods:{
            editBtn(){
                let that = this
                if(this.realName == '' || this.mobile == ''){
                    this.$message({
                        showClose: true,
                        message: '成员信息未填写完整',
                        type: 'error'
                    })
                }else{
                    let cnt = {
                        userId: this.userId,
                        mobile: this.mobile,
                        realName: this.realName,
                    };
                    console.log(cnt)
                    this.$api.editUser(cnt,function (res) {
                        if(res.data.rc == that.$util.RC.SUCCESS){
                            that.$message({
                                showClose: true,
                                message: '修改成功',
                                type: 'success'
                            })
                        }else{
                            that.$message({
                                showClose: true,
                                message: '修改失败',
                                type: 'error'
                            })
                        }
                        that.$router.go(-1)
                    })
                }

            },
            returnBtn(){
                this.$router.go(-1)
            }
        },
        mounted(){
            this.info = this.$route.params.info
            this.userId =  this.info.user.id
            this.realName = this.info.user.realName
            this.mobile = this.info.user.mobile

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
    .row-box2{
        margin-top: 20px;
    }
    .row-box3{
        margin:20px;
        margin-top: 40px;
        text-align: center;
    }
</style>
