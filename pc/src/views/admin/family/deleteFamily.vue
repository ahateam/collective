<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <span class="title-box" style="line-height: 40px">移除户成员操作</span>
                <el-button type="primary" size="small" style="float: right; margin-right: 50px">更换家庭户</el-button>
            </el-col>
        </el-row>

        <el-row class="row-box1" >
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
                                        <!--<el-button @click="delSeparateBtn(scope.row)" type="text" size="small"><span-->
                                        <!--style="color: #f44;font-size: 20px"-->
                                        <!--class="iconfont icon-quxiao1"></span></el-button>-->
                                        <el-button @click="deleteguy" type="text" size="small"
                                                   style="font-size: 16px;line-height: 20px">移除该成员
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
                                    <el-button @click="" type="text" size="small"><span
                                            style="color: #f60;font-size: 20px;padding: 0 20px;line-height: 20px"
                                            class="iconfont icon-quxiao2"></span></el-button>
                                    <el-button @click="deleteguy" type="text" size="small"
                                               style="font-size: 16px;line-height: 20px">移除该成员
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
                <el-button type="primary">确认提交分户信息进行审批</el-button>
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
                removeModalShow: false,

                _index: 0,       //操作的家庭户的下标
                tranTitle: '',
                tranData: [],    //穿梭框右侧的已经有的数据列表

                resArr: {},      //最终的提交数据

                editFamilyMaster: false,

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
</style>
