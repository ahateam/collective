<template>
    <div>
       <el-row class="row-box" >
            <el-col :span="24">
               <router-link to="/addMech">
                   <el-button type="primary" class="nav-btn">新增机构</el-button>
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
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button @click="info(scope.row)" type="text" size="small">详情</el-button>
                            <el-button @click="infoMoney(scope.row)" type="text" size="small">机构资金</el-button>
                            <!--<el-button @click="del(scope.row)" type="text" size="small" style="color: #f44">删除</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "mechanism",
        data() {
            return {
                tableData:[]
            }
        },
        methods:{
            info(row){
                this.$router.push({
                    path:'/mechInfo',
                    name:'mechInfo',
                    params:{info:row},
                })
                console.log(row.id);
            },
            // edit(row){
            //     this.$router.push({
            //         path:'/editMech',
            //         name:'editMech',
            //         params:{mechId:row.id},
            //     })
            //     console.log(row.id);
            // },
            infoMoney(info){
                this.$router.push({
                    path:'/mechMoney',
                    name:'mechMoney',
                    params:{
                        info:info
                    }
                })
            },
            del(info){

            }


        },
        mounted(){

            let cnt = {
                userId:localStorage.getItem('userId')
            }
            let that = this
            this.$api.getUserORGs(cnt, function (res) {
                if (res.data.rc == that.$util.RC.SUCCESS) {
                    that.tableData = JSON.parse(res.data.c)
                } else {
                    that.tableData = []
                }
                console.log(that.tableData)
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
