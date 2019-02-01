<template>
    <div>
        <div class="bg-box">
            <div class="form-box">
                <div class="logo-box">
                    <div class="logo-img">
                        <i class="iconfont icon-logo"></i>
                    </div>
                    <div class="logo-title">
                        集体经济组织管理系统
                    </div>
                </div>
                <div class="admin-name">
                    <div class="admin-label">
                        用户账号:
                    </div>
                    <div class="admin-text">
                        <el-input v-model="adminName" placeholder="请输入管理账号"></el-input>
                    </div>
                </div>
                <div class="admin-pwd">
                    <div class="admin-label">
                        用户密码:
                    </div>
                    <div class="admin-text">
                        <el-input type="password" v-model="adminpwd" placeholder="请输入管理账号密码"></el-input>
                    </div>
                </div>
                <div class="form-btn">
                    <div class="login-btn" @click="loginBtn">
                        立 即 登 录
                    </div>
                    <router-link to="/register">
                        <div class="login-btn" style="margin-top: 2rem">
                            注 册 账 号
                        </div>
                    </router-link>
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
                adminName: '',
                adminpwd: ''
            }
        },
        methods: {
            loginBtn() {
                if (this.adminName == '' || this.adminpwd == '') {
                    this.$message({
                        showClose: true,
                        message: '请将账号密码输入完整',
                        type: 'error'
                    });
                } else {
                    this.$router.push('/home')
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
        margin-top: -25rem;
        margin-left: -20rem;
        width: 35rem;
        height: 45rem;
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
        font-size: 2.5rem;
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
