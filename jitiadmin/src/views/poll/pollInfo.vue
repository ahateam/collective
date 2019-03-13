<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                投票详情
            </el-col>
        </el-row>

        <el-row class="row-box1" >
            <el-col :span="24">
                <span style="font-size: 1.6rem;color: #666;">   投票信息</span>

                <el-button type="primary" icon="el-icon-edit" size="mini" style="float: right;" @click="voteOption" v-if="isVote >=1">选项管理</el-button>
                <el-button type="primary" icon="el-icon-edit" size="mini" style="float: right;margin-right: 30px" @click="isVote = 2" v-if="isVote >=1">编辑投票</el-button>
            </el-col>
            <el-row class="row-box1" style="margin-top: 40px">
                <el-col :span="24">
                    <el-row :gutter="40" class="row-text-box">
                        <el-col :span="6">
                            <div class="lable-box"> 投票标题</div>
                        </el-col>
                        <el-col :span="18">
                            <el-input v-model="voteTitle" placeholder="请输入投票标题" :disabled="isVote == 1"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box">
                        <el-col :span="6">
                            <div class="lable-box"> 开始时间</div>
                        </el-col>
                        <el-col :span="18">
                                <el-date-picker
                                        v-model="startTime"
                                        type="datetime"
                                        placeholder="选择日期"
                                        :disabled="isVote == 1">
                                </el-date-picker>
                             <span style="margin: 0 20px">至</span>
                            <el-date-picker
                                    v-model="expiryTime"
                                    type="datetime"
                                    placeholder="选择日期"
                                    :disabled="isVote == 1">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box">
                        <el-col :span="6">
                            <div class="lable-box"> 投票模板</div>
                        </el-col>
                        <el-col :span="18" style="line-height: 3rem">
                            <template>
                                <el-radio v-model="voteTemplate" :label="0" @change="templateBtn(0)" :disabled="isVote != 0">选举投票</el-radio>
                                <el-radio v-model="voteTemplate" :label="1" @change="templateBtn(1)" :disabled="isVote != 0">普通投票</el-radio>
                            </template>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box">
                        <el-col :span="6">
                            <div class="lable-box"> 选项类型</div>
                        </el-col>
                        <el-col :span="18" style="line-height: 3rem">
                            <template>
                                <el-radio v-model="voteType" :label="0" @change="voteTypeBtn(0)" :disabled="isVote == 1">单选(只选取一个)</el-radio>
                                <el-radio v-model="voteType" :label="1" @change="voteTypeBtn(1)" :disabled="isVote == 1">多选(选取多个)</el-radio>
                            </template>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box" v-if="voteType == 1">
                        <el-col :span="6">
                            <div class="lable-box"> 最多选项</div>
                        </el-col>
                        <el-col :span="18">
                            <el-input v-model="voteChoiceCount" placeholder="请输入最多选项数" :disabled="isVote == 1"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box">
                        <el-col :span="6">
                            <div class="lable-box"> 参会人员</div>
                        </el-col>
                        <el-col :span="18" style="line-height: 3rem">
                            <template>
                                <el-checkbox-group v-model="roles" :disabled="isVote == 1">
                                    <el-checkbox :label="item.roleId" v-for="(item,index) in crowdList.roles" :key="index">{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-col>
                        <el-col :span="18" :offset="6" style="line-height: 3rem">
                            <template>
                                <el-checkbox-group v-model="groups" :disabled="isVote == 1">
                                    <el-checkbox :label="item" v-for="(item,index) in crowdList.tags.groups" :key="index" >{{item}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-col>
                        <el-col :span="18" :offset="6" style="line-height: 3rem">
                            <template>
                                <el-checkbox-group v-model="tags" :disabled="isVote == 1">
                                    <el-checkbox :label="item" v-for="(item,index) in crowdList.tags.tags" :key="index">{{item}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box">
                        <el-col :span="6">
                            <div class="lable-box"> 失效比例</div>
                        </el-col>
                        <el-col :span="18" style="line-height: 3rem">
                            <template>
                                <el-select v-model="failureRatio" placeholder="请选择" :disabled="isVote == 1">
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
                            <div class="lable-box"> 通过比例</div>
                        </el-col>
                        <el-col :span="18" style="line-height: 3rem">
                            <template>
                                <el-select v-model="effectiveRatio" placeholder="请选择" :disabled="isVote == 1">
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
                            <div class="lable-box"> 投票内容</div>
                        </el-col>
                        <el-col :span="18">
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="请输入投票内容"
                                    v-model="voteRemark"
                                    :disabled="isVote == 1"
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40" class="row-text-box">
                        <el-col :span="18" :offset="6">
                            <el-button type="primary" @click="addVote" v-if="isVote == 0">确认新增投票并新增选项</el-button>

                            <router-link to="/poll"> <el-button   v-if="isVote == 1">返回列表</el-button></router-link>
                            <el-button type="primary" @click="editVote" v-if="isVote == 2">确认修改投票</el-button>
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
                <router-link to="/poll">  <el-button type="primary" >确认完成选项操作</el-button></router-link>
            </div>
        </el-dialog>

        <el-dialog title="选项管理" :visible.sync="dialogFormVisible1">
            <span v-for="(item,index) in voteOptions" :key="index">
                <el-tag closable @close="delOption(item.id)">{{item.title}}</el-tag>
            </span>
            <el-row class="row-box1">
                <el-input placeholder="请输入用户姓名" v-model="searchData"  @change="searchBtn">
                    <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                </el-input>

                <el-row>
                    <el-col :span="24">
                        <div v-for="(item,index) in searchList" :key="index"   @click="addUser(item.user)" style="cursor: pointer;" >
                            <el-row style="margin-top: 1rem;border-bottom: 1px solid #ddd;padding: 1rem;">
                                <el-col :span="5"  >{{item.user.realName}} </el-col>
                                <el-col :span="19" > {{item.user.idNumber}}</el-col>
                            </el-row>
                        </div>

                    </el-col>
                </el-row>
            </el-row>

            <div slot="footer" class="dialog-footer">
              <router-link to="/poll">  <el-button type="primary" >确认完成选项操作</el-button></router-link>
            </div>
        </el-dialog>
    </div>
</template>

<script>


    export default {
        name: "pollInfo",
        data() {
            return {
                //参会人员
                crowdList:{
                    roles:[],
                    tags:{
                        groups:[],
                        tags:[]
                    }
                },
                roles:[],
                groups:[],
                tags:[],

                //投票所需
                voteTitle: '',
                voteRemark: '',
                voteType: 0,
                voteTemplate: 0,
                voteChoiceCount: '1',
                voteCrowd:[] ,
                failureRatio: '67',
                effectiveRatio: '67',

                startTime:'',
                expiryTime:'',


                options: [
                    {
                    value: '33',
                    label: '1/3'
                }, {
                    value: '50',
                    label: '1/2'
                }, {
                    value: '67',
                    label: '2/3'
                }
                ],

                //投票列表
               isVote:0, //0：新增操作  1：查看操作 2：修改操作


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

            //下拉失败通过率的默认值设置
            templateBtn(val) {
                if (val == '0') {
                    this.failureRatio = '67'
                    this.effectiveRatio = '67'
                } else {
                    this.failureRatio = '67'
                    this.effectiveRatio = '67'
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
                let crowd = {
                    roles:this.roles,
                    tags:{
                        groups:this.groups,
                        tags:this.tags
                    }
                }
                console.log(crowd)
                let cnt = {
                    orgId: localStorage.getItem('orgId'),
                    template: this.voteTemplate,
                    type: this.voteType,
                    choiceCount: this.voteChoiceCount,
                    crowd: JSON.stringify(crowd),
                    reeditable: false,
                    realName: true,
                    isInternal: true,
                    isAbstain: true,
                    effectiveRatio: this.effectiveRatio,
                    failureRatio: this.failureRatio,
                    title: this.voteTitle,
                    remark: this.voteRemark,
                    ext: '无',
                    startTime:this.startTime.getTime(),
                    expiryTime:this.expiryTime.getTime()
                }
                console.log(cnt)
                this.$api.createVote(cnt,function (res) {
                    console.log(res)
                    if(res.data.rc == that.$util.RC.SUCCESS){
                        that.$message({
                            message: '新增投票成功',
                            type: 'success'
                        })

                        that.voteInfo = JSON.parse(res.data.c)
                        that.voteOption()
                        console.log('1111')
                    }
                })
            },

            //所有的投票
            templateFilter(row, col, value) {
                if (value == '0') {
                    return '选举投票'
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


            //选项管理-弹窗/请求已有的选项列表
            voteOption() {
                let that = this
                if(this.isEdit ==2){
                    that.$message.error('请先保存投票信息的修改')
                }else{
                    let cnt = {
                        voteId:  this.voteInfo.id
                    }
                    this.$api.getVoteOptions(cnt, function (res) {
                        that.voteOptions = JSON.parse(res.data.c)
                    })
                    if (this.voteInfo.template == 0) {
                        this.dialogFormVisible1 = true
                        this.searchData = ''
                        this.searchList = []

                    } else {
                        this.dialogFormVisible = true
                    }
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
                this.$api.delVoteOption( cnt, function (res) {
                    let cnt = {
                        voteId: that.voteInfo.id
                    }
                    that.$api.getVoteOptions(cnt, function (res) {

                        that1.voteOptions = JSON.parse(res.data.c)
                        console.log(that1.voteOptions)
                    })
                })
                console.log(optionId)
            },

            //普通投票-新增选项的输入框
            addOption() {
                if(this.addOptionTitle != ''){
                    this.addSubmit()
                }else{
                    this.isWrite = true
                }
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
                console.log(cnt)
                this.$api.addVoteOption( cnt, function (res) {
                    console.log(res)
                    if (res.data.rc == that.$util.RC.SUCCESS) {
                        that.$message.success('新增选项成功！')
                        that.addOptionTitle = ''
                        that.isWrite = false
                        let cnt = {
                            voteId: that.voteInfo.id
                        }
                        that.$api.getVoteOptions(cnt, function (res) {
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
                if(this.searchData == ''){
                    this.$message.error('请输入用户姓名')
                }else{
                    let count = 10
                    let offset = 0
                    let cnt = {
                        orgId: localStorage.getItem('orgId'),
                        realName: this.searchData,
                        count: count, // Integer
                        offset: offset, // Integer
                    };
                    this.$api.getORGUsersLikeRealName(cnt,function (res) {
                        that.searchList = JSON.parse(res.data.c)
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

                this.$api.addVoteOption(cnt,function (res) {
                    if (res.data.rc == that.$util.RC.SUCCESS) {
                        that.$message.success('新增选项成功！')
                        that.addOptionTitle = ''
                        that.isWrite = false
                        let cnt = {
                            voteId: that.voteInfo.id
                        }
                        that.$api.getVoteOptions(cnt, function (res) {
                            that1.voteOptions = JSON.parse(res.data.c)
                        })
                    } else {
                        that.$message.error('新增选项出错！')
                    }
                })

            },

            //修改表决
            editVote(){
                let that = this
                console.log('11111')
                console.log(this.voteInfo)
                let crowd = {
                    roles:this.roles,
                    tags:{
                        groups:this.groups,
                        tags:this.tags
                    }
                }
                let cnt = {
                    orgId: localStorage.getItem('orgId'),
                    voteId:this.voteInfo.id,
                    type: this.voteType,
                    choiceCount: this.voteChoiceCount,
                    crowd: JSON.stringify(crowd),
                    reeditable: false,
                    realName: true,
                    isInternal: true,
                    isAbstain: true,
                    effectiveRatio: this.effectiveRatio,
                    failureRatio: this.failureRatio,
                    title: this.voteTitle,
                    remark: this.voteRemark,
                    ext: '无',
                    startTime:this.startTime.getTime(),
                    expiryTime:this.expiryTime.getTime()
                }
                console.log(cnt)
                this.$api.editVote(cnt,function (res) {
                    console.log(res)
                    if (res.data.rc == that.$util.RC.SUCCESS) {
                        that.$message({
                            message: '修改投票成功',
                            type: 'success'
                        })
                        that.isVote = 1
                    } else {
                        that.$message.error('修改失败,输入有误')
                        that.isVote = 2
                    }
                })
            },




        },

        mounted() {
            let that = this

            let cnt ={}
            //所有的系统的角色列表
            this.$api.getSysORGUserRoles(cnt,function (res) {
                that.crowdList.roles = JSON.parse(res.data.c)
            })



            let info = this.$route.params.info
            console.log(info)
            if (info == '' || info == undefined) {
                    this.isVote = 0
            } else {
                    this.isVote = 1

                this.roles = JSON.parse(info.crowd).roles
                this.groups =JSON.parse(info.crowd).tags.groups
                this.tags = JSON.parse(info.crowd).tags.tags
                this.voteInfo = info
                this.voteTitle= info.title
                this.voteRemark = info.remark
                this.voteType = info.type
                this.voteTemplate = info.template
                this.voteChoiceCount = info.choiceCount
                this.failureRatio = info.failureRatio+''
                this.effectiveRatio = info.effectiveRatio+''
                this.startTime = new Date(info.startTime)
                this.expiryTime = new Date(info.expiryTime)

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
