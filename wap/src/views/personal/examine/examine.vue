<template>
    <div>
        <header-box title="我的审批"></header-box>
        <div class="main-box">
            <van-tabs v-model="type" swipeable @change="changeTab">
                <van-tab title="分户审批">
                    <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多关于您的审批信息了"
                    @load="onLoad"
                    >
                    <div v-for="(item,index) in list" :key="index" @click="familyInfoBtn(item)">
                        <van-panel :title="titleFilter(item)" :desc="timeFilter(item)" :status="statusFilter(item)" >
                        </van-panel>
                    </div>
                    </van-list>
                </van-tab>
                <van-tab title="股权变更">
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多关于您的股权变更审批信息了"
                            @load="onLoad"
                    >
                        <div v-for="(item,index) in list" :key="index"  @click="shareInfoBtn(item)">
                            <van-panel :title="titleFilter(item)" :desc="timeFilter(item)" :status="statusFilter(item)">
                            </van-panel>
                        </div>
                    </van-list>
                </van-tab>
            </van-tabs>

            <div class="footer-box">
                <router-link to="/home">
                    <div class="create-btn" >返回首页</div>
                </router-link>
            </div>

        </div>

    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "examine",
        data(){
          return{

              type:0,
              count:10,
              offset:0,
              page:1,

              user:'',
              permission:[],
              loading:false,
              finished:false,

              list:[],

          }
        },
        components:{
            HeaderBox
        },
        methods:{
            getExamineByPer(cnt){
                this.$api.getExamineByPer(cnt,(res)=>{
                    let arr = []
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        arr = this.$util.tryParseJson(res.data.c)
                    }else{
                        arr = []
                    }
                   this.list =  this.list.concat(arr)

                    this.loading = false;

                    if(arr.length<this.count){
                        this.finished = true;
                    }
                    console.log(this.list)

                })
            },
            onLoad(){
                // 异步更新数据
                    setTimeout(() => {
                        this.page = this.page +1
                        let cnt = {
                            orgId: this.user.orgId, // Long 组织编号
                            userId: this.user.id, // Long 用户编号
                            permissionIds:this.permission, // String 用户角色
                            type: this.type+1, // Byte 查询的审核类型
                            count: this.count, // Integer
                            offset:(this.page-1)*this.count, // Integer
                        }
                        this.getExamineByPer(cnt)
                    }, 300);
            },
            titleFilter(item){
                if(this.type == 0){
                    let str = JSON.parse(item.data).newData[0][0].familyMaster
                    return '家庭户户主： '+str
                }else{
                    let str = JSON.parse(item.data).newData[0].user.realName
                    return '股权变更用户： '+str
                }

            },
            timeFilter(item){
                let timer = new Date(item.examineDate).toLocaleDateString()+ ' '+new Date(item.examineDate).toLocaleTimeString('chinese',{hour12:false})
                return '操作时间: ' +timer
            },
            statusFilter(item){
                for(let i=0;i<this.$constData.examineStatus.length;i++){
                    if(this.$constData.examineStatus[i].key == item.status){
                        return this.$constData.examineStatus[i].val
                    }
                }

            },
            changeTab(){
                this.page =1
                this.list = []
                console.log(this.type)
                let cnt = {
                    orgId: this.user.orgId, // Long 组织编号
                    userId: this.user.id, // Long 用户编号
                    permissionIds:this.permission, // String 用户角色
                    type: this.type+1, // Byte 查询的审核类型
                    count: this.count, // Integer
                    offset: this.offset, // Integer
                }
                this.getExamineByPer(cnt)
            },
            familyInfoBtn(item){

                this.$router.push({
                    path:'/familyInfo',
                    name:'familyInfo',
                    params:{
                        info:item
                    }
                })
            },
            shareInfoBtn(item){
                this.$router.push({
                    path:'/shareInfo',
                    name:'shareInfo',
                    params:{
                        info:item
                    }
                })
            }
        },
        mounted(){
            this.user = JSON.parse(localStorage.getItem('user'))
            let permissions = this.user.permissions
            console.log(this.user)
            for(let i=0;i<permissions.length;i++){
                this.permission.push(permissions[i].id)
            }

            let cnt = {
                orgId: this.user.orgId, // Long 组织编号
                userId: this.user.id, // Long 用户编号
                permissionIds:this.permission, // String 用户角色
                type: this.type+1, // Byte 查询的审核类型
                count: this.count, // Integer
                offset: this.offset, // Integer
            }
            this.getExamineByPer(cnt)

        }
    }
</script>

<style scoped lang="scss">
    .main-box{
        background: #fff;
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
