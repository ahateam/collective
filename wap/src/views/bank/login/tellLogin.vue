<template>
    <div>
        <head-return title="选择账号"></head-return>
        <div class="main-box">
            <div class="title-box">
                <span style="color: #f60;font-weight: 600">{{tell}}</span>  选择登录账号：
            </div>
            <div class="list" v-for="(item,index) in list" :key="index" @click="pwdBtn(item)">
                <div class="list-name">
                    {{item.realName.substr(0,item.realName.length-1)}}*
                </div>
                <div class="list-card">
                    {{item.idNumber.substr(0,item.idNumber.length-6)}}******
                </div>
            </div>

            <div class="create-btn" @click="returnBtn">返回登录</div>
        </div>
        <van-dialog
                v-model="pwdShow"
                show-cancel-button
                @confirm="onConfirm"
                @cancel="onCancel"
                title="输入密码"
        >

            <van-field
                    v-model="pwd"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
            />
        </van-dialog>
    </div>
</template>

<script>
    import HeadReturn from '@/components/head/headReturn'
    import { Toast } from 'vant'
    export default {
        name: "tellLogin",
        components:{
            HeadReturn,
        },
        data(){
            return{
                tell:'',
                list:[],
                pwdShow:false,
                info:'',
                pwd:''
            }
        },
        methods:{
            pwdBtn(info){
                this.pwdShow =  true
                this.pwd = ''
                this.info=info
            },
            returnBtn(){
                this.$router.push('/login')
            },
            onCancel(){
                this.pwdShow = false
            },
            onConfirm(){
                console.log(this.info)
                if(this.pwd == ''){
                    Toast.fail({
                        duration:500,
                        message:'请输入密码'
                    })
                }else {
                    let cnt = {
                        userId: this.info.id,
                        pwd: this.pwd,
                    };
                    this.$bank.loginByUserId(cnt, (res)=> {
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            let data = this.$util.tryParseJson(res.data.c,{})
                            localStorage.setItem('userInfo',JSON.stringify(data))
                            Toast.success({
                                duration:500,
                                message:'登录成功'
                            })
                            this.$router.push('/bankChoose')
                        }else{
                            Toast.fail({
                                duration:500,
                                message:'登录失败'
                            })
                        }
                    })
                }

                this.pwdShow = false

            },
        },
        mounted(){
            this.tell = this.$route.params.tell
            if(this.tell == '' || this.tell == undefined){
                Toast.fail({
                    duration:500,
                    message:'手机号失效，重新输入'
                })
                this.$router.push('/bankLogin')
            }
            let count = 40
            let offset = 0

            let cnt = {
                mobile: this.tell, // String 手机号
                count: count, // Integer
                offset: offset, // Integer
            };
            this.$bank.getUsersByMobile(cnt, (res) =>{
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.list = this.$util.tryParseJson(res.data.c)
                }else{
                    this.list = []
                }

            })
        }
    }
</script>

<style scoped lang="scss">
    .list{
        padding: 1rem;
        height: 4rem;
        border-bottom: 1px solid #eee;
    }
    .title-box{
        width: auto;
        padding: 1rem;
        color: #333;
        font-size: 1.4rem;

    }
    .list-name{
        float: left;
        width:7rem;
        padding-left: 1rem;
        font-size: 1.6rem;
        color: #333;
        line-height: 4rem;
        height: 4rem;
    }
    .list-card{
        float: right;
        padding-right: 1rem;
        width: auto;
        height: 4rem;
        color: #666;
        line-height: 4rem;
        text-align: right;
        font-size: 1.6rem;
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
</style>
