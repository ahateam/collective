<template>
    <div>
        <header-box title="我的分红"></header-box>
        <div class="main-box">

            <div class="money-box">
                <div class="money-img">
                    <img src="../../assets/image/money.png" alt="">
                </div>
                <div class="money-title">
                    我的分红总额
                </div>
                <div class="money">￥{{money}}.00</div>
            </div>
            <div class="btn">
                <router-link to="/home">
                    <div class="create-btn" >返回首页</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "jiti2",
        components: {
            HeaderBox
        },
        data() {
            return {
                money:0,
                info:'',

            }
        },
        methods: {

        },
        mounted() {
            let orgId = JSON.parse(localStorage.getItem('user')).orgId
            let shareAmount = JSON.parse(localStorage.getItem('user')).shareAmount
            let that = this
            let cnt = {
                orgId:orgId
            }
            this.$api.getORGById(cnt,function (res) {
                if(res.data.rc == that.$util.RC.SUCCESS){
                    that.info = JSON.parse(res.data.c)
                    that.money = parseInt(that.info.bonus)*parseInt(shareAmount)
                }
            })

        }
    }
</script>

<style scoped lang="scss">
    .create-btn{
        width: 90%;
        height: 3rem;
        margin:0 auto;
        margin-top: 3rem;
        border-radius: 25px;
        background: rgb(125,177,253);
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }
    .main-box {
        background: #fff;
    }

    .box {
        width: 88%;
        height: 6rem;
        margin: 0 auto;
        margin-top: 1rem;
        border-radius: 5px;
        background: #fff;
        border-bottom: 1px solid #ddd;
    }

    .box-img {
        float: left;
        margin-left: 1rem;
        width: 6rem;
        height: 6rem;

    }

    .box-text {
        width: auto;
        height: 6rem;
        margin-left: 8rem;
        font-size: 1.4rem;
        color: #666;
        line-height: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;

    }

    .img-title {
        width: 6rem;
        height: 6rem;
    }

    .img-title i {
        width: 6rem;
        height: 6rem;
        font-size: 5rem;
        text-align: center;
        line-height: 6rem;
        color: #40c9c6;
    }

    .text-title {
        width: auto;
        height: 4rem;
        line-height: 5rem;
        font-size: 1.6rem;
        color: #666;
        font-weight: 600;
        text-align: left;
        padding-right: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .text {
        width: auto;
        height: 4rem;
        text-align: left;
        padding-right: 1rem;
        line-height: 2rem;
        font-size: 1.4rem;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;

    }

    .btn {
        width: 100%;
        height: 4rem;
        margin-top: 2rem;
        line-height: 4rem;
        text-align: center;
    }
    .money-box{
        position: relative;
        margin-left: 50%;
        margin-top: 50%;
        left: -7.5rem;
        top: -10rem;
        width: 15rem;
        height: 20rem;

    }
    .money-img{
        width: 10rem;
        height: 10rem;
        margin-left: 2.5rem;
        overflow: hidden;
    }
    .money-img img{
        width: 10rem;
        height: 10rem;
        overflow: hidden;
    }
    .money{
        color: #333;
        font-size: 3rem;
        width: 15rem;
        height: 5rem;
        line-height: 5rem;
        text-align: center;
        letter-spacing:3px;
    }
    .money-title{
        margin-top: 1rem;
        height: 2rem;
        color: #666;
        font-size: 1.4rem;
        text-align: center;
    }

</style>
