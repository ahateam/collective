<template>
    <div>
        <header-box title="我的公告"></header-box>
        <div class="main-box">
                <div class="notice-title">
                    <p>
                        {{info.title}}
                    </p>
                    <p style="font-size: 1.2rem;text-align: right;margin-top: .5rem">
                        {{ new Date(info.createTime).toLocaleDateString()+ ' '+ new Date(info.createTime).toLocaleTimeString('chinese',{hour12:false})}}
                    </p>
                </div>
            <div class="content">
                {{info.content}}
            </div>
            <div class="footer-box">
                <router-link to="/noticeList">
                    <div class="create-btn" >返回上一页</div>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "noticeInfo",
        components:{
            HeaderBox
        },
        data(){
            return{
                info:''
            }
        },
        mounted(){
            this.info = this.$route.params.info
            if(this.info == undefined || this.info == ''){
                Toast.fail('信息失效，请重新选择')
                this.$router.push('noticeList')
            }
            console.log(this.info)
        }

    }
</script>

<style scoped lang="scss">
    p{
        margin: 0;
        padding: 0;
    }
    .main-box {
        background: #fff;
    }
    .notice-title{
        width: auto;
        line-height: 2.5rem;
        color: #666;
        padding: 1rem 1rem 0 1rem;
        border-bottom: 1px solid #eee;
        font-size: 1.6rem;

    }
    .content{
        width: auto;
        padding: 1rem;
        font-size: 1.4rem;
        color: #666;
        line-height: 2rem;
    }

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
    .footer-box{
        width: auto;

        margin: 0 auto;
        text-align: center;
    }
</style>
