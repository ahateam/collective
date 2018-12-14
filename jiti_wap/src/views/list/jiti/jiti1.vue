<template>
    <div>
        <header-box title="松林居黄莲组"></header-box>
        <div class="main-box">


            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/1.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/2.png" alt="">
            </div>

            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/3.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/4.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/5.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/6.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/7.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/8.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/9.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/10.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/11.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/12.png" alt="">
            </div>

            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/13.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/14.png" alt="">
            </div>
            <div class="box">
                <img src="../../../assets/image/jiti/huanglian/15.png" alt="">
            </div>

            <div class="btn">
                <router-link to="/list">
                    <van-button type="primary">返回资产列表</van-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'

    export default {
        name: "jiti1",
        components: {
            HeaderBox
        }
    }
</script>

<style scoped lang="scss">
    .main-box {
        background: rgb(240, 242, 245);
    }

    .box {
        width: 98%;
        margin: 0 auto;
        margin-top: 1rem;
    }

    .box img {
        margin: 0 auto;
        height: inherit;
        width: inherit;

    }

    .btn {
        width: 100%;
        height: 4rem;
        margin-top: 2rem;
        line-height: 4rem;
        text-align: center;
    }

</style>
