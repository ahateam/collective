<template>
    <div>
        <header-box title="我的公告"></header-box>
        <div class="main-box">
            <div class="list">
                <div class="list-item"
                     v-for="(item,index) in list"
                     :key="index"
                     @click="infoBtn(item)">
                    <span style="color: #f44;font-size: 2.5rem">·</span>  {{item.title}}
                </div>
            </div>
            <!--<van-list-->
                    <!--v-model="loading"-->
                    <!--:finished="finished"-->
                    <!--finished-text="没有更多公告了"-->
                    <!--@load="onLoad"-->
            <!--&gt;-->

            <!--</van-list>-->
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
        name: "noticeList",
        components:{
            HeaderBox
        },
        data(){
          return{
              userInfo:'',
              // count:10,
              // offset:0,
              // page:1,
              list:[],
              loading: false,
              finished: false
          }
        },
        methods:{
            getNoticeByRoleGroup(cnt){
                this.$api.getNoticeByRoleGroup(cnt,(res)=>{
                    let arr = []
                    if(res.data.rc == this.$util.RC.SUCCESS){
                       arr = this.$util.tryParseJson(res.data.c)
                    }else{
                        arr = []
                    }
                    this.list = this.list.concat(arr)
                    // this.loading = false;
                    // if(arr.length<this.count){
                    //     this.finished = true;
                    // }
                })
            },
            // onLoad() {
            //     // 异步更新数据
            //     setTimeout(() => {
            //         this.page = this.page +1
            //         let cnt = {
            //             orgId: this.userInfo.orgId, // Long 组织编号
            //             roles: this.userInfo.orgRoles, // String 角色编号 [102,103,104]
            //             groups: this.userInfo.groups, // String 分组编号 [1111111,555555,111]
            //             count: this.count, // Integer
            //             offset: (this.page-1)*this.count, // Integer
            //         }
            //         this.getNoticeByRoleGroup(cnt)
            //     }, 300);
            // },
            infoBtn(item){
                this.$router.push({
                    path:'/noticeInfo',
                    name:'noticeInfo',
                    params:{
                        info:item
                    }
                })
            }
        },
        mounted(){
            this.userInfo = JSON.parse(localStorage.getItem('orgInfo'))
            let groups =[]
            if(this.userInfo.groups == undefined || this.userInfo.groups=='' ||this.userInfo.groups.length ==0){
                groups[0] =102
            }else{
                groups = this.userInfo.groups
            }
            let cnt = {
                orgId: this.userInfo.orgId, // Long 组织编号
                roles: this.userInfo.orgRoles, // String 角色编号 [102,103,104]
                groups: groups, // String 分组编号 [1111111,555555,111]
                // count: this.count, // Integer
                // offset: this.offset, // Integer
            }

            this.getNoticeByRoleGroup(cnt)
        }
    }
</script>

<style scoped lang="scss">
    .main-box {
        background: #fff;
    }
    .list{
        width: 95%;
        margin: 0 auto;
    }
    .list-item{
        margin-top: 1.5rem;
        width: auto;
        font-size: 1.6rem;
        color: #666;
        line-height: 2.5rem;
        border-bottom: 1px solid #eee;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
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
