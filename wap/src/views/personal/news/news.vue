<template>
    <div>
        <header-box title="我的消息"></header-box>
        <div class="main-box">
            <van-tabs v-model="changePermission">
                <van-tab title="分户审批">内容 1</van-tab>
                <van-tab title="股权变更">内容 2</van-tab>
            </van-tabs>


            <router-link to="/newsInfo">
                <van-button type="primary">跳转</van-button>
            </router-link>

        </div>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "news",
        components:{
            HeaderBox
        },
        data(){
          return{
              //分页所需
              offset:0,
              count:10,
              page:1,
              pageOver:false,

              changePermission:0,
              permissionId:0,

              userInfo:'',

          }
        },
        mounted(){
            let userInfo = JSON.parse(localStorage.getItem('user'))
            console.log(userInfo)
            let cnt = {
                orgId: userInfo.orgId, // Long 组织编号
                userId: us, // Long 用户编号
                roles: roles, // String 用户角色
                type: type, // Byte 查询的审核类型
                status: status, // Byte <选填> 审核状态
                count: count, // Integer
                offset: offset, // Integer
            };


        }
    }
</script>

<style scoped lang="scss">
    .main-box{
        background: #fff;
    }
</style>
