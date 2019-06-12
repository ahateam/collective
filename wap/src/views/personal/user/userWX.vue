<template>
    <div>
        <header-box title="个人中心"></header-box>
        <div class="main-box">
            <p >
               <span style="font-size: 1.6rem;color: #666;text-align: center">正在绑定微信用户信息...</span>
            </p>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "userWX",
        components:{
            HeaderBox
        },
        data(){
            return{
                codeStr:'',
                info:''
            }
        },
        methods:{
            bdUserOpenId(openId){
                let cnt = {
                    userId: JSON.parse(localStorage.getItem('user')).id, // Long 用户编号
                    openId: openId, // String 微信id
                }
                this.$api.bdUserOpenId(cnt,(res)=>{

                    if(res.data.rc == this.$util.RC.SUCCESS){
                        let userInfo = JSON.parse(localStorage.getItem('user'))

                        userInfo.openId=JSON.parse(res.data.c).wxOpenId
                        localStorage.setItem('user',JSON.stringify(userInfo))
                        Toast.success('绑定成功')
                    }else{
                        Toast.fail('绑定失败,一个微信号只能绑定一个用户')
                    }
                    this.$router.push('/user')
                })
            }
        },
        mounted(){
            this.codeStr = this.$route.params.code

            if(this.codeStr != ''){
                let cnt={
                    code:this.codeStr
                }
                this.$api.getAccessToken(cnt,(res)=>{
                    console.log(res)
                    if(res.data.rc == this.$util.RC.SUCCESS){
                            this.info = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.info = ''
                    }
                    if(this.info != ''){
                        this.bdUserOpenId(this.info.openId)
                    }

                })
            }

            // this.wxUserInfo =  this.$commen.getWXUserOpenId(this.$store.state.wxInfo.APPID,this.$store.state.wxInfo.SECRET,this.codeStr)
            // console.log(this.wxUserInfo)

        }
    }
</script>

<style scoped>

</style>
