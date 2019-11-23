<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <span class="title-box" style="line-height: 40px">新增户成员操作</span>
                <el-button type="primary" size="small" style="float: right; margin-right: 50px" @click="changeFamilyBtn">更换家庭户</el-button>
            </el-col>
        </el-row>

        <el-row class="row-box1">
            <div>
                <el-col :span="24">
                    <el-button type="primary" size="small" @click="addMemberModal = true"> + 新增户成员</el-button>
                </el-col>
            </div>
            <p style="clear: both"></p>
            <el-row class="row-box1">
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
                                        <el-button @click="returnBtn(scope.$index,scope.row)" type="text" size="small" v-if="scope.row.userTab == 1"><span
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
                <el-button type="primary" @click="createFamilyBtn">确认提交分户信息进行审批</el-button>
            </el-col>
        </el-row>

        <!--新增成员-->
        <el-dialog title="新增成员" :visible.sync="addMemberModal" width="60%">
            <el-form>
                <el-form-item label="成员名称" label-width="100px">
                    <el-input v-model="realName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" label-width="100px">
                    <el-input v-model="idNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" label-width="100px" >
                    <template>
                        <el-radio v-model="sex" :label="0"  >男</el-radio>
                        <el-radio v-model="sex" :label="1" >女</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="联系电话" label-width="100px">
                    <el-input v-model="mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否组织成员" label-width="100px" >
                    <template>
                        <el-radio v-model="isOrgUser" :label="true"   >组织成员</el-radio>
                        <el-radio v-model="isOrgUser" :label="false"  >外部成员</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="用户地址" label-width="100px">
                    <el-input v-model="address" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="股份数" label-width="100px">
                    <el-input type="number" v-model="shareAmount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="资源股" label-width="100px">
                    <el-input type="number" v-model="resourceShares" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="资产股" label-width="100px">
                    <el-input  type="number" v-model="assetShares" autocomplete="off" ></el-input>
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
        name: "addFamily",
        data() {
            return {
                addMemberModal:false,
                info: '',
                pastData: [],    //动态改变的过去的数据
                oldData: [],     //永不改变的过去的数据
                pastDataSign:[],    //加上标记的数据

                editFamilyMaster: '',

                //新增家庭户成员
                realName: '',
                idNumber: '',
                mobile: '',
                address: '',
                shareCerHolder: false,
                shareAmount: '',
                weight: '',
                userInfo: {},
                sex:'',
                familyMaster:'',
                assetShares:'',
                resourceShares:'',
                isOrgUser:true,

                //角色列表
                roleList: [],
                roles: [],
                groups:[102],
                tags:'{}',
            }
        },
        methods:{
            changeFamilyBtn() {
                this.$confirm('更换家庭户当前修改操作作废，是否确认更换？')
                    .then(_ => {
                        this.info = ''
                        this.$router.push({
                            path: '/familyList',
                            name: 'familyList',
                            params: {
                                routerPath: 'addFamily'
                            }
                        })
                    })
                    .catch(_ => {
                    });
            },
            //设置公用新增变量为空
            setNull() {
                this.addMemberModal = false
                this.realName = ''
                this.idNumber = ''
                this.mobile = ''
                this.address = ''
                this.shareAmount = ''
                this.weight = ''
                this.shareCerHolder = false
                this.userInfo = {}
                this.roles = []
                this.sex =0
                this.assetShares = ''
                this.resourceShares=''
                this.isOrgUser=true
            },
            addMemberBtn() {
                if (this.realName == '' || this.idNumber == '' || this.mobile == '' || this.address == '' || this.shareAmount == '' || this.weight == '' || this.roles.length == 0) {
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
                                this.userInfo.orgId = localStorage.getItem('orgId')
                                this.userInfo.roles = this.roles
                                this.userInfo.realName = this.realName
                                this.userInfo.idNumber = this.idNumber
                                this.userInfo.mobile = this.mobile
                                this.userInfo.address = this.address
                                this.userInfo.shareAmount = this.shareAmount
                                this.userInfo.weight = this.weight
                                this.userInfo.shareCerHolder = this.shareCerHolder
                                this.userInfo.familyMaster = this.pastData[0].familyMaster
                                this.userInfo.userTab = this.$constData.tab[1].key
                                this.userInfo.familyNumber = this.pastData[0].familyNumber
                                this.userInfo.shareCerNo = this.pastData[0].shareCerNo
                                this.userInfo.groups = this.groups
                                this.userInfo.tags = this.tags

                                this.userInfo.sex =this.sex
                                this.userInfo.assetShares = this.assetShares
                                this.userInfo.resourceShares=this.resourceShares
                                this.userInfo.isOrgUser=this.isOrgUser

                                this.pastData.push(this.userInfo)
                                this.pastDataSign.push(this.userInfo)

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
            //提交数据
            createFamilyBtn(){
                let ext={familyOperate:this.$constData.familyType[2].key,editHouseholder:this.editFamilyMaster}
                let newData = []
                newData.push(this.pastDataSign)
                let cnt={
                    orgId:localStorage.getItem('orgId'),
                    data:{ext:ext,oldData:this.oldData,newData:newData},
                    type:this.$constData.examineType[1].key,
                    remark:'无'
                }
                this.$api.createExamine(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('操作成功，请耐心等待审批')
                    }else{
                        this.$message.error('操作失败')
                    }
                    this.$router.push('/examine')
                })


            },
            //设置户主
            setMasterBtn(row){
                this.editFamilyMaster = 1
                let master = row.realName
                for(let i=0;i<this.pastData.length;i++){
                    this.pastData[i].familyMaster = master
                    this.pastData[i].shareCerHolder = false
                    //标记数组
                    this.pastDataSign[i].familyMaster = master
                    this.pastDataSign[i].shareCerHolder = false
                    if(this.pastData[i].realName == master){
                        this.pastData[i].shareCerHolder = true
                        //标记数组
                        this.pastDataSign[i].shareCerHolder = true
                    }
                }

            },
            //移除刚刚新增的用户数据
            returnBtn(index,row){

                this.pastData.splice(index,1)
                this.pastDataSign.splice(index,1)
                console.log(this.pastData);
            }
        },
        created(){
            let info = this.$route.params.info
            if(info == '' ||info == undefined){
                this.$message('请先选择一个家庭户')
                this.$router.push({
                    path: '/familyList',
                    name: 'familyList',
                    params: {
                        routerPath: 'addFamily'
                    }
                })
            }
        },
        mounted(){
            this.info = this.$route.params.info
            if(this.info != '' && this.info != undefined){
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

                let cnt1 = {}
                this.$api.getSysORGUserRoles(cnt1, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.roleList = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.roleList = []
                    }
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

    .table-master {
        font-size: 14px;
        margin-left: 20px;
        line-height: 40px;
        color: #666;
    }

    .table-title {
        line-height: 40px;
        color: #666;
        font-size: 16px
    }
</style>
