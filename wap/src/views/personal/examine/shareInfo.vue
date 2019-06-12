<template>
    <div>
        <header-box title="股权变更详情"></header-box>
        <div class="main-box">
            <div class="content-box" v-if="oldData != ''">
                <div class="title-box">
                    <span style="color: #63a35c;">原始用户信息</span>
                </div>
                <div class="list-box">
                    <div class="user-box">
                        <div class="user-name">
                            姓名
                        </div>
                        <div class="user-card">
                        {{oldData.user.realName}}
                        </div>

                    </div>
                    <div class="user-box">
                        <div class="user-name">
                            身份证
                        </div>
                        <div class="user-card">
                            {{oldData.user.idNumber}}
                        </div>
                    </div>
                    <div class="user-box">
                        <div class="user-name">
                            手机号
                        </div>
                        <div class="user-card">
                            {{oldData.user.mobile}}
                        </div>
                    </div>
                    <div class="user-box">
                        <div class="user-name">
                            股份数
                        </div>
                        <div class="user-card">
                            <span style="color: #63a35c;">    {{oldData.orgUser.shareAmount}}</span>
                        </div>
                    </div>
                </div>
                <div class="title-box">
                    <span style="color: #f44;">股权变更后用户信息</span>
                </div>
                <div class="list-box">
                    <div class="user-box">
                        <div class="user-name">
                            姓名
                        </div>
                        <div class="user-card">
                            {{newData.user.realName}}
                        </div>

                    </div>
                    <div class="user-box">
                        <div class="user-name">
                            身份证
                        </div>
                        <div class="user-card">
                            {{newData.user.idNumber}}
                        </div>
                    </div>
                    <div class="user-box">
                        <div class="user-name">
                            手机号
                        </div>
                        <div class="user-card">
                            {{newData.user.mobile}}
                        </div>
                    </div>
                    <div class="user-box">
                        <div class="user-name">
                            股份数
                        </div>
                        <div class="user-card">
                            <span style="color: #f44;">    {{newData.orgUser.shareAmount}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-box">

                <van-button type="primary" v-if="isEdit" @click="eidtBtn" >审批通过</van-button>

                <router-link to="/examine">
                    <van-button type="primary" plain  style="margin-left: 2rem">返回上页</van-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant'
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "shareInfo",
        components:{
            HeaderBox
        },
        data(){
            return{
                info:'',
                oldData:[],
                newData:[],
                isEdit:false
            }
        },
        methods:{
            eidtBtn(){
                let cnt = {
                    examineId: this.info.id, // Long 任务编号
                    orgId: JSON.parse(localStorage.getItem('user')).orgId, // Long 组织编号
                    status: 1, // Byte 状态
                }
                this.$api.examineShareCerNo(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        Toast.success('审批成功，请等待区级审批')
                    }else{
                        Toast.fail('操作失败')
                    }
                    this.$router.push('/examine')
                })
            }
        },
        mounted(){
            this.info = this.$route.params.info
            if(this.info == '' || this.info == undefined){
                Toast.fail('信息失效，重新选择')
                this.$router.push('/examine')
            }else{
                this.oldData = JSON.parse(this.info.data).oldData[0]
                this.newData = JSON.parse(this.info.data).newData[0]
                console.log(this.newData)
            }

            let permissions = JSON.parse(localStorage.getItem('user')).permissions
            for(let i=0;i<permissions.length;i++){
                if(permissions[i].id == 105){
                    this.isEdit = true
                }
            }
        }

    }
</script>

<style scoped lang="scss">
    .main-box{
        background: #fff;
    }
    .title-box{
        margin-top: 1rem;
        width: auto;
        height: 2.5rem;
        color: #666;
        font-size: 1.6rem;
        line-height: 2.5rem;
    }
    .content-box{
        width: 94%;
        margin: 0 auto;
    }
    .list-box{

        border-bottom: 1px solid #eee;
        padding: 1rem;
        box-shadow: 0px 4px 8px rgba(0,0,0,0.08);
    }
    .text-msg{
        font-size: 1.4rem;
        color: #666;
        line-height: 2rem;
    }
    .user-box{
        border-bottom: 1px;
        width: auto;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #666;
    }
    .user-name{
        float: left;
        width: 30%;
        height: 3rem;
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .user-card{
        float: left;
        width: 70%;
        height: 3rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-align: center;
    }
    .footer-box{
        width: 94%;
        margin: 0 auto;
        padding: 2rem 0;
        text-align: center;
    }
</style>
