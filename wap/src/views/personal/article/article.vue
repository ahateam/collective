<template>
    <div>
        <header-box title="通知公告"></header-box>
        <div class="main-box">
           <router-link to="/articleInfo">
               <div class="list-box">
                   阿萨大苏打阿萨大啊实打实sadsdasda sd
                   啊实打实大苏打实打实的阿萨大
               </div>
           </router-link>

        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'

    export default {
        name: "article",
        data() {
            return {

            }
        },
        components: {
            HeaderBox
        },

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
    .list-box{
        width: 90%;
        padding: 1rem;
        border-radius: 5px;
        border: 1px solid #eee;
        margin: 0 auto;
        margin-top: 1rem;
        font-size: 1.4rem;
        color: #666;
        line-height: 2rem;
    }
</style>
