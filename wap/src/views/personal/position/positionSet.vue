<template>
    <div>
        <header-box title="修改职务"></header-box>
        <div class="main-box">
           <div v-if="userPosition !=''">
               <van-cell-group>
                   <van-field
                           v-model="userPosition.user.realName"
                           type="text"
                           label="姓名"
                           style="border-bottom: 1px solid #ddd"
                           disabled
                   />
               </van-cell-group>
               <van-cell-group>
                   <van-field
                           v-model="userPosition.user.idNumber"
                           type="text"
                           label="身份证号"
                           style="border-bottom: 1px solid #ddd"
                           disabled
                   />
               </van-cell-group>
               <van-cell-group>
                   <van-field
                           v-model="userPosition.user.mobile"
                           type="text"
                           label="手机号码"
                           style="border-bottom: 1px solid #ddd"
                           disabled
                   />
               </van-cell-group>
               <div class="box-title">
                   职务信息
               </div>
               <van-checkbox-group v-model="role">
                   <van-cell-group>
                       <van-cell
                               v-for="(item, index) in roleList"
                               clickable
                               :key="index"
                               :title="`${item.name}`"
                               @click="toggle(index)"
                       >
                           <van-checkbox :name="item.roleId" ref="checkboxes" />
                       </van-cell>
                   </van-cell-group>
               </van-checkbox-group>
           </div>
            <div class="create-btn" @click="btn">提交修改</div>
            <div class="create-btn" @click="returnBtn">返回上一页</div>
        </div>


    </div>
</template>

<script>
    import { Toast } from 'vant'
    import HeaderBox from '@/components/head/headerBox'
    export default {
        name: "position",
        components:{
            HeaderBox
        },
        data(){
            return{
                userPosition:'',
                roleList:[],
                role:[],
                info:''
            }
        },
        methods:{
            editORGUser(cnt){
              this.$api.editORGUser(cnt,(res)=>{
                  if(res.data.rc == this.$util.RC.SUCCESS){
                      Toast.success('修改职务成功')
                  }else{
                      Toast.fail('修改职务失败')
                  }
              })
            },

            toggle(index) {
                this.$refs.checkboxes[index].toggle();
            },
            returnBtn(){
              this.$router.push('/position')
            },
            btn(){
                console.log(this.role)
                let cnt = {
                    orgId:    this.userPosition.orgUser.orgId, // Long 组织编号
                    userId:  this.userPosition.orgUser.userId, // Long 用户编号
                    address: this.userPosition.orgUser.address, // String 地址
                    shareCerNo: this.userPosition.orgUser.shareCerNo, // String 股权证书编号
                    shareCerImg:'无', // String 股权证书图片地址
                    shareCerHolder: this.userPosition.orgUser.shareCerHolder, // Boolean 是否持证人
                    shareAmount:  this.userPosition.orgUser.shareAmount, // Integer 股份数
                    weight:  this.userPosition.orgUser.weight, // Integer 选举权重
                    roles: this.role, // Array 角色（股东，董事长，经理等）
                    groups: this.userPosition.orgUser.groups,
                    tags: this.userPosition.orgUser.tags, // JSONObject 标签，包含groups,tags,以及其它自定义分组标签列表
                    familyNumber: this.userPosition.orgUser.familyNumber,
                    familyMaster:this.userPosition.orgUser.familyMaster,
                }
                this.editORGUser(cnt)
            },
        },
        mounted(){




            this.userPosition =JSON.parse( localStorage.getItem('userPosition'))
            console.log(this.userPosition)
            this.$api.getSysORGUserRoles({},(res)=>{
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.roleList = this.$util.tryParseJson(res.data.c)
                }else{
                    this.roleList = []
                }
            })
            this.role = JSON.parse(this.userPosition.orgUser.roles)






        }
    }
</script>

<style scoped lang="scss">
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
    .main-box{
        width: 100%;
        height: 100%;
    }
    .search-box{
        margin: 0 auto;
    }
    .box-title{
        width: 90%;
        height: 3rem;
        margin: 0 auto;
        margin-top: 1rem;
        line-height: 3rem;
        font-size: 1.4rem;
        font-weight: 600;
        border-left: 4px solid rgb(54, 163, 247);
        padding-left: 1rem;

    }


</style>
