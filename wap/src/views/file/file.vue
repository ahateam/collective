<template>
    <div>
        <header-box title="文件管理"></header-box>
        <div class="main-box">
            <router-link to="/userFile">
                <div class="van-cell van-cell--center van-cell--borderless van-cell--clickable van-contact-card van-contact-card--add">
                    <i class="iconfont icon-renyuanleixing van-icon van-icon-add-square icon-box"></i>
                    <div class="van-cell__value van-cell__value--alone" style="margin-left: 2rem">成员导入</div>
                    <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                </div>
            </router-link>

            <router-link to="/formFile">
                <div class="van-cell van-cell--center van-cell--borderless van-cell--clickable van-contact-card van-contact-card--add">
                    <i class="iconfont icon-biaoge van-icon van-icon-add-square icon-box" style="color: rgb(54, 163, 247);"></i>
                    <div class="van-cell__value van-cell__value--alone" style="margin-left: 2rem">资产导入</div>
                    <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                </div>
            </router-link>



            <router-link to="/bonusFile">
                <div class="van-cell van-cell--center van-cell--borderless van-cell--clickable van-contact-card van-contact-card--add">
                    <i class="iconfont icon-fenhongjilu van-icon van-icon-add-square icon-box" style="color:rgb(244, 81, 108)"></i>
                    <div class="van-cell__value van-cell__value--alone" style="margin-left: 2rem">分红信息</div>
                    <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                </div>
            </router-link>

        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "file",
        components:{
            HeaderBox
        },
        data(){
            return{

            }
        },
        methods:{

        },
        mounted(){

        }

    }
</script>

<style scoped lang="scss">
    .main-box{
        width: 100%;
        height: 100%;
    }
    .icon-box{
        color: #40c9c6;
        font-size: 3rem;
    }

</style>
