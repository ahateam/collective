<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24" >
                <span class="title-box" style="line-height: 40px">家庭分户审批</span>
            </el-col>
        </el-row>

        <el-row class="row-box1" >
            <el-row class="row-box1">
                <el-col :span="24">
                    <span style="color: #333;font-size: 16px">变更前家庭户数据</span>
                </el-col>
            </el-row>
            <el-row  v-if="Array.isArray(pastData[0]) ==false">
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
                                <!--<el-table-column-->
                                        <!--label="操作"-->
                                        <!--width="200">-->
                                    <!--<template slot-scope="scope">-->
                                        <!--&lt;!&ndash;<el-button @click="delSeparateBtn(scope.row)" type="text" size="small"><span style="color: #f44;font-size: 20px" class="iconfont icon-quxiao1"></span></el-button>&ndash;&gt;-->
                                        <!--&lt;!&ndash;<el-button @click="setPastMasterBtn(scope.row)" type="text" size="small" style="font-size: 16px;line-height: 20px">设置为户主</el-button>&ndash;&gt;-->

                                    <!--</template>-->
                                <!--</el-table-column>-->

                            </el-table>
                        </template>
                    </el-col>
                </el-row>
            </el-row>
            <el-row  v-if="Array.isArray(pastData[0]) " v-for="(item,index) in pastData" :key="index">
                <el-row >
                    <el-col :span="24">
                      <span class="table-title">
                          原始家庭户{{index+1}}
                      </span>
                        <span class="table-master">
                            家庭户主: <span v-if="item.length>0">{{item[0].familyMaster}}</span>
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
                                <!--<el-table-column-->
                                <!--label="操作"-->
                                <!--width="200">-->
                                <!--<template slot-scope="scope">-->
                                <!--&lt;!&ndash;<el-button @click="delSeparateBtn(scope.row)" type="text" size="small"><span style="color: #f44;font-size: 20px" class="iconfont icon-quxiao1"></span></el-button>&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-button @click="setPastMasterBtn(scope.row)" type="text" size="small" style="font-size: 16px;line-height: 20px">设置为户主</el-button>&ndash;&gt;-->

                                <!--</template>-->
                                <!--</el-table-column>-->

                            </el-table>
                        </template>
                    </el-col>
                </el-row>
            </el-row>
        </el-row>

        <el-row class="row-box1" >
            <el-row class="row-box1">
                <el-col :span="24">
                    <span style="color: #333;font-size: 16px">变更后家庭户数据</span>
                </el-col>
            </el-row>
            <div v-for="(item,index) in newData" :key="index">
                <el-row class="row-box1">
                    <el-col :span="24">
                      <span class="table-title">
                            家庭户 {{index+1}}
                      </span>
                        <span class="table-master">
                          家庭户主: <span v-if="item.length>0">{{item[0].familyMaster}}</span>
                      </span>
                        <span class="table-add">
                        <el-button type="success" size="mini" @click="setShareNumberShowBtn(index)" v-if="info.status == 2">设置股权证号</el-button>
                        </span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <template>
                            <el-table
                                    :data="item"
                                    border
                                    style="width: 100%"
                                    :row-class-name="tableRowClassName">
                                <el-table-column
                                        label="操作"
                                        width="200">
                                    <template slot-scope="scope">
                                        <!--<el-button @click="returnBtn(scope.row,index)" type="text" size="small"><span style="color: #f60;font-size: 20px;padding: 0 20px;line-height: 20px" class="iconfont icon-quxiao2"></span></el-button>-->
                                        <!--<el-button @click="setMasterBtn(scope.row,index)" type="text" size="small" style="font-size: 16px;line-height: 20px">设置为户主</el-button>-->
                                        <span v-if="typeof(scope.row.userTab) != 'number'  ">
                                            无
                                        </span>
                                        <span v-else-if="typeof(scope.row.userTab) == 'number' &&scope.row.userTab == 0"  style="color: #f44;"> 移除</span>
                                        <span v-if="scope.row.userTab == 1" style="color: #63a35c;"> 移入</span>
                                    </template>
                                </el-table-column>
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

                            </el-table>
                        </template>
                    </el-col>
                </el-row>
            </div>

        </el-row>

        <el-row class="row-box1">
            <el-col :span="24" style="text-align: center">
                <el-button type="primary"  @click="editFamilyBtn" v-if="info.status == 1">初审通过并获取户序号</el-button>
                <el-button type="primary"  @click="editNumberBtn" v-if="info.status == 2">更改证件完成并等待领证</el-button>
            </el-col>
        </el-row>
        <el-dialog :title="'设置家庭户：'+setFamilyNumber +' 股权证号'" :visible.sync="editShareNumberShow">
            <el-form >
                <el-form-item label="股权证编号" label-width="100px">
                    <el-input v-model="number" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editShareNumberShow = false">取 消</el-button>
                <el-button type="primary" @click="setShareNumberBtn">确 定</el-button>
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
                data:[],        //所有默认数据

                pastData:[],    //动态改变的过去的数据
                oldData:[],     //永不改变的过去的数据
                newData:[],     //现在新增的户的数据
                removeModalShow:false,

                _index:0,       //操作的家庭户的下标
                tranTitle:'',
                tranData:[],    //穿梭框右侧的已经有的数据列表

                resArr:{},      //最终的提交数据

                editShareNumberShow:false,
                setFamilyNumber:'',

                number:'',

            }
        },
        methods:{
            tableRowClassName({row, rowIndex}) {
                if (row.userTab == 0) {
                    return 'warning-row';
                } else if (row.userTab  == 1) {
                    return 'success-row';
                }
                return '';
            },
            editFamilyBtn(){
                let cnt = {
                    examineId: this.info.id, // Long 任务编号
                    orgId: this.info.orgId, // Long 组织编号
                    status: this.$constData.examineStatus[2].key, // Byte 状态
                }
                console.log(cnt)
                this.$area.editExamine(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('操作成功')
                    }else {
                        this.$message.error('操作失败')
                    }
                    this.$router.push('/areaExamine')
                })

            },
            setShareNumberShowBtn(index){
                this._index = index
                this.setFamilyNumber = this.newData[index][0].familyNumber
                this.editShareNumberShow = true
            },
            setShareNumberBtn(){
                if(this.number == '' ){
                    this.$message.error('请输入股权证号')
                }else if(this.setFamilyNumber != ''){
                    let cnt = {
                        orgId: this.info.orgId, // Long 任务编号
                        examineId: this.info.id, // Long 任务编号
                        familyNumber: this.setFamilyNumber, // Long 修改数据
                        shareCerNo: this.number, // String 修改数据
                    }
                    this.$area.setShareCerNo(cnt,(res)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            for(let i=0;i<this.newData[this._index].length;i++){
                                this.newData[this._index][i].shareCerNo = this.number
                            }
                            this._index = ''
                            this.editShareNumberShow =false
                            this.setFamilyNumber = ''
                            this.number = ''

                        }else{
                            this.$message.error('操作失败，请保证股权证号不被重复！')
                        }
                    })

                }else{
                    this.$message.error('信息失效，重新选择')
                }
            },

            handleClose(done) {
                done();
            },
            //等待领证
            editNumberBtn(){
                let arr = this.newData
                let key = -1
                for(let i=0;i<arr.length;i++){
                    if(Array.isArray(arr[i])){
                        for(let j=0;j<arr[i].length;j++){
                            if(arr[i][j].shareCerNo == '' ||arr[i][j].shareCerNo== undefined){
                                key = i
                            }
                        }
                    }else{
                        if(arr[i].shareCerNo == '' ||arr[i].shareCerNo == undefined){
                            key =i
                        }
                    }
                }
                if(key != -1){
                    this.$message.error('请先将所有的家庭户的股权证号设置完整')
                }else{
                    let cnt ={
                        examineId: this.info.id, // Long 任务编号
                        status: this.$constData.examineStatus[5].key, // Byte 状态
                    }
                    this.$area.editExamineStatus(cnt,(res)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            this.$message.success('操作成功')
                        }else{
                            this.$message.error('操作失败，请查看信息是否有误')
                        }
                    })
                    this.$router.push('/areaExamine')
                }

            }







        },
        mounted(){
            this.info = this.$route.params.info
            console.log(this.info)

            if(this.info == '' || this.info == undefined){
                this.$message.error('信息失效，请重新选择审批项')
                this.$router.push('/examine')
            }else {

                this.data =JSON.parse( this.info.data)

                this.pastData = this.data.oldData

                this.newData = this.data.newData


            }
        }
    }
</script>

<style scoped lang="scss">
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
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
