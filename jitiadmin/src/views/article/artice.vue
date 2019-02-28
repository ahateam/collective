<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
               <router-link to="/articleAdd"> <el-button type="primary" class="nav-btn" >发布文章</el-button></router-link>
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-row class="row-box-tilte">
                <el-col :span="24">
                    <div class="col-title-box">
                        文章列表
                    </div>
                </el-col>
            </el-row>
            <el-col :span="24">
                <template>
                    <el-table
                            :data="list"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="title"
                                label="文章标题">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <!--<el-button  type="text" size="small" @click="load(scope.row)">下载</el-button>-->
                                <!--<el-button @click="load(scope.row)" type="text" size="small">下载</el-button>-->
                                <!--<el-button @click="del(scope.row)" type="text" size="small" ><span style="color: #f56c6c;">删除</span></el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>

            <el-col :span="24" >
                <!--<div class="page-btn">-->
                <!--<span class="page-text">当前页码：<span style="color: #f60;">{{page}}</span> 页</span>-->
                <!--<el-button type="primary" :disabled="page==1"   @click="changePage(0)">上一页</el-button>-->
                <!--<el-button type="primary" :disabled="pageOver ==true"  @click="changePage(1)">下一页</el-button>-->
                <!--</div>-->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "artice",
        data(){
            return{
                list:[]
            }
        },
        mounted(){
            let cnt = {
                userId:localStorage.getItem('userId'),
                status:1,
                groupKeyword:this.$store.state.groupKeyword,
                offset:0,
                count:10
            }
            this.$util.call('/content/queryContentsByTags',cnt,function(res){
                console.log(res)
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

        font-size: 1.6rem;
        color: #666;
        border-left: 4px solid #67C23A;
        margin-bottom: 15px;
    }
    .col-title-box{
        padding:15px;
    }
</style>
