<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <span class="title-box" style="line-height: 40px">创建新户操作</span>
            </el-col>
        </el-row>

        <el-row class="row-box1">
            <!--item: [{user1}]   index:0   newData[index] = item  -->
            <el-row class="row-box1" v-for="(item,index) in newData" :key="index">
                <el-row>
                    <el-col :span="24">
                      <span class="table-title">
                            家庭户 {{index+1}}
                      </span>
                        <span class="table-master">
                          家庭户主: <span v-if="item.length>0">{{item[0].familyMaster}}</span>
                      </span>
                        <span class="table-add">
                        <el-button type="success" size="mini" @click="addUser()">新增成员</el-button>
                    </span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <template>
                            <el-table
                                    :data="item"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        prop="realName"
                                        label="用户名">
                                </el-table-column>
                                <el-table-column
                                        prop="idNumber"
                                        label="身份证">
                                </el-table-column>
                                <el-table-column
                                        prop="mobile"
                                        label="手机号">
                                </el-table-column>
                                <el-table-column
                                        prop="familyMaster"
                                        label="户主姓名">
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        width="200">
                                    <template slot-scope="scope">
                                        <el-button @click="returnBtn(scope.row,index)" type="text" size="small"><span
                                                style="color: #f60;font-size: 20px;padding: 0 20px;line-height: 20px"
                                                class="iconfont icon-quxiao2"></span></el-button>
                                        <el-button @click="setMasterBtn(scope.row,index)" type="text" size="small"
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
                <el-button type="primary" @click="createBtn">确认提交新户信息进行审批</el-button>
            </el-col>
        </el-row>

        <!--新增成员-->
        <el-dialog title="新增成员" :visible.sync="addMemberModal" width="60%">
            <el-form>
                <el-form-item label="成员名称" label-width="100px">
                    <el-input v-model="name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" label-width="100px">
                    <el-input v-model="idNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" label-width="100px">
                    <el-input v-model="mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户地址" label-width="100px">
                    <el-input v-model="address" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="股份数" label-width="100px">
                    <el-input v-model="shareAmount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="投票权重" label-width="100px">
                    <el-input v-model="weight" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="职务角色" label-width="100px">
                    <template>
                        <el-checkbox-group v-model="roles">
                            <el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.roleId">
                                {{item.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addMemberModal = false">取 消</el-button>
                <el-button type="primary" @click="addMemberBtn">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "createFamily",
        data() {
            return {

                newData: [],
                addMemberModal: false,
                //新增成员所需变量
                name: '',
                idNumber: '',
                mobile: '',
                address: '',
                shareCerHolder: false,
                shareAmount: '',
                weight: '',
                userInfo: {},
                familyMaster:'',


                //角色列表
                roleList: [],
                roles: [],


            }
        },
        methods: {
            createBtn() {
                let key = -1
                for(let i=0;i<this.newData[0].length;i++){
                    if(this.newData[0][i].familyMaster == ''){
                        key = i
                    }
                }
                if(key!= -1){
                    this.$message.error('请先设置户主')
                }else{
                    let data = {}

                    let ext ={familyOperate:this.$constData.familyType[0].key}
                    let oldData = []
                    data.oldData = oldData
                    data.ext = ext
                    data.newData = this.newData

                    let cnt ={
                        orgId: localStorage.getItem('orgId'),
                        data:data,
                        type:this.$constData.examineType[1].key,
                        remark:'无'
                    }
                    this.$api.createExamine(cnt,(res)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            this.$message.success('新增操作成功，请等待审批')
                        }else{
                            this.$message.error('操作失败')
                        }
                        this.$router.push('/examine')
                    })

                }

            },
            //新增成员显示弹出框
            addUser() {
                this.addMemberModal = true

            },
            //设置公用新增变量为空
            setNull() {
                this.addMemberModal = false
                this.name = ''
                this.idNumber = ''
                this.mobile = ''
                this.address = ''
                this.shareAmount = ''
                this.weight = ''
                this.shareCerHolder = false
                this.userInfo = {}
                this.roles = []
            },
            //添加成员
            addMemberBtn() {
                if (this.name == '' || this.idNumber == '' || this.mobile == '' || this.address == '' || this.shareAmount == '' || this.weight == '' || this.roles.length == 0) {
                    this.$message.error('请将用户信息输入完整')
                } else if (this.idNumber.length < 16 || this.idNumber.length > 19) {
                    this.$message.error('身份证号输入错误')
                } else if (this.mobile.length != 11) {
                    this.$message.error('用户手机号输入错误')
                } else {
                    let cnt = {
                        orgId: localStorage.getItem('orgId'), // Long 组织编号
                        idNumber:  this.idNumber, // String 身份证号码
                    };

                    this.$api.getOrgUser(cnt, (res) => {
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            if(res.data.c == 0){
                                this.userInfo.roles = this.roles
                                this.userInfo.realName = this.name
                                this.userInfo.idNumber = this.idNumber
                                this.userInfo.mobile = this.mobile
                                this.userInfo.address = this.address
                                this.userInfo.shareAmount = this.shareAmount
                                this.userInfo.weight = this.weight
                                this.userInfo.shareCerHolder = this.shareCerHolder
                                this.userInfo.familyMaster = this.familyMaster
                                this.newData[0].push(this.userInfo)
                                this.setNull()
                            }else{
                                    this.$message.error('该用户已经在当前组织，如果需要加入当前家庭户，请前往“成员移户”操作')
                            }
                        }else{
                            this.$message.error('操作失败')
                        }

                    })
                }
            },
            //设置户主
            setMasterBtn(row,index){
                this.familyMaster = row.realName
                for(let i=0;i<this.newData[index].length;i++){
                    let obj =JSON.parse(JSON.stringify(this.newData[index][i]))
                    if(this.familyMaster ==this.newData[index][i].realName ){
                        obj.shareCerHolder = true
                    }
                    obj.familyMaster = this.familyMaster
                    this.newData[index].splice(i,1,obj)
                }
            }
        },
        mounted() {
            let arr = []
            this.newData.push(arr)      //this.newData =[[{user1},{user2}]]


            let cnt = {}
            this.$api.getSysORGUserRoles(cnt, (res) => {
                if (res.data.rc == this.$util.RC.SUCCESS) {
                    this.roleList = this.$util.tryParseJson(res.data.c)
                } else {
                    this.roleList = []
                }
            })

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

    .table-master {
        font-size: 14px;
        margin-left: 20px;
        line-height: 40px;
        color: #666;
    }

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
</style>
