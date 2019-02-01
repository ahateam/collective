<template>
    <div>
        <header-box title="修改职务"></header-box>
        <div class="main-box">
           <div v-if="this.info != '' && this.info != undefined">
               <van-cell-group>
                   <van-field
                           v-model="userPosition.realName"
                           type="text"
                           label="姓名"
                           style="border-bottom: 1px solid #ddd"
                           disabled
                   />
               </van-cell-group>
               <van-cell-group>
                   <van-field
                           v-model="userPosition.idNumber"
                           type="text"
                           label="身份证号"
                           style="border-bottom: 1px solid #ddd"
                           disabled
                   />
               </van-cell-group>
               <van-cell-group>
                   <van-field
                           v-model="info.weight"
                           type="text"
                           label="权重值"
                           style="border-bottom: 1px solid #ddd"
                           disabled
                   />
                   <van-field
                               v-model="info.shareAmount"
                               type="text"
                               label="股份数"
                               style="border-bottom: 1px solid #ddd"
                               disabled
                       />
               </van-cell-group>
               <div class="box-title">
                   职务信息
               </div>
               <van-cell-group>
                   <van-field
                           v-model="share"
                           type="text"
                           label="是否股东"
                           style="border-bottom: 1px solid #ddd"
                           @click="shareShow=true"
                   />
                   <van-field
                           v-model="duty"
                           type="text"
                           label="是否董事"
                           style="border-bottom: 1px solid #ddd"
                           @click="dutyShow = true"
                   />
                   <van-field
                           v-model="visor"

                           type="text"
                           label="是否监事"
                           style="border-bottom: 1px solid #ddd"
                           @click="visorShow = true"

                   />
               </van-cell-group>
           </div>
            <div class="create-btn" @click="btn">完成修改</div>
            <div class="create-btn" @click="returnBtn">返回上一页</div>
        </div>

        <van-popup v-model="shareShow" position="bottom" :overlay="true">
            <van-picker
                    show-toolbar
                    title="是否股东"
                    :columns="shareData"
                    @cancel="shareCancel"
                    @confirm="shareConfirm"
            />
        </van-popup>
        <van-popup v-model="dutyShow" position="bottom" :overlay="true">
            <van-picker
                    show-toolbar
                    title="是否董事"
                    :columns="dutyData"
                    @cancel="dutyCancel"
                    @confirm="dutyConfirm"
            />
        </van-popup>
        <van-popup v-model="visorShow" position="bottom" :overlay="true">
            <van-picker
                    show-toolbar
                    title="是否监事"
                    :columns="visorData"
                    @cancel="visorCancel"
                    @confirm="visorConfirm"
            />
        </van-popup>
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
                shareShow:false,    //显示股东的下拉框
                dutyShow:false,
                visorShow:false,
                info:'',
                searchData:'',
                list:[],
                share:'',
                duty:'',
                visor:'',
                shareData:['非股东','股东','股东代表'],
                dutyData:['非董事','董事','董事长','副董事长'],
                visorData:['非监事','监事','监事长','副监事长']
                // shareData:[{key:'20',value:'非股东'}, {key:'21',value:'股东'}, {key:'22',value:'股东代表'}],
                // dutyData:[{key:'10',value:'非董事'}, {key:'11',value:'董事'}, {key:'12',value:'董事长'}, {key:'13',value:'副董事长'}],
                // visorData:[{key:'10',value:'非监事'}, {key:'11',value:'监事'}, {key:'12',value:'监事长'}, {key:'13',value:'副监事长'}],

            }
        },
        methods:{
            returnBtn(){
              this.$router.push('/position')
            },
            btn(){
                let that = this
                let shareKey = ''
                let dutykey = ''
                let visorKey = ''
                if(this.share == '非股东'){
                    shareKey = '20'
                }else if(this.share == '股东'){
                    shareKey = '21'
                }else if(this.share == '股东代表'){
                    shareKey = '22'
                }

                if(this.duty =='非董事'){
                    dutykey = '10'
                }else if(this.duty == '董事'){
                    dutykey = '11'
                }else if(this.duty == '董事长'){
                    dutykey = '12'
                }else if(this.duty == '副董事长'){
                    dutykey = '13'
                }
                if(this.visor =='非监事'){
                    visorKey = '10'
                }else if(this.visor == '监事'){
                    visorKey = '11'
                }else if(this.visor == '监事长'){
                    visorKey = '12'
                }else if(this.visor == '副监事长'){
                    visorKey = '13'
                }

                console.log(this.info)
                let cnt = {
                    orgId:this.info.orgId,
                    userId:this.info.userId,
                    share:shareKey,
                    shareAmount:this.info.shareAmount,
                    weight:this.info.weight,
                    duty:dutykey,
                    visor:visorKey
                }
                console.log(cnt)
                this.$util.call('/org/editORGUser',cnt,function (res) {
                    console.log(res)
                     if(res.data.rc == that.$util.RC.SUCCESS){
                         Toast.success({
                             duration:1000,
                             message:'修改成功'
                         })
                     }else{
                         Toast.fail({
                             duration:1000,
                             message:'修改失败'
                         })
                     }
                })

            },
            shareCancel(){
                this.shareShow = false
             },
            shareConfirm(value){
                this.share  = value
                this.shareShow = false
            },
            dutyCancel(){
                this.dutyShow = false
            },
            dutyConfirm(value){
                this.duty = value
                this.dutyShow = false
            },
            visorCancel(){
                this.visorShow = false
            },
            visorConfirm(value){
                this.visor = value
                this.visorShow = false
            },
        },
        mounted(){

            let that = this
            this.userPosition =JSON.parse( localStorage.getItem('userPosition'))
            let cnt = {
                orgId: JSON.parse(localStorage.getItem('user')).orgId, // Long 组织编号
                userId: this.userPosition.id, // Long 用户编号
            };
            console.log(this.userPosition)

            this.$util.call('/org/getORGUserById',cnt,function (res) {
                that.info = JSON.parse(res.data.c)
                if(that.info == '' || that.info == undefined){
                    Toast.fail({
                        duration:500,
                        message:'信息失效'
                    })
                    that.$router.push('/position')
                }
                console.log(that.info)
                if(that.info.share == '20'){
                    that.share = '非股东'
                }else if(that.info.share == '21'){
                    that.share ='股东'
                }else if(that.info.share == '22'){
                    that.share = '股东代表'
                }

                if(that.info.duty =='10'){
                    that.duty = '非董事'
                }else if(that.info.duty == '11'){
                    that.duty = '董事'
                }else if(that.info.duty == '12'){
                    that.duty = '董事长'
                }else if(that.info.duty == '13'){
                    that.duty = '副董事长'
                }
                if(that.info.visor =='10'){
                    that.visor = '非监事'
                }else if(that.info.visor == '11'){
                    that.visor = '监事'
                }else if(that.info.visor == '12'){
                    that.visor = '监事长'
                }else if(that.info.visor == '13'){
                    that.visor = '副监事长'
                }




            })





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
