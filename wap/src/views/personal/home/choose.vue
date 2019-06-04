<template>
    <div>
        <home-header></home-header>
        <div class="main-box">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多可选的组织机构了"
                    @load="onLoad"
            >

                <span v-if="orgList.length>0">
                    <span v-for="(item,index) in orgList" :key="index" @click="chooseBtn(item.id)">
                        <div class="nav-box" >
                            <div class="nav-title">
                              {{item.name}}
                            </div>
                            <div class="nav-line">
                            </div>
                            <div class="nav-content">
                             {{item.address}}
                            </div>
                        </div>
                    </span>
               </span>

            </van-list>

                <span v-if="orgList.length==0">
                    <p style="padding: 15px;font-size: 1.6rem;color: #666;">
                        您还没有加入一个组织哟，请联系当地机构管理员申请加入哟
                    </p>
                    <div style="width: 100%;text-align: center;margin-top: 4rem;">
                        <van-button type="danger" @click="returnBtn">退 出 系 统</van-button>
                    </div>
                </span>

        </div>
    </div>
</template>

<script>
    import HomeHeader from '@/components/head/homeHeader'
    import { Toast } from 'vant';

    export default {
        name: "home",
        components:{
            HomeHeader
        },
        data(){
          return{
              orgList:[],
              offset:0,
              count:10,
              page:1,
              // pageOver:false,
              loading: false,
              finished: false

          }
        },
        methods:{
            //ajax请求层
            //根据用户id请求组织列表+分页
           getUserORGs(cnt){
              this.$api.getUserORGs(cnt,(res)=>{
                  let data = []
                  if(res.data.rc == this.$util.RC.SUCCESS){
                      data = this.$util.tryParseJson(res.data.c)
                  }else{
                      data = []
                  }
                  this.orgList = this.orgList.concat(data)
                  if(data.length <this.count){
                      this.finished = true
                  }
              })
            },
            loginInORG(cnt){
                this.$api.loginInORG(cnt,(res)=>{
                    console.log(JSON.parse(res.data.c))
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        let user = res.data.c
                        localStorage.setItem('orgInfo',user)
                        let userInfo = this.$util.tryParseJson(res.data.c)
                        let arr = []

                        for(let i=0;i<userInfo.permissions.length;i++){
                            arr.push(userInfo.permissions[i].id)
                        }

                        localStorage.setItem('permission',JSON.stringify(arr))

                        this.$router.push('/home')
                    }else{
                        Toast.fail({
                            duration:200,
                            message:'选择失败'
                        })
                    }
                })
            },
            //普通事件层
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                   if(this.finished == false){
                       this.page = this.page+1
                       let cnt={
                           offset:(this.page-1)*this.count,
                           count:this.count,
                           userId: JSON.parse(localStorage.getItem('userInfo')).id,
                           level:4,
                       }
                       this.getUserORGs(cnt)
                       // 加载状态结束
                       this.loading = false
                   }else{
                       this.loading = false
                   }
                }, 300);
            },
            chooseBtn(orgid){
                let userId = JSON.parse(localStorage.getItem('userInfo')).id
                let cnt = {
                    orgId: orgid,
                    userId: userId,
                };
                this.loginInORG(cnt)
            },
            returnBtn(){
                localStorage.clear()
                this.$router.push('/login')
            }
        },
        mounted(){
            let userId = JSON.parse(localStorage.getItem('userInfo')).id
            let cnt = {
                offset:this.offset,
                count:this.count,
                userId: userId,
                level:4
            }
            this.getUserORGs(cnt)

        }

    }

</script>

<style scoped lang="scss">
  .nav-box{
      width: 80%;
      height: 10rem;
      margin: 40px auto;
      background: #40c9c6;
      border-radius: 5px;
  }
    .nav-title{
        width: auto;

        padding: 0 1rem;
        padding-top: 1rem;
        color: #fff;
        line-height: 2rem;
        font-size: 1.6rem;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
    .nav-line{
        width: 3rem;
        height: 4px;
        margin-top: 1rem;
        margin-left: 1rem;
        background: #fff;

    }
    .nav-content{
        width: auto;
        height: 2rem;
        margin-top: .5rem;
        padding: 0 1rem;
        line-height: 2rem;
        font-size: 1.2rem;
        color: #fff;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

</style>
