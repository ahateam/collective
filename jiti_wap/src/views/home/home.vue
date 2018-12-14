<template>
    <div>
        <home-header></home-header>
        <div class="main-box">
            <div class="nav-box">
                <router-link to="/user">
                    <div class="img-box">
                        <img src="../../assets/image/headImage.png" alt="">
                    </div>
                </router-link>
                <router-link to="/user">
                    <div class="nav-text">
                        {{userInfo.realName}}
                        <!--股份: <span style="color: #ff976a;">    {{userInfo.shareAmount}}</span>-->
                    </div>
                </router-link>

                <router-link to="/vote">
                    <div class="nav-text1">
                        正在表决: <span style="color: #f40;"> {{started.length}}</span>
                    </div>
                </router-link>
            </div>
            <div class="item">
                <router-link to="/vote">
                    <div class="item-box">
                        <div class="img-box1">
                            <div class="i-box">
                                <van-icon name="idcard"/>
                            </div>
                        </div>
                        <div class="text-box">
                            <div class="item-text">
                                表决相关信息
                            </div>
                            <div class="item-next">
                                <van-icon name="arrow"/>
                            </div>
                        </div>

                    </div>
                </router-link>
                <router-link to="/list">
                    <div class="item-box">
                        <div class="img-box1">
                            <div class="i-box" style="background: rgb(54, 163, 247)">
                                <van-icon name="idcard"/>
                            </div>
                        </div>
                        <div class="text-box">
                            <div class="item-text">
                                查看集体资产
                            </div>
                            <div class="item-next">
                                <van-icon name="arrow"/>
                            </div>
                        </div>

                    </div>
                </router-link>
                <router-link to="/listBonus">
                    <div class="item-box">
                        <div class="img-box1">
                            <div class="i-box" style="background: rgb(244, 81, 108)">
                                <van-icon name="idcard"/>
                            </div>
                        </div>
                        <div class="text-box">
                            <div class="item-text">
                                财务分红
                            </div>
                            <div class="item-next">
                                <van-icon name="arrow"/>
                            </div>
                        </div>
                    </div>
                </router-link>
                <router-link to="/meet">

                    <div class="item-box">
                        <div class="img-box1">
                            <div class="i-box" style="background: #E6A23C">
                                <van-icon name="idcard"/>
                            </div>
                        </div>
                        <div class="text-box">
                            <div class="item-text">
                                会议管理
                            </div>
                            <div class="item-next">
                                <van-icon name="arrow"/>
                            </div>
                        </div>
                    </div>
                </router-link>
                <!--<router-link to="/voteCreate">-->
                <!--<div class="item-box">-->
                <!--<div class="img-box1">-->
                <!--<div class="i-box">-->
                <!--<van-icon name="idcard" />-->
                <!--</div>-->
                <!--</div>-->
                <!--<div class="text-box">-->
                <!--<div class="item-text">-->
                <!--发起表决-->
                <!--</div>-->
                <!--<div class="item-next">-->
                <!--<van-icon name="arrow" />-->
                <!--</div>-->
                <!--</div>-->

                <!--</div>-->
                <!--</router-link>-->
            </div>
        </div>
    </div>
</template>

<script>
    import HomeHeader from '@/components/head/homeHeader'

    export default {
        name: "home",
        components: {
            HomeHeader
        },
        data() {
            return {
                userInfo: '',
                started: [],
                realName: '',

            }
        },
        mounted() {

            let that = this
            console.log('asdasd' + localStorage.getItem('user'))
            this.userInfo = JSON.parse(localStorage.getItem('user'))
            this.realName = this.userInfo.realName

            let orgId = this.userInfo.orgId
            let count = 100
            let offset = 0
            let cnt = {
                orgId: orgId,
                count: count,
                offset: offset,
            };
            this.$util.call('/vote/getVotes',cnt,function (res) {
                that.started = JSON.parse(res.data.c).started
            })
        }
    }

</script>

<style scoped lang="scss">
    .nav-box {
        width: 100%;
        height: 16rem;
        background-image: url("../../assets/image/banner.jpg");
        background-position: center;
        background-size: cover;
        position: relative;
    }

    .img-box {
        position: absolute;
        top: 20%;
        left: 50%;
        margin-left: -3rem;
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        overflow: hidden;
    }

    .img-box img {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        overflow: hidden;
    }

    .nav-text {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        margin-left: -13rem;
        width: 12rem;
        height: 2.5rem;
        background: #a4fe00;
        border-radius: 25px;
        text-align: center;
        line-height: 2.5rem;
        color: #666;
    }

    .nav-text1 {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        margin-left: 1rem;
        width: 12rem;
        height: 2.5rem;
        background: #f0fe46;
        border-radius: 25px;
        text-align: center;
        line-height: 2.5rem;
        color: #666;
    }

    .item-box {
        width: 100%;
        height: 5rem;
        margin: 1rem 0;
        border-bottom: 1px solid #ddd;
    }

    .img-box1 {
        float: left;
        width: 5rem;
        height: 5rem;
    }

    .text-box {
        margin-left: 5rem;
        width: auto;
        height: 5rem;
    }

    .i-box {
        width: 3rem;
        height: 3rem;
        margin: 1rem;
        border-radius: 5px;
        background: #40c9c6;
        text-align: center;
        line-height: 3rem;
    }

    .i-box i {
        font-size: 1.6rem;
        line-height: 3rem;
        color: #fff;

    }

    .item-text {
        float: left;
        width: 80%;
        height: 5rem;
        margin-left: 3%;
        line-height: 5rem;
        font-size: 1.6rem;
        color: #333;

    }

    .item-next {
        float: right;
        width: 15%;
        height: 5rem;
        margin-left: 2%;
        line-height: 5rem;
        text-align: center;
    }

    .item-next i {
        font-size: 1.6rem;
        color: #666;
    }
</style>
