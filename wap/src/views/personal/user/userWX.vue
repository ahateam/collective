<template>
    <div>
        <header-box title="个人中心"></header-box>
        <div class="main-box">
            正在绑定微信用户信息...
            <p>code: {{codeStr}}</p>
            <p>
                {{wxUserInfo}}
            </p>
        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "userWX",
        components:{
            HeaderBox
        },
        data(){
            return{
                codeStr:'',
                wxUserInfo:''
            }
        },
        mounted(){
            this.codeStr = this.$route.params.code
            this.wxUserInfo =  this.$commen.getWXUserOpenId(this.$store.state.wxInfo.APPID,this.$store.state.wxInfo.SECRET,this.codeStr)
            console.log(this.wxUserInfo)
        }
    }
</script>

<style scoped>

</style>
