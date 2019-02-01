<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                会议详情
            </el-col>
        </el-row>

        <el-row class="row-box1">
           <el-row>
               <el-col :span="24">
                   <span style="font-size: 1.6rem;color: #666;"> 会议信息</span>
                   <el-button type="primary" icon="el-icon-edit" size="small" style="float: right" @click="editMeetBtn" v-if="editBtnShow == true">编辑</el-button>
               </el-col>
           </el-row>
            <el-row class="row-box1">
                <el-col :span="24">
                    <el-row :gutter="40" class="row-text-box">
                        <el-col :span="6">
                            <div class="lable-box"> 会议名称</div>
                        </el-col>
                        <el-col :span="18">
                            <el-input v-model="meetTitle" placeholder="请输入会议名称" :disabled="meetShow != true"></el-input>
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
                    <el-row :gutter="40" class="row-text-box">
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
                            <el-button type="primary" @click="addMeet" v-if="isEditMeet == false">确认会议信息</el-button>
                            <el-button type="primary" @click="editMeet" v-if="isEditMeet == true">确认修改会议信息</el-button>
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
                                style="width: 100%"
                                >
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
                                    label="最多选项"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="status"
                                    label="状态"
                                    :formatter="statusFilter"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="250">
                                <template slot-scope="scope">

                                    <el-button @click="voteOption(scope.row)" type="text" size="small">选项管理</el-button>
                                    <el-button @click="editVoteBtn(scope.row)" type="text" size="small">编辑</el-button>
                                    <el-button @click="editStatus(scope.row)" type="text" size="small">更改状态</el-button>
                                    <el-button @click="delVote(scope.row)" type="text" size="small" style="color: #f44;">删除</el-button>
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
                            <el-input v-model="voteTitle" placeholder="请输入议程标题"></el-input>
                        </el-col>
                    </el-row>

                    <el-row :gutter="40" class="row-text-box">
                        <el-col :span="6">
                            <div class="lable-box"> 议程模板</div>
                        </el-col>
                        <el-col :span="18" style="line-height: 3rem">
                            <template>
                                <el-radio v-model="voteTemplate" :label="0" @change="templateBtn(0)">选举议程</el-radio>
                                <el-radio v-model="voteTemplate" :label="1" @change="templateBtn(1)">普通投票</el-radio>
                            </template>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box">
                        <el-col :span="6">
                            <div class="lable-box"> 选项类型</div>
                        </el-col>
                        <el-col :span="18" style="line-height: 3rem">
                            <template>
                                <el-radio v-model="voteType" :label="0" @change="voteTypeBtn(0)">单选(只选取一个)</el-radio>
                                <el-radio v-model="voteType" :label="1" @change="voteTypeBtn(1)">多选(选取多个)</el-radio>
                            </template>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box" v-if="voteType == 1">
                        <el-col :span="6">
                            <div class="lable-box"> 最多选项</div>
                        </el-col>
                        <el-col :span="18">
                            <el-input v-model="voteChoiceCount" placeholder="请输入最多选项数"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box">
                        <el-col :span="6">
                            <div class="lable-box"> 参会人员</div>
                        </el-col>
                        <el-col :span="18" style="line-height: 3rem">
                            <template>
                                <el-checkbox-group v-model="voteCrowd">
                                    <el-checkbox :label="0">所有人</el-checkbox>
                                    <el-checkbox :label="1">股东</el-checkbox>
                                    <el-checkbox :label="2">股东代表</el-checkbox>
                                    <el-checkbox :label="3">董事会</el-checkbox>
                                    <el-checkbox :label="4">监事会</el-checkbox>
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
                            <div class="lable-box"> 通过比例</div>
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
                    <el-row :gutter="40" class="row-text-box">
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
                            <el-button type="primary" @click="addVote" v-if="isVoteEdit == false">确认新增议程</el-button>
                            <el-button type="primary" @click="editVote" v-if="isVoteEdit ==true">确认修改议程</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-row>

        <el-dialog title="选项管理" :visible.sync="dialogFormVisible">
            <span v-for="(item,index) in voteOptions" :key="index">
                <el-tag closable @close="delOption(item.id)">{{item.title}}</el-tag>
            </span>
            <el-row>
                <el-col :span="5" v-if="isWrite == true">
                    <el-input v-model="addOptionTitle" placeholder="请输入选项名" size="small" style="line-height: 46px"
                              @keyup.enter.native="addSubmit"></el-input>
                </el-col>
                <el-button class="button-new-tag" @click="addOption" style="margin-top: 8px">+新增选项</el-button>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="选项管理" :visible.sync="dialogFormVisible1">
            <span v-for="(item,index) in voteOptions" :key="index">
                <el-tag closable @close="delOption(item.id)">{{item.title}}</el-tag>
            </span>
            <el-row class="row-box1">
                <el-input
                        placeholder="请两位以上身份证号码"
                        prefix-icon="el-icon-search"
                        v-model="searchData"
                        @change="searchBtn">
                </el-input>

                <el-row>
                    <el-col :span="24">
                        <div v-for="(item,index) in searchList" :key="index"   @click="addUser(item)" style="cursor: pointer;" >
                            <el-row style="margin-top: 1rem;border-bottom: 1px solid #ddd;padding: 1rem;">
                                <el-col :span="5"  >{{item.realName}} </el-col>
                                <el-col :span="19" > {{item.idNumber}}</el-col>
                            </el-row>
                        </div>

                    </el-col>
                </el-row>
            </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>


    export default {
        name: "voteAdd",
        data() {
            return {
                //会议所需
                editBtnShow:false,  //显示会议编辑按钮
                meetShow: true,
                isEditMeet:false,
                meetTitle: '',
                meetRemark: '',
                meetStartTime: '',
                meetExpiryTime: '',
                meetInfo: '',
                //投票所需
                voteTitle: '',
                voteRemark: '',
                voteType: 0,
                voteTemplate: 0,
                voteChoiceCount: '1',
                voteCrowd: [0],
                failureRatio: '67',
                effectiveRatio: '67',
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
                tableData: [],
                addVoteShow: false,
                isVoteEdit:false,
                editVoteInfo:'',
                isActive:false,
                //选项管理

                voteInfo: '',
                voteOptions: [],
                dialogFormVisible: false,
                dialogFormVisible1: false,
                addOptionTitle: '',
                isWrite: false,

                searchData:'',
                searchList:[],


            }
        },
        methods: {
             //会议修改操作
            editMeetBtn(){
                this.meetShow = true
                this.isEditMeet = true
            },
            //修改会议信息
            editMeet(){
                let that = this
                console.log()
                let cnt = {
                    projectId:this.meetInfo.id,
                    userId: '',
                    title: this.meetTitle,
                    remark: this.meetRemark,
                    startTime: this.meetStartTime.getTime(),
                    expiryTime: this.meetExpiryTime.getTime()
                }
                this.$util.call('/vote/editVoteProject',cnt,function (res) {
                    if (res.data.rc == that.$util.RC.SUCCESS) {
                        that.$message({
                            message: '修改会议成功',
                            type: 'success'
                        })
                        that.meetShow = false
                        that.editBtnShow = true
                        that.meetInfo = cnt
                        let obj = {id:cnt.projectId}
                        Object.assign(that.meetInfo,obj)
                        console.log(that.meetInfo)
                    } else {
                        that.$message.error('修改会议失败')
                        that.meetShow = true
                        that.editBtnShow = true
                    }
                })

            },
            //下拉失败通过率的默认值设置
            templateBtn(val) {
                if (val == '0') {
                    this.failureRatio = '67'
                    this.effectiveRatio = '67'
                } else {
                    this.failureRatio = '100'
                    this.effectiveRatio = '100'
                }
            },
            //默认的最大选项数-单选=1
            voteTypeBtn(val) {
                if (val == '0') {
                    this.voteChoiceCount = 1
                }
            },
            //新增投票
            addVote() {
                let that = this
                let that1 = this
                let cnt = {
                    orgId: localStorage.getItem('orgId'),
                    projectId: this.meetInfo.id,
                    template: this.voteTemplate,
                    type: this.voteType,
                    choiceCount: this.voteChoiceCount,
                    crowd: JSON.stringify(this.voteCrowd),
                    reeditable: false,
                    realName: true,
                    isInternal: true,
                    isAbstain: true,
                    effectiveRatio: this.effectiveRatio,
                    failureRatio: this.failureRatio,
                    title: this.voteTitle,
                    remark: this.voteRemark,
                    ext: '无'
                }
                this.$util.call('/vote/addVote', cnt, function (res) {
                    if (res.data.rc == that.$util.RC.SUCCESS) {
                        that.$message({
                            message: '新增议程成功',
                            type: 'success'
                        })

                        let cnt1 = {
                            projectId: that.meetInfo.id
                        }
                        that.$util.call('/vote/getVotes', cnt1, function (res) {
                            that1.tableData = JSON.parse(res.data.c)
                        })
                        that.addVoteShow = false
                    } else {
                        that.$message.error('新增失败,输入有误')
                        let cnt1 = {
                            projectId: that.meetInfo.id
                        }
                        that.$util.call('/vote/getVotes', cnt1, function (res) {
                            that1.tableData = JSON.parse(res.data.c)
                        })
                        that.addVoteShow = true
                    }
                })
                console.log(cnt)
            },
            //新增会议
            addMeet() {
                let that = this
                let cnt = {
                    orgId: localStorage.getItem('orgId'),
                    userId: '',
                    title: this.meetTitle,
                    remark: this.meetRemark,
                    startTime: this.meetStartTime.getTime(),
                    expiryTime: this.meetExpiryTime.getTime()
                }
                this.$util.call('/vote/createVoteProject', cnt, function (res) {
                    if (res.data.rc == that.$util.RC.SUCCESS) {
                        that.$message({
                            message: '创建会议成功',
                            type: 'success'
                        })
                        that.meetShow = false
                        that.editBtnShow = true
                        that.meetInfo = JSON.parse(res.data.c)
                        console.log(that.meetInfo)
                    } else {
                        that.$message.error('创建会议失败')
                        that.meetShow = true
                        that.editBtnShow = false
                    }
                })
                console.log(cnt)
            },
            //所有的议程
            templateFilter(row, col, value) {
                if (value == '0') {
                    return '选举议程'
                } else {
                    return '普通投票'
                }
            },
            typeFilter(row, col, value) {
                if (value == '0') {
                    return '单选'
                } else {
                    return '多选'
                }
            },

            //单击新增投票-初始化默认数据
            addVoteShowBtn() {
                this.addVoteShow = true
                this.isVoteEdit = false
                this.voteTitle = ''
                this.voteRemark = ''
                this.voteType = 0
                this.voteTemplate = 0
                this.voteChoiceCount = '1'
                this.voteCrowd = [0]
                this.failureRatio = '67'
                this.effectiveRatio = '67'
            },

            //选项管理-弹窗/请求已有的选项列表
            voteOption(voteInfo) {
                let that = this
                this.voteInfo = voteInfo
                console.log(this.voteInfo)
                let cnt = {
                    voteId: voteInfo.id
                }
                this.$util.call('/vote/getVoteOptions', cnt, function (res) {
                    that.voteOptions = JSON.parse(res.data.c)
                })

                if (this.voteInfo.template == 0) {
                    this.dialogFormVisible1 = true
                    this.searchData = ''
                    this.searchList = []

                } else {
                    this.dialogFormVisible = true
                }

            },

            //删除一个选项
            delOption(optionId) {
                let that = this
                let that1 = this
                let cnt = {
                    projectId: localStorage.getItem('orgId'),
                    voteId: this.voteInfo.id,
                    optionId: optionId
                }
                this.$util.call('/vote/delVoteOption', cnt, function (res) {
                    let cnt = {
                        voteId: that.voteInfo.id
                    }
                    that.$util.call('/vote/getVoteOptions', cnt, function (res) {

                        that1.voteOptions = JSON.parse(res.data.c)
                        console.log(that1.voteOptions)
                    })
                })
                console.log(optionId)
            },

            //普通投票-新增选项的输入框
            addOption() {
                this.isWrite = true
                console.log(this.voteInfo)
            },

            //普通投票-新增选项
            addSubmit() {
                let that = this
                let that1 = this
                let cnt = {
                    projectId: localStorage.getItem('orgId'),
                    voteId: this.voteInfo.id,
                    title: this.addOptionTitle,
                    remark: '无',
                    ext: '无',
                };
                this.$util.call('/vote/addVoteOption', cnt, function (res) {
                    console.log(res)
                    if (res.data.rc == that.$util.RC.SUCCESS) {
                        that.$message.success('新增选项成功！')
                        that.addOptionTitle = ''
                        that.isWrite = false
                        let cnt = {
                            voteId: that.voteInfo.id
                        }
                        that.$util.call('/vote/getVoteOptions', cnt, function (res) {
                            that1.voteOptions = JSON.parse(res.data.c)
                        })
                    } else {
                        that.$message.error('新增选项出错！')
                    }
                })
            },

            //选举选人搜索事件
            searchBtn(){
                let that = this
                let count = 10
                let offset = 0
                if(this.searchData.length >=2){
                    let cnt = {
                        orgId: localStorage.getItem('orgId'), // Long 组织编号
                        idNumber: this.searchData,
                        count: count, // Integer
                        offset: offset, // Integer
                    }
                    this.$util.call('/org/getORGUsersLikeIDNumber',cnt,function (res) {
                        that.searchList = JSON.parse(res.data.c)
                        console.log(that.searchList)
                    })
                }

            },
            //选举选人
            addUser(item){

                console.log(item)
                let that = this
                let that1 = this
                let ext = {
                    userId:item.userId,
                    idNumber:item.idNumber,
                    realName:item.realName,
                }
                let cnt ={
                    projectId:localStorage.getItem('orgId'),
                    voteId:this.voteInfo.id,
                    title:item.realName,
                    remark:'无',
                    ext:JSON.stringify(ext)
                }

                this.$util.call('/vote/addVoteOption',cnt,function (res) {
                    if (res.data.rc == that.$util.RC.SUCCESS) {
                        that.$message.success('新增选项成功！')
                        that.addOptionTitle = ''
                        that.isWrite = false
                        let cnt = {
                            voteId: that.voteInfo.id
                        }
                        that.$util.call('/vote/getVoteOptions', cnt, function (res) {
                            that1.voteOptions = JSON.parse(res.data.c)
                        })
                    } else {
                        that.$message.error('新增选项出错！')
                    }
                })

            },


            //修改表决-初始默认数据
            editVoteBtn(info){
                this.isVoteEdit = true
                this.addVoteShow = true
                this.editVoteInfo = info
                this.voteTitle = info.title
                this.voteRemark = info.remark
                this.voteType = info.type
                this.voteTemplate = info.template
                this.voteChoiceCount = info.choiceCount
                this.voteCrowd = JSON.parse(info.crowd)
                this.failureRatio = ''+info.failureRatio
                this.effectiveRatio = ''+info.effectiveRatio
            },
            //修改表决
            editVote(){
                let that = this
                let that1= this
                let cnt = {
                    orgId: this.editVoteInfo.orgId,
                    projectId:this.editVoteInfo.projectId,
                    voteId:this.editVoteInfo.id,
                    template: this.voteTemplate,
                    type: this.voteType,
                    choiceCount: this.voteChoiceCount,
                    crowd: JSON.stringify(this.voteCrowd),
                    reeditable: this.editVoteInfo.reeditable,
                    realName: this.editVoteInfo.realName,
                    isInternal: this.editVoteInfo.isInternal,
                    isAbstain: this.editVoteInfo.isAbstain,
                    effectiveRatio: this.effectiveRatio,
                    failureRatio: this.failureRatio,
                    title: this.voteTitle,
                    remark: this.voteRemark,
                    ext: '无'
                }
                this.$util.call('/vote/editVote',cnt,function (res) {
                    if (res.data.rc == that.$util.RC.SUCCESS) {
                        that.$message({
                            message: '修改议程成功',
                            type: 'success'
                        })

                        let cnt1 = {
                            projectId: that.meetInfo.id
                        }
                        that.$util.call('/vote/getVotes', cnt1, function (res) {
                            that1.tableData = JSON.parse(res.data.c)
                        })
                        that.addVoteShow = false
                    } else {
                        that.$message.error('修改失败,输入有误')
                        let cnt1 = {
                            projectId: that.meetInfo.id
                        }
                        that.$util.call('/vote/getVotes', cnt1, function (res) {
                            that1.tableData = JSON.parse(res.data.c)
                        })
                        that.addVoteShow = true
                    }
                })
            },
            //删除表决
            delVote(info){
                let that = this
                let that1 = that
                let cnt = {
                    projectId:this.meetInfo.id,
                    voteId: info.id,
                }
                this.$confirm('确认删除？')
                    .then(_ => {
                        this.$util.call('/vote/delVote',cnt,function (res) {
                            if(res.data.rc == that.$util.RC.SUCCESS){
                                that.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                            }else{
                                that.$message.error('删除出错');
                            }

                            let cnt1 = {
                                projectId: that.meetInfo.id
                            }
                            that.$util.call('/vote/getVotes', cnt1, function (res) {
                                that1.tableData = JSON.parse(res.data.c)
                            })

                        })
                    })
                    .catch(_ => {});
            },

            statusFilter(row,clo,value){
                if(value == 0){
                    return "启用"
                }else{
                    return "禁用"
                }
            },
            editStatus(info){
                let that = this
                let that1 = this
                if(info.status == 0){
                        this.$confirm('确认禁用该议程')
                            .then(_ => {
                                let cnt = {
                                    projectId:this.meetInfo.id, // Long 投票项目编号
                                    voteId: info.id, // Long 投票编号
                                    activation: false, // Boolean 启用/禁用
                                };
                                this.$util.call('/vote/setVoteActivation',cnt,function (res) {
                                    console.log(res)
                                    if(res.data.rc == that.$util.RC.SUCCESS){
                                        that.$message({
                                            message: '禁用成功',
                                            type: 'success'
                                        });
                                    }else{
                                        that.$message.error('操作失败');
                                    }
                                    let cnt1 = {
                                        projectId: that.meetInfo.id
                                    }
                                    that.$util.call('/vote/getVotes', cnt1, function (res) {
                                        that1.tableData = JSON.parse(res.data.c)
                                    })


                                })

                            })
                            .catch(_ => {});

                }else{
                    this.$confirm('确认启用该议程')
                        .then(_ => {
                            let cnt = {
                                projectId:this.meetInfo.id, // Long 投票项目编号
                                voteId: info.id, // Long 投票编号
                                activation: true, // Boolean 启用/禁用
                            };
                            this.$util.call('/vote/setVoteActivation',cnt,function (res) {
                                if(res.data.rc == that.$util.RC.SUCCESS){
                                    that.$message({
                                        message: '启用成功',
                                        type: 'success'
                                    });
                                }else{
                                    that.$message.error('操作失败');
                                }
                                let cnt1 = {
                                    projectId: that.meetInfo.id
                                }
                                that.$util.call('/vote/getVotes', cnt1, function (res) {
                                    that1.tableData = JSON.parse(res.data.c)
                                })


                            })

                        })
                        .catch(_ => {});

                }
                    // console.log(info.isAbstain)
            }
        },

        mounted() {
            let that = this
            let info = this.$route.params.info
            console.log(info)
            if (info == '' || info == undefined) {
                this.isEditMeet = false
                this.meetShow = true
                this.editBtnShow =false

                this.addVoteShow = false
            } else {
                this.editBtnShow = true

                this.addVoteShow = false
                this.meetShow = false
                this.meetTitle = info.title
                this.meetRemark = info.remark
                this.meetStartTime = new Date(info.startTime)
                this.meetExpiryTime = new Date(info.expiryTime)
                this.meetInfo = info
                let cnt1 = {
                    projectId: this.meetInfo.id
                }
                this.$util.call('/vote/getVotes', cnt1, function (res) {
                    that.tableData = JSON.parse(res.data.c)
                    console.log(that.tableData)
                })

            }
        }

    }
</script>

<style scoped lang="scss">
    .row-text-box {
        margin-top: 1rem;
    }

    .lable-box {
        font-size: 1.6rem;
        line-height: 3rem;
        text-align: right;
        width: 100%;
    }

    .row-box {
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

    .row-box3 {
        margin-top: 40px;
        text-align: center;
        padding-bottom: 20px;
    }

    .el-tag {
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

    .el-tag + .el-tag {
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
