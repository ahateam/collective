<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                新增组织成员
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-col :span="24">
                <el-col :span="4">
                    <div class="title-box">成员名称:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="name	" placeholder="请输入董事名称（保持与身份证一致）"></el-input>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" class="row-box2">
                <el-col :span="4">
                    <div class="title-box">身份证号:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="idNumber" minlength="16" maxlength="19" placeholder="请输入成员身份证号（保持与身份证一致）"></el-input>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" class="row-box2">
                <el-col :span="4">
                    <div class="title-box">联系电话:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input v-model="mobile"  type="text" minlength="11" maxlength="11" placeholder="请输入成员联系电话"  ></el-input>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" class="row-box2">
                <el-col :span="4">
                    <div class="title-box">表决权重:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input type="number" v-model="weight" placeholder="请输入成员表决投票的权重值" @focus="weightBtn"></el-input>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" class="row-box2">
                <el-col :span="4">
                    <div class="title-box">股份数量:</div>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-input type="number" v-model="shareAmount" placeholder="请输入成员股份数" ></el-input>
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
                            <el-select v-model="share" placeholder="请选择股东类型">
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
                <el-button type="primary" @click="addBtn">确认新增成员</el-button>
                <router-link to="/director"><el-button style="margin-left: 50px">返回列表</el-button></router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "memberAdd",
        data(){
            return{
                name:'',
                idNumber:'',
                mobile:'',
                share:'21',
                duty:'10',
                visor:'10',
                weight:'0',
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
            addBtn(){
                let that = this
                if(this.name == '' || this.idNumber == '' || this.mobile == '' || this.share =='' || this.duty == '' || this.visor == '' || this.weight == ''|| this.shareAmount== ''){
                    this.$message({
                        showClose: true,
                        message: '成员信息未填写完整',
                        type: 'error'
                    })
                }else if(this.idNumber.length>=16 || this.idNumber.length<=19){
                    let orgId = localStorage.getItem('orgId')
                    let cnt = {
                        orgId: orgId,
                        mobile: this.mobile,
                        realName: this.name,
                        idNumber: this.idNumber,
                        share: this.share,
                        shareAmount:this.shareAmount,
                        weight: this.weight,
                        duty: this.duty,
                        visor: this.visor,
                    };

                    this.$util.call('/org/createORGUser',cnt,function (res) {
                        console.log(res)
                        if(res.data.rc == that.$util.RC.SUCCESS){
                            that.$message({
                                showClose: true,
                                message: '新增成功',
                                type: 'success'
                            })
                            that.$router.push('/memberList')
                        }else{
                            console.log(res)
                            that.$message({
                                showClose: true,
                                message: '新增失败',
                                type: 'error'
                            })
                        }
                    })
                }else{
                    this.$message({
                        showClose: true,
                        message: '身份证信息填写错误',
                        type: 'error'
                    })
                }
            },
            weightBtn(){
                this.weight = ''
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
