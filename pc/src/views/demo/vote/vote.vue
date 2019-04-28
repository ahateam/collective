<template>
    <div>
        <el-row>
            <el-col :span="22" :offset="1">
                <div class="content">
                    <div class="title">
                        松林村股份经济合作社董事会监事会选举结果报告单
                    </div>
                    <div class="text">
                        我社于2019年3月19日进行了董事会、监事会选举，本合作社应到股东代表81名，实到股东代表62名，发出董事会，监事会选票59张，
                        收回选票59张，其中有效票59张，无效票0张，弃权票0张，各候选人得票如下：
                    </div>

                    <div class="table-box">
                        <el-row style="background: #fff;padding: 2rem">
                            <el-col :span="11">
                                <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%">
                                    <el-table-column

                                            prop="id"
                                            label="序号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="董事会候选人姓名">
                                    </el-table-column>
                                    <el-table-column
                                            prop="num"
                                            label="得赞成票">
                                    </el-table-column>
                                </el-table>
                            </el-col>
                            <el-col :span="11"  :offset="2">
                                <el-table
                                        :data="tableData1"
                                        border
                                        style="width: 100%">
                                    <el-table-column

                                            prop="id"
                                            label="序号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="监事会候选人姓名">
                                    </el-table-column>
                                    <el-table-column
                                            prop="num"
                                            label="得赞成票">
                                    </el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>

                    </div>
                    <div class="text">
                        根据《松松林镇股份经济合作社董事会，监事会选举办法（草案）》的规定
                        <p>
                            根据董事会候选人得票多少：
                            <span style="color: #f60;"> 郭文祥 </span>
                            <span style="color: #f60;"> 陈明刚 </span>
                            <span style="color: #f60;"> 徐廷发 </span>
                            <span style="color: #f60;"> 李德超 </span>
                            <span style="color: #f60;"> 王荣义 </span>
                            <span style="color: #f60;"> 罗正强 </span>
                            <span style="color: #f60;"> 饶培勇 </span>
                            当选为董事会成员。
                        </p>
                        <p>
                            根据监事会候选人得票多少：
                            <span style="color: #f60;"> 闵昌学 </span>
                            <span style="color: #f60;"> 彭定志 </span>
                            <span style="color: #f60;"> 刘元水 </span>
                            当选为监事会成员。
                        </p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <div class="pageBtn">
                <el-button type="primary" @click="page" style="float: right;margin-right: 10rem">上一页</el-button>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "vote",
        data(){
            return {
                tableData:[
                    {
                        id:1,
                        name:'郭文祥',
                        num:58
                    },
                    {
                        id:2,
                        name:'陈明刚',
                        num:57
                    },
                    {
                        id:3,
                        name:'徐廷发',
                        num:57
                    },
                    {
                        id:4,
                        name:'李德超',
                        num:56
                    },
                    {
                        id:5,
                        name:'王荣义',
                        num:53
                    },
                    {
                        id:6,
                        name:'罗正强',
                        num:52
                    },
                    {
                        id:7,
                        name:'饶培勇',
                        num:46
                    },
                    {
                        id:8,
                        name:'张元松',
                        num:30
                    },

                ],
                tableData1:[
                    {
                        id:1,
                        name:'闵昌学',
                        num:49
                    },
                    {
                        id:2,
                        name:'彭定志',
                        num:45
                    },
                    {
                        id:3,
                        name:'刘元水',
                        num:44
                    },
                    {
                        id:4,
                        name:'雷以彬',
                        num:30
                    },
                    {
                        id:5,
                        name:'张元松',
                        num:3
                    },
                    {
                        id:6,
                        name:'王福生',
                        num:1
                    },
                    {
                        id:7,
                        name:'郭文沙',
                        num:1
                    }
                ]
            }
        },
        methods:{
            page(){
                this.$router.push('/demoDashboard')
            }
        }
    }
</script>

<style scoped lang="scss">
    .content{
        width: auto;
    }
    .title{
        margin-top: 2rem;
        font-size: 2.2rem;
        line-height: 3rem;
        color: #333;
        text-align: center;
    }
    .text{
        margin-top: 2rem;
        width: auto;
        line-height: 3rem;
        font-size: 2rem;
        color: #666;
        font-weight: 600;

    }
    .table-box{
        margin-top: 2rem;

    }
    .pageBtn{
        width: auto;
        height: 5rem;
        margin-top: 5rem;
    }
</style>
