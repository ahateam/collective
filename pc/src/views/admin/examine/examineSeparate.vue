<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24" >
                <span class="title-box" style="line-height: 40px">家庭分户操作</span>
            </el-col>

        </el-row>

        <el-row class="row-box1" >
            <el-row>
                <el-col :span="24">
                    <el-button type="primary"  size="small" @click="addSeparate"> + 新增家庭户</el-button>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-row >
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
                                        <el-button @click="separateBtn(scope.row)" type="text" size="small"><span style="color: #f44;font-size: 20px" class="iconfont icon-quxiao1"></span></el-button>
                                    </template>
                                </el-table-column>

                            </el-table>
                        </template>
                    </el-col>
                </el-row>
            </el-row>
        </el-row>

        <el-row class="row-box1" v-for="(item,index) in newData" :key="index">
            <el-row >
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
                                    <el-button @click="returnBtn(scope.row,index)" type="text" size="small"><span style="color: #f60;font-size: 20px;padding: 0 20px;line-height: 20px" class="iconfont icon-quxiao2"></span></el-button>
                                    <el-button @click="setMasterBtn(scope.row,index)" type="text" size="small" style="font-size: 16px;line-height: 20px">设置为户主</el-button>

                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-col>
            </el-row>
        </el-row>

        <el-row class="row-box1">
            <el-col :span="24" style="text-align: center">
                <el-button type="primary"  @click="createBtn">确认提交分户信息进行审批</el-button>
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
        data(){
            return{
                info:'',
                pastData:[],    //动态改变的过去的数据
                oldData:[],     //永不改变的过去的数据
                newData:[],     //现在新增的户的数据
                removeModalShow:false,

                _index:0,       //操作的家庭户的下标
                tranTitle:'',
                tranData:[],    //穿梭框右侧的已经有的数据列表

                resArr:{},      //最终的提交数据

            }
        },
        methods:{

            //提交数据进行审批
            createBtn(){
                let dataArr = []
                dataArr.push(this.pastData)
                dataArr = dataArr.concat(this.newData)
                let key = -1
                for(let i=0;i<this.newData.length;i++){
                    for(let j=0;j<this.newData[i].length;j++){
                        if(this.newData[i][j].familyMaster == ' '){
                            //如果有户主没有设置
                            key = i
                        }
                    }
                }
                if(key != -1){
                    this.$message.error('请设置家庭户 '+parseInt(key+1) +'的户主' )
                }else{
                    for(let i=0;i<dataArr.length;i++){
                        if(dataArr[i].length == 0){
                            dataArr.splice(i,1)
                        }
                    }
                    this.resArr.oldData = this.oldData
                    this.resArr.newData = dataArr
                }

                let cnt = {
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    data: this.resArr, // String 修改数据  {oldData:[....],newData:[.....]}
                    type: this.$constData.examineType[1].key, // Byte 审核类型 分户申请
                }
                this.$api.createExamine(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('操作成功，如有组织审核人员，请等待组织审核人员审批...')
                    }else{
                        this.$message.error('操作失败')
                    }
                    this.$router.push('/examineSeparateList')
                })
            },


            //设置为户主
            setMasterBtn(row,index){
                this._index = index
                for(let i=0 ;i<this.newData[this._index].length;i++){
                    this.newData[this._index][i].familyMaster = row.realName
                }
            },

            //移除新增户的某一个用户
            returnBtn(row,index){
                this._index = index
                for(let i=0;i<this.newData[this._index].length;i++){
                    if(row.id == this.newData[this._index][i].id){
                        //修改户主为原始家庭户户主
                        this.newData[this._index][i].familyMaster = this.oldData[0].familyMaster
                        //修改户序号为原始家庭户户序号
                        this.newData[this._index][i].familyNumber = this.oldData[0].familyNumber
                        //修改股权证号为原始家庭户股权证号
                        this.newData[this._index][i].shareCerNo = this.oldData[0].shareCerNo
                        //移除操作
                        this.pastData.push(this.newData[this._index][i])
                        this.newData[this._index].splice(i,1)
                    }
                }
            },

            //新增一个新的户
            addSeparate(){
                let arr =[]
                this.newData.push(arr)
            },
            //删除一个新增户
            delSeparate(item,index){
                if(item.length>0){
                    this.$message.error('删除家庭户失败，请先移出当前家庭户的成员')
                }else{
                  this.newData.splice(index,1)
                }
            },
            //点击移入成员弹窗
            removeModal(index){
                this._index = index
                this.removeModalShow = true
                this.tranData = []
                this.tranTitle = '家庭户 '+ (parseInt(index+1))
            },
            //执行移入
            removeBtn(){
                this.removeModalShow = false
                console.log(this.tranData)
                let resArr = []
                let dataArr = this.pastData
                for(let i=0 ;i<dataArr.length;i++){
                    for(let j=0;j<this.tranData.length;j++){
                        if(this.tranData[j] == dataArr[i].id){
                            //户序号与户主姓名设为空值
                            dataArr[i].familyNumber = ' '
                            dataArr[i].familyMaster =' '
                            dataArr[i].shareCerNo = ''
                            //判断如果是第二次移入用户 将移入的用户得到户主姓名改为已经有的第一个的户主姓名
                            if(this.newData[this._index].length != 0 ){
                                dataArr[i].familyMaster = this.newData[this._index][0].familyMaster
                            }
                            resArr.push(dataArr[i])
                            //删除原始家庭户成员
                            this.pastData.splice(i,1)
                        }
                    }
                }
                this.newData[this._index] = this.newData[this._index].concat(resArr)
            }
        },
        mounted(){
            this.info = this.$route.params.info
            if(this.info == '' || this.info == undefined){
                this.$message.error('信息失效，请重新选择家庭户')
                this.$router.push('/examineSeparateList')
            }else {
                let cnt = {
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    familyNumber: this.info.familyNumber, // Long 户序号
                }
                this.$api.getFamilyUserByFamilyNumber(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.pastData = this.$util.tryParseJson(res.data.c)
                        this.oldData = this.$util.tryParseJson(res.data.c)
                    }else{
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
    .nav-btn{
        float: left;
        margin-left: 15px;
    }
    .row-box{
        background: #fff;
        padding:15px 0;
        border-left: 4px solid #63a35c;
    }
    .row-box1{
        margin-top: 20px;
        padding: 15px;
        background: #fff;

    }
    .title-box{
        font-size: 16px;
        line-height: 30px;
        padding: 0 15px;

    }
    .content-box{
        margin-top: 10px;
    }
    .table-title{
        line-height: 40px;
        color: #666;
        font-size: 16px
    }
    .table-del{
        line-height: 40px;
        color: #f44;
        font-size: 20px;
        float: right;
        margin-right: 20px;
        padding: 0 20px;
        cursor: pointer;
    }
    .table-del i{
        font-size: 25px;
    }
    .table-add{
        float: right;
        line-height: 40px;
    }
    .table-master{
        font-size: 14px;
        margin-left: 20px;
        line-height: 40px;
        color: #666;
    }
</style>
