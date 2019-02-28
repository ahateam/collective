<template>
    <div>
        <header-box title="公告详情"></header-box>
        <div class="main-box">
            <div class="title">
                阿萨大苏打阿萨大啊实打实sadsdasda sd
                啊实打实大苏打实打实的阿萨大
            </div>
            <div class="content">
                <p>asasdasddasdasdsad阿萨大苏打阿萨大阿萨大阿萨大阿萨大苏打啊实打实addasasdasdsadsdsdsdsadsdsdsssdsdsdddsd按时大撒大撒阿萨大阿萨大阿萨大
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'

    export default {
        name: "articleInfo",
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
    .title{
        width: auto;
        padding: 1rem;
        border-bottom: 1px solid #eee;
        font-size: 1.4rem;
        color: #555;
        line-height: 2rem;
    }
    .content{
        width: 90%;

        margin: 0 auto;
        margin-top: 1rem;
        font-size: 1.4rem;
        color: #666;
        overflow: hidden;
        line-height: 2rem;
    }
</style>
