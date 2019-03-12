<template>
    <div>
        <div class="nav-box">
            <van-nav-bar title="首页">
            </van-nav-bar>
        </div>
    </div>
</template>

<script>
    export default {
        name: "homeHeader",
        methods:{

        }
    }
</script>

<style scoped >
    .nav-box{
        width: 100%;
        position: fixed;
        top: 0;
        height: 4rem;
        z-index: 1000;
        border-bottom: 1px solid #ddd;
        background: #fff;
    }
</style>
