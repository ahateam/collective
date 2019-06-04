<template>
    <div>
        <header-box title="个人中心"></header-box>
        <div class="main-box">
            <div class="img-box">
                <div class="img-info">
                    <img src="../../../assets/image/headImage.png" alt="">
                </div>
                <div class="img-title">
                    <!--<div class="icon-title">-->
                        <!--{{userPost}}-->
                    <!--</div>-->
                    <div class="name">
                        {{name}}
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="user-item">
                    <div class="item-title">
                        用户名称
                    </div>
                    <div class="item-text">
                        {{name}}
                    </div>
                </div>
                <div class="user-item">
                    <div class="item-title">
                        用户职务
                    </div>
                    <div class="item-text">
                        {{userPost}}
                    </div>
                </div>
                <div class="user-item">
                    <div class="item-title">
                        联系电话/账号
                    </div>
                    <div class="item-text">
                        {{mobile}}
                    </div>
                </div>
                <div class="user-item">
                    <div class="item-title">
                        身份证号
                    </div>
                    <div class="item-text">
                        {{idNumber}}
                    </div>
                </div>

                <div class="user-item">
                    <div class="item-title">
                        我的股份
                    </div>
                    <div class="item-text">
                        {{shareAmount}}
                    </div>
                </div>
                <div class="user-item">
                    <div class="item-title">
                        表决票数
                    </div>
                    <div class="item-text">
                        {{userInfo.weight}}
                    </div>
                </div>
                <div class="user-item" @click="wxBtn">
                    <div class="item-title">
                        绑定微信
                    </div>
                    <div class="item-text">
                       <span > 未绑定（点击绑定）</span>
                    </div>
                </div>
            </div>

            <div class="update-btn" @click="updateBtn">修改账号信息</div>
            <div class="login-btn" @click="loginBtn">注销登录</div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import { Dialog } from 'vant'

    export default {
        name: "user",
        components: {
            HeaderBox
        },
        data() {
            return {
                userInfo: '',
                userPost: '',
                name: '',
                mobile: '',
                idNumber: '',
                weight: '',
                shareAmount:''
            }
        },
        methods: {
            //绑定微信弹窗
            wxBtn(){
                Dialog.confirm({
                    title: '绑定微信',
                    message: '是否绑定当前登录微信信息'
                }).then(() => {
                    this.getWXUserCode()
                }).catch(() => {
                    // on cancel
                });
            },
            //获取微信用户信息
            getWXUserCode(){
               let  info=  this.$commen.getWXUserCode(this.$store.state.wxInfo.APPID,this.$store.state.wxInfo.REDIRECT_URI)
              console.log(info)
            },

            updateBtn() {
                this.$router.push('/userUpdate')
            },
            loginBtn() {
                localStorage.clear()
                this.$router.push('/login')
            }
        },
        mounted() {
            this.userInfo = JSON.parse(localStorage.getItem('user'))
            this.name = this.userInfo.realName
            this.mobile = this.userInfo.mobile
            this.idNumber = this.userInfo.idNumber
            this.weight = this.userInfo.weight
            this.shareAmount = this.userInfo.shareAmount

           let orgRoles = this.userInfo.orgRoles
            console.log(this.userInfo)
            let cnt = {}
            this.$api.getSysORGUserRoles(cnt, (res)=> {
                let arr = JSON.parse(res.data.c)
                for(let i=0;i<orgRoles.length;i++){
                    let role = '';
                    for(let j=0;j<arr.length;j++){
                        if(orgRoles[i] ==arr[j].roleId ){
                            role = arr[j].name
                        }
                    }
                    this.userPost = this.userPost + role+'  '
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .img-box {
        width: 100%;
        height: 12rem;
        padding-top: 1rem;
        background-image: url('../../../assets/image/banner.jpg');
    }

    .img-title {
        width: 100%;
        height: 3rem;
        margin-top: 1.5rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #333;
        text-align: center;
    }

    .img-info {

        width: 6rem;
        height: 6rem;
        margin: .5rem auto;
        overflow: hidden;
        border-radius: 50%;
    }

    .img-info img {
        width: 6rem;
        height: 6rem;
        overflow: hidden;
    }

    .content {
        width: 90%;
        margin: 0 auto;
    }

    .icon-title {
        float: left;
        width: 7rem;
        height: 1.8rem;
        text-align: center;
        line-height: 1.8rem;
        background: #f66;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        color: #fff;
        font-size: 1.2rem;
        margin-left: 25%;
        margin-top: .2rem;
    }

    .name {
        /*float: left;*/
        /*margin-left:2rem;*/
        /*width: 10rem;*/
        /*height: 2rem;*/
        /*text-align: center;*/
        /*line-height: 2rem;*/
        /*color: #fff;*/
        text-align: center;
        color: #fff;
        line-height: 2rem;
    }

    .user-item {
        width: 100%;
        height: 3rem;
        margin-top: 1rem;
        border-bottom: 1px solid #ddd;
    }

    .item-title {
        float: left;
        width: 9rem;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #333;
    }

    .item-text {
        margin-left: 9rem;
        padding-left: 3rem;
        width: auto;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.2rem;
        color: #666;
    }

    .update-btn {
        width: 90%;
        height: 3rem;
        margin: 0 auto;
        margin-top: 3rem;
        border-radius: 25px;
        background: rgb(125, 177, 253);
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }

    .login-btn {
        width: 90%;
        height: 3rem;
        margin: 0 auto;
        margin-top: 2rem;
        border-radius: 25px;
        background: #f66;
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }
</style>
