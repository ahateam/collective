<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24">
                新增表决信息
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-col :span="24">
                <el-col :span="4">
                    <div class="title-box">表决标题:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="title" placeholder="请输入表决标题"></el-input>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" style="margin-top: 20px;margin-bottom: 15px">
                <el-col :span="4">
                    <div class="title-box">表决类型:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <template >
                            <el-radio v-model="type" label="0" @change="showNum">单选</el-radio>
                            <el-radio v-model="type" label="1" @change="showNum">多选</el-radio>
                        </template>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" v-if="show ==true">
                <el-col :span="4">
                    <div class="title-box">多选数量:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="choiceCount" placeholder="请输入多选数量限制数"></el-input>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">时间范围:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            <el-date-picker
                                    v-model="dateTime"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>


                        </div>
                    </el-col>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="row-box2">
                    <el-col :span="4">
                        <div class="title-box">表决详情:</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="text-box">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 10}"
                                    placeholder="请输入表决详情（资料）"
                                    v-model="remark">
                            </el-input>
                        </div>
                    </el-col>
                </div>
            </el-col>

            <el-col :span="24" class="row-box3">
                <el-button type="primary" @click="editBtn">确认新增表决</el-button>
                <el-button style="margin-left: 50px">返回表决列表</el-button>
            </el-col>
        </el-row>


        <el-dialog title="新增表决选项" :visible.sync="showDialog">

            <el-row>
                <el-col :span="24">

                    <el-tag
                            :key="tag"
                            v-for="tag in dynamicTags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)"
                            type="primary"
                    >
                        {{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >

                    </el-input>
                    <el-row  v-else class="row-box2">
                        <el-col :span="24">
                            <el-button class="button-new-tag" size="small" @click="showInput" type="primary">添加选项</el-button>
                        </el-col>
                    </el-row>

                </el-col>
            </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" @click="addOption">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "voteInfo",
        data(){
            return{

                info:'',

                show:false,
                showDialog:false,
                title:'',
                type:'0',
                choiceCount:'1',
                dateTime:'',
                remark:'',
                startTime:'',
                expiryTime:'',
                voteId:'',
                dynamicTags: ['赞成', '反对', '弃权'],
                inputVisible: false,
                inputValue: '',
                callbackData:true
            }
        },
        methods:{
            // addBtn(){
            //     let that = this
            //     let orgId = localStorage.getItem('orgId')
            //     this.startTime = this.dateTime[0].getTime()
            //     this.expiryTime = this.dateTime[1].getTime()
            //
            //     if( this.title == '' || this.choiceCount == '' || this.dateTime == '' ||this.remark == ''){
            //         that.$message({
            //             showClose: true,
            //             message: '请填写完整的表决信息',
            //             type: 'error'
            //         })
            //     }else{
            //         this.$ajaxVote.api.createVote(orgId,this.title,this.remark,this.type,this.choiceCount,this.startTime,this.expiryTime,function (res) {
            //             console.log(res)
            //
            //             if(res.data.rc == 'succ'){
            //                 that.$message({
            //                     showClose: true,
            //                     message: '新增表决成功，请立即添加选项',
            //                     type: 'success'
            //                 })
            //                 that.voteId = JSON.parse(res.data.c).id
            //                 that.showDialog = true
            //
            //                 console.log(that.voteId)
            //
            //                 // that.$router.go(-1)
            //             }else{
            //                 that.$message({
            //                     showClose: true,
            //                     message: '新增表决失败',
            //                     type: 'error'
            //                 })
            //             }
            //         })
            //     }
            // },
            editBtn(){

            },



            showNum(){
                if( this.type == '1'){
                    this.show = true
                }else{
                    this.show = false
                    this.choiceCount = this.info.choiceCount
                }
            },

            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            addOption(){
                let that =  this
                if(this.voteId == ''){
                    that.$message({
                        showClose: true,
                        message: '请先选择表决',
                        type: 'error'
                    })
                    that.$router.push('/vote')
                }else{
                    let temp = [];
                    //去重算法
                    for(let i = 0; i < this.dynamicTags.length; i++){
                        if(temp.indexOf(this.dynamicTags[i]) == -1){
                            temp.push(this.dynamicTags[i]);
                        }
                    }
                    //请求后端接口
                    for(let i=0;i<temp.length;i++){
                        this.$ajaxVote.api.addVoteOption(this.voteId,temp[i],'',function (res) {
                            if(res.data.rc == 'fail'){
                                this.callbackData = false
                            }
                        })
                    }
                    //完成请求后判断是否添加成功
                    if(that.callbackData == true){
                        that.$message({
                            showClose: true,
                            message: '添加选项成功',
                            type: 'success'
                        })
                        that.$router.push('/vote')
                    }else{
                        that.$message({
                            showClose: true,
                            message: '添加选项失败，请重新添加',
                            type: 'error'
                        })
                        that.$router.push('/vote')
                    }
                }
            },


        },
        mounted(){
            this.info = this.$route.params.info
            this.title = this.info.title
            this.type =  ''+this.info.type
            this.dateTime = [this.info.startTime,this.info.expiryTime]
            this.choiceCount = this.info.choiceCount
            this.remark = this.info.remark
            if(this.type == '1'){
                this.show = true
            }

            console.log(this.info)
        }

    }
</script>

<style scoped lang="scss">
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
