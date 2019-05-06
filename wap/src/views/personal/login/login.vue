<template>
    <div>
        <div class="bg-box">
            <div class="logo">
                <div class="logo-img" >
                    <i class="iconfont icon-logo"></i>
                </div>
                <div class="logo-text">
                    集体经济组织专用软件
                </div>
            </div>
            <div class="form-box">
                <div class="input-box">
                    <div class="input-img">
                        <i class="iconfont icon-user"></i>
                    </div>
                    <div class="input-item">
                        <div class="input-btn " @click="quxiao">
                            <i class="iconfont icon-quxiao"></i>
                        </div>
                        <div class="input-text">
                            <input type="text" class="text" placeholder="请输入手机号或者身份证号" v-model="userName">
                        </div>
                    </div>
                </div>
                <div class="input-box1">
                    <div class="input-img">
                        <i class="iconfont icon-mima"></i>
                    </div>
                    <div class="input-item">
                        <div class="input-btn ">
                            <i class="iconfont icon-ai-eye"></i>
                        </div>
                        <div class="input-text">
                            <input type="password" class="text" placeholder="请输入密码" v-model="pwd">
                        </div>
                    </div>
                </div>
                <div class="text-box" @click="tellBtn">
                    根据手机号--选择账号登陆
                </div>
                <div class="form-btn" @click="formBtn">
                    立 即 登 录
                </div>
                <router-link to="/bankLogin">
                    <div class="bank-text">
                        银行金融平台登录
                    </div>
                </router-link>

                <!--<div class="form-btn1" @click="registerBtn">-->
                    <!--注 册 机 构-->
                <!--</div>-->

            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';

    export default {
        name: "login",
        data(){
            return{
                userName:'',
                pwd:'',
            }
        },
        methods:{
            formBtn(){

                if(this.userName == ''){
                    Toast.fail({
                        duration:200,
                        message:'请输入手机号'
                    })
                }else if(this.pwd == ''){
                    Toast.fail({
                        duration:200,
                        message:'请输入密码'
                    })
                }else{
                    if(this.userName.length>11){
                        let cnt = {
                            idNumber: this.userName, // String 身份证号
                            pwd: this.pwd, // String 密码
                        }
                        this.$api.loginByIdNumber(cnt,(res)=>{
                            if(res.data.rc == this.$util.RC.SUCCESS){
                                let data = this.$util.tryParseJson(res.data.c,{})
                                localStorage.setItem('userInfo',JSON.stringify(data))
                                Toast.success({
                                    durationL:200,
                                    message:'登录成功'
                                })
                                this.$router.push('/choose')
                            }else{
                                Toast.fail({
                                    duration:200,
                                    message:'登录失败'
                                })
                            }
                        })

                    }else{
                        let cnt = {
                            mobile: this.userName,
                            pwd: this.pwd,
                        };
                        this.$api.loginByMobileAndPwd(cnt, (res)=> {
                            if(res.data.rc == this.$util.RC.SUCCESS){
                                let data = this.$util.tryParseJson(res.data.c,{})
                                localStorage.setItem('userInfo',JSON.stringify(data))
                                Toast.success({
                                    durationL:200,
                                    message:'登录成功'
                                })
                                this.$router.push('/choose')
                            }else{
                                Toast.fail({
                                    duration:200,
                                    message:'登录失败'
                                })
                            }
                        })
                    }




                }
            },
            quxiao(){
                this.userName =''
                this.pwd = ''
            },
            registerBtn(){
                this.$router.push('/register')
            },
            tellBtn(){
                if(this.userName == ''){
                    Toast.fail({
                        duration:200,
                        message:'请输入手机号'
                    });
                }else if(this.userName.length != 11){
                   Toast.fail({
                           duration:200,
                           message:'手机号格式错误'
                       })
                }else{
                    this.$router.push({
                        path:'/tellLogin',
                        name:'tellLogin',
                        params:{
                            tell:this.userName
                        }
                    })
                }
            }
        },
        mounted(){
            if(localStorage.getItem('userInfo') !=null){
                this.$router.push('/choose')
            }
        }
    }
</script>

<style scoped lang="scss">
    .bank-text{
        width: 100%;
        height: 2rem;
        margin-top: 2rem;
        line-height: 2rem;
        color: #fff;
        font-size: 1.4rem;
        text-align: right;
    }
    .bg-box {
        width: 100%;
        height: 100vh;
        background-image: url('../../../assets/image/bg.jpg');
        background-position: center;
        background-size: cover;
        overflow: hidden;
        position: relative;
    }

    .logo {
        position: absolute;
        width: 20rem;
        height: 8rem;
        left: 50%;
        margin-left: -10rem;
        margin-top: 12%;
        text-align: center;
    }

    .logo-img {
        width: 6rem;
        margin-left: 7rem;
        height: 6rem;
        overflow: hidden;
        color: #0a6c05;
        line-height: 6rem;
        text-align: center;
    }

    .logo-img i {
        width: 6rem;
        height: 6rem;
        color: #0a6c05;
        font-size: 6rem;
    }

    .logo-text {
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        font-size: 1.6rem;
        color: #0a6c05;
        text-align: center;
    }

    .form-box {
        position: absolute;
        left: 10%;
        top:50%;
        margin-top:-5rem;
        width: 80%;
        height: 25rem;
    }

    .input-box {
        width: 100%;
        height: 3.5rem;
        margin-top: 1rem;
        background: rgba(255, 255, 255, .5);
        border-radius: 25px;
        overflow: hidden;
    }
    .input-box1 {
        width: 100%;
        height: 3.5rem;
        margin-top: 2rem;
        background: rgba(255, 255, 255, .5);
        border-radius: 25px;
        overflow: hidden;
    }

    .input-img {
        float: left;
        width: 3.5rem;
        height: 3.5rem;
        line-height: 3.5rem;
        text-align: center;
    }

    .input-img i {
        width: 3.5rem;
        height: 3.5rem;
        line-height: 3.5rem;
        text-align: center;
        color: #fff;
        font-size: 1.6rem;
    }

    .input-item {
        width: auto;
        height: 3.5rem;
        margin-left: 3.5rem;
    }

    .input-text {
        margin-right: 3.5rem;
        height: 3.5rem;

    }

    .input-btn {
        float: right;
        width: 3.5rem;
        height: 3.5rem;
        text-align: center;
        line-height: 3.5rem;
    }

    .input-btn i {
        width: 3.5rem;
        height: 3.5rem;
        text-align: center;
        line-height: 3.5rem;
        font-size: 1.6rem;
        color: #fff;
    }

    .text {
        width: 100%;
        height: 2.5rem;
        margin-top: .5rem;
        background-color: transparent;
        border: none;
        color: #fff;
        font-size: 1.4rem;
    }

    .text::-webkit-input-placeholder{
        color: #eee;
        text-align: center;
        font-size: 1.4rem;
    }
    .text:-moz-placeholder {
        color: #eee;
        text-align: center;
        font-size: 1.4rem;
    }
    .text::-moz-placeholder{
        color: #eee;
        text-align: center;
        font-size: 1.4rem;
    }
    .text:-ms-input-placeholder{
        color: #eee;
        text-align: center;
        font-size: 1.4rem;
    }
    .form-btn{
        width: 100%;
        height: 3.5rem;
        background: rgba(125,177,253,.5);
        border-radius: 25px;
        margin-top: 4rem;
        text-align: center;
        line-height: 3.5rem;
        font-size: 1.4rem;
        color: #fff;
    }
    .form-btn1{
        width: 100%;
        height: 3.5rem;
        background: rgba(125,177,253,.5);
        border-radius: 25px;
        margin-top: 2rem;
        text-align: center;
        line-height: 3.5rem;
        font-size: 1.4rem;
        color: #fff;
    }
    .form-btn:active{
        background: rgb(125,177,253);
    }
    .form-btn1:active{
        background: rgb(125,177,253);
    }
    .text-box{
        margin-top: 1rem;
        padding: 0 1rem;
        line-height: 2rem;
        color: #fff;
        font-size: 1.4rem;
    }

</style>
