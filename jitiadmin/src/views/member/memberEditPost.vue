<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                修改成员职务信息
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-col :span="24" class="row-box2">
                <el-col :span="4">
                    <div class="title-box">表决权重:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="weight" placeholder="请输入成员表决投票的权重值" ></el-input>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" class="row-box2">
                <el-col :span="4">
                    <div class="title-box">股份数:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="shareAmount" placeholder="请输入成员的股份数" ></el-input>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" class="row-box2">
                <el-col :span="4">
                    <div class="title-box">是否股东:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <template>
                            <el-select v-model="share" placeholder="请选择股东类型" >
                                <el-option
                                        v-for="item in options.shareList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" class="row-box2">
                <el-col :span="4">
                    <div class="title-box">是否董事:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <template>
                            <el-select v-model="duty" placeholder="请选择董事类型">
                                <el-option
                                        v-for="item in options.dutyList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" class="row-box2">
                <el-col :span="4">
                    <div class="title-box">是否监事:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <template>
                            <el-select v-model="visor" placeholder="请选择监事类型">
                                <el-option
                                        v-for="item in options.visorList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                </el-col>
            </el-col>

            <el-col :span="24" class="row-box3">
                <el-button type="primary" @click="editBtn">确认修改成员</el-button>
             <el-button style="margin-left: 50px" @click="returnBtn">返回列表</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "memberEdit",
        data(){
            return{
                info:{},
                userId:'',
                share:'',
                duty:'',
                visor:'',
                weight:'',
                shareAmount:'',
                options:{
                    shareList:[
                        {
                            value:'20',
                            label:'非股东'
                        },
                        {
                            value:'21',
                            label:'股东'
                        },
                        {
                            value:'22',
                            label:'股东代表'
                        }
                    ],
                    dutyList:[
                        {
                            value:'10',
                            label:'非董事'
                        },
                        {
                            value:'11',
                            label:'董事'
                        },
                        {
                            value:'12',
                            label:'董事长'
                        },
                        {
                            value:'13',
                            label:'副董事长'
                        }
                    ],
                    visorList:[
                        {
                            value:'10',
                            label:'非监事'
                        },
                        {
                            value:'11',
                            label:'监事'
                        },
                        {
                            value:'12',
                            label:'监事长'
                        },
                        {
                            value:'13',
                            label:'副监事长'
                        }
                    ],
                },
            }
        },
        methods:{
            editBtn(){
                let that = this
                let orgId = localStorage.getItem('orgId')
                if(this.userId == '' || this.share == '' || this.weight== '' || this.duty == '' || this.visor== ''){
                    that.$message({
                        showClose: true,
                        message: '请输入完整的用户信息',
                        type: 'error'
                    })
                }else{

                    if(  this.share == '20' || this.share == '非股东'){
                            this.share = '20'
                    }else if (this.share == '21' || this.share == '股东') {
                        this.share = '21'
                    }else if(this.share == '22' || this.share == '股东代表'){
                        this.share = '22'
                    }
                    if( this.duty == '10' || this.duty == '非董事'){
                        this.duty = '10'
                    }else if (this.duty == '11' || this.duty == '董事') {
                        this.duty = '11'
                    }else if(this.duty == '12' || this.duty == '董事长'){
                        this.duty = '12'
                    }else if(this.duty == '13' || this.duty == '副董事长'){
                        this.duty = '13'
                    }
                    if( this.visor == '10' || this.visor == '非监事'){
                        this.visor = '10'
                    }else if (this.visor == '11' || this.visor == '监事') {
                        this.visor = '11'
                    }else if(this.visor == '12' || this.visor == '监事长'){
                        this.visor = '12'
                    }else if(this.visor == '13' || this.visor == '副监事长'){
                        this.visor = '13'
                    }

                    let cnt = {
                        orgId: orgId,
                        userId: this.userId,
                        share: this.share,
                        shareAmount:this.shareAmount,
                        weight: this.weight,
                        duty: this.duty,
                        visor: this.visor,
                    };

                    this.$util.call('/org/editORGUser',cnt,function (res) {
                        if(res.data.rc == that.$util.RC.SUCCESS){
                            that.$message({
                                showClose: true,
                                message: '修改成功',
                                type: 'success'
                            })
                        }else{
                            that.$message({
                                showClose: true,
                                message: '修改信息失败',
                                type: 'error'
                            })
                        }
                        that.$router.go(-1)
                    })
                }

            },
            returnBtn(){
                this.$router.go(-1)
            },
        },
        mounted(){

            this.info = this.$route.params.info
            console.log(this.info)
            this.userId =  this.info.user.id
            this.weight = this.info.role.weight
            this.shareAmount = this.info.role.shareAmount
            if(this.info.role.share == '20'){
                this.share = '非股东'
            }else if (this.info.role.share == '21') {
                this.share = '股东'
            }else if(this.info.role.share == '22'){
                this.share = '股东代表'
            }
            if(this.info.role.duty == '10'){
                this.duty = '非董事'
            }else if (this.info.role.duty == '11') {
                this.duty = '董事'
            }else if(this.info.role.duty == '12'){
                this.duty = '董事长'
            }else if(this.info.role.duty == '13'){
                this.duty = '副董事长'
            }

            if(this.info.role.visor == '10'){
                this.visor = '非监事'
            }else if (this.info.role.visor == '11') {
                this.visor = '监事'
            }else if(this.info.role.visor == '12'){
                this.visor = '监事长'
            }else if(this.info.role.visor == '13'){
                this.visor = '副监事长'
            }
        }
    }
</script>

<style scoped lang="scss">
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
    }
    .row-box2{
        margin-top: 20px;
    }
    .row-box3{
        margin:20px;
        margin-top: 40px;
        text-align: center;
    }
</style>
