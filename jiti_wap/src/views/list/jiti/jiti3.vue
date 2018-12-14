<template>
    <div>
        <header-box title="松林居杨村沟组"></header-box>
        <div class="main-box">
            <div class="box">
                <img src="../../../assets/image/jiti/yangcun/1.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/yangcun/2.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/yangcun/3.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/yangcun/4.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/yangcun/5.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/yangcun/6.png" alt="">
            </div>
            <div class="btn">
                <router-link to="/list">
                    <van-button  type="primary">返回资产列表</van-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "jiti2",
        components:{
            HeaderBox
        }
    }
</script>

<style scoped lang="scss">
    .main-box{
        background: rgb(240, 242, 245);
    }
    .box{
        width: 98%;
        margin: 0 auto;
        margin-top: 1rem;
    }
    .box img{
        margin:  0 auto;
        height: inherit;
        width: inherit;

    }
    .btn{
        width: 100%;
        height: 4rem;
        margin-top: 2rem;
        line-height: 4rem;
        text-align: center;
    }

</style>
