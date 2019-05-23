<template>
    <div>
        <el-row class="row-box" >
            <el-row class="row-box1">
                <el-col :span="24">
                    <div class="tab-box">
                        <el-tag style="cursor: pointer;" @click="changeTypeBtn(1)" v-if="type == 1">分户申请</el-tag>
                        <el-tag style="cursor: pointer;" type="info" @click="changeTypeBtn(1)" v-if="type != 1">分户申请</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" @click="changeTypeBtn(2)" v-if="type == 2">股权变更</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" type="info" @click="changeTypeBtn(2)" v-if="type != 2">股权变更</el-tag>

                    </div>
                </el-col>
            </el-row>
            <el-row class="row-box1">
                <el-col :span="24">
                    <div class="tab-box">
                        <el-tag style="cursor: pointer;" @click="activeBtn(1)" v-if="isActive == 1">等待审批</el-tag>
                        <el-tag style="cursor: pointer;" type="info" @click="activeBtn(1)" v-if="isActive != 1">等待审批</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" @click="activeBtn(2)" v-if="isActive == 2">开始制证</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" type="info" @click="activeBtn(2)" v-if="isActive != 2">开始制证</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" @click="activeBtn(3)" v-if="isActive == 3">制证成功</el-tag>
                        <el-tag type="info" style="margin-left: 20px;cursor: pointer;" @click="activeBtn(3)" v-if="isActive != 3">制证成功</el-tag>
                        <el-tag style="margin-left: 20px;cursor: pointer;" @click="activeBtn(4)" v-if="isActive == 4">制证失败</el-tag>
                        <el-tag type="info" style="margin-left: 20px;cursor: pointer;" @click="activeBtn(4)" v-if="isActive != 4">制证失败</el-tag>
                    </div>
                </el-col>
            </el-row>
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
                            <el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
                            <el-button type="text" size="small" @click="editStatusBtn(scope.row)">修改审核</el-button>
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
        name: "mech",
        data() {
            return {
                tableData:[],
                page:1,
                pageOver:false,
                count:10,
                offset:0,


                isActive:1,
                type:1,


            }
        },
        methods:{

            getExamine(cnt){
                this.$area.getExamine(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.tableData = []
                    }
                    if(this.tableData.length<this.count){
                        this.pageOver = true
                    }else{
                        this.pageOver = false
                    }
                })
            },

            changeTypeBtn(type){
                this.type = type
                this.page = 1
            },
            activeBtn(active){
                this.isActive = active
                this.page = 1
            }




        },
        mounted(){

            let cnt={
                orgId: localStorage.getItem('orgId'), // Long 组织编号
                type: this.type, // Byte 类型
                status: this.isActive, // Byte 状态
                count: this.count, // Integer
                offset: this.offset, // Integer
            }



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
