<template>
    <div>
        <header-box title="会议管理"></header-box>
        <div class="main-box">

            <router-link to="/mechInfo">
                <div class="list-box">
                    <div class="list-icon">
                        <i class="iconfont icon-biaoge"></i>
                    </div>
                    <div class="list-text">
                        组织基础信息
                    </div>
                </div>
            </router-link>
            <router-link to="/mechMoney">
                <div class="list-box" style="background: #4e9eca">
                    <div class="list-icon">
                        <i class="iconfont icon-biaoge"></i>
                    </div>
                    <div class="list-text">
                        组织资产信息
                    </div>
                </div>
            </router-link>
            <div class="create-btn" @click="returnBtn">切换组织</div>
            <div class="btn">
                <router-link to="/home">
                    <div class="create-btn1" >返回首页</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "mech",
        components:{
            HeaderBox
        },
        data(){
            return{
                info:'',
            }
        },
        methods:{
            returnBtn(){
                this.$router.push('/choose')
            }
        },
        mounted(){
        }
    }
</script>

<style scoped lang="scss">
    .main-box{
        background: #fff;
    }
    .item-box{
      padding: 10px 15px;
        text-align: left;
        line-height: 3rem;
        font-size: 1.4rem;
        line-height: 3rem;
        height: auto;
    }
    .item-title{
        width: auto;
    }
    .item-img {
        padding: 10px 15px;
        width: auto;
        height: 15rem;
    }
    .item-img img{
        width: 20rem;
        height: 15rem;
    }
    .create-btn{
        width: 90%;
        height: 3rem;
        margin:2rem auto;
        border-radius: 25px;
        background:rgb(244, 81, 108);
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }
    .create-btn1{
        width: 90%;
        height: 3rem;
        margin:1rem auto 3rem auto;
        border-radius: 25px;
        background:rgb(125,177,253);
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }
    .list-box{
        width: 90%;
        margin: 2rem auto 0 auto;
        height: 7rem;
        background: #eead1c;
        border-radius: 5px;

    }
    .list-icon{
        float: left;
        width: 7rem;
        height: 7rem;

    }
    .list-icon i{
        display: block;
        width: 7rem;
        height: 7rem;
        text-align: center;
        line-height: 7rem;
        color: #fff;
        font-size: 4rem;

    }
    .list-text{
        margin-left: 7rem;
        width: auto;
        height: 7rem;
        line-height: 7rem;
        color: #fff;
        font-size: 1.8em;
        text-align: left;
        letter-spacing:5px;
    }
</style>
