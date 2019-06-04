<template>
    <div>
        <header-box title="我的消息"></header-box>
        <div class="main-box">
            <router-link to="/newsInfo">
                <van-button type="primary">跳转</van-button>
            </router-link>

        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "news",
        components:{
            HeaderBox
        }
    }
</script>

<style scoped lang="scss">
    .main-box{
        background: #fff;
    }
</style>
