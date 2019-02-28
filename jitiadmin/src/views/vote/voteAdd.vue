<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24">
                新增表决信息
            </el-col>
        </el-row>

        <el-row class="row-box1">
            <el-col :span="24">
                <span style="font-size: 1.6rem;color: #666;"> 会议信息</span>
            </el-col>
            <el-row class="row-box1">
                    <el-col :span="24">
                       <el-row :gutter="40" class="row-text-box">
                           <el-col :span="6">
                               <div class="lable-box"> 会议名称</div>
                           </el-col>
                           <el-col :span="18">
                               <el-input v-model="meetTitle" placeholder="请输入会议名称"  :disabled="meetShow != true"></el-input>
                           </el-col>
                       </el-row>

                        <el-row :gutter="40" class="row-text-box">
                            <el-col :span="6">
                                <div class="lable-box"> 开始时间</div>
                            </el-col>
                            <el-col :span="18">
                                <el-date-picker
                                        v-model="meetStartTime"
                                        type="datetime"
                                        placeholder="选择会议开始时间"
                                        :disabled="meetShow != true">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                        <el-row :gutter="40" class="row-text-box">
                            <el-col :span="6">
                                <div class="lable-box"> 截止时间</div>
                            </el-col>
                            <el-col :span="18">
                                <el-date-picker
                                        v-model="meetExpiryTime"
                                        type="datetime"
                                        placeholder="选择会议截止时间"
                                        :disabled="meetShow != true">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                        <el-row :gutter="40" class="row-text-box" >
                            <el-col :span="6">
                                <div class="lable-box"> 会议内容</div>
                            </el-col>
                            <el-col :span="18">
                                <el-input
                                        type="textarea"
                                        :rows="5"
                                        placeholder="请输入会议内容"
                                        v-model="meetRemark"
                                        :disabled="meetShow != true">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="40" class="row-text-box" v-if="meetShow == true">
                            <el-col :span="18" :offset="6">
                                <el-button type="primary" @click="addMeet">确认会议信息</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
            </el-row>
        </el-row>
        <el-row class="row-box1">
            <el-row>
                <el-col :span="24">
                        <span style="font-size: 1.6rem;color: #666;">议程列表</span>
                        <el-button type="primary" style="float: right;" @click="addVoteShowBtn">+新增议程</el-button>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-col :span="24">
                    <template>
                        <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop="title"
                                    label="议程名称">
                            </el-table-column>
                            <el-table-column
                                    prop="template"
                                    label="议程模板"
                                    :formatter="templateFilter"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="type"
                                    label="选项类型"
                                    :formatter="typeFilter">
                            </el-table-column>
                            <el-table-column
                                    prop="choiceCount"
                                    label="最多选项">
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="150">
                                <template slot-scope="scope">
                                    <el-button @click="voteOption(scope.row)" type="text" size="small">选项管理</el-button>
                                    <!--<el-button @click="editBtn(scope.row)" type="text" size="small">修改</el-button>-->
                                    <!--<el-button @click="voteInfo(scope.row)" type="text" size="small">详情</el-button>-->
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>


                </el-col>
            </el-row>
        </el-row>
        <el-row class="row-box1" v-if="addVoteShow == true">
            <el-col :span="24">
                <span style="font-size: 1.6rem;color: #666;">   议程信息</span>
            </el-col>
            <el-row class="row-box1">
                <el-col :span="24">
                    <el-row :gutter="40" class="row-text-box">
                        <el-col :span="6">
                            <div class="lable-box"> 议程标题</div>
                        </el-col>
                        <el-col :span="18">
                            <el-input v-model="voteTitle" placeholder="请输入议程标题" ></el-input>
                        </el-col>
                    </el-row>

                    <el-row :gutter="40" class="row-text-box" >
                        <el-col :span="6">
                            <div class="lable-box"> 议程模板</div>
                        </el-col>
                        <el-col :span="18" style="line-height: 3rem">
                            <template >
                                <el-radio v-model="voteTemplate" :label="0" @change="templateBtn(0)">选举议程</el-radio>
                                <el-radio v-model="voteTemplate" :label="1" @change="templateBtn(1)">普通投票</el-radio>
                            </template>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box" >
                        <el-col :span="6">
                            <div class="lable-box"> 选项类型</div>
                        </el-col>
                        <el-col :span="18" style="line-height: 3rem">
                            <template>
                                <el-radio v-model="voteType" :label="0" @change="voteTypeBtn(0)">单选(只选取一个)</el-radio>
                                <el-radio v-model="voteType" :label="1"  @change="voteTypeBtn(1)">多选(选取多个)</el-radio>
                            </template>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box" v-if="voteType == 1">
                        <el-col :span="6">
                            <div class="lable-box"> 最多选项</div>
                        </el-col>
                        <el-col :span="18">
                            <el-input v-model="voteChoiceCount" placeholder="请输入最多选项数" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box" >
                        <el-col :span="6">
                            <div class="lable-box"> 参会人员</div>
                        </el-col>
                        <el-col :span="18" style="line-height: 3rem">
                            <template>
                                <el-checkbox-group v-model="voteCrowd">
                                    <el-checkbox :label="0">所有人</el-checkbox>
                                    <el-checkbox :label="1">监事会</el-checkbox>
                                    <el-checkbox :label="2">董事会</el-checkbox>
                                    <el-checkbox :label="3">股东代表</el-checkbox>
                                    <el-checkbox :label="4">股东</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box" v-if="voteTemplate == 0">
                        <el-col :span="6">
                            <div class="lable-box"> 失效比例</div>
                        </el-col>
                        <el-col :span="18" style="line-height: 3rem">
                            <template>
                                <el-select v-model="failureRatio" placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box" v-if="voteTemplate == 0">
                        <el-col :span="6">
                            <div class="lable-box" > 通过比例</div>
                        </el-col>
                        <el-col :span="18" style="line-height: 3rem">
                            <template>
                                <el-select v-model="effectiveRatio" placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box" >
                        <el-col :span="6">
                            <div class="lable-box"> 议程内容</div>
                        </el-col>
                        <el-col :span="18">
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="请输入议程内容"
                                    v-model="voteRemark"
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box">
                        <el-col :span="18" :offset="6">
                            <el-button type="primary" @click="addVote">确认新增议程</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>


    export default {
        name: "voteAdd",
        data(){
            return {
                //会议所需
                meetShow:true,
                meetTitle:'',
                meetRemark:'',
                meetStartTime:'',
                meetExpiryTime:'',
                meetInfo:'',
                //投票所需
                voteTitle:'',
                voteRemark:'',
                voteType:0,
                voteTemplate:0,
                voteChoiceCount:'1',
                voteCrowd: [0],
                failureRatio:'67',
                effectiveRatio:'67',
                options: [{
                    value: '33',
                    label: '1/3'
                }, {
                    value: '50',
                    label: '1/2'
                }, {
                    value: '67',
                    label: '2/3'
                }],

                //议程列表
                 tableData:[],
                addVoteShow:false

                //选项管理

            }
        },
        methods:{

            templateBtn(val){
                if(val == '0'){
                   this.failureRatio = '67'
                    this.effectiveRatio ='67'
                }else{
                    this.failureRatio = '100'
                    this.effectiveRatio ='100'
                }
            },
            voteTypeBtn(val){
              if(val == '0'){
                  this.voteChoiceCount = 1
              }
            },
            addVote(){
                let that = this
                let that1 = this
                let cnt ={
                    orgId:localStorage.getItem('orgId'),
                    projectId:this.meetInfo.id,
                    template:this.voteTemplate,
                    type:this.voteType,
                    choiceCount:this.voteChoiceCount,
                    crowd:JSON.stringify(this.voteCrowd),
                    reeditable:false,
                    realName:true,
                    isInternal:true,
                    isAbstain:true,
                    effectiveRatio:this.effectiveRatio,
                    failureRatio:this.failureRatio,
                    title:this.voteTitle,
                    remark:this.voteRemark,
                    ext:'无'
                }
                this.$api.addVote(cnt,function (res) {
                    if(res.data.rc == that.$util.RC.SUCCESS){
                        that.$message({
                            message: '新增议程成功',
                            type: 'success'
                        })

                        let cnt1={
                            projectId:that.meetInfo.id
                        }
                        that.$api.getVotes('/vote/getVotes',cnt1,function (res) {
                            that1.tableData = JSON.parse(res.data.c)
                        })
                        that.addVoteShow = false
                    }else{
                        that.$message.error('新增失败,输入有误')
                        let cnt1={
                            projectId:that.meetInfo.id
                        }
                        that.$api.getVotes(cnt1,function (res) {
                            that1.tableData = JSON.parse(res.data.c)
                        })
                        that.addVoteShow = true
                    }
                })
                console.log(cnt)
            },
            addMeet(){
                let that = this
                let cnt = {
                    orgId:localStorage.getItem('orgId'),
                    userId:'',
                    title:this.meetTitle,
                    remark:this.meetRemark,
                    startTime:this.meetStartTime.getTime(),
                    expiryTime:this.meetExpiryTime.getTime()
                }
                this.$api.createVoteProject(cnt,function (res) {
                    if( res.data.rc == that.$util.RC.SUCCESS){
                        that.$message({
                            message: '创建会议成功',
                            type: 'success'
                        })
                        that.meetShow = false
                        that.meetInfo = JSON.parse(res.data.c)
                        console.log(that.meetInfo)
                    }else{
                        that.$message.error('创建会议失败')
                        that.meetShow = true
                    }
                })
                console.log(cnt)
            },


            templateFilter(row,col,value){
                    if(value == '0'){
                        return '选举议程'
                    }else{
                        return '普通投票'
                    }
            },
            typeFilter(row,col,value){
                if(value == '0'){
                    return '单选'
                }else{
                    return '多选'
                }
            },

            addVoteShowBtn(){
                this.addVoteShow = true
                this.voteTitle=''
                this.voteRemark=''
                this.voteType=0
                this.voteTemplate=0
                this.voteChoiceCount='1'
                this.voteCrowd=[0]
                this.failureRatio='67'
                this.effectiveRatio='67'
            }

        },

        //选项管理
        voteOption(info){
            console.log(info)
        },

    }
</script>

<style scoped lang="scss">
    .row-text-box{
        margin-top: 1rem;
    }
    .lable-box{
        font-size: 1.6rem;
        line-height: 3rem;
        text-align: right;
        width: 100%;
    }
    .row-box{
        background: #fff;
        padding: 15px;
        font-size: 1.6rem;
        color: #666;
        border-left: 4px solid #67C23A;
    }
    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }
    .title-box {
        font-size: 1.6rem;
        line-height: 40px;
        letter-spacing: 2px;
        font-weight: 600;
        color: #666;
        text-align: right;
    }

    .text-box {
        margin-left: 50px;
        line-height: 40px;
    }

    .row-box2 {
        margin-top: 20px;
    }

    .row-box3{
        margin-top: 40px;
        text-align: center;
        padding-bottom: 20px;
    }
    .el-tag{
        margin-top: 10px;
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

</style>
