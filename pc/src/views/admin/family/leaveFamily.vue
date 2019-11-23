<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <span class="title-box" style="line-height: 40px">家庭分户操作</span>
                <div style="float: right;margin-right: 50px">
                    <el-button type="primary" size="small" @click="changeFamilyBtn"> 更换家庭户</el-button>
                </div>
            </el-col>

        </el-row>

        <el-row class="row-box1">
            <el-row>
                <el-col :span="24">
                    <el-button type="primary" size="small" @click="addSeparate"> + 新增家庭户</el-button>
                </el-col>
            </el-row>
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
                                        <!--<el-button @click="delSeparateBtn(scope.row)" type="text" size="small"><span-->
                                                <!--style="color: #f44;font-size: 20px"-->
                                                <!--class="iconfont icon-quxiao1"></span></el-button>-->
                                        <el-button @click="setPastMasterBtn(scope.row)" type="text" size="small"
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

        <el-row class="row-box1" v-for="(item,index) in newData" :key="index">
            <el-row>
                <el-col :span="24">
                      <span class="table-title">
                            家庭户 {{index+1}}
                      </span>
                    <span class="table-master">
                          家庭户主: <span v-if="item.length>0">{{item[0].familyMaster}}</span>
                      </span>
                    <span class="table-del" @click="delSeparate(item,index)">
                            <i class="iconfont icon-19icon"></i>
                    </span>
                    <span class="table-add">
                        <el-button type="success" size="mini" @click="removeModal(index)">移入成员</el-button>
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

        <el-row class="row-box1">
            <el-col :span="24" style="text-align: center">
                <el-button type="primary" @click="createBtn">确认提交分户信息进行审批</el-button>
            </el-col>
        </el-row>

        <el-dialog title="移入成员到家庭户" :visible.sync="removeModalShow">

            <el-transfer
                    v-model="tranData"
                    :props="{
                      key: 'id',
                      label: 'realName'
                    }"
                    :titles="['原始家庭户', tranTitle]"
                    :data="pastData">
            </el-transfer>

            <div slot="footer" class="dialog-footer">
                <el-button @click="removeModalShow = false">取 消</el-button>
                <el-button type="primary" @click="removeBtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "examineSeparate",
        data() {
            return {
                info: '',
                pastData: [],    //动态改变的过去的数据
                oldData: [],     //永不改变的过去的数据
                newData: [],     //现在新增的户的数据
                removeModalShow: false,

                _index: 0,       //操作的家庭户的下标
                tranTitle: '',
                tranData: [],    //穿梭框右侧的已经有的数据列表

                resArr: {},      //最终的提交数据

               editFamilyMaster:false,

            }
        },
        methods: {
            //跳转列表页-清除列表
            changeFamilyBtn(){
                this.info = ''
                this.$router.push({
                    path: '/familyList',
                    name: 'familyList',
                    params: {
                        routerPath: 'leaveFamily',
                        family:''
                    }
                })
            },

            //原始数据清除一个用户
            delSeparateBtn() {
                this.$message.error('暂不支持清除原始家庭户中的用户')
            },

            //提交数据进行审批
            createBtn() {
                this.$confirm('确认修改当前户信息？')
                    .then(_ => {
                        let dataArr = []
                        dataArr.push(this.pastData)
                        dataArr = dataArr.concat(this.newData)
                        let key = -1
                        let sameKey = []
                        console.log(dataArr)
                        for (let i = 0; i < dataArr.length; i++) {
                            let master= dataArr[i][0].familyMaster
                            sameKey[i] = -1
                            for (let j = 0; j < dataArr[i].length; j++) {
                                if (dataArr[i][j].familyMaster == '') {
                                    //如果有户主没有设置
                                    key = i
                                }
                                //户主字段有值 但是户主被移到另外的组织了
                                if(master ==dataArr[i][j].realName){
                                    sameKey[i] = j    //找到户主

                                }

                            }
                        }
                        console.log(sameKey)
                        if (key != -1) {
                            this.$message.error('请设置家庭户 ' + key + '的户主')
                        } else {
                            let num = -1
                            for(let i=0;i<sameKey.length;i++){
                                if(sameKey[i] == -1){       //该户没有找到户主
                                    num = i
                                }
                            }
                            if(num == -1){
                                for (let i = 0; i < dataArr.length; i++) {
                                    if (dataArr[i].length == 0) {
                                        dataArr.splice(i, 1)
                                    }
                                }
                                this.resArr.oldData = this.oldData
                                this.resArr.newData = dataArr


                                //原数据打标记
                                let pastArr = this.resArr.newData[0]
                                let newArr =this.oldData   //有标记的原数据
                                for(let i=0;i<newArr.length;i++){
                                    let isExist = false
                                    for(let j=0;j<pastArr.length;j++){
                                        if(newArr[i].id == pastArr[j].id){
                                            isExist = true
                                        }
                                    }
                                    if(isExist == true){
                                        newArr[i].userTab = ''
                                    }else{
                                        newArr[i].userTab = this.$constData.tab[0].key
                                    }

                                }
                                this.resArr.newData[0] = newArr
                                //新数据打标记(不包含第一个原数据家庭户)
                                for(let i=1; i<this.resArr.newData.length;i++){
                                    for(let j=0;j<this.resArr.newData[i].length;j++){
                                        this.resArr.newData[i][j].userTab = this.$constData.tab[1].key
                                    }
                                }
                                //组带操作的数据(是否修改户主与操作类型)
                                let isEditFamilyMaster = ''
                                if(this.oldData[0].familyMaster != this.pastData[0].familyMaster){
                                    isEditFamilyMaster = 1
                                }
                                let obj = {
                                    familyOperate:this.$constData.familyType[1].key,
                                    editHouseholder:isEditFamilyMaster
                                }
                                this.resArr.ext = obj
                                let cnt = {
                                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                                    data: this.resArr, // String 修改数据  {oldData:[....],newData:[.....]}
                                    type: this.$constData.examineType[1].key, // Byte 审核类型 分户申请
                                    remark:'无'
                                }
                                this.$api.createExamine(cnt,(res)=>{
                                    if(res.data.rc == this.$util.RC.SUCCESS){
                                        this.$message.success('申请审批成功，等待组织或者区级审批')
                                    }else{
                                        this.$message.error('申请审批失败')
                                    }
                                })
                                this.$router.push('/examine')

                            }else{
                                this.$message.error('请将所有家庭户的户主设置正确，户主必须存在该家庭户中')
                            }
                        }
                    })
                    .catch(_ => {
                    });
            },


            //设置原始家庭户的户主
            setPastMasterBtn(row) {
                for (let i = 0; i < this.pastData.length; i++) {
                    this.pastData[i].familyMaster = row.realName
                }
            },
            //设置为户主
            setMasterBtn(row, index) {
                this._index = index
                for (let i = 0; i < this.newData[this._index].length; i++) {
                    this.newData[this._index][i].familyMaster = row.realName
                }
            },

            //移除新增户的某一个用户
            returnBtn(row, index) {
                this._index = index
                for (let i = 0; i < this.newData[this._index].length; i++) {
                    if (row.id == this.newData[this._index][i].id) {
                        //修改户主为原始家庭户户主
                        this.newData[this._index][i].familyMaster = this.oldData[0].familyMaster
                        //修改户序号为原始家庭户户序号
                        this.newData[this._index][i].familyNumber = this.oldData[0].familyNumber
                        //修改股权证号为原始家庭户股权证号
                        this.newData[this._index][i].shareCerNo = this.oldData[0].shareCerNo
                        //移除操作
                        this.pastData.push(this.newData[this._index][i])
                        this.newData[this._index].splice(i, 1)
                    }
                }
            },

            //新增一个新的户
            addSeparate() {
                let arr = []
                this.newData.push(arr)
            },
            //删除一个新增户
            delSeparate(item, index) {
                if (item.length > 0) {
                    this.$message.error('删除家庭户失败，请先移出当前家庭户的成员')
                } else {
                    this.newData.splice(index, 1)
                }
            },
            //点击移入成员弹窗
            removeModal(index) {
                this._index = index
                this.removeModalShow = true
                this.tranData = []
                this.tranTitle = '家庭户 ' + (parseInt(index + 1))
            },
            //执行移入
            removeBtn() {
                this.removeModalShow = false
                console.log(this.tranData)
                let resArr = []
                let dataArr = this.pastData
                for (let i = 0; i < dataArr.length; i++) {
                    for (let j = 0; j < this.tranData.length; j++) {
                        if (this.tranData[j] == dataArr[i].id) {
                            //户序号与户主姓名设为空值
                            dataArr[i].familyNumber = ''
                            dataArr[i].familyMaster = ''
                            dataArr[i].shareCerNo = ''
                            //判断如果是第二次移入用户 将移入的用户得到户主姓名改为已经有的第一个的户主姓名
                            if (this.newData[this._index].length != 0) {
                                dataArr[i].familyMaster = this.newData[this._index][0].familyMaster
                            }
                            resArr.push(dataArr[i])
                            //删除原始家庭户成员
                            this.pastData.splice(i, 1)
                        }
                    }
                }
                this.newData[this._index] = this.newData[this._index].concat(resArr)
            }
        },
        created() {
            let info = this.$route.params.info
            if (info == '' || info == undefined) {
                this.$message('请选择家庭户')
                this.$router.push({
                    path: '/familyList',
                    name: 'familyList',
                    params: {
                        routerPath: 'leaveFamily'
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
                        this.pastData = this.$util.tryParseJson(res.data.c)
                        this.oldData = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.pastData = []
                        this.oldData = []
                    }
                    console.log(this.pastData)
                })
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
</style>
