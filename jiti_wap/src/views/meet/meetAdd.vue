<template>
    <div>
        <header-box title="创建会议"></header-box>
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

                <div class="subBtn" @click="subBtn">
                    下一步
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

                if(this.title == '' || this.text == '' || this.startDate == '' || this.endDate == '' ){
                    Toast.fail('信息不完整')
                }else{
                    let cnt = {
                        title:this.title,
                        remark:this.text,
                        startTime:this.startTime,
                        expiryTime:this.endTime
                    }
                    this.$router.push({
                        path:'/meetUser',
                        name:'meetUser',
                        params:{
                            cnt:cnt
                        }
                    })
                }
            }

        }
    }
</script>

<style scoped lang="scss">
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
</style>
