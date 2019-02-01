<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24">
                <router-link to="/memberAdd">
                    <el-button type="primary" class="nav-btn">新增成员</el-button>
                </router-link>
            </el-col>
        </el-row>

        <el-row class="row-box1">
            <el-row class="row-box-tilte">
                <el-col :span="24">
                    董事会成员列表
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
                                label="董事名称">
                        </el-table-column>
                        <el-table-column
                                prop="user.mobile"
                                label="电话号码">
                        </el-table-column>
                        <el-table-column
                                prop="role.duty"
                                label="董事职务"
                                :formatter="postFilter">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="150 ">
                            <template slot-scope="scope">
                                <el-button @click="edit(scope.row)" type="text" size="small">修改账号</el-button>
                                <el-button @click="editPost(scope.row)" type="text" size="small">修改职务</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "director",
        data(){
            return{
                tableData:[]
            }
        },
        methods:{
            edit(row){
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
            postFilter(row,col,value){
                if(value == this.$constData.duty.DUTY_NONE){
                    return '非董事'
                }else if(value == this.$constData.duty.DUTY_DIRECTOR){
                    return '董事'
                }else if(value == this.$constData.duty.DUTY_CHAIRMAN){
                    return '董事长'
                }else if(value == this.$constData.duty.DUTY_VICE_CHAIRMAN){
                    return '副董事长'
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
                role:'duty',
                count: count,
                offset: offset,
            };
            this.$util.call('/org/getORGUserByRole',cnt,function (res) {
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

    .row-box{
        background: #fff;
        padding:15px 0;
    }
    .nav-btn{
        float: left;
        margin-left: 15px;
    }
    .row-box1{
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
