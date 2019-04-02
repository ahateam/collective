<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24">
                <router-link to="/addMech">
                    <el-button type="primary" class="nav-btn">申请机构</el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-row class="row-box1" >
            <template>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="机构名称"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="组织机构代码">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="机构具体层级">
                    </el-table-column>
                    <el-table-column
                            prop="examine"
                            label="申请状态"
                            :formatter="statusFliter">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="info(scope.row)" type="text" size="small">详情</el-button>

                            <el-button @click="editMech(scope.row)" type="text" size="small" v-if="scope.row.examine != 1">修改信息</el-button>

                            <el-button @click="del(scope.row)" type="text" size="small" v-if="scope.row.examine != 1"><span style="color: #f44;">取消申请</span></el-button>


                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-row>
        <el-dialog
                title="取消申请"
                :visible.sync="delShow"
                width="30%">
            <span>是否确认取消申请</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="delBtn">确认取消申请</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "applyMech",
        data() {
            return {
                tableData:[],
                offset:0,
                count:10,
                delShow:false,
                delId:'',

            }
        },
        methods:{
            statusFliter(row,col,value){
                if(value == 0){
                    return '正在申请'
                }else if(value == 1){
                    return '申请成功'
                }else{
                    return '申请失败'
                }
            },
            //详情跳转
            info(row){
                this.$router.push({
                    path:'/mechInfo',
                    name:'mechInfo',
                    params:{info:row},
                })
            },
            //修改信息
            editMech(row){
                console.log('1111')
                this.$router.push({
                    path:'/editMech',
                    name:'editMech',
                    params:{info:row},
                })
            },

            //删除提示
            del(row){
                this.delShow = true
                this.delId = row.id
            },
            delBtn(){
                let that = this
                let cnt = {
                    examineId:this.delId
                }
                this.$api.delORGExamine(cnt,function (res) {
                    if(res.data.rc == that.$util.RC.SUCCESS){
                        that.$message.success('操作成功')
                    }else{
                        that.$message.error('操作失败')
                    }
                    that.$router.push('/page')
                })


            }



        },
        mounted(){
            let that =this
            let cnt = {
                userId:localStorage.getItem('userId'),
                offset:this.offset,
                count:this.count
            }
            this.$api.getORGExamineByUser(cnt,function (res) {
                that.tableData = JSON.parse(res.data.c)
                console.log(JSON.parse(res.data.c))
            })
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
    }
    .row-box1{
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }
</style>
