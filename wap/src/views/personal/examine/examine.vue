<template>
    <div>
        <header-box title="我的审批"></header-box>
        <div class="main-box">
            <van-tabs v-model="type" swipeable>
                <van-tab title="分户申请">内容 1</van-tab>
                <van-tab title="股权变更">内容 1</van-tab>
            </van-tabs>
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
          }
        },
        components:{
            HeaderBox
        },
        methods:{

        },
        mounted(){
            let user = JSON.parse(localStorage.getItem('user'))
            let permission = JSON.parse(localStorage.getItem('permission'))
            console.log(user)

            let cnt = {
                orgId: user.orgId, // Long 组织编号
                userId: user.id, // Long 用户编号
                roles: user.orgRoles, // String 用户角色
                type: this.type+1, // Byte 查询的审核类型
                count: this.count, // Integer
                offset: this.offset, // Integer
            }
            this.$api.getExamineByPer(cnt,(res)=>{
                console.log(JSON.parse(res.data.c))
            })
        }
    }
</script>

<style scoped lang="scss">
    .main-box{
        background: #fff;
    }
</style>
