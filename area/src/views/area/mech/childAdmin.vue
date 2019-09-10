<template>
    <div>
        <el-row class="row-box" >
            <el-col :span="24">
                <div class="tab-box">
                    <router-link to="/addChild">
                        <el-button type="primary" class="nav-btn">新增下级机构</el-button>
                    </router-link>
                </div>
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
                            >
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="组织机构代码">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="机构具体层级">
                    </el-table-column>
<!--                    <el-table-column-->
<!--                            prop="examine"-->
<!--                            label="申请状态"-->
<!--                            :formatter="statusFliter">-->
<!--                    </el-table-column>-->

                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
                            <el-button @click="open(scope.row)" type="text" size="small" style="color: #f44">删除
                            </el-button>
                            <el-button type="primary" size="mini" @click="showMemberList(scope.row)">查看成员</el-button>
                            <el-button type="primary" size="mini" @click="memberImport(scope.row)">导入成员</el-button>
                            <el-button type="primary" size="mini" @click="assetImport(scope.row)">导入资产</el-button>

                        </template>
                    </el-table-column>

                </el-table>
            </template>
            <p>
                当前第 {{page}} 页
                <el-button type="primary" size="mini"  :disabled="page==1"  @click="changePage(page-1)">上一页</el-button>
                <el-button type="primary" size="mini" :disabled="pageOver ==true"  @click="changePage(page+1)">下一页</el-button>
            </p>
        </el-row>
    </div>



</template>

<script>
    export default {
        name: "childAdmin",
        data() {
            return {
                tableData:[],
                page:1,
                pageOver:false,



                count:10,
                offset:0,

                isActive:1,
                infoShow:false,
                info:'',
                examine:'',
                examineList:[
                    {key:0,val:'正在申请'},{key:3,val:'再次申请'},{key:1,val:'申请通过'},{key:2,val:'申请失败'}
                ],
                statusShow:false,

                addressMech:''

            }
        },
        methods:{
            changePage(page){
                this.page = page
                let offset = (page-1)*this.count
                let cnt = {
                    superiorId: localStorage.getItem('orgId'),
                    count: this.count, // Integer
                    offset: offset, // Integer
                }
                this.$area.getORGs(cnt, (res)=> {
                    this.tableData = JSON.parse(res.data.c)
                    if(this.tableData.length < this.count){
                        this.pageOver = true
                    }else{
                        this.pageOver = false
                    }
                })
            },
            open(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delSubOrg(row)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            delSubOrg(row){
                let that = this
                let cnt = {
                    orgId: row.id, // Long 组织id
                };
                that.$area.delSubOrg(cnt,(res)=>{
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    let cnt = {
                        superiorId: localStorage.getItem('orgId'),
                        count: that.count,
                        offset: that.offset,
                    }
                    that.$area.getORGs(cnt, (res)=> {
                        that.tableData = that.$util.tryParseJson(res.data.c)
                        console.log(that.tableData)
                        if(that.tableData.length < that.count){
                            that.pageOver = true
                        }else{
                            that.pageOver = false
                        }
                    })
                })
            },

            // statusFliter(row,col,value){
            //     if(value == '0'){
            //         return '正在申请'
            //     }else if(value == '1'){
            //         return '申请成功'
            //     }else if(value == '3'){
            //         return '再次申请审核'
            //     }else {
            //         return '申请失败'
            //     }
            // },

            //详情
            infoBtn(row){
                this.$router.push({
                    path:'/childInfo',
                    name:'childInfo',
                    params:{info:row},
                })
                console.log(row)
            },

            //导入成员
            memberImport(row){
                this.$router.push({
                    path:'/memberImport',
                    name:'memberImport',
                    params:{info:row},
                })
            },
            //导入资产
            assetImport(row){
                this.$router.push({
                    path:'/assetImport',
                    name:'assetImport',
                    params:{info:row},
                })
            },
            /** 跳转下级机构成员列表页*/
            showMemberList(row){
                this.$router.push({
                    path:'/areaChildMemberList',
                    name:'areaChildMemberList',
                    params:{
                        info:row
                    }
                })
            }
        },
        mounted(){
            let cnt = {
                superiorId: localStorage.getItem('orgId'),
                count: this.count,
                offset: this.offset,
            }
            this.$area.getORGs(cnt, (res)=> {
                this.tableData = this.$util.tryParseJson(res.data.c)
                console.log('-----------------------')
                console.log(res)
                console.log(this.tableData)

                if(this.tableData.length < this.count){
                    this.pageOver = true
                }else{
                    this.pageOver = false
                }
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
    .tab-box{
        width: auto;
        margin-left: 20px;
    }
    .title-box {
        font-size: 1.6rem;
        line-height: 40px;
        letter-spacing: 2px;
        font-weight: 600;
        color: #666;
        text-align: right;
    }

    .text-box {
        margin-left: 50px;
        font-size: 1.6rem;
        color: #333;
        line-height: 40px;
    }
    .image-box {
        margin-left: 50px;
        width: 200px;
        height: 150px;
        overflow: hidden;
    }

    .image-box img {
        width: 200px;
        height: 150px;
        overflow: hidden;
        cursor: pointer;
    }

</style>
