<template>
    <div >
        <div class="nav-box">
            <van-nav-bar :title="title" left-text="返回" left-arrow     @click-left="onClickLeft">

            </van-nav-bar>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headReturn",
        props:{
            title:String
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped lang="scss">
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
