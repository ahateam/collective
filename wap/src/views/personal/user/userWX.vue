<template>
    <div>
        <header-box title="个人中心"></header-box>
        <div class="main-box">
            正在绑定微信用户信息...

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
            let data = ''
            let arr = []
            let info = window.location.href
            if(info.indexOf('code') >-1){
                data = info.substr(info.indexOf('code'))
                arr = data .split('&')
                this.codeStr = arr[0]
                this.codeStr = this.codeStr.substr(this.codeStr.indexOf('=')+1)
                this.wxUserInfo =  this.$commen.getWXUserOpenId(this.$store.state.wxInfo.APPID,this.$store.state.wxInfo.SECRET,this.codeStr)



            }







        }
    }
</script>

<style scoped>

</style>
