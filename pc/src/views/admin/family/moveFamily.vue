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

        <el-dialog title="移入成员到家庭户" :visible.sync="removeModalShow">

            <el-transfer
                    v-model="rightArr"
                    :props="{
                      key: 'id',
                      label: 'realName'
                    }"
                    :titles="['原始家庭户1','原始家庭户2' ]"
                    :data="leftArr">
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
        name: "moveFamily",
        data(){
            return{
                info: '',
                pastData: [],    //动态改变的过去的数据
                pastData1: [],    //动态改变的过去的数据
                oldData: [],     //永不改变的过去的数据
                newData: [],     //现在新增的户的数据
                removeModalShow: false,

                //穿梭框所需数组
                allArr:[],  //全部数据
                leftArr:[], //左侧数据
                rightArr:[],    //右侧数据
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
                    if(index == 0){
                        this.oldData[0] =arr
                        this.pastData = arr
                    }else if(index==1){
                        this.oldData[1] =arr
                        this.pastData1 = arr
                    }
                })

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
            removeBtn(row,key){

              if(key == 0){
                    if(this.pastData.length >0){
                        let _index = -1
                        for(let i=0;i<this.pastData1.length;i++){
                            if(row.id == this.pastData1[i].id){
                                _index =i
                            }
                        }
                        let obj = this.pastData1[_index]
                        obj.familyMaster = this.pastData[0].familyMaster
                        obj.familyNumber = this.pastData[0].familyNumber
                        obj.shareCerNo = this.pastData[0].shareCerNo
                        this.pastData.push(obj)
                        this.pastData1.splice(_index,1)
                    }else{
                        let _index = -1
                        for(let i=0;i<this.pastData1.length;i++){
                            if(row.id == this.pastData1[i].id){
                                _index =i
                            }
                        }
                        this.pastData.push(row)
                        this.pastData1.splice(_index,1)
                    }
              }else if(key == 1){
                  if(this.pastData1.length >0){
                      let _index = -1
                      for(let i=0;i<this.pastData.length;i++){
                          if(row.id == this.pastData[i].id){
                              _index =i
                          }
                      }
                      let obj = this.pastData[_index]
                      obj.familyMaster = this.pastData1[0].familyMaster
                      obj.familyNumber = this.pastData1[0].familyNumber
                      obj.shareCerNo = this.pastData1[0].shareCerNo
                      this.pastData1.push(obj)
                      this.pastData.splice(_index,1)
                  }else{
                      let _index = -1
                      for(let i=0;i<this.pastData.length;i++){
                          if(row.id == this.pastData[i].id){
                              _index =i
                          }
                      }
                      this.pastData1.push(row)
                      this.pastData.splice(_index,1)
                  }

              }
            },
            // //穿梭框数据初始化
            // tranShowBtn(){
            //     this.allArr =  []
            //     this.leftArr = []
            //     this.rightArr = []
            //     if(this.pastData.length ==0 || this.pastData1.length == 0){
            //         this.$message.error('请先选择两个不同的家庭户进行移户操作')
            //     }else{
            //         this.allArr = this.pastData.concat(this.pastData1)
            //         console.log(this.allArr)
            //         //穿梭框左侧数据
            //         for(let i =0;i<this.allArr.length;i++){
            //             let obj = {
            //                 id:this.allArr[i].id,
            //                 realName:this.allArr[i].realName
            //             }
            //             this.leftArr.push(obj)
            //         }
            //         //穿梭框右侧数据
            //         for(let i =0;i<this.pastData1.length;i++){
            //             this.rightArr.push(this.pastData1[i].id)
            //         }
            //         this.removeModalShow = true
            //     }
            //
            //
            //
            // },
            // //根据穿梭框改动新数据
            // removeBtn(){
            //     let arr = []
            //     let arr1 = []
            //     console.log(this.rightArr)
            //     for(let i=0;i<this.allArr.length;i++){
            //         let index = false
            //         for(let j=0;j<this.rightArr.length;j++){
            //             if(this.allArr[i].id== this.rightArr[j]){
            //                     index =true
            //             }
            //         }
            //
            //     }
            // },

            //提交最终值
            submitBtn(){

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
