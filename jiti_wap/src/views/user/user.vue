<template>
    <div>
        <header-box title="个人中心"></header-box>
        <div class="main-box">
            <div class="img-box">
                <div class="img-info">
                    <img src="../../assets/image/headImage.png" alt="">
                </div>
                <div class="img-title">
                    <div class="icon-title">
                        {{userPost}}
                    </div>
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
                        3
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
            if (this.userInfo.visor == this.$constData.visor.VISOR_CHAIRMAN) {
                this.userPost = '监事长'
            } else if (this.userInfo.duty ==this.$constData.duty.DUTY_CHAIRMAN) {
                this.userPost = '董事长'
            } else if (this.userInfo.visor == this.$constData.visor.VISOR_VICE_SUPERVISOR) {
                this.userPost = '副监事长'
            } else if (this.userInfo.duty == this.$constData.duty.DUTY_VICE_CHAIRMAN) {
                this.userPost = '副董事长'
            } else if (this.userInfo.visor == this.$constData.visor.VISOR_SUPERVISOR) {
                this.userPost = '监事'
            } else if (this.userInfo.duty == this.$constData.duty.DUTY_DIRECTOR) {
                this.userPost = '董事'
            } else if (this.userInfo.share == this.$constData.share.SHARE_REPRESENTATIVE) {
                this.userPost = '股东代表'
            } else if (this.userInfo.share == this.$constData.share.SHARE_SHAREHOLDER) {
                this.userPost = '股东'
            } else {
                this.userInfo = '暂无职务'
            }


            console.log(localStorage.getItem('user'))
        }
    }
</script>

<style scoped lang="scss">
    .img-box {
        width: 100%;
        height: 12rem;
        padding-top: 1rem;
        background-image: url('../../assets/image/banner.jpg');
    }

    .img-title {
        width: 100%;
        height: 3rem;
        margin-top: 2rem;
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
        float: left;
        margin-left:2rem;
        width: 10rem;
        height: 2rem;
        text-align: left;
        line-height: 2rem;
        color: #fff;
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
