<template>
    <div>
        <header-box title="会议信息"></header-box>
        <div class="main-box">
            <div class="box">
                <van-cell-group>
                    <van-field
                            v-model="title"
                            label="会议名称"
                            type="textarea"
                            placeholder="请输入会议名称"
                            autosize
                    />
                    <van-field
                            v-model="text"
                            label="会议内容"
                            type="textarea"
                            placeholder="请输入会议内容"
                            autosize
                    />
                    <van-field
                            v-model="startDate"
                            label="开始时间"
                            type="textarea"
                            placeholder="请选择会议开始时间"
                            autosize
                            @click="startTimeShow = true"
                    />
                    <van-field
                            v-model="endDate"
                            label="截至时间"
                            type="textarea"
                            placeholder="请选择会议截止时间"
                            autosize
                            @click="showEndTime"
                    />
                </van-cell-group>

                <div class="create-btn" @click="subBtn" v-if="isCreate == 1">
                  确认创建
                </div>
                <div class="create-btn" @click="editBtn" v-if="isCreate == 0">
                    确认修改
                </div>
                <div class="create-btn1" @click="returnBtn" v-if="isCreate == 0">
                    取消
                </div>
            </div>
        </div>


        <van-popup v-model="startTimeShow" position="bottom" :overlay="true">
            <van-datetime-picker
                    v-model="startTime"
                    :min-date="minDate"
                    @confirm="confirmStartBtn"
                    @cancel="cancelStartBtn"
            />
        </van-popup>
        <van-popup v-model="endTimeShow" position="bottom" :overlay="true">
            <van-datetime-picker
                    v-model="endTime"
                    :min-date="startTime"
                    @confirm="confirmEndBtn"
                    @cancel="cancelEndBtn"
            />
        </van-popup>
    </div>
</template>

<script>
    import HeaderBox from '@/components/head/headerBox'
    import { Toast } from 'vant';
    export default {
        name: "meetAdd",
        components:{
            HeaderBox
        },
        data(){
           return{
               isCreate:1,          //0:修改操作 1:新建操作
               info:'',
               startDate:'',
               endDate:'',
               title:'',
               text:'',
               startTimeShow:false,
               startTime: new Date(),
               minDate:new Date(),
               endTimeShow:false,
               endTime:new Date(),
           }
        },
        methods:{
            confirmStartBtn(){
                this.startDate =  this.startTime.toLocaleDateString()+ ' '+this.startTime.toLocaleTimeString('chinese',{hour12:false})
                this.startTimeShow = false
            },
            cancelStartBtn(){
                this.startTimeShow = false
            },
            confirmEndBtn(){
                this.endDate = this.endTime.toLocaleDateString()+ ' '+this.endTime.toLocaleTimeString('chinese',{hour12:false})
                this.endTimeShow = false
            },
            cancelEndBtn(){
                this.endTimeShow = false
            },
            showEndTime(){
                if(this.startDate == ''){
                    Toast.fail('请先选择开始时间')
                }else{
                    this.endTimeShow = true
                }
            },
            subBtn(){
                let that = this
                if(this.title == '' || this.text == '' || this.startDate == '' || this.endDate == '' ){
                    Toast.fail('信息不完整')
                }else{
                       //新增操作
                        let cnt = {
                            orgId: JSON.parse(localStorage.getItem('user')).orgId, // Long 组织编号
                            userId: JSON.parse(localStorage.getItem('user')).id, // Long 用户编号
                            title:this.title,
                            remark:this.text,
                            startTime:this.startTime.getTime(),
                            expiryTime:this.endTime.getTime()
                        };
                        this.$util.call('/vote/createVoteProject',cnt,function (res) {
                            if(res.data.rc == that.$util.RC.SUCCESS){
                                localStorage.setItem('meet',res.data.c)
                                that.$router.push('/meetVoteAdd')
                            }
                        })
                }
            },

            //修改按钮
            editBtn(){
                let that = this
                if(this.title == '' || this.text == '' || this.startDate == '' || this.endDate == '' ){
                    Toast.fail('信息不完整')
                }else {
                    let cnt1 = {
                        projectId: JSON.parse(localStorage.getItem('meet')).id, // Long 组织编号
                        title:this.title,
                        remark:this.text,
                        startTime:this.startTime.getTime(),
                        expiryTime:this.endTime.getTime()
                    };
                    let obj = JSON.parse(localStorage.getItem('meet'))
                    this.$util.call('/vote/editVoteProject',cnt1,function (res) {
                        if(res.data.rc == that.$util.RC.SUCCESS){
                            obj.title = cnt1.title
                            obj.remark = cnt1.remark
                            obj.startTime = cnt1.startTime
                            obj.expiryTime = cnt1.expiryTime
                            localStorage.setItem('meet',JSON.stringify(obj))

                            Toast.success({
                                duration:500,
                                message:'修改成功'
                            })
                            that.$router.push('/meetVoteAdd')
                        }
                    })
                }

            },
            //取消修改按钮
            returnBtn(){
                this.$router.push('/meetVoteAdd')
            }
        },
        mounted(){
            console.log(localStorage.getItem('meet'))
            if(localStorage.getItem('meet') == '' || localStorage.getItem('meet') == null ){
                console.log('空的')
                this.isCreate = 1
            }else{
                this.info = JSON.parse(localStorage.getItem('meet'))
                this.isCreate = 0
                this.title = this.info.title
                this.text = this.info.remark
                this.startTime = new Date( this.info.startTime)
                this.startDate = new Date( this.info.startTime).toLocaleDateString()+ ' '+new Date( this.info.startTime).toLocaleTimeString('chinese',{hour12:false})
                this.endTime = new Date( this.info.expiryTime)
                this.endDate = new Date( this.info.expiryTime).toLocaleDateString()+ ' '+new Date( this.info.expiryTime).toLocaleTimeString('chinese',{hour12:false})
                console.log(this.info)

            }
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
    .create-btn1{
        width: 90%;
        height: 3rem;
        margin:0 auto;
        margin-top: 3rem;
        border-radius: 25px;
        background: #ff976a;
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #fff;
    }
    .box {
        width: 88%;
        margin: 0 auto;
        padding: 1rem;
        margin-top: 1rem;
        background: #fff;
        border-radius: 5px;
    }
    .subBtn{

        width: 88%;
        margin: 0 auto;
        margin-top: 3rem;
        height: 3rem;
        background: #0086b3;
        color: #fff;
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;

    }
    .subBtn1{
        width: 88%;
        margin: 0 auto;
        margin-top: 3rem;
        height: 3rem;
        background: #0086b3;
        color: #fff;
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
    }

    .subBtn2{
        width: 88%;
        margin: 0 auto;
        margin-top: 3rem;
        height: 3rem;
        background: #fff;
        color: #333;
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        border:1px solid #ddd;
    }
</style>
