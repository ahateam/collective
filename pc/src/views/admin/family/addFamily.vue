<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <span class="title-box" style="line-height: 40px">新增户成员操作</span>
                <el-button type="primary" size="small" style="float: right; margin-right: 50px">更换家庭户</el-button>
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
                        </el-table>
                    </template>
                </el-col>
            </el-row>
        </el-row>

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
                            <el-checkbox  v-for="(item,index) in roleList" :key="index" :label="item.roleId" >{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addMemberModal = false">取 消</el-button>
                <el-button type="primary" @click="addMemberBtn">确 定</el-button>
            </div>
        </el-dialog>

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

                addMemberModal:false,

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
