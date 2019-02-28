<template>
    <div>
        <home-header></home-header>
        <div class="main-box">
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
                <span v-else>
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
    export default {
        name: "home",
        components:{
            HomeHeader
        },
        data(){
          return{
            orgList:[],

          }
        },
        methods:{
            chooseBtn(orgid){
                let that = this
                let userId = JSON.parse(localStorage.getItem('userInfo')).id

                let cnt = {
                    orgId: orgid,
                    userId: userId,
                };
                this.$api.loginInORG(cnt,function (res) {
                    let user = res.data.c
                    localStorage.setItem('orgInfo',user)
                    that.$router.push('/home')
                })




            },
            returnBtn(){
                localStorage.clear()
                this.$router.push('/login')
            }
        },
        mounted(){
            let that = this
            let userId = JSON.parse(localStorage.getItem('userInfo')).id
            let cnt = {
                userId: userId,
            };

            this.$api.getUserORGs(cnt,function (res) {
                that.orgList = JSON.parse(res.data.c)
                console.log( that.orgList )
            })


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
