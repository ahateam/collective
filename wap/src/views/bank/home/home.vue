<template>
    <div>
        <home-header></home-header>
        <div class="main-box">
            <div class="nav-box" >
                <div class="bank-title-box">
                    银行金融组织机构管理平台
                </div>

            </div>
            <div class="item">

                <router-link to="/bankVote">
                    <div class="item-box">
                        <div class="img-box1">
                            <div class="i-box" style="background: rgb(54, 163, 247)">
                                <van-icon name="idcard"/>
                            </div>
                        </div>
                        <div class="text-box">
                            <div class="item-text">
                                查看投票
                            </div>
                            <div class="item-next">
                                <van-icon name="arrow"/>
                            </div>
                        </div>
                    </div>
                </router-link>
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
                orgName:'',

            }
        },
        methods:{

        },
        mounted() {


        }
    }

</script>

<style scoped lang="scss">
    .bank-title-box{
        padding-top: 5rem;
        width: auto;
        height: 3rem;
        line-height: 3rem;
        color: #fff;
        font-size: 1.6rem;
        text-align: center;
        letter-spacing:2px;
    }
    .nav-box {
        width: 100%;
        height: 14rem;
        background-image: url("../../../assets/image/banner.jpg");
        background-position: center;
        background-size: cover;
    }
    .nav-img-box{
        width: auto;
        height: 8rem;
        padding:2rem 1rem 1rem 1rem;
        cursor: pointer;
    }
    .nav-user-img{
        float: left;
        margin-left: 3rem;
        margin-top: 1.5rem;
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .nav-user-img img{
        width:6rem;
        height: 6rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .nav-user-info{
        margin-left: 12rem;
        width: auto;
        height: 8rem;

    }
    .nav-user-name{
        margin-top: 1rem;
        width: 100%;
        height:3rem;
        color: #fff;
        font-size: 1.6rem;
        line-height: 3rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .nav-user-tell{
        width: 100%;
        height:2rem;
        color: #fff;
        font-size: 1.6rem;
        line-height: 2rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .nav-user-card{
        width: 100%;
        height:3rem;
        color: #fafafa;
        font-size: 1.4rem;
        line-height: 3rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .nav-lable-box{
        width:auto;
        height: 5rem;
        padding: 0 1rem ;
    }
    .nav-item-box{
        float: left;
        width: 33%;
        height: 5rem;
        cursor: pointer;
    }
    .nav-item-title{
        margin-top: .3rem;
        width: 100%;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        font-size: 1.2rem;
        color: #eee;
    }
    .nav-item-content{
        width: 100%;
        height: 2rem;
        text-align: center;
        font-size: 1.4rem;
        line-height: 2rem;
        color: #fff;
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
