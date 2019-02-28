<template>
    <div>
        <head-return title="账号信息"></head-return>
        <div class="main-box">
            <div class="item-box">
                <div class="item-image">
                    <i class="iconfont icon-guanliyuan" ></i>
                </div>
                <div class="item-text">
                    <div class="item-title" style="padding-top: .5rem">
                            董事长:  {{ChairmanName}}
                    </div>
                    <div class="item-title">
                        登录账号:  {{Chairman}}
                    </div>
                    <div class="item-title">
                        登录密码:  {{Chairmanpwd}}
                    </div>
                </div>
            </div>
            <div class="item-box1">
                <div class="item-image">
                    <i class="iconfont icon-user"></i>
                </div>
                <div class="item-text">
                    <div class="item-title" style="padding-top: .5rem">
                        管理员:  {{adminName}}
                    </div>
                    <div class="item-title">
                        登录账号:  {{admin}}
                    </div>
                    <div class="item-title">
                        登录密码:  {{adminpwd}}
                    </div>
                </div>
            </div>
            <div class="register-btn" @click="loginBtn">前往登录</div>

        </div>
    </div>
</template>

<script>
    import HeadReturn from '@/components/head/headReturn'

    export default {
        name: "registerSuccess",
        components: {
            HeadReturn
        },
        data(){
            return{
                ChairmanName:'王莹彩',        //董事长姓名
                Chairman:'13274080104',            //董事长账号
                Chairmanpwd:'278958',         //董事长密码
                adminName:'陈崇智',           //管理员姓名
                admin:'15985687458',               //管理员账号
                adminpwd:'365897',            //管理员密码
            }
        },
        methods:{
            loginBtn(){
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped lang="scss">
    .item-box {
        margin: 1rem auto;
        height: 8rem;
        width: 90%;
        border-radius: 5px;
        background: #3faab3;
    }
    .item-box1 {
        margin: 2rem auto;
        height: 8rem;
        width: 90%;
        border-radius: 5px;
        background: #40a94f;
    }
    .item-image {
        float: left;
        width: 8rem;
        height: 8rem;
        padding-left: 1rem;
        text-align: center;
        line-height: 5rem;
    }

    .item-image i {
        width: 8rem;
        height: 8rem;
        font-size: 4rem;
        text-align: center;
        color: #fff;
    }

    .item-text {
        width: auto;
        margin-left: 9rem;
        height: 8rem;

    }

    .item-title {
        width: 100%;
        height: 2.2rem;
        line-height: 2.6rem;
        color: #fff;
        font-size: 1.4rem;
    }
    .register-btn{
        width: 90%;
        height: 3rem;
        margin:0 auto;
        margin-top: 8rem;
        border-radius: 25px;
        background: rgb(125,177,253);
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }




</style>
