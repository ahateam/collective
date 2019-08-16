<template>
    <div class="login-container">
        <el-form class="login-form" label-position="left">

            <div class="title-container">
                <h3 class="title">
                    集体经济管理平台用户注册
                </h3>
            </div>

            <el-form-item prop="username">
                <span class="svg-container">
                    <i class="iconfont icon-user"></i>
                 </span>
                <el-input
                        v-model="realName"
                        placeholder="请输入用户真实姓名"
                        type="text"
                />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="iconfont icon-shouji"></i>
                </span>
                <el-input
                        v-model="mobile"
                        type="text"
                        placeholder="请输入用户手机号码"
                />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="iconfont icon-caiwuxinxi-copy"></i>
                </span>
                <el-input
                        v-model="idNumber"
                        type="text"
                        placeholder="请输入用户身份证号"
                />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="iconfont icon-mima"></i>
                </span>
                <el-input
                        v-model="pwd"
                        type="password"
                        placeholder="请输入用户账号密码"
                        name="password"
                />

            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="iconfont icon-mima"></i>
                </span>
                <el-input
                        v-model="pwd1"
                        type="password"
                        placeholder="重新输入确认密码"
                        name="password"
                />

            </el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;margin-left: 0" @click="registerBtn">
                确认注册
            </el-button>
            <router-link to="/login">
                <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;margin-left: 0">
                    返回登录
                </el-button>
            </router-link>


        </el-form>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            return {
                pwd: '',
                pwd1: '',
                mobile: '',
                realName: '',
                idNumber: '',
                loading:false,
            }
        },
        methods: {
            registerBtn() {
                if (this.mobile == '' || this.pwd == '' || this.idNumber == '' || this.realName == '') {
                    this.$message({
                        showClose: true,
                        message: '请输入完整的账号密码',
                        type: 'error'
                    });
                } else if (this.pwd != this.pwd1) {
                    this.$message({
                        showClose: true,
                        message: '两次输入的密码不一致',
                        type: 'error'
                    });
                } else {

                    let cnt = {
                        mobile: this.mobile,
                        realName: this.realName,
                        idNumber: this.idNumber,
                        pwd: this.pwd,
                    }


                    this.$area.registeUser(cnt, (res) => {

                        if (res.data.rc == this.$util.RC.SUCCESS) {
                            this.$message({
                                showClose: true,
                                message: '注册成功，前往登录',
                                type: 'success'
                            });
                        } else {
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
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-container {
        min-height: 100%;
        width: 100%;
        background-color: $bg;
        overflow: hidden;

        .login-form {
            position: relative;
            width: 520px;
            max-width: 100%;
            padding: 160px 35px 0;
            margin: 0 auto;
            overflow: hidden;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }

            .set-language {
                color: #fff;
                position: absolute;
                top: 3px;
                font-size: 18px;
                right: 0px;
                cursor: pointer;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }

        .thirdparty-button {
            position: absolute;
            right: 0;
            bottom: 6px;
        }

        @media only screen and (max-width: 470px) {
            .thirdparty-button {
                display: none;
            }
        }
    }
</style>
