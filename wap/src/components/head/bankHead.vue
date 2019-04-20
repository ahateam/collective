<template>
    <div >
        <div class="nav-box">
            <van-nav-bar :title="title">
                <van-icon name="wap-home" slot="right"  @click="onClickRight"/>
            </van-nav-bar>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bankHead",
        props:{
            title:String
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
            onClickRight(){
                this.$router.push('/bankHome')
            }
        }
    }
</script>

<style scoped>
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
