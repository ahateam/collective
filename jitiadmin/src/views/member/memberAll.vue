<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <router-link to="/memberAdd">
                    <el-button type="primary" class="nav-btn">新增成员</el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-row class="row-box-tilte">
                <el-col :span="24">
                    所有成员列表
                </el-col>
            </el-row>
            <el-col :span="24">
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="user.realName"
                                label="成员名称">
                        </el-table-column>

                        <el-table-column
                                prop="user.mobile"
                                label="电话号码">
                        </el-table-column>
                        <el-table-column
                                prop="role.share"
                                label="职位"
                                :formatter="shareFilter">
                        </el-table-column>
                        <el-table-column
                                prop="role.weight"
                                label="权重">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button @click="edit(scope.row)" type="text" size="small">修改基本信息</el-button>
                                <el-button @click="editPost(scope.row)" type="text" size="small">修改职位</el-button>
                                <el-button @click="del(scope.row)" type="text" size="small" ><span style="color: #f56c6c;">删除</span></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>
        </el-row>

        <el-dialog
                title="从当前组织移除该用户"
                :visible.sync="dialogVisible"
                width="30%">
            <span>是否确认当前组织移除该用户</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"  @click="delBtn" >确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "shareHolder",
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                delUserId:''
            }
        },
        methods: {
            edit(row) {
                this.$router.push({
                    path:'/memberEdit',
                    name:'memberEdit',
                    params:{
                        info:row
                    }
                })
            },
            editPost(row){
                this.$router.push({
                    path:'/memberEditPost',
                    name:'memberEditPost',
                    params:{
                        info:row
                    }
                })
            },
            delBtn(){
                let that = this
                let orgId = localStorage.getItem('orgId')
                let count = 40
                let offset = 0
                this.dialogVisible = false
                //this.delId是删除的股东id（请求后端删除）
                let cnt = {
                    orgId: orgId,
                    userId: this.delUserId,
                };
                this.$util.call('/org/removeORGUser',cnt,function (res) {
                    if(res.data.rc == that.$util.RC.SUCCESS){
                        that.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'warning'
                        })
                        let that1 = that

                        let cnt1={
                            orgId: orgId,
                            role:'all',
                            count: count,
                            offset: offset,
                        }
                        that.$util.call('/org/getORGUserByRole',cnt1,function (res1) {
                            if(res1.data.rc == that1.$util.RC.SUCCESS){
                                that1.tableData = JSON.parse(res1.data.c)
                            }else {
                                that1.tableData = []
                            }
                        })
                    }else{
                        that.$message({
                            showClose: true,
                            message: '删除失败',
                            type: 'error'
                        })
                    }
                })



            },
            del(row){
                this.delUserId = row.user.id
                this.dialogVisible = true

            },
            shareFilter(row,col,value){
                if(value == this.$constData.share.SHARE_NONE){
                    return '非股东'
                }else if(value == this.$constData.share.SHARE_SHAREHOLDER){
                    return '股东'
                }else{
                    return '股东代表'
                }
            }

        },
        mounted(){
            let that = this
            let orgId = localStorage.getItem('orgId')
            let count = 40
            let offset = 0
            let cnt = {
                orgId: orgId,
                role:'',
                count: count,
                offset: offset,
            };
            this.$util.call('/org/getORGUserByRole',cnt,function (res) {
                console.log(res)
                if(res.data.rc == that.$util.RC.SUCCESS){
                    that.tableData = JSON.parse(res.data.c)
                }else{
                    that.tableData = []
                }
            })
        }
    }
</script>

<style scoped lang="scss">

    .row-box {
        background: #fff;
        padding: 15px 0;
    }

    .nav-btn {
        float: left;
        margin-left: 15px;
    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }
    .row-box-tilte{
        background: #fff;
        padding: 15px;
        font-size: 1.6rem;
        color: #666;
        border-left: 4px solid #67C23A;
        margin-bottom: 15px;
    }
</style>
