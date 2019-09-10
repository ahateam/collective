<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <span class="title-box" style="line-height: 40px">股东股权变更</span>
                <div style="float: right;margin-right: 50px">
                    <el-button type="primary" size="small" @click="changeUserBtn"> 更换股东</el-button>
                </div>
            </el-col>

        </el-row>
        <el-row class="row-box1">
            <el-row v-if="info != '' && info !=undefined">
                <el-col :span="12">
                    <el-row> <span style="font-size: 16px;color: #666;"> 股东基本信息</span></el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="24">
                            <div class="info-box">
                                <div class="title">
                                    股东用户姓名：
                                </div>
                                <div class="content">
                                    {{info.user.realName}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户手机：
                                </div>
                                <div class="content">
                                    {{info.user.mobile}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户资源股：
                                </div>
                                <div class="content">
                                    {{resourceShares}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户身份证号：
                                </div>
                                <div class="content">
                                    {{info.user.idNumber}}
                                </div>
                            </div>


                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row> <span style="font-size: 16px;color: #666;"> 股东职务股份信息</span></el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="24">
                            <div class="info-box">
                                <div class="title">
                                    股东用户职务：
                                </div>
                                <div class="content">
                                    {{postStr}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户股份数：
                                </div>
                                <div class="content">
                                    {{shareNumber}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户资产股：
                                </div>
                                <div class="content">
                                    {{assetShares}}
                                </div>
                            </div>
                            <div class="info-box">
                                <div class="title">
                                    股东用户股权证：
                                </div>
                                <div class="content">
                                    {{info.orgUser.shareCerNo}}
                                </div>
                            </div>

                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-col :span="24" style="text-align: center">
                    <el-button type="primary" @click="dialogFormVisible =true">修改股份数/股权</el-button>
                </el-col>
            </el-row>

        </el-row>
        <el-dialog title="修改该股东股权" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="新的股份总数" label-width="150px">
                    <el-input  type="number" v-model="shareNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="资源股份总数" label-width="150px">
                    <el-input  type="number"  v-model="resourceShares" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="资产股份总数" label-width="150px">
                    <el-input  type="number"  v-model="assetShares" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="returnBtn">取 消</el-button>
                <el-button type="primary" @click="editInfoBtn">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "share",
        data(){
            return{
                info:'',
                postStr:'',
                roleList:[],
                dialogFormVisible:false,
                shareNumber:'',
                resourceShares:'',
                assetShares:'',
            }
        },
        methods: {
            editInfoBtn(){
                if(this.shareNumber == '' ){
                    this.$message.error('请输入股份数')
                }else if( isNaN(this.shareNumber )){
                    this.$message.error('请输入数字')
                }else{
                    let data = {}
                    data.oldData = []
                    data.newData = []
                    data.oldData[0] = this.info

                    let obj = JSON.parse(JSON.stringify(this.info))
                    obj.orgUser.shareAmount = parseFloat(this.shareNumber)
                    obj.orgUser.resourceShares = parseFloat(this.resourceShares)
                    obj.orgUser.assetShares = parseFloat(this.assetShares)
                    data.newData[0] = obj

                    this.$confirm('是否将新的股份数提交审批？')
                        .then(_ => {
                            let cnt = {
                                orgId: localStorage.getItem('orgId'), // Long 组织编号
                                data: data, // String 修改数据  {oldData:[....],newData:[.....]}
                                type: this.$constData.examineType[2].key, // Byte 审核类型
                                remark: '无', // String <选填> 备注
                            }
                            this.$api.createExamine(cnt,(res)=>{
                                if(res.data.rc == this.$util.RC.SUCCESS){
                                    this.$message.success('申请审批成功,请等待审批')
                                }else{
                                    this.$message.error('操作失败')
                                }
                                this.$router.push('/examine')
                            })



                        })
                        .catch(_ => {
                            this.dialogFormVisible= false
                            this.shareNumber = this.info.orgUser.shareAmount

                        })
                }
            },
            returnBtn(){
                this.dialogFormVisible= false
                this.shareNumber = this.info.orgUser.shareAmount

            },
            changeUserBtn() {
                this.$router.push('/shareUserList')
            },
            getSysORGUserRoles(cnt) {
                this.$api.getSysORGUserRoles(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.roleList = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.roleList = []
                    }
                    this.roleFilter()
                })
            },
            roleFilter() {
                let arr = JSON.parse(this.info.orgUser.roles)   //取出默认的全部是id的数组
                let name = '';
                for (let i = 0; i < arr.length; i++) {
                    let name1 = ''
                    for (let j = 0; j < this.roleList.length; j++) {
                        if (arr[i] == this.roleList[j].roleId) {
                            name1 = this.roleList[j].name
                        }
                    }
                    name += ';'
                    name += name1
                }
                this.postStr = name.substr(1)
            },
        },
        created(){
           if(this.$route.params.info == undefined || this.$route.params.info == null){
                this.$message('请选择一位股东')
               this.$router.push('/shareUserList')
           }
        },
        mounted(){
            this.info = this.$route.params.info
             if(this.info != undefined && this.info != ''){
                 this.shareNumber = this.info.orgUser.shareAmount
                 this.resourceShares = this.info.orgUser.resourceShares
                 this.assetShares = this.info.orgUser.assetShares
                  let cnt ={}
                  console.log(this.info.orgUser)
                  // 请求职位列表
                  this.getSysORGUserRoles(cnt)
             }

        }
    }
</script>

<style scoped lang="scss">
    .nav-btn {
        float: left;
        margin-left: 15px;
    }

    .row-box {
        background: #fff;
        padding: 15px 0;
        border-left: 4px solid #63a35c;
    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;

    }

    .title-box {
        font-size: 16px;
        line-height: 30px;
        padding: 0 15px;

    }

    .content-box {
        margin-top: 10px;
    }

    .table-title {
        line-height: 40px;
        color: #666;
        font-size: 16px
    }

    .table-del {
        line-height: 40px;
        color: #f44;
        font-size: 20px;
        float: right;
        margin-right: 20px;
        padding: 0 20px;
        cursor: pointer;
    }

    .table-del i {
        font-size: 25px;
    }

    .table-add {
        float: right;
        line-height: 40px;
    }

    .table-master {
        font-size: 14px;
        margin-left: 20px;
        line-height: 40px;
        color: #666;
    }
    .info-box{
        margin: 10px 0;
        width: 100%;
        height: 20px;
    }
    .title{
        float: left;
        width: 150px;
        font-size: 1.6rem;
        color: #333;
        line-height: 20px;
        text-align: left;

    }
    .content{
        float: left;
        width: auto;
        line-height: 20px;
        font-size: 16px;
        color: #666;

    }
</style>
