<template>
    <div>
        <div class="bg-box">
            <div class="form-box">
                <div class="logo-box">
                    <div class="logo-img">
                        <i class="iconfont icon-logo"></i>
                    </div>
                    <div class="logo-title">
                        集体经济组织管理系统—账号注册
                    </div>
                </div>
                <div class="admin-pwd">
                    <div class="admin-label">
                        真实姓名:
                    </div>
                    <div class="admin-text">
                        <el-input type="text" v-model="realName" placeholder="请输入用户真实姓名"></el-input>
                    </div>
                </div>
                <div class="admin-pwd">
                    <div class="admin-label">
                        手机号码:
                    </div>
                    <div class="admin-text">
                        <el-input type="text" v-model="mobile" placeholder="请输入11位联系手机号码"></el-input>
                    </div>
                </div>

                <div class="admin-pwd">
                    <div class="admin-label">
                        身份证号:
                    </div>
                    <div class="admin-text">
                        <el-input type="text" v-model="idNumber" placeholder="请输入用户身份证号"></el-input>
                    </div>
                </div>
                <div class="admin-pwd">
                    <div class="admin-label">
                        登录密码:
                    </div>
                    <div class="admin-text">
                        <el-input type="password" v-model="pwd" placeholder="请输入登录密码"></el-input>
                    </div>
                </div>
                <div class="admin-pwd">
                    <div class="admin-label">
                        重输密码:
                    </div>
                    <div class="admin-text">
                        <el-input type="password" v-model="pwd1" placeholder="请再次输入登录密码"></el-input>
                    </div>
                </div>
                <div class="form-btn">
                    <el-col :span="24">
                        <div class="row-box3" >
                            <router-link to="/login"><el-button type="info" style="margin-left: 50px">返回登录页</el-button></router-link>
                            <el-button type="primary" @click="registerBtn" style="margin-left: 50px">  确认注册</el-button>

                        </div>
                    </el-col>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                mobile:'',
                pwd:'',
                pwd1:'',
                realName:'',
                idNumber:''
            }
        },
        methods: {
            registerBtn() {
                if (this.mobile == '' || this.pwd == ''|| this.idNumber == '' || this.realName == '') {
                    this.$message({
                        showClose: true,
                        message: '请输入完整的账号密码',
                        type: 'error'
                    });
                }else if(this.pwd != this.pwd1){
                    this.$message({
                        showClose: true,
                        message: '两次输入的密码不一致',
                        type: 'error'
                    });
                }else{
                    let cnt = {
                        mobile: this.mobile,
                        realName:this.realName,
                        idNumber:this.idNumber,
                        pwd: this.pwd,
                    }
                    this.$api.registeUser(cnt,(res)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            this.$message({
                                showClose: true,
                                message: '注册成功，前往登录',
                                type: 'success'
                            });
                        }else{
                            this.$message.error('注册失败,信息有误');
                        }
                    })
                    this.$router.push('/login')
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
        background-image: url("../../assets/image/bg.jpg");
        background-position: center;
        background-size: cover;
    }

    .form-box {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -27rem;
        margin-left: -20rem;
        width: 45rem;
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

</style>
