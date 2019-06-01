<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <span class="title-box" style="line-height: 40px">移除户成员操作</span>
                <el-button type="primary" size="small" style="float: right; margin-right: 50px"
                           @click="changeFamilyBtn">更换家庭户
                </el-button>
            </el-col>
        </el-row>

        <el-row class="row-box1">
            <el-row class="row-box1" style="margin-top: 0px;padding-top:0px; ">

                <el-row>
                    <el-col :span="24">
                      <span class="table-title">
                            原始家庭户
                      </span>
                        <span class="table-master">
                            家庭户主: <span v-if="pastData.length>0">{{pastData[0].familyMaster}}</span>
                        </span>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <template>
                            <el-table
                                    :data="pastData"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        prop="familyNumber"
                                        label="户序号">
                                </el-table-column>
                                <el-table-column
                                        prop="shareCerNo"
                                        label="股权证编号">
                                </el-table-column>
                                <el-table-column
                                        prop="realName"
                                        label="用户名">
                                </el-table-column>
                                <el-table-column
                                        prop="idNumber"
                                        label="身份证">
                                </el-table-column>
                                <el-table-column
                                        prop="familyMaster"
                                        label="户主姓名">
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        width="200">
                                    <template slot-scope="scope">
                                        <el-button @click="returnBtn(scope.$index)" type="text" size="small"><span
                                                style="color: #f60;font-size: 20px;padding: 0 20px;line-height: 20px"
                                                class="iconfont icon-quxiao2"></span></el-button>
                                        <el-button @click="setMasterBtn(scope.row)" type="text" size="small"
                                                   style="font-size: 16px;line-height: 20px">设置为户主
                                        </el-button>
                                    </template>
                                </el-table-column>

                            </el-table>
                        </template>
                    </el-col>
                </el-row>

            </el-row>

        </el-row>


        <el-row class="row-box1">
            <el-col :span="24" style="text-align: center">
                <el-button type="primary" @click="deleteFamilyBtn">确认提交分户信息进行审批</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "addFamily",
        data() {
            return {
                info: '',
                pastData: [],    //动态改变的过去的数据
                oldData: [],     //永不改变的过去的数据
                newData: [],     //现在新增的户的数据
                pastDataSign: [],//打上标记的数据

                editFamilyMaster: '',

                resArr: {},      //最终的提交数据

            }

        },
        methods: {
            //移除户成员
            returnBtn(index) {

                for (let i = 0; i < this.pastDataSign.length; i++) {
                    if (this.pastDataSign[i].id == this.pastData[index].id) {
                        let obj = JSON.parse(JSON.stringify(this.pastDataSign[i]))
                        obj.userTab = this.$constData.tab[0].key
                        this.pastDataSign[i] = obj
                    }
                }
                this.pastData.splice(index, 1)
            },

            setMasterBtn(row) {
                this.editFamilyMaster = 1
                let master = row.realName
                for (let i = 0; i < this.pastData.length; i++) {
                    this.pastData[i].familyMaster = master
                    this.pastData[i].shareCerHolder = false
                    if (this.pastData[i].realName == master) {
                        this.pastData[i].shareCerHolder = true
                    }
                }
                //标记
                for(let i=0;i<this.pastDataSign.length;i++){
                    this.pastDataSign[i].familyMaster = master
                    this.pastDataSign[i].shareCerHolder = false
                    if (this.pastDataSign[i].realName == master) {
                        this.pastDataSign[i].shareCerHolder = true
                    }
                }
            },

            //提交数据
            deleteFamilyBtn() {
                if (this.pastData.length == 0) {
                    this.$message.error('家庭户必须至少有一个成员！')
                } else {
                    let master = this.pastData[0].familyMaster
                    let _index = -1
                    for (let i = 0; i < this.pastData.length; i++) {
                        if (master == this.pastData[i].realName) {
                            _index = i
                        }
                    }
                    if (_index == -1) {
                        this.$message.error('家庭户户主被移除，请重新设置户主')
                    } else {
                        let data = {}
                        data.ext = {
                            familyOperate: this.$constData.familyType[3].key,
                            editHouseholder: this.editFamilyMaster
                        }
                        data.oldData = this.oldData
                        data.newData = []
                        data.newData.push(this.pastDataSign)
                        let cnt = {
                            orgId: localStorage.getItem('orgId'),
                            data: data,
                            type: this.$constData.examineType[1].key,
                            remark: '无'
                        }
                        this.$api.createExamine(cnt, (res) => {
                            if (res.data.rc == this.$util.RC.SUCCESS) {
                                this.$message.success('操作成功')
                            } else {
                                this.$message.error('操作失败')
                            }
                            this.$router.push('/examine')
                        })
                    }
                }
            },


            changeFamilyBtn() {
                this.$confirm('更换家庭户当前修改操作作废，是否确认更换？')
                    .then(() => {
                        this.$router.push({
                            path: '/familyList',
                            name: 'familyList',
                            params: {
                                routerPath: 'deleteFamily'
                            }
                        })
                    }).catch(() => {
                });
            }
        },

        created() {
            let info = this.$route.params.info
            if (info == '' || info == undefined) {
                this.$message('请先选择一个家庭户')
                this.$router.push({
                    path: '/familyList',
                    name: 'familyList',
                    params: {
                        routerPath: 'deleteFamily'
                    }
                })
            }
        },

        mounted() {
            this.info = this.$route.params.info
            if (this.info != '' && this.info != undefined) {
                let cnt = {
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    familyNumber: this.info.familyNumber, // Long 户序号
                }
                this.$api.getFamilyUserByFamilyNumber(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.pastData = JSON.parse(JSON.stringify(this.$util.tryParseJson(res.data.c)))
                        this.oldData = JSON.parse(JSON.stringify(this.$util.tryParseJson(res.data.c)))
                    } else {
                        this.pastData = []
                        this.oldData = []
                    }
                    this.pastDataSign = JSON.parse(JSON.stringify(this.pastData))
                })
            }

        }

    }
</script>

<style scoped lang="scss">
    .row-box {
        background: #fff;
        padding: 15px 0;
        border-left: 4px solid #63a35c;
    }

    .title-box {
        font-size: 16px;
        line-height: 30px;
        padding: 0 15px;

    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }

    .table-title {
        line-height: 40px;
        color: #666;
        font-size: 16px
    }

    .table-master {
        font-size: 14px;
        margin-left: 20px;
        line-height: 40px;
        color: #666;
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-quxiao2:before {
        content: "\e67a";
    }
</style>
