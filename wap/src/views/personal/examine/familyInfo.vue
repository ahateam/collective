<template>
    <div>
        <header-box title="分户审批详情"></header-box>
        <div class="main-box">
           <div class="content-box">
               <div class="title-box">
                   <span style="color: #63a35c;">原始家庭户信息</span>
               </div>
               <div class="list-box" >
                   <!--一个原始户都没-->
                   <div v-if="oldData.length == 0">
                       <div class="text-msg">
                           暂无原始家庭户信息
                       </div>
                   </div>
                   <!--多个原始户-->
                   <div v-else-if="Array.isArray(oldData[0])">
                       <div v-for="(item,index) in oldData">
                           <div class="text-msg" style="margin-top: .5rem">原始家庭户{{index+1}} : {{item[0].familyMaster}} </div>
                           <div v-for="(item1,index1) in item">
                               <div class="user-box">
                                   <div class="user-name">
                                       {{item1.realName}}
                                   </div>
                                   <div class="user-card">
                                       {{item1.idNumber}}
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <!--只有一个原始户-->
                   <div v-else>
                       <div class="text-msg" style="margin-top: .5rem">原始家庭户1: {{oldData[0].familyMaster}} </div>
                       <div v-for="(item,index) in oldData">
                           <div class="user-box">
                               <div class="user-name">
                                   {{item.realName}}
                               </div>
                               <div class="user-card">
                                   {{item.idNumber}}
                               </div>
                           </div>
                       </div>
                   </div>

               </div>
               <div class="title-box">
                   <span style="color: #f44">分户操作后家庭户信息</span>
               </div>
               <div class="list-box">
                    <div v-for="(item,index) in newData" :key="index">
                        <div class="text-msg" style="margin-top: .5rem">分户操作后家庭户{{index+1}}: {{item[0].familyMaster}} </div>
                        <div v-for="(item1,index1) in item " :key="index1">
                            <van-panel :title="nameFilter(item1)" :desc="numberFilter(item1)" :status="userTabFilter(item1)">
                            </van-panel>
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
        name: "familyInfo",
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
            nameFilter(item){
                let str = item.realName
                return str

            },
            numberFilter(item){
                let str = item.idNumber
                return str
            },
            userTabFilter(item){

                if(item.userTab === 0){
                    return '移出'
                }
                if(item.userTab === 1){
                    return '移入'
                }

                if(item.userTab == undefined || item.userTab === ''){
                    return ''
                }

            },
            eidtBtn(){
                let cnt = {
                    examineId: this.info.id, // Long 任务编号
                    orgId: JSON.parse(localStorage.getItem('user')).orgId, // Long 组织编号
                    status: 1, // Byte 状态
                }
                this.$api.editExamine(cnt,(res)=>{
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
            }
            this.oldData = JSON.parse(this.info.data).oldData
            this.newData = JSON.parse(this.info.data).newData
            let permissions = JSON.parse(localStorage.getItem('user')).permissions
            console.log(permissions)
            for(let i=0;i<permissions.length;i++){
                if(permissions[i].id == 104){
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
