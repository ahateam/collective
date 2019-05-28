<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <span class="title-box" style="line-height: 40px">家庭分户操作</span>

            </el-col>

        </el-row>

        <el-row class="row-box1">
            <el-row>
                <el-col :span="24">
                    <el-button type="primary" size="small" @click="changeFmaily(0)">选择家庭户</el-button>
                    <!--<el-button type="success" size="small" @click="tranShowBtn">成员移户</el-button>-->
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-row>
                    <el-col :span="24">
                      <span class="table-title">
                            原始家庭户1
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
                                        <el-button @click="removeBtn(scope.row,1)" type="text" size="small"
                                                   style="font-size: 16px;line-height: 20px">移入家庭户2
                                        </el-button>
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
        <el-row class="row-box1">
            <el-row>
                <el-col :span="24">
                    <el-button type="primary" size="small" @click="changeFmaily(1)"> 选择家庭户</el-button>
                    <!--<el-button type="success" size="small" @click="tranShowBtn">成员移户</el-button>-->
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-row>
                    <el-col :span="24">
                      <span class="table-title">
                            原始家庭户2
                      </span>
                        <span class="table-master">
                            家庭户主: <span v-if="pastData1.length>0">{{pastData1[0].familyMaster}}</span>
                        </span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <template>
                            <el-table
                                    :data="pastData1"
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
                                        <el-button @click="removeBtn(scope.row,0)" type="text" size="small"
                                                   style="font-size: 16px;line-height: 20px">移入家庭户1
                                        </el-button>
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
        <div>
        <!--<el-row class="row-box1" v-for="(item,index) in newData" :key="index">-->
            <!--<el-row>-->
                <!--<el-col :span="24">-->
                      <!--<span class="table-title">-->
                            <!--家庭户 {{index+1}}-->
                      <!--</span>-->
                    <!--<span class="table-master">-->
                          <!--家庭户主: <span v-if="item.length>0">{{item[0].familyMaster}}</span>-->
                      <!--</span>-->
                    <!--<span class="table-del" @click="delSeparate(item,index)">-->
                            <!--<i class="iconfont icon-19icon"></i>-->
                    <!--</span>-->
                    <!--<span class="table-add">-->
                        <!--<el-button type="success" size="mini" @click="removeModal(index)">移入成员</el-button>-->
                    <!--</span>-->
                <!--</el-col>-->
            <!--</el-row>-->


                <!--<el-row>-->
                    <!--<el-col :span="24">-->
                        <!--<template>-->
                            <!--<el-table-->
                                    <!--:data="item"-->
                                    <!--border-->
                                    <!--style="width: 100%">-->
                                <!--<el-table-column-->
                                        <!--prop="familyNumber"-->
                                        <!--label="户序号">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                        <!--prop="shareCerNo"-->
                                        <!--label="股权证编号">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                        <!--prop="realName"-->
                                        <!--label="用户名">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                        <!--prop="idNumber"-->
                                        <!--label="身份证">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                        <!--prop="familyMaster"-->
                                        <!--label="户主姓名">-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                        <!--label="操作"-->
                                        <!--width="200">-->
                                    <!--<template slot-scope="scope">-->
                                        <!--<el-button @click="returnBtn(scope.row,index)" type="text" size="small"><span-->
                                                <!--style="color: #f60;font-size: 20px;padding: 0 20px;line-height: 20px"-->
                                                <!--class="iconfont icon-quxiao2"></span></el-button>-->
                                        <!--<el-button @click="setMasterBtn(scope.row,index)" type="text" size="small"-->
                                                   <!--style="font-size: 16px;line-height: 20px">设置为户主-->
                                        <!--</el-button>-->

                                    <!--</template>-->
                                <!--</el-table-column>-->
                            <!--</el-table>-->
                        <!--</template>-->
                    <!--</el-col>-->
                <!--</el-row>-->
            <!--</el-row>-->
        </div>

        <el-row class="row-box1">
            <el-col :span="24" style="text-align: center">
                <el-button type="primary" @click="submitBtn">确认提交分户信息进行审批</el-button>
            </el-col>
        </el-row>

        <!--<el-dialog title="移入成员到家庭户" :visible.sync="removeModalShow">-->

            <!--<el-transfer-->
                    <!--v-model="rightArr"-->
                    <!--:props="{-->
                      <!--key: 'id',-->
                      <!--label: 'realName'-->
                    <!--}"-->
                    <!--:titles="['原始家庭户1','原始家庭户2' ]"-->
                    <!--:data="leftArr">-->
            <!--</el-transfer>-->

            <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button @click="removeModalShow = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="removeBtn">确 定</el-button>-->
            <!--</div>-->
        <!--</el-dialog>-->
    </div>
</template>

<script>
    export default {
        name: "moveFamily",
        data(){
            return{
                info: '',
                pastData: [],    //动态改变的过去的数据
                pastData1: [],    //动态改变的过去的数据
                oldData: [],     //永不改变的过去的数据
                newData: [],     //现在新增的户的数据
                removeModalShow: false,


                editFamilyMaster:'',    //是否修改户主
                pastDataSignArr:[], //带标记的家庭户1数据
                pastData1SignArr:[],    //带标记的家庭户2数据
            }
        },
        methods:{
            //获取户里面的所有成员列表
            getFamilyUserByFamilyNumber(cnt,index){
                this.$api.getFamilyUserByFamilyNumber(cnt,(res)=>{
                    let arr = []
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        arr = this.$util.tryParseJson(res.data.c)
                    }else{
                        arr = []
                    }
                    for(let i=0;i<arr.length;i++){
                        arr[i].userTab =''
                    }

                    if(index == 0){
                        this.oldData[0] =arr.concat()
                        this.pastData = arr.concat()
                        this.pastDataSignArr = arr.concat()

                    }else if(index==1){
                        this.oldData[1] =arr.concat()
                        this.pastData1 = arr.concat()

                        this.pastData1SignArr = arr.concat()

                        console.log(this.pastData1SignArr)
                    }
                })

            },
            //户2移除标记
            moveFamilySign2(row){
                let obj = JSON.parse(JSON.stringify(row))
                let key = -1    //获取当前数据在标记数组中的下标
                let signKey = -1    //查看当前数据是否是 逆向操作（移入 移除）
                for(let i=0;i<this.pastData1SignArr.length;i++){
                    if(obj.id == this.pastData1SignArr[i].id){
                        key = i
                        if(this.pastData1SignArr[i].userTab == this.$constData.tab[1].key){
                            signKey =i
                        }
                    }
                }

                if(signKey == -1){
                    this.pastData1SignArr[key].userTab = this.$constData.tab[0].key
                }else{
                    this.pastData1SignArr.splice(key,1)
                }
            },
            //户1移入标记
            addFamilySign1(row){
                let obj = JSON.parse(JSON.stringify(row))
                let familySign = -1  //原来没有被移除过
                let familySignKey = -1

                for(let i=0;i<this.pastDataSignArr.length;i++){
                    if(obj.id == this.pastDataSignArr[i].id){
                        familySignKey = i
                        if(this.pastDataSignArr[i].userTab == this.$constData.tab[0].key){
                            familySign = i
                        }
                    }
                }
                if(familySign == -1){
                    obj.userTab = this.$constData.tab[1].key
                    this.pastDataSignArr.push(obj)
                }else{
                    this.pastDataSignArr[familySign].userTab = ''
                }
            },
            //户1移除标记
            moveFamilySign1(row){
                let obj = JSON.parse(JSON.stringify(row))
                let key = -1    //获取当前数据在标记数组中的下标
                let signKey = -1    //查看当前数据是否是 逆向操作（移入 移除）
                for(let i=0;i<this.pastDataSignArr.length;i++){
                    if(obj.id == this.pastDataSignArr[i].id){
                        key = i
                        if(this.pastDataSignArr[i].userTab == this.$constData.tab[1].key){
                            signKey =i
                        }
                    }
                }
                if(signKey == -1){
                    this.pastDataSignArr[key].userTab = this.$constData.tab[0].key
                }else{
                    this.pastDataSignArr.splice(key,1)
                }


            },
            //户2移入标记
            addFamilySign2(row){
                let obj = JSON.parse(JSON.stringify(row))
                let familySign = -1  //原来没有被移除过
                let familySignKey = -1

                for(let i=0;i<this.pastData1SignArr.length;i++){
                    if(obj.id == this.pastData1SignArr[i].id){
                        familySignKey = i
                        if(this.pastData1SignArr[i].userTab == this.$constData.tab[0].key){
                            familySign = i
                        }
                    }
                }
                if(familySign == -1){
                    obj.userTab = this.$constData.tab[1].key
                    this.pastData1SignArr.push(obj)
                }else{
                    this.pastData1SignArr[familySign].userTab = ''
                }
            },

            changeFmaily(key){
                this.$store.state.family.familyKey = key
                this.$router.push({
                    path: '/familyList',
                    name: 'familyList',
                    params: {
                        routerPath: 'moveFamily',
                        familyKey:key
                    }
                })
            },

            //移户操作
            removeBtn(row,key){
                if(key == 0){   //户2移到户1
                    if(this.pastData.length >0){ //户1至少有一个用户
                        // console.log(this.pastData1SignArr)
                        let _index = -1
                        for(let i=0;i<this.pastData1.length;i++){
                            if(row.id == this.pastData1[i].id){
                                _index = i
                            }
                        }
                        //户2移除标记
                        this.moveFamilySign2(row)
                        let obj = this.pastData1[_index]
                        obj.familyMaster = this.pastData[0].familyMaster
                        obj.familyNumber = this.pastData[0].familyNumber
                        obj.shareCerNo = this.pastData[0].shareCerNo
                        this.pastData.push(obj)
                        this.pastData1.splice(_index,1)
                        //户1的移入标记
                        this.addFamilySign1(row)
                    }else{
                        let _index = -1
                        for(let i=0;i<this.pastData1.length;i++){
                            if(row.id == this.pastData1[i].id){
                                _index = i
                            }
                        }
                        //户2移除标记
                        this.moveFamilySign2(row)
                        let obj = this.pastData1[_index]
                        this.pastData.push(obj)
                        this.pastData1.splice(_index,1)
                        //户1的移入标记
                        this.addFamilySign1(row)
                    }
                }else if(key == 1){ //户1移到户2
                    if(this.pastData1.length>0){
                        let _index = -1
                        for(let i=0;i<this.pastData.length;i++){
                            if(row.id == this.pastData[i].id){
                                _index = i
                            }
                        }
                        this.moveFamilySign1(row)
                        let obj = this.pastData[_index]
                        obj.familyMaster = this.pastData1[0].familyMaster
                        obj.familyNumber = this.pastData1[0].familyNumber
                        obj.shareCerNo = this.pastData1[0].shareCerNo
                        this.pastData1.push(obj)
                        this.pastData.splice(_index,1)
                        this.addFamilySign2(row)

                    }else{
                        let _index = -1
                        for(let i=0;i<this.pastData.length;i++){
                            if(row.id == this.pastData[i].id){
                                _index = i
                            }
                        }
                        this.moveFamilySign1(row)
                        let obj = this.pastData[_index]
                        this.pastData1.push(obj)
                        this.pastData.splice(_index,1)
                        this.addFamilySign2(row)
                    }

                }
            },


            //提交最终值
            submitBtn(){
                //比较新旧数据 打标记
                // 户1移除标记
                let data = {}
                data.ext={familyOperate:this.$constData.familyType[4].key,editHouseholder:this.editFamilyMaster}
                let arr =[]
                arr.push(this.pastDataSignArr)
                arr.push(this.pastData1SignArr)
                data.newData = arr
                data.oldData = this.oldData
                let cnt = {
                    orgId: localStorage.getItem('orgId'),
                    data:data,
                    type:this.$constData.examineType[1].key,
                    remark:'无'
                }
                console.log(cnt);
                this.$api.createExamine(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('申请审批成功，等待组织或者区级审批')
                    }else{
                        this.$message.error('申请审批失败')
                    }
                })
                this.$router.push('/examine')

            }
        },
        created() {
            if(this.$route.params.info == undefined ||this.$route.params.info == null) {
                this.$store.state.family.familyKey = 0
                this.$store.state.family.moveFamilyNumber1 = ''
                this.$store.state.family.moveFamilyNumber2 = ''
            }


            if(this.$store.state.family.moveFamilyNumber1 == '' ){
                this.$message('请选择家庭户')
                this.$router.push({
                    path: '/familyList',
                    name: 'familyList',
                    params: {
                        routerPath: 'moveFamily',
                        familyKey:this.$store.state.family.familyKey
                    }
                })
            }
        },
        mounted() {

            if(this.$store.state.family.moveFamilyNumber1 != ''){
                let cnt = {
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    familyNumber: this.$store.state.family.moveFamilyNumber1, // Long 户序号
                }
                this.getFamilyUserByFamilyNumber(cnt,0)
            }
            if(this.$store.state.family.moveFamilyNumber2 != ''){
                let cnt = {
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    familyNumber: this.$store.state.family.moveFamilyNumber2, // Long 户序号
                }
                this.getFamilyUserByFamilyNumber(cnt,1)
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
