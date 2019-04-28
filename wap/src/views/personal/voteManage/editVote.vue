<template>
    <div>
        <header-box title="创建投票"></header-box>
        <div class="main-box">
            <van-cell-group>
                <van-field
                        v-model="title"
                        label="表决标题"
                        type="textarea"
                        placeholder="请输入表决名称"
                        autosize
                        rows="1"
                        class="title"
                />

                <van-field
                        v-model="remark"
                        label="表决内容"
                        type="textarea"
                        placeholder="请输入表决内容信息"
                        rows="1"
                        autosize
                        class="text"
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
                <div style="margin: 1rem 0">
                    <div class="inp-box">
                        <div class="inp-title" style="width: 90px">
                            参会人员
                        </div>
                    </div>
                    <div class="inp-box" style="width: auto;padding-top: 0">
                        <van-checkbox-group v-model="crowd">
                            <van-checkbox
                                    v-for="(item,index) in crowdList"
                                    :key="index"
                                    :name="item.roleId"
                                    class="radio-box"
                                    style="margin-left: 1rem;margin-top: 1rem"
                            >
                                {{ item.name}}
                            </van-checkbox>
                        </van-checkbox-group>
                    </div>
                </div>

                <div class="inp-box">
                    <div class="inp-title">
                        选项类型
                    </div>
                    <div class="inp-text">
                        <van-radio-group v-model="type" @change="typeBtn">
                            <van-radio name="0" class="radio-box">单选</van-radio>
                            <van-radio name="1" class="radio-box" style="margin-left: 5rem">多选</van-radio>
                        </van-radio-group>
                    </div>
                </div>

                <van-field
                        v-model="choiceCount"
                        label="选项限制"
                        type="number"
                        placeholder="单人最大投票选项数"
                        class="text"
                        v-if="choiceCountShow == true"
                />

                <van-field
                        v-model="failData"
                        type="text"
                        label="表决失效"
                        placeholder="请选择自动表决失效比例"
                        @focus="fail"
                        style="margin-top: 2rem"
                />
                <van-field
                        v-model="passData"
                        type="text"
                        label="通过比例"
                        placeholder="请选择自动通过的比例"
                        @focus="pass"
                        style="margin-top: 2rem"
                />
            </van-cell-group>


            <div class="create-btn" @click="btn">确认修改 — 选项管理</div>

            <div class="create-btn"  @click="editBtn">确认修改 — 返回列表</div>


        </div>

        <van-popup v-model="passShow" position="bottom" :overlay="true">
            <van-picker
                    :columns="num"
                    @change="onChangePass"
            />
        </van-popup>
        <van-popup v-model="failShow" position="bottom" :overlay="true">
            <van-picker
                    :columns="num"
                    @change="onChangePassFail"
            />
        </van-popup>


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
    import { Toast } from 'vant'
    export default {
        name: "createVote",
        components: {
            HeaderBox
        },
        data() {
            return {
                isAbstain:true,
                voteId:'',
                template:'0',         //控制0  选举和 1 投票的显示区别
                type:'0',
                reeditable:false,
                realName:true,
                isInternal:true,
                title: '',
                remark: '',
                choiceCountShow:false,
                choiceCount:1,
                failShow:false,
                failData:'',
                passShow:false,
                passData:'',
                num:['1/3','1/2','2/3'],
                effectiveRatio:'100',
                failureRatio:'100',
                crowd:[],
                startDate:'',
                endDate:'',
                crowdList:[],
                startTimeShow:false,
                startTime: new Date(),
                minDate:new Date(),
                endTimeShow:false,
                endTime:new Date(),
            }
        },
        methods: {
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

            typeBtn(){
                if(this.type == '0'){
                    this.choiceCount = 1
                    this.choiceCountShow = false
                }else{
                    this.choiceCountShow = true
                }
            },
            chooseBtn(){
                this.$router.push('/createVoteChoose')
            },
            btn(){
                if(this.remark== '' ||this.title == ''||this.crowd == [] ||this.startDate == '' ||this.endDate == '' ||this.failData == '' || this.passData == ''){
                    Toast.fail('信息不完整')
                }else{
                    let crowd = {
                        roles:this.crowd,
                        tags:{groups:[],tag:[]}
                    }

                    let cnt = {
                        voteId:this.voteId,
                        orgId:JSON.parse(localStorage.getItem('user')).orgId,
                        template:this.template,
                        type:this.type,
                        choiceCount:this.choiceCount,
                        crowd:crowd,
                        reeditable:this.reeditable,
                        realName:this.realName,
                        isInternal:this.isInternal,
                        isAbstain:this.isAbstain,
                        effectiveRatio:this.effectiveRatio,
                        failureRatio:this.failureRatio,
                        title:this.title,
                        remark:this.remark,
                        ext:'无',
                        startTime: new Date(this.startDate).getTime(), // Date 开始时间
                        expiryTime: new Date(this.endDate).getTime(), // Date 终止时间
                    }
                    this.$api.editVote(cnt,(res)=>{

                        if(res.data.rc == this.$util.RC.SUCCESS){
                            cnt.id = this.voteId
                            cnt.crowd = JSON.stringify(cnt.crowd)
                            localStorage.setItem('voteInfo',JSON.stringify(cnt))
                            if(this.template == 0){
                                this.$router.push('/createVoteOptionPeople')
                            }else{
                                this.$router.push('/createVoteOptionWork')
                            }
                        }else{
                            Toast.fail('信息有误或权限不足！')
                            this.$router.push('/voteManage')
                        }
                    })
                }
            },
            editBtn(){
                if(this.remark== '' ||this.title == ''||this.crowd == [] ||this.startDate == '' ||this.endDate == '' ||this.failData == '' || this.passData == ''){
                    Toast.fail('信息不完整')
                }else{
                    let crowd = {
                        roles:this.crowd,
                        tags:{groups:[],tag:[]}
                    }

                    let cnt = {
                        voteId:this.voteId,
                        orgId:JSON.parse(localStorage.getItem('user')).orgId,
                        template:this.template,
                        type:this.type,
                        choiceCount:this.choiceCount,
                        crowd:crowd,
                        reeditable:this.reeditable,
                        realName:this.realName,
                        isInternal:this.isInternal,
                        isAbstain:this.isAbstain,
                        effectiveRatio:this.effectiveRatio,
                        failureRatio:this.failureRatio,
                        title:this.title,
                        remark:this.remark,
                        ext:'无',
                        startTime: new Date(this.startDate).getTime(), // Date 开始时间
                        expiryTime: new Date(this.endDate).getTime(), // Date 终止时间
                    }

                    this.$api.editVote(cnt,(res)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            cnt.crowd = JSON.stringify(cnt.crowd)
                            cnt.id = this.voteId
                            localStorage.setItem('voteInfo',JSON.stringify(cnt))
                            this.$router.push('/voteManage')
                        }else{
                            Toast.fail('信息有误或权限不足！')
                            this.$router.push('/voteManage')
                        }
                    })
                }
            },

            onChangePass(picker, value, index) {
                this.passShow = false
                this.passData =  value
                if(index == '0'){
                    this.effectiveRatio ='33'
                }else if(index == '1'){
                    this.effectiveRatio ='50'
                }else if(index == '2'){
                    this.effectiveRatio = '67'
                }
                console.log(this.effectiveRatio);
            },
            pass(){
                this.passShow = true
            },
            fail(){
                this.failShow = true
            },
            onChangePassFail(picker, value, index){
                this.failShow = false
                this.failData =  value
                if(index == '0'){
                    this.failureRatio ='33'
                }else if(index == '1'){
                    this.failureRatio ='50'
                }else if(index == '2'){
                    this.failureRatio = '67'
                }
                console.log(this.failureRatio);
            },

        },
        mounted(){



            this.$api.getSysORGUserRoles({},(res)=>{
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.crowdList = this.$util.tryParseJson(res.data.c)
                }else{
                    this.crowdList = []
                }
                console.log(this.crowdList)
            })

            let info = JSON.parse(localStorage.getItem('voteInfo'))
            console.log(info)
            this.voteId = info.id
            this.template= info.template
            this.title = info.title
            this.remark = info.remark
            this.isAbstain = info.isAbstain
            this.type = info.type+''
            this.reeditable = info.reeditable
            this.realName = info.realName
            this.isInternal = info.isInternal
            this.choiceCount = info.choiceCount

            this.crowd = JSON.parse(info.crowd).roles

            this.startDate =new Date(info.startTime) .toLocaleDateString()+ ' '+new Date(info.startTime) .toLocaleTimeString('chinese',{hour12:false})
            this.endDate = new Date(info.expiryTime) .toLocaleDateString()+ ' '+new Date(info.expiryTime) .toLocaleTimeString('chinese',{hour12:false})
            this.effectiveRatio = info.effectiveRatio
            this.failureRatio = info.failureRatio

            if(info.failureRatio == '33'){
                this.failData = '1/3'

            }else if (info.failureRatio == '50'){
                this.failData = '1/2'
            }else{
                this.failData = '2/3'
            }
            if(info.effectiveRatio == '33'){
                this.passData = '1/3'
            }else if (info.effectiveRatio == '50'){
                this.passData = '1/2'
            }else{
                this.passData = '2/3'
            }


        }
    }
</script>

<style scoped lang="scss">
    .inp-box{
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 10px 15px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 24px;
        position: relative;
        background-color: #fff;
        color: #333;
        font-size: 14px;
        overflow: hidden;
        margin-top: 1rem;
    }
    .inp-title{
        float: left;
        width: 90px;

    }
    .inp-text{
        width: auto;
    }
    .radio-box{
        float: left;

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
    .input-box {
        width: 100%;
        height: 3.5rem;
        margin-top: 1rem;
        background: rgba(255, 255, 255, .5);
        border-radius: 25px;
        overflow: hidden;
    }
    .title{
        margin-top: 1rem;


    }
    .text{
        margin-top: 1rem;
    }
    .choose-btn{
        width: 90%;
        height: 3rem;
        margin:0 auto;
        margin-top: 3rem;
        border-radius: 25px;
        background: #fff;
        text-align: center;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #666;
        border: 1px solid #ddd;
    }
</style>
